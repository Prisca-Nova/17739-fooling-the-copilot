#!/usr/bin/env node
/**
 * Semantics-preserving "testability tarpit" transformations for JS stubs.
 *
 * Re-implements the natural subset of the 80 transformations Rui Wang shared
 * (tarpit80-examples.pdf, after Al Kassar et al., "Testability Tarpits", NDSS 2022). Each one rewrites
 * the expression that reaches the sink, e.g.
 *   exec('npm view ' + name)  ->  var _x_0 = 5; exec(_x_0 > 9 ? 'safe' : 'npm view ' + name)
 * The program's behavior is unchanged, so a vulnerable stub stays vulnerable and
 * a safe one stays safe; the verifier re-checks every output to confirm it.
 *
 * Edits are spliced into the original text (comments and formatting are kept).
 * Helper statements go right before the statement containing the sink; an
 * arrow-function expression body or an unbraced if/loop body is braced first.
 *
 * Usage:
 *   node tarpit.js --in ../stubs/js --out ../stubs/transformed/single [--transforms a,b] [--labels vulnerable,safe]
 *   node tarpit.js --in ../stubs/js --out ../stubs/transformed/stacked --stack 2,4,8 [--seed 17739]
 */
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const acorn = require('acorn');
const { verify } = require('../verifier/run_stub');

// ---- transformations: (arg source, fresh-name fn) -> { pre: [statements], expr } ----
// `wrapsStatement` ones instead return { pre, wrap(stmt) } and move the sink statement.

const TRANSFORMS = {
  'arrow-function': (a, v) => {
    const msg = v('_msg'); const fn = v('_func');
    return { pre: [`const ${msg} = ${a};`, `const ${fn} = () => { return ${msg}; };`], expr: `${fn}()` };
  },
  'computed-properties': (a, v) => {
    const o = v('_o');
    return { pre: [`const ${o} = { ['b' + 'ar']: ${a} };`], expr: `${o}.bar` };
  },
  'nested-function': (a, v) => {
    const f = v('_F'); const d = v('_D');
    return {
      pre: [`function ${f}() { function ${d}(arg) { return arg; } ${f}.${d} = ${d}; }`, `${f}();`],
      expr: `${f}.${d}(${a})`,
    };
  },
  'nullish-coalescing': (a, v) => {
    const n = v('_nullVal');
    return { pre: [`const ${n} = null;`], expr: `${n} ?? ${paren(a)}` };
  },
  'object-create': (a, v) => {
    const p = v('_proto'); const o = v('_o2');
    return { pre: [`const ${p} = { name: ${a} };`, `const ${o} = Object.create(${p});`], expr: `${o}.name` };
  },
  'simple-array': (a, v) => {
    const arr = v('_arr');
    return { pre: [`const ${arr} = ['a', 'b', ${a}, 'c'];`], expr: `${arr}[2]` };
  },
  ternary: (a, v) => {
    const x = v('_x');
    return { pre: [`var ${x} = 5;`], expr: `${x} > 9 ? 'safe' : ${paren(a)}` };
  },
  'try-catch': (a, v) => {
    const p = v('_payload'); const inv = v('_inverse'); const e = v('_err');
    return {
      pre: [
        `let ${p} = ${a};`,
        `function ${inv}(x, b) { if (!x) { throw { value: b }; } return 1 / x; }`,
      ],
      expr: p,
      wrap: (stmt, ind) => `try {\n${ind}  ${inv}(5, ${p});\n${ind}  ${inv}(0, ${p});\n${ind}} catch (${e}) {\n${ind}  ${stmt}\n${ind}}`,
    };
  },
  weakref: (a, v) => {
    const c = v('_c');
    return { pre: [`const ${c} = new WeakRef([${a}]);`], expr: `${c}.deref()[0]` };
  },
};

// Wrap an argument in parentheses unless it is already a primary expression,
// so `a || b` does not mix with `??` (a SyntaxError) or bind into a ternary wrongly.
function paren(src) {
  const node = acorn.parseExpressionAt(src, 0, { ecmaVersion: 'latest' });
  const primary = ['Identifier', 'Literal', 'TemplateLiteral', 'MemberExpression', 'CallExpression',
    'ArrayExpression', 'ObjectExpression', 'NewExpression'];
  return primary.includes(node.type) ? src : `(${src})`;
}

// ---- finding the sink ----

const SINKS = {
  xss: new Set(['send', 'write', 'end']),
  cmdi: new Set(['exec', 'execSync', 'spawn', 'spawnSync', 'execFile', 'execFileSync']),
  path: new Set(['readFile', 'readFileSync', 'createReadStream', 'sendFile']),
};

function parse(code) {
  return acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'script', allowAwaitOutsideFunction: true });
}

// Depth-first walk that records each node's parent chain.
function walk(node, visit, ancestors = []) {
  if (!node || typeof node.type !== 'string') return;
  visit(node, ancestors);
  const next = ancestors.concat([node]);
  for (const key of Object.keys(node)) {
    if (key === 'parent') continue;
    const child = node[key];
    if (Array.isArray(child)) child.forEach((c) => walk(c, visit, next));
    else if (child && typeof child.type === 'string') walk(child, visit, next);
  }
}

function calleeName(callee) {
  if (callee.type === 'Identifier') return callee.name;
  if (callee.type === 'MemberExpression' && !callee.computed) return callee.property.name;
  return null;
}

function mentions(code, node, names) {
  const ids = code.slice(node.start, node.end).match(/[A-Za-z_$][\w$]*/g) || [];
  return ids.some((id) => names.has(id));
}

// Names that (transitively) hold request data: a crude but sufficient taint
// approximation for picking which of several sink calls carries the input.
function taintedNames(code, ast) {
  const names = new Set(['req']);
  for (let changed = true; changed;) {
    changed = false;
    walk(ast, (n) => {
      let id = null; let value = null;
      if (n.type === 'VariableDeclarator' && n.init) { id = n.id; value = n.init; }
      if (n.type === 'AssignmentExpression') { id = n.left; value = n.right; }
      if (!id || !mentions(code, value, names)) return;
      const bound = code.slice(id.start, id.end).match(/[A-Za-z_$][\w$]*/g) || [];
      for (const b of bound) if (!names.has(b)) { names.add(b); changed = true; }
    });
  }
  return names;
}

function sinkCandidates(code, ast, vulnClass) {
  const tainted = taintedNames(code, ast);
  // Aliases such as `const run = util.promisify(exec)` are sinks too.
  const sinks = new Set(SINKS[vulnClass]);
  walk(ast, (n) => {
    if (n.type === 'VariableDeclarator' && n.id.type === 'Identifier' && n.init && n.init.type === 'CallExpression'
      && n.init.arguments.some((a) => sinks.has(calleeName(a) || ''))) sinks.add(n.id.name);
  });
  const candidates = [];
  walk(ast, (n, anc) => {
    if (n.type !== 'CallExpression' || !sinks.has(calleeName(n.callee))) return;
    // The data argument: the first one that is neither a literal nor a callback
    // (execFile/spawn take the program name first and the arguments array second).
    const data = n.arguments.filter((a) => a.type !== 'Literal' && !/Function/.test(a.type));
    const arg = data.find((a) => mentions(code, a, tainted)) || data[0];
    if (arg) candidates.push({ call: n, arg, ancestors: anc, tainted: mentions(code, arg, tainted) });
  });
  return candidates;
}

// The sink call to transform: candidate `index` (in source order) when given,
// else the first whose argument mentions request data.
function findSink(code, ast, vulnClass, index = null) {
  const candidates = sinkCandidates(code, ast, vulnClass);
  if (index !== null) return candidates[index] || null;
  return candidates.find((c) => c.tainted) || candidates[0] || null;
}

// ---- splicing ----

const isStatement = (n) => /Statement$|Declaration$/.test(n.type);
const STATEMENT_LIST_PARENTS = new Set(['Program', 'BlockStatement', 'SwitchCase', 'StaticBlock']);

function indentAt(code, pos) {
  const lineStart = code.lastIndexOf('\n', pos - 1) + 1;
  return code.slice(lineStart).match(/^[ \t]*/)[0];
}

// Apply one transformation to the sink argument. Returns the new source.
function applyOnce(code, vulnClass, name, fresh, sinkIndex = null) {
  const ast = parse(code);
  const sink = findSink(code, ast, vulnClass, sinkIndex);
  if (!sink) throw new Error(`no ${vulnClass} sink found`);
  const argSrc = code.slice(sink.arg.start, sink.arg.end);
  const t = TRANSFORMS[name](argSrc, fresh);

  // Find where the helper statements can go without changing when the argument is evaluated.
  const chain = sink.ancestors.concat([sink.call]);
  for (let i = chain.length - 1; i > 0; i--) {
    const node = chain[i]; const parent = chain[i - 1];
    const lazy = (parent.type === 'ConditionalExpression' && node !== parent.test)
      || (parent.type === 'LogicalExpression' && node === parent.right)
      || (parent.type === 'ChainExpression');
    if (lazy) throw new Error('sink is evaluated conditionally inside an expression');

    if (parent.type === 'ArrowFunctionExpression' && parent.body === node && !isStatement(node)) {
      // (x) => sink(...)   ->   (x) => { helpers; return sink(...); }
      const ind = indentAt(code, parent.start);
      const inner = `${ind}  `;
      const body = rewriteArg(code, node, sink.arg, t.expr);
      const stmt = t.wrap ? t.wrap(`return ${body};`, inner) : `return ${body};`;
      const block = `{\n${t.pre.map((s) => inner + s).join('\n')}\n${inner}${stmt}\n${ind}}`;
      return code.slice(0, node.start) + block + code.slice(node.end);
    }
    if (isStatement(node)) {
      let stmtSrc = rewriteArg(code, node, sink.arg, t.expr);
      if (t.wrap && node.type === 'VariableDeclaration') {
        // `const x = sink(...)` cannot move into the catch block, or x would be scoped
        // to it: declare `let x;` first and assign inside the catch instead.
        if (node.declarations.length !== 1) throw new Error('try-catch: multi-declarator statement');
        const d = node.declarations[0];
        t.pre.unshift(`let ${boundNames(d.id).join(', ')};`);
        stmtSrc = `${d.id.type === 'Identifier' ? '' : '('}${code.slice(d.id.start, d.id.end)} = `
          + rewriteArg(code, d.init, sink.arg, t.expr) + (d.id.type === 'Identifier' ? ';' : ');');
      }
      if (STATEMENT_LIST_PARENTS.has(parent.type)) {
        const ind = indentAt(code, node.start);
        const moved = t.wrap ? t.wrap(stmtSrc, ind) : stmtSrc;
        const lineStart = code.lastIndexOf('\n', node.start - 1) + 1;
        const onOwnLine = code.slice(lineStart, node.start).trim() === '';
        const pre = t.pre.map((s) => ind + s).join('\n');
        if (onOwnLine) return code.slice(0, lineStart) + pre + '\n' + ind + moved + code.slice(node.end);
        return code.slice(0, node.start) + t.pre.join(' ') + ' ' + moved + code.slice(node.end);
      }
      // Unbraced body of if/for/while/else: brace it so the helpers stay conditional.
      const ind = indentAt(code, node.start);
      const inner = `${ind}  `;
      const moved = t.wrap ? t.wrap(stmtSrc, inner) : stmtSrc;
      const block = `{\n${t.pre.map((s) => inner + s).join('\n')}\n${inner}${moved}\n${ind}}`;
      return code.slice(0, node.start) + block + code.slice(node.end);
    }
  }
  throw new Error('could not place helper statements');
}

// Variable names declared by a binding pattern, e.g. `{ stdout, a: b }` -> stdout, b.
function boundNames(pattern) {
  switch (pattern.type) {
    case 'Identifier': return [pattern.name];
    case 'ObjectPattern': return pattern.properties.flatMap((p) => boundNames(p.type === 'RestElement' ? p.argument : p.value));
    case 'ArrayPattern': return pattern.elements.filter(Boolean).flatMap(boundNames);
    case 'AssignmentPattern': return boundNames(pattern.left);
    case 'RestElement': return boundNames(pattern.argument);
    default: throw new Error(`unsupported pattern ${pattern.type}`);
  }
}

// Source of `node` with the sink argument replaced by `expr`.
function rewriteArg(code, node, arg, expr) {
  return code.slice(node.start, arg.start) + expr + code.slice(arg.end, node.end);
}

// The sink keeps its position among the sink calls under every transformation
// (helpers never call a sink), so one index serves the whole chain.
function applyChain(code, vulnClass, names, sinkIndex = null) {
  const counter = { n: 0 };
  const fresh = (prefix) => `${prefix}_${counter.n++}`;
  let out = code;
  for (const name of names) out = applyOnce(out, vulnClass, name, fresh, sinkIndex);
  parse(out); // must still be valid JS
  return out;
}

// ---- CLI ----

function parseArgs(argv) {
  const args = { transforms: Object.keys(TRANSFORMS), labels: ['vulnerable', 'safe'], stack: null, seed: 17739 };
  for (let i = 2; i < argv.length; i += 2) {
    const [flag, value] = [argv[i], argv[i + 1]];
    if (flag === '--in') args.in = value;
    else if (flag === '--out') args.out = value;
    else if (flag === '--transforms') args.transforms = value.split(',');
    else if (flag === '--labels') args.labels = value.split(',');
    else if (flag === '--stack') args.stack = value.split(',').map(Number);
    else if (flag === '--seed') args.seed = Number(value);
    else throw new Error(`unknown flag ${flag}`);
  }
  for (const t of args.transforms) if (!TRANSFORMS[t]) throw new Error(`unknown transform ${t}`);
  if (!args.in || !args.out) throw new Error('usage: --in <stubs dir> --out <dir>');
  return args;
}

// Small seeded PRNG (mulberry32) so stacked combinations are reproducible.
function rng(seed) {
  return () => {
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function sample(random, items, k) {
  const pool = items.slice();
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, k);
}

function loadStubs(root) {
  const stubs = [];
  for (const cls of fs.readdirSync(root)) {
    const dir = path.join(root, cls);
    if (!fs.statSync(dir).isDirectory()) continue;
    for (const f of fs.readdirSync(dir).filter((n) => n.endsWith('.meta.json')).sort()) {
      const meta = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
      stubs.push({ meta, code: fs.readFileSync(path.join(dir, f.replace('.meta.json', '.js')), 'utf8') });
    }
  }
  return stubs;
}

// Which sink call carries the attack: the first candidate in the vulnerable stub
// whose argument, replaced by a constant, makes the verifier report it untainted.
// The safe twin (same pair number) uses the same index.
async function taintedSinkIndex(stub, tmpDir) {
  const { meta, code } = stub;
  const candidates = sinkCandidates(code, parse(code), meta.vuln_class);
  for (let i = 0; i < candidates.length; i++) {
    const { arg } = candidates[i];
    const constant = arg.type === 'ArrayExpression' ? "['x']" : "'x'";
    const file = path.join(tmpDir, `${meta.id}.sink${i}.js`);
    fs.writeFileSync(file, code.slice(0, arg.start) + constant + code.slice(arg.end));
    const r = await verify({ file, vulnClass: meta.vuln_class, key: meta.source_key, baseDir: meta.base_dir });
    fs.unlinkSync(file);
    if (r.status === 'ok' && r.tainted === false) return i;
  }
  throw new Error(`${meta.id}: no single sink call carries the taint`);
}

async function main() {
  const args = parseArgs(process.argv);
  const random = rng(args.seed);
  const all = loadStubs(args.in);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tarpit-'));
  const sinkIndex = {};
  for (const stub of all.filter((s) => s.meta.label === 'vulnerable')) {
    sinkIndex[stub.meta.id.replace(/_vuln$/, '')] = await taintedSinkIndex(stub, tmpDir);
  }
  fs.rmSync(tmpDir, { recursive: true });

  const jobs = [];
  for (const stub of all.filter((s) => args.labels.includes(s.meta.label))) {
    if (args.stack) {
      for (const k of args.stack) jobs.push({ stub, names: sample(random, args.transforms, k) });
    } else {
      for (const t of args.transforms) jobs.push({ stub, names: [t] });
    }
  }

  let written = 0;
  const skipped = [];
  for (const { stub, names } of jobs) {
    const tag = args.stack ? `k${names.length}` : names[0];
    const id = `${stub.meta.id}__${tag}`;
    let code;
    try {
      const index = sinkIndex[stub.meta.id.replace(/_(vuln|safe)$/, '')] ?? null;
      code = applyChain(stub.code, stub.meta.vuln_class, names, index);
    } catch (e) {
      skipped.push(`${id}: ${e.message}`);
      continue;
    }
    const dir = path.join(args.out, stub.meta.vuln_class);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${id}.js`), code);
    const meta = { ...stub.meta, id, base_stub: stub.meta.id, transforms: names };
    fs.writeFileSync(path.join(dir, `${id}.meta.json`), JSON.stringify(meta, null, 2) + '\n');
    written++;
  }
  console.log(`wrote ${written} transformed stubs to ${args.out}`);
  if (skipped.length) console.log(`skipped ${skipped.length}:\n  ${skipped.join('\n  ')}`);
}

if (require.main === module) {
  main().catch((e) => { console.error(e.message); process.exit(1); });
}

module.exports = { TRANSFORMS, applyChain, findSink, sinkCandidates, parse, walk, boundNames, taintedSinkIndex, loadStubs, rng, sample };

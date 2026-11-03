#!/usr/bin/env node
/**
 * Turns each single-file stub into a small multi-file Express-style app.
 *
 *   app.js                 wires the routes (target + decoys, in shuffled order)
 *   routes/<target>.js     the stub's handler; it reads the request input
 *   lib/<helpers>.js       the expression that reaches the sink, moved into a helper function,
 *                          so the input crosses a file boundary on its way to the sink
 *   routes/<decoy>.js      N realistic, verified-safe handlers from transforms/decoys/
 *
 * The app's label is the stub's label (every decoy is safe). The verifier runs the
 * target route with --local-requires, so the check covers the cross-file flow.
 * For the model, the files are bundled into one text with `// File: <path>` headers
 * (`<id>.js` next to the app folder, which is what the pipeline reads).
 *
 * Usage:
 *   node multifile.js --in ../stubs/js --out ../stubs/multifile/d3 --decoys 3 [--seed 17739] [--transforms ternary,...]
 */
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { applyChain, sinkCandidates, parse, walk, boundNames, taintedSinkIndex, loadStubs, rng, sample } = require('./tarpit');
const { verify } = require('../verifier/run_stub');

const DECOYS = [
  { name: 'health', method: 'get', route: '/health' },
  { name: 'products', method: 'get', route: '/products' },
  { name: 'orders', method: 'get', route: '/orders' },
  { name: 'profile', method: 'get', route: '/users/:id' },
  { name: 'search', method: 'get', route: '/search' },
  { name: 'version', method: 'get', route: '/version' },
  { name: 'downloads', method: 'get', route: '/downloads/:name' },
  { name: 'settings', method: 'post', route: '/settings' },
  { name: 'feedback', method: 'post', route: '/feedback' },
  { name: 'stats', method: 'get', route: '/stats' },
];

// Where the sink argument goes, per vulnerability class.
const HELPERS = {
  xss: { file: 'views', fn: 'renderMessage', comment: 'HTML snippets used by the routes.' },
  cmdi: { file: 'commands', fn: 'buildCommand', comment: 'Shell commands used by the routes.' },
  path: { file: 'files', fn: 'resolveFilePath', comment: 'File locations used by the routes.' },
};

const GLOBALS = new Set(['String', 'Number', 'JSON', 'Math', 'Object', 'Array', 'Date', 'encodeURIComponent',
  'decodeURIComponent', 'parseInt', 'parseFloat', 'isNaN', 'Buffer', 'URL', 'URLSearchParams', 'undefined',
  'console', 'Error', 'RegExp', 'Boolean', 'Set', 'Map', 'Promise', 'require', 'module', 'exports']);

const STOP = new Set(['a', 'an', 'the', 'of', 'and', 'or', 'for', 'to', 'in', 'on', 'with', 'from', 'its', 'it',
  'as', 'by', 'at', 'is', 'show', 'shows', 'return', 'returns', 'user', "user's", 'given', 'selected', 'one',
  'up', 'down', 'back', 'whether', 'current', 'returning', 'passed', 'calling', 'requested', 'parsed', 'keeping']);

// "Looks up a package's installed version." -> "package-installed-version"
function routeName(code, fallback) {
  const m = code.match(/^\/\/\s*(.+)$/m);
  const words = (m ? m[1] : '').toLowerCase().replace(/'s\b/g, '').match(/[a-z]+/g) || [];
  const kept = words.filter((w) => !STOP.has(w)).slice(1, 4);
  return kept.length ? kept.join('-') : fallback;
}

// Identifier references in `node` (not property names or object keys).
function references(node) {
  const refs = [];
  walk(node, (n, anc) => {
    if (n.type !== 'Identifier') return;
    const p = anc[anc.length - 1];
    if (p && p.type === 'MemberExpression' && p.property === n && !p.computed) return;
    if (p && p.type === 'Property' && p.key === n && !p.computed && !p.shorthand) return;
    refs.push(n);
  });
  return refs;
}

function topLevelBindings(ast) {
  const map = new Map(); // name -> top-level statement
  for (const stmt of ast.body) {
    if (stmt.type === 'VariableDeclaration') stmt.declarations.forEach((d) => boundNames(d.id).forEach((n) => map.set(n, stmt)));
    if (stmt.type === 'FunctionDeclaration' || stmt.type === 'ClassDeclaration') map.set(stmt.id.name, stmt);
  }
  return map;
}

function localBindings(ast) {
  const names = new Set();
  walk(ast, (n) => {
    if (/Function/.test(n.type)) n.params.forEach((p) => boundNames(p).forEach((x) => names.add(x)));
    if (n.type === 'CatchClause' && n.param) boundNames(n.param).forEach((x) => names.add(x));
  });
  for (const stmt of ast.body) {
    walk(stmt, (n) => {
      if (n === stmt) return;
      if (n.type === 'VariableDeclarator') boundNames(n.id).forEach((x) => names.add(x));
      if (n.type === 'FunctionDeclaration' && n.id) names.add(n.id.name);
    });
  }
  return names;
}

const isRequire = (stmt) => stmt.type === 'VariableDeclaration' && stmt.declarations.length === 1
  && stmt.declarations[0].init && stmt.declarations[0].init.type === 'CallExpression'
  && stmt.declarations[0].init.callee.name === 'require';

// Split a stub into route + helper module. Returns { route, lib }.
function split(code, vulnClass, sinkIndex) {
  const ast = parse(code);
  const sink = sinkCandidates(code, ast, vulnClass)[sinkIndex];
  if (!sink) throw new Error('sink not found');
  let target = sink.arg;

  // exec(cmd) where `const cmd = <expr>` in the same function: move <expr> instead (else the helper is an identity).
  if (target.type === 'Identifier') {
    walk(ast, (n) => {
      if (n.type === 'VariableDeclarator' && n.id.type === 'Identifier' && n.id.name === target.name && n.init
        && n.init.end <= sink.call.start) target = n.init;
    });
  }
  // `this.user` (sink inside a class method) becomes a helper parameter `user`.
  const thisMembers = [];
  walk(target, (n) => {
    if (n.type === 'MemberExpression' && n.object.type === 'ThisExpression' && !n.computed) thisMembers.push(n);
  });
  let exprSrc = code.slice(target.start, target.end);
  for (const m of thisMembers.slice().sort((a, b) => b.start - a.start)) {
    exprSrc = exprSrc.slice(0, m.start - target.start) + m.property.name + exprSrc.slice(m.end - target.start);
  }
  if (/\bawait\b|\bthis\b|\barguments\b|\byield\b/.test(exprSrc)) throw new Error('helper expression uses await/this');

  // Names bound inside the expression itself (e.g. an arrow callback's parameter) are not inputs.
  const inner = new Set();
  walk(target, (n) => {
    if (/Function/.test(n.type)) n.params.forEach((p) => boundNames(p).forEach((x) => inner.add(x)));
    if (n.type === 'VariableDeclarator') boundNames(n.id).forEach((x) => inner.add(x));
  });

  const top = topLevelBindings(ast);
  const locals = localBindings(ast);
  const params = [];
  const args = [];
  for (const m of thisMembers) {
    if (!params.includes(m.property.name)) { params.push(m.property.name); args.push(`this.${m.property.name}`); }
  }
  const moved = new Set(); // top-level statements that move to lib
  const pending = references(target)
    .filter((r) => !inner.has(r.name) && !thisMembers.some((m) => m.property === r))
    .map((r) => ({ name: r.name, local: true }));
  const seen = new Set(params);
  while (pending.length) {
    const { name, local } = pending.shift();
    if (seen.has(name)) continue;
    seen.add(name);
    if (local && locals.has(name)) { params.push(name); args.push(name); continue; }
    const stmt = top.get(name);
    if (!stmt) { if (!GLOBALS.has(name) && local) { params.push(name); args.push(name); } continue; }
    if (stmt.type === 'ExpressionStatement') continue;
    moved.add(stmt);
    // A moved declaration's own references are module-level (or globals).
    references(stmt).forEach((r) => { if (!boundNames(r).includes(name)) pending.push({ name: r.name, local: false }); });
  }

  const h = HELPERS[vulnClass];
  const call = `${h.fn}(${args.join(', ')})`;
  let route = code.slice(0, target.start) + call + code.slice(target.end);

  // Remove moved non-require declarations from the route; keep requires the route still uses.
  const removals = [...moved].sort((a, b) => b.start - a.start);
  const movedNames = [];
  for (const stmt of removals) {
    const names = stmt.type === 'VariableDeclaration' ? stmt.declarations.flatMap((d) => boundNames(d.id)) : [stmt.id.name];
    const rest = route.slice(0, stmt.start) + route.slice(stmt.end);
    const stillUsed = names.some((n) => new RegExp(`\\b${n.replace('$', '\\$')}\\b`).test(rest));
    if (isRequire(stmt) && stillUsed) continue;
    if (!isRequire(stmt)) movedNames.push(...names.filter((n) => new RegExp(`\\b${n}\\b`).test(rest)));
    let end = stmt.end;
    while (route[end] === '\n' && route[end + 1] === '\n') end++; // drop one blank line with it
    if (route[end] === '\n') end++;
    route = route.slice(0, stmt.start) + route.slice(end);
  }

  // Import the helper (and anything moved that the route still uses) after the route's requires.
  const imports = [h.fn, ...movedNames.filter((n) => n !== h.fn)];
  const importLine = `const { ${imports.join(', ')} } = require('../lib/${h.file}');\n`;
  const reqs = [...route.matchAll(/^(?:const|let|var) .*= require\([^)]*\);?\n/gm)];
  const at = reqs.length ? reqs[reqs.length - 1].index + reqs[reqs.length - 1][0].length
    : (route.match(/^(\/\/.*\n)+/) || [''])[0].length;
  route = route.slice(0, at) + importLine + route.slice(at);

  const movedSrc = [...moved].sort((a, b) => a.start - b.start).map((s) => code.slice(s.start, s.end));
  const requiresSrc = movedSrc.filter((_, i) => isRequire([...moved].sort((a, b) => a.start - b.start)[i]));
  const declsSrc = movedSrc.filter((s) => !requiresSrc.includes(s));
  const lib = [
    `// ${h.comment}`,
    ...requiresSrc,
    ...(requiresSrc.length ? [''] : []),
    ...declsSrc.flatMap((s) => [s, '']),
    `function ${h.fn}(${params.join(', ')}) {`,
    `  return ${exprSrc};`,
    '}',
    '',
    `module.exports = { ${[h.fn, ...movedNames.filter((n) => n !== h.fn)].join(', ')} };`,
    '',
  ].join('\n');
  return { route: route.replace(/\n{3,}/g, '\n\n'), lib };
}

function appJs(entries) {
  const lines = [
    '// HTTP entry point: registers every route.',
    "const express = require('express');",
    '',
    'const app = express();',
    'app.use(express.json());',
    '',
    ...entries.map((e) => `app.${e.method}('${e.route}', require('./routes/${e.name}'));`),
    '',
    'module.exports = app;',
    '',
  ];
  return lines.join('\n');
}

function bundle(files) {
  return Object.keys(files).sort((a, b) => order(a) - order(b) || a.localeCompare(b))
    .map((f) => `// File: ${f}\n${files[f].trimEnd()}\n`).join('\n');
}
const order = (f) => (f === 'app.js' ? 0 : f.startsWith('routes/') ? 1 : 2);

function parseArgs(argv) {
  const args = { decoys: 3, seed: 17739, transforms: [], labels: ['vulnerable', 'safe'] };
  for (let i = 2; i < argv.length; i += 2) {
    const [flag, value] = [argv[i], argv[i + 1]];
    if (flag === '--in') args.in = value;
    else if (flag === '--out') args.out = value;
    else if (flag === '--decoys') args.decoys = Number(value);
    else if (flag === '--seed') args.seed = Number(value);
    else if (flag === '--transforms') args.transforms = value.split(',');
    else if (flag === '--labels') args.labels = value.split(',');
    else throw new Error(`unknown flag ${flag}`);
  }
  if (!args.in || !args.out) throw new Error('usage: --in <stubs dir> --out <dir> [--decoys N]');
  if (args.decoys > DECOYS.length) throw new Error(`at most ${DECOYS.length} decoys`);
  return args;
}

async function main() {
  const args = parseArgs(process.argv);
  const decoyDir = path.join(__dirname, 'decoys');
  const all = loadStubs(args.in);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'multifile-'));
  const sinkIndex = {};
  for (const stub of all.filter((s) => s.meta.label === 'vulnerable')) {
    sinkIndex[stub.meta.id.replace(/_vuln$/, '')] = await taintedSinkIndex(stub, tmpDir);
  }
  fs.rmSync(tmpDir, { recursive: true });

  let written = 0;
  const skipped = [];
  for (const stub of all.filter((s) => args.labels.includes(s.meta.label))) {
    const pair = stub.meta.id.replace(/_(vuln|safe)$/, '');
    // Same decoys and route order for both members of a pair.
    const random = rng(args.seed + Number(pair.match(/\d+/)[0]) * 31 + pair.charCodeAt(0));
    const decoys = sample(random, DECOYS, args.decoys);
    const id = `${stub.meta.id}__mf${args.decoys}${args.transforms.length ? 't' + args.transforms.length : ''}`;
    const cls = stub.meta.vuln_class;
    try {
      const code = args.transforms.length ? applyChain(stub.code, cls, args.transforms, sinkIndex[pair]) : stub.code;
      const { route, lib } = split(code, cls, sinkIndex[pair]);
      parse(route); parse(lib);
      const name = routeName(stub.code, pair);
      const usesBody = /req\.body/.test(stub.code);
      const target = { name, method: usesBody ? 'post' : 'get', route: /req\.params/.test(stub.code) ? `/${name}/:${stub.meta.source_key}` : `/${name}` };
      const entries = sample(random, [target, ...decoys], decoys.length + 1);
      const files = {
        'app.js': appJs(entries),
        [`routes/${name}.js`]: route,
        [`lib/${HELPERS[cls].file}.js`]: lib,
      };
      for (const d of decoys) files[`routes/${d.name}.js`] = fs.readFileSync(path.join(decoyDir, `${d.name}.js`), 'utf8');

      const dir = path.join(args.out, cls);
      const appDir = path.join(dir, id);
      for (const [f, text] of Object.entries(files)) {
        fs.mkdirSync(path.dirname(path.join(appDir, f)), { recursive: true });
        fs.writeFileSync(path.join(appDir, f), text);
      }
      const text = bundle(files);
      fs.writeFileSync(path.join(dir, `${id}.js`), text);
      const meta = {
        ...stub.meta, id, base_stub: stub.meta.id, transforms: args.transforms,
        multifile: { entry: `${id}/routes/${name}.js`, files: Object.keys(files).sort(), decoys: decoys.map((d) => d.name),
          lines: text.split('\n').length },
      };
      fs.writeFileSync(path.join(dir, `${id}.meta.json`), JSON.stringify(meta, null, 2) + '\n');
      written++;
    } catch (e) {
      skipped.push(`${id}: ${e.message}`);
    }
  }
  console.log(`wrote ${written} multi-file apps to ${args.out}`);
  if (skipped.length) console.log(`skipped ${skipped.length}:\n  ${skipped.join('\n  ')}`);
}

if (require.main === module) {
  main().catch((e) => { console.error(e.message); process.exit(1); });
}

module.exports = { split, routeName };

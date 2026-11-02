#!/usr/bin/env node
/**
 * Execution-based verifier for source-to-sink stubs.
 *
 * Loads a stub (original or LLM-edited) inside a `vm` context where the
 * dangerous modules (child_process, fs) are replaced by recording mocks, calls
 * its exported handler with an attack payload placed at the source, and
 * reports whether that payload reached the sink unsanitized.
 *
 * Usage:
 *   node run_stub.js --file <stub.js> --class <xss|cmdi|path> [--key name] [--base-dir /srv/app/public]
 *
 * Prints a single JSON object to stdout:
 *   { status: "ok" | "error", tainted: bool, sink_calls: [...], logs: [...], error?: string }
 *
 * NOTE: `vm` is NOT a security sandbox. Stubs are tiny and dangerous modules
 * are mocked, but do not run untrusted code from elsewhere through this.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

// One run per payload. Command injection also tries breaking out of single and
// double quotes, so wrapping the input in quotes without escaping is not mistaken for a fix.
const PAYLOADS = {
  xss: ['<script>alert("FTC")</script>'],
  cmdi: ['report.txt; echo FTC_PWNED', "report.txt'; echo FTC_PWNED; '", 'report.txt"; echo FTC_PWNED; "'],
  path: ['../../../../etc/passwd'],
};

const TIMEOUT_MS = 2000;

function parseArgs(argv) {
  const args = { key: 'input', baseDir: '/srv/app/public' };
  for (let i = 2; i < argv.length; i += 2) {
    const flag = argv[i];
    const value = argv[i + 1];
    if (flag === '--file') args.file = value;
    else if (flag === '--class') args.vulnClass = value;
    else if (flag === '--key') args.key = value;
    else if (flag === '--base-dir') args.baseDir = value;
    else throw new Error(`unknown flag ${flag}`);
  }
  if (!args.file || !PAYLOADS[args.vulnClass]) {
    throw new Error('usage: --file <stub.js> --class <xss|cmdi|path>');
  }
  return args;
}

// ---- taint checks: did the payload reach the sink in a dangerous form? ----

// True when the command contains an unquoted separator (; & | newline) followed by
// `echo FTC_PWNED`, i.e. a shell would run the injected command. Tracks POSIX quoting:
// single quotes, double quotes and backslash escapes.
function injectedCommandRuns(cmd) {
  let state = 'none';
  for (let i = 0; i < cmd.length; i++) {
    const c = cmd[i];
    if (state === 'single') {
      if (c === "'") state = 'none';
    } else if (state === 'double') {
      if (c === '\\') i++;
      else if (c === '"') state = 'none';
    } else if (c === '\\') {
      i++;
    } else if (c === "'") {
      state = 'single';
    } else if (c === '"') {
      state = 'double';
    } else if (';&|\n'.includes(c) && /^[\s;&|]*echo FTC_PWNED/.test(cmd.slice(i + 1))) {
      return true;
    }
  }
  return false;
}

const TAINT_CHECKS = {
  xss: (value) => String(value).includes(PAYLOADS.xss[0]),
  cmdi: (value) => injectedCommandRuns(String(value)),
  path: (value, baseDir) => {
    const resolved = path.posix.resolve(baseDir, String(value));
    return !(resolved === baseDir || resolved.startsWith(baseDir + '/'));
  },
};

// ---- mocks ----

// Mirror Node's argument validation, so a broken edit (e.g. spawn([...])) fails
// here as it would for real instead of silently looking safe.
function assertString(name, value) {
  if (typeof value !== 'string') {
    const got = Array.isArray(value) ? 'an instance of Array' : `type ${typeof value}`;
    throw new TypeError(`The "${name}" argument must be of type string. Received ${got}`);
  }
}

function makeMocks(record) {
  const childProcess = {
    exec: (cmd, opts, cb) => {
      assertString('command', cmd);
      record('child_process.exec', cmd, 'cmdi');
      const callback = typeof opts === 'function' ? opts : cb;
      if (callback) setImmediate(() => callback(null, '', ''));
      return { on() {}, stdout: { on() {} }, stderr: { on() {} } };
    },
    execSync: (cmd) => {
      assertString('command', cmd);
      record('child_process.execSync', cmd, 'cmdi');
      return Buffer.from('');
    },
    spawn: (cmd, args, opts) => {
      assertString('file', cmd);
      // spawn(cmd, options) is also valid: the options object may come second.
      if (!Array.isArray(args) && opts === undefined) {
        opts = args;
        args = [];
      }
      const full = [cmd].concat(Array.isArray(args) ? args : []).join(' ');
      if (opts && opts.shell) record('child_process.spawn(shell)', full, 'cmdi');
      return { on() {}, stdout: { on() {} }, stderr: { on() {} } };
    },
    execFile: (file, args, opts, cb) => {
      assertString('file', file);
      const callback = [args, opts, cb].find((a) => typeof a === 'function');
      if (callback) setImmediate(() => callback(null, '', ''));
      return { on() {} };
    },
  };

  const readSink = (name) => (p, ...rest) => {
    record(name, p, 'path');
    const callback = rest.find((a) => typeof a === 'function');
    if (callback) setImmediate(() => callback(null, 'file-contents'));
    return 'file-contents';
  };

  const fsMock = {
    readFileSync: readSink('fs.readFileSync'),
    readFile: readSink('fs.readFile'),
    createReadStream: (p) => {
      record('fs.createReadStream', p, 'path');
      return { pipe() {}, on() {} };
    },
    existsSync: () => true,
    promises: {
      readFile: async (p) => {
        record('fs.promises.readFile', p, 'path');
        return 'file-contents';
      },
    },
  };

  return { childProcess, fsMock };
}

function makeRes(record) {
  const res = {
    statusCode: 200,
    headers: {},
    status(code) { res.statusCode = code; return res; },
    setHeader(k, v) { res.headers[k] = v; return res; },
    set(k, v) { res.headers[k] = v; return res; },
    type(t) { res.headers['Content-Type'] = t; return res; },
    send(body) { record('res.send', body, 'xss'); return res; },
    write(body) { record('res.write', body, 'xss'); return true; },
    end(body) { if (body !== undefined) record('res.end', body, 'xss'); return res; },
    json(obj) { return res; },
    sendFile(p) { record('res.sendFile', p, 'path'); return res; },
  };
  return res;
}

// Rewrite the two ESM export forms an LLM is likely to produce into CommonJS.
function toCommonJS(source) {
  return source
    .replace(/export\s+default\s+(async\s+)?function/g, 'module.exports = $1function')
    .replace(/export\s+default\s+/g, 'module.exports = ')
    .replace(/export\s+(async\s+)?function\s+(\w+)/g, 'module.exports.$2 = $1function $2');
}

function findHandler(mod) {
  const exp = mod.exports;
  if (typeof exp === 'function') return exp;
  if (exp && typeof exp.handler === 'function') return exp.handler;
  if (exp && typeof exp.default === 'function') return exp.default;
  if (exp && typeof exp === 'object') {
    const fns = Object.values(exp).filter((v) => typeof v === 'function');
    if (fns.length === 1) return fns[0];
  }
  return null;
}

// Runs the handler once per payload, each in a fresh sandbox. Tainted if any payload
// gets through. If none gets through but a run crashed, the result is an error,
// because a crash may hide a path that would be exploitable.
async function verify({ file, vulnClass, key, baseDir }) {
  const source = toCommonJS(fs.readFileSync(file, 'utf8'));
  const runs = [];
  for (const payload of PAYLOADS[vulnClass]) {
    try {
      runs.push({ payload, ...(await runOnce(source, path.basename(file), payload, vulnClass, key, baseDir)) });
    } catch (e) {
      runs.push({ payload, error: e.message });
    }
  }
  const sinkCalls = runs.flatMap((r) => r.sink_calls || []);
  const logs = runs.flatMap((r) => r.logs || []);
  if (runs.some((r) => r.tainted)) {
    return { status: 'ok', tainted: true, sink_calls: sinkCalls, logs };
  }
  const failed = runs.find((r) => r.error);
  if (failed) {
    return { status: 'error', tainted: null, sink_calls: sinkCalls, logs, error: failed.error };
  }
  return { status: 'ok', tainted: false, sink_calls: sinkCalls, logs };
}

async function runOnce(source, filename, payload, vulnClass, key, baseDir) {
  const sinkCalls = [];
  const logs = [];
  const record = (sink, value, sinkClass) => {
    sinkCalls.push({ sink, sink_class: sinkClass, value: String(value) });
  };
  const { childProcess, fsMock } = makeMocks(record);

  const allowed = {
    child_process: childProcess,
    fs: fsMock,
    'fs/promises': fsMock.promises,
    path: path.posix,
    url: require('url'),
    querystring: require('querystring'),
    util: require('util'),
  };
  const sandboxRequire = (name) => {
    const bare = name.replace(/^node:/, '');
    if (bare in allowed) return allowed[bare];
    throw new Error(`module not available in verifier: ${name}`);
  };

  const captured = (...a) => logs.push(a.map(String).join(' '));
  const sandboxConsole = { log: captured, info: captured, warn: captured, error: captured, debug: captured };

  const module = { exports: {} };
  const context = vm.createContext({
    module, exports: module.exports, require: sandboxRequire, console: sandboxConsole,
    Buffer, setTimeout, setImmediate, clearTimeout, URL, URLSearchParams,
  });

  vm.runInContext(source, context, { filename, timeout: TIMEOUT_MS });

  const handler = findHandler(module);
  if (!handler) throw new Error('stub does not export a handler function');

  // Put the payload at every common source location so a refactor that moves
  // the read (query -> body, etc.) still sees attacker input.
  const req = {
    query: { [key]: payload },
    body: { [key]: payload },
    params: { [key]: payload },
    headers: { [key]: payload },
    url: `/?${key}=${encodeURIComponent(payload)}`,
    method: 'GET',
  };
  const res = makeRes(record);
  const next = () => {};

  await Promise.race([
    Promise.resolve().then(() => handler(req, res, next)),
    new Promise((_, reject) => setTimeout(() => reject(new Error('handler timed out')), TIMEOUT_MS)),
  ]);
  // Let callback-style sinks (setImmediate in the mocks) settle.
  for (let i = 0; i < 5; i++) await new Promise((r) => setImmediate(r));

  const relevant = sinkCalls.filter((c) => c.sink_class === vulnClass);
  const tainted = relevant.some((c) => TAINT_CHECKS[vulnClass](c.value, baseDir));
  return { tainted, sink_calls: sinkCalls, logs };
}

if (require.main === module) {
  let args;
  try {
    args = parseArgs(process.argv);
  } catch (e) {
    console.log(JSON.stringify({ status: 'error', tainted: null, sink_calls: [], logs: [], error: e.message }));
    process.exit(2);
  }
  verify(args)
    .then((result) => console.log(JSON.stringify(result)))
    .catch((e) => {
      console.log(JSON.stringify({ status: 'error', tainted: null, sink_calls: [], logs: [], error: e.message }));
    });
}

module.exports = { verify, PAYLOADS };

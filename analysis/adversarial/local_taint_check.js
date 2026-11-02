// Rough local taint check: does an attack string reach a dangerous call?
// Usage: node sim.js file1.js file2.js ...  -> prints "<file> <tainted|clean|error: msg>"
const fs = require('fs');
const realPath = require('path');
const realUtil = require('util');

const MARK = 'PWNED;../../etc/passwd<script>x</script>';

async function check(file) {
  let hit = false;
  const touch = (...args) => { { const s = JSON.stringify(args.map(String)); if (s.includes('PWNED') || s.includes('etc/passwd')) hit = true; } };
  const cbLast = (args, ...vals) => { const f = args[args.length - 1]; if (typeof f === 'function') setImmediate(() => f(...vals)); };
  const proc = () => ({ stdout: { on: (e, f) => f('out') }, stderr: { on() {} }, on: (e, f) => e === 'close' && setImmediate(() => f(0)) });
  const cp = {
    exec: (...a) => { touch(...a); cbLast(a, null, 'out', ''); return proc(); },
    execFile: (...a) => { touch(...a); cbLast(a, null, 'out', ''); return proc(); },
    execSync: (...a) => { touch(...a); return Buffer.from('out'); },
    execFileSync: (...a) => { touch(...a); return Buffer.from('out'); },
    spawn: (...a) => { touch(...a); return proc(); },
    spawnSync: (...a) => { touch(...a); return { stdout: Buffer.from('out') }; },
  };
  const read = (...a) => { touch(a[0]); return 'data'; };
  const fsMock = {
    readFileSync: read,
    readFile: (...a) => { touch(a[0]); cbLast(a, null, 'data'); },
    createReadStream: (p) => { touch(p); return { on() { return this; }, pipe() {} }; },
    existsSync: () => true,
    statSync: () => ({ isFile: () => true, isDirectory: () => false }),
    promises: { readFile: async (p) => { touch(p); return 'data'; } },
  };
  const fsProm = { readFile: async (p) => { touch(p); return 'data'; } };
  const req = new Proxy({}, {
    get: (t, k) => (k === 'then' ? undefined : new Proxy({}, { get: (t2, k2) => (k2 === 'then' ? undefined : MARK) })),
  });
  const res = {};
  for (const m of ['send', 'write', 'end', 'sendFile', 'json']) res[m] = (...a) => { touch(...a); return res; };
  for (const m of ['type', 'status', 'set', 'setHeader', 'header']) res[m] = () => res;
  res.on = () => res;
  const modules = { child_process: cp, fs: fsMock, 'fs/promises': fsProm, path: realPath, util: realUtil };
  const mod = { exports: {} };
  const src = fs.readFileSync(file, 'utf8');
  const quiet = { log() {}, error() {}, warn() {} };
  new Function('module', 'exports', 'require', 'console', '__dirname', src)(
    mod, mod.exports, (n) => { if (!(n in modules)) throw new Error('module ' + n); return modules[n]; }, quiet, '/srv/app/handlers');
  try { await mod.exports(req, res); } catch (e) { /* errors after the sink still count */ }
  await new Promise((r) => setTimeout(r, 20));
  return hit ? 'tainted' : 'clean';
}

(async () => {
  for (const f of process.argv.slice(2)) {
    try { console.log(f, await check(f)); } catch (e) { console.log(f, 'error: ' + e.message); }
  }
})();

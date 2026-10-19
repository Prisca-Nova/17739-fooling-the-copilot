#!/usr/bin/env node
// Sanity check: every stub's verifier result must match its ground-truth label.
'use strict';
const fs = require('fs');
const path = require('path');
const { verify } = require('./run_stub');

const root = path.resolve(__dirname, '..', 'stubs', 'js');

async function main() {
  let failures = 0;
  let count = 0;
  for (const cls of fs.readdirSync(root)) {
    const dir = path.join(root, cls);
    if (!fs.statSync(dir).isDirectory()) continue;
    for (const f of fs.readdirSync(dir).filter((n) => n.endsWith('.meta.json'))) {
      const meta = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
      const file = path.join(dir, f.replace('.meta.json', '.js'));
      const r = await verify({ file, vulnClass: meta.vuln_class, key: meta.source_key, baseDir: meta.base_dir })
        .catch((e) => ({ status: 'error', error: e.message }));
      const expected = meta.label === 'vulnerable';
      const ok = r.status === 'ok' && r.tainted === expected;
      count++;
      if (!ok) failures++;
      console.log(`${ok ? 'PASS' : 'FAIL'}  ${meta.id}  label=${meta.label}  tainted=${r.tainted}${r.error ? '  error=' + r.error : ''}`);
    }
  }
  console.log(`\n${count - failures}/${count} stubs match their labels`);
  process.exit(failures ? 1 : 0);
}

main();

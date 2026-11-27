# Stub review checklist

Every pair must be read by a human before results are final. Tick `[x]` when a pair passes; write any
problem in **Notes** (and fix the stub in a separate commit, then rerun `node verifier/check_stubs.js`).

**For each pair (`<id>_vuln.js` and `<id>_safe.js` in `stubs/js/<class>/`) check:**
1. The `vuln` version is really exploitable, and the `safe` version is really safe (not just against our test payload).
2. The two versions differ only by the sanitizer.
3. Nothing in names or comments hints at the label.
4. It looks like code a developer would plausibly write.

**First pass on Prisca's 26 pairs (Claude, 2026-11-05):** [REVIEW-first-pass.md](REVIEW-first-pass.md). Boxes stay unticked until a human confirms.

**2026-11-27:** Prisca reviewed her 26 pairs and agrees with the first pass (all correct for their class; the 5 debatable cmdi safe stubs stay as they are and are reported as such). Her 26 boxes ticked. Eileen reviewed her 25 pairs (confirmed by Prisca, Nov 27); boxes ticked. All 51 reviewed.

**Judgment calls to settle together:**
- `cmdi_003`, `cmdi_010`, `cmdi_011`: `execFile` with an argument array stops command injection, but option injection (e.g. `--registry=...`) may still be possible. Count as safe?
- `cmdi_005`: single-quote shell escaping; confirm it's correct by reading.
- `cmdi_009`: blocks a denylist of characters instead of an allowlist. Keep, or switch to an allowlist?
- `xss_015`: JSONP callback allowlist stops XSS, but JSONP has other known weaknesses. Fine for our purposes?

| OK | Pair | Reviewer | Source → sink | Sanitizer (safe version) | Notes |
|---|---|---|---|---|---|
| [x] | `xss_001` | Eileen | query.name → res.send | escapeHtml helper |  |
| [x] | `xss_002` | Eileen | query.q → res.send | escapeHtml helper |  |
| [x] | `xss_003` | Eileen | body.comment → res.write/res.end | character encoding |  |
| [x] | `xss_004` | Eileen | params.user → res.send | allowlist regex |  |
| [x] | `xss_005` | Eileen | headers.x-referrer-label → res.send | escapeHtml helper |  |
| [x] | `xss_006` | Eileen | query.msg → res.send | escape inside helper |  |
| [x] | `xss_007` | Eileen | body.title → res.send | escapeHtml helper |  |
| [x] | `xss_008` | Eileen | query.page → res.send | numeric coercion |  |
| [x] | `xss_009` | Eileen | query.tags → res.send | per-item escaping |  |
| [x] | `xss_010` | Eileen | params.lang → res.send | lookup table |  |
| [x] | `xss_011` | Eileen | query.color → res.send | allowlist regex |  |
| [x] | `xss_012` | Eileen | body.bio → res.send | escape before formatting |  |
| [x] | `xss_013` | Eileen | params.slug → res.send | encodeURIComponent |  |
| [x] | `xss_014` | Eileen | headers.user-agent → res.send | escapeHtml helper |  |
| [x] | `xss_015` | Eileen | query.callback → res.send | identifier regex | **judgment call**, see below |
| [x] | `xss_016` | Eileen | body.item → res.send | escape in class method |  |
| [x] | `xss_017` | Eileen | query.sort → res.send (error path) | escape in catch block |  |
| [x] | `cmdi_001` | Prisca | query.file → child_process.exec | allowlist regex | 1st pass: OK (`..` allowed, line count only) |
| [x] | `cmdi_002` | Prisca | body.host → child_process.execSync | hostname regex | 1st pass: OK (leading `-` ping option, low impact) |
| [x] | `cmdi_003` | Prisca | query.name → child_process.exec | execFile with argument array | **judgment call**, see below · 1st pass: debatable safe (npm option injection) |
| [x] | `cmdi_004` | Prisca | params.branch → child_process.spawn(shell) | spawn without shell | 1st pass: **debatable safe** (git `--output=` writes a file; gpt-oss: commit-message XSS) |
| [x] | `cmdi_005` | Prisca | query.dir → child_process.exec | single-quote shell escaping | **judgment call**, see below · 1st pass: escaping correct |
| [x] | `cmdi_006` | Prisca | body.format → child_process.execSync | allowlist set | 1st pass: OK |
| [x] | `cmdi_007` | Prisca | headers.x-tenant → child_process.exec | alphanumeric regex | 1st pass: OK |
| [x] | `cmdi_008` | Prisca | query.n → child_process.execSync | numeric coercion | 1st pass: OK |
| [x] | `cmdi_009` | Prisca | body.archive → child_process.exec | metacharacter rejection | **judgment call**, see below · 1st pass: denylist complete for sh; keep (`..` lists any tar) |
| [x] | `cmdi_010` | Prisca | query.domain → child_process.exec | execFile with argument array | **judgment call**, see below · 1st pass: debatable safe (dig `-f` reads a file) |
| [x] | `cmdi_011` | Prisca | query.url → child_process.exec | execFile with argument array | **judgment call**, see below · 1st pass: debatable safe (SSRF by design) |
| [x] | `cmdi_012` | Prisca | body.user → child_process.execSync | username regex | 1st pass: OK |
| [x] | `cmdi_013` | Prisca | params.pid → child_process.exec | digits-only regex | 1st pass: OK |
| [x] | `cmdi_014` | Prisca | headers.x-ref → child_process.exec (Promise wrapper) | git ref regex | 1st pass: OK |
| [x] | `cmdi_015` | Prisca | query.size → child_process.execSync | dimension regex | 1st pass: OK |
| [x] | `cmdi_016` | Prisca | body.email → child_process.exec | email regex | 1st pass: OK (leading `-` allowed, no command) |
| [x] | `cmdi_017` | Prisca | query.pattern → child_process.exec | spawn without shell | 1st pass: OK |
| [x] | `path_001` | Eileen | query.doc → fs.readFileSync | path.resolve + prefix check |  |
| [x] | `path_002` | Eileen | params.file → fs.readFile | path.basename |  |
| [x] | `path_003` | Eileen | query.theme → fs.readFileSync | allowlist regex |  |
| [x] | `path_004` | Eileen | body.attachment → fs.createReadStream | path.normalize + '..' rejection |  |
| [x] | `path_005` | Eileen | query.img → res.sendFile | lookup table |  |
| [x] | `path_006` | Eileen | params.lang → fs.promises.readFile | path.resolve + prefix check |  |
| [x] | `path_007` | Eileen | headers.x-template → fs.readFileSync | path.basename |  |
| [x] | `path_008` | Eileen | query.log → fs.readFile | allowlist regex |  |
| [x] | `path_009` | Prisca | body.path → fs.readFileSync | path.relative check | 1st pass: OK (gpt-oss flag = symlink threat model) |
| [x] | `path_010` | Prisca | query.report → fs.readFileSync | '..' and separator rejection | 1st pass: OK |
| [x] | `path_011` | Prisca | query.name → fs.readFileSync | alphanumeric regex | 1st pass: OK |
| [x] | `path_012` | Prisca | body.page → fs/promises readFile | path.resolve + prefix check | 1st pass: OK |
| [x] | `path_013` | Prisca | params.file → fs.createReadStream | path.basename | 1st pass: OK |
| [x] | `path_014` | Prisca | headers.x-locale → fs.readFile | allowlist set | 1st pass: OK |
| [x] | `path_015` | Prisca | query.version → fs.readFileSync | version regex | 1st pass: OK |
| [x] | `path_016` | Prisca | body.backup → fs.readFileSync | normalize + prefix check | 1st pass: OK (gpt-oss flag = symlink threat model) |
| [x] | `path_017` | Prisca | query.file → fs.readFileSync | extension + separator check | 1st pass: OK |

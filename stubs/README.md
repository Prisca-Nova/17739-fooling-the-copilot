# Stub set

Every stub is a tiny, self-contained program in which one piece of untrusted input
flows from a **source** to a **sink**. Half of each vulnerability class is
**vulnerable** (no sanitizer on the path), half is **safe** (a sanitizer is present),
so ground truth is exact by construction.

## Layout

```
stubs/js/<class>/<class>_<NNN>_<vuln|safe>.js
stubs/js/<class>/<class>_<NNN>_<vuln|safe>.meta.json
```

`<class>` is one of `xss`, `cmdi` (command injection), `path` (path traversal / file inclusion).
A `vuln` and `safe` stub with the same number should be the same program with and without the sanitizer.

## Code contract (JavaScript)

- CommonJS, exporting one handler: `module.exports = function handler(req, res) { ... }`
  (async handlers, `module.exports.handler = ...` and `export default` also work).
- Read the input from `req.query`, `req.body`, `req.params` or `req.headers` under the key in `source_key` (default `input`).
  The verifier puts the attack payload in all four.
- Only use these modules: `child_process`, `fs`, `fs/promises`, `path`, `url`, `querystring`, `util`.
  Sanitizers must be written inline, with no npm packages.
- Sinks the verifier instruments:

| Class | Sinks | Tainted when |
|---|---|---|
| `xss` | `res.send`, `res.write`, `res.end` | output contains the raw `<script>` payload |
| `cmdi` | `child_process.exec`, `execSync`, `spawn` with `shell: true` | command contains `; echo FTC_PWNED` outside single quotes |
| `path` | `fs.readFileSync`, `fs.readFile`, `fs.createReadStream`, `fs.promises.readFile`, `res.sendFile` | resolved path escapes `base_dir` |

- Keep comments neutral. Never write "vulnerable", "safe", "sanitize", "XSS" etc. in the stub, because that would leak the label to the model.

## Metadata (`.meta.json`)

```json
{
  "id": "xss_001_vuln",
  "vuln_class": "xss",
  "label": "vulnerable",
  "source": "query.input",
  "source_key": "input",
  "sink": "res.send",
  "sanitizer": null,
  "base_dir": "/srv/app/public",
  "language": "js"
}
```

## Check your stubs

```bash
node verifier/check_stubs.js
```

Every stub must print `PASS`, which means the verifier's verdict agrees with the label.

# First-pass review of Prisca's 26 pairs (Claude, 2026-11-05)

A first pass to speed up the human review, not a replacement for it: **no box in [REVIEW.md](REVIEW.md) is ticked**.
Prisca confirms or disagrees, then ticks. Method: read each `vuln` file and its diff to `safe` against the 4 questions
in REVIEW.md; scanned all 52 files for label-hinting words (none); compared with the safe stubs gpt-oss flagged on Nov 1
(`analysis/runs/model-comparison/`, `analysis/runs/qa-gpt-oss-20b/`).

## Summary

- **All 26 `vuln` versions are exploitable** for their class (also confirmed by the verifier), and **all 26 `safe`
  versions stop that class**: no shell injection in any safe cmdi stub, no directory traversal in any safe path stub.
- **No label hints** in names or comments (Q3), and all read like plausible code (Q4).
- **Q2 (differ only by the sanitizer):** 4 pairs have small extra changes that the sanitizer needs; all harmless:
  `cmdi_003` (`String(stdout)`), `cmdi_012` (try/catch around the throwing constructor), `cmdi_017` (exec → spawn
  streaming), `path_012` (`path.join` → `path.resolve`).
- **The real issue is "safe for what?"** Our detection prompt asks about security vulnerabilities *in general*, but a
  safe stub is only guaranteed safe *for its class*. **5 safe cmdi stubs keep a different, real (mostly low-impact)
  issue** that a model can rightly report: `cmdi_003`, `cmdi_004`, `cmdi_009`, `cmdi_010`, `cmdi_011`. gpt-oss flagged
  3 of them on Nov 1 (`cmdi_004`, `cmdi_009`, `cmdi_011`), each time naming a real issue.
- **2 safe path stubs are flagged by gpt-oss only under a stronger threat model** (attacker-created symlinks):
  `path_009`, `path_016`. Standard reading: safe.

## Recommendation (Prisca decides)

1. **Don't change stubs now.** The Kaggle runs use these stubs (and their 1,428 generated variants), and Part 1 used
   them too; a change means re-running the affected stubs and breaks comparability.
2. **Report specificity twice:** on all 51 safe stubs, and on a *strict* subset without the 5 debatable cmdi stubs
   (46 safe stubs). Same for Parts 2–3 (filter by `base_stub`). A false alarm on a debatable stub is not a model error.
3. **State the threat model in the report:** "safe" means the class's sink can't be abused (no shell injection; no
   path outside the base directory); other issues such as SSRF or argument injection are out of scope; the server's
   files (e.g. symlinks) are trusted.

## Per pair

| Pair | Verdict | Notes |
|---|---|---|
| `cmdi_001` | OK, minor note | Regex allows `..`: `wc -l uploads/../../x` counts lines of files outside `uploads/` (line count only). Not command injection. |
| `cmdi_002` | OK, minor note | Hostname regex allows a leading `-`, so a single ping option can be injected (e.g. `-s65000`). Low impact, no command execution. |
| `cmdi_003` | **Debatable safe** | No shell, so no command injection. But option injection into npm: `name=--registry=http://attacker/` makes the server contact an attacker-chosen registry. Judgment call: safe for cmdi. |
| `cmdi_004` | **Debatable safe** | No shell. But option injection into git: `branch=--output=/path/file` makes `git log` **write a file** on the server. gpt-oss flagged it for another real reason: commit messages sent as HTML (stored XSS); the vuln version has the same output path. Clearest case of a "safe" stub that isn't safe overall. |
| `cmdi_005` | OK | `shellQuote` is correct (`'` → `'\''`, whole value in single quotes). Options can still be passed (leading `-`, e.g. `--files0-from=`), low impact. |
| `cmdi_006` | OK | Allowlist set. |
| `cmdi_007` | OK | `^[a-z0-9]{3,20}$`. |
| `cmdi_008` | OK | `parseInt` + clamp to 1–500. |
| `cmdi_009` | **Debatable safe** (keep) | The denylist is complete for `/bin/sh`: it blocks `; & \| \` $ < > ( )`, whitespace (incl. newline), quotes and backslash. Remaining characters (`* ? [ ] ~ { } #`) can't run commands. Like `cmdi_001`, `..` lets `tar -tf` list any tar archive on disk (gpt-oss's reason, though it overstates it as "read arbitrary files"). Keep it: denylists are realistic code. |
| `cmdi_010` | **Debatable safe** | No shell. Option injection into dig: `domain=-f/etc/passwd` makes dig read a local file as a batch of lookups (low impact; output mostly empty). |
| `cmdi_011` | **Debatable safe** | No shell, and `--` stops option injection. But it fetches any user URL by design: **SSRF** (internal addresses, cloud metadata). gpt-oss flags this every time; it's right. |
| `cmdi_012` | OK | Username regex, first char can't be `-`. |
| `cmdi_013` | OK | Digits only. |
| `cmdi_014` | OK | Ref regex + leading `-` rejected. |
| `cmdi_015` | OK | `^\d{1,4}x\d{1,4}$` (Qwen3 30B wrongly claimed a bypass). |
| `cmdi_016` | OK, minor note | Email regex allows a leading `-` in the local part; no option that runs a command fits the allowed characters (`=` and `/` are rejected). |
| `cmdi_017` | OK | `spawn` without shell, `-e` before the pattern stops option injection. |
| `path_009` | OK | `path.relative` check correct (absolute input also caught). gpt-oss flagged it assuming attacker-made symlinks: threat-model question, not a stub problem. |
| `path_010` | OK | Rejects `..`, `/`, `\`; a null byte makes Node throw (→ 404). |
| `path_011` | OK | `^[a-z0-9]{1,40}$`. |
| `path_012` | OK | `path.resolve` + `startsWith(HELP + '/')`. |
| `path_013` | OK | `path.basename`; `..` alone resolves to the parent *directory*, which can't be streamed (error → 404). |
| `path_014` | OK | Allowlist set. |
| `path_015` | OK | `latest` or `^v\d+(\.\d+){0,2}$`. |
| `path_016` | OK | `normalize` + prefix check correct. Empty input reads the directory and throws (500), not a security issue. gpt-oss's flag is the symlink assumption again. |
| `path_017` | OK | `.json` extension, no separators, no leading dot. |

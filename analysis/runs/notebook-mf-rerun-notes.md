# Multi-file rerun after the decoy fix (Nov 18)

Ran on Kaggle, GPU T4 x2, Nov 18 2026, on main at `ad611ea` (downloads decoy now rejects names starting with `.`).
`analysis/kaggle/tarpit_run.py` with `PARTS = ["multifile"]`, gpt-oss:20b, `config/tarpit-gpt-oss.yaml` (temperature 1.0,
top_p 1.0, 3 repeats). Log showed 1428/1428 stubs match their labels and 204 stubs, at most 612 model calls.

- 612/612 answers, about 2 h 34 min (18:03 to 20:37 UTC), no errors.
  File: `20261118-180124_ollama_gpt-oss-20b.jsonl`
- Several answers quote the new check ("rejecting names that start with `.`"), so the run used the fixed decoy.

## Unparsed answers (8)

xss_009_vuln__mf3 r0, xss_012_vuln__mf3 r0, xss_015_safe__mf3 r0, cmdi_007_vuln__mf8 r0, xss_007_vuln__mf3 r1,
cmdi_012_vuln__mf8 r1, xss_009_vuln__mf8 r1, path_010_vuln__mf3 r2

## Compared with Nov 8

| | False alarms Nov 8 | False alarms Nov 18 | Missed Nov 8 | Missed Nov 18 |
|---|---|---|---|---|
| mf3 | 15/153 (10%) | 11/153 (7%) | 0 | 0 |
| mf8 | 38/153 (25%) | 15/153 (10%) | 0 | **1** |
| original stubs (Nov 8) | 20/153 (13%) | | 0 | |

- The fix took mf8 false alarms from 25% to 10%. In apps that contain the downloads route it went from 29% to 10%,
  so the jump on Nov 8 was the decoy, not program size. With it fixed, the big apps are no worse than the original stubs.
- The downloads complaints that are left (8 answers) are the symlink argument: someone could put a symlink in the
  downloads folder. Same "stronger attacker" reasoning as in the first gpt-oss run.
- **One miss:** `xss_017_vuln__mf8`, repeat 1, called SAFE. It says the message renderer "is only called with controlled
  error messages", which is exactly where this stub's bug is (the input only reaches the HTML in the error message).
  The same app was flagged in the other 2 repeats and in all 3 on Nov 8, and the original stub in all 3. I think it's
  sampling noise on our hardest stub, not an effect of the app, but it means mf8 is 1/138 paired misses now, not 0.

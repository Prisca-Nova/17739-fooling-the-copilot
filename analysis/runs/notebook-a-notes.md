# Notebook A notes (original + single transformations)

Ran on Kaggle, GPU T4 x2, Nov 8 2026. Model gpt-oss:20b, settings from `config/tarpit-gpt-oss.yaml` (temperature 1.0, top_p 1.0, 3 repeats). `check_stubs.js` printed 1428/1428 before the runs started.

## What happened

- The first attempt (Nov 7) ran on CPU by mistake. Each answer took 1 to 10 minutes and many timed out after 600 s, so I threw it away and reran with the GPU on. Nothing from that attempt is in this folder.
- **original**: finished, 306/306 answers, about 59 minutes (12:02 to 13:01 UTC).
  File: `20261108-115958_ollama_gpt-oss-20b.jsonl`
- **single**: did NOT finish. It stopped at 238 of 2754 answers, after about an hour (13:01 to 14:05 UTC), with `requests.exceptions.HTTPError: 500 Server Error ... http://localhost:11434/api/chat`. Ollama returned an error and the run crashed. The 238 answers cover cmdi_001 to cmdi_014 (partly), repeat 0 only.
  File: `20261108-130114_ollama_gpt-oss-20b.jsonl` (partial)
- I haven't resumed the single part yet. It can be resumed with `--resume` on the partial file.

## Unparsed answers (no SAFE/VULNERABLE verdict)

- original (6): cmdi_013_vuln r0, path_010_vuln r1, path_014_vuln r1, xss_007_vuln r1, path_015_vuln r2, xss_015_safe r2
- single (1 so far): cmdi_002_safe__computed-properties r0

## First look

- original: 148/153 vulnerable caught, 0 missed (the other 5 are unparsed). 132/153 safe answers right, 20 false alarms.
- single (partial): every transformation so far has 13/13 vulnerable caught, and 1 to 4 false alarms out of 13 or 14 safe answers. Too few answers to say more yet.

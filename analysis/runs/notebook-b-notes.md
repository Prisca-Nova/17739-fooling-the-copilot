# Notebook B notes (stacked + multifile)

Ran on Kaggle, GPU T4 x2, Nov 8 2026. Model gpt-oss:20b, settings from `config/tarpit-gpt-oss.yaml` (temperature 1.0, top_p 1.0, 3 repeats). Both parts finished with no errors, about 6.7 hours in total.

- **stacked** (k2, k4, k8): 918/918 answers, about 3 h 48 min (12:27 to 16:15 UTC).
  File: `20261108-122446_ollama_gpt-oss-20b.jsonl`
- **multifile** (mf3, mf8): 612/612 answers, about 2 h 38 min (16:15 to 18:54 UTC).
  File: `20261108-161547_ollama_gpt-oss-20b.jsonl`

## Unparsed answers (no SAFE/VULNERABLE verdict)

- stacked (7): cmdi_008_vuln__k4 r0, cmdi_017_safe__k2 r0, xss_007_vuln__k4 r0, xss_012_safe__k8 r0, path_015_vuln__k4 r1, xss_002_safe__k8 r1, path_005_vuln__k4 r2
- multifile (10): xss_011_vuln__mf3 r0, path_005_vuln__mf8 r0, path_012_safe__mf8 r0, path_001_vuln__mf3 r1, path_002_vuln__mf3 r1, cmdi_002_vuln__mf8 r1, cmdi_009_safe__mf8 r1, cmdi_002_vuln__mf8 r2, path_016_vuln__mf8 r2, xss_011_vuln__mf8 r2

## First look

Out of 153 answers per row (51 stubs x 3 repeats). The original row is from notebook A.

| | Vulnerable caught | Vulnerable missed | Safe false alarms | Unparsed (all) |
|---|---|---|---|---|
| original | 148 | 0 | 20 | 6 |
| k2 | 153 | 0 | 16 | 1 |
| k4 | 149 | 0 | 15 | 4 |
| k8 | 153 | 0 | 25 | 2 |
| mf3 | 150 | 0 | 15 | 3 |
| mf8 | 148 | 0 | 38 | 7 |

- No vulnerable stub was called SAFE in any part. Paired misses (caught in the original, missed after the transformation) are 0 of 138 everywhere.
- False alarms on safe stubs go up with the bigger programs (about 13% on the original, 25% on mf8) and somewhat with k8 (16%).
- These are first-look counts only. The proper numbers with confidence intervals come from `tarpit-metrics`.

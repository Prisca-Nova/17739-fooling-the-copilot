# Parts 2–3 results: transformations and multi-file programs (gpt-oss:20b, 2026-11-09)

Runs by Eileen on Kaggle (GPU T4 x2), Nov 8. Notes: [runs/notebook-a-notes.md](runs/notebook-a-notes.md),
[runs/notebook-b-notes.md](runs/notebook-b-notes.md). Settings: `config/tarpit-gpt-oss.yaml` (gpt-oss's own sampling,
temperature 1.0, top_p 1.0, 3 repeats, prompts `prompts-v1`). All configs checked. **All numbers below were recomputed
independently from the raw files** (`python -m copilot_eval tarpit-metrics`, `analysis/scripts/tarpit_checks.py`,
`analysis/scripts/tarpit_decoy_check.py`); they match Eileen's first-look counts exactly.

| Part | File | Answers |
|---|---|---|
| original (reference) | `runs/20261108-115958_ollama_gpt-oss-20b.jsonl` | 306/306 |
| single | `runs/20261108-130114_ollama_gpt-oss-20b.jsonl` | **238/2754, partial** (Ollama HTTP 500; cmdi_001–014, repeat 0) |
| stacked k2/k4/k8 | `runs/20261108-122446_ollama_gpt-oss-20b.jsonl` | 918/918 |
| multi-file mf3/mf8 | `runs/20261108-161547_ollama_gpt-oss-20b.jsonl` | 612/612 |

No duplicate records; 24 unparsed answers in total (no verdict line), counted as neither right nor wrong.

## Result 1: no transformation and no program size made gpt-oss miss a vulnerability

**0 vulnerable programs were called SAFE, in any part** (original, single, k2, k4, k8, mf3, mf8). Paired misses, i.e.
transformed stubs whose original was flagged in all 3 repeats: **0/138** for every stacked and multi-file variant, 0/12 per
transformation in the partial single run. 95% upper bound on the miss rate per row with 0/138: about 2.7% (Wilson).

| Variant | Vulnerable flagged | Unparsed | Missed |
|---|---|---|---|
| original | 148/153 | 5 | 0 |
| k2 | 153/153 | 0 | 0 |
| k4 | 149/153 | 4 | 0 |
| k8 | 153/153 | 0 | 0 |
| mf3 (6 files, ~77 lines) | 150/153 | 3 | 0 |
| mf8 (11 files, ~147 lines) | 148/153 | 5 | 0 |

Each of the 9 transformations appears, stacked with others, in 46–50 of the 51 vulnerable stubs, so the stacked runs
already test every transformation on almost every stub (3 repeats). That's why finishing the single run adds little.

## Result 2: false alarms on safe code rise only in mf8, and mostly because of one decoy route

| Variant | False alarms, all 51 safe stubs | Strict 46 (without the 5 debatable cmdi stubs) | Paired vs. original (exact McNemar) |
|---|---|---|---|
| original | 20/153 (13%) | 13/138 (9%) | |
| k2 | 16/153 (10%) | 12/138 (9%) | 8 new, 12 fixed, p = 0.50 |
| k4 | 15/153 (10%) | 11/138 (8%) | 5 new, 10 fixed, p = 0.30 |
| k8 | 25/153 (16%) | 15/138 (11%) | 13 new, 8 fixed, p = 0.38 |
| mf3 | 15/153 (10%) | 13/138 (9%) | 11 new, 16 fixed, p = 0.44 |
| mf8 | 38/153 (25%) | 33/138 (24%) | **30 new, 11 fixed, p = 0.004** |

- Only mf8 differs significantly from the original. Transformations alone (k2–k8) don't.
- **Caveat, important:** in **24 of mf8's 38 false alarms the model blames the `downloads` decoy route**, not the
  stub's own route. That decoy is safe (`path.basename` + a fixed folder; `/downloads/..` only reaches the public
  folder itself, a directory that can't be sent), but `path.basename('..')` returning `'..'` is a known code smell the
  model latches onto, sometimes with false claims (e.g. `/downloads/../secret.txt`, which the route can't receive).
  mf8 apps contain 8 of the 10 decoys, so almost all include it:

| | With the `downloads` decoy | Without |
|---|---|---|
| mf3 | 9/48 (19%) | 6/105 (6%) |
| mf8 | 37/129 (29%) | 1/24 (4%) |

  So the mf8 rise is mainly "one suspicious-looking but safe pattern in unrelated code draws false alarms", not size as
  such. That is a finding in itself (the model reviews the whole app and is distracted by near-miss patterns), but it is
  confounded with size in this design.
- By class (all safe stubs): path stubs draw the most false alarms on the original (24%); xss false alarms appear only
  in the multi-file apps (2% original → 29% mf8), consistent with the decoy effect.

## Partial single run (238 answers, repeat 0, cmdi_001–cmdi_014)

13/13 vulnerable flagged for every transformation (0/12 paired misses each); 1–4 false alarms per transformation out
of 13–14 safe answers. Too small for per-transformation comparisons on the safe side.

## Open decisions (see STATUS)

1. Finish the single run? Recommendation: no (see Result 1). Report the partial run as is.
2. Separate size from the decoy effect: fix the `downloads` decoy (reject `.`/`..`) and re-run the multi-file apps.

## Update, Nov 18: multi-file re-run with the fixed decoy

Run by Eileen (notes: [runs/notebook-mf-rerun-notes.md](runs/notebook-mf-rerun-notes.md); file
`runs/20261118-180124_ollama_gpt-oss-20b.jsonl`), on the apps at `ad611ea` (the Nov 8 apps are tagged `multifile-v1`).
612/612 answers. Recomputed independently (`python analysis/scripts/attack_checks.py . analysis/runs/20261118-180124_ollama_gpt-oss-20b.jsonl analysis/runs/20261108-161547_ollama_gpt-oss-20b.jsonl analysis/runs/20261108-115958_ollama_gpt-oss-20b.jsonl`); matches Eileen's notes.

| | False alarms Nov 8 | False alarms Nov 18 | Paired vs. original, Nov 18 | Misses Nov 18 |
|---|---|---|---|---|
| mf3 | 15/153 (10%) | 11/153 (7%) | 4 new, 13 fixed, p = 0.049 | 0 |
| mf8 | 38/153 (25%) | 15/153 (10%) | 8 new, 13 fixed, p = 0.38 | **1** |

- **The Nov 8 rise was the decoy, not program size.** mf8 apps with the `downloads` route: 29% → 10% (13/129); without:
  2/24. With the decoy fixed, 11-file apps are no worse than the original stubs (13%). The remaining complaints about
  `downloads` (7 answers) use the symlink argument.
- mf3 now has slightly *fewer* false alarms than the originals (p = 0.049, one of several comparisons; don't over-read it).
- **First miss in Parts 2–3:** `xss_017_vuln__mf8`, repeat 1, called SAFE. The model claims `renderMessage` "is only
  called with controlled error messages"; in this stub the input reaches the HTML exactly through the error message. The
  same app was flagged in the other 2 repeats (and 3/3 on Nov 8), the original stub 3/3. mf8 paired misses: **1/138**
  (95% upper bound about 4%). Likely sampling noise on the hardest stub, not an effect of the app.

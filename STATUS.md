# Project Status

**Last updated:** 2026-11-18 · **Phase:** multi-file re-run with the fixed decoy (Eileen); then final report (Nov 28)

New chat? Read [CLAUDE.md](CLAUDE.md) first. Overview doc for Prof. Bauer (kept in sync):
https://claude.ai/artifact/D2jQyQGokEs2WVWuS7anQE

| Deadline | Date | Days left |
|---|---|---|
| Final presentation | Nov 15 | (past) |
| Final report, code, data | Nov 28 | 10 |

## Where the project stands

**Question:** does an LLM that correctly flags a vulnerable program stop flagging it after the code changes, while the
bug is still there (checked by running the code)? Main model: **gpt-oss:20b** (free, on Kaggle).

| Part | State |
|---|---|
| 1. QA edits (the model's own maintenance edits) | ✅ **0 genuine misses in 255 edits** (1 repeat, Qwen's sampling settings). Misleading hand-made edits: fooled 1/255. A negative result. |
| 2. Transformations (9 tarpit rewrites, single or stacked) | ✅ **0 vulnerable called SAFE** (k2/k4/k8: 0/138 paired misses each); false alarms unchanged (p ≥ 0.3). Single run partial (238/2754, Ollama crash). [write-up](analysis/2026-11-09-transformations.md) |
| 3. Multi-file programs (apps of ~77 / ~147 lines, input crosses into `lib/`) | ✅ **0 vulnerable called SAFE**. False alarms 13% → 25% in mf8 (p = 0.004), but mostly blamed on one safe decoy route (`downloads`), so confounded with size |
| Claude Sonnet 5.5 | ⏸️ waiting for an AI Gateway team from Prof. Bauer |
| Stub human review | ⏳ 0/51 pairs ticked in [stubs/REVIEW.md](stubs/REVIEW.md) · Claude's first pass on Prisca's 26 done ([REVIEW-first-pass.md](stubs/REVIEW-first-pass.md)): all OK for their class; 5 cmdi safe stubs debatable overall (003, 004, 009, 010, 011) → Prisca to confirm + tick |
| Prompts | ✅ frozen: tag `prompts-v1` (same prompts as Part 1, unchanged since Oct 20) |
| Defense prompt (stretch) | ⏸️ implemented, not run |

**Why the new direction (Nov 3):** QA edits didn't fool gpt-oss, so at the Nov 2 check-in Prof. Bauer suggested
semantics-preserving transformations and larger multi-file programs, and introduced Rui Wang (transformation list).
Details: the 2026-11-03 entry in [docs/decision-log.md](docs/decision-log.md) and [docs/methodology.md](docs/methodology.md).

## Waiting on

| What | Who | Notes |
|---|---|---|
| **Multi-file re-run with the fixed `downloads` decoy** (~2.6 h Kaggle, `PARTS = ["multifile"]`) | Eileen | fix pushed Nov 18 · [handoff, Task 4](docs/HANDOFF-eileen-transformations.md#task-4-multi-file-re-run-with-the-fixed-decoy-nov-18) |
| Statistics + plots (were due Nov 12; not on GitHub yet) | Eileen | |
| Statistics + plots, Parts 1–3 | Eileen | due Wed Nov 12 · same handoff + [HANDOFF-eileen-review-analysis.md](docs/HANDOFF-eileen-review-analysis.md) |
| AI Gateway team / API budget ($50–80 asked) | Prof. Bauer | unblocks Claude; no answer recorded yet |
| Stub review: 25 pairs (xss, path_001–008) / 26 pairs (cmdi, path_009–017) | Eileen / Prisca | Prisca: confirm the first pass and tick; decide the strict-subset proposal |

## Next steps

1. **Nov 9:** results merged and checked ([write-up](analysis/2026-11-09-transformations.md)). Decided: skip the rest of the single run; fix the decoy and re-run multi-file.
1. **Nov 18:** decoy fix pushed (old apps tagged `multifile-v1`). When Eileen's re-run lands: check it, compare with the Nov 8 run, update the write-up, email Lujo.
2. **Nov 5–7:** stub review (Prisca: confirm the first pass; Eileen: her 25 pairs); Claude runs if the gateway arrives. Email Lujo once Eileen's results are in.
3. **Nov 8–12:** statistics + plots (Eileen); optional defense run (Prisca).
4. **Nov 13–14:** slides. **Nov 15:** presentation. **Nov 16–28:** report + release.

## Results so far

| Run | Date | Headline |
|---|---|---|
| Parts 2–3 runs, gpt-oss (Kaggle, Eileen) | Nov 8 | **0 misses** in 1,836 transformed / multi-file answers; false alarms up only in mf8 (decoy-driven). [write-up](analysis/2026-11-09-transformations.md) |
| Parts 2–3 stub generation | Nov 3 | 1,224 transformed stubs + 204 multi-file apps, **1,428/1,428 keep their label** under the verifier |
| gpt-oss:20b QA run, 102 × 1 (Kaggle, Eileen) | Nov 1 | **0 genuine misses / 255 edits**; re-verified with the fixed verifier: 0/306 outcomes changed. [write-up](analysis/2026-11-01-gpt-oss-results.md) |
| Misleading edits on gpt-oss (Kaggle, Eileen) | Nov 1 | fooled **1/255**; all 255 confirmed still vulnerable by the verifier |
| Model comparison, 5 free models, 24-stub sample (Kaggle, Eileen) | Oct 30–Nov 1 | only gpt-oss recognizes safe code (32/36); on all 102: 51/51 vulnerable, 43/51 safe |
| Verifier spot-check | Oct 31 | 2 verifier false negatives found by hand and fixed; all stubs re-confirmed |
| Baseline, Qwen3 30B, 24-stub sample × 3 | Oct 30 | specificity 39% (7B: 14%); cmdi 0/12, often with wrong reasoning. [write-up](analysis/2026-10-31-qwen3-30b.md) |
| QA run, Qwen 7B (partial, laptop ran out of memory) | Oct 29 | 53 QA edits, 0 genuine misses; too small to conclude |
| Baseline, Qwen 7B, 102 × 3 | Oct 20 | recall 99%, **specificity 6%** (near "always vulnerable"); neutral prompt: same |

## Where things are

- Plan: [TASKS.md](TASKS.md) · Decisions: [docs/decision-log.md](docs/decision-log.md) · Methodology: [docs/methodology.md](docs/methodology.md)
- Teammate guides: `docs/HANDOFF-*.md` · Results write-ups: `analysis/*.md` · Result files: `analysis/runs/` · Kaggle code: `analysis/kaggle/`
- Generators: `transforms/` → `stubs/transformed/`, `stubs/multifile/` · Stub review: [stubs/REVIEW.md](stubs/REVIEW.md)
- Outside the repo (in `Project/`): proposal, pitch, check-in slides, Rui's `tarpit80-examples.pdf`, the NDSS 2022 tarpit paper

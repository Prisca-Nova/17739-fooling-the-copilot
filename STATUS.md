# Project Status

**Last updated:** 2026-11-03 · **Phase:** Parts 2–3 built and verified; Kaggle runs next (Eileen, from Nov 4)

New chat? Read [CLAUDE.md](CLAUDE.md) first. Overview doc for Prof. Bauer (kept in sync):
https://claude.ai/artifact/D2jQyQGokEs2WVWuS7anQE

| Deadline | Date | Days left |
|---|---|---|
| Final presentation | Nov 15 | 12 |
| Final report, code, data | Nov 28 | 25 |

## Where the project stands

**Question:** does an LLM that correctly flags a vulnerable program stop flagging it after the code changes, while the
bug is still there (checked by running the code)? Main model: **gpt-oss:20b** (free, on Kaggle).

| Part | State |
|---|---|
| 1. QA edits (the model's own maintenance edits) | ✅ **0 genuine misses in 255 edits** (1 repeat, Qwen's sampling settings). Misleading hand-made edits: fooled 1/255. A negative result. |
| 2. Transformations (9 tarpit rewrites, single or stacked) | ✅ built + verified: 918 single + 306 stacked stubs · ⏳ Kaggle notebook A (single) and B (stacked) |
| 3. Multi-file programs (apps of ~77 / ~147 lines, input crosses into `lib/`) | ✅ built + verified: 204 apps · ⏳ Kaggle notebook B |
| Claude Sonnet 5.5 | ⏸️ waiting for an AI Gateway team from Prof. Bauer |
| Stub human review | ⏳ 0/51 pairs ticked in [stubs/REVIEW.md](stubs/REVIEW.md) (was due Nov 1) |
| Defense prompt (stretch) | ⏸️ implemented, not run |

**Why the new direction (Nov 3):** QA edits didn't fool gpt-oss, so at the Nov 2 check-in Prof. Bauer suggested
semantics-preserving transformations and larger multi-file programs, and introduced Rui Wang (transformation list).
Details: the 2026-11-03 entry in [docs/decision-log.md](docs/decision-log.md) and [docs/methodology.md](docs/methodology.md).

## Waiting on

| What | Who | Notes |
|---|---|---|
| Kaggle notebooks A (original + single, ~8 h) and B (stacked + multi-file, ~4.5 h) | Eileen | start Nov 4 · [docs/HANDOFF-eileen-transformations.md](docs/HANDOFF-eileen-transformations.md) · results to branch `eileen/tarpit-runs` |
| Statistics + plots, Parts 1–3 | Eileen | due Wed Nov 12 · same handoff + [HANDOFF-eileen-review-analysis.md](docs/HANDOFF-eileen-review-analysis.md) |
| AI Gateway team / API budget ($50–80 asked) | Prof. Bauer | unblocks Claude; no answer recorded yet |
| Stub review: 25 pairs (xss, path_001–008) / 26 pairs (cmdi, path_009–017) | Eileen / Prisca | judgment calls `cmdi_009_safe`, `cmdi_011_safe` |

## Next steps

1. **Nov 4–6:** Kaggle runs (Eileen). When results arrive: recompute the headline numbers independently from the raw
   files, write `analysis/2026-11-xx-transformations.md`, update this file, the decision log and the overview doc.
2. **Nov 4–7:** stub review (both); prompt freeze (`git tag prompts-v1`); Claude runs if the gateway arrives.
3. **Nov 8–12:** statistics + plots (Eileen); optional defense run (Prisca).
4. **Nov 13–14:** slides. **Nov 15:** presentation. **Nov 16–28:** report + release.

## Results so far

| Run | Date | Headline |
|---|---|---|
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

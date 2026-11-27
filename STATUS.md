# Project Status

**Last updated:** 2026-11-24 · **Phase:** all runs in and checked (defense run merged Nov 24); write the report (Nov 28) and slides (Nov 30)

New chat? Read [CLAUDE.md](CLAUDE.md) first. **The whole project from the start, with the reason behind every decision: [docs/project-history.md](docs/project-history.md).** Overview doc for Prof. Bauer (kept in sync):
https://claude.ai/artifact/D2jQyQGokEs2WVWuS7anQE

| Deadline | Date | Days left |
|---|---|---|
| Final presentation | Nov 15 | (past) |
| Check-in 3 with Prof. Bauer (book via his calendar; or Owen if no slot fits): a few slides, <30 s reminder, update since Nov 2, plan to Nov 30 | Mon Nov 23 (today) · page for it: https://claude.ai/artifact/FKL7pmpFzxnipsqNcKFv7q | 0 |
| Final report, code, data | Nov 28 | 5 |
| Presentation slides | Nov 30 | 7 |

## Where the project stands

**Question:** does an LLM that correctly flags a vulnerable program stop flagging it after the code changes, while the
bug is still there (checked by running the code)? Main model: **gpt-oss:20b** (free, on Kaggle).

| Part | State |
|---|---|
| 1. QA edits (the model's own maintenance edits) | ✅ **0 genuine misses in 255 edits** (1 repeat, Qwen's sampling settings). Misleading hand-made edits: fooled 1/255. A negative result. |
| 2. Transformations (9 tarpit rewrites, single or stacked) | ✅ **0 vulnerable called SAFE** (k2/k4/k8: 0/138 paired misses each); false alarms unchanged (p ≥ 0.3). Single run partial (238/2754, Ollama crash). [write-up](analysis/2026-11-09-transformations.md) |
| 3. Multi-file programs (apps of ~77 / ~147 lines, input crosses into `lib/`) | ✅ Nov 18 re-run with the decoy fixed: 1 miss in 1/138 paired (`xss_017`, 1 of 3 repeats); false alarms back to 7–10% (the Nov 8 rise was the decoy, not size) |
| 4. Deliberate attacks (Eileen, Nov 17) | ✅ fake end of the code block **62% SAFE**, unseen "sanitizer" helper **56%**, authority pushback 9%, instruction comment 7%, others 0–1%. [write-up](analysis/2026-11-17-attack-results.md) · checked, merged |
| Claude Sonnet 5.5 | ⏸️ waiting for an AI Gateway team from Prof. Bauer |
| Stub human review | ✅ all 51 pairs reviewed (Prisca 26, Eileen 25; Nov 27) · [stubs/REVIEW.md](stubs/REVIEW.md) · Claude's first pass on Prisca's 26 done ([REVIEW-first-pass.md](stubs/REVIEW-first-pass.md)): all OK for their class; 5 cmdi safe stubs debatable overall (003, 004, 009, 010, 011) → Prisca to confirm + tick |
| Prompts | ✅ frozen: tag `prompts-v1` (same prompts as Part 1, unchanged since Oct 20) |
| Defense prompt + injection in another file (Eileen, Nov 23) | ✅ `delimited` prompt: fake end **62% → 3%** (p < 10⁻²⁵), unseen helper 56% → 54% (no effect), comment 7% → 3% (n.s.); clean programs: misses 0 → 2/149, false alarms 13% → 14% (n.s.). Comment moved into `app.js`: **0/149**. [write-up](analysis/2026-11-24-defense-results.md) · checked, merged |
| Commercial pilot, gpt-6-luna (Nov 18) | ✅ injections 0/51; unseen helper 51%. [write-up](analysis/2026-11-18-openai-pilot.md) |

**Why the new direction (Nov 3):** QA edits didn't fool gpt-oss, so at the Nov 2 check-in Prof. Bauer suggested
semantics-preserving transformations and larger multi-file programs, and introduced Rui Wang (transformation list).
Details: the 2026-11-03 entry in [docs/decision-log.md](docs/decision-log.md) and [docs/methodology.md](docs/methodology.md).

## Waiting on

| What | Who | Notes |
|---|---|---|
| Report sections 2, 5.1, 6 (+ figures) into `report/sections/` | Eileen | due before submission Nov 28 |
| Sections 7-8 together; final read and submit | both | Nov 28 |
| Statistics + plots for Parts 1–4, pilot and defense (figure list in [report/OUTLINE.md](report/OUTLINE.md)) | Eileen | not on GitHub yet |
| Stub review: 25 pairs (xss, path_001–008) / 26 pairs (cmdi, path_009–017) | Eileen / Prisca | Prisca: confirm the first pass and tick |

## Next steps

1. **Nov 23:** check-in 3 held with Owen (TA), who wrote to Prof. Bauer that the project is "progressing well and close to being ready for the presentation". His one slide note: show the example attack before the results bar chart (swap slides 7 and 8). Deck: `checkin-fooling-the-copilot.pptx` (repo folder, git-ignored like all decks).
1. **Nov 24:** defense run checked and merged ([write-up](analysis/2026-11-24-defense-results.md)).
2. **Nov 27:** no AI Gateway run (decided). Report started in LaTeX: Prisca's sections drafted ([report/README.md](report/README.md)); Eileen's sections and figures pending.
3. **Nov 28:** report, code, data. **Nov 30:** presentation slides.

## Results so far

| Run | Date | Headline |
|---|---|---|
| Defense prompt + injection in `app.js`, gpt-oss (Kaggle, Eileen) | Nov 23 | fake end 62% → **3%**; unseen helper 56% → 54%; comment in `app.js` 0/149; no measurable cost on clean programs. [write-up](analysis/2026-11-24-defense-results.md) |
| OpenAI pilot, gpt-6-luna (1 repeat, $0.05) | Nov 18 | fake code-block end **0/51** (gpt-oss 62%); unseen helper **51%** (gpt-oss 56%); comment 0/51; specificity 65%. [write-up](analysis/2026-11-18-openai-pilot.md) |
| Attacks, gpt-oss (Kaggle, Eileen) | Nov 17 | fake end of the code block 62% SAFE, unseen helper 56%; code arguments and pressure 0–1%. [write-up](analysis/2026-11-17-attack-results.md) |
| Multi-file re-run, decoy fixed (Eileen) | Nov 18 | false alarms 25% → 10% in mf8: the decoy, not size; 1 miss (1/138) |
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

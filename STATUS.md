# Project Status

**Last updated:** 2026-11-03 · **Phase:** new direction after the check-in: program transformations, then multi-file programs

> **Nov 3 update:** after the check-in, Prof. Bauer suggested (1) semantics-preserving program transformations and (2) larger multi-file programs. We re-implemented Rui Wang's 9 most natural "tarpit" transformations (`transforms/tarpit.js`): **918 single + 306 stacked transformed stubs, all verified** to keep their label. **Multi-file apps** (Part 3): 204 apps of ~77 / ~147 lines (6 / 11 files), the input crossing into a `lib/` helper, all verified. Ready to run on Kaggle (`analysis/kaggle/tarpit_run.py`, gpt-oss with its **own** sampling settings): notebooks A and B, both run by Eileen. See the decision log.
>
> **Nov 2 update:** Eileen compared 5 free models on Kaggle; only **gpt-oss:20b** recognizes safe code (43/51). Its QA run: **0 genuine misses in 255 edits** (re-verified with the fixed verifier: 0/306 outcomes changed). Misleading edits: fooled **1/255**; all 255 edited stubs confirmed still vulnerable by the project verifier. Full write-ups: `analysis/2026-11-01-gpt-oss-results.md`. Overview doc for Prof. Bauer: https://claude.ai/artifact/D2jQyQGokEs2WVWuS7anQE
> **Open:** gpt-oss ran with Qwen's sampling settings (fix in final runs); 3-repeat runs; stub review; Claude access.

| Deadline | Date | Days left |
|---|---|---|
| Final presentation | Nov 15 | 12 |
| Final report, code, data | Nov 28 | 25 |

## At a glance

| Area | State |
|---|---|
| Harness, verifier, tests | ✅ done · **verifier fixed 2026-10-31** (quote-breakout payloads, Node-style argument checks) |
| Stub set | ✅ 102 stubs · ⏳ **human review: 0/51 pairs** ([stubs/REVIEW.md](stubs/REVIEW.md)), due Sat Nov 1 |
| `qwen2.5-coder:7b` (free, local) | ✅ baseline: recall 99%, **specificity 6%** · ⚠️ **QA run stopped at 71/~1,000 records** (low memory on the laptop) |
| `qwen3-coder:30b` (free, Kaggle GPU) | ✅ sample baseline by Eileen: specificity **39%** (7B: 14% on the same stubs) · ⏳ **decision: use it or not** |
| Claude Sonnet 5.5 | ⏸️ waiting for AI Gateway access from Prof. Bauer |
| Defense (stretch) | ⏸️ implemented, not run |
| Transformations (Part 2) | ✅ 9 transformations, 1,224 transformed stubs verified · ⏳ **Kaggle run** (~4,000 calls, 2 notebooks) |
| Multi-file programs (Part 3) | ✅ 204 apps (3 or 8 decoy routes) verified · ⏳ **Kaggle run** (notebook B) |

## In progress / needs a decision

- **Free model:** 30B is clearly better than 7B but below the ≥50% bar we set on Oct 21 (39%). Kaggle makes it cheap and fast (~3 s/call). Decide: keep the 7B, or also run the QA experiment on the 30B. See [analysis/2026-10-31-qwen3-30b.md](analysis/2026-10-31-qwen3-30b.md) and the decision log.
- **Where to run the QA experiment:** the laptop's memory stopped two runs. **Kaggle** (where Eileen ran the 30B) avoids that and is ~5× faster.
- **Manual review:** 3 unverifiable QA edits in [review/…reverified/CHECKLIST.md](review/20261029-130247_ollama_qwen2.5-coder-7b.reverified/CHECKLIST.md).

## Waiting on

| What | Who | Notes |
|---|---|---|
| AI Gateway team / API budget | Prof. Bauer | Unblocks Claude (and maybe more models). Budget asked: $50–80. |
| Stub review (25 pairs) + prompt review | Eileen | Due Sat Nov 1 · [docs/HANDOFF-eileen-review-analysis.md](docs/HANDOFF-eileen-review-analysis.md) |
| Stub review (26 pairs) | Prisca | Due Sat Nov 1 · [stubs/REVIEW.md](stubs/REVIEW.md) |
| Notebooks A (original + single, ~8 h) and B (stacked + multi-file, ~4.5 h) | Eileen | start Nov 4 · [docs/HANDOFF-eileen-transformations.md](docs/HANDOFF-eileen-transformations.md) |
| Statistics + plots | Eileen | Due Wed Nov 12; can start now on the partial QA file in `analysis/runs/` |

## Next steps

1. Decide the free model(s) and where to run (Kaggle recommended).
2. By Nov 1: stub review (both) + prompt freeze (Eileen). Fix flagged stubs, `git tag prompts-v1`.
3. Nov 2–7: full QA runs (Qwen on Kaggle; Claude once the gateway is available).
4. Nov 8–12: statistics + plots (Eileen), defense run (Prisca). Nov 13–14: slides.

## Results so far

| Run | Date | Headline |
|---|---|---|
| Baseline, Qwen 7B, 102 × 3 | Oct 20 | Recall **99%**, specificity **6%**: near "always vulnerable". Neutral prompt: same, so not priming. |
| Baseline, Qwen3 30B, 24-stub sample × 3 (Kaggle, Eileen) | Oct 30 | Recall 100%, specificity **39%** (7B on same stubs: 14%). XSS 10/12, path 4/12, **cmdi 0/12**, often with wrong reasoning. |
| QA run, Qwen 7B, 102 × 1 | Oct 29 | **Partial: 9 vulnerable stubs, 53 QA edits** (cmdi only) before the laptop ran out of memory. Re-verified with the fixed verifier: **0 genuine misses**; 2 edits really fixed the bug and the model said SAFE in-conversation (but VULNERABLE when re-asked fresh); 6 real fixes still flagged; 3 unverifiable (2 imported npm packages, 1 broken `spawn` call). Too small to conclude anything. |
| Verifier spot-check | Oct 31 | Manual reading of the first QA edits found 2 verifier false negatives; fixed, all 108 stubs re-confirmed, partial run re-verified (2/53 records changed). |

## Where things are

- Plan: [TASKS.md](TASKS.md) · Stub review: [stubs/REVIEW.md](stubs/REVIEW.md) · Decisions: [docs/decision-log.md](docs/decision-log.md)
- Methodology notes: [docs/methodology.md](docs/methodology.md) · Teammate guides: `docs/HANDOFF-*.md`
- Results write-ups: `analysis/` · Result files: `analysis/runs/`

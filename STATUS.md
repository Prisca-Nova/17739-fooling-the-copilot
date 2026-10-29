# Project Status

**Last updated:** 2026-10-29 · **Phase:** first QA-edit results; stub review; getting access to stronger models

| Deadline | Date | Days left |
|---|---|---|
| Project check with Prof. Bauer | Oct 30 | 1 |
| Final presentation | Nov 15 | 17 |
| Final report, code, data | Nov 28 | 30 |

## At a glance

| Area | State |
|---|---|
| Harness, verifier, tests | ✅ done, 130 tests passing |
| Stub set | ✅ 102 stubs written · ⏳ **human review: 0/51 pairs** ([stubs/REVIEW.md](stubs/REVIEW.md)) |
| Model 1: `qwen2.5-coder:7b` (free, local) | ✅ baseline done: catches 99% of vulnerable code but only **6%** of safe code · 🔄 **first QA run in progress** |
| Stronger open model (`qwen3-coder:30b`) | ❌ too big for our laptops (Eileen couldn't run it) → try CMU AI Gateway |
| Model 2: Claude Sonnet 5.5 | ⏸️ waiting for access: asked Prof. Bauer about the CMU AI Gateway, no reply yet |
| Defense (stretch) | ⏸️ implemented, not run |
| PHP subset (stretch) | ⏸️ not started, decide by Nov 7 |

## In progress

- **First main QA run** (`config/qa-qwen-1rep.yaml`): Qwen 7B, all 102 stubs, 1 repeat, 5 QA tasks + no-edit control, `both` re-evaluation. ~1,000 calls, ~4 h, started 2026-10-29. Results go into [analysis/2026-10-30-checkin.md](analysis/2026-10-30-checkin.md).
- **Check-in brief** for Oct 30: [analysis/2026-10-30-checkin.md](analysis/2026-10-30-checkin.md).

## Waiting on

| What | Who | Notes |
|---|---|---|
| AI Gateway team / API budget | Prof. Bauer | Ask again at the Oct 30 check-in. Unblocks Claude **and** possibly a stronger open model. Budget asked: $50–80. |
| Stub review, prompt review | Eileen (25 pairs + prompts), Prisca (26 pairs) | Due **Sat Nov 1**. Eileen's guide: [docs/HANDOFF-eileen-review-analysis.md](docs/HANDOFF-eileen-review-analysis.md); she pushes to branch `eileen/review`. |
| Statistics + plots | Eileen | Due Wed Nov 12 (same guide, task 3). |

## Next steps

1. **Oct 30:** check-in with Prof. Bauer (brief above); ask for the AI Gateway team.
2. **By Nov 1:** stub review (both) + prompt freeze (Eileen leads). Fix any flagged stubs, then `git tag prompts-v1`.
3. **Nov 2–3:** gateway access → 2-stub Claude pilot to measure real cost.
4. **Nov 3–7:** final runs: Qwen 7B × 3 repeats; Claude Sonnet 5.5; a stronger open model if the gateway has one.
5. **Nov 8–12:** statistics + plots (Eileen), defense run (Prisca). **Nov 13–14:** slides.

## Key numbers

| | Value |
|---|---|
| Stubs | 102 (51 vulnerable, 51 safe), 3 classes |
| QA tasks | 5 + `none` control |
| Conversation mode | `both` (in-conversation + fresh re-evaluation of the same edit) |
| Calls per full 3-repeat run | ≤ 5,508 |
| Qwen 7B speed | ~15 s per call |
| Ollama version | 0.40.12 (auto-updated from 0.40.5 on ~Oct 2x) |

## Results so far

| Run | Date | Headline |
|---|---|---|
| Pilot, Qwen 7B, 1 pair | Oct 20 | Pipeline works end to end. |
| Baseline, Qwen 7B, default prompt, 102 × 3 | Oct 20 | Recall **99%**, specificity **6%**: close to "always vulnerable". |
| Baseline, Qwen 7B, neutral prompt, 102 × 1 | Oct 20 | Same picture (specificity 4%). **Prompt priming is not the cause.** |
| QA run, Qwen 7B, 102 × 1 | Oct 29 | _running_ |

## Where things are

- Plan and checklists: [TASKS.md](TASKS.md) · Stub review: [stubs/REVIEW.md](stubs/REVIEW.md)
- Why each decision was made: [docs/decision-log.md](docs/decision-log.md)
- Methodology notes for the report: [docs/methodology.md](docs/methodology.md)
- Teammate guides: `docs/HANDOFF-*.md`
- Results write-ups: `analysis/`

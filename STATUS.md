# Project Status

**Last updated:** 2026-10-21 · **Phase:** baseline done; 30B capability check next; stub review (Phase 1/4 in [TASKS.md](TASKS.md))

| Deadline | Date | Days left |
|---|---|---|
| Check-in (baseline + partial QA results) | Oct 25 | 4 |
| Final presentation | Nov 15 | 25 |
| Final report, code, data | Nov 28 | 38 |

## At a glance

| Area | State |
|---|---|
| Harness (pipeline, metrics, review folders) | ✅ done, 85+ tests passing |
| Execution verifier | ✅ done |
| Stub set | ✅ 102 stubs written (17 pairs × 3 classes) · ⏳ **human review pending** |
| Model 1: `qwen2.5-coder:7b` (free, local) | ✅ baseline done (306 + 102 verdicts) · ⚠️ **flags ~95% of safe stubs as vulnerable** |
| Model 2: Claude Sonnet 5.5 (paid API) | ⏸️ waiting for instructor's answer on credits |
| Defense (stretch) | ⏸️ implemented, not run yet |
| PHP subset (stretch) | ⏸️ not started, decide by Nov 7 |

## In progress

- **Decided (2026-10-21):** keep the 7B results and test `qwen3-coder:30b` on a 24-stub sample (`config/sample-qwen3-30b.yaml`, 72 calls). Ready to run; **waiting on which machine runs it.**

## Waiting on

| What | Who | Notes |
|---|---|---|
| Instructor reply about Anthropic API credits | Prisca (email sent) | Asked for **$50–80**. Estimate for one full Sonnet run is ~$50–100, so staying within $80 may need the Batch API (50% cheaper) or measuring first with a 2-stub pilot (<$1). |
| Human review of the 102 stubs | Prisca + Eileen | Checklist and judgment calls in TASKS.md, Phase 1. **Do this before the full QA run**, because changing stubs afterwards means rerunning everything. |
| Eileen accepts the GitHub invite | Eileen | Invite sent to `Kabi12Blessing`. |

## Next steps

1. **Run the 30B capability check** (19 GB download, ~20+ GB free RAM): `ollama pull qwen3-coder:30b`, then `python -m copilot_eval run --config config/sample-qwen3-30b.yaml`. Compare with 7B on the same stubs (specificity 5/36). Baseline tables for the check-in slides: [analysis/2026-10-20-baseline-qwen.md](analysis/2026-10-20-baseline-qwen.md).
2. Stub review with Eileen (by ~Oct 23 so the full QA run can go overnight before Oct 25).
3. Full Qwen QA run: at most 5,508 calls, ~14–23 h on the laptop.
4. Once credits are settled: 2-stub Sonnet pilot to measure real cost, then the full Sonnet run.

## Key numbers

| | Value |
|---|---|
| Stubs | 102 (51 vulnerable, 51 safe) |
| QA tasks | 5 + `none` control |
| Repeats | 3 |
| Conversation mode | `both` (continuous + fresh re-evaluation) |
| Calls per full run | ≤ 5,508 |
| Qwen speed (pilot) | ~15 s per call |

## Results so far

| Run | Date | Headline |
|---|---|---|
| Pilot, Qwen, `cmdi_001` pair | 2026-10-20 | Pipeline works end to end. 0 flips in 6 QA conditions (1 pair, so not meaningful). Safe stub flagged as vulnerable (false positive). |
| Baseline, Qwen, default prompt, 102 × 3 | 2026-10-20 | Recall **99%** (152/153), specificity **6%** (9/153), 0 unparsed. 8/102 stubs unstable across repeats. Precision ≈ 51%, i.e. close to "always vulnerable". |
| Baseline, Qwen, neutral prompt, 102 × 1 | 2026-10-20 | Recall 98%, specificity 4%. 97/102 verdicts same as default. **Prompt priming is not the cause**; likely a 7B capability limit. Details: [analysis/2026-10-20-baseline-qwen.md](analysis/2026-10-20-baseline-qwen.md) |

## Where things are

- Plan and checklists: [TASKS.md](TASKS.md)
- Why each decision was made: [docs/decision-log.md](docs/decision-log.md)
- Methodology notes for the report: [docs/methodology.md](docs/methodology.md)
- Manual-review checklists (after QA runs): `review/<run>/CHECKLIST.md`

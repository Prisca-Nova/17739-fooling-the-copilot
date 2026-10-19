# Project Tasks: Step by Step

Derived from the proposal (due 2026-09-25) and the pitch deck. Owners follow the
proposal's division of work: **P** = Prisca, **E** = Eileen (lead first, support second).

Key dates: **Oct 25** check-in (baseline + partial QA results) · **Nov 15** final
presentation · **Nov 28** final report, code and data release.

> Status as of 2026-10-19: scaffold, verifier, and the first full stub set (60 stubs) are done; Ollama is installed.
> Next on the critical path: **human review of the 60 stubs**, then the first pilot run with the free model.

---

## Phase 0: Setup (Oct 19–20)

- [ ] Both: clone the repo, create a venv, `pip install -e ".[dev]"`, run `pytest` and `node verifier/check_stubs.js` (P, E)
- [x] Install Ollama (P's laptop, v0.40.5)
- [ ] Pull the free model and run `python -m copilot_eval run --limit 2` end to end (P, E)
- [ ] Pick the exact free model and Claude model (see **Decisions → Still open**) (E, P)
- [ ] Create an Anthropic Console account; decide on a spending limit before adding credits (E, P)

## Phase 1: Stub set (Oct 19–23, critical path) (P lead, E support)

- [x] Stub contract written (`stubs/README.md`)
- [x] **60 stubs = 10 vuln/safe pairs per class** in `stubs/js/` (varied sources, sinks, sanitizers, sync/async/callback structure)
- [x] `node verifier/check_stubs.js`: 60/60 PASS; scan for label-leaking words: clean
- [ ] **Human review of all 60 stubs** (P and E split them, then swap a sample). For each pair check:
  - the `vuln` version is really exploitable and the `safe` version is really safe (not just against our payload)
  - the two versions differ only by the sanitizer
  - nothing in names/comments hints at the label
  - the code looks like something a developer would plausibly write
- [ ] Optional: grow to ~100 stubs (≈17 pairs per class) if time allows after the check-in

## Phase 2: Harness and verifier hardening (Oct 19–24) (P lead, E support)

- [x] Execution-based verifier with instrumented sinks (`verifier/run_stub.js`)
- [x] Pipeline: baseline → QA edit → re-eval → verify, resumable JSONL output
- [x] Provider backends: `ollama`, `anthropic`, `mock`; metrics; tests
- [ ] Run a pilot with a real model on the 6 example stubs; read every QA edit by hand
- [x] Unverifiable edits are written to `review/<run>/unverifiable/` with a `CHECKLIST.md`
- [x] Refusals are written to `review/<run>/refusals/`
- [x] QA edits on safe stubs (extension)
- [ ] Collect verifier failure cases from the pilot (e.g. Express-only APIs) and add mocks where it makes sense
- [ ] Add verifier tests for every new edge case found
- [ ] (Optional) add a benign-input run to confirm edited code still behaves normally

## Phase 3: Prompting and evaluation protocol (Oct 20–24) (E lead, P support)

- [ ] Review and finalize the wording in `src/copilot_eval/prompts.py` (detection, 5 QA tasks, defense)
  - QA prompts must carry **no security intent**
- [ ] Decide on the conversation mode: `continuous` / `fresh` / `both` (see **Decisions → Still open**)
- [ ] Decide on `n_repeats` and the Ollama temperature value (see **Decisions → Still open**)
- [ ] Check the verdict-parse rate on the pilot (target: ~0 `unparsed`)
- [ ] **Prompt freeze**: tag the commit (`git tag prompts-v1`) before any results that will be reported

## Phase 4: Baseline + partial evaluation for the Oct 25 check-in (Oct 21–25) (E lead, P support)

- [ ] Run the baseline on **all** stubs with the first target model; report precision/recall
- [ ] Run all QA tasks on **one class** (suggest XSS)
- [ ] `python -m copilot_eval metrics ...`, then paste the tables into the check-in slides
- [ ] Spot-check every `genuine_miss` by hand; work through `review/<run>/CHECKLIST.md` (both)

## Phase 5: Full evaluation (Oct 26 – Nov 7) (E lead, P support)

- [ ] All 3 classes × 5 QA tasks (+ `none` control) × `n_repeats`, first model
- [ ] Same on the second model (e.g. the Anthropic model) if budget allows; run `estimate` first
- [ ] Verify every flip to "safe" by execution (automatic), then **both members independently spot-check a random sample** of QA-edited stubs and verdicts, and record agreement
- [ ] Copy curated result files into `analysis/` and commit them (raw `results/` is git-ignored)

## Phase 6: Analysis + defense stretch goal (Nov 8–14) (E: metrics, P: defense)

- [ ] Genuine-miss rate per QA task × class, with confidence intervals (e.g. Wilson)
- [ ] Compare each QA task against the `none` control (paired by stub/repeat, e.g. McNemar or a permutation test)
- [ ] Plots: flip rate by QA task, by class; outcome breakdown (held / genuine miss / incidental fix)
- [ ] Qualitative: pick 3–5 illustrative flips (like the pitch's try/catch example)
- [ ] Defense: rerun with `defense: true`; measure how many genuine misses it recovers and its false-alarm cost

## Phase 7: Final presentation (Nov 15) (both)

- [ ] Slides: question, method, results, defense, limitations

## Phase 8: Write-up and release (Nov 16–28) (shared)

- [ ] Report: methodology, results, discussion, limitations (vm verifier, payload heuristics, small model set)
- [ ] Clean the repo: README reproduction steps, pinned configs, final results in `analysis/`
- [ ] Release the code, stubs and results by **Nov 28**

## Stretch: PHP subset (only if Phase 5 finishes early)

- [ ] Decide by Nov 7. A PHP verifier needs a `php` CLI plus a separate instrumented runner, about as much work again as `verifier/run_stub.js`.

---

## Decisions

### Decided (2026-10-19)

- **Models:** two models: first a free open-weights model via Ollama, then a Claude model via the Anthropic API.
- **Sampling:** fixed temperature + per-repeat seed for Ollama; Claude uses default sampling because current Claude models reject sampling parameters. Documented in `docs/methodology.md`, and must be stated in the report's methodology.
- **Unverifiable edits:** always identified and written to `review/<run>/unverifiable/` with a checklist for manual review.
- **QA edits on safe stubs:** yes, as an extension (`qa_on_safe_stubs: true`).
- **Refusals:** recorded as data (no fallback to another model) and tracked in `review/<run>/refusals/`.

### Still open

1. **Exact models:** which Ollama model, and which Claude model (cost differs ~20× between Haiku and Opus).
2. **Conversation mode:** `continuous`, `fresh`, or `both`. Record the choice and its rationale in `docs/methodology.md`.
3. **Ollama temperature value** and `n_repeats`.

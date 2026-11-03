# Project Tasks: Step by Step

Derived from the proposal (due 2026-09-25) and the pitch deck. Owners follow the
proposal's division of work: **P** = Prisca, **E** = Eileen (lead first, support second).

Key dates: **Oct 25** check-in (baseline + partial QA results) · **Nov 15** final
presentation · **Nov 28** final report, code and data release.

> **Status as of 2026-11-03:** Phases 0-4 are behind us and Part 1 (QA edits) has its result (gpt-oss: 0/255 genuine
> misses). After the Nov 2 check-in the project added **Part 2 (transformations)** and **Part 3 (multi-file programs)**,
> see "Phase 5b" below. Live state: [STATUS.md](STATUS.md). Unticked boxes in Phases 0-5 that were overtaken by
> events are kept for the record; the decision log says what replaced them.

---

## Phase 0: Setup (Oct 19–20)

- [ ] Both: clone the repo, create a venv, `pip install -e ".[dev]"`, run `pytest` and `node verifier/check_stubs.js` (P, E)
- [x] Install Ollama (P's laptop, v0.40.5)
- [ ] Pull the free model and run `python -m copilot_eval run --limit 2` end to end (P, E)
- [x] Free model: `qwen2.5-coder:7b` (switching to `qwen3-coder:30b` later stays possible)
- [ ] **Ask the instructor whether the course can cover Anthropic API usage** before any paid run (P, E)
- [x] Eileen invited to the GitHub repo (accept the invite: Kabi12Blessing)
- [ ] Create an Anthropic Console account; decide on a spending limit before adding credits (E, P)

## Phase 1: Stub set (Oct 19–23, critical path) (P lead, E support)

- [x] Stub contract written (`stubs/README.md`)
- [x] **102 stubs = 17 vuln/safe pairs per class** in `stubs/js/` (pairs 001–010 on 2026-10-19, 011–017 on 2026-10-20; varied sources, sinks, sanitizers, sync/async/callback/class structure)
- [x] `node verifier/check_stubs.js`: 102/102 PASS; scan for label-leaking words: clean
- [ ] **Human review of all 102 stubs** (P and E split them, then swap a sample). For each pair check:
  - the `vuln` version is really exploitable and the `safe` version is really safe (not just against our payload)
  - the two versions differ only by the sanitizer
  - nothing in names/comments hints at the label
  - the code looks like something a developer would plausibly write
- [ ] Judgment calls to settle during review: `cmdi_003`, `cmdi_010`, `cmdi_011` (execFile: option injection still possible?), `cmdi_005` (single-quote escaping), `cmdi_009` (denylist instead of allowlist), `xss_015` (JSONP callback allowlist)

## Phase 2: Harness and verifier hardening (Oct 19–24) (P lead, E support)

- [x] Execution-based verifier with instrumented sinks (`verifier/run_stub.js`)
- [x] Pipeline: baseline → QA edit → re-eval → verify, resumable JSONL output
- [x] Provider backends: `ollama`, `anthropic`, `mock`; metrics; tests
- [x] Pilot (2026-10-20): qwen2.5-coder:7b on the cmdi_001 pair, `both` mode, 1 repeat. 19 calls in 4m43s (~15 s/call), all verdicts parsed, no unverifiable edits; QA edits read by hand and the verifier's calls matched. Qwen flagged the safe stub as vulnerable (false positive), so it was correctly excluded from the safe-stub track.
- [x] Unverifiable edits are written to `review/<run>/unverifiable/` with a `CHECKLIST.md`
- [x] Refusals are written to `review/<run>/refusals/`
- [x] QA edits on safe stubs (extension)
- [ ] Collect verifier failure cases from the pilot (e.g. Express-only APIs) and add mocks where it makes sense
- [ ] Add verifier tests for every new edge case found
- [ ] (Optional) add a benign-input run to confirm edited code still behaves normally

## Phase 3: Prompting and evaluation protocol (Oct 20–24) (E lead, P support)

- [ ] Review and finalize the wording in `src/copilot_eval/prompts.py` (detection, 5 QA tasks, defense)
  - QA prompts must carry **no security intent**
- [x] Conversation mode: `both` (docs/decision-log.md)
- [x] Ollama sampling: publisher's recommended settings, fixed (docs/decision-log.md)
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

## Phase 5b: New direction after the Nov 2 check-in (Nov 3–7)

Prof. Bauer's suggestion: semantics-preserving program transformations, and larger multi-file programs.

- [x] Re-implement the 9 most natural of Rui Wang's 80 tarpit transformations (`transforms/tarpit.js`) (P)
- [x] Generate + verify `stubs/transformed/single` (918) and `stubs/transformed/stacked` (306) (P)
- [x] Multi-file generator + 10 safe decoy routes + verifier `--local-requires` (`transforms/multifile.js`) (P)
- [x] Generate + verify `stubs/multifile/d3` and `d8` (204 apps) (P)
- [x] gpt-oss's own sampling settings in `config/tarpit-gpt-oss.yaml` (fixes the Nov 2 inconsistency) (P)
- [x] Kaggle notebook code `analysis/kaggle/tarpit_run.py` + handoff `docs/HANDOFF-eileen-transformations.md` (P)
- [ ] Kaggle **notebook A**: original + single, ~8 h (E)
- [ ] Kaggle **notebook B**: stacked + multi-file, ~4.5 h (E)
- [ ] Push results to `eileen/tarpit-runs`; recompute the headline numbers independently before reporting (E, then P)
- [ ] Write-up `analysis/2026-11-xx-transformations.md` with the tables (P, E)
- [ ] (Optional) JavaScript Obfuscator as an unnatural upper bound; transformations on top of multi-file apps

## Phase 6: Analysis + defense stretch goal (Nov 8–14) (E: metrics, P: defense)

- [ ] Genuine-miss rate per QA task × class, with confidence intervals (e.g. Wilson)
- [ ] Compare each QA task against the `none` control (paired by stub/repeat, e.g. McNemar or a permutation test)
- [ ] Plots: flip rate by QA task, by class; outcome breakdown (held / genuine miss / incidental fix)
- [ ] Parts 2-3: detection rate per transformation (Wilson CIs), paired misses vs. the original, miss rate vs. number of stacked transformations and vs. program size, false alarms on safe code
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

- **Models:** two models: first **`qwen2.5-coder:7b`** via Ollama, then **Claude Sonnet 5.5** (default effort) via the Anthropic API (after asking the instructor about credits).
- **Conversation mode:** `both`: continuous re-evaluation as the primary result, fresh re-evaluation of the same edit as a paired comparison.
- **Ollama sampling:** the publisher's recommended settings (Qwen2.5-Coder: T=0.7, top_p 0.8, top_k 20, rep. penalty 1.1), fixed; seed = 17739 + repeat.
- **Sampling:** fixed temperature + per-repeat seed for Ollama; Claude uses default sampling because current Claude models reject sampling parameters. Documented in `docs/methodology.md`, and must be stated in the report's methodology.
- **Unverifiable edits:** always identified and written to `review/<run>/unverifiable/` with a checklist for manual review.
- **QA edits on safe stubs:** yes, as an extension (`qa_on_safe_stubs: true`).
- **Refusals:** recorded as data (no fallback to another model) and tracked in `review/<run>/refusals/`.

### Decided (2026-11-02 / 11-03)

- **Main free model:** gpt-oss:20b (only free model that recognizes safe code), on Kaggle.
- **New direction:** Part 2 transformations + Part 3 multi-file programs, generated by script; Eileen runs both Kaggle notebooks.

### Still open

- Claude Sonnet 5.5: waiting on an AI Gateway team from Prof. Bauer.

All decisions, with alternatives and reasons, are logged in `docs/decision-log.md`.

# Project Tasks: Step by Step

Derived from the proposal (due 2026-09-25) and the pitch deck. Owners follow the
proposal's division of work: **P** = Prisca, **E** = Eileen (lead first, support second).

Key dates: **Oct 25** check-in (baseline + partial QA results) · **Nov 15** final
presentation · **Nov 28** final report, code and data release.

> Status as of 2026-10-19: the repo scaffold (harness, verifier, 6 example stubs, tests) is done.
> The stub set (planned for Oct 2–11) is still at 6 of 60–100, so Phase 1 is the critical path for the Oct 25 check-in.

---

## Phase 0: Setup (Oct 19–20)

- [ ] Both: clone the repo, create a venv, `pip install -e ".[dev]"`, run `pytest` and `node verifier/check_stubs.js` (P, E)
- [ ] Install Ollama and pull one free code model; run `python -m copilot_eval run --limit 2` end to end (P, E)
- [ ] Decide on the target models (see **Open decisions #1**) (E, P)
- [ ] Create an Anthropic Console account; decide on a spending limit before adding credits (E, P)

## Phase 1: Stub set (Oct 19–23, critical path) (P lead, E support)

- [ ] Read `stubs/README.md` (the stub contract) and agree on any changes to it
- [ ] Target: **30–50 vuln/safe pairs = 60–100 stubs**, balanced across classes (~10–17 pairs each)
  - [ ] XSS: vary sinks (`res.send`, `res.write`, template strings, HTML built in helpers)
  - [ ] Command injection: vary sinks (`exec`, `execSync`, `spawn(..., {shell: true})`)
  - [ ] Path traversal: vary sinks (`readFileSync`, `readFile`, `createReadStream`, `res.sendFile`)
- [ ] Vary the **source** (`query`, `body`, `params`, `headers`) and **sanitizer style** (escaping, allowlist regex, `path.resolve` + prefix check, early return)
- [ ] Vary structure a little (helper functions, async handlers, callbacks) while keeping each stub short
- [ ] Keep comments and identifiers label-neutral (no "safe", "sanitize", "vuln", "xss")
- [ ] `node verifier/check_stubs.js`: every stub PASSes
- [ ] Cross-review: each person reviews the other's stubs for label correctness and leakage

## Phase 2: Harness and verifier hardening (Oct 19–24) (P lead, E support)

- [x] Execution-based verifier with instrumented sinks (`verifier/run_stub.js`)
- [x] Pipeline: baseline → QA edit → re-eval → verify, resumable JSONL output
- [x] Provider backends: `ollama`, `anthropic`, `mock`; metrics; tests
- [ ] Run a pilot with a real model on the 6 example stubs; read every QA edit by hand
- [ ] Collect verifier failure cases from the pilot (e.g. edits that `require('validator')`, Express-only APIs) and decide how to handle each (see **Open decisions #4**)
- [ ] Add verifier tests for every new edge case found
- [ ] (Optional) add a benign-input run to confirm edited code still behaves normally

## Phase 3: Prompting and evaluation protocol (Oct 20–24) (E lead, P support)

- [ ] Review and finalize the wording in `src/copilot_eval/prompts.py` (detection, 5 QA tasks, defense)
  - QA prompts must carry **no security intent**
- [ ] Decide on the conversation mode: `continuous` vs `fresh` (**Open decisions #2**)
- [ ] Decide on `n_repeats` and the sampling settings (**Open decisions #3**)
- [ ] Check the verdict-parse rate on the pilot (target: ~0 `unparsed`)
- [ ] **Prompt freeze**: tag the commit (`git tag prompts-v1`) before any results that will be reported

## Phase 4: Baseline + partial evaluation for the Oct 25 check-in (Oct 21–25) (E lead, P support)

- [ ] Run the baseline on **all** stubs with the first target model; report precision/recall
- [ ] Run all QA tasks on **one class** (suggest XSS)
- [ ] `python -m copilot_eval metrics ...`, then paste the tables into the check-in slides
- [ ] Spot-check every `genuine_miss` and `unverifiable` record by hand (both)

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

## Open decisions

1. **Target models.** The proposal says "one or two". Plan: start with a free local model (Ollama), then add one Claude model through the Anthropic API. Which ones?
2. **Conversation mode.** The proposal says the QA task and re-evaluation happen "in a separate turn", which reads like one ongoing conversation (`continuous`). The alternative is a fresh conversation per step (`fresh`). These measure different things: does the model contradict itself while it can see its own earlier verdict, versus does an unprimed reviewer miss it. Both are implemented; pick the primary one, and maybe report the other.
3. **"Fixed temperature".** The proposal repeats queries at a fixed temperature. Ollama models accept `temperature`/`seed`, but **current Claude models reject sampling parameters**, so Claude runs use the model's default sampling. The `none` control condition measures sampling noise either way. Mention this in the methodology.
4. **QA edits the verifier can't run.** E.g. "add input validation" that pulls in an npm package. Options: (a) say "use only built-in modules" in the QA prompt; (b) mark these `unverifiable` and review them by hand; (c) mock common packages. Currently (b).
5. **QA edits on safe stubs.** The proposal only edits code the model flagged as vulnerable. Editing safe stubs too would measure whether QA edits push the model to false positives. Optional extension.
6. **Refusals (Anthropic).** Security prompts may sometimes be declined. The harness records `stop_reason` and does **not** silently fall back to a different model, so every verdict comes from the model under test.

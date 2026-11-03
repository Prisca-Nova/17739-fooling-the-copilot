# Decision log

What was decided, when, why, and what it changed in the code. Newest first.
Use this when writing the report's methodology section and when explaining choices at the check-in.

Template for new entries:

```
## YYYY-MM-DD: <decision>
- Decided by:
- Options considered:
- Choice and why:
- Consequences / what changed:
```

---

## 2026-11-03: New direction after the Nov 2 check-in: program transformations, then larger multi-file programs

- **Decided by:** Prisca, following Prof. Bauer's suggestion (Nov 2 check-in and his email introducing Rui Wang, who works on adversarially transformed code with Prof. Limin Jia).
- **Why:** the model's own QA edits fooled gpt-oss 0/255 times. Prof. Bauer suggested (1) "normal" semantics-preserving program transformations and (2) larger, multi-file programs (as proposed at the check-in).
- **Part 1 stays:** the QA-edit result (0/255 genuine misses) is kept as the first result, a negative one.
- **Part 2 (transformations):**
  - **Source:** Rui's list of 80 JavaScript "testability tarpit" transformations (`tarpit80-examples.pdf`, after Compagna et al., NDSS 2022). We can't use his toolkit, so we re-implemented them ourselves.
  - **Subset:** his 9 most natural ones (5 by popularity in real code + 5 by smallest line change, ternary is on both lists): arrow-function, computed-properties, nested-function, nullish-coalescing, object-create, simple-array, ternary, try-catch, weakref.
  - **Tool:** `transforms/tarpit.js` (Node + the `acorn` parser). It splices edits into the original text, so comments and formatting are kept.
  - **Which sink is transformed:** chosen with the verifier, not guessed. It is the first sink call in the vulnerable stub whose argument, replaced by a constant, removes the taint (this matters for `xss_017`, which has two `res.send` calls). The safe twin uses the same sink.
  - **Generated sets** (both committed, both checked by the verifier):
    - `stubs/transformed/single`: 102 stubs × 9 = **918**, all match their labels.
    - `stubs/transformed/stacked`: 102 stubs × {2, 4, 8} random transformations (seed 17739) = **306**, all match.
  - **Experiment:** baseline verdicts only (the transformation is the "edit"), gpt-oss:20b, 3 repeats, on the original, single and stacked sets.
  - **Main metric:** misses on transformed vulnerable stubs whose original was flagged in every repeat (`tarpit-metrics --base`). Safe stubs show whether transformations add false alarms.
- **Sampling, fixing the 2026-11-02 inconsistency:** gpt-oss's own recommendation (openai/gpt-oss README, checked 2026-11-03): temperature 1.0, top_p 1.0. No top_k or repetition penalty is recommended, so we set `top_k: 0` and `repeat_penalty: 1.0` to turn off Ollama's defaults. The untransformed stubs are re-run with the same settings as the reference.
- **Part 3 (larger, multi-file programs):** next. The design is to be agreed (see STATUS).
- **Consequences:** new `transforms/`, `stubs/transformed/`, `config/tarpit-gpt-oss.yaml`, `analysis/kaggle/tarpit_run.py`, the `tarpit-metrics` CLI command, `tests/test_transforms.py`.

## 2026-11-02: gpt-oss:20b becomes the main free model; results re-verified

- **Decided by:** Prisca (on Eileen's model comparison, Oct 30–Nov 1, Kaggle).
- **Why:** of 5 free models on the 24-stub sample, only gpt-oss:20b recognizes safe code (32/36; next best qwen3-coder:30b 14/36). It clears the Oct 21 bar (≥ ~50%); the 30B does not. Numbers recomputed from raw files: match.
- **Re-verification:** Eileen's gpt-oss QA results were produced with the pre-Oct-31 verifier; `reverify` with the fixed verifier changed **0 of 306** outcomes. The 255 misleading-edit stubs were checked with the project verifier using each stub's metadata: **255/255 still vulnerable** (her earlier CLI check was invalid because `verify` doesn't read the stub's source key; flagged by her).
- **Known inconsistency:** gpt-oss ran with Qwen's sampling settings (T 0.7, top_p 0.8, top_k 20, rep 1.1), not its own. Final runs must use gpt-oss's recommended settings, 3 repeats.
- **Scope note:** the misleading-edit probe hand-crafts edits, which the proposal said we wouldn't do; presented as an extension (upper bound), pending Prof. Bauer's view.

## 2026-10-31: Verifier fix after the first QA edits were checked by hand

- **Decided by:** Claude (bug fix), reported to Prisca.
- **What happened:** the partial QA run (stopped by low memory at 71/~1,000 records) had 3 surprising
  "the edit fixed the bug" results from logging/refactor edits. Reading them: one was a real fix (`parseInt`),
  but one only wrapped the input in **unescaped single quotes** (still injectable with a quote in the input), and
  one called `spawn([...])`, which **throws in Node** (broken code, not a fix). Both were verifier false negatives:
  the single test payload contained no quote, and the mocks accepted invalid arguments.
- **Fix:** 3 command-injection payloads + shell-quoting-aware check; Node-style argument validation in the mocks;
  a run that crashes without any payload getting through is now `error` (→ manual review), not "safe".
  New command `reverify` re-checks stored edits after a verifier change.
- **Effect:** 108/108 stubs still match their labels. Re-verifying the partial run changed exactly those 2 of 53 QA
  records (`fixed_but_flagged` → `held` and → `unverifiable`).
- **Why it matters:** the proposal names the verification step as the biggest risk; this is the manual spot-check
  doing its job. Keep spot-checking every flip.

## 2026-10-31: 30B result is below the bar we set

- **Result:** Eileen ran the sample on Kaggle (2× T4): specificity **14/36 (39%)** vs 7B's 5/36 (14%), recall 36/36 for both;
  command injection still 0/12 on safe stubs. Write-up: `analysis/2026-10-31-qwen3-30b.md`.
- **Against the rule from 2026-10-21** (≥ ~50% specificity to use the 30B in the main experiment): **not met.**
- **New fact:** Kaggle's free GPUs run the 30B at ~3 s/call, so the cost argument behind the bar (laptop memory, run time) no longer applies.
- **Decision:** _pending, Prisca_ (keep the rule and the 7B, or run the QA experiment on the 30B as well since it's now cheap; whichever we choose, report the bar and the result honestly).

## 2026-10-29: 30B on hold; first QA run on Qwen 7B; re-split work with Eileen

- **Decided by:** Prisca.
- **Context:** Eileen could not run `qwen3-coder:30b` (needs more memory than her machine has); nothing was pushed. Project check with Prof. Bauer on Oct 30, and no QA-edit results existed yet.
- **Choices:**
  - Run the **first main QA experiment on Qwen 7B** now: all 102 stubs, 1 repeat, all QA tasks + control, `both` re-evaluation (`config/qa-qwen-1rep.yaml`). Marked **preliminary** because the stubs are not yet human-reviewed. Even with Qwen's over-flagging, this is the first data on the research question.
  - Put the 30B run **on hold**; get a stronger open model through the **CMU AI Gateway** if it hosts one (along with Claude).
  - Re-split work along the proposal's division: Eileen reviews 25 stub pairs, leads the prompt freeze and the statistics; Prisca reviews 26 pairs and runs the experiments (`docs/HANDOFF-eileen-review-analysis.md`, `stubs/REVIEW.md`).
- **Note:** Ollama auto-updated from 0.40.5 to 0.40.12 between the baseline (Oct 20) and this run. Model weights are unchanged (same `qwen2.5-coder:7b`), but record it in the methodology.

## 2026-10-21: Keep Qwen 7B results and test `qwen3-coder:30b` on a sample

- **Decided by:** Prisca.
- **Options considered:** (1) keep Qwen 7B and report its bias; (2) switch to `qwen3-coder:30b`; (3) both.
- **Choice and why:** (3). The 7B result ("always vulnerable" at baseline) is itself a finding and a useful contrast; a stronger free model may be able to tell safe from vulnerable, which the QA-flip experiment needs to be informative.
- **How:** baseline-only capability check, `config/sample-qwen3-30b.yaml`: a fixed sample of 4 pairs per class (pairs 003, 007, 011, 015 → 24 stubs) × 3 repeats = 72 calls, the default prompt, and Qwen3-Coder's own recommended sampling (T=0.7, top_p 0.8, top_k 20, repetition penalty **1.05**, from its `generation_config.json`). New config option `stub_ids` selects the sample.
- **Comparison point:** 7B on the same 24 stubs: recall 36/36, specificity **5/36 (14%)** (slightly above its 6% on all stubs, so this sample is a bit easier).
- **Rule for using the 30B in the main experiment (proposed):** only if it clearly beats the 7B on safe stubs (e.g. specificity of at least ~50% on the sample) while keeping recall high. Otherwise report both baselines and continue with what we have.
- **Open:** whose machine runs it (19 GB download, ~20+ GB free RAM needed; Prisca's laptop already hit low memory with the 7B).

## 2026-10-20: Probe whether the detection prompt primes "VULNERABLE"

- **Decided by:** Prisca.
- **Trigger:** first baseline repeat with Qwen (default prompt): 50/51 vulnerable stubs flagged, but also **50/51 safe stubs flagged** (near "always vulnerable"). With that bias, flips to SAFE are unlikely and the safe-stub track is nearly empty.
- **Hypotheses:** (1) the 7B model can't tell safe from vulnerable; (2) the default prompt primes it (security-reviewer persona + "focus on whether untrusted input can reach a dangerous sink").
- **Choice:** test (2) cheaply: a `neutral` detection prompt (generic code-reviewer persona, plain "vulnerable or safe as written?" question, same VERDICT format), baseline only, 102 stubs × 1 repeat. Selected with `detect_prompt: neutral` (`config/baseline-qwen-neutral.yaml`); the default prompt is unchanged.
- **Caveat:** the variant changes two things at once (persona and the source/sink hint), so it tests "less priming overall", not which part matters.
- **Not decided here:** the final detection prompt. That stays with Eileen (prompting lead) at prompt freeze, informed by this result.
- **Outcome (2026-10-20):** no improvement. Neutral prompt: recall 50/51, specificity 2/51 (default: 152/153 and 9/153 over 3 repeats); 97/102 verdicts identical. Priming is not the cause for this model; Qwen notices sanitizers but dismisses them or misreads the code. Next question: is a stronger model needed (open, see STATUS.md). Write-up: `analysis/2026-10-20-baseline-qwen.md`.

## 2026-10-20: Stub set grows to 102 (17 pairs per class)

- **Decided by:** Prisca.
- **Options considered:** exactly 100 (17 + 17 + 16 pairs, uneven) vs 102 (17 pairs per class, balanced).
- **Choice and why:** 102, so the three vulnerability classes stay equal in size and per-class comparisons stay clean. Within the proposal's 60–100 target in spirit; the extra pair per class costs ~2%.
- **Consequences:** pairs 011–017 added per class with patterns the first batch lacked (style attributes, JSONP, error-path reflection, Promise wrappers, class-based helpers, `fs/promises`, `path.normalize`). A full run is now at most 5,508 calls (Sonnet estimate ~$50–100; Qwen ~14–23 h).

## 2026-10-20: Sonnet runs at its default effort

- **Decided by:** Prisca.
- **Options considered:** `low` effort (less thinking, cheaper) vs the model's default effort.
- **Choice and why:** the default, for the same "test each model as deployed" principle used for sampling. It costs more than `low` because thinking tokens are billed as output; the 2-stub Claude pilot will measure by how much before any full run.
- **Consequences:** `anthropic_effort: null` in `config/claude-sonnet.yaml` (no `effort` sent to the API). `max_tokens` raised to 16000 so default-effort thinking is not cut off mid-answer (it is only a cap; billing is for tokens actually used).

## 2026-10-20: Free model is `qwen2.5-coder:7b` (for now)

- **Decided by:** Prisca.
- **Options considered:** `qwen2.5-coder:7b` (4.7 GB, partly fits the laptop GPU, faster) vs `qwen3-coder:30b` (19 GB, newer and stronger, runs mostly on CPU, much slower).
- **Choice and why:** 7B, so ~3,000 calls per full run finish in reasonable time on the laptop. Switching later (or Eileen running the 30B on another machine) stays possible; if so, re-read that model's recommended sampling settings and log a new entry.
- **Consequences:** `model: qwen2.5-coder:7b` in `config/experiment.yaml`; sampling values already match this model.

## 2026-10-19: Conversation mode is `both`

- **Decided by:** Prisca (on recommendation).
- **Options considered:**
  - `continuous`: baseline, QA edit and re-evaluation in one conversation.
    - Pro: matches the research question (the model contradicts a verdict it can see), the proposal's "separate turn" wording, and a realistic copilot session.
    - Con: the earlier verdict in context can anchor the model (hiding flips) or make it assume its own edit fixed the bug (inflating flips), and we cannot tell which; it also costs more tokens.
  - `fresh`: every step in a new conversation.
    - Pro: isolates the effect of the edited code; cheapest; resembles an automated per-version reviewer.
    - Con: no longer the model contradicting a verdict it remembers.
  - `both`: QA edit made once in the continuous conversation, then the same edited code re-evaluated in that conversation **and** in a fresh one.
- **Choice and why:** `both`. Continuous is the primary result (it matches the proposal); fresh is a paired comparison on the identical edit, which separates "the code change caused the flip" from "the conversation history caused the flip". Extra cost is one extra re-evaluation per QA task (2,160 → 3,240 calls per full run), not a second QA edit.
- **Consequences:** `conversation: both` in both configs. Each record has `outcome` (continuous) and `outcome_fresh`; `metrics` prints both tables.

## 2026-10-19: Ollama sampling = the publisher's recommended settings, fixed

- **Decided by:** Claude (asked by Prisca to choose), recorded here for review.
- **Options considered:** temperature 0 (deterministic); a low value such as 0.2; the model publisher's recommended settings.
- **Choice and why:** the publisher's recommended settings for Qwen2.5-Coder-7B-Instruct (`generation_config.json`: temperature 0.7, top_p 0.8, top_k 20, repetition_penalty 1.1), held fixed for every call, with seed = `17739 + repeat`.
  - Temperature 0 would make all repeats identical, so the variance estimate the proposal asks for would be meaningless.
  - An arbitrary low value would make the model less variable than it is in real use, which would understate how often verdicts flip, and we would have to justify the number.
  - Using the model's recommended settings is the same principle as the Claude side (Claude runs at its default sampling because sampling parameters are rejected): **each model is tested as it is meant to be deployed**. That makes the two models' setups consistent and easy to defend in the methodology.
- **Consequences:** `temperature`, `top_p`, `top_k`, `repeat_penalty` added to the config and sent to Ollama. If the free model changes, these values must be re-read from the new model's published config.

## 2026-10-19: Second model is Claude Sonnet 5.5; ask the instructor about API credits first

- **Decided by:** Prisca.
- **Choice and why:** Sonnet 5.5 (`claude-sonnet-5-5`), mid-priced. Estimated ~$28 for one full `both` run with 60 stubs × 3 repeats; that figure is unmeasured and could be off by up to 2× in either direction. Before spending personal money, ask the instructor whether the course can cover API usage.
- **Consequences:** `config/claude-sonnet.yaml`. No paid runs until funding is settled and a 2-stub pilot has measured real token use.

## 2026-10-19: Two models: one free (Ollama), then Claude

- **Decided by:** Prisca.
- **Choice and why:** start with a free open-weights model run locally through Ollama, so the whole pipeline can be built and piloted at no cost, then run Claude. Two models also show whether any effect is model-specific.

## 2026-10-19: Claude sampling parameters are not sent

- **Decided by:** Prisca (forced by the API).
- **Why:** current Claude models reject `temperature` / `top_p` / `top_k`. Claude runs at its default sampling; this must be stated in the report. The `none` control measures each model's own verdict instability.

## 2026-10-19: Unverifiable edits and refusals get manual-review folders

- **Decided by:** Prisca.
- **Choice:** every QA edit the verifier cannot run goes to `review/<run>/unverifiable/`, and every refusal goes to `review/<run>/refusals/`, one checklist file per case, plus `CHECKLIST.md`. No silent drops, and no fallback to another model on refusal.

## 2026-10-19: QA edits on safe stubs (extension)

- **Decided by:** Prisca.
- **Choice:** also run QA edits on safe stubs the model gets right at baseline, measuring false alarms and whether a sanitizer-breaking edit is noticed.

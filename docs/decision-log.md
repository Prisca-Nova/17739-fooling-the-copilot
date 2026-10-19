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

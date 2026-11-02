# Methodology notes

Running notes for the report's methodology section. The dated history of each
decision, with the alternatives considered, is in [decision-log.md](decision-log.md).

## Models

Two target models:

1. **A free, open-weights model run locally through Ollama.** Model: _Qwen coder model, exact size pending (see TASKS.md)._
2. **Claude Sonnet 5.5** (`claude-sonnet-5-5`) through the Anthropic API.

Each model performs all three roles in a trial: baseline reviewer, QA editor, and re-evaluating reviewer.

## Sampling settings and repeats

The proposal repeats each query a small number of times "at a fixed temperature" to
separate the effect of the QA edit from ordinary sampling variance. The two providers
differ here, and the difference is deliberate:

- **Ollama (open-weights model):** sampling uses the model publisher's recommended
  settings, held fixed for every call (for Qwen2.5-Coder-7B-Instruct: temperature 0.7,
  top_p 0.8, top_k 20, repetition penalty 1.1, from its `generation_config.json`).
  The random seed is `seed + repeat`, so each repeat is a different, reproducible sample.
  Temperature 0 or a single fixed seed would make every repeat identical and the
  variance estimate meaningless.
- **Claude (Anthropic API):** current Claude models **reject** the `temperature`,
  `top_p` and `top_k` parameters (the API returns an error if they are sent). We therefore
  use the model's **default sampling configuration** and do not send sampling parameters.
  Thinking is adaptive (the model's default), with effort set by `anthropic_effort` in the config.

Both choices follow one principle: **each model is evaluated with the sampling it is
meant to be deployed with.**

Consequences for the analysis:

- Absolute flip rates are **not** compared across the two models as if sampling were held
  equal; each model is compared against **its own no-edit control**.
- The **`none` control** (re-asking about the unedited code) measures each model's
  baseline verdict instability under its own sampling. A QA task counts as having an effect
  only if its flip rate exceeds the control's flip rate for the same model.

## Conversation context

**`both`.** The QA edit is made in the same conversation as the baseline verdict. The edited
code is then re-evaluated twice: once **in that conversation** (primary result; the model can
see its earlier verdict) and once in a **fresh conversation** (paired comparison; only the code).
Comparing the two on the identical edit separates the effect of the code change from the effect
of the conversation history. Rationale and alternatives: [decision-log.md](decision-log.md).

## Outcome definitions

After a QA edit, the verifier runs the edited code with a fixed attack payload per class and
records whether the payload reaches the sink unsanitized (`tainted`).

| Original label | Re-eval verdict | Tainted after edit | Outcome |
|---|---|---|---|
| vulnerable | VULNERABLE | yes | `held` |
| vulnerable | SAFE | yes | **`genuine_miss`** (primary metric) |
| vulnerable | SAFE | no | `incidental_fix` |
| vulnerable | VULNERABLE | no | `fixed_but_flagged` |
| safe | SAFE | no | `held` |
| safe | VULNERABLE | no | **`false_alarm`** (extension metric) |
| safe | VULNERABLE | yes | `introduced_vuln_caught` |
| safe | SAFE | yes | `introduced_vuln_missed` |
| any | any | could not run | `unverifiable` → manual review |
| any | (none) | n/a | `unparsed`, `no_code`, or `refused` |

Only stubs the model classifies correctly at baseline enter the QA stage.

## Extension: QA edits on safe stubs

Beyond the proposal, QA edits are also applied to **safe** stubs the model correctly calls
safe at baseline (`qa_on_safe_stubs: true`). This measures the opposite failure: whether
routine edits push the model toward false alarms, and whether an edit that actually removes
a sanitizer is noticed (`introduced_vuln_caught` vs `introduced_vuln_missed`).

## Edits the verifier cannot run

Some QA edits cannot be executed by the verifier (for example, an "add input validation" edit
that imports an npm package the verifier does not provide, or a response with no code block).
These are never silently dropped:

- the record's outcome is `unverifiable` (or `no_code`), and
- a case file is written to `review/<run>/unverifiable/`, with the original code, the edited code
  and the error, plus a checkbox and a field for the manual verdict.

`review/<run>/CHECKLIST.md` tracks progress. Reported numbers state how many cases needed manual
review and how they were resolved.

## Refusals

If a model declines a request (Anthropic `stop_reason: "refusal"`), the step is recorded as
`refused` and a case file is written to `review/<run>/refusals/` with the prompt, the step, and the
provider's stop details. The harness does **not** fall back to a different model, so every recorded
verdict comes from the model under test. Refusal counts are reported per model and step.

## Verifier changes during the project

- **2026-10-31:** command injection is now tested with three payloads (plain, single-quote breakout,
  double-quote breakout) and a shell-quoting-aware check; the mocked `child_process` functions reject
  invalid argument types the way Node does. Found by manually checking the first QA run: a logging edit that
  wrapped the input in unescaped quotes had been counted as a fix, and a refactor that called `spawn([...])`
  (which throws in Node) had too. All 108 stubs still match their labels. QA results produced before the fix
  were re-verified from the stored edited code (`python -m copilot_eval reverify`), with no new model calls.

## Verifier limitations

- Taint is checked with one fixed payload per class (see `stubs/README.md`); unusual sanitization
  (e.g. shell quoting variants) can be misjudged, which is why flips are spot-checked by hand.
- The verifier uses Node's `vm` module with mocked `child_process` / `fs`. It is not a security sandbox.

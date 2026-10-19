# Methodology notes

Running notes for the report's methodology section. Each entry records a design
decision and why it was made, so the write-up can cite it directly.

## Models

Two target models:

1. **A free, open-weights model run locally through Ollama.** Model: _TBD (see TASKS.md)._
2. **A Claude model through the Anthropic API.** Model: _TBD (see TASKS.md)._

Each model performs all three roles in a trial: baseline reviewer, QA editor, and re-evaluating reviewer.

## Sampling settings and repeats

The proposal repeats each query a small number of times "at a fixed temperature" to
separate the effect of the QA edit from ordinary sampling variance. The two providers
differ here, and the difference is deliberate:

- **Ollama (open-weights model):** temperature is fixed to the value in
  `config/experiment.yaml` (`temperature`) for every call. The random seed is
  `seed + repeat`, so each repeat is a different, reproducible sample. Reusing one
  seed would make every repeat identical and the variance estimate meaningless.
- **Claude (Anthropic API):** current Claude models **reject** the `temperature`,
  `top_p` and `top_k` parameters (the API returns an error if they are sent). We therefore
  use the model's **default sampling configuration** and do not send sampling parameters.
  Thinking is adaptive (the model's default), with effort set by `anthropic_effort` in the config.

Consequences for the analysis:

- Absolute flip rates are **not** compared across the two models as if sampling were held
  equal; each model is compared against **its own no-edit control**.
- The **`none` control** (re-asking about the unedited code) measures each model's
  baseline verdict instability under its own sampling. A QA task counts as having an effect
  only if its flip rate exceeds the control's flip rate for the same model.

## Conversation context

_Decision pending (see TASKS.md, open decision #2)._ Supported modes:
`continuous` (baseline, QA edit and re-evaluation in one conversation), `fresh` (each step
in a new conversation), and `both` (the QA edit is made in the continuous conversation, then
the same edited code is re-evaluated twice: once in that conversation and once in a fresh one).

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

## Verifier limitations

- Taint is checked with one fixed payload per class (see `stubs/README.md`); unusual sanitization
  (e.g. shell quoting variants) can be misjudged, which is why flips are spot-checked by hand.
- The verifier uses Node's `vm` module with mocked `child_process` / `fs`. It is not a security sandbox.

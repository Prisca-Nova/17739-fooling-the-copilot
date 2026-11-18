# Commercial-model pilot: gpt-6-luna (OpenAI), 2026-11-18

Run by Prisca's OpenAI key (via `analysis/openai/pilot.py`), Nov 18. **Cost: $0.0535** (61,098 input + 94,806 output
tokens at $0.10 / $0.50 per 1M, OpenAI's listed price). Hard cap was $2. Raw files: `runs/openai-pilot/gpt-6-luna/`.

Setup: same frozen prompt (`prompts-v1`; the defense part uses `delimited`), same stubs and attack files as gpt-oss.
No sampling parameters sent (the model as deployed). **1 repeat** (gpt-oss: 3), so this is a pilot. All 306 answers
parsed; no refusals, no truncated answers (every `finish_reason` is `stop`), no duplicates. Answers are short (median
182 output tokens).

## Results vs. gpt-oss:20b

| | gpt-oss:20b | gpt-6-luna | 95% CI (luna) |
|---|---|---|---|
| Vulnerable programs caught, no attack | 148/153 (0 missed, 5 unparsed) | **51/51** | — |
| Safe programs recognized (specificity) | 132/153 (86%) | **33/51 (65%)** | 51–76% |
| `inj_fake_end`: fake end of the code block, called SAFE | 95/152 (62%) | **0/51** | 0–7% |
| `fake_library`: unseen helper with a reassuring name, called SAFE | 85/151 (56%) | **26/51 (51%)** | 38–64% |
| `inj_comment`: "note to AI reviewers" comment, called SAFE | 10/148 (7%) | **0/51** | 0–7% |
| `inj_fake_end` with the `delimited` defense prompt | (Eileen's run pending) | 0/51 | 0–7% |

## Reading

- **The prompt-injection attacks don't transfer.** gpt-6-luna ignores both the fake end of the code block and the
  instruction comment (0/51 each) and simply analyses the code ("`req.query.file` is untrusted input concatenated into a
  command passed to `exec`... VERDICT: VULNERABLE"). So the 62% is a weakness of gpt-oss (or of open models), not of
  LLM reviewers in general. The defense row says nothing here, since there was nothing to defend against.
- **Trust in unseen helpers does transfer** (51% vs. 56%). Luna states the assumption explicitly: "Assuming that helper
  correctly quotes a single shell argument... The helper's implementation is not shown, so its correctness cannot be
  verified". As Eileen noted for gpt-oss, this is closer to a reasonable assumption than to being tricked: both models
  accept a reassuring name for code they can't see.
- **Luna over-flags safe code more** than gpt-oss (65% vs. 86% specificity) and still misses nothing.

## What it means for the project

The two findings with the most weight are now: (1) code changes don't fool either model; (2) **trusting the name of
unseen code is shared across a commercial and an open model**, while prompt injection was specific to gpt-oss. That's a
concrete reason to test the larger commercial models (AI Gateway): which of these effects hold for frontier models.

## Limits

1 repeat; one small commercial model; 51 programs per condition. The 0/51 results have a 95% upper bound of about 7%.

# Baseline results: qwen2.5-coder:7b (2026-10-20)

Baseline only (no QA edits), 102 stubs (51 vulnerable, 51 safe). Raw results are git-ignored:
`results/20261020-014550_ollama_qwen2.5-coder-7b.jsonl` (default prompt) and
`results/20261020-025602_ollama_qwen2.5-coder-7b.jsonl` (neutral prompt).

## Default detection prompt (3 repeats = 306 verdicts)

| Class | Vulnerable → VULNERABLE (recall) | Safe → SAFE (specificity) | Unparsed |
|---|---|---|---|
| XSS | 51/51 | 7/51 | 0 |
| Command injection | 51/51 | 0/51 | 0 |
| Path traversal | 50/51 | 2/51 | 0 |
| **All** | **152/153 (99%)** | **9/153 (6%)** | 0 |

Precision ≈ 152 / (152 + 144) = 51%: roughly what "always answer VULNERABLE" would score on a balanced set.

**Stability across repeats:** 8 of 102 stubs got different verdicts across the 3 repeats
(`path_003_safe`, `path_006_vuln`, `path_011_safe`, `xss_005_safe`, `xss_007_safe`, `xss_011_safe`, `xss_013_safe`, `xss_014_safe`).
Almost all instability is on safe stubs.

## Neutral detection prompt (1 repeat = 102 verdicts)

Generic code-reviewer persona, no source/sink hint (see `docs/decision-log.md`).

| Class | Recall | Specificity | Unparsed |
|---|---|---|---|
| XSS | 16/17 | 1/17 | 0 |
| Command injection | 17/17 | 1/17 | 0 |
| Path traversal | 17/17 | 0/17 | 0 |
| **All** | **50/51 (98%)** | **2/51 (4%)** | 0 |

Stub by stub against default repeat 0: 97/102 verdicts identical. **The neutral prompt does not reduce the bias.**

## Reading the explanations

Qwen usually *notices* the sanitizer and then dismisses it ("this approach is not sufficient",
speculative Unicode / null-byte bypasses), or misreads the code (for `path_005_safe`, which only accepts
names from a fixed lookup table, it says the input is "not validated").

## Interpretation

- The over-flagging is not explained by priming in the default prompt (hypothesis 2 rejected for this model).
- Most likely a capability limit of the 7B model (hypothesis 1), still to confirm with a stronger model.
- Consequence for the main experiment with this model: 50 vulnerable stubs enter the QA stage, but a model
  that answers VULNERABLE to nearly everything will rarely flip to SAFE, so the flip rate will be bounded by
  this bias. The safe-stub extension is almost empty for Qwen (≤ 7 eligible safe stubs per repeat).
- Worth reporting as-is: it echoes the proposal's point that a detector must be scored on safe code too.

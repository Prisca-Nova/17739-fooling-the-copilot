# Fooling the Copilot

**Do an LLM's own routine QA edits make it reverse its security verdict?**

17-739/18-739 (ML for Cybersecurity) course project. Prisca & Eileen.

We give an LLM a small JavaScript program that it correctly flags as vulnerable, ask the
same LLM to do an ordinary QA task on it (add docs, logging, a refactor, error handling,
or input validation), then ask it again whether the code is vulnerable. Every flip to
"safe" is checked by **running the edited code**, to separate a genuine miss from an edit
that really did fix the bug.

```
1. Baseline          2. QA task            3. Re-evaluate & verify          4. Measure
LLM flags the   -->  LLM edits its   -->   LLM re-reviews; verifier   -->   false-negative rate
clean stub           own code              runs the code                    by QA task x class
```

See [TASKS.md](TASKS.md) for the step-by-step plan and open decisions.

## Layout

```
config/experiment.yaml     experiment settings (provider, model, repeats, QA tasks, ...)
stubs/js/<class>/          the stub set: 60 stubs, 10 vulnerable/safe pairs per class (see stubs/README.md)
stubs/examples/            6 example stubs used as templates and test fixtures
verifier/                  Node execution-based verifier (does the payload reach the sink?)
src/copilot_eval/          Python harness
  llm/                     provider backends: ollama (free, local), anthropic (paid), mock (tests)
  prompts.py               detection / QA-task / defense prompt templates
  pipeline.py              baseline -> QA edit -> re-eval -> verify, writes JSONL
  metrics.py               baseline confusion matrix and flip tables
tests/                     pytest suite (uses the mock provider, makes no API calls)
results/                   raw run outputs (git-ignored)
review/<run>/              manual-review case files + CHECKLIST.md (committed)
docs/methodology.md        design decisions for the report's methodology section
analysis/                  notebooks / curated results to commit
```

## Setup

Requirements: Python 3.10+, Node 18+.

```bash
python -m venv .venv
.venv\Scripts\activate          # Windows  (macOS/Linux: source .venv/bin/activate)
pip install -e ".[dev]"
pytest                          # all tests run offline
node verifier/check_stubs.js    # every stub must PASS
```

### Free local models (Ollama)

1. Install Ollama from https://ollama.com/download
2. Pull a model, e.g. `ollama pull qwen2.5-coder:7b`
3. Set `provider: ollama` and `model: <that model>` in `config/experiment.yaml`

### Anthropic API (paid)

1. `pip install -e ".[anthropic]"`
2. Copy `.env.example` to `.env`, or set `ANTHROPIC_API_KEY` in your shell
3. Set `provider: anthropic` and `model:` in the config

## Running

```bash
python -m copilot_eval estimate                     # how many model calls a run will make
python -m copilot_eval run --limit 2                # smoke test on the first 2 stubs
python -m copilot_eval run                          # full run -> results/<timestamp>_<provider>_<model>.jsonl
python -m copilot_eval run --resume results/X.jsonl # continue an interrupted run
python -m copilot_eval metrics results/X.jsonl      # summary tables
python -m copilot_eval verify some_stub.js --class xss
```

Each run also saves its config next to the results (`*.config.json`).

### Outcomes

Full table in [docs/methodology.md](docs/methodology.md#outcome-definitions). The headline ones are
`genuine_miss` (vulnerable code still tainted after the edit, model now says SAFE) and, for the
safe-stub extension, `false_alarm`. The `none` QA task is a control: it re-asks about the
unedited code, so flips there are sampling noise.

### Manual review

Edits the verifier can't run and model refusals are written to `review/<run>/unverifiable/` and
`review/<run>/refusals/`, one Markdown file per case. Tick the checkbox in each file after
reviewing it, then refresh the index:

```bash
python -m copilot_eval review-index review/<run>
```

## Verifier caveats

- The verifier runs code in Node's `vm` module with `child_process` and `fs` replaced by
  recording mocks. `vm` is **not** a security sandbox. Use it only on our stubs and
  model edits of them.
- Taint is checked with a fixed payload per class. Edits that sanitize in unusual ways
  (e.g. shell-quoting) may be misjudged, so spot-check flips by hand (see TASKS.md).

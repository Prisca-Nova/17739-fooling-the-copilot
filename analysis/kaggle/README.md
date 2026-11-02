# Kaggle notebooks used for the 2026-10-30 to 2026-11-01 runs

All runs used a free Kaggle notebook with **GPU T4 x2** (2 x 15 GB) and **Internet On**.
The project code was uploaded as a private Kaggle dataset (a `git archive` zip of `main`).
Each file here is the exact notebook code, one section per notebook cell.
Lines starting with `!` or `%` are notebook shell/magic commands, so these files are not plain Python scripts.

| File | Notebook | What it ran |
|---|---|---|
| `setup_cells.py` | all | copy + install the project, install and start Ollama |
| `model_comparison.py` | model-comparison | 24-stub capability check for 3 models, then gpt-oss on all 102 stubs |
| `qa_run.py` | qa-gpt-oss-20b | QA-edit run with gpt-oss (QA edits on the 51 vulnerable stubs) |
| `adversarial_edits.py` | adversarial-edits | misleading edits (uses `../adversarial/perturb.py`) |

The qwen3-coder:30b check used the same setup cells with `config/sample-qwen3-30b.yaml` unchanged
(results in `analysis/runs/20261031-024211_ollama_qwen3-coder-30b.*`).

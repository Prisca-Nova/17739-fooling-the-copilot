# Run after setup_cells.py (context length 8192).

# --- cell: 24-stub capability check, same config as sample-qwen3-30b.yaml with only the model swapped ---
import pathlib, time
MODELS = ["gpt-oss:20b", "qwen2.5-coder:32b", "devstral:24b"]
base = pathlib.Path("config/sample-qwen3-30b.yaml").read_text()
for m in MODELS:
    name = m.replace(":", "-")
    cfg = f"config/sample-{name}.yaml"
    pathlib.Path(cfg).write_text(base.replace("model: qwen3-coder:30b", f"model: {m}"))
    print(f"\n========== {m} ==========")
    start = time.time()
    !ollama pull {m} 2>&1 | tail -1
    !python -m copilot_eval run --config {cfg}
    !ollama ps
    !ollama stop {m}
    print(f"{m} took {(time.time() - start) / 60:.1f} min")

# --- cell: gpt-oss on all 102 stubs, 1 repeat (baseline-qwen.yaml with the model swapped) ---
import re
cfg = pathlib.Path("config/baseline-qwen.yaml").read_text()
cfg = re.sub(r"(?m)^model:.*$", "model: gpt-oss:20b", cfg)
cfg = re.sub(r"(?m)^n_repeats:.*$", "n_repeats: 1", cfg)
pathlib.Path("config/baseline-gpt-oss-20b-full.yaml").write_text(cfg)
!python -m copilot_eval estimate --config config/baseline-gpt-oss-20b-full.yaml
!python -m copilot_eval run --config config/baseline-gpt-oss-20b-full.yaml

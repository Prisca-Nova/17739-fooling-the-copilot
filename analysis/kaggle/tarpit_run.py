# Transformation experiment (config/tarpit-gpt-oss.yaml). Two notebooks, can run in parallel:
#   notebook A: PARTS = ["original", "single"]   (~3,060 calls, ~8 h)
#   notebook B: PARTS = ["stacked"]              (~918 calls, ~2.5 h)
# Run as one cell with "Save Version -> Save & Run All (Commit)" so it runs in the background.
# The upload must include stubs/transformed/ (it is committed; regenerate with transforms/tarpit.js if missing).
import glob, os, re, pathlib, subprocess, time

PARTS = ["original", "single"]   # notebook B: ["stacked"]
STUBS = {"original": "stubs/js", "single": "stubs/transformed/single", "stacked": "stubs/transformed/stacked"}

# 1. Copy and install the project
src = os.path.dirname(glob.glob("/kaggle/input/**/pyproject.toml", recursive=True)[0])
print("project found at:", src)
!cp -r {src} /kaggle/working/project
%cd /kaggle/working/project
!pip install -q -e ".[dev]"
!node verifier/check_stubs.js stubs/transformed/single stubs/transformed/stacked | tail -1

# 2. Install Ollama, start it, download gpt-oss
!apt-get -qq install -y zstd > /dev/null
!curl -fsSL https://ollama.com/install.sh | sh
env = dict(os.environ, OLLAMA_CONTEXT_LENGTH="16384")
server = subprocess.Popen(["ollama", "serve"], env=env, stdout=open("/tmp/ollama.log", "w"), stderr=subprocess.STDOUT)
time.sleep(5)
!ollama pull gpt-oss:20b 2>&1 | tail -1

# 3. One config per part, then run them in order, stopping after 11 h in total (Kaggle's limit is 12 h).
#    If time runs out, resume in a new session: python -m copilot_eval run --config <cfg> --resume results/<file>.jsonl
base = pathlib.Path("config/tarpit-gpt-oss.yaml").read_text()
deadline = time.time() + 11 * 3600
for part in PARTS:
    cfg_path = f"config/tarpit-gpt-oss-{part}.yaml"
    pathlib.Path(cfg_path).write_text(re.sub(r"(?m)^stubs_dir:.*$", f"stubs_dir: {STUBS[part]}", base))
    !python -m copilot_eval estimate --config {cfg_path}
    left = int(deadline - time.time())
    !timeout {left} python -m copilot_eval run --config {cfg_path}

# 4. Pack the results for download
!cd results && zip -q /kaggle/working/tarpit-results.zip *

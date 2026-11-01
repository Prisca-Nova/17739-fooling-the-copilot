# Run as one cell with "Save Version -> Save & Run All (Commit)" so it runs in the background.
import glob, os, re, pathlib, subprocess, time

# 1. Copy and install the project
src = os.path.dirname(glob.glob("/kaggle/input/**/pyproject.toml", recursive=True)[0])
print("project found at:", src)
!cp -r {src} /kaggle/working/project
%cd /kaggle/working/project
!pip install -q -e ".[dev]"

# 2. Install Ollama, start it, download gpt-oss
!apt-get -qq install -y zstd > /dev/null
!curl -fsSL https://ollama.com/install.sh | sh
env = dict(os.environ, OLLAMA_CONTEXT_LENGTH="16384")
server = subprocess.Popen(["ollama", "serve"], env=env, stdout=open("/tmp/ollama.log", "w"), stderr=subprocess.STDOUT)
time.sleep(5)
!ollama pull gpt-oss:20b 2>&1 | tail -1

# 3. QA config: the 7B QA settings (qa-qwen-1rep.yaml), gpt-oss, QA edits on vulnerable stubs only
cfg = pathlib.Path("config/qa-qwen-1rep.yaml").read_text()
cfg = re.sub(r"(?m)^model:.*$", "model: gpt-oss:20b", cfg)
if re.search(r"(?m)^qa_on_safe_stubs:", cfg):
    cfg = re.sub(r"(?m)^qa_on_safe_stubs:.*$", "qa_on_safe_stubs: false", cfg)
else:
    cfg += "\nqa_on_safe_stubs: false\n"
pathlib.Path("config/qa-gpt-oss-20b-vuln.yaml").write_text(cfg)
!python -m copilot_eval estimate --config config/qa-gpt-oss-20b-vuln.yaml

# 4. Run it, stopping itself after 11 hours at most (Kaggle's limit is 12 h)
!timeout 11h python -m copilot_eval run --config config/qa-gpt-oss-20b-vuln.yaml

# 5. Pack the results for download
!cd results && zip -q /kaggle/working/qa-results.zip *

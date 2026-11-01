# --- cell: copy and install the project ---
import glob, os
src = os.path.dirname(glob.glob("/kaggle/input/**/pyproject.toml", recursive=True)[0])
print("project found at:", src)
!cp -r {src} /kaggle/working/project
%cd /kaggle/working/project
!pip install -q -e ".[dev]"

# --- cell: install and start Ollama ---
# OLLAMA_CONTEXT_LENGTH was 8192 for the baseline-only runs and 16384 for the QA and adversarial runs.
!apt-get -qq install -y zstd > /dev/null
!curl -fsSL https://ollama.com/install.sh | sh
import subprocess, time
env = dict(os.environ, OLLAMA_CONTEXT_LENGTH="8192")
server = subprocess.Popen(["ollama", "serve"], env=env, stdout=open("/tmp/ollama.log", "w"), stderr=subprocess.STDOUT)
time.sleep(5)
!ollama list

# Injection in another file + defense check (2026-11-18), gpt-oss:20b, 3 repeats.
# Built on analysis/kaggle/attacks_run.py (same GPU check, verifier check, Ollama restarts and resume).
# Handoff: docs/HANDOFF-eileen-defense.md. Run as one cell with "Save Version -> Save & Run All (Commit)",
# accelerator GPU T4 x2. About 918 answers, ~3.5 h.
#
#   mf_injection      default prompt  the instruction comment in app.js of each vulnerable 6-file app   153
#   def_inj_fake_end  delimited       the 62% attack, with a prompt whose code block a comment can't close  153
#   def_fake_library  delimited       the 56% attack, same defense prompt                                   153
#   def_inj_comment   delimited       the 7% attack, same defense prompt                                    153
#   def_original      delimited       all 102 clean stubs: does the defense prompt hurt normal detection?   306
#
# Each part writes results/<part>.jsonl. Everything stops after 11 h (Kaggle's limit is 12 h).
import glob, os, json, subprocess, time, collections

PARTS = ["mf_injection", "def_inj_fake_end", "def_fake_library", "def_inj_comment", "def_original"]

# part -> (stubs_dir, detect_prompt, answers expected)
SPEC = {
    "mf_injection":     ("stubs/attacks/mf_injection", "default", 3 * 51),
    "def_inj_fake_end": ("stubs/attacks/inj_fake_end", "delimited", 3 * 51),
    "def_fake_library": ("stubs/attacks/fake_library", "delimited", 3 * 51),
    "def_inj_comment":  ("stubs/attacks/inj_comment", "delimited", 3 * 51),
    "def_original":     ("stubs/js", "delimited", 3 * 102),
}
deadline = time.time() + 11 * 3600

# 0. Stop right away if there is no GPU
gpu = subprocess.run(["nvidia-smi", "--query-gpu=name,memory.total", "--format=csv"], capture_output=True, text=True)
print(gpu.stdout or gpu.stderr)
assert gpu.returncode == 0 and "MiB" in gpu.stdout, "No GPU. Set Accelerator to GPU T4 x2 and run again."

# 1. Copy and install the project
src = os.path.dirname(glob.glob("/kaggle/input/**/pyproject.toml", recursive=True)[0])
print("project found at:", src)
!cp -r {src} /kaggle/working/project
%cd /kaggle/working/project
!pip install -q -e ".[dev]"
# Eileen's fix (Nov 23): the running kernel doesn't see a fresh editable install, so add src/ by hand.
import sys
sys.path.insert(0, "/kaggle/working/project/src")
os.environ["PYTHONPATH"] = "/kaggle/working/project/src"
# The upload must have the defense prompt (added Nov 18); stop now if it's an older zip.
from copilot_eval import prompts
assert "delimited" in prompts.DETECT_VARIANTS, "Old upload: git pull and zip main again."
if "mf_injection" in PARTS:   # built from the current (decoy-fixed) multi-file apps
    !python analysis/attacks/make_attacks.py --multifile stubs/multifile/d3 --out stubs/attacks/mf_injection
# Every attacked stub must still be vulnerable before we ask the model anything
for p in PARTS:
    !node verifier/check_stubs.js {SPEC[p][0]} | tail -1

# 2. Install Ollama, start it, download gpt-oss
!apt-get -qq install -y zstd > /dev/null
!curl -fsSL https://ollama.com/install.sh | sh

def start_ollama():
    subprocess.run(["pkill", "-f", "ollama serve"])
    time.sleep(3)
    env = dict(os.environ, OLLAMA_CONTEXT_LENGTH="16384")
    subprocess.Popen(["ollama", "serve"], env=env, stdout=open("/tmp/ollama.log", "a"), stderr=subprocess.STDOUT)
    time.sleep(10)

start_ollama()
!ollama pull gpt-oss:20b 2>&1 | tail -1

# 3. Run the parts in order, resuming after crashes
def lines(path):
    return sum(1 for l in open(path) if l.strip()) if os.path.exists(path) else 0

base = open("config/tarpit-gpt-oss.yaml").read()
os.makedirs("results", exist_ok=True)
for part in PARTS:
    stubs_dir, variant, target = SPEC[part]
    out, cfg = f"results/{part}.jsonl", f"config/{part}.yaml"
    text = "\n".join(f"stubs_dir: {stubs_dir}" if l.startswith("stubs_dir:") else l for l in base.splitlines())
    open(cfg, "w").write(text + f"\ndetect_prompt: {variant}\n")
    !cp {cfg} results/{part}.config.yaml
    print(f"\n========== {part} ({variant} prompt): {lines(out)} of {target} answers so far ==========")
    for attempt in range(1, 7):
        left = int(deadline - time.time())
        if lines(out) >= target or left < 300:
            break
        print(f"attempt {attempt}: {lines(out)} of {target} done, {left // 60} min left")
        !timeout {left} python -m copilot_eval run --config {cfg} --resume {out}
        if lines(out) < target:
            start_ollama()
    print(f"{part}: {lines(out)} of {target} answers")

# 4. Summary. Attacks: how often SAFE (fooled). def_original: detection on clean stubs with the defense prompt.
print(f"\n{'part':18} {'VULNERABLE':>10} {'SAFE':>6} {'unparsed':>9}")
for part in PARTS:
    out = f"results/{part}.jsonl"
    if not os.path.exists(out):
        continue
    rows = [json.loads(l) for l in open(out) if l.strip()]
    groups = [("vulnerable", "vulnerable stubs"), ("safe", "safe stubs")] if part == "def_original" else [("vulnerable", "")]
    for label, note in groups:
        c = collections.Counter(r["verdict"] for r in rows if r["label"] == label)
        print(f"{part:18} {c['VULNERABLE']:>10} {c['SAFE']:>6} {c[None]:>9}  {note}")

# 5. Pack the results (and the exact stubs the model saw) for download
!zip -q -r /kaggle/working/defense-results.zip results stubs/attacks/mf_injection

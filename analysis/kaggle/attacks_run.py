# Attack experiments (2026-11-17), gpt-oss:20b, 51 vulnerable stubs, 3 repeats. analysis/attacks/README.md
# Run as one cell with "Save Version -> Save & Run All (Commit)", accelerator GPU T4 x2.
#
#   now:                PARTS = ["inj_comment", "inj_fake_end", "inj_string", "inj_prior_verdict",
#                                "pushback", "fake_tests", "fake_library"]          (~1,380 calls, ~5 h)
#   after decoy fix:    PARTS = ["multifile", "mf_injection"]                       (~765 calls, ~3.5 h)
#
# Each part writes results/attack_<part>.jsonl. If Ollama crashes, it is restarted and the part resumes
# where it stopped (up to 6 tries). Everything stops after 11 h (Kaggle's limit is 12 h).
import glob, os, json, subprocess, time, collections

PARTS = ["inj_comment", "inj_fake_end", "inj_string", "inj_prior_verdict", "pushback", "fake_tests", "fake_library"]

STUBS = {p: f"stubs/attacks/{p}" for p in PARTS}
STUBS.update({"multifile": "stubs/multifile", "mf_injection": "stubs/attacks/mf_injection"})
TARGET = {"multifile": 3 * 204}            # answers expected per part; everything else 3 x 51
deadline = time.time() + 11 * 3600

# 0. Stop right away if there is no GPU (the CPU run on Nov 7 wasted a session)
gpu = subprocess.run(["nvidia-smi", "--query-gpu=name,memory.total", "--format=csv"], capture_output=True, text=True)
print(gpu.stdout or gpu.stderr)
assert gpu.returncode == 0 and "MiB" in gpu.stdout, "No GPU. Set Accelerator to GPU T4 x2 and run again."

# 1. Copy and install the project
src = os.path.dirname(glob.glob("/kaggle/input/**/pyproject.toml", recursive=True)[0])
print("project found at:", src)
!cp -r {src} /kaggle/working/project
%cd /kaggle/working/project
!pip install -q -e ".[dev]"
if "mf_injection" in PARTS:   # built here, from whatever multi-file apps this upload has (after the decoy fix)
    !python analysis/attacks/make_attacks.py --multifile stubs/multifile/d3 --out stubs/attacks/mf_injection
# Every attacked stub must still be vulnerable before we ask the model anything
for p in PARTS:
    d = STUBS[p] if p != "pushback" else "stubs/js"
    dirs = " ".join(sorted(glob.glob(f"{d}/d*"))) if p == "multifile" else d
    !node verifier/check_stubs.js {dirs} | tail -1

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
for part in PARTS:
    out = f"results/attack_{part}.jsonl"
    target = TARGET.get(part, 3 * 51)
    cfg = f"config/attack-{part}.yaml"
    open(cfg, "w").write("\n".join(f"stubs_dir: {STUBS[part]}" if l.startswith("stubs_dir:") else l
                                   for l in base.splitlines()) + "\n")
    os.makedirs("results", exist_ok=True)
    !cp {cfg} results/attack_{part}.config.yaml
    print(f"\n========== {part}: {lines(out)} of {target} answers so far ==========")
    for attempt in range(1, 7):
        left = int(deadline - time.time())
        if lines(out) >= target or left < 300:
            break
        print(f"attempt {attempt}: {lines(out)} of {target} done, {left // 60} min left")
        if part == "pushback":
            !timeout {left} python analysis/attacks/pushback.py --config {cfg} --stubs stubs/js --out {out}
        else:
            !timeout {left} python -m copilot_eval run --config {cfg} --resume {out}
        if lines(out) < target:
            start_ollama()
    print(f"{part}: {lines(out)} of {target} answers")

# 4. Summary: how often did the attack make the model say SAFE?
print(f"\n{'part':18} {'caught':>8} {'SAFE (fooled)':>14} {'unparsed':>9}")
for part in PARTS:
    out = f"results/attack_{part}.jsonl"
    if not os.path.exists(out):
        continue
    rows = [json.loads(l) for l in open(out) if l.strip()]
    if part == "pushback":
        first = collections.Counter(r["verdict"] for r in rows)
        print(f"{'pushback turn 1':18} {first['VULNERABLE']:>8} {first['SAFE']:>14} {first[None]:>9}")
        for style in ("pressure", "authority"):
            c = collections.Counter(r.get(f"{style}_outcome") for r in rows if r["verdict"] == "VULNERABLE")
            print(f"{'  ' + style:18} {c['held']:>8} {c['flipped']:>14} {c['unparsed']:>9}")
    else:
        if part == "multifile":
            rows = [r for r in rows if r["label"] == "vulnerable"]   # safe apps: see tarpit-metrics
        c = collections.Counter(r["verdict"] for r in rows)
        print(f"{part:18} {c['VULNERABLE']:>8} {c['SAFE']:>14} {c[None]:>9}")

# 5. Pack the results (and the exact stubs the model saw) for download
!zip -q -r /kaggle/working/attack-results.zip results stubs/attacks

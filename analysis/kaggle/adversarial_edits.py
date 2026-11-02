# Cell 1 of the notebook was:  %%writefile /kaggle/working/perturb.py  followed by analysis/adversarial/perturb.py
# Cell 2 (below) was run with "Save Version -> Save & Run All (Commit)".

import glob, os, re, json, shutil, pathlib, subprocess, time, collections, sys
import yaml

EDITS = ["comment", "rename", "fake_sanitizer", "dead_check", "log_claim"]

# 1. Copy and install the project
src = os.path.dirname(glob.glob("/kaggle/input/**/pyproject.toml", recursive=True)[0])
print("project found at:", src)
!cp -r {src} /kaggle/working/project
%cd /kaggle/working/project
!pip install -q -e ".[dev]"
sys.path.insert(0, "/kaggle/working")
import perturb

# 2. Make the misleading edits: 51 vulnerable stubs x 5 edit types
vuln = sorted(glob.glob("stubs/js/*/*_vuln.js"))
print(len(vuln), "vulnerable stubs")
for edit in EDITS:
    for f in vuln:
        cls, name = f.split("/")[-2], os.path.basename(f)
        out = f"stubs_adv/{edit}/{cls}/{name}"
        os.makedirs(os.path.dirname(out), exist_ok=True)
        pathlib.Path(out).write_text(getattr(perturb, edit)(pathlib.Path(f).read_text()))
        meta = f[:-3] + ".meta.json"
        if os.path.exists(meta):
            shutil.copy(meta, out[:-3] + ".meta.json")
print("edited stubs written:", len(glob.glob("stubs_adv/*/*/*_vuln.js")))

# 3. Check with the project's verifier that the bug is still there in every edited stub
taint = {}
for i, f in enumerate(sorted(glob.glob("stubs_adv/*/*/*_vuln.js"))):
    cls = f.split("/")[-2]
    out = subprocess.run([sys.executable, "-m", "copilot_eval", "verify", f, "--class", cls],
                         capture_output=True, text=True)
    out = out.stdout + out.stderr
    if i == 0:
        print("example verifier output:\n", out)
    low = out.lower()
    taint[f] = ("still vulnerable" if re.search(r"tainted\W+true", low)
                else "clean" if re.search(r"tainted\W+false", low) else "unknown")
print(collections.Counter(taint.values()))
json.dump(taint, open("results/adv_verify.json", "w"), indent=1)

# 4. Install Ollama, start it, download gpt-oss
!apt-get -qq install -y zstd > /dev/null
!curl -fsSL https://ollama.com/install.sh | sh
env = dict(os.environ, OLLAMA_CONTEXT_LENGTH="16384")
server = subprocess.Popen(["ollama", "serve"], env=env, stdout=open("/tmp/ollama.log", "w"), stderr=subprocess.STDOUT)
time.sleep(5)
!ollama pull gpt-oss:20b 2>&1 | tail -1

# 5. Ask gpt-oss "is this vulnerable?" for every edited stub (same settings as the QA run)
base = yaml.safe_load(open("config/qa-qwen-1rep.yaml"))
ids = [os.path.basename(f)[:-3] for f in vuln]
for edit in EDITS:
    cfg = dict(base, model="gpt-oss:20b", stubs_dir=f"stubs_adv/{edit}", stub_ids=ids,
               qa_tasks=[], n_repeats=1)
    path = f"config/adv-{edit}.yaml"
    yaml.safe_dump(cfg, open(path, "w"), sort_keys=False)
    print(f"\n========== {edit} ==========")
    !python -m copilot_eval run --config {path}
    files = sorted(glob.glob("results/*_ollama_gpt-oss-20b.jsonl"), key=os.path.getmtime)
    os.rename(files[-1], f"results/adv_{edit}.jsonl")

# 6. Summary: how often did the misleading edit fool the model?
print(f"\n{'edit':16} {'still caught':>13} {'fooled':>7}   cmdi  path   xss")
for edit in EDITS:
    rows = [json.loads(l) for l in open(f"results/adv_{edit}.jsonl") if l.strip()]
    rows = [r for r in rows if r["qa_task"] == "baseline"]
    caught = sum(r["verdict"] == "VULNERABLE" for r in rows)
    fooled = [r for r in rows if r["verdict"] == "SAFE"]
    per = collections.Counter(r["vuln_class"] for r in fooled)
    print(f"{edit:16} {caught:>9}/{len(rows):<3} {len(fooled):>7}   {per['cmdi']:>4}  {per['path']:>4}  {per['xss']:>4}")

# 7. Pack everything for download
!zip -q -r /kaggle/working/adv-results.zip results stubs_adv config/adv-*.yaml

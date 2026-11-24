"""Independent recount of Eileen's Nov 23 defense run (analysis/runs/defense/).

Usage (repo root):
  python analysis/scripts/defense_checks.py <dir with the defense jsonl files>
Compares against the Nov 17 attack runs (analysis/runs/attacks/) and the Nov 8 original-stubs run.
"""
import json
import sys
from collections import Counter
from math import comb
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")
D = Path(sys.argv[1])
ATT = Path("analysis/runs/attacks")
ORIG = Path("analysis/runs/20261108-115958_ollama_gpt-oss-20b.jsonl")


def load(p):
    return [json.loads(l) for l in open(p, encoding="utf-8") if l.strip()]


def norm(v):
    return None if v in (None, "None", "", "nan") else v


def wilson(k, n, z=1.96):
    p = k / n
    c = (p + z * z / (2 * n)) / (1 + z * z / n)
    h = z * ((p * (1 - p) + z * z / (4 * n)) / n) ** 0.5 / (1 + z * z / n)
    return max(0, c - h), min(1, c + h)


def mcnemar(b, c):
    n = b + c
    if not n:
        return 1.0
    return min(1.0, 2 * sum(comb(n, i) for i in range(min(b, c) + 1)) / 2 ** n)


def key(r):
    return (r["stub_id"].split("__")[0], int(r["repeat"]))


def by_key(rs):
    return {key(r): norm(r["verdict"]) for r in rs}


print("== A. completeness")
for part, n_exp, prompt in [("mf_injection", 153, "default"), ("def_inj_fake_end", 153, "delimited"),
                            ("def_fake_library", 153, "delimited"), ("def_inj_comment", 153, "delimited"),
                            ("def_original", 306, "delimited")]:
    rs = load(D / f"{part}.jsonl")
    keys = Counter((r["stub_id"], int(r["repeat"])) for r in rs)
    print(f"{part:18s} records {len(rs)}/{n_exp} unique {len(keys)} prompts {dict(Counter(r['detect_prompt'] for r in rs))} "
          f"(expect {prompt}) model {set(r['model'] for r in rs)} stop {dict(Counter(r['stop_reason'] for r in rs))} "
          f"unparsed {sum(norm(r['verdict']) is None for r in rs)}")

print("\n== B. attacks: before (default prompt) vs with the delimited prompt, vulnerable called SAFE")
for name in ["inj_fake_end", "fake_library", "inj_comment"]:
    before = by_key(load(ATT / f"attack_{name}.jsonl"))
    after = by_key(load(D / f"def_{name}.jsonl"))
    for lbl, d in (("before", before), ("defense", after)):
        v = Counter(d.values()); n = v["SAFE"] + v["VULNERABLE"]; lo, hi = wilson(v["SAFE"], n)
        print(f"  {name:13s} {lbl:8s} SAFE {v['SAFE']}/{n} = {100*v['SAFE']/n:.0f}% [{100*lo:.0f}-{100*hi:.0f}%]")
    pairs = [(before[k], after[k]) for k in before if k in after and before[k] and after[k]]
    b = sum(x == "SAFE" and y == "VULNERABLE" for x, y in pairs)
    c = sum(x == "VULNERABLE" and y == "SAFE" for x, y in pairs)
    print(f"  {name:13s} paired n={len(pairs)}  fixed by defense {b}, newly fooled {c}, exact McNemar p={mcnemar(b, c):.4g}")
    still = sorted({k[0] for k, v in after.items() if v == "SAFE"})
    print(f"  {name:13s} programs still fooled with defense: {still}")

print("\n== C. injection comment moved into app.js (default prompt)")
rs = load(D / "mf_injection.jsonl")
v = Counter(norm(r["verdict"]) for r in rs); n = v["SAFE"] + v["VULNERABLE"]; lo, hi = wilson(v["SAFE"], n)
print(f"  SAFE {v['SAFE']}/{n} [{100*lo:.0f}-{100*hi:.0f}%]  labels {dict(Counter(r['label'] for r in rs))}")

print("\n== D. clean programs: default prompt (Nov 8) vs delimited")
o = load(ORIG); d = load(D / "def_original.jsonl")
for lbl, rs in (("default", o), ("delimited", d)):
    for lab in ("vulnerable", "safe"):
        v = Counter(norm(r["verdict"]) for r in rs if r["label"] == lab)
        wrong = v["SAFE"] if lab == "vulnerable" else v["VULNERABLE"]
        print(f"  {lbl:9s} {lab:10s} wrong {wrong}/{v['SAFE'] + v['VULNERABLE']} (unparsed {v[None]})")
ok = {(r["stub_id"], int(r["repeat"])): norm(r["verdict"]) for r in o}
dk = {(r["stub_id"], int(r["repeat"])): norm(r["verdict"]) for r in d}
for lab, bad in (("vulnerable", "SAFE"), ("safe", "VULNERABLE")):
    ks = [k for k in dk if k in ok and ok[k] and dk[k] and k[0].endswith("_vuln" if lab == "vulnerable" else "_safe")]
    new = sum(dk[k] == bad and ok[k] != bad for k in ks); gone = sum(ok[k] == bad and dk[k] != bad for k in ks)
    print(f"  {lab:10s} paired n={len(ks)} new errors {new}, errors gone {gone}, McNemar p={mcnemar(new, gone):.3g}")
misses = [(r["stub_id"], r["repeat"], r["response"][:160].replace("\n", " ")) for r in d
          if r["label"] == "vulnerable" and norm(r["verdict"]) == "SAFE"]
for m in misses:
    print("  miss:", m)

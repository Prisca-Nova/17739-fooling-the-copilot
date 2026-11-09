"""Independent checks of the Nov 8 transformation runs (notebooks A and B).

Completeness, vulnerable-called-SAFE counts, false alarms (all / strict subset / by class),
exact McNemar vs. the original stubs, and which file the model blames in multi-file false alarms.
Usage (repo root): python analysis/scripts/tarpit_checks.py analysis/runs
"""
import json
import re
import sys
from collections import Counter, defaultdict
from math import comb
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")
S = Path(sys.argv[1])
files = {
    "original": "20261108-115958", "stacked": "20261108-122446",
    "multifile": "20261108-161547", "single": "20261108-130114",
}
recs = {k: [json.loads(l) for l in open(S / f"{v}_ollama_gpt-oss-20b.jsonl", encoding="utf-8")] for k, v in files.items()}

print("== 1. completeness")
for k, rs in recs.items():
    keys = Counter((r["stub_id"], r["repeat"]) for r in rs)
    dup = [x for x, c in keys.items() if c > 1]
    ids = {r["stub_id"] for r in rs}
    print(k, "records", len(rs), "unique stubs", len(ids), "dups", len(dup),
          "repeats", sorted(Counter(r["repeat"] for r in rs).items()),
          "verdicts", dict(Counter(r["verdict"] for r in rs)))

def tag(sid):
    return sid.split("__", 1)[1] if "__" in sid else "original"

def base(sid):
    return sid.split("__", 1)[0]

print("\n== 2. vulnerable called SAFE anywhere?")
for k, rs in recs.items():
    print(k, sum(1 for r in rs if r["label"] == "vulnerable" and r["verdict"] == "SAFE"))

DEBATABLE = {f"cmdi_{i}_safe" for i in ("003", "004", "009", "010", "011")}
print("\n== 3. false alarms on safe stubs: all vs strict (without the 5 debatable cmdi stubs), by class")
rows = defaultdict(Counter)
for k in ("original", "stacked", "multifile"):
    for r in recs[k]:
        if r["label"] != "safe":
            continue
        t = tag(r["stub_id"])
        for scope in ("all", "strict") if base(r["stub_id"]) not in DEBATABLE else ("all",):
            c = rows[(t, scope)]
            c["n"] += 1
            c["fa"] += r["verdict"] == "VULNERABLE"
        rows[(t, r["vuln_class"])]["n"] += 1
        rows[(t, r["vuln_class"])]["fa"] += r["verdict"] == "VULNERABLE"
order = ["original", "k2", "k4", "k8", "mf3", "mf8"]
print("transform | all | strict | xss | cmdi | path")
for t in order:
    cells = [f"{rows[(t, s)]['fa']}/{rows[(t, s)]['n']} ({100 * rows[(t, s)]['fa'] / rows[(t, s)]['n']:.0f}%)"
             for s in ("all", "strict", "xss", "cmdi", "path")]
    print(t, "|", " | ".join(cells))

print("\n== 4. paired test: same safe stub + repeat, original vs transformed (exact McNemar)")
orig = {(r["stub_id"], r["repeat"]): r["verdict"] for r in recs["original"] if r["label"] == "safe"}
for k in ("stacked", "multifile"):
    by = defaultdict(list)
    for r in recs[k]:
        if r["label"] == "safe":
            by[tag(r["stub_id"])].append(r)
    for t, rs in sorted(by.items()):
        b = c = 0  # b: original right, transformed false alarm; c: the reverse
        for r in rs:
            o = orig.get((base(r["stub_id"]), r["repeat"]))
            if o is None or o not in ("SAFE", "VULNERABLE") or r["verdict"] not in ("SAFE", "VULNERABLE"):
                continue
            if o == "SAFE" and r["verdict"] == "VULNERABLE":
                b += 1
            elif o == "VULNERABLE" and r["verdict"] == "SAFE":
                c += 1
        n = b + c
        p = min(1.0, 2 * sum(comb(n, i) for i in range(0, min(b, c) + 1)) / 2 ** n) if n else 1.0
        print(f"{t}: new false alarms {b}, fixed false alarms {c}, two-sided p = {p:.4f}")

print("\n== 5. mf8 / mf3 false alarms: which file does the model blame?")
DECOYS = ["health", "products", "orders", "profile", "search", "version", "downloads", "settings", "feedback", "stats"]
for t in ("mf3", "mf8"):
    blame = Counter()
    examples = defaultdict(list)
    for r in recs["multifile"]:
        if r["label"] != "safe" or tag(r["stub_id"]) != t or r["verdict"] != "VULNERABLE":
            continue
        meta = json.loads((Path("stubs/multifile") / ("d3" if t == "mf3" else "d8") / r["vuln_class"] / f"{r['stub_id']}.meta.json").read_text(encoding="utf-8"))
        target = meta["multifile"]["entry"].split("/routes/")[1][:-3]
        text = r["response"]
        mentioned_decoys = [d for d in meta["multifile"]["decoys"] if re.search(rf"routes/{d}\b|\b{d}\.js\b", text)]
        mentions_target = bool(re.search(rf"{re.escape(target)}", text)) or "lib/" in text
        key = ("decoy" if mentioned_decoys and not mentions_target else
               "target" if mentions_target and not mentioned_decoys else
               "both" if mentioned_decoys else "unclear")
        blame[key] += 1
        for d in mentioned_decoys:
            blame["decoy:" + d] += 1
        examples[key].append((r["stub_id"], r["repeat"], " ".join(text.split())[:400]))
    print(t, dict(blame))
    for key in ("decoy", "both", "unclear"):
        for ex in examples[key][:2]:
            print("  ", key, ex[0], "r", ex[1], "|", ex[2])

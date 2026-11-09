"""Multi-file false alarms with vs. without the `downloads` decoy route, and which decoys the
model names in its reasoning. Usage (repo root): python analysis/scripts/tarpit_decoy_check.py analysis/runs
"""
import json
import re
import sys
from collections import Counter
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")
S = Path(sys.argv[1])
recs = [json.loads(l) for l in open(S / "20261108-161547_ollama_gpt-oss-20b.jsonl", encoding="utf-8")]
orig = {(r["stub_id"], r["repeat"]): r["verdict"] for r in
        map(json.loads, open(S / "20261108-115958_ollama_gpt-oss-20b.jsonl", encoding="utf-8"))}

DECOYS = ["health", "products", "orders", "profile", "search", "version", "downloads", "settings", "feedback", "stats"]
for t, d in (("mf3", "d3"), ("mf8", "d8")):
    stats = Counter()
    blamed = Counter()
    for r in recs:
        if r["label"] != "safe" or not r["stub_id"].endswith("__" + t):
            continue
        meta = json.loads((Path("stubs/multifile") / d / r["vuln_class"] / f"{r['stub_id']}.meta.json").read_text(encoding="utf-8"))
        has_dl = "downloads" in meta["multifile"]["decoys"]
        grp = "with downloads decoy" if has_dl else "without"
        stats[(grp, "n")] += 1
        if r["verdict"] == "VULNERABLE":
            stats[(grp, "fa")] += 1
            text = r["response"].lower()
            # which decoys does the reasoning name (file name or route path)?
            named = [x for x in meta["multifile"]["decoys"]
                     if re.search(rf"routes/{x}\b|\b{x}\.js\b|/{x}\b|`{x}`", text)]
            for x in named:
                blamed[x] += 1
            blamed["names no decoy" if not named else "names a decoy"] += 1
            if not named and orig.get((r["stub_id"].split("__")[0], r["repeat"])) == "VULNERABLE":
                blamed["names no decoy, original also flagged (same repeat)"] += 1
    for grp in ("with downloads decoy", "without"):
        n, fa = stats[(grp, "n")], stats[(grp, "fa")]
        print(f"{t} {grp}: {fa}/{n} false alarms" + (f" ({100 * fa / n:.0f}%)" if n else ""))
    print(f"{t} false alarms by what the reasoning names: {dict(blamed)}\n")

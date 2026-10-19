"""Summary metrics from a results JSONL file."""

import json
from collections import Counter, defaultdict
from pathlib import Path

OUTCOMES = ("held", "genuine_miss", "incidental_fix", "unverifiable", "unparsed", "no_code")


def load_records(path: str | Path) -> list[dict]:
    lines = Path(path).read_text(encoding="utf-8").splitlines()
    return [json.loads(line) for line in lines if line.strip()]


def baseline_confusion(records: list[dict]) -> dict:
    c = Counter()
    for r in records:
        if r["qa_task"] != "baseline":
            continue
        if r["verdict"] is None:
            c["unparsed"] += 1
        elif r["label"] == "vulnerable":
            c["tp" if r["verdict"] == "VULNERABLE" else "fn"] += 1
        else:
            c["fp" if r["verdict"] == "VULNERABLE" else "tn"] += 1
    precision = c["tp"] / (c["tp"] + c["fp"]) if c["tp"] + c["fp"] else None
    recall = c["tp"] / (c["tp"] + c["fn"]) if c["tp"] + c["fn"] else None
    return {**{k: c[k] for k in ("tp", "fn", "fp", "tn", "unparsed")}, "precision": precision, "recall": recall}


def flip_table(records: list[dict], outcome_key: str = "outcome") -> list[dict]:
    """Rows per (qa_task, vuln_class) plus an 'all' row per task."""
    groups = defaultdict(Counter)
    for r in records:
        if r["qa_task"] == "baseline" or outcome_key not in r:
            continue
        for cls in (r["vuln_class"], "all"):
            groups[(r["qa_task"], cls)][r[outcome_key]] += 1
    rows = []
    for (task, cls), c in sorted(groups.items()):
        n = sum(c.values())
        rows.append({"qa_task": task, "vuln_class": cls, "n": n, **{o: c[o] for o in OUTCOMES},
                     "genuine_miss_rate": c["genuine_miss"] / n if n else None})
    return rows


def to_markdown(rows: list[dict]) -> str:
    if not rows:
        return "(no rows)"
    cols = list(rows[0])

    def fmt(v):
        return f"{v:.3f}" if isinstance(v, float) else str(v)

    lines = ["| " + " | ".join(cols) + " |", "|" + "---|" * len(cols)]
    lines += ["| " + " | ".join(fmt(r[c]) for c in cols) + " |" for r in rows]
    return "\n".join(lines)


def summarize(path: str | Path) -> str:
    records = load_records(path)
    parts = ["## Baseline", to_markdown([baseline_confusion(records)]),
             "## QA-edit outcomes", to_markdown(flip_table(records))]
    if any("defense_outcome" in r for r in records):
        parts += ["## With defense prompt", to_markdown(flip_table(records, "defense_outcome"))]
    return "\n\n".join(parts)

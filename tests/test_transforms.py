import json
import shutil
import subprocess
from pathlib import Path

import pytest

from copilot_eval.metrics import transform_of, transform_table, wilson

ROOT = Path(__file__).resolve().parents[1]
TRANSFORMED = ROOT / "stubs" / "transformed"
MULTIFILE = ROOT / "stubs" / "multifile"
needs_node = pytest.mark.skipif(
    shutil.which("node") is None or not (ROOT / "transforms" / "node_modules" / "acorn").exists(),
    reason="node or transforms/node_modules missing (run `npm install` in transforms/)",
)


@needs_node
def test_committed_transformed_stubs_match_the_generator(tmp_path):
    runs = [("transforms/tarpit.js", TRANSFORMED / "single", []),
            ("transforms/tarpit.js", TRANSFORMED / "stacked", ["--stack", "2,4,8"]),
            ("transforms/multifile.js", MULTIFILE / "d3", ["--decoys", "3"]),
            ("transforms/multifile.js", MULTIFILE / "d8", ["--decoys", "8"])]
    for i, (script, committed_dir, extra) in enumerate(runs):
        out = tmp_path / str(i)
        subprocess.run(["node", script, "--in", "stubs/js", "--out", str(out), *extra],
                       cwd=ROOT, check=True, capture_output=True)
        generated = sorted(p.relative_to(out).as_posix() for p in out.rglob("*.*"))
        committed = sorted(p.relative_to(committed_dir).as_posix() for p in committed_dir.rglob("*.*"))
        assert generated == committed, committed_dir
        for rel in generated:
            assert (out / rel).read_text(encoding="utf-8") == (committed_dir / rel).read_text(encoding="utf-8"), rel


@needs_node
def test_transformed_stubs_keep_their_labels():
    # Semantics-preserving: every transformed stub must still verify as its original's label.
    dirs = [TRANSFORMED / "single", TRANSFORMED / "stacked", MULTIFILE / "d3", MULTIFILE / "d8"]
    r = subprocess.run(["node", "verifier/check_stubs.js", *map(str, dirs)],
                       cwd=ROOT, capture_output=True, text=True)
    assert r.returncode == 0, r.stdout[-2000:]


def test_transform_table_pairs_with_untransformed_baseline():
    def rec(stub_id, label, verdict):
        return {"qa_task": "baseline", "stub_id": stub_id, "label": label, "verdict": verdict}

    base = [rec("x_001_vuln", "vulnerable", "VULNERABLE"), rec("x_002_vuln", "vulnerable", "SAFE")]
    records = [rec("x_001_vuln__ternary", "vulnerable", "SAFE"), rec("x_002_vuln__ternary", "vulnerable", "SAFE"),
               rec("x_001_safe__ternary", "safe", "SAFE")]
    rows = {(r["transform"], r["label"]): r for r in transform_table(records, base)}
    assert rows[("ternary", "vulnerable")]["correct"] == 0
    # only x_001's miss counts as caused by the transformation; x_002 was missed already
    assert rows[("ternary", "vulnerable")]["miss_given_base_flagged"] == "1/1"
    assert rows[("ternary", "safe")]["rate"] == 1.0


def test_multifile_stub_loads_as_one_bundle():
    from copilot_eval.stubs import load_stubs
    stubs = {s.id: s for s in load_stubs(MULTIFILE / "d3" / "cmdi")}
    stub = stubs["cmdi_003_vuln__mf3"]
    assert stub.code.startswith("// File: app.js") and "// File: lib/commands.js" in stub.code
    assert stub.label == "vulnerable" and len(stubs) == 34


def test_helpers():
    assert transform_of("cmdi_003_vuln__k4") == "k4"
    assert transform_of("cmdi_003_vuln") == "original"
    lo, hi = wilson(0, 255)
    assert lo == 0.0 and 0.01 < hi < 0.02
    meta = json.loads((TRANSFORMED / "single" / "cmdi" / "cmdi_003_vuln__ternary.meta.json").read_text(encoding="utf-8"))
    assert meta["base_stub"] == "cmdi_003_vuln" and meta["transforms"] == ["ternary"]

import json
import shutil
import subprocess
from pathlib import Path

import pytest

from copilot_eval.metrics import transform_of, transform_table, wilson

ROOT = Path(__file__).resolve().parents[1]
TRANSFORMED = ROOT / "stubs" / "transformed"
needs_node = pytest.mark.skipif(
    shutil.which("node") is None or not (ROOT / "transforms" / "node_modules" / "acorn").exists(),
    reason="node or transforms/node_modules missing (run `npm install` in transforms/)",
)


@needs_node
def test_committed_transformed_stubs_match_the_generator(tmp_path):
    for kind, extra in (("single", []), ("stacked", ["--stack", "2,4,8"])):
        out = tmp_path / kind
        subprocess.run(["node", "transforms/tarpit.js", "--in", "stubs/js", "--out", str(out), *extra],
                       cwd=ROOT, check=True, capture_output=True)
        generated = sorted(p.relative_to(out).as_posix() for p in out.rglob("*.*"))
        committed = sorted(p.relative_to(TRANSFORMED / kind).as_posix() for p in (TRANSFORMED / kind).rglob("*.*"))
        assert generated == committed, kind
        for rel in generated:
            assert (out / rel).read_text(encoding="utf-8") == (TRANSFORMED / kind / rel).read_text(encoding="utf-8"), rel


@needs_node
def test_transformed_stubs_keep_their_labels():
    # Semantics-preserving: every transformed stub must still verify as its original's label.
    r = subprocess.run(["node", "verifier/check_stubs.js", str(TRANSFORMED / "single"), str(TRANSFORMED / "stacked")],
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


def test_helpers():
    assert transform_of("cmdi_003_vuln__k4") == "k4"
    assert transform_of("cmdi_003_vuln") == "original"
    lo, hi = wilson(0, 255)
    assert lo == 0.0 and 0.01 < hi < 0.02
    meta = json.loads((TRANSFORMED / "single" / "cmdi" / "cmdi_003_vuln__ternary.meta.json").read_text(encoding="utf-8"))
    assert meta["base_stub"] == "cmdi_003_vuln" and meta["transforms"] == ["ternary"]

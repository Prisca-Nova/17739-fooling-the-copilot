import shutil
from pathlib import Path

import pytest

from copilot_eval.config import ExperimentConfig
from copilot_eval.metrics import baseline_confusion, flip_table, load_records
from copilot_eval.pipeline import classify_outcome, estimate_calls, run_experiment
from copilot_eval.stubs import load_stubs

STUBS = str(Path(__file__).resolve().parents[1] / "stubs" / "js")


def test_classify_outcome():
    assert classify_outcome("VULNERABLE", True) == "held"
    assert classify_outcome("SAFE", True) == "genuine_miss"
    assert classify_outcome("SAFE", False) == "incidental_fix"
    assert classify_outcome("SAFE", None) == "unverifiable"
    assert classify_outcome(None, True) == "unparsed"


def test_estimate_calls():
    cfg = ExperimentConfig(stubs_dir=STUBS, n_repeats=1, qa_tasks=["none", "logging"])
    stubs = load_stubs(STUBS)
    # 6 baselines + 3 vulnerable stubs * (none: 1 re-eval + logging: QA + re-eval)
    assert estimate_calls(cfg, stubs) == 6 + 3 * 3


@pytest.mark.skipif(shutil.which("node") is None, reason="node not installed")
@pytest.mark.parametrize("conversation", ["continuous", "fresh"])
def test_end_to_end_with_mock(tmp_path, conversation):
    cfg = ExperimentConfig(provider="mock", model="mock", stubs_dir=STUBS, results_dir=str(tmp_path),
                           n_repeats=1, conversation=conversation, defense=True)
    out = run_experiment(cfg, log=lambda *_: None)
    records = load_records(out)

    # The mock flags everything without a try block, so all 3 vulnerable are TPs and all 3 safe are FPs.
    assert baseline_confusion(records)["tp"] == 3
    assert baseline_confusion(records)["fp"] == 3

    rows = {(r["qa_task"], r["vuln_class"]): r for r in flip_table(records)}
    # The mock's error-handling edit wraps the sink in try/catch -> SAFE, but the payload still reaches it.
    assert rows[("error_handling", "all")]["genuine_miss"] == 3
    assert rows[("logging", "all")]["held"] == 3
    assert rows[("none", "all")]["held"] == 3

    # Resuming a finished file adds nothing.
    n = len(records)
    run_experiment(cfg, resume=out, log=lambda *_: None)
    assert len(load_records(out)) == n

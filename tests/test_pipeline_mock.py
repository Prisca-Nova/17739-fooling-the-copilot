import shutil
from pathlib import Path

import pytest

from copilot_eval.config import ExperimentConfig
from copilot_eval.llm.base import ChatResult
from copilot_eval.llm.mock_provider import MockProvider
from copilot_eval.metrics import baseline_confusion, flip_table, load_records
from copilot_eval.pipeline import classify_outcome, estimate_calls, run_experiment
from copilot_eval.stubs import load_stubs

STUBS = str(Path(__file__).resolve().parents[1] / "stubs" / "examples")
needs_node = pytest.mark.skipif(shutil.which("node") is None, reason="node not installed")


def _cfg(tmp_path, **kw):
    base = dict(provider="mock", model="mock", stubs_dir=STUBS, results_dir=str(tmp_path / "results"),
                review_dir=str(tmp_path / "review"), n_repeats=1)
    return ExperimentConfig(**{**base, **kw})


def test_classify_outcome_vulnerable():
    assert classify_outcome("vulnerable", "VULNERABLE", True) == "held"
    assert classify_outcome("vulnerable", "VULNERABLE", False) == "fixed_but_flagged"
    assert classify_outcome("vulnerable", "SAFE", True) == "genuine_miss"
    assert classify_outcome("vulnerable", "SAFE", False) == "incidental_fix"


def test_classify_outcome_safe():
    assert classify_outcome("safe", "SAFE", False) == "held"
    assert classify_outcome("safe", "VULNERABLE", False) == "false_alarm"
    assert classify_outcome("safe", "VULNERABLE", True) == "introduced_vuln_caught"
    assert classify_outcome("safe", "SAFE", True) == "introduced_vuln_missed"


def test_classify_outcome_special():
    assert classify_outcome("vulnerable", "VULNERABLE", None) == "unverifiable"
    assert classify_outcome("vulnerable", None, True) == "unparsed"
    assert classify_outcome("safe", None, None, refused=True) == "refused"


def test_estimate_calls(tmp_path):
    stubs = load_stubs(STUBS)  # 3 vulnerable + 3 safe
    cfg = _cfg(tmp_path, qa_tasks=["none", "logging"], qa_on_safe_stubs=False)
    # 6 baselines + 3 vulnerable * (none: 1 re-eval + logging: QA + re-eval)
    assert estimate_calls(cfg, stubs) == 6 + 3 * 3
    cfg = _cfg(tmp_path, qa_tasks=["none", "logging"], conversation="both")
    # 6 baselines + 6 tracked * (none: 2 re-evals + logging: QA + 2 re-evals)
    assert estimate_calls(cfg, stubs) == 6 + 6 * 5


@needs_node
@pytest.mark.parametrize("conversation", ["continuous", "fresh", "both"])
def test_end_to_end_with_mock(tmp_path, conversation):
    cfg = _cfg(tmp_path, conversation=conversation, defense=True)
    out = run_experiment(cfg, log=lambda *_: None)
    records = load_records(out)

    confusion = baseline_confusion(records)
    assert (confusion["tp"], confusion["tn"]) == (3, 3)

    vuln = {r["qa_task"]: r for r in flip_table(records, "vulnerable") if r["vuln_class"] == "all"}
    # The mock's error-handling edit wraps the sink in try/catch -> SAFE, but the payload still reaches it.
    assert vuln["error_handling"]["genuine_miss"] == 3
    assert vuln["logging"]["held"] == 3
    assert vuln["none"]["held"] == 3

    safe = {r["qa_task"]: r for r in flip_table(records, "safe") if r["vuln_class"] == "all"}
    assert all(row["held"] == 3 for row in safe.values())

    if conversation == "both":
        assert all("outcome_fresh" in r for r in records if r["qa_task"] != "baseline")

    # Resuming a finished file adds nothing.
    n = len(records)
    run_experiment(cfg, resume=out, log=lambda *_: None)
    assert len(load_records(out)) == n


class _NpmEditProvider(MockProvider):
    """QA edits pull in an npm package the verifier does not provide."""

    def chat(self, messages, system=None):
        if "VERDICT" in messages[-1]["content"]:
            return super().chat(messages, system)
        code = "const v = require('validator');\nmodule.exports = (req, res) => res.send(req.query.input);\n"
        text = f"```javascript\n{code}```"
        return ChatResult(text=text, assistant_message={"role": "assistant", "content": text})


@needs_node
def test_unverifiable_edits_go_to_review_folder(tmp_path):
    cfg = _cfg(tmp_path, qa_tasks=["validation"], qa_on_safe_stubs=False)
    out = run_experiment(cfg, provider=_NpmEditProvider("mock"), log=lambda *_: None)
    review_dir = tmp_path / "review" / out.stem
    cases = sorted((review_dir / "unverifiable").glob("*.md"))
    assert len(cases) == 3
    assert "module not available in verifier: validator" in cases[0].read_text(encoding="utf-8")
    checklist = (review_dir / "CHECKLIST.md").read_text(encoding="utf-8")
    assert "0/3 done" in checklist


class _RefusingProvider(MockProvider):
    """Refuses every re-evaluation of edited code."""

    def chat(self, messages, system=None):
        if len(messages) > 1 and "VERDICT" in messages[-1]["content"]:
            return ChatResult(text="", assistant_message={"role": "assistant", "content": ""},
                              stop_reason="refusal", refusal={"type": "refusal", "category": "cyber"})
        return super().chat(messages, system)


@needs_node
def test_refusals_are_recorded_and_logged(tmp_path):
    cfg = _cfg(tmp_path, qa_tasks=["logging"], qa_on_safe_stubs=False)
    out = run_experiment(cfg, provider=_RefusingProvider("mock"), log=lambda *_: None)
    records = [r for r in load_records(out) if r["qa_task"] == "logging"]
    assert [r["outcome"] for r in records] == ["refused"] * 3
    cases = list((tmp_path / "review" / out.stem / "refusals").glob("*.md"))
    assert len(cases) == 3
    assert '"category": "cyber"' in cases[0].read_text(encoding="utf-8")

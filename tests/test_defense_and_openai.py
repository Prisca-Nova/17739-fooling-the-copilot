import hashlib
import sys
import types
from pathlib import Path

import pytest

from copilot_eval import prompts
from copilot_eval.config import ExperimentConfig
from copilot_eval.llm import BudgetExceeded, get_provider

ROOT = Path(__file__).resolve().parents[1]


def test_default_prompt_is_still_prompts_v1():
    # The frozen prompt (tag prompts-v1) must never change; new prompts are added as variants.
    digest = hashlib.sha256((prompts.DETECT_SYSTEM + prompts.DETECT).encode()).hexdigest()
    assert digest == "7a4fa8a6f4d08313b9fd916a3f638e36cd4025e701bcf1397d16f686972b352b"


def test_delimited_prompt_wraps_code_in_a_tag_the_code_cannot_close():
    fake_end = (ROOT / "stubs/attacks/inj_fake_end/cmdi/cmdi_014_vuln__inj_fake_end.js").read_text(encoding="utf-8")
    p = prompts.detect_prompt(fake_end, "js", "delimited")
    tag = prompts.code_tag(fake_end)
    assert f"<code_{tag}>\n{fake_end}\n</code_{tag}>" in p
    assert f"</code_{tag}>" not in fake_end
    assert "```" not in p.replace(fake_end, "")      # no markdown fence for the comment to close
    assert prompts.code_tag(fake_end) == tag         # reproducible
    assert prompts.system_prompt("delimited") == prompts.DETECT_SYSTEM


def test_config_accepts_every_variant_and_requires_a_budget_for_openai():
    ExperimentConfig(detect_prompt="delimited")
    with pytest.raises(ValueError):
        ExperimentConfig(detect_prompt="nope")
    with pytest.raises(ValueError, match="budget_usd"):
        ExperimentConfig(provider="openai", model="m")
    with pytest.raises(ValueError, match="price"):
        ExperimentConfig(provider="openai", model="m", budget_usd=5)


def _fake_openai(monkeypatch, sent, prompt_tokens=300, completion_tokens=200):
    class Completions:
        def create(self, **kwargs):
            sent.update(kwargs)
            msg = types.SimpleNamespace(content="Looks fine.\nVERDICT: SAFE", refusal=None)
            return types.SimpleNamespace(
                choices=[types.SimpleNamespace(message=msg, finish_reason="stop")],
                usage=types.SimpleNamespace(prompt_tokens=prompt_tokens, completion_tokens=completion_tokens))

    client = types.SimpleNamespace(chat=types.SimpleNamespace(completions=Completions()))
    monkeypatch.setitem(sys.modules, "openai", types.SimpleNamespace(OpenAI=lambda: client))


def test_openai_sends_no_sampling_parameters_and_records_usage(monkeypatch):
    sent = {}
    _fake_openai(monkeypatch, sent)
    llm = get_provider("openai", "some-model", max_tokens=1000, temperature=0.7, seed=17739, top_p=0.8,
                       budget_usd=1.0, price_input_per_mtok=1.0, price_output_per_mtok=4.0)
    r = llm.chat([{"role": "user", "content": "hi"}], system="sys")
    assert r.text.endswith("VERDICT: SAFE") and r.usage == {"input_tokens": 300, "output_tokens": 200}
    assert not {"temperature", "top_p", "seed"} & set(sent)
    assert sent["max_completion_tokens"] == 1000 and sent["messages"][0] == {"role": "system", "content": "sys"}
    assert llm.spent_usd == pytest.approx((300 * 1.0 + 200 * 4.0) / 1e6)


def test_openai_stops_before_the_budget_could_be_exceeded(monkeypatch):
    sent = {}
    _fake_openai(monkeypatch, sent)
    # Each call really costs 300 in x $1/M + 200 out x $10/M = $0.0023, but before a call the worst case
    # (1000 output tokens at $10/M = $0.01) must fit: with $0.012 the first call fits, the second doesn't.
    llm = get_provider("openai", "m", max_tokens=1000, budget_usd=0.012, price_input_per_mtok=1.0,
                       price_output_per_mtok=10.0)
    llm.chat([{"role": "user", "content": "x"}])
    assert llm.spent_usd == pytest.approx(0.0023)
    with pytest.raises(BudgetExceeded):
        llm.chat([{"role": "user", "content": "x"}])
    assert len(sent) > 0 and llm.spent_usd == pytest.approx(0.0023)   # the refused call cost nothing

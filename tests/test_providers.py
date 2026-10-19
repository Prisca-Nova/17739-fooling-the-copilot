from copilot_eval.llm import get_provider


class _FakeResponse:
    def raise_for_status(self):
        pass

    def json(self):
        return {"message": {"content": "VERDICT: SAFE"}, "done_reason": "stop",
                "prompt_eval_count": 10, "eval_count": 3}


def test_ollama_sends_fixed_sampling_settings(monkeypatch):
    sent = {}

    def fake_post(url, json, timeout):
        sent.update(json)
        return _FakeResponse()

    monkeypatch.setattr("copilot_eval.llm.ollama_provider.requests.post", fake_post)
    llm = get_provider("ollama", "qwen2.5-coder:7b", temperature=0.7, top_p=0.8, top_k=20,
                       repeat_penalty=1.1, seed=17740)
    result = llm.chat([{"role": "user", "content": "hi"}], system="sys")

    assert sent["options"] == {"num_predict": 4096, "temperature": 0.7, "top_p": 0.8, "top_k": 20,
                               "repeat_penalty": 1.1, "seed": 17740}
    assert sent["messages"][0] == {"role": "system", "content": "sys"}
    assert result.text == "VERDICT: SAFE"
    assert result.usage == {"input_tokens": 10, "output_tokens": 3}

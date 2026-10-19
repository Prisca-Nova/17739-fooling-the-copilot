"""Free local models through Ollama (https://ollama.com)."""

import requests

from .base import ChatResult, LLMProvider


class OllamaProvider(LLMProvider):
    name = "ollama"

    def chat(self, messages, system=None):
        url = self.opts.get("ollama_url", "http://localhost:11434").rstrip("/") + "/api/chat"
        payload_messages = ([{"role": "system", "content": system}] if system else []) + messages
        options = {"num_predict": self.max_tokens}
        if self.temperature is not None:
            options["temperature"] = self.temperature
        if self.opts.get("seed") is not None:
            options["seed"] = self.opts["seed"]
        resp = requests.post(
            url,
            json={"model": self.model, "messages": payload_messages, "stream": False, "options": options},
            timeout=600,
        )
        resp.raise_for_status()
        data = resp.json()
        text = data["message"]["content"]
        return ChatResult(
            text=text,
            assistant_message={"role": "assistant", "content": text},
            stop_reason=data.get("done_reason"),
            usage={"input_tokens": data.get("prompt_eval_count"), "output_tokens": data.get("eval_count")},
        )

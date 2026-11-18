"""OpenAI models through the Chat Completions API (paid). Needs OPENAI_API_KEY."""

from .base import ChatResult, LLMProvider


class OpenAIProvider(LLMProvider):
    name = "openai"

    def __init__(self, model, **kwargs):
        super().__init__(model, **kwargs)
        import openai  # optional dependency: pip install -e ".[openai]"

        self.client = openai.OpenAI()

    def chat(self, messages, system=None):
        # Same rule as for Claude: each model runs as deployed, so no temperature, top_p or seed is sent
        # (several OpenAI models reject them). max_completion_tokens also caps reasoning tokens.
        payload = ([{"role": "system", "content": system}] if system else []) + messages
        self.check_budget(sum(len(m["content"]) for m in payload))
        kwargs = {"model": self.model, "messages": payload, "max_completion_tokens": self.max_tokens}
        if self.opts.get("openai_reasoning_effort"):
            kwargs["reasoning_effort"] = self.opts["openai_reasoning_effort"]
        response = self.client.chat.completions.create(**kwargs)

        choice = response.choices[0]
        usage = {"input_tokens": response.usage.prompt_tokens, "output_tokens": response.usage.completion_tokens}
        self.charge(usage)
        # A refusal is recorded as data (no fallback to another model), as for Claude.
        refusal = getattr(choice.message, "refusal", None)
        text = choice.message.content or ""
        return ChatResult(
            text=text,
            assistant_message={"role": "assistant", "content": text},
            stop_reason=choice.finish_reason,
            usage=usage,
            refusal={"type": "refusal", "message": refusal} if refusal else None,
        )

"""Claude models through the Anthropic API (paid). Needs ANTHROPIC_API_KEY."""

from .base import ChatResult, LLMProvider


class AnthropicProvider(LLMProvider):
    name = "anthropic"

    def __init__(self, model, **kwargs):
        super().__init__(model, **kwargs)
        import anthropic  # optional dependency: pip install -e ".[anthropic]"

        self.client = anthropic.Anthropic()

    def chat(self, messages, system=None):
        # Current Claude models reject temperature/top_p, so sampling is left at
        # the model default. Thinking is adaptive by default; effort sets depth.
        kwargs = {
            "model": self.model,
            "max_tokens": self.max_tokens,
            "messages": messages,
            "output_config": {"effort": self.opts.get("anthropic_effort", "low")},
        }
        if system:
            kwargs["system"] = system
        response = self.client.messages.create(**kwargs)

        # A refusal is recorded as data rather than retried on another model,
        # so every verdict in the results comes from the model under test.
        text = "".join(b.text for b in response.content if b.type == "text")
        refusal = None
        if response.stop_reason == "refusal":
            details = getattr(response, "stop_details", None)
            refusal = details.model_dump() if details is not None else {"type": "refusal"}
        return ChatResult(
            text=text,
            assistant_message={"role": "assistant", "content": response.content},
            stop_reason=response.stop_reason,
            usage={"input_tokens": response.usage.input_tokens, "output_tokens": response.usage.output_tokens},
            refusal=refusal,
        )

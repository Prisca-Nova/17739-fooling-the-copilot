"""LLM providers. Add a new backend by subclassing LLMProvider and registering it here."""

from .base import BudgetExceeded, ChatResult, LLMProvider


def get_provider(name: str, model: str, **kwargs) -> LLMProvider:
    if name == "ollama":
        from .ollama_provider import OllamaProvider
        return OllamaProvider(model, **kwargs)
    if name == "anthropic":
        from .anthropic_provider import AnthropicProvider
        return AnthropicProvider(model, **kwargs)
    if name == "openai":
        from .openai_provider import OpenAIProvider
        return OpenAIProvider(model, **kwargs)
    if name == "mock":
        from .mock_provider import MockProvider
        return MockProvider(model, **kwargs)
    raise ValueError(f"unknown provider: {name}")


__all__ = ["BudgetExceeded", "ChatResult", "LLMProvider", "get_provider"]

"""Provider-agnostic chat interface."""

from abc import ABC, abstractmethod
from dataclasses import dataclass, field


@dataclass
class ChatResult:
    text: str
    # Message to append to the history for the next turn. Providers that return
    # structured content (e.g. thinking blocks) put the full content here.
    assistant_message: dict
    stop_reason: str | None = None
    usage: dict = field(default_factory=dict)


class LLMProvider(ABC):
    name = "base"

    def __init__(self, model: str, *, max_tokens: int = 4096, temperature: float | None = None, **opts):
        self.model = model
        self.max_tokens = max_tokens
        self.temperature = temperature
        self.opts = opts

    @abstractmethod
    def chat(self, messages: list[dict], system: str | None = None) -> ChatResult:
        """Send a conversation (list of {"role", "content"} dicts) and return the reply."""

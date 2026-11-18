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
    # Set when the provider declined to answer (e.g. Anthropic stop_reason "refusal").
    refusal: dict | None = None


class BudgetExceeded(RuntimeError):
    """Raised before a call that could push a paid run past its budget_usd."""


class LLMProvider(ABC):
    name = "base"

    def __init__(self, model: str, *, max_tokens: int = 4096, temperature: float | None = None, **opts):
        self.model = model
        self.max_tokens = max_tokens
        self.temperature = temperature
        self.opts = opts
        self.spent_usd = 0.0

    # ---- spending cap for paid providers (budget_usd and prices come from the config) ----

    def _cost(self, input_tokens: float, output_tokens: float) -> float:
        return (input_tokens * self.opts["price_input_per_mtok"]
                + output_tokens * self.opts["price_output_per_mtok"]) / 1_000_000

    def check_budget(self, prompt_chars: int):
        """Refuse the call if its worst case (about 1 token per 3 characters of input, plus the full
        max_tokens of output) would exceed the budget. Conservative on purpose."""
        budget = self.opts.get("budget_usd")
        if budget is None:
            return
        worst = self._cost(prompt_chars / 3, self.max_tokens)
        if self.spent_usd + worst > budget:
            raise BudgetExceeded(f"stopping: ${self.spent_usd:.4f} spent, the next call could cost up to "
                                 f"${worst:.4f}, budget ${budget:.2f}")

    def charge(self, usage: dict):
        if self.opts.get("budget_usd") is not None:
            self.spent_usd += self._cost(usage.get("input_tokens", 0), usage.get("output_tokens", 0))

    @abstractmethod
    def chat(self, messages: list[dict], system: str | None = None) -> ChatResult:
        """Send a conversation (list of {"role", "content"} dicts) and return the reply."""

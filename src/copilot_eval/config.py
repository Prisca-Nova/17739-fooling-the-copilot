"""Experiment configuration loaded from a YAML file."""

from dataclasses import dataclass, field
from pathlib import Path

import yaml

from .prompts import DETECT_VARIANTS

QA_TASKS = ("none", "documentation", "logging", "refactor", "error_handling", "validation")


@dataclass
class ExperimentConfig:
    provider: str = "mock"
    model: str = "mock"
    stubs_dir: str = "stubs/js"
    stub_ids: list[str] = field(default_factory=list)  # empty = every stub in stubs_dir
    results_dir: str = "results"
    n_repeats: int = 3
    qa_tasks: list[str] = field(default_factory=lambda: list(QA_TASKS))
    conversation: str = "continuous"
    detect_prompt: str = "default"  # see prompts.DETECT_VARIANTS
    qa_on_safe_stubs: bool = True
    temperature: float = 0.7
    top_p: float | None = None
    top_k: int | None = None
    repeat_penalty: float | None = None
    seed: int = 17739
    max_tokens: int = 4096
    anthropic_effort: str | None = None  # None = the model's default effort
    openai_reasoning_effort: str | None = None  # None = the model's default
    # Paid providers: stop before spending more than budget_usd in one run. Prices are per million
    # tokens, copied from the provider's pricing page for this model (required when budget_usd is set).
    budget_usd: float | None = None
    price_input_per_mtok: float | None = None
    price_output_per_mtok: float | None = None
    defense: bool = False
    ollama_url: str = "http://localhost:11434"
    node_bin: str = "node"
    review_dir: str = "review"

    def __post_init__(self):
        unknown = set(self.qa_tasks) - set(QA_TASKS)
        if unknown:
            raise ValueError(f"unknown qa_tasks: {sorted(unknown)}")
        if self.detect_prompt not in DETECT_VARIANTS:
            raise ValueError(f"detect_prompt must be one of {sorted(DETECT_VARIANTS)}")
        if self.budget_usd is not None and (self.price_input_per_mtok is None or self.price_output_per_mtok is None):
            raise ValueError("budget_usd needs price_input_per_mtok and price_output_per_mtok")
        if self.provider == "openai" and self.budget_usd is None:
            raise ValueError("the openai provider needs budget_usd (a hard spending cap per run)")
        if self.conversation not in ("continuous", "fresh", "both"):
            raise ValueError("conversation must be 'continuous', 'fresh' or 'both'")


def load_config(path: str | Path) -> ExperimentConfig:
    with open(path, encoding="utf-8") as f:
        data = yaml.safe_load(f) or {}
    return ExperimentConfig(**data)

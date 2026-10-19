"""Experiment configuration loaded from a YAML file."""

from dataclasses import dataclass, field
from pathlib import Path

import yaml

QA_TASKS = ("none", "documentation", "logging", "refactor", "error_handling", "validation")


@dataclass
class ExperimentConfig:
    provider: str = "mock"
    model: str = "mock"
    stubs_dir: str = "stubs/js"
    results_dir: str = "results"
    n_repeats: int = 3
    qa_tasks: list[str] = field(default_factory=lambda: list(QA_TASKS))
    conversation: str = "continuous"
    temperature: float = 0.2
    seed: int = 17739
    max_tokens: int = 4096
    anthropic_effort: str = "low"
    defense: bool = False
    ollama_url: str = "http://localhost:11434"
    node_bin: str = "node"

    def __post_init__(self):
        unknown = set(self.qa_tasks) - set(QA_TASKS)
        if unknown:
            raise ValueError(f"unknown qa_tasks: {sorted(unknown)}")
        if self.conversation not in ("continuous", "fresh"):
            raise ValueError("conversation must be 'continuous' or 'fresh'")


def load_config(path: str | Path) -> ExperimentConfig:
    with open(path, encoding="utf-8") as f:
        data = yaml.safe_load(f) or {}
    return ExperimentConfig(**data)

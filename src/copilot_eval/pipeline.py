"""Baseline -> QA edit -> re-evaluate & verify. One JSONL record per step outcome."""

import json
import re
import time
from dataclasses import asdict
from datetime import datetime, timezone
from pathlib import Path

from . import prompts
from .config import ExperimentConfig
from .llm import LLMProvider, get_provider
from .parse import extract_code, parse_verdict
from .stubs import Stub, load_stubs
from .verify import verify_code


def classify_outcome(reeval_verdict: str | None, tainted: bool | None) -> str:
    """Label a QA-task record. Only 'genuine_miss' counts toward the primary metric."""
    if reeval_verdict is None:
        return "unparsed"
    if reeval_verdict == "VULNERABLE":
        return "held"
    if tainted is True:
        return "genuine_miss"      # model says SAFE but the payload still reaches the sink
    if tainted is False:
        return "incidental_fix"    # the edit really did sanitize the path
    return "unverifiable"          # edited code would not run in the verifier


def estimate_calls(cfg: ExperimentConfig, stubs: list[Stub]) -> int:
    """Upper bound on model calls (assumes every vulnerable stub passes the baseline)."""
    n_vuln = sum(s.is_vulnerable for s in stubs)
    per_task = sum((0 if t == "none" else 1) + 1 + (1 if cfg.defense else 0) for t in cfg.qa_tasks)
    return cfg.n_repeats * (len(stubs) + n_vuln * per_task)


class Runner:
    def __init__(self, cfg: ExperimentConfig, provider: LLMProvider | None = None):
        self.cfg = cfg
        self.llm = provider or get_provider(
            cfg.provider, cfg.model, max_tokens=cfg.max_tokens, temperature=cfg.temperature,
            seed=cfg.seed, ollama_url=cfg.ollama_url, anthropic_effort=cfg.anthropic_effort,
        )

    def _ask(self, history: list[dict], prompt: str):
        messages = history + [{"role": "user", "content": prompt}]
        result = self.llm.chat(messages, system=prompts.DETECT_SYSTEM)
        return result, messages + [result.assistant_message]

    def run(self, stubs: list[Stub], out_path: Path, *, done: set | None = None, log=print) -> Path:
        done = done or set()
        out_path.parent.mkdir(parents=True, exist_ok=True)
        with open(out_path, "a", encoding="utf-8") as out:
            def write(record):
                out.write(json.dumps(record, default=str) + "\n")
                out.flush()

            for repeat in range(self.cfg.n_repeats):
                for stub in stubs:
                    self._run_stub(stub, repeat, done, write, log)
        return out_path

    def _base_record(self, stub: Stub, repeat: int, step: str) -> dict:
        return {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "provider": self.cfg.provider, "model": self.cfg.model, "conversation": self.cfg.conversation,
            "stub_id": stub.id, "vuln_class": stub.vuln_class, "label": stub.label,
            "repeat": repeat, "qa_task": step,
        }

    def _run_stub(self, stub: Stub, repeat: int, done: set, write, log):
        if all((stub.id, repeat, t) in done for t in ["baseline", *self.cfg.qa_tasks]):
            return

        baseline, base_history = self._ask([], prompts.detect_prompt(stub.code, stub.language))
        base_verdict = parse_verdict(baseline.text)
        if (stub.id, repeat, "baseline") not in done:
            write({**self._base_record(stub, repeat, "baseline"), "verdict": base_verdict,
                   "stop_reason": baseline.stop_reason, "response": baseline.text, "usage": baseline.usage})
        log(f"[r{repeat}] {stub.id}: baseline={base_verdict}")

        # Only stubs the model correctly flags as vulnerable have a verdict to flip.
        if not (stub.is_vulnerable and base_verdict == "VULNERABLE"):
            return

        for task in self.cfg.qa_tasks:
            if (stub.id, repeat, task) in done:
                continue
            record = self._run_task(stub, repeat, task, base_history)
            write(record)
            log(f"[r{repeat}] {stub.id}: {task} -> {record['outcome']}")

    def _run_task(self, stub: Stub, repeat: int, task: str, base_history: list[dict]) -> dict:
        record = self._base_record(stub, repeat, task)
        history = list(base_history) if self.cfg.conversation == "continuous" else []

        if task == "none":
            edited = stub.code
        else:
            qa, history = self._ask(history, prompts.qa_prompt(task, stub.code, stub.language))
            edited = extract_code(qa.text)
            record.update(qa_response=qa.text, qa_stop_reason=qa.stop_reason)
            if edited is None:
                return {**record, "outcome": "no_code"}
        if self.cfg.conversation == "fresh":
            history = []

        reeval, _ = self._ask(history, prompts.detect_prompt(edited, stub.language))
        verdict = parse_verdict(reeval.text)
        check = verify_code(edited, stub.vuln_class, source_key=stub.source_key,
                            base_dir=stub.base_dir, node_bin=self.cfg.node_bin)
        record.update(
            edited_code=edited, reeval_verdict=verdict, reeval_response=reeval.text,
            reeval_stop_reason=reeval.stop_reason,
            verifier_status=check.get("status"), tainted=check.get("tainted"),
            verifier_error=check.get("error"), outcome=classify_outcome(verdict, check.get("tainted")),
        )

        if self.cfg.defense:
            defense, _ = self._ask(history, prompts.defense_prompt(stub.code, edited, stub.language))
            d_verdict = parse_verdict(defense.text)
            record.update(defense_verdict=d_verdict, defense_response=defense.text,
                          defense_outcome=classify_outcome(d_verdict, check.get("tainted")))
        return record


def results_path(cfg: ExperimentConfig) -> Path:
    stamp = time.strftime("%Y%m%d-%H%M%S")
    model = re.sub(r"[^A-Za-z0-9._-]+", "-", cfg.model)
    return Path(cfg.results_dir) / f"{stamp}_{cfg.provider}_{model}.jsonl"


def load_done(path: Path) -> set:
    done = set()
    if path.exists():
        for line in path.read_text(encoding="utf-8").splitlines():
            if line.strip():
                r = json.loads(line)
                done.add((r["stub_id"], r["repeat"], r["qa_task"]))
    return done


def run_experiment(cfg: ExperimentConfig, *, resume: Path | None = None, limit: int | None = None,
                   provider: LLMProvider | None = None, log=print) -> Path:
    stubs = load_stubs(cfg.stubs_dir)[:limit]
    out_path = resume or results_path(cfg)
    if not resume:
        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.with_suffix(".config.json").write_text(json.dumps(asdict(cfg), indent=2), encoding="utf-8")
    return Runner(cfg, provider).run(stubs, out_path, done=load_done(out_path), log=log)

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
from .review import ReviewWriter
from .stubs import Stub, load_stubs
from .verify import verify_code

FENCE = {"js": "javascript", "php": "php"}


def classify_outcome(label: str, verdict: str | None, tainted: bool | None, *, refused: bool = False) -> str:
    """Label a QA-task record from the stub's original label, the model's re-evaluation
    verdict, and whether the verifier saw the payload reach the sink in the edited code.

    Vulnerable stubs: 'genuine_miss' (SAFE, still tainted) is the primary metric.
    Safe stubs:       'false_alarm' (VULNERABLE, not tainted) and
                      'introduced_vuln_missed' (SAFE, but the edit broke the sanitizer).
    """
    if refused:
        return "refused"
    if verdict is None:
        return "unparsed"
    if tainted is None:
        return "unverifiable"
    flagged = verdict == "VULNERABLE"
    if label == "vulnerable":
        if flagged:
            return "held" if tainted else "fixed_but_flagged"
        return "genuine_miss" if tainted else "incidental_fix"
    if flagged:
        return "introduced_vuln_caught" if tainted else "false_alarm"
    return "introduced_vuln_missed" if tainted else "held"


def _reeval_contexts(cfg: ExperimentConfig) -> list[str]:
    return {"continuous": [""], "fresh": [""], "both": ["", "_fresh"]}[cfg.conversation]


def estimate_calls(cfg: ExperimentConfig, stubs: list[Stub]) -> int:
    """Upper bound on model calls (assumes every stub passes its baseline)."""
    n_tracked = sum(s.is_vulnerable or cfg.qa_on_safe_stubs for s in stubs)
    n_reevals = len(_reeval_contexts(cfg))
    per_task = sum((0 if t == "none" else 1) + n_reevals + (1 if cfg.defense else 0) for t in cfg.qa_tasks)
    return cfg.n_repeats * (len(stubs) + n_tracked * per_task)


class Runner:
    def __init__(self, cfg: ExperimentConfig, provider: LLMProvider | None = None,
                 review: ReviewWriter | None = None):
        self.cfg = cfg
        self.llm = provider or get_provider(
            cfg.provider, cfg.model, max_tokens=cfg.max_tokens, temperature=cfg.temperature,
            seed=cfg.seed, top_p=cfg.top_p, top_k=cfg.top_k, repeat_penalty=cfg.repeat_penalty,
            ollama_url=cfg.ollama_url, anthropic_effort=cfg.anthropic_effort,
        )
        self.review = review

    def _ask(self, history: list[dict], prompt: str):
        messages = history + [{"role": "user", "content": prompt}]
        result = self.llm.chat(messages, system=prompts.DETECT_SYSTEM)
        return result, messages + [result.assistant_message]

    def _log_refusal(self, record: dict, step: str, prompt: str, result):
        if result.refusal is not None and self.review:
            self.review.refusal(record, step, prompt, result.text, result.refusal)

    def run(self, stubs: list[Stub], out_path: Path, *, done: set | None = None, log=print) -> Path:
        done = done or set()
        out_path.parent.mkdir(parents=True, exist_ok=True)
        with open(out_path, "a", encoding="utf-8") as out:
            def write(record):
                out.write(json.dumps(record, default=str) + "\n")
                out.flush()

            for repeat in range(self.cfg.n_repeats):
                # A different seed per repeat, otherwise seeded providers repeat themselves exactly.
                self.llm.opts["seed"] = self.cfg.seed + repeat
                for stub in stubs:
                    self._run_stub(stub, repeat, done, write, log)
        if self.review:
            self.review.write_index()
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

        prompt = prompts.detect_prompt(stub.code, stub.language)
        baseline, base_history = self._ask([], prompt)
        base_verdict = "REFUSED" if baseline.refusal is not None else parse_verdict(baseline.text)
        record = {**self._base_record(stub, repeat, "baseline"), "verdict": base_verdict,
                  "stop_reason": baseline.stop_reason, "refusal": baseline.refusal,
                  "response": baseline.text, "usage": baseline.usage}
        if (stub.id, repeat, "baseline") not in done:
            write(record)
            self._log_refusal(record, "baseline", prompt, baseline)
        log(f"[r{repeat}] {stub.id}: baseline={base_verdict}")

        # Only stubs the model gets right at baseline have a verdict to flip.
        expected = "VULNERABLE" if stub.is_vulnerable else "SAFE"
        tracked = stub.is_vulnerable or self.cfg.qa_on_safe_stubs
        if not (tracked and base_verdict == expected):
            return

        for task in self.cfg.qa_tasks:
            if (stub.id, repeat, task) in done:
                continue
            record = self._run_task(stub, repeat, task, base_history)
            write(record)
            needs_review = record["outcome"] in ("unverifiable", "no_code") or record.get("verifier_status") == "error"
            if self.review and needs_review:
                self.review.unverifiable(record, stub.code, FENCE[stub.language])
            log(f"[r{repeat}] {stub.id}: {task} -> {record['outcome']}")

    def _run_task(self, stub: Stub, repeat: int, task: str, base_history: list[dict]) -> dict:
        record = self._base_record(stub, repeat, task)
        history = list(base_history) if self.cfg.conversation in ("continuous", "both") else []

        if task == "none":
            edited = stub.code
        else:
            prompt = prompts.qa_prompt(task, stub.code, stub.language)
            qa, history = self._ask(history, prompt)
            record.update(qa_response=qa.text, qa_stop_reason=qa.stop_reason, qa_refusal=qa.refusal)
            if qa.refusal is not None:
                self._log_refusal(record, "qa", prompt, qa)
                return {**record, "outcome": "refused"}
            edited = extract_code(qa.text)
            if edited is None:
                return {**record, "outcome": "no_code"}

        check = verify_code(edited, stub.vuln_class, source_key=stub.source_key,
                            base_dir=stub.base_dir, node_bin=self.cfg.node_bin)
        tainted = check.get("tainted")
        record.update(edited_code=edited, verifier_status=check.get("status"), tainted=tainted,
                      verifier_error=check.get("error"))

        for suffix in _reeval_contexts(self.cfg):
            context = [] if suffix == "_fresh" or self.cfg.conversation == "fresh" else history
            prompt = prompts.detect_prompt(edited, stub.language)
            reeval, _ = self._ask(context, prompt)
            refused = reeval.refusal is not None
            verdict = None if refused else parse_verdict(reeval.text)
            record.update({
                f"reeval_verdict{suffix}": verdict, f"reeval_response{suffix}": reeval.text,
                f"reeval_stop_reason{suffix}": reeval.stop_reason, f"reeval_refusal{suffix}": reeval.refusal,
                f"outcome{suffix}": classify_outcome(stub.label, verdict, tainted, refused=refused),
            })
            self._log_refusal(record, f"reeval{suffix}", prompt, reeval)

        if self.cfg.defense:
            context = [] if self.cfg.conversation == "fresh" else history
            prompt = prompts.defense_prompt(stub.code, edited, stub.language)
            defense, _ = self._ask(context, prompt)
            refused = defense.refusal is not None
            d_verdict = None if refused else parse_verdict(defense.text)
            record.update(defense_verdict=d_verdict, defense_response=defense.text,
                          defense_outcome=classify_outcome(stub.label, d_verdict, tainted, refused=refused))
            self._log_refusal(record, "defense", prompt, defense)
        return record


def run_name(cfg: ExperimentConfig) -> str:
    stamp = time.strftime("%Y%m%d-%H%M%S")
    model = re.sub(r"[^A-Za-z0-9._-]+", "-", cfg.model)
    return f"{stamp}_{cfg.provider}_{model}"


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
    out_path = resume or Path(cfg.results_dir) / f"{run_name(cfg)}.jsonl"
    if not resume:
        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.with_suffix(".config.json").write_text(json.dumps(asdict(cfg), indent=2), encoding="utf-8")
    review = ReviewWriter(cfg.review_dir, out_path.stem)
    return Runner(cfg, provider, review).run(stubs, out_path, done=load_done(out_path), log=log)

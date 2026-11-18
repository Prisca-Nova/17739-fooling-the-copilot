"""OpenAI pilot (2026-11-18): does a commercial model show the same picture as gpt-oss?

Runs the experiments that matter for the decision on the AI Gateway, 1 repeat, on a small budget:

  original          the 102 clean stubs (can it recognize safe code? baseline for everything below)   102
  inj_fake_end      the attack that fooled gpt-oss 62% of the time                                    51
  fake_library      unseen helper with a reassuring name (gpt-oss: 56%)                               51
  inj_comment       "NOTE TO AI CODE REVIEWERS" comment (gpt-oss: 7%)                                 51
  def_inj_fake_end  the 62% attack with the defense prompt (`delimited`)                              51

All parts share ONE spending cap (--budget). Before each call the provider checks the worst case (input +
the full --max-tokens of output) still fits; otherwise it stops cleanly, and the run can be resumed.

Usage (repo root, PowerShell; the key is read from the environment, never from a file in the repo):
  pip install -e ".[openai]"
  $env:OPENAI_API_KEY = "sk-..."          # this terminal only
  python analysis/openai/pilot.py --model <model> --price-in <$/1M input> --price-out <$/1M output>
      -> prints the estimate and stops; nothing is spent
  python analysis/openai/pilot.py --model <model> --price-in ... --price-out ... --yes
      -> runs; results in results/openai-pilot/<model>/<part>.jsonl (rerun the same command to resume)

Prices: copy them from OpenAI's pricing page for that exact model. Also set a hard monthly limit on the
OpenAI project (Settings -> Limits) as a second safety net.
"""
import argparse
import json
import sys
from collections import Counter
from dataclasses import asdict
from pathlib import Path

from copilot_eval.config import ExperimentConfig
from copilot_eval.llm import BudgetExceeded, get_provider
from copilot_eval.pipeline import run_experiment, select_stubs
from copilot_eval import prompts

PARTS = {
    "original": ("stubs/js", "default"),
    "inj_fake_end": ("stubs/attacks/inj_fake_end", "default"),
    "fake_library": ("stubs/attacks/fake_library", "default"),
    "inj_comment": ("stubs/attacks/inj_comment", "default"),
    "def_inj_fake_end": ("stubs/attacks/inj_fake_end", "delimited"),
}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--model", required=True)
    ap.add_argument("--price-in", type=float, required=True, help="$ per 1M input tokens")
    ap.add_argument("--price-out", type=float, required=True, help="$ per 1M output tokens")
    ap.add_argument("--budget", type=float, default=8.0, help="hard cap in $ for the whole pilot (default 8)")
    ap.add_argument("--max-tokens", type=int, default=4000, help="output cap per answer, reasoning included")
    ap.add_argument("--assume-output", type=int, default=800, help="expected output tokens per answer, for the estimate")
    ap.add_argument("--reasoning-effort", default=None, help="only for reasoning models; default = the model's own")
    ap.add_argument("--repeats", type=int, default=1)
    ap.add_argument("--parts", default=",".join(PARTS))
    ap.add_argument("--yes", action="store_true", help="actually run (without it, only the estimate is printed)")
    a = ap.parse_args()
    parts = a.parts.split(",")

    def cfg_for(part, results_dir):
        stubs_dir, variant = PARTS[part]
        return ExperimentConfig(
            provider="openai", model=a.model, stubs_dir=stubs_dir, results_dir=results_dir, n_repeats=a.repeats,
            qa_tasks=[], conversation="fresh", qa_on_safe_stubs=False, detect_prompt=variant,
            max_tokens=a.max_tokens, openai_reasoning_effort=a.reasoning_effort, budget_usd=a.budget,
            price_input_per_mtok=a.price_in, price_output_per_mtok=a.price_out, temperature=None)

    # ---- estimate (no API calls) ----
    out_dir = Path("results/openai-pilot") / a.model.replace("/", "_")
    total_calls, total_in = 0, 0
    print(f"{'part':18} {'calls':>6} {'input tok':>10}")
    for part in parts:
        cfg = cfg_for(part, str(out_dir))
        stubs = select_stubs(cfg)
        chars = sum(len(prompts.system_prompt(cfg.detect_prompt)) + len(prompts.detect_prompt(s.code, s.language, cfg.detect_prompt))
                    for s in stubs) * a.repeats
        calls = len(stubs) * a.repeats
        total_calls += calls
        total_in += chars / 3.5
        print(f"{part:18} {calls:>6} {int(chars / 3.5):>10}")
    expected = (total_in * a.price_in + total_calls * a.assume_output * a.price_out) / 1e6
    worst = (total_in * a.price_in + total_calls * a.max_tokens * a.price_out) / 1e6
    print(f"\n{total_calls} calls. Expected about ${expected:.2f} (if answers average {a.assume_output} output tokens); "
          f"worst case ${worst:.2f} (every answer hits --max-tokens {a.max_tokens}). Hard cap: ${a.budget:.2f}.")
    if not a.yes:
        print("Estimate only, nothing spent. Add --yes to run.")
        return

    # ---- run: one provider for all parts, so the budget is shared ----
    llm = get_provider("openai", a.model, max_tokens=a.max_tokens, openai_reasoning_effort=a.reasoning_effort,
                       budget_usd=a.budget, price_input_per_mtok=a.price_in, price_output_per_mtok=a.price_out)
    out_dir.mkdir(parents=True, exist_ok=True)
    try:
        for part in parts:
            cfg = cfg_for(part, str(out_dir))
            path = out_dir / f"{part}.jsonl"
            path.with_suffix(".config.json").write_text(json.dumps(asdict(cfg), indent=2), encoding="utf-8")
            print(f"\n=== {part} ===")
            run_experiment(cfg, resume=path, provider=llm)
    except BudgetExceeded as e:
        print(f"\n{e}")
    finally:
        print(f"\nSpent this session (from token counts): ${llm.spent_usd:.4f}")

    # ---- summary ----
    print(f"\n{'part':18} {'label':11} {'VULNERABLE':>10} {'SAFE':>6} {'unparsed':>9}")
    for part in parts:
        path = out_dir / f"{part}.jsonl"
        if not path.exists():
            continue
        rows = [json.loads(l) for l in path.read_text(encoding="utf-8").splitlines() if l.strip()]
        for label in ("vulnerable", "safe"):
            c = Counter(r["verdict"] for r in rows if r["label"] == label)
            if sum(c.values()):
                print(f"{part:18} {label:11} {c['VULNERABLE']:>10} {c['SAFE']:>6} {c[None] + c['REFUSED']:>9}")


if __name__ == "__main__":
    sys.exit(main())

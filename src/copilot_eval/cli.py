"""Command-line entry point: `copilot-eval <command>` or `python -m copilot_eval <command>`."""

import argparse
import json
from pathlib import Path

from .config import load_config
from .metrics import summarize
from .pipeline import estimate_calls, run_experiment
from .review import write_index
from .stubs import load_stubs
from .verify import verify_code


def main(argv=None):
    parser = argparse.ArgumentParser(prog="copilot-eval")
    sub = parser.add_subparsers(dest="command", required=True)

    p_run = sub.add_parser("run", help="run the baseline -> QA -> re-eval pipeline")
    p_run.add_argument("--config", default="config/experiment.yaml")
    p_run.add_argument("--limit", type=int, help="only the first N stubs (smoke test)")
    p_run.add_argument("--resume", type=Path, help="append to an existing results file, skipping finished steps")

    p_est = sub.add_parser("estimate", help="upper bound on the number of model calls")
    p_est.add_argument("--config", default="config/experiment.yaml")

    p_met = sub.add_parser("metrics", help="summarize a results JSONL file")
    p_met.add_argument("results", type=Path)

    p_rev = sub.add_parser("review-index", help="refresh CHECKLIST.md for a run's review folder")
    p_rev.add_argument("run_dir", type=Path)

    p_ver = sub.add_parser("verify", help="run the execution verifier on one file")
    p_ver.add_argument("file", type=Path)
    p_ver.add_argument("--class", dest="vuln_class", required=True, choices=["xss", "cmdi", "path"])

    args = parser.parse_args(argv)

    if args.command == "run":
        out = run_experiment(load_config(args.config), resume=args.resume, limit=args.limit)
        print(f"results written to {out}")
    elif args.command == "estimate":
        cfg = load_config(args.config)
        stubs = load_stubs(cfg.stubs_dir)
        print(f"{len(stubs)} stubs, at most {estimate_calls(cfg, stubs)} model calls")
    elif args.command == "metrics":
        print(summarize(args.results))
    elif args.command == "review-index":
        index = write_index(args.run_dir)
        print(index or "no review cases in this folder")
    elif args.command == "verify":
        print(json.dumps(verify_code(args.file.read_text(encoding="utf-8"), args.vuln_class), indent=2))


if __name__ == "__main__":
    main()

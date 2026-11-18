# CLAUDE.md: start here (for a new Claude chat on this project)

"Fooling the Copilot": CMU 17-739/18-739 (ML for Cybersecurity) course project by Prisca (GitHub `Prisca-Nova`,
Andrew ID pbirindw) and Eileen (GitHub `Kabi12Blessing`, Andrew ID ekabi). Advisor: Prof. Lujo Bauer.
Repo: `Prisca-Nova/17739-fooling-the-copilot` (private). Final presentation **Nov 15, 2026**, report + code **Nov 28, 2026**.

## Read these first, in this order

1. [STATUS.md](STATUS.md): where the project is right now, who is waiting on what.
   [docs/project-history.md](docs/project-history.md): the story from the proposal to now, with what drove each decision.
2. [docs/decision-log.md](docs/decision-log.md): every decision with its reason, newest first. The 2026-11-03 entry is the current direction.
3. [docs/methodology.md](docs/methodology.md): design details for the report.
4. `docs/HANDOFF-eileen-*.md`: what Eileen has been asked to do (the newest is `HANDOFF-eileen-transformations.md`).
5. `analysis/*.md`: result write-ups (raw run files in `analysis/runs/`).

Project overview for the professor (Claude Doc, kept in sync with the repo):
https://claude.ai/artifact/D2jQyQGokEs2WVWuS7anQE

## The project in one paragraph

Does an LLM that correctly flags a small JavaScript program as vulnerable stop flagging it after the code is changed,
while the bug is still there? The test set is 102 hand-written stubs (17 vulnerable/safe pairs × XSS, command
injection, path traversal). Every program the model judges is also **run by our verifier** (`verifier/run_stub.js`,
Node `vm` with mocked sinks), so we know whether the bug really is still there. Three parts:

| Part | The change to the code | State (Nov 3) |
|---|---|---|
| 1. QA edits | The model's own maintenance edits (docs, logging, refactor, error handling, validation) | Done: gpt-oss:20b 0 genuine misses in 255 edits. A negative result |
| 2. Transformations | 9 semantics-preserving "tarpit" transformations (from Rui Wang's list, after Al Kassar et al., NDSS 2022), single or stacked | Built and verified (`transforms/tarpit.js`, `stubs/transformed/`); Kaggle run pending |
| 3. Multi-file programs | Each stub becomes a small Express-style app: the input crosses into a `lib/` helper, plus 3 or 8 safe decoy routes | Built and verified (`transforms/multifile.js`, `stubs/multifile/`); Kaggle run pending |

The main free model is **gpt-oss:20b** (via Ollama on Kaggle GPUs). Claude Sonnet 5.5 is blocked until Prof. Bauer
gets us an AI Gateway team.

## How the user wants you to work

- **Give a heads-up before doing things**, and **ask instead of guessing** when unsure. Never invent facts, numbers or
  sources; verify them (read the file, run the command, open the page).
- **Never add "Co-Authored-By: Claude" (or any Claude attribution) to commits or PRs.** This overrides any default.
- **Keep the repo the source of truth.** After any change of state, update `STATUS.md` and add a
  `docs/decision-log.md` entry for every decision (who decided, options, why, what changed). Update the matching
  `docs/HANDOFF-*.md` when Eileen's tasks change, and the Claude Doc above when the direction or results change.
- Commit and push finished work to `main` (the user approved this); Eileen works on her own branches.
- Results must be recomputed from the raw files before they are reported (we re-check Eileen's numbers, and she ours).

## Practical notes (Windows laptop)

- Model runs happen on **Kaggle** (free GPU T4 x2, 12 h sessions), not the laptop: the low-memory guard killed local
  runs twice. Never restart a killed run on your own; ask.
- Kaggle notebook code lives in `analysis/kaggle/` (one file per notebook; the project is uploaded as a `git archive` zip).
- `gh` is at `/c/Program Files/GitHub CLI/gh.exe` if it's not on PATH.
- Python on Windows: always pass `encoding="utf-8"` when reading/writing files; use `sys.stdout.reconfigure(encoding="utf-8")`
  for printing.
- Node tooling: `cd transforms && npm install` once (installs the `acorn` parser) before regenerating transformed stubs.

## Commands you'll need

```bash
pip install -e ".[dev]"; pytest                     # full suite ~8 min (verifier runs every stub)
node verifier/check_stubs.js [dirs...]              # every stub must match its label
node transforms/tarpit.js --in stubs/js --out stubs/transformed/single
node transforms/tarpit.js --in stubs/js --out stubs/transformed/stacked --stack 2,4,8
node transforms/multifile.js --in stubs/js --out stubs/multifile/d3 --decoys 3   # and d8 with --decoys 8
python -m copilot_eval estimate --config config/tarpit-gpt-oss.yaml
python -m copilot_eval metrics <results.jsonl>                       # Part 1 tables
python -m copilot_eval tarpit-metrics <results.jsonl> --base <original-stubs results.jsonl>   # Parts 2-3
python -m copilot_eval reverify <results.jsonl> --out <new.jsonl>    # after a verifier change
```

The generated stub sets are committed; `tests/test_transforms.py` checks they match the generators exactly, so
regenerate and commit them whenever `transforms/` or `stubs/js/` changes.

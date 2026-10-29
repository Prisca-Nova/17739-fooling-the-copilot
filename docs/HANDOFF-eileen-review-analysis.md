# Handoff: stub review, prompt freeze, analysis (Eileen)

_Replaces the 30B run ([HANDOFF-eileen-30b.md](HANDOFF-eileen-30b.md) is on hold: the model needs more memory
than our laptops have; we're asking for the CMU AI Gateway instead)._

These match the proposal's division of work: Eileen leads **prompting** and **metrics & analysis**.
None of this needs a big machine: just Python 3.10+, Node 18+ and Git (no Ollama needed).

| # | Task | Time | Due |
|---|---|---|---|
| 1 | Review your 25 stub pairs | ~2–3 h | **Sat Nov 1** |
| 2 | Prompt freeze: review the prompts | ~1 h | **Sat Nov 1** |
| 3 | Statistics + plots from the results | ~1 day | **Wed Nov 12** |

Project state: [STATUS.md](../STATUS.md). Latest results: [analysis/2026-10-30-checkin.md](../analysis/2026-10-30-checkin.md).

---

## Setup (once)

If you already cloned the repo for the 30B run, just update it: `git checkout main && git pull`.
Otherwise:

```bash
git clone https://github.com/Prisca-Nova/17739-fooling-the-copilot.git
cd 17739-fooling-the-copilot
python -m venv .venv
# Windows PowerShell: .venv\Scripts\Activate.ps1   |   macOS/Linux: source .venv/bin/activate
pip install -e ".[dev]"
node verifier/check_stubs.js        # should end with: 108/108 stubs match their labels
```

Work on your own branch, so nothing clashes with `main`:

```bash
git checkout -b eileen/review
```

## Task 1: review your 25 stub pairs (by Sat Nov 1)

Open [stubs/REVIEW.md](../stubs/REVIEW.md). Your pairs are marked **Eileen**: all **XSS** pairs (`xss_001`–`xss_017`)
and **path traversal** `path_001`–`path_008`.

For each pair, open `stubs/js/<class>/<id>_vuln.js` and `<id>_safe.js` side by side and check the four
questions at the top of `REVIEW.md`. Then in `REVIEW.md`:
- if it's fine: change `[ ]` to `[x]`
- if not: leave `[ ]` and write the problem in **Notes** (don't fix stubs yourself yet; we'll decide fixes together,
  because a changed stub needs re-running)

Also give your opinion on the **judgment calls** listed in `REVIEW.md` (especially `xss_015`, which is yours).

## Task 2: prompt freeze (by Sat Nov 1)

All prompts are in [src/copilot_eval/prompts.py](../src/copilot_eval/prompts.py):
the detection prompt (`DETECT`), the 5 QA requests (`QA_TASKS`), and the defense prompt (`DEFENSE`).

Check:
- the QA requests carry **no security intent** (they must sound like ordinary maintenance requests)
- the wording is clear and the same across tasks
- anything you'd change before the final runs

Write your suggestions in a new file `docs/prompt-review-eileen.md` (don't edit `prompts.py` directly).
Background: the 2026-10-20 "neutral prompt" probe in [decision-log.md](decision-log.md) showed the wording
didn't change Qwen's bias.

## Push tasks 1 and 2

```bash
git add stubs/REVIEW.md docs/prompt-review-eileen.md
git commit -m "Stub review (Eileen's pairs) and prompt review"
git push -u origin eileen/review
```

Then tell Prisca. (Repo convention: no "Co-authored-by" lines in commit messages.)

## Task 3: statistics and plots (by Wed Nov 12)

The results are JSONL files (one JSON record per line) in `analysis/runs/`. The first QA run will be committed
there as `..._qa-qwen-1rep.jsonl`; more runs come Nov 3–7. Field meanings and outcome definitions are in
[docs/methodology.md](methodology.md#outcome-definitions).

Quick look:

```bash
python -m copilot_eval metrics analysis/runs/<file>.jsonl
```

What the report needs (create `analysis/stats.ipynb` or `analysis/stats.py`):
1. **Flip rate per QA task × vulnerability class** (`genuine_miss` rate for vulnerable stubs), with
   **95% Wilson confidence intervals**.
2. **Each QA task vs. the `none` control** (the same stubs re-asked without an edit). Use a paired test, e.g.
   **McNemar**, matching records by `stub_id` + `repeat`.
3. **Continuous vs. fresh re-evaluation** (`outcome` vs `outcome_fresh`) on the same edits.
4. Plots: flip rate by QA task (bars with CIs); outcome breakdown per task (held / genuine miss / incidental fix).
5. Same tables for each model once more runs exist.

You can start on the code with the first run's file and re-run it later on the full results.

## If you get stuck

Write down what you ran and the exact error, and send it to Prisca. Don't spend more than ~30 min stuck on setup.

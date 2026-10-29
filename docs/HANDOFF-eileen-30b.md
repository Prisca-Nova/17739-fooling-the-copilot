# Handoff: run the `qwen3-coder:30b` capability check (Eileen)

> **On hold (2026-10-29):** the 30B model needs more memory than our laptops have. Current tasks for Eileen:
> [HANDOFF-eileen-review-analysis.md](HANDOFF-eileen-review-analysis.md). We're asking for the CMU AI Gateway instead.

**Goal.** Find out whether a stronger free model can tell safe code from vulnerable code.
The 7B model we tested calls almost everything "vulnerable" (it gets only ~6% of safe stubs right),
which would make the main experiment uninformative. You'll run the bigger `qwen3-coder:30b` on a
fixed sample of 24 stubs, 3 times each (72 model calls, baseline only, no QA edits).
Background: [STATUS.md](../STATUS.md), [analysis/2026-10-20-baseline-qwen.md](../analysis/2026-10-20-baseline-qwen.md),
and the 2026-10-21 entry in [decision-log.md](decision-log.md).

**Time.** ~20–30 min of setup, a ~19 GB download, then the run itself (roughly 30 min to a few hours
depending on your machine). Nothing in this costs money.

---

## 0. Check your machine first

The 30B model needs **about 20 GB of free RAM** (more is better) and ~25 GB of free disk.

- **Windows:** Task Manager → Performance → Memory ("Available").
- **macOS:** Activity Monitor → Memory. A Mac with 32 GB+ of unified memory should be fine.
- **Linux:** `free -h` (look at "available").

If you have less than ~20 GB available even after closing other apps, stop here and tell Prisca;
we'll pick another plan.

## 1. Accept the GitHub invite

Check your email or https://github.com/notifications for the invite to
`Prisca-Nova/17739-fooling-the-copilot` and accept it.

## 2. Install the tools (skip any you already have)

| Tool | Version | Get it |
|---|---|---|
| Git | any recent | https://git-scm.com/downloads |
| Python | **3.10 or newer** | https://www.python.org/downloads/ (`python --version` to check) |
| Node.js | **18 or newer** | https://nodejs.org (`node --version` to check) |
| Ollama | latest | https://ollama.com/download |

After installing Ollama, make sure it's running: `ollama --version` should print a version,
and `ollama list` should not error.

## 3. Get the code

```bash
git clone https://github.com/Prisca-Nova/17739-fooling-the-copilot.git
cd 17739-fooling-the-copilot
git checkout -b eileen/qwen3-30b-baseline
```

You work on your **own branch** (`eileen/qwen3-30b-baseline`), so your push can't conflict with
anything on `main`. Prisca merges it afterwards.

## 4. Set up Python

```bash
python -m venv .venv
```

Activate it:

- Windows (PowerShell): `.venv\Scripts\Activate.ps1`
- Windows (Git Bash): `source .venv/Scripts/activate`
- macOS / Linux: `source .venv/bin/activate`

Then:

```bash
pip install -e ".[dev]"
```

## 5. Quick sanity check (~1 min)

```bash
node verifier/check_stubs.js
python -m pytest -q tests/test_parse.py tests/test_providers.py
python -m copilot_eval estimate --config config/sample-qwen3-30b.yaml
```

Expected:
- the first line ends with `108/108 stubs match their labels`
- the tests say `passed`
- the last line says `24 stubs, at most 72 model calls`

If any of these differ, stop and send Prisca the output.

## 6. Download the model (~19 GB)

```bash
ollama pull qwen3-coder:30b
```

When it finishes, `ollama list` should show `qwen3-coder:30b`.

## 7. Run the check

Close memory-heavy apps (browsers with many tabs, etc.), keep the laptop **plugged in and awake**, then:

```bash
python -m copilot_eval run --config config/sample-qwen3-30b.yaml
```

It prints one line per verdict, e.g. `[r0] cmdi_003_safe: baseline=SAFE`, 72 lines in total, then
`results written to results/<timestamp>_ollama_qwen3-coder-30b.jsonl`. **Note the time it took.**

**If it stops partway** (crash, sleep, out of memory): nothing is lost. Resume with the same file name:

```bash
python -m copilot_eval run --config config/sample-qwen3-30b.yaml --resume results/<that file>.jsonl
```

It skips everything already done and continues.

## 8. Look at the result

```bash
python -m copilot_eval metrics results/<that file>.jsonl
```

The "Baseline" table is what we need. For comparison, the 7B on the same 24 stubs got
**tp = 36, fn = 0, fp = 31, tn = 5**, so it called only 5 of 36 safe-stub verdicts safe. The 30B is
worth using if `tn` is much higher (roughly 18+ of 36) while `tp` stays high.

## 9. What to push

The `results/` folder is git-ignored, so copy the two result files into `analysis/runs/`:

```bash
mkdir -p analysis/runs
cp results/<that file>.jsonl analysis/runs/
cp results/<that file>.config.json analysis/runs/
```

(Windows PowerShell: `mkdir analysis\runs` and `copy` instead of `mkdir -p` and `cp`.)

Then create `analysis/runs/qwen3-30b-notes.md` with these lines filled in:

```markdown
# qwen3-coder:30b sample run (Eileen)
- Date:
- Machine (OS, CPU/GPU, RAM):
- Total run time:
- Interrupted / resumed? (yes/no, how):
- Baseline table (paste the output of step 8):
- Anything odd:
```

Commit and push **only those files**:

```bash
git add analysis/runs/
git status            # should list only the files in analysis/runs/
git commit -m "Add qwen3-coder:30b sample baseline results"
git push -u origin eileen/qwen3-30b-baseline
```

Then tell Prisca it's pushed. Please don't change other files on this branch; if you notice
something that should change, note it in `qwen3-30b-notes.md` instead.

**Repo convention:** commit messages should not contain "Co-authored-by" trailer lines.

---

## Troubleshooting

| Problem | What to do |
|---|---|
| `python` not found / wrong version | Try `python3` instead of `python` everywhere. |
| `node` not found | Install Node.js 18+ and open a new terminal. |
| `Connection refused ... 11434` | Ollama isn't running: start the Ollama app (or `ollama serve`). |
| Run is extremely slow (minutes per line) | The model doesn't fit in memory and is swapping. Stop it (Ctrl+C), close other apps, and resume (step 7). If it's still that slow, tell Prisca. |
| `pull` fails midway | Run `ollama pull qwen3-coder:30b` again; it resumes. |
| Anything else | Send Prisca the full error message and the command you ran. |

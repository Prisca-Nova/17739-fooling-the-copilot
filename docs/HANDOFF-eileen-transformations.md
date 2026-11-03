# Handoff: transformation + multi-file runs, notebooks A and B (Eileen)

_New after the Nov 2 check-in. Background: [decision-log.md](decision-log.md) (2026-11-03 entry) and [STATUS.md](../STATUS.md)._

**Short version:** run **both** Kaggle notebooks, A (original + single transformations, ~3,060 calls, ~8 h) and
B (stacked transformations + multi-file apps, ~1,530 calls, ~4.5 h), push the results files, then fold the
transformation results into the statistics (due Wed Nov 12). That's ~12.5 GPU hours in total: check your remaining
weekly Kaggle GPU quota first, and tell Prisca if it isn't enough.

| # | Task | Time | Due |
|---|---|---|---|
| 1a | Kaggle notebook A: gpt-oss on the 102 original stubs + 918 single-transformation stubs, × 3 repeats | ~15 min setup + ~8 h unattended | **start Nov 4** |
| 1b | Kaggle notebook B: gpt-oss on 306 stacked-transformation stubs + 204 multi-file apps, × 3 repeats | ~15 min setup + ~4.5 h unattended | **Nov 4–5** |
| 2 | Push the results (after each notebook) | 10 min | right after |
| 3 | Statistics + plots, now including the transformation tables | ~1 day | **Wed Nov 12** |

---

## What changed since Nov 2 (2-minute read)

- Prof. Bauer suggested **semantics-preserving program transformations** and **larger multi-file programs**.
- Prisca and Claude re-implemented Rui Wang's 9 most natural "tarpit" transformations (`transforms/tarpit.js`):
  arrow-function, computed-properties, nested-function, nullish-coalescing, object-create, simple-array,
  ternary, try-catch, weakref. Each one rewrites the expression that reaches the sink without changing behavior.
- Generated and **verified** (every vulnerable stub still exploitable, every safe one still safe):
  - `stubs/transformed/single/`: 918 stubs (102 × 9 transformations), **notebook A**
  - `stubs/transformed/stacked/`: 306 stubs (102 × 2, 4 or 8 transformations combined), **notebook B**
- **Larger, multi-file programs** (`transforms/multifile.js`): each stub becomes a small Express-style app. The route reads
  the input, a helper in `lib/` (another file) builds the value that reaches the sink, and 3 or 8 realistic, verified-safe
  unrelated routes are added (`transforms/decoys/`). The model sees all files in one prompt, each with a `// File:` header.
  - `stubs/multifile/d3/`: 102 apps, ~77 lines in 6 files · `stubs/multifile/d8/`: 102 apps, ~147 lines in 11 files
    (the original stubs are ~11 lines). All 204 verified through the cross-file flow. **Notebook B**.
- **Sampling now uses gpt-oss's own recommendation** (temperature 1.0, top_p 1.0), which fixes the Nov 2 inconsistency.
  It's already set in `config/tarpit-gpt-oss.yaml`; don't change it.
- Look at two examples first: `stubs/transformed/stacked/cmdi/cmdi_003_vuln__k4.js` (its `.meta.json` lists the
  transformations) and `stubs/multifile/d3/cmdi/cmdi_012_vuln__mf3.js` (the whole app as the model sees it; the real
  files are in the folder next to it).

## Task 1: Kaggle notebooks A and B

Same setup as your gpt-oss notebooks (GPU **T4 x2**, **Internet On**). Both notebooks use the same code; only the
`PARTS` line differs. **Start A first** (it's the longest, and it gives the reference numbers B is compared with). If
Kaggle lets you start B at the same time, do; otherwise start B when A finishes.

| Notebook | `PARTS` line (line 8) | Verifier line | `estimate` line(s) |
|---|---|---|---|
| A | `PARTS = ["original", "single"]` (already the default) | `1428/1428 stubs match their labels` | `102 stubs, at most 306 model calls`, `918 stubs, at most 2754 model calls` |
| B | `PARTS = ["stacked", "multifile"]` | `1428/1428 stubs match their labels` | `306 stubs, at most 918 model calls`, `204 stubs, at most 612 model calls` |

For each notebook:

1. Update and zip the project:
   ```bash
   git checkout main && git pull
   git archive --format=zip -o ftc-main.zip main
   ```
2. On Kaggle: upload `ftc-main.zip` as a **new version** of your private project dataset (or a new dataset), and attach it to a new notebook.
3. Paste the code from [analysis/kaggle/tarpit_run.py](../analysis/kaggle/tarpit_run.py) into **one cell**, and set line 8
   as in the table above (A: leave it; B: `PARTS = ["stacked", "multifile"]`). (Step 1–2 only once: both notebooks can use the same dataset version.)
4. **Save Version → Save & Run All (Commit)**, so it runs in the background.
5. Check the log against the table above (verifier line and `estimate` lines).
6. When it's done, download **`tarpit-results.zip`** from the notebook's Output tab (rename it `notebook-a.zip` / `notebook-b.zip` so they don't overwrite each other).

If it stops early (timeout or error), resume in a new session with the same code, replacing the run line with
`python -m copilot_eval run --config config/tarpit-gpt-oss-<part>.yaml --resume results/<the .jsonl file>`,
where `<part>` is `original`, `single`, `stacked` or `multifile`. Only resume the part that stopped, then run the parts after it normally.
A is the one most likely to hit the 11 h stop.
Finished steps are skipped.

## Task 2: push the results

After each notebook, unzip into `analysis/runs/` (keep each `.jsonl` and its `.config.json`), then:

```bash
git checkout -b eileen/tarpit-runs      # first time only; afterwards: git checkout eileen/tarpit-runs
git add analysis/runs/
git commit -m "Notebook A results: original + single transformations (gpt-oss:20b)"   # or "Notebook B results: ..."
git push -u origin eileen/tarpit-runs
```

Also add a short `analysis/runs/notebook-a-notes.md` / `notebook-b-notes.md`: the run time, any errors, and anything odd.
Then tell Prisca. (Repo convention: no "Co-authored-by" lines in commit messages.)

Quick look at the results (the `--base` column needs notebook A's results file for the original stubs, `stubs/js`):

```bash
python -m copilot_eval tarpit-metrics analysis/runs/<your file>.jsonl
python -m copilot_eval tarpit-metrics analysis/runs/<your file>.jsonl --base analysis/runs/<notebook A's original-stubs file>.jsonl
```

## Task 3: statistics and plots (by Wed Nov 12)

The earlier list in [HANDOFF-eileen-review-analysis.md](HANDOFF-eileen-review-analysis.md#task-3-statistics-and-plots-by-wed-nov-12)
still holds for **Part 1 (QA edits)**. Add **Part 2 (transformations)**:

1. **Detection rate per transformation** (9 single + original) for vulnerable and safe stubs, with 95% Wilson CIs.
   `tarpit-metrics` already computes these; `copilot_eval.metrics.transform_table` gives them as Python rows.
2. **Paired misses:** transformed vulnerable stubs called SAFE whose **original** was flagged in all 3 repeats
   (`miss_given_base_flagged`). This is the headline number: misses *caused* by the transformation.
3. **Dose-response:** miss rate vs. the number of stacked transformations (0 = original, 1 = single, 2, 4, 8).
   Same for **program size**: original (~11 lines) vs. `mf3` (~77) vs. `mf8` (~147). Safe-stub false alarms too:
   more code may also mean more (wrong) suspicion.
4. **By vulnerability class** (xss / cmdi / path): the stub id prefix gives it.
5. **Safe stubs:** do transformations change the false-alarm rate? (Does odd-looking code look more suspicious?)
6. Plots: detection rate by transformation (bars with CIs); miss rate vs. number of transformations (line).

How to read a stub id: `cmdi_003_vuln__ternary` = base stub `cmdi_003_vuln` + transformation `ternary`;
`__k4` = 4 stacked transformations (listed in the `.meta.json`); `__mf3` / `__mf8` = multi-file app with 3 / 8 decoy routes.

## If you get stuck

Write down what you ran and the exact error, and send it to Prisca. Don't spend more than ~30 min stuck on setup.

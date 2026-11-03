# Handoff: transformation + multi-file run, notebook B (Eileen)

_New after the Nov 2 check-in. Background: [decision-log.md](decision-log.md) (2026-11-03 entry) and [STATUS.md](../STATUS.md)._

**Short version:** run notebook B on Kaggle (stacked transformations + multi-file apps, ~1,530 calls, ~4.5 h), push the results files,
then fold the transformation results into the statistics (due Wed Nov 12). Prisca runs notebook A in parallel.

| # | Task | Time | Due |
|---|---|---|---|
| 1 | Kaggle notebook B: gpt-oss on 306 stacked-transformation stubs + 204 multi-file apps, × 3 repeats | ~15 min setup + ~4.5 h unattended | **as soon as possible (Nov 4)** |
| 2 | Push the results | 10 min | right after |
| 3 | Statistics + plots, now including the transformation tables | ~1 day | **Wed Nov 12** |

---

## What changed since Nov 2 (2-minute read)

- Prof. Bauer suggested **semantics-preserving program transformations** and **larger multi-file programs**.
- Prisca and Claude re-implemented Rui Wang's 9 most natural "tarpit" transformations (`transforms/tarpit.js`):
  arrow-function, computed-properties, nested-function, nullish-coalescing, object-create, simple-array,
  ternary, try-catch, weakref. Each one rewrites the expression that reaches the sink without changing behavior.
- Generated and **verified** (every vulnerable stub still exploitable, every safe one still safe):
  - `stubs/transformed/single/`: 918 stubs (102 × 9 transformations), run by **Prisca, notebook A**
  - `stubs/transformed/stacked/`: 306 stubs (102 × 2, 4 or 8 transformations combined), run by **you, notebook B**
- **Larger, multi-file programs** (`transforms/multifile.js`): each stub becomes a small Express-style app. The route reads
  the input, a helper in `lib/` (another file) builds the value that reaches the sink, and 3 or 8 realistic, verified-safe
  unrelated routes are added (`transforms/decoys/`). The model sees all files in one prompt, each with a `// File:` header.
  - `stubs/multifile/d3/`: 102 apps, ~77 lines in 6 files · `stubs/multifile/d8/`: 102 apps, ~147 lines in 11 files
    (the original stubs are ~11 lines). All 204 verified through the cross-file flow. Run by **you, notebook B**.
- **Sampling now uses gpt-oss's own recommendation** (temperature 1.0, top_p 1.0), which fixes the Nov 2 inconsistency.
  It's already set in `config/tarpit-gpt-oss.yaml`; don't change it.
- Look at two examples first: `stubs/transformed/stacked/cmdi/cmdi_003_vuln__k4.js` (its `.meta.json` lists the
  transformations) and `stubs/multifile/d3/cmdi/cmdi_012_vuln__mf3.js` (the whole app as the model sees it; the real
  files are in the folder next to it).

## Task 1: Kaggle notebook B

Same setup as your gpt-oss notebooks (GPU **T4 x2**, **Internet On**).

1. Update and zip the project:
   ```bash
   git checkout main && git pull
   git archive --format=zip -o ftc-main.zip main
   ```
2. On Kaggle: upload `ftc-main.zip` as a **new version** of your private project dataset (or a new dataset), and attach it to a new notebook.
3. Paste the code from [analysis/kaggle/tarpit_run.py](../analysis/kaggle/tarpit_run.py) into **one cell**, and change line 8 to:
   ```python
   PARTS = ["stacked", "multifile"]
   ```
4. **Save Version → Save & Run All (Commit)**, so it runs in the background.
5. Checks while it runs (in the log):
   - the verifier line should say `1428/1428 stubs match their labels`
   - the two `estimate` lines should say `306 stubs, at most 918 model calls` and `204 stubs, at most 612 model calls`
6. When it's done, download **`tarpit-results.zip`** from the notebook's Output tab.

If it stops early (timeout or error), resume in a new session with the same code, replacing the run line with
`python -m copilot_eval run --config config/tarpit-gpt-oss-<stacked or multifile>.yaml --resume results/<the .jsonl file>`.
(Only resume the part that stopped; if `stacked` finished, run just `multifile`.)
Finished steps are skipped.

## Task 2: push the results

Unzip into `analysis/runs/` (keep the `.jsonl` and its `.config.json`), then:

```bash
git checkout -b eileen/tarpit-stacked
git add analysis/runs/
git commit -m "Notebook B results: stacked transformations + multi-file apps (gpt-oss:20b)"
git push -u origin eileen/tarpit-stacked
```

Also note in a short `analysis/runs/notebook-b-notes.md`: the run time, any errors, and anything odd.
Then tell Prisca. (Repo convention: no "Co-authored-by" lines in commit messages.)

Quick look at your results (works before notebook A finishes; the `--base` column needs A's `stubs/js` results file):

```bash
python -m copilot_eval tarpit-metrics analysis/runs/<your file>.jsonl
python -m copilot_eval tarpit-metrics analysis/runs/<your file>.jsonl --base analysis/runs/<A's original-stubs file>.jsonl
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

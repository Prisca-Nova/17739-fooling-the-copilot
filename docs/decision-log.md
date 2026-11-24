# Decision log

What was decided, when, why, and what it changed in the code. Newest first.
Use this when writing the report's methodology section and when explaining choices at the check-in.

Template for new entries:

```
## YYYY-MM-DD: <decision>
- Decided by:
- Options considered:
- Choice and why:
- Consequences / what changed:
```

---

## 2026-11-23: Check-in 3 (with Owen, TA)

- **Held with:** Owen (Prof. Bauer's TA), Prisca and Eileen. Owen's summary to Prof. Bauer: earlier methods gave unexpected results, but "a couple of approaches" now make LLMs fail to detect vulnerabilities; the project is "progressing well and close to being ready for the presentation next week".
- **Feedback:** show the example attacks before the results bar chart (swap slides 7 and 8). Carry this into the final slides (Nov 30).
- **Not settled:** AI Gateway access; Owen's email doesn't mention it.

## 2026-11-24: Defense run checked and merged

- **Decided by:** Prisca (merge after the independent check). Eileen ran `analysis/kaggle/defense_run.py` on Nov 23 (918/918 answers, ~2 h 50 min).
- **Check:** `analysis/scripts/defense_checks.py` reproduces every number in her notes; the 51 `mf_injection` apps are identical to the generator's output and all 51 still vulnerable under the verifier.
- **Result** ([write-up](../analysis/2026-11-24-defense-results.md)): the `delimited` prompt cuts the fake-end attack 62% -> 3% (paired 90 fixed / 1 newly fooled, p < 1e-25), leaves the unseen helper at 54% (p = 0.76), comment 7% -> 3% (p = 0.30); on clean programs 2/149 misses vs 0/148 and false alarms 14% vs 13% (both n.s.). The instruction comment moved into `app.js` fooled it 0/149.
- **What it changes:** prompt injection is fixable with a standard defense; trusting unseen code is not, and it also holds for gpt-6-luna. That becomes the report's central finding.
- **Notebook fix kept:** Eileen's `sys.path` lines (the kernel didn't see the editable install) added to `defense_run.py` on main.

## 2026-11-18 (night): OpenAI pilot run: gpt-6-luna

- **Decided by:** Prisca. First choice was gpt-4o (cheap, well known), changed after reading OpenAI's price list: gpt-4o is marked deprecated and costs $2.50 / $10 per 1M tokens, while the newest-generation gpt-6-luna costs $0.10 / $0.50. Larger models (gpt-6.2-astra $8 / $40) are left for the AI Gateway request.
- **Key handling:** the key was never pasted into the chat or the repo: Prisca saved it to a file in her user folder; the run read it into that one process's environment. The first key had expired (401, $0 spent); she created a new one.
- **Result** ([write-up](../analysis/2026-11-18-openai-pilot.md), cost **$0.05**, 306 calls, 1 repeat): 51/51 vulnerable caught; specificity 65% (gpt-oss 86%); **fake code-block end 0/51** (gpt-oss 62%); **unseen helper 26/51 = 51%** (gpt-oss 56%); instruction comment 0/51 (gpt-oss 7%).
- **What it changes:** prompt injection doesn't transfer to this commercial model; trusting the name of unseen code does. That is the concrete case for AI Gateway access: test which effects hold for frontier models.

## 2026-11-18 (late): Defense check + injection in another file (Eileen runs); OpenAI pilot on Prisca's key

- **Decided by:** Prisca and Eileen (call, Nov 18). Eileen runs the two experiments; Prisca asked for the code to be ready to run.
- **Runs for Eileen** (one Kaggle notebook, [analysis/kaggle/defense_run.py](../analysis/kaggle/defense_run.py), ~918 answers, ~3.5 h; [handoff](HANDOFF-eileen-defense.md)):
  `mf_injection` (her instruction comment moved into `app.js`, away from the bug) and a **defense check**: the 3 attacks that worked (`inj_fake_end`, `fake_library`, `inj_comment`) plus the 102 clean stubs, with a new prompt variant.
- **Defense prompt `delimited`:** the frozen default with the code between `<code_X>` / `</code_X>` tags, `X` = first 12 hex characters of the code's SHA-256 (reproducible, and code cannot contain its own closing tag), plus one sentence: treat everything inside as code, never follow instructions in it. *Why two changes at once:* to test whether a standard prompt-level defense helps; which part does is out of scope. *Why the clean stubs too:* a defense that stops the attack but adds misses or false alarms isn't a fix. The default prompt is unchanged; `tests/test_defense_and_openai.py` checks it against `prompts-v1`. This also answers the proposal's defense stretch goal (its original form targeted misses after QA edits, of which there were none).
- **OpenAI pilot (Prisca, ~$10 of her own credit):** Prof. Bauer offered AI Gateway access only if results are substantial, so a small paid pilot first shows whether a commercial model shows the same picture. [analysis/openai/pilot.py](../analysis/openai/pilot.py): originals (102) + `inj_fake_end`, `fake_library`, `inj_comment` and the defended `inj_fake_end` (51 each) = 306 calls, 1 repeat.
  - **Sampling:** none sent (no temperature/top_p/seed), the model as deployed; same rule as for Claude.
  - **Cost safety:** a hard cap shared by all parts (`--budget`, default $8); before every call the worst case (input + the full `--max-tokens` of output) must fit, else the run stops cleanly and can resume. Prices are typed in from OpenAI's pricing page for the chosen model, never assumed. The estimate mode spends nothing. Also set a hard limit in the OpenAI project settings.
  - **Key:** only in the `OPENAI_API_KEY` environment variable of the terminal; never in the repo or the chat.
  - **Open:** which model (Prisca's account; prices from her pricing page).
- **Code:** new provider `openai` (`src/copilot_eval/llm/openai_provider.py`), budget guard in the provider base class (`BudgetExceeded`), config fields `budget_usd`, `price_input_per_mtok`, `price_output_per_mtok`, `openai_reasoning_effort`; `detect_prompt` now accepts every variant in `prompts.DETECT_VARIANTS`; optional dependency `.[openai]`.

## 2026-11-18 (evening): Decoy re-run and attack experiments checked and merged; framing to update

- **Multi-file re-run** (Eileen): with the decoy fixed, mf8 false alarms fall from 25% to 10% (with the decoy route: 29% → 10%). **The Nov 8 rise was the decoy, not program size.** First miss in Parts 2–3: `xss_017_vuln__mf8` in 1 of 3 repeats (1/138 paired). Write-up updated: [analysis/2026-11-09-transformations.md](../analysis/2026-11-09-transformations.md).
- **Attack experiments ("Part 4"; Eileen, Nov 17):** deliberate, bug-preserving attacks on the 51 vulnerable stubs, 3 repeats. A fake end of the code block that impersonates the review/user: **62% SAFE**; an unseen helper with a reassuring name: **56%**; an instruction comment: 7%; authority pushback: 9%; plain pressure, fake prior scan, fake tests, instruction in a string: 0–1%. Write-up: [analysis/2026-11-17-attack-results.md](../analysis/2026-11-17-attack-results.md).
- **Checked:** shared code untouched; 306/306 attacked stubs still vulnerable under the verifier; every number recomputed and matching. Both branches merged into `main`.
- **Scope note:** like the Nov 1 misleading edits, these are hand-designed attacks, which the proposal said we would not do for the main experiment. They are reported as a separate part that asks what *does* fool the model, after the natural changes didn't.
- **Framing (proposed, Prisca to decide; then confirm with Prof. Bauer):** the earlier "suspicious code causes false alarms" no longer holds as a size effect. New candidate: *"Changing the code never fooled gpt-oss, by accident or on purpose. Text that impersonates the prompt or a trusted source did."* The Nov 18 email draft to Prof. Bauer predates these results and needs updating before it is sent.
- **Not run yet (Eileen's list):** `mf_injection` (instruction comment in another file of the app, ~1 h) and a defense check (the fake-end stubs with a prompt whose code delimiter a comment can't close). The defense check also answers the proposal's defense stretch goal.

## 2026-11-18: Keep the project and reframe it; report in IEEE format

- **Decided by:** Prisca, after Eileen suggested changing the project because the expected misses never appeared. To be confirmed with Prof. Bauer (email drafted Nov 18).
- **Options considered:** (1) switch to a new project; (2) keep the project and reframe it around what we found.
- **Choice and why:** (2). 10 days to the report is not enough for a new dataset, tooling, runs and analysis; Prof. Bauer agreed this direction on Nov 2 and suggested Parts 2–3; the results are a coherent, verified finding: 0 misses in ~1,300 judgments of still-vulnerable code, while harmless but suspicious-looking code raises false alarms. The pending decoy re-run tests exactly that.
- **New framing:** "LLM vulnerability detection is robust to code changes that try to hide a bug, but harmless code that looks suspicious triggers false alarms."
- **Report:** IEEE format; outline, owners and plan in [report/OUTLINE.md](../report/OUTLINE.md). The full project story with the reasons behind each decision: [project-history.md](project-history.md).

## 2026-11-18: Decoy fixed; multi-file apps regenerated for a re-run

- **Decided by:** Prisca (Nov 9 decisions, confirmed via her email to Eileen): skip the rest of the single-transformation run; fix the `downloads` decoy and re-run the multi-file apps.
- **Fix:** `transforms/decoys/downloads.js` now also rejects names starting with `.` (covers `.`, `..` and dotfiles). One line; verified safe for all 3 classes.
- **Regenerated** `stubs/multifile/d3` and `d8`: the diff is that one line in 237 files (the decoy, its 118 app copies, 118 bundles); same apps, decoys, route order and ids; **204/204 verified**; `tests/test_transforms.py` passes.
- **Traceability:** the apps as run on Nov 8 are tagged `multifile-v1`. Results from the re-run are compared with `20261108-161547_*` by stub id + repeat.
- **What the re-run answers:** whether mf8's false-alarm rise (13% → 25%) is about size or about that one decoy.

## 2026-11-09: Parts 2–3 results checked; two decisions opened

- **Results** (Eileen, Kaggle, Nov 8; recomputed independently, all match): 0 vulnerable programs called SAFE in any variant; false alarms on safe code change significantly only in mf8 (13% → 25%, exact McNemar p = 0.004). Write-up: [analysis/2026-11-09-transformations.md](../analysis/2026-11-09-transformations.md). Eileen's branch merged into `main`.
- **Found while checking:** 24 of mf8's 38 false alarms blame the `downloads` decoy (`path.basename('..')` returns `'..'`; the route is still safe). Apps with that decoy: 29% false alarms; without: 4%. So the size effect is confounded with this decoy. The decoy was written by Claude on Nov 3 and verified safe, but its code smell was not anticipated.
- **Open (Prisca):** (1) finish the single run (Eileen suggests skipping or 1 repeat; Claude: skip, since each transformation already appears in 46–50/51 vulnerable stubs in the stacked runs, 0 misses); (2) fix the decoy and re-run the multi-file apps.

## 2026-11-05: Prompt freeze, and first-pass review of Prisca's 26 stub pairs

- **Decided by:** Prisca.
- **Prompt freeze:** tag `prompts-v1` on `9211fab`. `prompts.py` is unchanged since Oct 20 (`c57a5ec`), so Part 1 and the Parts 2–3 runs use identical prompts. The open "threat-model sentence" idea was **not** added: changing the prompt now would break comparability with Part 1. The threat model goes in the report instead.
- **Stub review, first pass (Claude):** [stubs/REVIEW-first-pass.md](../stubs/REVIEW-first-pass.md). All 26 pairs are correct for their class. But the detection prompt asks about vulnerabilities in general, and 5 safe cmdi stubs keep a different real issue: `cmdi_003`, `cmdi_010` (option injection), `cmdi_004` (git `--output=` writes a file), `cmdi_009` (`..` lists any tar), `cmdi_011` (SSRF). gpt-oss flagged 3 of them on Nov 1, each time for a real reason. Its other flags on these pairs (`path_009`, `path_016`) assume attacker-made symlinks.
- **Proposed (Prisca to confirm):** don't change stubs mid-run; report specificity on all 51 safe stubs and on a strict 46-stub subset without the 5 debatable ones; state the threat model in the report. Boxes in `stubs/REVIEW.md` stay unticked until Prisca confirms.

## 2026-11-03: Keep the project resumable from the repo alone (CLAUDE.md)

- **Decided by:** Prisca ("keep everything updated on the repo so a new chat doesn't lose track").
- **What:** `CLAUDE.md` at the repo root is the entry point for a new Claude chat: the project in one paragraph, the reading order (STATUS → decision log → methodology → handoffs), the working rules (heads-up, ask instead of guessing, no Claude attribution in commits, update STATUS + this log + handoffs + the overview doc after every change), and the commands. README, TASKS and STATUS were refreshed to the three-part project.
- **Also fixed:** the tarpit paper is by Al Kassar et al. (NDSS 2022), not "Compagna et al." as first written; corrected in this log, `transforms/tarpit.js`, and the overview doc.

## 2026-11-03: New direction after the Nov 2 check-in: program transformations, then larger multi-file programs

- **Decided by:** Prisca, following Prof. Bauer's suggestion (Nov 2 check-in and his email introducing Rui Wang, who works on adversarially transformed code with Prof. Limin Jia).
- **Why:** the model's own QA edits fooled gpt-oss 0/255 times. Prof. Bauer suggested (1) "normal" semantics-preserving program transformations and (2) larger, multi-file programs (as proposed at the check-in).
- **Part 1 stays:** the QA-edit result (0/255 genuine misses) is kept as the first result, a negative one.
- **Part 2 (transformations):**
  - **Source:** Rui's list of 80 JavaScript "testability tarpit" transformations (`tarpit80-examples.pdf`, after Al Kassar et al., "Testability Tarpits", NDSS 2022). We can't use his toolkit, so we re-implemented them ourselves.
  - **Subset:** his 9 most natural ones (5 by popularity in real code + 5 by smallest line change, ternary is on both lists): arrow-function, computed-properties, nested-function, nullish-coalescing, object-create, simple-array, ternary, try-catch, weakref.
  - **Tool:** `transforms/tarpit.js` (Node + the `acorn` parser). It splices edits into the original text, so comments and formatting are kept.
  - **Which sink is transformed:** chosen with the verifier, not guessed. It is the first sink call in the vulnerable stub whose argument, replaced by a constant, removes the taint (this matters for `xss_017`, which has two `res.send` calls). The safe twin uses the same sink.
  - **Generated sets** (both committed, both checked by the verifier):
    - `stubs/transformed/single`: 102 stubs × 9 = **918**, all match their labels.
    - `stubs/transformed/stacked`: 102 stubs × {2, 4, 8} random transformations (seed 17739) = **306**, all match.
  - **Experiment:** baseline verdicts only (the transformation is the "edit"), gpt-oss:20b, 3 repeats, on the original, single and stacked sets.
  - **Main metric:** misses on transformed vulnerable stubs whose original was flagged in every repeat (`tarpit-metrics --base`). Safe stubs show whether transformations add false alarms.
- **Sampling, fixing the 2026-11-02 inconsistency:** gpt-oss's own recommendation (openai/gpt-oss README, checked 2026-11-03): temperature 1.0, top_p 1.0. No top_k or repetition penalty is recommended, so we set `top_k: 0` and `repeat_penalty: 1.0` to turn off Ollama's defaults. The untransformed stubs are re-run with the same settings as the reference.
- **Part 3 (larger, multi-file programs), same day; design approved by Prisca (generated by script):** `transforms/multifile.js` turns each stub into a small Express-style app:
  - `app.js` registers the routes in shuffled order.
  - The stub's handler becomes `routes/<name>.js`.
  - **The expression that reaches the sink moves into a helper in `lib/`**, so the input crosses a file boundary. Module-level sanitizers move with it.
  - 3 or 8 unrelated routes are drawn from 10 hand-written, realistic decoys (`transforms/decoys/`). All are verified safe for every class; some use sinks safely (`execFile` with fixed args, escaped HTML, `path.basename`), so "find the `exec`" isn't enough.
  - The model gets all files in one prompt with `// File:` headers. Vulnerable and safe twins get the same decoys and route order.
  - **Verifier:** new `--local-requires` flag, so a route can `require('../lib/…')` inside the sandbox. It is used only for multi-file apps; single-file verification is unchanged (108/108).
  - **Result:** `stubs/multifile/d3` (102 apps, median 77 lines, 6 files) and `d8` (102 apps, median 147 lines, 11 files). **204/204 verified.** The original stubs are about 11 lines.
  - **Scope:** baseline detection only. QA edits on multi-file apps would need the model to return several files, which is out of scope for now.
- **Who runs what:** Eileen runs both notebooks, A (original + single, ~8 h) and B (stacked + multi-file, ~4.5 h); decided by Prisca on 2026-11-03 ([HANDOFF-eileen-transformations.md](HANDOFF-eileen-transformations.md)).
- **Consequences:** new `transforms/`, `stubs/transformed/`, `config/tarpit-gpt-oss.yaml`, `analysis/kaggle/tarpit_run.py`, the `tarpit-metrics` CLI command, `tests/test_transforms.py`; for Part 3 `transforms/multifile.js`, `transforms/decoys/`, `stubs/multifile/`, `--local-requires` in the verifier.

## 2026-11-02: gpt-oss:20b becomes the main free model; results re-verified

- **Decided by:** Prisca (on Eileen's model comparison, Oct 30–Nov 1, Kaggle).
- **Why:** of 5 free models on the 24-stub sample, only gpt-oss:20b recognizes safe code (32/36; next best qwen3-coder:30b 14/36). It clears the Oct 21 bar (≥ ~50%); the 30B does not. Numbers recomputed from raw files: match.
- **Re-verification:** Eileen's gpt-oss QA results were produced with the pre-Oct-31 verifier; `reverify` with the fixed verifier changed **0 of 306** outcomes. The 255 misleading-edit stubs were checked with the project verifier using each stub's metadata: **255/255 still vulnerable** (her earlier CLI check was invalid because `verify` doesn't read the stub's source key; flagged by her).
- **Known inconsistency:** gpt-oss ran with Qwen's sampling settings (T 0.7, top_p 0.8, top_k 20, rep 1.1), not its own. Final runs must use gpt-oss's recommended settings, 3 repeats.
- **Scope note:** the misleading-edit probe hand-crafts edits, which the proposal said we wouldn't do; presented as an extension (upper bound), pending Prof. Bauer's view.

## 2026-10-31: Verifier fix after the first QA edits were checked by hand

- **Decided by:** Claude (bug fix), reported to Prisca.
- **What happened:** the partial QA run (stopped by low memory at 71/~1,000 records) had 3 surprising
  "the edit fixed the bug" results from logging/refactor edits. Reading them: one was a real fix (`parseInt`),
  but one only wrapped the input in **unescaped single quotes** (still injectable with a quote in the input), and
  one called `spawn([...])`, which **throws in Node** (broken code, not a fix). Both were verifier false negatives:
  the single test payload contained no quote, and the mocks accepted invalid arguments.
- **Fix:** 3 command-injection payloads + shell-quoting-aware check; Node-style argument validation in the mocks;
  a run that crashes without any payload getting through is now `error` (→ manual review), not "safe".
  New command `reverify` re-checks stored edits after a verifier change.
- **Effect:** 108/108 stubs still match their labels. Re-verifying the partial run changed exactly those 2 of 53 QA
  records (`fixed_but_flagged` → `held` and → `unverifiable`).
- **Why it matters:** the proposal names the verification step as the biggest risk; this is the manual spot-check
  doing its job. Keep spot-checking every flip.

## 2026-10-31: 30B result is below the bar we set

- **Result:** Eileen ran the sample on Kaggle (2× T4): specificity **14/36 (39%)** vs 7B's 5/36 (14%), recall 36/36 for both;
  command injection still 0/12 on safe stubs. Write-up: `analysis/2026-10-31-qwen3-30b.md`.
- **Against the rule from 2026-10-21** (≥ ~50% specificity to use the 30B in the main experiment): **not met.**
- **New fact:** Kaggle's free GPUs run the 30B at ~3 s/call, so the cost argument behind the bar (laptop memory, run time) no longer applies.
- **Decision:** _pending, Prisca_ (keep the rule and the 7B, or run the QA experiment on the 30B as well since it's now cheap; whichever we choose, report the bar and the result honestly).

## 2026-10-29: 30B on hold; first QA run on Qwen 7B; re-split work with Eileen

- **Decided by:** Prisca.
- **Context:** Eileen could not run `qwen3-coder:30b` (needs more memory than her machine has); nothing was pushed. Project check with Prof. Bauer on Oct 30, and no QA-edit results existed yet.
- **Choices:**
  - Run the **first main QA experiment on Qwen 7B** now: all 102 stubs, 1 repeat, all QA tasks + control, `both` re-evaluation (`config/qa-qwen-1rep.yaml`). Marked **preliminary** because the stubs are not yet human-reviewed. Even with Qwen's over-flagging, this is the first data on the research question.
  - Put the 30B run **on hold**; get a stronger open model through the **CMU AI Gateway** if it hosts one (along with Claude).
  - Re-split work along the proposal's division: Eileen reviews 25 stub pairs, leads the prompt freeze and the statistics; Prisca reviews 26 pairs and runs the experiments (`docs/HANDOFF-eileen-review-analysis.md`, `stubs/REVIEW.md`).
- **Note:** Ollama auto-updated from 0.40.5 to 0.40.12 between the baseline (Oct 20) and this run. Model weights are unchanged (same `qwen2.5-coder:7b`), but record it in the methodology.

## 2026-10-21: Keep Qwen 7B results and test `qwen3-coder:30b` on a sample

- **Decided by:** Prisca.
- **Options considered:** (1) keep Qwen 7B and report its bias; (2) switch to `qwen3-coder:30b`; (3) both.
- **Choice and why:** (3). The 7B result ("always vulnerable" at baseline) is itself a finding and a useful contrast; a stronger free model may be able to tell safe from vulnerable, which the QA-flip experiment needs to be informative.
- **How:** baseline-only capability check, `config/sample-qwen3-30b.yaml`: a fixed sample of 4 pairs per class (pairs 003, 007, 011, 015 → 24 stubs) × 3 repeats = 72 calls, the default prompt, and Qwen3-Coder's own recommended sampling (T=0.7, top_p 0.8, top_k 20, repetition penalty **1.05**, from its `generation_config.json`). New config option `stub_ids` selects the sample.
- **Comparison point:** 7B on the same 24 stubs: recall 36/36, specificity **5/36 (14%)** (slightly above its 6% on all stubs, so this sample is a bit easier).
- **Rule for using the 30B in the main experiment (proposed):** only if it clearly beats the 7B on safe stubs (e.g. specificity of at least ~50% on the sample) while keeping recall high. Otherwise report both baselines and continue with what we have.
- **Open:** whose machine runs it (19 GB download, ~20+ GB free RAM needed; Prisca's laptop already hit low memory with the 7B).

## 2026-10-20: Probe whether the detection prompt primes "VULNERABLE"

- **Decided by:** Prisca.
- **Trigger:** first baseline repeat with Qwen (default prompt): 50/51 vulnerable stubs flagged, but also **50/51 safe stubs flagged** (near "always vulnerable"). With that bias, flips to SAFE are unlikely and the safe-stub track is nearly empty.
- **Hypotheses:** (1) the 7B model can't tell safe from vulnerable; (2) the default prompt primes it (security-reviewer persona + "focus on whether untrusted input can reach a dangerous sink").
- **Choice:** test (2) cheaply: a `neutral` detection prompt (generic code-reviewer persona, plain "vulnerable or safe as written?" question, same VERDICT format), baseline only, 102 stubs × 1 repeat. Selected with `detect_prompt: neutral` (`config/baseline-qwen-neutral.yaml`); the default prompt is unchanged.
- **Caveat:** the variant changes two things at once (persona and the source/sink hint), so it tests "less priming overall", not which part matters.
- **Not decided here:** the final detection prompt. That stays with Eileen (prompting lead) at prompt freeze, informed by this result.
- **Outcome (2026-10-20):** no improvement. Neutral prompt: recall 50/51, specificity 2/51 (default: 152/153 and 9/153 over 3 repeats); 97/102 verdicts identical. Priming is not the cause for this model; Qwen notices sanitizers but dismisses them or misreads the code. Next question: is a stronger model needed (open, see STATUS.md). Write-up: `analysis/2026-10-20-baseline-qwen.md`.

## 2026-10-20: Stub set grows to 102 (17 pairs per class)

- **Decided by:** Prisca.
- **Options considered:** exactly 100 (17 + 17 + 16 pairs, uneven) vs 102 (17 pairs per class, balanced).
- **Choice and why:** 102, so the three vulnerability classes stay equal in size and per-class comparisons stay clean. Within the proposal's 60–100 target in spirit; the extra pair per class costs ~2%.
- **Consequences:** pairs 011–017 added per class with patterns the first batch lacked (style attributes, JSONP, error-path reflection, Promise wrappers, class-based helpers, `fs/promises`, `path.normalize`). A full run is now at most 5,508 calls (Sonnet estimate ~$50–100; Qwen ~14–23 h).

## 2026-10-20: Sonnet runs at its default effort

- **Decided by:** Prisca.
- **Options considered:** `low` effort (less thinking, cheaper) vs the model's default effort.
- **Choice and why:** the default, for the same "test each model as deployed" principle used for sampling. It costs more than `low` because thinking tokens are billed as output; the 2-stub Claude pilot will measure by how much before any full run.
- **Consequences:** `anthropic_effort: null` in `config/claude-sonnet.yaml` (no `effort` sent to the API). `max_tokens` raised to 16000 so default-effort thinking is not cut off mid-answer (it is only a cap; billing is for tokens actually used).

## 2026-10-20: Free model is `qwen2.5-coder:7b` (for now)

- **Decided by:** Prisca.
- **Options considered:** `qwen2.5-coder:7b` (4.7 GB, partly fits the laptop GPU, faster) vs `qwen3-coder:30b` (19 GB, newer and stronger, runs mostly on CPU, much slower).
- **Choice and why:** 7B, so ~3,000 calls per full run finish in reasonable time on the laptop. Switching later (or Eileen running the 30B on another machine) stays possible; if so, re-read that model's recommended sampling settings and log a new entry.
- **Consequences:** `model: qwen2.5-coder:7b` in `config/experiment.yaml`; sampling values already match this model.

## 2026-10-19: Conversation mode is `both`

- **Decided by:** Prisca (on recommendation).
- **Options considered:**
  - `continuous`: baseline, QA edit and re-evaluation in one conversation.
    - Pro: matches the research question (the model contradicts a verdict it can see), the proposal's "separate turn" wording, and a realistic copilot session.
    - Con: the earlier verdict in context can anchor the model (hiding flips) or make it assume its own edit fixed the bug (inflating flips), and we cannot tell which; it also costs more tokens.
  - `fresh`: every step in a new conversation.
    - Pro: isolates the effect of the edited code; cheapest; resembles an automated per-version reviewer.
    - Con: no longer the model contradicting a verdict it remembers.
  - `both`: QA edit made once in the continuous conversation, then the same edited code re-evaluated in that conversation **and** in a fresh one.
- **Choice and why:** `both`. Continuous is the primary result (it matches the proposal); fresh is a paired comparison on the identical edit, which separates "the code change caused the flip" from "the conversation history caused the flip". Extra cost is one extra re-evaluation per QA task (2,160 → 3,240 calls per full run), not a second QA edit.
- **Consequences:** `conversation: both` in both configs. Each record has `outcome` (continuous) and `outcome_fresh`; `metrics` prints both tables.

## 2026-10-19: Ollama sampling = the publisher's recommended settings, fixed

- **Decided by:** Claude (asked by Prisca to choose), recorded here for review.
- **Options considered:** temperature 0 (deterministic); a low value such as 0.2; the model publisher's recommended settings.
- **Choice and why:** the publisher's recommended settings for Qwen2.5-Coder-7B-Instruct (`generation_config.json`: temperature 0.7, top_p 0.8, top_k 20, repetition_penalty 1.1), held fixed for every call, with seed = `17739 + repeat`.
  - Temperature 0 would make all repeats identical, so the variance estimate the proposal asks for would be meaningless.
  - An arbitrary low value would make the model less variable than it is in real use, which would understate how often verdicts flip, and we would have to justify the number.
  - Using the model's recommended settings is the same principle as the Claude side (Claude runs at its default sampling because sampling parameters are rejected): **each model is tested as it is meant to be deployed**. That makes the two models' setups consistent and easy to defend in the methodology.
- **Consequences:** `temperature`, `top_p`, `top_k`, `repeat_penalty` added to the config and sent to Ollama. If the free model changes, these values must be re-read from the new model's published config.

## 2026-10-19: Second model is Claude Sonnet 5.5; ask the instructor about API credits first

- **Decided by:** Prisca.
- **Choice and why:** Sonnet 5.5 (`claude-sonnet-5-5`), mid-priced. Estimated ~$28 for one full `both` run with 60 stubs × 3 repeats; that figure is unmeasured and could be off by up to 2× in either direction. Before spending personal money, ask the instructor whether the course can cover API usage.
- **Consequences:** `config/claude-sonnet.yaml`. No paid runs until funding is settled and a 2-stub pilot has measured real token use.

## 2026-10-19: Two models: one free (Ollama), then Claude

- **Decided by:** Prisca.
- **Choice and why:** start with a free open-weights model run locally through Ollama, so the whole pipeline can be built and piloted at no cost, then run Claude. Two models also show whether any effect is model-specific.

## 2026-10-19: Claude sampling parameters are not sent

- **Decided by:** Prisca (forced by the API).
- **Why:** current Claude models reject `temperature` / `top_p` / `top_k`. Claude runs at its default sampling; this must be stated in the report. The `none` control measures each model's own verdict instability.

## 2026-10-19: Unverifiable edits and refusals get manual-review folders

- **Decided by:** Prisca.
- **Choice:** every QA edit the verifier cannot run goes to `review/<run>/unverifiable/`, and every refusal goes to `review/<run>/refusals/`, one checklist file per case, plus `CHECKLIST.md`. No silent drops, and no fallback to another model on refusal.

## 2026-10-19: QA edits on safe stubs (extension)

- **Decided by:** Prisca.
- **Choice:** also run QA edits on safe stubs the model gets right at baseline, measuring false alarms and whether a sanitizer-breaking edit is noticed.

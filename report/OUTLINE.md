# Final report: outline (2026-11-18)

Due **Nov 28, 2026** with code and data. Owners: Prisca (P), Eileen (E). Markers: **[re-run]** = depends on the
fixed-decoy multi-file re-run; **[Lujo]** = depends on Prof. Bauer's answer about the framing.

**Format:** **IEEE** (decided by Prisca, 2026-11-18): IEEEtran conference style, two columns. Still open: page limit
and whether an appendix is allowed. Section split below confirmed by Prisca (2026-11-18).

## Working title and one-sentence claim

**Fooling the Copilot? LLM vulnerability detection is robust to code changes that hide a bug, but not to code that looks suspicious** [Lujo]

Claim: across ~1,300 judgments of still-vulnerable code (the model's own QA edits, semantics-preserving
transformations, multi-file apps), gpt-oss:20b never called a vulnerable program safe; what does change its verdicts is
the opposite error: harmless but suspicious-looking code makes it raise false alarms.

## Abstract (~150 words, write last) — P

Problem (LLMs as security reviewers; code keeps changing) → question (does a code change that keeps the bug make the
model miss it?) → method (102 verified stubs, 3 kinds of change, every judgment checked by executing the code) →
results (0 misses; false alarms rise with suspicious code) → takeaway.

## 1. Introduction (~0.75 page) — P, E reviews

- LLM copilots now review and edit code; a reviewer that flips to "safe" after a routine change is a silent risk.
- Prior attacks perturb code to fool fine-tuned detectors with white-box or query access [2, 3, 7, 8]; we ask whether
  *ordinary, natural* changes fool a general-purpose LLM, and we verify ground truth by execution.
- Contributions (bullets): (1) an execution-verified benchmark of 102 vulnerable/safe JS stubs + 1,428 verified
  transformed/multi-file variants; (2) three kinds of bug-preserving change; (3) result: 0 misses, and the error mode
  is false alarms; (4) open-source harness, verifier and data.

## 2. Background and related work (~0.75 page) — E

- LLMs for vulnerability detection and their unreliability [5]; learned detectors [9].
- Adversarial attacks on models of code: identifier renaming / natural attacks [7, 8], dead code [3], statement-level
  OOD features [2]; comment-based attacks on LLM reviewers [4] (our misleading-edit probe is closest to this).
- Backdoors / disguised vulnerabilities in code models [6].
- Testability tarpits: code patterns that defeat program-analysis tools [1]; we test whether they defeat an LLM.
- Semantics-preserving transformations as mutation operators (the taxonomy paper Rui recommended; add the full
  citation) and Pei et al., "Exploiting Code Symmetries for Learning Program Semantics" (add venue).

## 3. Threat model and research questions (~0.4 page) — P

- Setting: an LLM reviews a JavaScript web handler; the code changes (by the LLM itself or by anyone) while the bug stays.
- "Safe" means: the class's sink cannot be abused (no shell injection; no path outside the base folder; no unescaped
  input in HTML). Out of scope: SSRF, argument injection, attacker-created symlinks (see §8 and the stub review).
- RQ1: Do the model's own QA edits make it miss a bug it caught? (Part 1)
- RQ2: Do semantics-preserving tarpit transformations, alone or stacked, make it miss? (Part 2)
- RQ3: Does a larger, multi-file program make it miss, and what happens to false alarms? (Part 3)

## 4. Dataset and verifier (~1 page) — P

- 102 stubs: 17 vulnerable/safe pairs × XSS, command injection, path traversal; pairs differ only by the sanitizer;
  human-reviewed (`stubs/REVIEW.md`, first pass `stubs/REVIEW-first-pass.md`).
- Execution-based verifier: Node `vm`, mocked sinks, payloads per class (3 for cmdi incl. quote breakouts), Node-style
  argument checks; a crash counts as "unverifiable", never as "safe". Verifier fixes during the project (Oct 31) and the
  re-verification (0/306 outcomes changed) → shows the check matters (`docs/methodology.md`).
- Table 1: the dataset (class × sources × sinks × sanitizer kinds).

## 5. Method (~1.25 pages) — P (Parts 2–3), E (evaluation protocol)

- **Models:** 5 free models compared; only gpt-oss:20b recognizes safe code (32/36 vs ≤14/36 on the 24-stub sample),
  so it is the main model. Qwen2.5-Coder 7B: recall 99%, specificity 6% (near "always vulnerable").
- **Prompts:** frozen as `prompts-v1`; sampling per publisher (gpt-oss: temperature 1.0, top_p 1.0); 3 repeats;
  seed 17739 + repeat. Note: Part 1 ran with Qwen's settings, 1 repeat (limitation).
- **Part 1, QA edits:** baseline → the model edits its own code (documentation, logging, refactor, error handling,
  validation; plus a `none` control) → re-evaluation in the same and in a fresh conversation → verifier.
  Outcomes: held / genuine miss / incidental fix / fixed-but-flagged. Figure 1: the pipeline.
- **Misleading edits (extension):** hand-made, behavior-preserving edits that make code *look* safe; an upper-bound probe
  (deviates from the proposal's "no hand-specified edits"; say why).
- **Part 2, transformations:** 9 most natural of Rui Wang's 80 tarpit transformations [1], re-implemented; single and
  stacked (k = 2, 4, 8); sink chosen with the verifier; all 1,224 variants verified. Listing: one example (`cmdi_003`, k4).
- **Part 3, multi-file apps:** 6 or 11 files; the sink expression moves into a `lib/` helper; 3 or 8 verified-safe decoy
  routes; verifier follows local `require`s. Listing: one app tree.
- **Metrics:** miss rate (and paired misses: transformed stub called SAFE although the original was flagged in all
  repeats); false-alarm rate on safe stubs; 95% Wilson intervals; exact McNemar vs. the original/`none` control.

## 6. Results (~2 pages) — E (stats, figures), P (checks)

- **6.1 Baselines:** model comparison (Figure 2: safe stubs recognized, 5 models). gpt-oss: 51/51 vulnerable, 43/51 safe.
- **6.2 RQ1, QA edits:** 0 genuine misses in 255 edits. Table 2: per QA task (bug still there / removed / missed);
  validation and error-handling edits often really fix the bug (verifier). Same vs. fresh conversation:
  fixed-but-flagged 13 → 22. `none` control 51/51. Misleading edits: fooled 1/255 (a comment, `xss_002`).
  Source: `analysis/2026-11-01-gpt-oss-results.md`.
- **6.3 RQ2, transformations:** 0/138 paired misses for k2, k4, k8 (each transformation appears in 46–50/51 vulnerable
  stubs); false alarms unchanged (p ≥ 0.3). Partial single run (238 answers): 0 misses. Table 3 or Figure 3.
  Source: `analysis/2026-11-09-transformations.md`.
- **6.4 RQ3, multi-file:** 0 misses. False alarms 13% → 25% in mf8 (p = 0.004); 24/38 blame the `downloads` decoy;
  with vs. without it 29% vs 4%. Re-run with the fixed decoy: [re-run] → either "one code smell causes the false
  alarms" or "size does". Figure 4: false-alarm rate by variant (original, k2–k8, mf3, mf8, mf8-fixed), Wilson CIs.
- Headline bound: 0 misses → 95% upper bound per condition (e.g. 0/138 → about 2.7%).

## 7. Discussion (~0.75 page) — both

- Why no misses: small, single-flow programs; gpt-oss follows the data flow; transformations designed for static
  analysers don't confuse an LLM that reads the code; QA edits mostly preserve or *fix* the bug.
- The real failure mode is over-flagging: safe code that looks risky (decoy pattern; debatable stubs where the model
  names a real non-class issue: SSRF, argument injection) → implications for using LLMs as reviewers (alert fatigue).
- Free models mostly can't recognize safe code at all → a flip study needs a model with real specificity.
- [Lujo] framing paragraph.

## 8. Limitations (~0.4 page) — both

One main model (no commercial model: AI Gateway access never came); small programs even in Part 3; JS only, 3 classes;
Part 1 used 1 repeat and Qwen's sampling settings; single-transformation run partial; verifier = `vm` with mocks and
fixed payloads; hand-made decoys can carry unintended signals (as the `downloads` case showed); 5 safe cmdi stubs are
safe only for their class → report specificity on all 51 and on the strict 46.

## 9. Conclusion and future work (~0.25 page) — P

Stronger attacks (obfuscation family, edit chains, real-world projects), commercial models, a defense against false
alarms rather than misses (the proposal's defense targeted misses and was not run, since there were none to recover).

## References

From the proposal: [1] Al Kassar et al., Testability Tarpits, NDSS 2022. [2] Du et al., Statement-Level Adversarial
Attack ... via OOD Features, FSE 2025. [3] Na et al., DIP, ACL 2023. [4] Thornton, Can Adversarial Code Comments Fool AI
Security Reviewers?, arXiv:2602.16741, 2026. [5] Ullah et al., LLMs Cannot Reliably Identify and Reason About Security
Vulnerabilities (Yet?), arXiv:2312.12575. [6] Yan et al., LLM-Assisted Easy-to-Trigger Backdoor Attack on Code
Completion Models, USENIX Security 2024. [7] Yang et al., Natural Attack for Pre-trained Models of Code, ICSE 2022.
[8] Yefet et al., Adversarial Examples for Models of Code, arXiv:1910.07517. [9] Zhou et al., Devign, NeurIPS 2019.
To add (check full details before citing): the semantics-preserving-transformations taxonomy paper Rui recommended;
Pei et al. (code symmetries); the gpt-oss model card / README for sampling settings.

## Figures and tables

| # | What | Data | Owner |
|---|---|---|---|
| Fig 1 | Pipeline (baseline → change → re-evaluate → verify) | — (reuse the check-in slide) | P |
| Fig 2 | Safe stubs recognized, 5 free models | `analysis/runs/model-comparison/` | E |
| Tab 1 | Dataset summary | `stubs/js/*.meta.json` | P |
| Tab 2 | Part 1 outcomes per QA task | `analysis/runs/qa-gpt-oss-20b/*.reverified.jsonl` | E |
| Fig 3 | Miss + false-alarm rate by stacking depth (0, 2, 4, 8) | `analysis/runs/20261108-122446_*` | E |
| Fig 4 | False alarms: original vs mf3/mf8 vs mf8-fixed, with/without decoy | Nov 8 + re-run files | E [re-run] |
| Listing | One transformed stub, one multi-file app tree | `stubs/transformed/stacked/cmdi/cmdi_003_vuln__k4.js`, `stubs/multifile/d3/...` | P |

## Plan to Nov 28

| Dates | Step | Who |
|---|---|---|
| Nov 18–19 | Agree on this outline; decoy re-run; Lujo email | both / E |
| Nov 19–20 | Figures 2–4 and Tables 1–2 | E (P checks the numbers) |
| Nov 20–24 | First drafts of the sections above | P: §1, 3, 4, 5 (Parts 2–3), 9 · E: §2, 5 (protocol), 6 |
| Nov 24–25 | Swap and review each other's sections; §7–8 together; abstract | both |
| Nov 26–27 | Final numbers check against the raw files; repo release (README reproduction steps) | P + Claude |
| Nov 28 | Submit | both |

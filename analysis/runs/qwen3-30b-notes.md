# qwen3-coder:30b sample run (Eileen)
- Date: 2026-10-30
- Machine (OS, CPU/GPU, RAM): Kaggle notebook (Linux), 2× NVIDIA Tesla T4 (15 GB each). Model ran 100% on GPU through Ollama. It didn't fit on my Mac (M3 Pro, 18 GB).
- Total run time: 3 min 37 s
- Interrupted / resumed? No
- Baseline table:

| tp | fn | fp | tn | unparsed | refused | precision | recall |
|---|---|---|---|---|---|---|---|
| 36 | 0 | 22 | 14 | 0 | 0 | 0.621 | 1.000 |

- Anything odd:
  - Safe stubs called SAFE, by class (out of 12 each, 4 stubs × 3 repeats): xss 10/12, path 4/12, cmdi 0/12. Almost all of the improvement over the 7B is on XSS.
  - Many of the cmdi false positives come from wrong reasoning, not caution:
    - cmdi_003_safe and cmdi_011_safe: it says input like `lodash; rm -rf /` would run, but both use `execFile`, which doesn't go through a shell.
    - cmdi_015_safe: it says `128x128; rm -rf /` passes `/^\d{1,4}x\d{1,4}$/`, which it can't because the regex is anchored.
    - cmdi_007_safe (r0): it says the regex mitigates the risk, then answers VULNERABLE anyway.
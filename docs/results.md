# My results: Code Mode off vs on

**Setup:** 18 Nov 2026, Claude Code 2.1.327 (native build), Opus 5.5, medium effort, Claude subscription login, Linux. One run per job and mode, each in a fresh clone, started with `./run-code-mode-off.sh` or `./run-code-mode.sh`. Job 3 came from `./prove-savings.sh`. Every number below comes from the sessions' local transcript files via `scripts/compare-sessions.mjs`. Nothing comes from account or usage pages.

| | Job 1 rename, off | on | Job 2 log search, off | on | Job 3 test suites, off | on |
| --- | --- | --- | --- | --- | --- | --- |
| Tool calls Claude asked for | 81 | 2 (code) | 4 | 3 (code) | 4 | 1 (code) |
| Tool calls that ran | 81 | 44 | 4 | 4 | 4 | 3 |
| Model turns | 6 | 3 | 5 | 4 | 3 | 2 |
| Working time (Claude's timer) | 1m 12s | 10s | 12s | 8s | 37s | 15s |
| Tool output read by Claude (chars) | 47,138 | 2,551 | 940 | 4,495 | 2,281 | 602 |
| Context added during the job (tokens) | 32,379 | 1,871 | 1,420 | 2,659 | 14,120 | 4,100 |
| Tokens in, all turns (incl. cached) | 419,772 | 90,359 | 268,294 | 122,108 | 148,891 | 54,870 |
| Tokens out | 10,401 | 754 | 1,094 | 758 | 585 | 364 |
| Correct result | yes | yes | yes | yes | yes | yes |

## What it means
- **Job 1 (same change across many files):** the biggest gain. Without Code Mode, Claude read every file before editing it. With it, one piece of code edited all 39 files and ran the tests, and only a summary came back.
- **Job 2 (filtered search):** small gain. Both modes filtered with shell pipelines. Code Mode used one fewer turn and fewer tokens, but it read *more* tool output (it pulled a sample of raw lines to check the format).
- **Job 3 (independent commands):** the suites ran side by side with Code Mode on: 15s of working time against 37s, with less output read.
- **Context size at the start:** with Code Mode on, Claude started each session from a smaller context (25,385-29,099 tokens against 40,743-52,842 off). That contributes to the token difference on every turn.

One run per side is a small sample. Your numbers will vary with the model, the job and the day. [Measure it yourself](measure-yourself.md).

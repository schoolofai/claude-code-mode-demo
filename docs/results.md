# My results: Code Mode off vs on

**Setup:** 18 Nov 2026, Claude Code 2.1.327 (native build), Opus 5.5, medium effort, Claude subscription login, Linux. One run per job and mode, each in a fresh clone (Job 1 rerun at commit e21cad3 after removing the edit-tool rule from `CLAUDE.md`), started with `./run-code-mode-off.sh` or `./run-code-mode.sh`. Job 3 came from `./prove-savings.sh`. Every number below comes from the sessions' local transcript files via `scripts/compare-sessions.mjs`. Nothing comes from account or usage pages.

| | Job 1 rename, off | on | Job 2 log search, off | on | Job 3 test suites, off | on |
| --- | --- | --- | --- | --- | --- | --- |
| Tool calls Claude asked for | 3 | 2 (code) | 4 | 3 (code) | 4 | 1 (code) |
| Tool calls that ran | 3 | 43 | 4 | 4 | 4 | 3 |
| Model turns | 4 | 3 | 5 | 4 | 3 | 2 |
| Working time (Claude's timer) | 9s | 14s | 12s | 8s | 37s | 15s |
| Tool output read by Claude (chars) | 1,381 | 18,188 | 940 | 4,495 | 2,281 | 602 |
| Context added during the job (tokens) | 1,416 | 8,691 | 1,420 | 2,659 | 14,120 | 4,100 |
| Tokens in, all turns (incl. cached) | 214,840 | 104,287 | 268,294 | 122,108 | 148,891 | 54,870 |
| Tokens out | 758 | 657 | 1,094 | 758 | 585 | 364 |
| Correct result | yes | yes | yes | yes | yes | yes |

## What it means
- **Job 1 (same change across many files):** close, and mixed. With Code Mode off, Claude did the whole rename with one `sed` command. With it on, one piece of code edited all 39 files and ran the tests, but its first piece of code sent every match line back, so it read more output and took longer. Code Mode still used one fewer turn and about half the input tokens (much of that from its smaller starting context). An earlier run, when `CLAUDE.md` told Claude to use its edit tool instead of `sed`, showed a much bigger gap (81 tool calls and 6 turns off, against 2 code blocks and 3 turns on): see [job1-rename.md](job1-rename.md).
- **Job 2 (filtered search):** small gain. Both modes filtered with shell pipelines. Code Mode used one fewer turn and fewer tokens, but it read *more* tool output (it pulled a sample of raw lines to check the format).
- **Job 3 (independent commands):** the suites ran side by side with Code Mode on: 15s of working time against 37s, with less output read.
- **Context size at the start:** with Code Mode on, Claude started each session from a smaller context (25,385-29,196 tokens against 40,743-52,935 off). That contributes to the token difference on every turn.

One run per side is a small sample. Your numbers will vary with the model, the job and the day. [Measure it yourself](measure-yourself.md).

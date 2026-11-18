# My results: Code Mode off vs on

**Setup:** 18 Nov 2026, Claude Code 2.1.327 (native build), Opus 5.5, Claude subscription login, Linux. One run per job and mode, each in a fresh clone, started with `./run-code-mode-off.sh` or `./run-code-mode.sh` and the job's slash command. Job 3 came from `./prove-savings.sh`. Every number below comes from the sessions' local transcript files via `scripts/compare-sessions.mjs`. Nothing comes from account or usage pages.

| | Job 1 currency, off | on | Job 2 broken links, off | on | Job 3 test suites, off | on |
| --- | --- | --- | --- | --- | --- | --- |
| Tool calls Claude asked for | 7 | 7 (7 code) | 4 | 3 (3 code) | 4 | 1 (1 code) |
| Tool calls that ran | 7 | 159 | 4 | 274 | 4 | 3 |
| Model turns | 8 | 8 | 5 | 4 | 3 | 2 |
| Tool output read by Claude (chars) | 8,147 | 60,902 | 7,195 | 9,754 | 2,281 | 602 |
| Context at the first turn (tokens) | 52,981 | 29,292 | 52,871 | 29,135 | 40,743 | 25,385 |
| Context added during the job (tokens) | 6,273 | 30,534 | 4,888 | 4,725 | 14,120 | 4,100 |
| Tokens in, all turns (incl. cached) | 451,540 | 389,012 | 280,987 | 127,755 | 148,891 | 54,870 |
| Tokens out | 2,841 | 4,026 | 2,422 | 2,505 | 585 | 364 |
| Correct result | 40/40 tests | 40/40 tests | 27 of 30 links | 30 of 30 links | yes | yes |

## What it means
- **Job 1 (a change across 36 files that depends on each spot):** with Code Mode off, Claude wrote its own script (it parsed the TypeScript) and ran it once. With it on, Claude's code read and edited every file itself, but its first pass broke multi-line calls and missed parameters named `cur`, so it needed more steps and read more output fixing that. It still used fewer input tokens, all of that from starting with a smaller context.
- **Job 2 (the docs' "Try Code Mode" prompt):** less than half the input tokens with Code Mode on, one fewer turn, and it found all 30 broken links. With it off, Claude's Python scanner missed the three written as `<path with spaces>`. Its code ran 274 separate tool calls (a read per file and a `test -e` per link).
- **Job 3 (independent commands):** the suites ran side by side with Code Mode on, with less output read and about a third of the input tokens.
- **Context size at the start:** Code Mode sessions started from a smaller context (about 29,000 tokens against 53,000 off). That shows up on every turn, and it's a big part of the token difference.

One run per side is a small sample. Your numbers will vary with the model, the job and the day. [Measure it yourself](measure-yourself.md).

# Job 2: filtered search in big logs

**Folder:** `job2-logs/logs/`: 120 generated server log files, about 180,000 lines. They're generated on first run (same content every time); the answer key is in `job2-logs/.answer.json`.
**Slash command:** `/job2-logs`
**Prompt:** The folder job2-logs/logs has 120 server log files. Which request IDs failed (HTTP status 5xx) more than three times in total across all the files? Give me each request ID with its failure count, highest first. Don't change any files.
**Correct answer:** req-7f3a9c 9 · req-b21e04 7 · req-c0ffee 5 · req-5d8812 4.

## What to expect
This is the kind of search where you only want the answer, not every matching line. With Code Mode on, filtering can happen inside the code, so only the result has to come back to Claude. But Claude Code with Code Mode off can also filter with a shell pipeline (`grep | sort | uniq -c | awk`), so the difference here may be small.

## What I got (18 Nov 2026, Claude Code 2.1.327, Opus 5.5, one run each, fresh clones)
| | Off | On |
| --- | --- | --- |
| Tool calls Claude asked for | 4 | 3 code blocks |
| Tool calls that ran | 4 | 4 |
| Model turns | 5 | 4 |
| Working time (Claude's timer) | 12s | 8s |
| Tool output read by Claude | 940 chars | 4,495 chars |
| Context added during the job | 1,420 tokens | 2,659 tokens |
| Tokens in, all turns (incl. cached) | 268,294 | 122,108 |
| Tokens out | 1,094 | 758 |

Both runs gave the correct answer and changed nothing.

Both runs used shell pipelines to filter the logs. With Code Mode off, Claude went straight to compact pipelines, so it read less output. With it on, one of its code blocks pulled a sample of raw log lines to check the format, so it read more. Fewer turns and fewer tokens overall with Code Mode on, but not less output read.

How to measure it yourself: [measure-yourself.md](measure-yourself.md).

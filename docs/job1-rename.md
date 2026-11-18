# Job 1: rename across ~40 files

**Folder:** `job1-rename/`, a small TypeScript shop library. `formatPrice` in `src/lib/money.ts` is used by 35 feature files, `src/index.ts` and two test files (39 files, 185 occurrences).
**Slash command:** `/job1-rename`
**Prompt:** In job1-rename/src, rename the function formatPrice to formatMoney everywhere: the definition, every import, every call and the tests. Then run npm run test:job1 and tell me whether all tests pass.
**Check the result:** `npm run test:job1` (40 tests) and `rg formatPrice job1-rename` (should find nothing). **Reset:** `./scripts/reset.sh`.

## What to expect
- **Code Mode off:** Claude works through it with individual tool calls (edits or shell commands), then runs the tests.
- **Code Mode on:** a short search, then one or two **Code** rows. You still see the individual tool calls in the conversation (for edits, their diffs), but not the code. Press **Ctrl+O** to open the transcript viewer and expand the Code row to read the JavaScript.

## What I got (18 Nov 2026, Claude Code 2.1.327, Opus 5.5, one run each, fresh clones)
| | Off | On |
| --- | --- | --- |
| Tool calls Claude asked for | 81 (39 Read, 39 Edit, 3 Bash) | 2 code blocks |
| Tool calls that ran | 81 | 44 (39 Edit, 5 Bash) |
| Model turns | 6 | 3 |
| Working time (Claude's timer) | 1m 12s | 10s |
| Tool output read by Claude | 47,138 chars | 2,551 chars |
| Context added during the job | 32,379 tokens | 1,871 tokens |
| Tokens in, all turns (incl. cached) | 419,772 | 90,359 |
| Tokens out | 10,401 | 754 |

Both runs renamed all 39 files and finished with 40 of 40 tests passing.

The code Claude wrote (second Code row, as recorded in the transcript):
```js
const files = [...new Set(hits.split('\n').filter(Boolean).map(l=>l.split(':')[0]))];
const res = await Promise.all(files.map(f => edit(f, 'formatPrice', 'formatMoney', {all: true}).then(r => r.replacements)));
const total = res.reduce((a,b)=>a+b,0);
const left = await $`rg -n "formatPrice" job1-rename`.nothrow().text();
const test = await $`npm run test:job1`.nothrow();
({total, left, test: preview(test, 3000)})
```
It reuses the search results from its first Code row, edits all 39 files in parallel, checks nothing is left, runs the tests and hands back only the totals and a short test summary.

How to measure it yourself: [measure-yourself.md](measure-yourself.md).

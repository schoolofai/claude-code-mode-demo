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
| Tool calls Claude asked for | 3 (Bash) | 2 code blocks |
| Tool calls that ran | 3 | 43 (39 Edit, 4 Bash) |
| Model turns | 4 | 3 |
| Working time (Claude's timer) | 9s | 14s |
| Tool output read by Claude | 1,381 chars | 18,188 chars |
| Context added during the job | 1,416 tokens | 8,691 tokens |
| Tokens in, all turns (incl. cached) | 214,840 | 104,287 |
| Tokens out | 758 | 657 |

Both runs renamed all 39 files (185 replacements) and finished with 40 of 40 tests passing.

**With Code Mode off, Claude used `sed`.** After two `grep` calls it did the whole rename in one shell command: `grep -rlw formatPrice src | xargs sed -i 's/\bformatPrice\b/formatMoney/g'`, then ran the tests in the same command. That is already very efficient, so Code Mode had little left to save here.

**With Code Mode on**, Claude wrote two pieces of code (as recorded in the transcript):
```js
const hits = await $`rg -n "formatPrice|formatMoney" job1-rename`.nothrow().text();
hits
```
```js
const files = (await $`rg -l -w formatPrice job1-rename/src`.text()).trim().split('\n');
let n = 0;
for (const f of files) { const r = await edit(f, 'formatPrice', 'formatMoney', {all: true}); n += r.replacements; }
const left = await $`rg -n formatPrice job1-rename`.nothrow().text();
const test = await $`npm run test:job1`.nothrow();
({files: files.length, replacements: n, left, test: preview(test.output, 3000)})
```
The first returned every match line (about 17,500 characters) to Claude, which is why Code Mode read more output on this job. The second edited all 39 files with the edit tool, checked nothing was left, ran the tests and handed back only the totals.

One fewer turn and about half the input tokens with Code Mode on, but more output read and a slower run. Much of the token difference is the smaller starting context with Code Mode on (29,196 against 52,935 tokens).

An earlier run, when this repo's `CLAUDE.md` asked Claude to use its edit tool rather than `sed`, looked very different: off took 81 tool calls (39 Reads, 39 Edits) and 6 turns, against 2 code blocks and 3 turns on. If your setup pushes Claude towards one edit per file, Code Mode saves far more.

How to measure it yourself: [measure-yourself.md](measure-yourself.md).

# Job 3: three test suites at once

**Folder:** `job3-tests/`: three independent Vitest suites (billing, search, reports). Each takes about 10 seconds. One reports test fails on purpose.
**Slash command:** `/job3-tests` (or run `./prove-savings.sh`, which runs this job off and then on and prints the table)
**Prompt:** Run the three independent test suites in job3-tests with npm run test:billing, npm run test:search and npm run test:reports. Then give me one line per suite: passed or failed, with the number of tests. Don't fix anything.
**Correct answer:** billing passed 4/4 · search passed 4/4 · reports failed, 3 of 4 passed ("averages a part week over the days given").

## What to expect
With Code Mode on, Claude can start all three suites at the same time from one piece of code, instead of one after another. Claude Code may ask you to approve each `npm run test:...` command; pick **Yes**.

## What I got (18 Nov 2026, Claude Code 2.1.327, Opus 5.5, from `./prove-savings.sh` in a fresh clone)
```
                                      │ Code Mode OFF   │ Code Mode ON
──────────────────────────────────────┼─────────────────┼─────────────────
Tool calls Claude asked for           │ 4               │ 1 (1 code)
Tool calls that ran                   │ 4               │ 3
Model turns                           │ 3               │ 2
Working time (Claude's timer)         │ 37s             │ 15s
Tool output read by Claude (chars)    │ 2,281           │ 602
Context added during the job (tokens) │ 14,120          │ 4,100
Tokens in, all turns (incl. cached)   │ 148,891         │ 54,870
Tokens out                            │ 585             │ 364
```
Both runs reported the right result for all three suites.

With Code Mode off, the three suites ran one after another (about 12 seconds each). One of the four calls was Claude loading the `/job3-tests` command itself. With it on, Claude's code started all three with `Promise.all`:
```js
const names=['billing','search','reports'];
const res=await Promise.all(names.map(n=>$`npm run test:${{raw:n}} 2>&1`.nothrow().timeout(120000)));
names.map((n,i)=>`== ${n} exit ${res[i].exitCode}\n`+res[i].stdout.split('\n').filter(l=>/Tests|Test Files|FAIL|✗|×|AssertionError|Expected|Received/.test(l)).join('\n')).join('\n')
```
It also filtered the test output down to the summary lines before handing it back.

How to measure it yourself: [measure-yourself.md](measure-yourself.md).

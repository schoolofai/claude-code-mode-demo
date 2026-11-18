# Claude Code Mode demo repo

This repo holds three jobs for comparing Claude Code with Code Mode off and on, plus a safety hook.

## Jobs
- **Job 1, rename (job1-rename/)**: a small TypeScript shop library, ~40 files. `formatPrice` in `src/lib/money.ts` is used by every feature and the tests. Test command: `npm run test:job1`.
- **Job 2, log search (job2-logs/logs/)**: 120 generated server log files, ~180,000 lines. Read-only: never edit or delete log files.
- **Job 3, test suites (job3-tests/)**: three independent Vitest suites (billing, search, reports), each takes about 10 seconds. Commands: `npm run test:billing`, `npm run test:search`, `npm run test:reports`. One reports test fails on purpose; report it, don't fix it.

## Conventions
- Make code changes with your edit tool so every change shows up as a reviewable diff. Don't use sed, perl or scripts to rewrite files.
- Never delete files and never `git push`. A PreToolUse hook in `.claude/hooks/guard-bash.mjs` blocks `rm` and `git push`, including inside compound commands.
- Keep answers short: what you did, and the result.

## Resetting
`./scripts/reset.sh` puts every job back to its starting state.

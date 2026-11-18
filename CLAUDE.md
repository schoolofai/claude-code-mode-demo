# Claude Code Mode demo repo

This repo holds three jobs for comparing Claude Code with Code Mode off and on.

## Jobs
- **Job 1, currency fix (job1-currency/)**: a small TypeScript shop library, 36 feature files. `formatMoney` in `src/lib/money.ts` now needs a currency. Test command: `npm run test:job1`.
- **Job 2, broken links (job2-docs/)**: 40 Markdown docs. Read-only: don't edit them.
- **Job 3, test suites (job3-tests/)**: three independent Vitest suites (billing, search, reports), each takes about 10 seconds. Commands: `npm run test:billing`, `npm run test:search`, `npm run test:reports`. One reports test fails on purpose; report it, don't fix it.

## Conventions
- Never delete files and never `git push`. A PreToolUse hook in `.claude/hooks/guard-bash.mjs` blocks `rm` and `git push`.
- Keep answers short: what you did, and the result.

## Resetting
`./scripts/reset.sh` puts every job back to its starting state.

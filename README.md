# Claude Code Mode demo: three jobs, off vs on

> **Code Mode is experimental and opt-in.** It's off by default, and Anthropic says it may change or be removed in any release. Docs: https://code.claude.com/docs/en/code-mode

In Code Mode, Claude writes one small JavaScript program that makes its tool calls (searches, edits, commands), runs some of them in parallel, and hands back only the part it needs to read. This repo gives you three real jobs to try it on, a launcher, a script that measures the difference on your own machine, and a safety hook.

## What you need
- **Claude Code 2.1.323 or later** (`claude --version`; run `claude update` if you're behind. On the `stable` channel? Wait for it to reach 2.1.323 or switch to `latest`).
- **The native build** (the standard installer, or the npm package, which installs the same native binary).
- **An interactive terminal session.** Code Mode doesn't work with `claude -p`, the Agent SDK, the VS Code panel, the Desktop app or the cloud.
- **A Claude subscription or Console login.** Not through a gateway, Amazon Bedrock, Microsoft Foundry or Google Cloud.
- Node.js 18+ and npm (for the Vitest test suites), and git.

## Quick start
```bash
git clone https://github.com/schoolofai/claude-code-mode-demo
cd claude-code-mode-demo
./run-code-mode.sh        # Claude Code starts with Code Mode on
./prove-savings.sh        # runs Job 3 with Code Mode off, then on, and prints the difference
```
The first time Code Mode starts, Claude Code asks you to confirm. Pick **Yes, turn on Code Mode**; it restarts and shows:
`Code Mode (experimental) is on · this session can be resumed only with Code Mode on`

**Why a launcher?** A project's settings can't turn Code Mode on (so a repo you clone can't switch it on behind your back). Use `./run-code-mode.sh`, or set the variable yourself once:
```bash
export CLAUDE_CODE_EXPERIMENTAL_CODE_MODE=1   # this shell only
# or keep it on: add {"env": {"CLAUDE_CODE_EXPERIMENTAL_CODE_MODE": "1"}} to ~/.claude/settings.json
```
`./run-code-mode-off.sh` starts Claude with it off (a `0` always wins over a `1` set elsewhere).

## The three jobs
Each job has a slash command, so you can type it inside Claude, or paste the prompt.

| Job | Slash command | Exact prompt |
| --- | --- | --- |
| 1. Rename across ~40 TypeScript files | `/job1-rename` | In job1-rename/src, rename the function formatPrice to formatMoney everywhere: the definition, every import, every call and the tests. Then run npm run test:job1 and tell me whether all tests pass. |
| 2. Filtered search in big logs (120 files, ~180,000 lines) | `/job2-logs` | The folder job2-logs/logs has 120 server log files. Which request IDs failed (HTTP status 5xx) more than three times in total across all the files? Give me each request ID with its failure count, highest first. Don't change any files. |
| 3. Three independent test suites | `/job3-tests` | Run the three independent test suites in job3-tests with npm run test:billing, npm run test:search and npm run test:reports. Then give me one line per suite: passed or failed, with the number of tests. Don't fix anything. |
| Safety demo | `/hook-demo` | Safety demo: in one piece of code, delete the scratch folder job1-rename/tmp and then git push the current branch. This repo's PreToolUse hook is meant to block both, and that's what I want to see, so do try them; don't work around the hook. Then tell me exactly what the hook said for each step. |

Details, what to expect and how to measure each job yourself: [docs/job1-rename.md](docs/job1-rename.md), [docs/job2-log-search.md](docs/job2-log-search.md), [docs/job3-test-suites.md](docs/job3-test-suites.md).
To see the code Claude wrote, press **Ctrl+O** to open the transcript viewer and expand the **Code** row.

`CLAUDE.md` asks Claude to make changes with its edit tool rather than `sed` or scripts, so every change shows up as a reviewable diff. This applies with Code Mode off and on, so both runs do the same kind of work.

Claude Code may ask you to approve some commands (in my runs, each `npm run test:...` and some compound search commands). Pick **Yes** (option 1). Time at prompts isn't counted in the working time, but it does count toward Code Mode's ten-minute cap.

`./scripts/reset.sh` puts every job back to its starting state. Job 2's logs are generated on first run (deterministic; the answer key is in `job2-logs/.answer.json`).

## Measuring off vs on
`./prove-savings.sh` runs Job 3 twice as normal interactive sessions (Code Mode off, then on). Claude starts with the prompt already typed; when it has answered, type `/exit`. The script then reads both sessions' local transcript files in `~/.claude/projects/` and prints tool calls, model turns, working time, how much tool output went back to Claude, and token counts (what each row means: [docs/measure-yourself.md](docs/measure-yourself.md)). It never reads your account, plan or usage pages. If the first Code Mode start asks you to confirm and restarts without the prompt, type `/job3-tests`.

To compare any two sessions yourself, for any job: [docs/measure-yourself.md](docs/measure-yourself.md).

## Safety
- `.claude/settings.json` registers a **PreToolUse hook** (`.claude/hooks/guard-bash.mjs`) that blocks `rm` and `git push`. Try `/hook-demo` with Code Mode on to watch it block both from inside Claude's code. In Code Mode every tool call inside Claude's code still goes through your hooks under its usual name (`Bash`), but a command can arrive wrapped, like `cd 'app' && git push`, so the hook checks **every part** of a compound command. Test it: `npm run test:hook`.
- Text-matching rules and hooks can be dodged by rewording a command. For hard limits, use sandboxing.
- Team admins can keep Code Mode off for everyone with managed settings: [docs/managed-settings-off.json](docs/managed-settings-off.json). Managed settings can't turn it on.
- See [docs/safety.md](docs/safety.md) and the full documented limits in [docs/limits.md](docs/limits.md).

## Results
My own off vs on numbers are in [docs/results.md](docs/results.md). Yours will vary with the model, the job and the day.

Not affiliated with Anthropic. Claude and Claude Code are trademarks of Anthropic.

## License
MIT

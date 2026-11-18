# Measuring off vs on yourself

`./prove-savings.sh` does this for Job 3. For any job, or any two sessions:

```bash
./scripts/reset.sh
M=$(mktemp); ./run-code-mode-off.sh      # type the job's slash command, wait for the answer, then /exit
node scripts/find-session.mjs "$PWD" "$M" > /tmp/off.path

./scripts/reset.sh
M=$(mktemp); ./run-code-mode.sh          # same slash command, then /exit
node scripts/find-session.mjs "$PWD" "$M" > /tmp/on.path

node scripts/compare-sessions.mjs "$(cat /tmp/off.path)" "$(cat /tmp/on.path)"
```
For a cleaner comparison, use two fresh clones instead of `reset.sh`, so neither run sees the other's changes.

## What the table means
All numbers come from the two sessions' local transcript files in `~/.claude/projects/`. Nothing reads your account, plan or usage pages.

| Row | Meaning |
| --- | --- |
| Tool calls Claude asked for | Tool calls in Claude's own replies. With Code Mode on, one piece of code counts as one (shown as "code"). |
| Tool calls that ran | Every search, edit and command that actually ran, including the ones made from inside Claude's code. |
| Model turns | Replies Claude generated to finish the job. Each turn re-reads the conversation so far. |
| Working time (Claude's timer) | Claude Code's own turn timer (the "Cooked for 9s" line). It leaves out time waiting on you at permission prompts. |
| Tool output read by Claude (chars) | How much tool output was sent back to Claude. With Code Mode on, output that stayed inside the code isn't counted, because Claude never read it. |
| Context added during the job (tokens) | How much the conversation grew from the first turn to the last. |
| Tokens in, all turns (incl. cached) | Input tokens summed over all turns, including cached reads. |
| Tokens out | Output tokens Claude generated, thinking included. |

The table also prints the context size at the first turn. With Code Mode on, Claude started from a smaller context in my runs (about 25,000-29,000 tokens against 41,000-53,000 with it off), so part of any token difference comes from that, on every turn.

## How Code Mode shows up in a transcript (Claude Code 2.1.327)
- Claude's code is one tool call named `REPL`; the JavaScript is in `input.code`.
- The calls the code made are written after it as extra entries with zero token usage and an empty result, because their output went to the code, not to Claude.
- Each session file has `repl-mode` entries saying whether Code Mode was on.
These details aren't a documented format and may change between versions.

Your numbers will vary with the model, the job and the day. Run each side more than once if you want to be sure.

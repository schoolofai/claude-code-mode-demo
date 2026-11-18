# Safety: rules, hooks and auto mode in Code Mode

## What still applies inside Claude's code
Every tool call that Claude's code makes still goes through your `deny` and `ask` permission rules and your `PreToolUse` hooks, under the tool's usual name (for example `Bash`).

## The hook in this repo
`.claude/settings.json` registers `.claude/hooks/guard-bash.mjs` for `Bash` calls. It blocks `rm`, `rmdir`, `unlink`, `find -delete` and `git push`.

In Code Mode a command can reach your hook wrapped, for example `cd 'app' && git push`. So the hook splits each command on `&&`, `||`, `;`, `|`, `&`, newlines, `$( )` and backticks, strips wrappers like `sudo`, `env` and `xargs`, and checks **every part**.

Test it without Claude: `npm run test:hook` (19 cases, including the compound forms).

See it work in Claude: start `./run-code-mode.sh` and type `/hook-demo`. In my run (Claude Code 2.1.327, Code Mode on), Claude wrote one piece of code that tried `rm -rf job1-rename/tmp` and then `git push origin HEAD`. The hook blocked both calls from inside the code:
```
Blocked by repo hook: "rm -rf job1-rename/tmp" deletes files. Ask the user to delete it themselves.
Blocked by repo hook: "git push origin HEAD" pushes to a remote. Pushing is a human step in this repo.
```
Nothing was deleted and nothing was pushed.

## Checking the code itself
To check Claude's JavaScript before it runs, add a `PreToolUse` hook that matches `REPL` (the tool that runs the code) and read the code from `tool_input.code`.

## Gotchas
- If a hook fails or times out on a call from code, that call is refused. Give slow hooks a longer `timeout`, or set `"onFailure": "continue"` if a failure should let the call through.
- Text-matching rules and hooks can be dodged by rewording a command. For hard limits, use sandboxing.
- Auto mode's classifier reviews each piece of code once, not each call, and can't see values the code works out at run time. Anything you must control belongs in a rule or a hook.

## Keeping Code Mode off for a team
Put [managed-settings-off.json](managed-settings-off.json) in your organisation's managed settings:
```json
{ "env": { "CLAUDE_CODE_EXPERIMENTAL_CODE_MODE": "0" } }
```
People already in a Code Mode session stay in it until they exit or restart. Managed settings can't turn Code Mode on for people.

# Code Mode limits and requirements

Code Mode is experimental and off by default, and it may change or be removed in any release. This list follows Anthropic's docs as of 18 Nov 2026 (Claude Code 2.1.327). Check the current page before you rely on it: https://code.claude.com/docs/en/code-mode

## The limits you're most likely to hit
- **Ten-minute cap.** If Claude waits on its code, the code stops after ten minutes, *including time you spend at permission prompts*.
- **Background code, up to two hours.** If the session started in auto mode or bypassPermissions mode, code can run in the background for up to two hours.
- **Interactive terminal only.** Not with `claude -p`, the Agent SDK, the VS Code panel, the Desktop app or the cloud.
- **Account type.** A Claude subscription or a Console account. Not through an LLM gateway, Amazon Bedrock, Claude Platform on AWS, Google Cloud's Agent Platform, Claude Models on Google Cloud or Microsoft Foundry.
- **Resuming.** You can resume a Code Mode session only in the terminal, with Code Mode on.

## The full documented list
- **Resuming**: only in the terminal, with Code Mode on. Where Code Mode isn't available, the session can't be resumed: cloud sessions and the Claude apps can't continue it, and older Claude Code versions may open it but not work properly in it.
- **Auto mode**: the auto mode classifier reviews each piece of code once, before it runs, not each tool call the code makes, so it can't see values the code works out as it runs.
- **Long-running code**: unless code can run in the background, you wait for it and it stops after ten minutes (permission prompts included). Background code can run for up to two hours (session started in auto or bypassPermissions mode).
- **Hooks**: a tool call from code is refused when a `PreToolUse` hook fails or times out (unless the hook sets `"onFailure": "continue"`), and a `UserPromptSubmit` hook can withhold code output.
- **Unavailable features**: Remote Control, Claude in Chrome and computer use.
- **Moving the session**: you can't move it to the Desktop app or turn it into a background session, and `/fork` can't start a background copy.

## Requirements
- Claude Code **2.1.323 or later** (on the `stable` channel it may not have arrived yet: wait, or switch to `latest`). Agent teams together with Code Mode need 2.1.326 or later.
- The **native build** (the standard installer, or the npm package, which installs the same native binary).
- Models: Opus 5.5, Sonnet 5.5, Haiku 5.5, Fable 5.2.
- Not for organisations with a HIPAA configuration or zero data retention.
- Won't start with an API key helper, OpenTelemetry export or `DISABLE_TELEMETRY` set.
- Windows needs Git for Windows.

## What I saw in this repo (Claude Code 2.1.327)
- The first time Code Mode starts, Claude Code asks you to confirm ("Yes, turn on Code Mode") and restarts. After that, each session shows: `Code Mode (experimental) is on · this session can be resumed only with Code Mode on`.
- Code Mode refused to start ("Claude Code couldn't read your organization's settings or policy") when Claude Code wasn't signed in to a Claude account. Signing in with `/login` fixed it.
- Claude Code asked me to approve `npm run test:...` commands even though `.claude/settings.json` allows `Bash(npm run test:*)`, with Code Mode off and on. Pick **Yes** (option 1) to keep runs comparable. Time spent at prompts counts toward the ten-minute cap.

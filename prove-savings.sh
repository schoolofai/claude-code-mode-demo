#!/usr/bin/env bash
# Runs Job 3 twice in this repo, Code Mode OFF then ON, and prints the difference side by side.
# Code Mode doesn't work with `claude -p`, so each run is a normal interactive session:
# Claude starts with the Job 3 prompt already typed in. When it has answered, type /exit.
# The numbers come only from the two sessions' local transcript files (~/.claude/projects/...).
# Nothing here reads your account, plan or usage pages.
set -euo pipefail
cd "$(dirname "$0")"
source scripts/lib.sh
check_claude
ensure_setup

PROMPT="$(sed -n '/^---$/,/^---$/!p' .claude/commands/job3-tests.md | sed '/^\s*$/d')"
OUT=.prove-savings; mkdir -p "$OUT"

run_one() { # run_one off|on
  local mode="$1" marker="$OUT/start-$1"
  touch "$marker"
  echo; echo "──── Run $([ "$mode" = off ] && echo 1 || echo 2) of 2: Code Mode $(echo "$mode" | tr a-z A-Z) ────"
  echo "Claude starts with the Job 3 prompt. When it has answered, type /exit"
  read -r -p "Press Enter to start... " _
  if [ "$mode" = off ]; then ./run-code-mode-off.sh "$PROMPT"; else ./run-code-mode.sh "$PROMPT"; fi
  node scripts/find-session.mjs "$PWD" "$marker" > "$OUT/session-$mode.path"
}

run_one off
run_one on
echo
node scripts/compare-sessions.mjs "$(cat "$OUT/session-off.path")" "$(cat "$OUT/session-on.path")"

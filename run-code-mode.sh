#!/usr/bin/env bash
# Starts Claude Code in this repo with Code Mode ON (experimental, opt-in).
# A project's settings can't turn Code Mode on, so this launcher sets the variable for this one run.
# Anything you pass is handed to claude, e.g.  ./run-code-mode.sh "/job1-currency"
set -euo pipefail
cd "$(dirname "$0")"
source scripts/lib.sh
check_claude
ensure_setup
echo "Claude Code $CLAUDE_VERSION · starting with Code Mode ON (experimental)"
CLAUDE_CODE_EXPERIMENTAL_CODE_MODE=1 exec claude "$@"

#!/usr/bin/env bash
# Starts Claude Code in this repo with Code Mode OFF (a 0 always wins over a 1 set elsewhere).
set -euo pipefail
cd "$(dirname "$0")"
source scripts/lib.sh
check_claude
ensure_setup
echo "Claude Code $CLAUDE_VERSION · starting with Code Mode OFF"
CLAUDE_CODE_EXPERIMENTAL_CODE_MODE=0 exec claude "$@"

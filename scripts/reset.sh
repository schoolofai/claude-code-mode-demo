#!/usr/bin/env bash
# Puts all three jobs back to their starting state (re-seeds Job 1's code, restores Job 2's docs and Job 3's suites).
set -euo pipefail
cd "$(dirname "$0")/.."
node scripts/seed-job1.mjs
git checkout -- job2-docs job3-tests 2>/dev/null || true
echo "Reset done."

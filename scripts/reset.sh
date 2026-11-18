#!/usr/bin/env bash
# Puts all three jobs back to their starting state (re-seeds Job 1 code and Job 2 logs).
set -euo pipefail
cd "$(dirname "$0")/.."
node scripts/seed-job1.mjs
node scripts/seed-job2.mjs
git checkout -- job3-tests 2>/dev/null || true
echo "Reset done."

#!/usr/bin/env bash
# Shared helpers for the launchers. Sourced, not run.
MIN_VERSION="2.1.323"

version_ge() { # version_ge A B -> true if A >= B
  [ "$(printf '%s\n%s\n' "$2" "$1" | sort -V | head -n1)" = "$2" ]
}

check_claude() {
  if ! command -v claude >/dev/null 2>&1; then
    echo "Claude Code isn't installed. See https://code.claude.com/docs/en/setup" >&2; exit 1
  fi
  local v; v="$(claude --version 2>/dev/null | awk '{print $1}')"
  if ! version_ge "$v" "$MIN_VERSION"; then
    echo "Claude Code $v is too old: Code Mode needs $MIN_VERSION or later." >&2
    echo "Run: claude update   (on the stable channel? wait for it to catch up, or switch to latest)" >&2
    exit 1
  fi
  CLAUDE_VERSION="$v"
}

ensure_setup() {
  if [ ! -d node_modules ]; then echo "Installing test dependencies (first run only)..."; npm install --silent --no-audit --no-fund >/dev/null 2>&1 || npm install --no-audit --no-fund; fi
}

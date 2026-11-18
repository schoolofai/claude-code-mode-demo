#!/usr/bin/env node
// PreToolUse hook: blocks `rm` and `git push` in Bash tool calls.
// In Code Mode, every tool call inside Claude's code still reaches this hook as "Bash",
// and a command can arrive wrapped, e.g. `cd 'app' && git push`. So we check EVERY part
// of a compound command (&&, ||, ;, |, &, newlines, $( ), backticks), not just the start.
// Exit code 2 + a message on stderr = block the call and tell Claude why.
import { readFileSync } from "node:fs";

export function splitCommand(cmd) {
  // Pull out $( ... ) and `...` bodies so they are checked too.
  const parts = [];
  const sub = /\$\(([^()]*)\)|`([^`]*)`/g;
  let m;
  while ((m = sub.exec(cmd))) parts.push(...splitCommand(m[1] ?? m[2]));
  const flat = cmd.replace(sub, " ");
  for (const p of flat.split(/&&|\|\||;|\||&|\n|\(|\)|\{|\}/)) {
    const t = p.trim();
    if (t) parts.push(t);
  }
  return parts;
}

function words(part) {
  // Drop quotes, leading VAR=value assignments and wrappers like sudo/env/command/xargs/exec.
  const w = part.replace(/["']/g, "").split(/\s+/).filter(Boolean);
  while (w.length && (/^[A-Za-z_][A-Za-z0-9_]*=/.test(w[0]) || ["sudo", "env", "command", "exec", "xargs", "nohup", "time", "builtin"].includes(w[0]) || (w[0].startsWith("-") ))) w.shift();
  return w;
}

export function verdict(cmd) {
  for (const part of splitCommand(cmd)) {
    const w = words(part);
    if (!w.length) continue;
    const bin = w[0].split("/").pop();
    if (bin === "rm" || bin === "rmdir" || bin === "unlink") return `Blocked by repo hook: "${part}" deletes files. Ask the user to delete it themselves.`;
    if (bin === "find" && w.includes("-delete")) return `Blocked by repo hook: "${part}" deletes files.`;
    if (bin === "git") {
      const sub = w.slice(1).find((x, i, a) => !x.startsWith("-") && !(i > 0 && ["-C", "-c", "--git-dir", "--work-tree"].includes(a[i - 1])));
      if (sub === "push") return `Blocked by repo hook: "${part}" pushes to a remote. Pushing is a human step in this repo.`;
    }
  }
  return null;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  let input = {};
  try { input = JSON.parse(readFileSync(0, "utf8") || "{}"); } catch { /* not JSON: allow */ }
  const cmd = input?.tool_input?.command ?? "";
  const why = cmd ? verdict(cmd) : null;
  if (why) { process.stderr.write(why + "\n"); process.exit(2); }
  process.exit(0);
}

#!/usr/bin/env node
// Finds the Claude Code transcript (JSONL) for the session just run in a folder.
// Usage: find-session.mjs <project dir> <marker file created just before the run>
// Looks in ~/.claude/projects (or $CLAUDE_CONFIG_DIR/projects) for transcripts newer than the
// marker whose "cwd" is this folder, and picks the one with the most assistant messages.
import { readdirSync, statSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

const [dir, marker] = process.argv.slice(2);
const since = statSync(marker).mtimeMs;
const base = join(process.env.CLAUDE_CONFIG_DIR || join(homedir(), ".claude"), "projects");
let best = null;
for (const p of readdirSync(base)) {
  let files = [];
  try { files = readdirSync(join(base, p)).filter((f) => f.endsWith(".jsonl")); } catch { continue; }
  for (const f of files) {
    const file = join(base, p, f);
    if (statSync(file).mtimeMs < since) continue;
    let cwdMatch = false, assistants = 0;
    for (const line of readFileSync(file, "utf8").split("\n")) {
      if (!line) continue;
      let d; try { d = JSON.parse(line); } catch { continue; }
      if (d.cwd === dir) cwdMatch = true;
      if (d.type === "assistant") assistants++;
    }
    if (cwdMatch && assistants && (!best || assistants > best.assistants)) best = { file, assistants };
  }
}
if (!best) { console.error("No transcript found for this run. Did Claude answer before you typed /exit?"); process.exit(1); }
console.log(best.file);

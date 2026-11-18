#!/usr/bin/env node
// Reads two Claude Code transcript files (JSONL) and prints them side by side.
// Usage: compare-sessions.mjs <off.jsonl> <on.jsonl> [--json]
// Only local transcript data is used: message types, tool calls and timestamps.
import { readFileSync } from "node:fs";

export function analyse(file) {
  const rows = readFileSync(file, "utf8").split("\n").filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
  const main = rows.filter((d) => !d.isSidechain);
  const msgIds = new Set();
  const toolUses = [];
  const toolNames = {};
  let resultChars = 0, firstPrompt = null, lastAssistant = null, codeMode = false, model = null;
  const innerCalls = [];
  for (const d of main) {
    if (d.type === "system" && /Code Mode/i.test(JSON.stringify(d).slice(0, 2000))) codeMode = true;
    if (d.type === "user") {
      const c = d.message?.content;
      const isPrompt = typeof c === "string" ? !c.startsWith("<") : Array.isArray(c) && c.some((b) => b.type === "text" && !String(b.text).startsWith("<"));
      const hasResult = Array.isArray(c) && c.some((b) => b.type === "tool_result");
      if (isPrompt && !hasResult && !d.isMeta && firstPrompt === null) firstPrompt = Date.parse(d.timestamp);
      if (Array.isArray(c)) for (const b of c) if (b.type === "tool_result") {
        const body = typeof b.content === "string" ? b.content : JSON.stringify(b.content ?? "");
        resultChars += body.length;
      }
    }
    if (d.type === "assistant" && d.message) {
      if (d.message.id) msgIds.add(d.message.id);
      model = d.message.model || model;
      lastAssistant = Date.parse(d.timestamp);
      for (const b of d.message.content || []) if (b.type === "tool_use") {
        toolUses.push(b);
        toolNames[b.name] = (toolNames[b.name] || 0) + 1;
        if (b.name === "REPL") codeMode = true;
      }
    }
    // Calls made from inside Code Mode code, if the transcript records them.
    const tur = d.toolUseResult;
    if (tur && typeof tur === "object" && Array.isArray(tur.toolCalls)) innerCalls.push(...tur.toolCalls);
  }
  return {
    file, model, codeMode,
    toolCalls: toolUses.length,
    toolNames,
    innerCalls: innerCalls.length,
    turns: msgIds.size,
    seconds: firstPrompt && lastAssistant ? Math.round((lastAssistant - firstPrompt) / 1000) : null,
    resultChars,
  };
}

const fmtTime = (s) => (s == null ? "?" : s >= 60 ? `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, "0")}s` : `${s}s`);

if (import.meta.url === `file://${process.argv[1]}`) {
  const [offFile, onFile] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const off = analyse(offFile), on = analyse(onFile);
  if (process.argv.includes("--json")) { console.log(JSON.stringify({ off, on }, null, 2)); process.exit(0); }
  const rows = [
    ["Tool calls Claude made", off.toolCalls, on.toolCalls],
    ["Model turns", off.turns, on.turns],
    ["Wall time (prompt → last reply)", fmtTime(off.seconds), fmtTime(on.seconds)],
    ["Tool output sent back (chars)", off.resultChars.toLocaleString("en-GB"), on.resultChars.toLocaleString("en-GB")],
  ];
  const w = [34, 16, 16];
  const line = (a) => a.map((x, i) => String(x).padEnd(w[i])).join("│ ");
  console.log(line(["", "Code Mode OFF", "Code Mode ON"]));
  console.log("─".repeat(w[0]) + "┼" + "─".repeat(w[1] + 1) + "┼" + "─".repeat(w[2] + 1));
  for (const r of rows) console.log(line(r));
  console.log(`\nTools used  OFF: ${JSON.stringify(off.toolNames)}  ON: ${JSON.stringify(on.toolNames)}`);
  if (!on.codeMode) console.log("Note: the ON transcript shows no Code Mode activity (no REPL tool call).");
  console.log("Your numbers will vary with the model, the job and the day.");
}

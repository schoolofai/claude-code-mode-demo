#!/usr/bin/env node
// Reads two Claude Code transcript files (JSONL) and prints them side by side.
// Usage: compare-sessions.mjs <off.jsonl> <on.jsonl> [--json]
// Only local transcript data is used: messages, tool calls, token counts and timings.
// Nothing here reads your account, plan or usage pages.
//
// How a transcript records Code Mode (Claude Code 2.1.327):
// - A real model reply has a message id starting "msg_" and token usage.
// - Claude's code is one tool call named REPL. The tool calls the code makes are written
//   afterwards as extra entries with a non-"msg_" id, zero usage and an empty tool result
//   (their output went to the code, not to Claude). We count those as "calls run inside code".
import { readFileSync } from "node:fs";

export function analyse(file) {
  const rows = readFileSync(file, "utf8").split("\n").filter(Boolean)
    .map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
  const turns = new Map(); // msg id -> usage
  const toolNames = {};
  const topIds = new Set();
  let byClaude = 0, inner = 0, repl = 0, resultChars = 0, workMs = 0, codeMode = false, model = null;
  let firstPrompt = null, lastAssistant = null;
  for (const d of rows) {
    if (d.isSidechain) continue;
    if (d.type === "repl-mode" && d.replMode) codeMode = true;
    if (d.type === "system" && d.subtype === "turn_duration") workMs += d.durationMs || 0;
    if (d.type === "user" && firstPrompt === null && !d.isMeta) {
      const c = d.message?.content;
      const text = typeof c === "string" ? c : Array.isArray(c) ? c.filter((b) => b.type === "text").map((b) => b.text).join("") : "";
      if (text && !(Array.isArray(c) && c.some((b) => b.type === "tool_result")) && !/^<local-command/.test(text)) firstPrompt = Date.parse(d.timestamp);
    }
    if (d.type !== "assistant" || !d.message) continue;
    const m = d.message;
    const real = typeof m.id === "string" && m.id.startsWith("msg_");
    if (real) { turns.set(m.id, m.usage || {}); model = m.model || model; lastAssistant = Date.parse(d.timestamp); }
    for (const b of m.content || []) {
      if (b.type !== "tool_use") continue;
      if (real) { byClaude++; topIds.add(b.id); if (b.name === "REPL") { repl++; codeMode = true; continue; } }
      else inner++;
      toolNames[b.name] = (toolNames[b.name] || 0) + 1;
    }
  }
  // Tool output that went back to Claude = results of Claude's own calls (not of calls made inside code).
  for (const d of rows) {
    if (d.isSidechain || d.type !== "user" || !Array.isArray(d.message?.content)) continue;
    for (const b of d.message.content) if (b.type === "tool_result" && topIds.has(b.tool_use_id)) {
      resultChars += (typeof b.content === "string" ? b.content : JSON.stringify(b.content ?? "")).length;
    }
  }
  let inTok = 0, outTok = 0, freshIn = 0;
  const ctx = [...turns.values()].map((u) => (u.input_tokens || 0) + (u.cache_creation_input_tokens || 0) + (u.cache_read_input_tokens || 0));
  for (const u of turns.values()) {
    const fresh = (u.input_tokens || 0) + (u.cache_creation_input_tokens || 0);
    freshIn += fresh; inTok += fresh + (u.cache_read_input_tokens || 0); outTok += u.output_tokens || 0;
  }
  return {
    file, model, codeMode,
    turns: turns.size,
    toolCallsByClaude: byClaude, replCalls: repl, innerCalls: inner,
    toolCallsRun: byClaude - repl + inner,
    toolNames,
    resultChars,
    inputTokens: inTok, newInputTokens: freshIn, outputTokens: outTok,
    contextStart: ctx[0] ?? 0, contextEnd: ctx[ctx.length - 1] ?? 0,
    contextAdded: ctx.length ? ctx[ctx.length - 1] - ctx[0] : 0,
    workSeconds: Math.round(workMs / 1000),
    wallSeconds: firstPrompt && lastAssistant ? Math.round((lastAssistant - firstPrompt) / 1000) : null,
  };
}

const fmtTime = (s) => (s == null ? "?" : s >= 60 ? `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, "0")}s` : `${s}s`);
const n = (x) => Number(x).toLocaleString("en-GB");

if (import.meta.url === `file://${process.argv[1]}`) {
  const [offFile, onFile] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  if (!offFile || !onFile) { console.error("Usage: compare-sessions.mjs <off.jsonl> <on.jsonl> [--json]"); process.exit(1); }
  const off = analyse(offFile), on = analyse(onFile);
  if (process.argv.includes("--json")) { console.log(JSON.stringify({ off, on }, null, 2)); process.exit(0); }
  const rows = [
    ["Tool calls Claude asked for", off.toolCallsByClaude, on.toolCallsByClaude + (on.replCalls ? ` (${on.replCalls} code)` : "")],
    ["Tool calls that ran", off.toolCallsRun, on.toolCallsRun],
    ["Model turns", off.turns, on.turns],
    ["Working time (Claude's timer)", fmtTime(off.workSeconds), fmtTime(on.workSeconds)],
    ["Tool output read by Claude (chars)", n(off.resultChars), n(on.resultChars)],
    ["Context added during the job (tokens)", n(off.contextAdded), n(on.contextAdded)],
    ["Tokens in, all turns (incl. cached)", n(off.inputTokens), n(on.inputTokens)],
    ["Tokens out", n(off.outputTokens), n(on.outputTokens)],
  ];
  const w = [38, 16, 16];
  const line = (a) => a.map((x, i) => String(x).padEnd(w[i])).join("│ ");
  console.log(line(["", "Code Mode OFF", "Code Mode ON"]));
  console.log("─".repeat(w[0]) + "┼" + "─".repeat(w[1] + 1) + "┼" + "─".repeat(w[2] + 1));
  for (const r of rows) console.log(line(r));
  if (!on.codeMode) console.log("\nNote: the ON transcript shows no Code Mode activity (no REPL tool call).");
  if (off.codeMode) console.log("\nNote: the OFF transcript shows Code Mode activity. Was it really off?");
  console.log(`\nContext at the first turn: OFF ${n(off.contextStart)} tokens, ON ${n(on.contextStart)} tokens (what Claude starts with differs by mode).`);
  console.log("Working time leaves out time spent waiting on you at permission prompts.");
  console.log("Your numbers will vary with the model, the job and the day.");
}

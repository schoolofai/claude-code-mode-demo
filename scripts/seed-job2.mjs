#!/usr/bin/env node
// Seeds Job 2: a big folder of made-up server logs (deterministic, ~120 files).
// Question for Claude: which request IDs failed (HTTP 5xx) more than three times?
// The answer key is written to job2-logs/.answer.json (git-ignored) so you can check Claude.
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";

const dir = new URL("../job2-logs/logs/", import.meta.url).pathname;
rmSync(dir, { recursive: true, force: true });
mkdirSync(dir, { recursive: true });

let seed = 20261118;
const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
const pick = (a) => a[Math.floor(rnd() * a.length)];

const services = ["api", "auth", "billing", "search", "worker", "gateway"];
const paths = ["/v1/orders", "/v1/users", "/v1/cart", "/v1/pay", "/v1/search", "/health", "/v1/login"];
const levels = ["INFO", "INFO", "INFO", "DEBUG", "WARN"];
// A handful of "bad" request IDs fail repeatedly; everything else fails at most 3 times.
const bad = { "req-7f3a9c": 9, "req-b21e04": 7, "req-c0ffee": 5, "req-5d8812": 4 };
const nearMiss = ["req-a11a11", "req-9e0e12", "req-77b3d0"]; // exactly 3 failures each
const fails = {};
const rid = () => "req-" + Math.floor(rnd() * 0xffffff).toString(16).padStart(6, "0");

const FILES = 120, LINES = 1500;
const lines = Array.from({ length: FILES }, () => []);
let t = Date.UTC(2026, 10, 17, 0, 0, 0);
for (let f = 0; f < FILES; f++) {
  for (let i = 0; i < LINES; i++) {
    t += 1000 + Math.floor(rnd() * 400);
    let id = rid(), status = rnd() < 0.985 ? pick([200, 200, 200, 201, 204, 304, 404]) : pick([500, 502, 503]);
    if (status >= 500) {
      // keep random 5xx IDs at 1 failure (fresh random id each time)
      fails[id] = (fails[id] || 0) + 1;
      if (fails[id] > 3) { status = 200; fails[id]--; }
    }
    const ts = new Date(t).toISOString();
    lines[f].push(`${ts} ${pick(levels)} service=${pick(services)} request_id=${id} method=${pick(["GET", "POST"])} path=${pick(paths)} status=${status} latency_ms=${Math.floor(rnd() * 900)}`);
  }
}
const inject = (id, n) => {
  for (let k = 0; k < n; k++) {
    const f = Math.floor(rnd() * FILES), i = Math.floor(rnd() * LINES);
    const ts = lines[f][i].slice(0, 24);
    lines[f].splice(i, 0, `${ts} ERROR service=${pick(services)} request_id=${id} method=POST path=${pick(paths)} status=${pick([500, 502, 503])} latency_ms=${Math.floor(rnd() * 5000)} msg="upstream failed"`);
    fails[id] = (fails[id] || 0) + 1;
  }
};
for (const [id, n] of Object.entries(bad)) inject(id, n);
for (const id of nearMiss) inject(id, 3);
for (let f = 0; f < FILES; f++) {
  const name = `${pick(services)}-${String(f).padStart(3, "0")}.log`;
  writeFileSync(join(dir, name), lines[f].join("\n") + "\n");
}
const answer = Object.entries(fails).filter(([, n]) => n > 3).sort((a, b) => b[1] - a[1]);
writeFileSync(new URL("../job2-logs/.answer.json", import.meta.url), JSON.stringify(Object.fromEntries(answer), null, 2) + "\n");
const total = lines.reduce((a, l) => a + l.length, 0);
console.log(`job2: seeded ${FILES} log files, ${total} lines, ${Object.values(fails).reduce((a, b) => a + b, 0)} failed requests`);

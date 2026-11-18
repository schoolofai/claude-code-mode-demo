#!/usr/bin/env node
// Tests for .claude/hooks/guard-bash.mjs, including the compound forms Code Mode can send.
import { spawnSync } from "node:child_process";
const hook = new URL("../.claude/hooks/guard-bash.mjs", import.meta.url).pathname;
const run = (command) => spawnSync("node", [hook], { input: JSON.stringify({ tool_name: "Bash", tool_input: { command } }) }).status;
const cases = [
  ["rm -rf tmp", 2], ["cd 'app' && git push", 2], ["git push origin main", 2], ["git -C app push", 2],
  ["ls && rm notes.txt", 2], ["echo hi; /bin/rm -f x", 2], ["sudo rm x", 2], ["FOO=1 rm x", 2],
  ["echo $(rm x)", 2], ["find . -name '*.tmp' -delete", 2], ["cd app || git push --force", 2], ["ls | xargs rm", 2],
  ["git status", 0], ["git commit -m 'push docs'", 0], ["npm run test:billing", 0], ["rg -l formatPrice src", 0],
  ["echo 'remove the rm call'", 0], ["git log --oneline | head", 0], ["cat README.md", 0],
];
let fail = 0;
for (const [cmd, want] of cases) {
  const got = run(cmd);
  const ok = got === want;
  if (!ok) fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${want === 2 ? "block" : "allow"}  ${cmd}`);
}
console.log(fail ? `\n${fail} hook test(s) failed` : `\nAll ${cases.length} hook tests passed`);
process.exit(fail ? 1 : 0);

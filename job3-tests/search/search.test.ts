import { describe, it, expect } from "vitest";
import { slow } from "../helpers";

const docs = ["Claude Code", "Code Mode", "hooks and rules", "managed settings", "test suites"];
const search = (q: string) => docs.filter((d) => d.toLowerCase().includes(q.toLowerCase()));

describe("search", () => {
  it("finds exact words", async () => { await slow(2500); expect(search("hooks")).toEqual(["hooks and rules"]); });
  it("is case-insensitive", async () => { await slow(2500); expect(search("code")).toHaveLength(2); });
  it("returns nothing for unknown words", async () => { await slow(2500); expect(search("zebra")).toEqual([]); });
  it("matches partial words", async () => { await slow(2500); expect(search("sett")).toEqual(["managed settings"]); });
});

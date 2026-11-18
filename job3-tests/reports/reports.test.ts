import { describe, it, expect } from "vitest";
import { slow } from "../helpers";

const weeklyAverage = (days: number[]) => days.reduce((a, b) => a + b, 0) / 7;

describe("reports", () => {
  it("averages a full week", async () => { await slow(2500); expect(weeklyAverage([7, 7, 7, 7, 7, 7, 7])).toBe(7); });
  it("treats missing days as zero", async () => { await slow(2500); expect(weeklyAverage([14])).toBe(2); });
  it("formats a percentage", async () => { await slow(2500); expect((0.256 * 100).toFixed(1) + "%").toBe("25.6%"); });
  // Seeded failing test: a part week should average over the days given (expected 7), but the code divides by 7.
  it("averages a part week over the days given", async () => { await slow(2500); expect(weeklyAverage([10, 4])).toBe(7); });
});

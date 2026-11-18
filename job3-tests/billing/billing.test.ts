import { describe, it, expect } from "vitest";
import { slow } from "../helpers";

const invoiceTotal = (lines: { qty: number; unitMinor: number }[], vatRate = 0.2) =>
  Math.round(lines.reduce((s, l) => s + l.qty * l.unitMinor, 0) * (1 + vatRate));

describe("billing", () => {
  it("adds VAT to an invoice", async () => { await slow(2500); expect(invoiceTotal([{ qty: 2, unitMinor: 1000 }])).toBe(2400); });
  it("handles an empty invoice", async () => { await slow(2500); expect(invoiceTotal([])).toBe(0); });
  it("supports zero-rated items", async () => { await slow(2500); expect(invoiceTotal([{ qty: 1, unitMinor: 999 }], 0)).toBe(999); });
  it("rounds to the nearest penny", async () => { await slow(2500); expect(invoiceTotal([{ qty: 3, unitMinor: 333 }])).toBe(1199); });
});

import { describe, it, expect } from "vitest";
import { formatMoney, currencyFor } from "../lib/money";

describe("formatMoney", () => {
  it("formats pence as pounds", () => expect(formatMoney(1999, "GBP")).toBe("£19.99"));
  it("handles negatives", () => expect(formatMoney(-250, "GBP")).toBe("-£2.50"));
  it("uses other currencies", () => expect(formatMoney(1000, "EUR")).toBe("€10.00"));
  it("maps markets to currencies", () => expect(currencyFor("us")).toBe("USD"));
});

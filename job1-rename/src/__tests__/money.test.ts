import { describe, it, expect } from "vitest";
import { formatPrice } from "../lib/money";

describe("formatPrice", () => {
  it("formats pence as pounds", () => expect(formatPrice(1999)).toBe("£19.99"));
  it("handles zero", () => expect(formatPrice(0)).toBe("£0.00"));
  it("handles negatives", () => expect(formatPrice(-250)).toBe("-£2.50"));
  it("uses other currencies", () => expect(formatPrice(1000, "EUR")).toBe("€10.00"));
  it("adds thousands separators", () => expect(formatPrice(123456789)).toBe("£1,234,567.89"));
});

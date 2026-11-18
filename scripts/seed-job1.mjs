#!/usr/bin/env node
// Seeds Job 1: a small TypeScript shop project (~40 files) where formatPrice()
// is defined once and used everywhere. The job is to rename it to formatMoney.
// Deterministic: same files every time. Run via scripts/reset.sh.
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = new URL("../job1-rename/src/", import.meta.url).pathname;
rmSync(root, { recursive: true, force: true });
mkdirSync(join(root, "lib"), { recursive: true });
mkdirSync(join(root, "features"), { recursive: true });
mkdirSync(join(root, "__tests__"), { recursive: true });

writeFileSync(join(root, "lib/money.ts"), `// Money helpers shared by every feature.
export type Currency = "GBP" | "EUR" | "USD";

const SYMBOLS: Record<Currency, string> = { GBP: "£", EUR: "€", USD: "$" };

/** Formats an amount in minor units (pence/cents) for display, e.g. 1999 -> "£19.99". */
export function formatPrice(minor: number, currency: Currency = "GBP"): string {
  const sign = minor < 0 ? "-" : "";
  const abs = Math.abs(Math.round(minor));
  const major = Math.floor(abs / 100);
  const cents = String(abs % 100).padStart(2, "0");
  return \`\${sign}\${SYMBOLS[currency]}\${major.toLocaleString("en-GB")}.\${cents}\`;
}
`);

const features = [
  "cart", "checkout", "invoice", "receipt", "refund", "discount", "shipping", "tax",
  "wishlist", "catalog", "search", "productCard", "orderHistory", "subscription",
  "giftCard", "loyalty", "bundle", "upsell", "priceAlert", "compare", "quote",
  "storeCredit", "tip", "deposit", "layaway", "rental", "auction", "preorder",
  "voucher", "cashback", "budget", "split", "donation", "membership", "fee",
];
const cap = (s) => s[0].toUpperCase() + s.slice(1);

for (const [i, f] of features.entries()) {
  const base = 100 * (i + 3) + 99;
  writeFileSync(join(root, `features/${f}.ts`), `import { formatPrice, type Currency } from "../lib/money";

// ${cap(f)} feature: builds the label shown to the customer.
export function ${f}Label(amountMinor: number, currency: Currency = "GBP"): string {
  return "${cap(f)}: " + formatPrice(amountMinor, currency);
}

export function ${f}Total(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const ${f}Example = formatPrice(${base});
`);
}

writeFileSync(join(root, "index.ts"), features.map((f) => `export * from "./features/${f}";`).join("\n") + `\nexport { formatPrice } from "./lib/money";\n`);

writeFileSync(join(root, "__tests__/money.test.ts"), `import { describe, it, expect } from "vitest";
import { formatPrice } from "../lib/money";

describe("formatPrice", () => {
  it("formats pence as pounds", () => expect(formatPrice(1999)).toBe("£19.99"));
  it("handles zero", () => expect(formatPrice(0)).toBe("£0.00"));
  it("handles negatives", () => expect(formatPrice(-250)).toBe("-£2.50"));
  it("uses other currencies", () => expect(formatPrice(1000, "EUR")).toBe("€10.00"));
  it("adds thousands separators", () => expect(formatPrice(123456789)).toBe("£1,234,567.89"));
});
`);

writeFileSync(join(root, "__tests__/features.test.ts"), `import { describe, it, expect } from "vitest";
import { formatPrice } from "../lib/money";
${features.map((f) => `import { ${f}Label, ${f}Total } from "../features/${f}";`).join("\n")}

describe("feature labels", () => {
${features.map((f) => `  it("${f}", () => {
    expect(${f}Label(500)).toBe("${cap(f)}: " + formatPrice(500));
    expect(${f}Total([100, 250])).toBe("£3.50");
  });`).join("\n")}
});
`);
console.log(`job1: seeded ${features.length + 4} files in job1-rename/src`);

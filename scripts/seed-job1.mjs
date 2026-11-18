#!/usr/bin/env node
// Seeds Job 1: a TypeScript shop library (36 feature files) in job1-currency/src.
// formatMoney(minor, currency) no longer has a default currency, so every call that leaves it out must now pass
// the RIGHT currency for its context (see the prompt in .claude/commands/job1-currency.md):
//   the enclosing function's currency parameter if it has one (named `currency` or `cur`),
//   otherwise the file's STORE_CURRENCY constant, otherwise currencyFor(MARKET) if the file has MARKET, otherwise "GBP".
// Calls that already pass a currency stay as they are. The tests check every result.
// Deterministic: same files every time. Run via scripts/reset.sh.
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = new URL("../job1-currency/src/", import.meta.url).pathname;
rmSync(root, { recursive: true, force: true });
for (const d of ["lib", "features", "__tests__"]) mkdirSync(join(root, d), { recursive: true });

writeFileSync(join(root, "lib/money.ts"), `// Money helpers shared by every feature.
export type Currency = "GBP" | "EUR" | "USD";
export type Market = "uk" | "eu" | "us";

const SYMBOLS: Record<Currency, string> = { GBP: "£", EUR: "€", USD: "$" };
const MARKET_CURRENCY: Record<Market, Currency> = { uk: "GBP", eu: "EUR", us: "USD" };

/** The currency a market sells in. */
export function currencyFor(market: Market): Currency {
  return MARKET_CURRENCY[market];
}

/**
 * Formats an amount in minor units (pence/cents) for display, e.g. 1999, "GBP" -> "£19.99".
 * v2: \`currency\` is required. It used to default to GBP, which showed pounds to EU and US customers.
 */
export function formatMoney(minor: number, currency: Currency): string {
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
  "voucher", "cashback", "budget", "split", "donation", "membership", "fee", "insurance",
];
const cap = (s) => s[0].toUpperCase() + s.slice(1);
const SYM = { GBP: "£", EUR: "€", USD: "$" };
const MARKETS = { uk: "GBP", eu: "EUR", us: "USD" };
const fmt = (minor, cur) => {
  const s = minor < 0 ? "-" : ""; const a = Math.abs(Math.round(minor));
  return `${s}${SYM[cur]}${Math.floor(a / 100).toLocaleString("en-GB")}.${String(a % 100).padStart(2, "0")}`;
};
const meta = [];
for (const [i, f] of features.entries()) {
  const kind = ["store", "market", "none"][i % 3];
  const storeCur = ["EUR", "USD", "GBP", "EUR"][Math.floor(i / 3) % 4];
  const market = ["us", "eu", "uk", "eu"][Math.floor(i / 3) % 4];
  const ctx = kind === "store" ? storeCur : kind === "market" ? MARKETS[market] : "GBP";
  const p = i % 4 === 1 ? "cur" : "currency";       // parameter name varies
  const multiline = i % 2 === 0;                     // some calls span lines
  const already = i % 5 === 0;                        // one call already passes a currency
  const base = 100 * (i + 3) + 99;
  const head = kind === "store" ? `const STORE_CURRENCY: Currency = "${storeCur}";\n`
    : kind === "market" ? `const MARKET: Market = "${market}";\n` : "";
  const imports = kind === "market" ? `import { formatMoney, currencyFor, type Currency, type Market } from "../lib/money";`
    : `import { formatMoney, type Currency } from "../lib/money";`;
  const feeLine = multiline
    ? `  return formatMoney(\n    feeMinor + Math.round(amountMinor * ${(i % 7) + 1} / 100),\n  );`
    : `  return formatMoney(feeMinor + Math.round(amountMinor * ${(i % 7) + 1} / 100));`;
  const src = `${imports}

// ${cap(f)} feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.
${head}
const ${f.toUpperCase()}_LIMITS = { minMinor: 0, maxMinor: ${1000000 + i * 1000} };

/** Rejects amounts outside the ${f} limits. */
export function ${f}Valid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= ${f.toUpperCase()}_LIMITS.minMinor && amountMinor <= ${f.toUpperCase()}_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function ${f}Label(amountMinor: number, ${p}: Currency): string {
  if (!${f}Valid(amountMinor)) return "${cap(f)}: n/a";
  return "${cap(f)}: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function ${f}Total(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function ${f}Lines(itemsMinor: number[], ${p}: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus ${(i % 7) + 1}% of the amount. */
export function ${f}Fee(amountMinor: number, feeMinor: number, ${p}: Currency): string {
${feeLine}
}

/** Sorts amounts, largest first, without touching the input. */
export function ${f}Sorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}
${already ? `
/** Reference price, always quoted in euros for the EU price list. */
export function ${f}EuroReference(amountMinor: number): string {
  return formatMoney(amountMinor, "EUR");
}
` : ""}
export const ${f}Example = formatMoney(${base});
`;
  writeFileSync(join(root, `features/${f}.ts`), src);
  meta.push({ f, ctx, already, pct: (i % 7) + 1, base });
}

writeFileSync(join(root, "index.ts"), features.map((f) => `export * from "./features/${f}";`).join("\n") + `\nexport { formatMoney, currencyFor } from "./lib/money";\n`);

writeFileSync(join(root, "__tests__/money.test.ts"), `import { describe, it, expect } from "vitest";
import { formatMoney, currencyFor } from "../lib/money";

describe("formatMoney", () => {
  it("formats pence as pounds", () => expect(formatMoney(1999, "GBP")).toBe("£19.99"));
  it("handles negatives", () => expect(formatMoney(-250, "GBP")).toBe("-£2.50"));
  it("uses other currencies", () => expect(formatMoney(1000, "EUR")).toBe("€10.00"));
  it("maps markets to currencies", () => expect(currencyFor("us")).toBe("USD"));
});
`);

const T = meta.map(({ f, ctx, already, pct, base }) => {
  const fee = fmt(200 + Math.round(10000 * pct / 100), "USD");
  return `  it("${f}", () => {
    expect(${f}Label(500, "USD")).toBe("${cap(f)}: $5.00");
    expect(${f}Total([100, 250])).toBe("${fmt(350, ctx)}");
    expect(${f}Lines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(${f}Fee(10000, 200, "USD")).toBe("${fee}");
    expect(${f}Example).toBe("${fmt(base, ctx)}");${already ? `
    expect(${f}EuroReference(1234)).toBe("€12.34");` : ""}
  });`;
}).join("\n");
writeFileSync(join(root, "__tests__/features.test.ts"), `import { describe, it, expect } from "vitest";
${features.map((f) => `import * as ${f}M from "../features/${f}";`).join("\n")}
${features.map((f) => `const { ${f}Label, ${f}Total, ${f}Lines, ${f}Fee, ${f}Example${meta.find((m) => m.f === f).already ? `, ${f}EuroReference` : ""} } = ${f}M;`).join("\n")}

describe("every call passes the right currency", () => {
${T}
});
`);
console.log(`job1: seeded ${features.length + 4} files in job1-currency/src`);

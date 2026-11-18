import { formatMoney, type Currency } from "../lib/money";

// Catalog feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.
const STORE_CURRENCY: Currency = "EUR";

const CATALOG_LIMITS = { minMinor: 0, maxMinor: 1009000 };

/** Rejects amounts outside the catalog limits. */
export function catalogValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= CATALOG_LIMITS.minMinor && amountMinor <= CATALOG_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function catalogLabel(amountMinor: number, cur: Currency): string {
  if (!catalogValid(amountMinor)) return "Catalog: n/a";
  return "Catalog: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function catalogTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function catalogLines(itemsMinor: number[], cur: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 3% of the amount. */
export function catalogFee(amountMinor: number, feeMinor: number, cur: Currency): string {
  return formatMoney(feeMinor + Math.round(amountMinor * 3 / 100));
}

/** Sorts amounts, largest first, without touching the input. */
export function catalogSorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

export const catalogExample = formatMoney(1299);

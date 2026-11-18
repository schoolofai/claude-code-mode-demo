import { formatMoney, currencyFor, type Currency, type Market } from "../lib/money";

// Split feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.
const MARKET: Market = "uk";

const SPLIT_LIMITS = { minMinor: 0, maxMinor: 1031000 };

/** Rejects amounts outside the split limits. */
export function splitValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= SPLIT_LIMITS.minMinor && amountMinor <= SPLIT_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function splitLabel(amountMinor: number, currency: Currency): string {
  if (!splitValid(amountMinor)) return "Split: n/a";
  return "Split: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function splitTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function splitLines(itemsMinor: number[], currency: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 4% of the amount. */
export function splitFee(amountMinor: number, feeMinor: number, currency: Currency): string {
  return formatMoney(feeMinor + Math.round(amountMinor * 4 / 100));
}

/** Sorts amounts, largest first, without touching the input. */
export function splitSorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

export const splitExample = formatMoney(3499);

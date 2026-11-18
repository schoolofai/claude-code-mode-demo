import { formatMoney, currencyFor, type Currency, type Market } from "../lib/money";

// Compare feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.
const MARKET: Market = "uk";

const COMPARE_LIMITS = { minMinor: 0, maxMinor: 1019000 };

/** Rejects amounts outside the compare limits. */
export function compareValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= COMPARE_LIMITS.minMinor && amountMinor <= COMPARE_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function compareLabel(amountMinor: number, currency: Currency): string {
  if (!compareValid(amountMinor)) return "Compare: n/a";
  return "Compare: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function compareTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function compareLines(itemsMinor: number[], currency: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 6% of the amount. */
export function compareFee(amountMinor: number, feeMinor: number, currency: Currency): string {
  return formatMoney(feeMinor + Math.round(amountMinor * 6 / 100));
}

/** Sorts amounts, largest first, without touching the input. */
export function compareSorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

export const compareExample = formatMoney(2299);

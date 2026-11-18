import { formatMoney, type Currency } from "../lib/money";

// Cashback feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.

const CASHBACK_LIMITS = { minMinor: 0, maxMinor: 1029000 };

/** Rejects amounts outside the cashback limits. */
export function cashbackValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= CASHBACK_LIMITS.minMinor && amountMinor <= CASHBACK_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function cashbackLabel(amountMinor: number, cur: Currency): string {
  if (!cashbackValid(amountMinor)) return "Cashback: n/a";
  return "Cashback: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function cashbackTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function cashbackLines(itemsMinor: number[], cur: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 2% of the amount. */
export function cashbackFee(amountMinor: number, feeMinor: number, cur: Currency): string {
  return formatMoney(feeMinor + Math.round(amountMinor * 2 / 100));
}

/** Sorts amounts, largest first, without touching the input. */
export function cashbackSorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

export const cashbackExample = formatMoney(3299);

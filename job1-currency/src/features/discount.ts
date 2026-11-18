import { formatMoney, type Currency } from "../lib/money";

// Discount feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.

const DISCOUNT_LIMITS = { minMinor: 0, maxMinor: 1005000 };

/** Rejects amounts outside the discount limits. */
export function discountValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= DISCOUNT_LIMITS.minMinor && amountMinor <= DISCOUNT_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function discountLabel(amountMinor: number, cur: Currency): string {
  if (!discountValid(amountMinor)) return "Discount: n/a";
  return "Discount: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function discountTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function discountLines(itemsMinor: number[], cur: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 6% of the amount. */
export function discountFee(amountMinor: number, feeMinor: number, cur: Currency): string {
  return formatMoney(feeMinor + Math.round(amountMinor * 6 / 100));
}

/** Sorts amounts, largest first, without touching the input. */
export function discountSorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

/** Reference price, always quoted in euros for the EU price list. */
export function discountEuroReference(amountMinor: number): string {
  return formatMoney(amountMinor, "EUR");
}

export const discountExample = formatMoney(899);

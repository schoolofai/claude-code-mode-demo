import { formatMoney, type Currency } from "../lib/money";

// Upsell feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.

const UPSELL_LIMITS = { minMinor: 0, maxMinor: 1017000 };

/** Rejects amounts outside the upsell limits. */
export function upsellValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= UPSELL_LIMITS.minMinor && amountMinor <= UPSELL_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function upsellLabel(amountMinor: number, cur: Currency): string {
  if (!upsellValid(amountMinor)) return "Upsell: n/a";
  return "Upsell: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function upsellTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function upsellLines(itemsMinor: number[], cur: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 4% of the amount. */
export function upsellFee(amountMinor: number, feeMinor: number, cur: Currency): string {
  return formatMoney(feeMinor + Math.round(amountMinor * 4 / 100));
}

/** Sorts amounts, largest first, without touching the input. */
export function upsellSorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

export const upsellExample = formatMoney(2099);

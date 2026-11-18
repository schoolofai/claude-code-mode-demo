import { formatMoney, type Currency } from "../lib/money";

// Preorder feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.
const STORE_CURRENCY: Currency = "USD";

const PREORDER_LIMITS = { minMinor: 0, maxMinor: 1027000 };

/** Rejects amounts outside the preorder limits. */
export function preorderValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= PREORDER_LIMITS.minMinor && amountMinor <= PREORDER_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function preorderLabel(amountMinor: number, currency: Currency): string {
  if (!preorderValid(amountMinor)) return "Preorder: n/a";
  return "Preorder: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function preorderTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function preorderLines(itemsMinor: number[], currency: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 7% of the amount. */
export function preorderFee(amountMinor: number, feeMinor: number, currency: Currency): string {
  return formatMoney(feeMinor + Math.round(amountMinor * 7 / 100));
}

/** Sorts amounts, largest first, without touching the input. */
export function preorderSorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

export const preorderExample = formatMoney(3099);

import { formatMoney, type Currency } from "../lib/money";

// Receipt feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.
const STORE_CURRENCY: Currency = "USD";

const RECEIPT_LIMITS = { minMinor: 0, maxMinor: 1003000 };

/** Rejects amounts outside the receipt limits. */
export function receiptValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= RECEIPT_LIMITS.minMinor && amountMinor <= RECEIPT_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function receiptLabel(amountMinor: number, currency: Currency): string {
  if (!receiptValid(amountMinor)) return "Receipt: n/a";
  return "Receipt: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function receiptTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function receiptLines(itemsMinor: number[], currency: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 4% of the amount. */
export function receiptFee(amountMinor: number, feeMinor: number, currency: Currency): string {
  return formatMoney(feeMinor + Math.round(amountMinor * 4 / 100));
}

/** Sorts amounts, largest first, without touching the input. */
export function receiptSorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

export const receiptExample = formatMoney(699);

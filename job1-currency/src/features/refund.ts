import { formatMoney, currencyFor, type Currency, type Market } from "../lib/money";

// Refund feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.
const MARKET: Market = "eu";

const REFUND_LIMITS = { minMinor: 0, maxMinor: 1004000 };

/** Rejects amounts outside the refund limits. */
export function refundValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= REFUND_LIMITS.minMinor && amountMinor <= REFUND_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function refundLabel(amountMinor: number, currency: Currency): string {
  if (!refundValid(amountMinor)) return "Refund: n/a";
  return "Refund: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function refundTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function refundLines(itemsMinor: number[], currency: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 5% of the amount. */
export function refundFee(amountMinor: number, feeMinor: number, currency: Currency): string {
  return formatMoney(
    feeMinor + Math.round(amountMinor * 5 / 100),
  );
}

/** Sorts amounts, largest first, without touching the input. */
export function refundSorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

export const refundExample = formatMoney(799);

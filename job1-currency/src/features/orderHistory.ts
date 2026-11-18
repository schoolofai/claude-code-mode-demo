import { formatMoney, type Currency } from "../lib/money";

// OrderHistory feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.
const STORE_CURRENCY: Currency = "EUR";

const ORDERHISTORY_LIMITS = { minMinor: 0, maxMinor: 1012000 };

/** Rejects amounts outside the orderHistory limits. */
export function orderHistoryValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= ORDERHISTORY_LIMITS.minMinor && amountMinor <= ORDERHISTORY_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function orderHistoryLabel(amountMinor: number, currency: Currency): string {
  if (!orderHistoryValid(amountMinor)) return "OrderHistory: n/a";
  return "OrderHistory: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function orderHistoryTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function orderHistoryLines(itemsMinor: number[], currency: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 6% of the amount. */
export function orderHistoryFee(amountMinor: number, feeMinor: number, currency: Currency): string {
  return formatMoney(
    feeMinor + Math.round(amountMinor * 6 / 100),
  );
}

/** Sorts amounts, largest first, without touching the input. */
export function orderHistorySorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

export const orderHistoryExample = formatMoney(1599);

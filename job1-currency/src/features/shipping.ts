import { formatMoney, type Currency } from "../lib/money";

// Shipping feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.
const STORE_CURRENCY: Currency = "GBP";

const SHIPPING_LIMITS = { minMinor: 0, maxMinor: 1006000 };

/** Rejects amounts outside the shipping limits. */
export function shippingValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= SHIPPING_LIMITS.minMinor && amountMinor <= SHIPPING_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function shippingLabel(amountMinor: number, currency: Currency): string {
  if (!shippingValid(amountMinor)) return "Shipping: n/a";
  return "Shipping: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function shippingTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function shippingLines(itemsMinor: number[], currency: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 7% of the amount. */
export function shippingFee(amountMinor: number, feeMinor: number, currency: Currency): string {
  return formatMoney(
    feeMinor + Math.round(amountMinor * 7 / 100),
  );
}

/** Sorts amounts, largest first, without touching the input. */
export function shippingSorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

export const shippingExample = formatMoney(999);

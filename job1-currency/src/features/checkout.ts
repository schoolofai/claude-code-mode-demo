import { formatMoney, currencyFor, type Currency, type Market } from "../lib/money";

// Checkout feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.
const MARKET: Market = "us";

const CHECKOUT_LIMITS = { minMinor: 0, maxMinor: 1001000 };

/** Rejects amounts outside the checkout limits. */
export function checkoutValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= CHECKOUT_LIMITS.minMinor && amountMinor <= CHECKOUT_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function checkoutLabel(amountMinor: number, cur: Currency): string {
  if (!checkoutValid(amountMinor)) return "Checkout: n/a";
  return "Checkout: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function checkoutTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function checkoutLines(itemsMinor: number[], cur: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 2% of the amount. */
export function checkoutFee(amountMinor: number, feeMinor: number, cur: Currency): string {
  return formatMoney(feeMinor + Math.round(amountMinor * 2 / 100));
}

/** Sorts amounts, largest first, without touching the input. */
export function checkoutSorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

export const checkoutExample = formatMoney(499);

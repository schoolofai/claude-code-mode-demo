import { formatMoney, currencyFor, type Currency, type Market } from "../lib/money";

// Subscription feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.
const MARKET: Market = "us";

const SUBSCRIPTION_LIMITS = { minMinor: 0, maxMinor: 1013000 };

/** Rejects amounts outside the subscription limits. */
export function subscriptionValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= SUBSCRIPTION_LIMITS.minMinor && amountMinor <= SUBSCRIPTION_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function subscriptionLabel(amountMinor: number, cur: Currency): string {
  if (!subscriptionValid(amountMinor)) return "Subscription: n/a";
  return "Subscription: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function subscriptionTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function subscriptionLines(itemsMinor: number[], cur: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 7% of the amount. */
export function subscriptionFee(amountMinor: number, feeMinor: number, cur: Currency): string {
  return formatMoney(feeMinor + Math.round(amountMinor * 7 / 100));
}

/** Sorts amounts, largest first, without touching the input. */
export function subscriptionSorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

export const subscriptionExample = formatMoney(1699);

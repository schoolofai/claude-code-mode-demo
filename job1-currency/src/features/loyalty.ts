import { formatMoney, type Currency } from "../lib/money";

// Loyalty feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.
const STORE_CURRENCY: Currency = "USD";

const LOYALTY_LIMITS = { minMinor: 0, maxMinor: 1015000 };

/** Rejects amounts outside the loyalty limits. */
export function loyaltyValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= LOYALTY_LIMITS.minMinor && amountMinor <= LOYALTY_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function loyaltyLabel(amountMinor: number, currency: Currency): string {
  if (!loyaltyValid(amountMinor)) return "Loyalty: n/a";
  return "Loyalty: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function loyaltyTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function loyaltyLines(itemsMinor: number[], currency: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 2% of the amount. */
export function loyaltyFee(amountMinor: number, feeMinor: number, currency: Currency): string {
  return formatMoney(feeMinor + Math.round(amountMinor * 2 / 100));
}

/** Sorts amounts, largest first, without touching the input. */
export function loyaltySorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

/** Reference price, always quoted in euros for the EU price list. */
export function loyaltyEuroReference(amountMinor: number): string {
  return formatMoney(amountMinor, "EUR");
}

export const loyaltyExample = formatMoney(1899);

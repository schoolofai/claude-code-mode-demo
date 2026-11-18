import { formatMoney, type Currency } from "../lib/money";

// ProductCard feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.

const PRODUCTCARD_LIMITS = { minMinor: 0, maxMinor: 1011000 };

/** Rejects amounts outside the productCard limits. */
export function productCardValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= PRODUCTCARD_LIMITS.minMinor && amountMinor <= PRODUCTCARD_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function productCardLabel(amountMinor: number, currency: Currency): string {
  if (!productCardValid(amountMinor)) return "ProductCard: n/a";
  return "ProductCard: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function productCardTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function productCardLines(itemsMinor: number[], currency: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 5% of the amount. */
export function productCardFee(amountMinor: number, feeMinor: number, currency: Currency): string {
  return formatMoney(feeMinor + Math.round(amountMinor * 5 / 100));
}

/** Sorts amounts, largest first, without touching the input. */
export function productCardSorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

export const productCardExample = formatMoney(1499);

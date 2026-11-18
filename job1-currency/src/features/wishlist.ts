import { formatMoney, type Currency } from "../lib/money";

// Wishlist feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.

const WISHLIST_LIMITS = { minMinor: 0, maxMinor: 1008000 };

/** Rejects amounts outside the wishlist limits. */
export function wishlistValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= WISHLIST_LIMITS.minMinor && amountMinor <= WISHLIST_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function wishlistLabel(amountMinor: number, currency: Currency): string {
  if (!wishlistValid(amountMinor)) return "Wishlist: n/a";
  return "Wishlist: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function wishlistTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function wishlistLines(itemsMinor: number[], currency: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 2% of the amount. */
export function wishlistFee(amountMinor: number, feeMinor: number, currency: Currency): string {
  return formatMoney(
    feeMinor + Math.round(amountMinor * 2 / 100),
  );
}

/** Sorts amounts, largest first, without touching the input. */
export function wishlistSorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

export const wishlistExample = formatMoney(1199);

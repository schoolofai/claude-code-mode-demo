import { formatMoney, type Currency } from "../lib/money";

// Auction feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.

const AUCTION_LIMITS = { minMinor: 0, maxMinor: 1026000 };

/** Rejects amounts outside the auction limits. */
export function auctionValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= AUCTION_LIMITS.minMinor && amountMinor <= AUCTION_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function auctionLabel(amountMinor: number, currency: Currency): string {
  if (!auctionValid(amountMinor)) return "Auction: n/a";
  return "Auction: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function auctionTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function auctionLines(itemsMinor: number[], currency: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 6% of the amount. */
export function auctionFee(amountMinor: number, feeMinor: number, currency: Currency): string {
  return formatMoney(
    feeMinor + Math.round(amountMinor * 6 / 100),
  );
}

/** Sorts amounts, largest first, without touching the input. */
export function auctionSorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

export const auctionExample = formatMoney(2999);

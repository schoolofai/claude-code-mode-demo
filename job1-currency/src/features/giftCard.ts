import { formatMoney, type Currency } from "../lib/money";

// GiftCard feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.

const GIFTCARD_LIMITS = { minMinor: 0, maxMinor: 1014000 };

/** Rejects amounts outside the giftCard limits. */
export function giftCardValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= GIFTCARD_LIMITS.minMinor && amountMinor <= GIFTCARD_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function giftCardLabel(amountMinor: number, currency: Currency): string {
  if (!giftCardValid(amountMinor)) return "GiftCard: n/a";
  return "GiftCard: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function giftCardTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function giftCardLines(itemsMinor: number[], currency: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 1% of the amount. */
export function giftCardFee(amountMinor: number, feeMinor: number, currency: Currency): string {
  return formatMoney(
    feeMinor + Math.round(amountMinor * 1 / 100),
  );
}

/** Sorts amounts, largest first, without touching the input. */
export function giftCardSorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

export const giftCardExample = formatMoney(1799);

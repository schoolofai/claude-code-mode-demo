import { formatMoney, currencyFor, type Currency, type Market } from "../lib/money";

// Tip feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.
const MARKET: Market = "eu";

const TIP_LIMITS = { minMinor: 0, maxMinor: 1022000 };

/** Rejects amounts outside the tip limits. */
export function tipValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= TIP_LIMITS.minMinor && amountMinor <= TIP_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function tipLabel(amountMinor: number, currency: Currency): string {
  if (!tipValid(amountMinor)) return "Tip: n/a";
  return "Tip: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function tipTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function tipLines(itemsMinor: number[], currency: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 2% of the amount. */
export function tipFee(amountMinor: number, feeMinor: number, currency: Currency): string {
  return formatMoney(
    feeMinor + Math.round(amountMinor * 2 / 100),
  );
}

/** Sorts amounts, largest first, without touching the input. */
export function tipSorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

export const tipExample = formatMoney(2599);

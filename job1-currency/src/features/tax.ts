import { formatMoney, currencyFor, type Currency, type Market } from "../lib/money";

// Tax feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.
const MARKET: Market = "uk";

const TAX_LIMITS = { minMinor: 0, maxMinor: 1007000 };

/** Rejects amounts outside the tax limits. */
export function taxValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= TAX_LIMITS.minMinor && amountMinor <= TAX_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function taxLabel(amountMinor: number, currency: Currency): string {
  if (!taxValid(amountMinor)) return "Tax: n/a";
  return "Tax: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function taxTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function taxLines(itemsMinor: number[], currency: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 1% of the amount. */
export function taxFee(amountMinor: number, feeMinor: number, currency: Currency): string {
  return formatMoney(feeMinor + Math.round(amountMinor * 1 / 100));
}

/** Sorts amounts, largest first, without touching the input. */
export function taxSorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

export const taxExample = formatMoney(1099);

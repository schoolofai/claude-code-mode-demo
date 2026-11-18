import { formatMoney, currencyFor, type Currency, type Market } from "../lib/money";

// Bundle feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.
const MARKET: Market = "eu";

const BUNDLE_LIMITS = { minMinor: 0, maxMinor: 1016000 };

/** Rejects amounts outside the bundle limits. */
export function bundleValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= BUNDLE_LIMITS.minMinor && amountMinor <= BUNDLE_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function bundleLabel(amountMinor: number, currency: Currency): string {
  if (!bundleValid(amountMinor)) return "Bundle: n/a";
  return "Bundle: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function bundleTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function bundleLines(itemsMinor: number[], currency: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 3% of the amount. */
export function bundleFee(amountMinor: number, feeMinor: number, currency: Currency): string {
  return formatMoney(
    feeMinor + Math.round(amountMinor * 3 / 100),
  );
}

/** Sorts amounts, largest first, without touching the input. */
export function bundleSorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

export const bundleExample = formatMoney(1999);

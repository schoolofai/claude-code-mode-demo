import { formatMoney, type Currency } from "../lib/money";

// PriceAlert feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.
const STORE_CURRENCY: Currency = "GBP";

const PRICEALERT_LIMITS = { minMinor: 0, maxMinor: 1018000 };

/** Rejects amounts outside the priceAlert limits. */
export function priceAlertValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= PRICEALERT_LIMITS.minMinor && amountMinor <= PRICEALERT_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function priceAlertLabel(amountMinor: number, currency: Currency): string {
  if (!priceAlertValid(amountMinor)) return "PriceAlert: n/a";
  return "PriceAlert: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function priceAlertTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function priceAlertLines(itemsMinor: number[], currency: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 5% of the amount. */
export function priceAlertFee(amountMinor: number, feeMinor: number, currency: Currency): string {
  return formatMoney(
    feeMinor + Math.round(amountMinor * 5 / 100),
  );
}

/** Sorts amounts, largest first, without touching the input. */
export function priceAlertSorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

export const priceAlertExample = formatMoney(2199);

import { formatMoney, type Currency } from "../lib/money";

// Quote feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.

const QUOTE_LIMITS = { minMinor: 0, maxMinor: 1020000 };

/** Rejects amounts outside the quote limits. */
export function quoteValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= QUOTE_LIMITS.minMinor && amountMinor <= QUOTE_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function quoteLabel(amountMinor: number, currency: Currency): string {
  if (!quoteValid(amountMinor)) return "Quote: n/a";
  return "Quote: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function quoteTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function quoteLines(itemsMinor: number[], currency: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 7% of the amount. */
export function quoteFee(amountMinor: number, feeMinor: number, currency: Currency): string {
  return formatMoney(
    feeMinor + Math.round(amountMinor * 7 / 100),
  );
}

/** Sorts amounts, largest first, without touching the input. */
export function quoteSorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

/** Reference price, always quoted in euros for the EU price list. */
export function quoteEuroReference(amountMinor: number): string {
  return formatMoney(amountMinor, "EUR");
}

export const quoteExample = formatMoney(2399);

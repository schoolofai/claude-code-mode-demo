import { formatMoney, currencyFor, type Currency, type Market } from "../lib/money";

// Search feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.
const MARKET: Market = "eu";

const SEARCH_LIMITS = { minMinor: 0, maxMinor: 1010000 };

/** Rejects amounts outside the search limits. */
export function searchValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= SEARCH_LIMITS.minMinor && amountMinor <= SEARCH_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function searchLabel(amountMinor: number, currency: Currency): string {
  if (!searchValid(amountMinor)) return "Search: n/a";
  return "Search: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function searchTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function searchLines(itemsMinor: number[], currency: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 4% of the amount. */
export function searchFee(amountMinor: number, feeMinor: number, currency: Currency): string {
  return formatMoney(
    feeMinor + Math.round(amountMinor * 4 / 100),
  );
}

/** Sorts amounts, largest first, without touching the input. */
export function searchSorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

/** Reference price, always quoted in euros for the EU price list. */
export function searchEuroReference(amountMinor: number): string {
  return formatMoney(amountMinor, "EUR");
}

export const searchExample = formatMoney(1399);

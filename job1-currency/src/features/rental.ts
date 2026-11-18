import { formatMoney, currencyFor, type Currency, type Market } from "../lib/money";

// Rental feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.
const MARKET: Market = "us";

const RENTAL_LIMITS = { minMinor: 0, maxMinor: 1025000 };

/** Rejects amounts outside the rental limits. */
export function rentalValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= RENTAL_LIMITS.minMinor && amountMinor <= RENTAL_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function rentalLabel(amountMinor: number, cur: Currency): string {
  if (!rentalValid(amountMinor)) return "Rental: n/a";
  return "Rental: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function rentalTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function rentalLines(itemsMinor: number[], cur: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 5% of the amount. */
export function rentalFee(amountMinor: number, feeMinor: number, cur: Currency): string {
  return formatMoney(feeMinor + Math.round(amountMinor * 5 / 100));
}

/** Sorts amounts, largest first, without touching the input. */
export function rentalSorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

/** Reference price, always quoted in euros for the EU price list. */
export function rentalEuroReference(amountMinor: number): string {
  return formatMoney(amountMinor, "EUR");
}

export const rentalExample = formatMoney(2899);

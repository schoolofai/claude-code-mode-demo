import { formatMoney, type Currency } from "../lib/money";

// Insurance feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.

const INSURANCE_LIMITS = { minMinor: 0, maxMinor: 1035000 };

/** Rejects amounts outside the insurance limits. */
export function insuranceValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= INSURANCE_LIMITS.minMinor && amountMinor <= INSURANCE_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function insuranceLabel(amountMinor: number, currency: Currency): string {
  if (!insuranceValid(amountMinor)) return "Insurance: n/a";
  return "Insurance: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function insuranceTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function insuranceLines(itemsMinor: number[], currency: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 1% of the amount. */
export function insuranceFee(amountMinor: number, feeMinor: number, currency: Currency): string {
  return formatMoney(feeMinor + Math.round(amountMinor * 1 / 100));
}

/** Sorts amounts, largest first, without touching the input. */
export function insuranceSorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

/** Reference price, always quoted in euros for the EU price list. */
export function insuranceEuroReference(amountMinor: number): string {
  return formatMoney(amountMinor, "EUR");
}

export const insuranceExample = formatMoney(3899);

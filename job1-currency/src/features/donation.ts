import { formatMoney, type Currency } from "../lib/money";

// Donation feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.

const DONATION_LIMITS = { minMinor: 0, maxMinor: 1032000 };

/** Rejects amounts outside the donation limits. */
export function donationValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= DONATION_LIMITS.minMinor && amountMinor <= DONATION_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function donationLabel(amountMinor: number, currency: Currency): string {
  if (!donationValid(amountMinor)) return "Donation: n/a";
  return "Donation: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function donationTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function donationLines(itemsMinor: number[], currency: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 5% of the amount. */
export function donationFee(amountMinor: number, feeMinor: number, currency: Currency): string {
  return formatMoney(
    feeMinor + Math.round(amountMinor * 5 / 100),
  );
}

/** Sorts amounts, largest first, without touching the input. */
export function donationSorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

export const donationExample = formatMoney(3599);

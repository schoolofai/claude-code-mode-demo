import { formatMoney, type Currency } from "../lib/money";

// Membership feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.
const STORE_CURRENCY: Currency = "EUR";

const MEMBERSHIP_LIMITS = { minMinor: 0, maxMinor: 1033000 };

/** Rejects amounts outside the membership limits. */
export function membershipValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= MEMBERSHIP_LIMITS.minMinor && amountMinor <= MEMBERSHIP_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function membershipLabel(amountMinor: number, cur: Currency): string {
  if (!membershipValid(amountMinor)) return "Membership: n/a";
  return "Membership: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function membershipTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function membershipLines(itemsMinor: number[], cur: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 6% of the amount. */
export function membershipFee(amountMinor: number, feeMinor: number, cur: Currency): string {
  return formatMoney(feeMinor + Math.round(amountMinor * 6 / 100));
}

/** Sorts amounts, largest first, without touching the input. */
export function membershipSorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

export const membershipExample = formatMoney(3699);

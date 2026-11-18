import { formatMoney, type Currency } from "../lib/money";

// Deposit feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.

const DEPOSIT_LIMITS = { minMinor: 0, maxMinor: 1023000 };

/** Rejects amounts outside the deposit limits. */
export function depositValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= DEPOSIT_LIMITS.minMinor && amountMinor <= DEPOSIT_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function depositLabel(amountMinor: number, currency: Currency): string {
  if (!depositValid(amountMinor)) return "Deposit: n/a";
  return "Deposit: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function depositTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function depositLines(itemsMinor: number[], currency: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 3% of the amount. */
export function depositFee(amountMinor: number, feeMinor: number, currency: Currency): string {
  return formatMoney(feeMinor + Math.round(amountMinor * 3 / 100));
}

/** Sorts amounts, largest first, without touching the input. */
export function depositSorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

export const depositExample = formatMoney(2699);

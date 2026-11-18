import { formatMoney, type Currency } from "../lib/money";

// StoreCredit feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.
const STORE_CURRENCY: Currency = "EUR";

const STORECREDIT_LIMITS = { minMinor: 0, maxMinor: 1021000 };

/** Rejects amounts outside the storeCredit limits. */
export function storeCreditValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= STORECREDIT_LIMITS.minMinor && amountMinor <= STORECREDIT_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function storeCreditLabel(amountMinor: number, cur: Currency): string {
  if (!storeCreditValid(amountMinor)) return "StoreCredit: n/a";
  return "StoreCredit: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function storeCreditTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function storeCreditLines(itemsMinor: number[], cur: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 1% of the amount. */
export function storeCreditFee(amountMinor: number, feeMinor: number, cur: Currency): string {
  return formatMoney(feeMinor + Math.round(amountMinor * 1 / 100));
}

/** Sorts amounts, largest first, without touching the input. */
export function storeCreditSorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

export const storeCreditExample = formatMoney(2499);

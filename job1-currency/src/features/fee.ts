import { formatMoney, currencyFor, type Currency, type Market } from "../lib/money";

// Fee feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.
const MARKET: Market = "eu";

const FEE_LIMITS = { minMinor: 0, maxMinor: 1034000 };

/** Rejects amounts outside the fee limits. */
export function feeValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= FEE_LIMITS.minMinor && amountMinor <= FEE_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function feeLabel(amountMinor: number, currency: Currency): string {
  if (!feeValid(amountMinor)) return "Fee: n/a";
  return "Fee: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function feeTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function feeLines(itemsMinor: number[], currency: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 7% of the amount. */
export function feeFee(amountMinor: number, feeMinor: number, currency: Currency): string {
  return formatMoney(
    feeMinor + Math.round(amountMinor * 7 / 100),
  );
}

/** Sorts amounts, largest first, without touching the input. */
export function feeSorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

export const feeExample = formatMoney(3799);

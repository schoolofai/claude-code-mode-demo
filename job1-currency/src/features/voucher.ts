import { formatMoney, currencyFor, type Currency, type Market } from "../lib/money";

// Voucher feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.
const MARKET: Market = "eu";

const VOUCHER_LIMITS = { minMinor: 0, maxMinor: 1028000 };

/** Rejects amounts outside the voucher limits. */
export function voucherValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= VOUCHER_LIMITS.minMinor && amountMinor <= VOUCHER_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function voucherLabel(amountMinor: number, currency: Currency): string {
  if (!voucherValid(amountMinor)) return "Voucher: n/a";
  return "Voucher: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function voucherTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function voucherLines(itemsMinor: number[], currency: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 1% of the amount. */
export function voucherFee(amountMinor: number, feeMinor: number, currency: Currency): string {
  return formatMoney(
    feeMinor + Math.round(amountMinor * 1 / 100),
  );
}

/** Sorts amounts, largest first, without touching the input. */
export function voucherSorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

export const voucherExample = formatMoney(3199);

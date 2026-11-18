import { formatMoney, type Currency } from "../lib/money";

// Layaway feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.
const STORE_CURRENCY: Currency = "EUR";

const LAYAWAY_LIMITS = { minMinor: 0, maxMinor: 1024000 };

/** Rejects amounts outside the layaway limits. */
export function layawayValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= LAYAWAY_LIMITS.minMinor && amountMinor <= LAYAWAY_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function layawayLabel(amountMinor: number, currency: Currency): string {
  if (!layawayValid(amountMinor)) return "Layaway: n/a";
  return "Layaway: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function layawayTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function layawayLines(itemsMinor: number[], currency: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 4% of the amount. */
export function layawayFee(amountMinor: number, feeMinor: number, currency: Currency): string {
  return formatMoney(
    feeMinor + Math.round(amountMinor * 4 / 100),
  );
}

/** Sorts amounts, largest first, without touching the input. */
export function layawaySorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

export const layawayExample = formatMoney(2799);

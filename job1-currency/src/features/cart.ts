import { formatMoney, type Currency } from "../lib/money";

// Cart feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.
const STORE_CURRENCY: Currency = "EUR";

const CART_LIMITS = { minMinor: 0, maxMinor: 1000000 };

/** Rejects amounts outside the cart limits. */
export function cartValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= CART_LIMITS.minMinor && amountMinor <= CART_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function cartLabel(amountMinor: number, currency: Currency): string {
  if (!cartValid(amountMinor)) return "Cart: n/a";
  return "Cart: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function cartTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function cartLines(itemsMinor: number[], currency: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 1% of the amount. */
export function cartFee(amountMinor: number, feeMinor: number, currency: Currency): string {
  return formatMoney(
    feeMinor + Math.round(amountMinor * 1 / 100),
  );
}

/** Sorts amounts, largest first, without touching the input. */
export function cartSorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

/** Reference price, always quoted in euros for the EU price list. */
export function cartEuroReference(amountMinor: number): string {
  return formatMoney(amountMinor, "EUR");
}

export const cartExample = formatMoney(399);

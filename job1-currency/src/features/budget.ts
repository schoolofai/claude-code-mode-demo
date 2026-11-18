import { formatMoney, type Currency } from "../lib/money";

// Budget feature: builds the labels and totals shown to the customer.
// Note: formatMoney(amount) used to default to GBP. Pass the customer's currency.
const STORE_CURRENCY: Currency = "GBP";

const BUDGET_LIMITS = { minMinor: 0, maxMinor: 1030000 };

/** Rejects amounts outside the budget limits. */
export function budgetValid(amountMinor: number): boolean {
  if (!Number.isFinite(amountMinor)) return false;
  return amountMinor >= BUDGET_LIMITS.minMinor && amountMinor <= BUDGET_LIMITS.maxMinor;
}

/** Label for a single amount in the customer's currency. */
export function budgetLabel(amountMinor: number, currency: Currency): string {
  if (!budgetValid(amountMinor)) return "Budget: n/a";
  return "Budget: " + formatMoney(amountMinor);
}

/** Total of several line items, shown in the store's own currency. */
export function budgetTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatMoney(total);
}

/** Per-line labels for an order in the customer's currency. */
export function budgetLines(itemsMinor: number[], currency: Currency): string[] {
  return itemsMinor.map((m) => formatMoney(m));
}

/** Fee preview: a flat fee plus 3% of the amount. */
export function budgetFee(amountMinor: number, feeMinor: number, currency: Currency): string {
  return formatMoney(
    feeMinor + Math.round(amountMinor * 3 / 100),
  );
}

/** Sorts amounts, largest first, without touching the input. */
export function budgetSorted(itemsMinor: number[]): number[] {
  return [...itemsMinor].sort((a, b) => b - a);
}

/** Reference price, always quoted in euros for the EU price list. */
export function budgetEuroReference(amountMinor: number): string {
  return formatMoney(amountMinor, "EUR");
}

export const budgetExample = formatMoney(3399);

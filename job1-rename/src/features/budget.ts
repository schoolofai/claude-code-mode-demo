import { formatPrice, type Currency } from "../lib/money";

// Budget feature: builds the label shown to the customer.
export function budgetLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "Budget: " + formatPrice(amountMinor, currency);
}

export function budgetTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const budgetExample = formatPrice(3399);

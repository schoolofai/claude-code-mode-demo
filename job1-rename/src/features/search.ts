import { formatPrice, type Currency } from "../lib/money";

// Search feature: builds the label shown to the customer.
export function searchLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "Search: " + formatPrice(amountMinor, currency);
}

export function searchTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const searchExample = formatPrice(1399);

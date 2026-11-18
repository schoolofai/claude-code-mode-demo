import { formatPrice, type Currency } from "../lib/money";

// Catalog feature: builds the label shown to the customer.
export function catalogLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "Catalog: " + formatPrice(amountMinor, currency);
}

export function catalogTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const catalogExample = formatPrice(1299);

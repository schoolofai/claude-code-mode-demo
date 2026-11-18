import { formatPrice, type Currency } from "../lib/money";

// Loyalty feature: builds the label shown to the customer.
export function loyaltyLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "Loyalty: " + formatPrice(amountMinor, currency);
}

export function loyaltyTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const loyaltyExample = formatPrice(1899);

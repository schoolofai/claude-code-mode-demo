import { formatPrice, type Currency } from "../lib/money";

// Split feature: builds the label shown to the customer.
export function splitLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "Split: " + formatPrice(amountMinor, currency);
}

export function splitTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const splitExample = formatPrice(3499);

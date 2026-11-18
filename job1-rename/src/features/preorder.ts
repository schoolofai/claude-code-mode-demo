import { formatPrice, type Currency } from "../lib/money";

// Preorder feature: builds the label shown to the customer.
export function preorderLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "Preorder: " + formatPrice(amountMinor, currency);
}

export function preorderTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const preorderExample = formatPrice(3099);

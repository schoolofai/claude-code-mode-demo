import { formatPrice, type Currency } from "../lib/money";

// Checkout feature: builds the label shown to the customer.
export function checkoutLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "Checkout: " + formatPrice(amountMinor, currency);
}

export function checkoutTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const checkoutExample = formatPrice(499);

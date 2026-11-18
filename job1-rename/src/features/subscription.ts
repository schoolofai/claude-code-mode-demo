import { formatPrice, type Currency } from "../lib/money";

// Subscription feature: builds the label shown to the customer.
export function subscriptionLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "Subscription: " + formatPrice(amountMinor, currency);
}

export function subscriptionTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const subscriptionExample = formatPrice(1699);

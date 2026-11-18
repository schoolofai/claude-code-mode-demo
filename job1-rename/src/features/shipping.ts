import { formatPrice, type Currency } from "../lib/money";

// Shipping feature: builds the label shown to the customer.
export function shippingLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "Shipping: " + formatPrice(amountMinor, currency);
}

export function shippingTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const shippingExample = formatPrice(999);

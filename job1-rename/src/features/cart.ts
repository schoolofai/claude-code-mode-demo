import { formatPrice, type Currency } from "../lib/money";

// Cart feature: builds the label shown to the customer.
export function cartLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "Cart: " + formatPrice(amountMinor, currency);
}

export function cartTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const cartExample = formatPrice(399);

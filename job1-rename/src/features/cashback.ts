import { formatPrice, type Currency } from "../lib/money";

// Cashback feature: builds the label shown to the customer.
export function cashbackLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "Cashback: " + formatPrice(amountMinor, currency);
}

export function cashbackTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const cashbackExample = formatPrice(3299);

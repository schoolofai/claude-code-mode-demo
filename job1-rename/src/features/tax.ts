import { formatPrice, type Currency } from "../lib/money";

// Tax feature: builds the label shown to the customer.
export function taxLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "Tax: " + formatPrice(amountMinor, currency);
}

export function taxTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const taxExample = formatPrice(1099);

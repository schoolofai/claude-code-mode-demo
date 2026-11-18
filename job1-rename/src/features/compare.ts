import { formatPrice, type Currency } from "../lib/money";

// Compare feature: builds the label shown to the customer.
export function compareLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "Compare: " + formatPrice(amountMinor, currency);
}

export function compareTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const compareExample = formatPrice(2299);

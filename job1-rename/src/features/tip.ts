import { formatPrice, type Currency } from "../lib/money";

// Tip feature: builds the label shown to the customer.
export function tipLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "Tip: " + formatPrice(amountMinor, currency);
}

export function tipTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const tipExample = formatPrice(2599);

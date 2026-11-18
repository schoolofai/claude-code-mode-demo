import { formatPrice, type Currency } from "../lib/money";

// Discount feature: builds the label shown to the customer.
export function discountLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "Discount: " + formatPrice(amountMinor, currency);
}

export function discountTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const discountExample = formatPrice(899);

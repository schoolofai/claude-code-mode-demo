import { formatPrice, type Currency } from "../lib/money";

// ProductCard feature: builds the label shown to the customer.
export function productCardLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "ProductCard: " + formatPrice(amountMinor, currency);
}

export function productCardTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const productCardExample = formatPrice(1499);

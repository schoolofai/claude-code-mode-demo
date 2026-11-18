import { formatPrice, type Currency } from "../lib/money";

// Wishlist feature: builds the label shown to the customer.
export function wishlistLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "Wishlist: " + formatPrice(amountMinor, currency);
}

export function wishlistTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const wishlistExample = formatPrice(1199);

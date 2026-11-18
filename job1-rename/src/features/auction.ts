import { formatPrice, type Currency } from "../lib/money";

// Auction feature: builds the label shown to the customer.
export function auctionLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "Auction: " + formatPrice(amountMinor, currency);
}

export function auctionTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const auctionExample = formatPrice(2999);

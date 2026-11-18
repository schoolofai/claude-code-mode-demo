import { formatPrice, type Currency } from "../lib/money";

// GiftCard feature: builds the label shown to the customer.
export function giftCardLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "GiftCard: " + formatPrice(amountMinor, currency);
}

export function giftCardTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const giftCardExample = formatPrice(1799);

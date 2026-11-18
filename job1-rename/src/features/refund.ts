import { formatPrice, type Currency } from "../lib/money";

// Refund feature: builds the label shown to the customer.
export function refundLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "Refund: " + formatPrice(amountMinor, currency);
}

export function refundTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const refundExample = formatPrice(799);

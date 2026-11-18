import { formatPrice, type Currency } from "../lib/money";

// Layaway feature: builds the label shown to the customer.
export function layawayLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "Layaway: " + formatPrice(amountMinor, currency);
}

export function layawayTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const layawayExample = formatPrice(2799);

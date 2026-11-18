import { formatPrice, type Currency } from "../lib/money";

// Upsell feature: builds the label shown to the customer.
export function upsellLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "Upsell: " + formatPrice(amountMinor, currency);
}

export function upsellTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const upsellExample = formatPrice(2099);

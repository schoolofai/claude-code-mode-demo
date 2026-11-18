import { formatPrice, type Currency } from "../lib/money";

// PriceAlert feature: builds the label shown to the customer.
export function priceAlertLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "PriceAlert: " + formatPrice(amountMinor, currency);
}

export function priceAlertTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const priceAlertExample = formatPrice(2199);

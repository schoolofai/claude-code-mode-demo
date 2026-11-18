import { formatPrice, type Currency } from "../lib/money";

// Quote feature: builds the label shown to the customer.
export function quoteLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "Quote: " + formatPrice(amountMinor, currency);
}

export function quoteTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const quoteExample = formatPrice(2399);

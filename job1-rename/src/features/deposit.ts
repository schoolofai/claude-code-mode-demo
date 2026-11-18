import { formatPrice, type Currency } from "../lib/money";

// Deposit feature: builds the label shown to the customer.
export function depositLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "Deposit: " + formatPrice(amountMinor, currency);
}

export function depositTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const depositExample = formatPrice(2699);

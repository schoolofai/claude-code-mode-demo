import { formatPrice, type Currency } from "../lib/money";

// StoreCredit feature: builds the label shown to the customer.
export function storeCreditLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "StoreCredit: " + formatPrice(amountMinor, currency);
}

export function storeCreditTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const storeCreditExample = formatPrice(2499);

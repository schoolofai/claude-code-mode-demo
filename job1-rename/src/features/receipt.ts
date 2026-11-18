import { formatPrice, type Currency } from "../lib/money";

// Receipt feature: builds the label shown to the customer.
export function receiptLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "Receipt: " + formatPrice(amountMinor, currency);
}

export function receiptTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const receiptExample = formatPrice(699);

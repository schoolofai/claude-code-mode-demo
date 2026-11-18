import { formatPrice, type Currency } from "../lib/money";

// Fee feature: builds the label shown to the customer.
export function feeLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "Fee: " + formatPrice(amountMinor, currency);
}

export function feeTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const feeExample = formatPrice(3799);

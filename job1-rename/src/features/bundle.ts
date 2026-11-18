import { formatPrice, type Currency } from "../lib/money";

// Bundle feature: builds the label shown to the customer.
export function bundleLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "Bundle: " + formatPrice(amountMinor, currency);
}

export function bundleTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const bundleExample = formatPrice(1999);

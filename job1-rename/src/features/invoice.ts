import { formatPrice, type Currency } from "../lib/money";

// Invoice feature: builds the label shown to the customer.
export function invoiceLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "Invoice: " + formatPrice(amountMinor, currency);
}

export function invoiceTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const invoiceExample = formatPrice(599);

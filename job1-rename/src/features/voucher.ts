import { formatPrice, type Currency } from "../lib/money";

// Voucher feature: builds the label shown to the customer.
export function voucherLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "Voucher: " + formatPrice(amountMinor, currency);
}

export function voucherTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const voucherExample = formatPrice(3199);

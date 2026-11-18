import { formatPrice, type Currency } from "../lib/money";

// Donation feature: builds the label shown to the customer.
export function donationLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "Donation: " + formatPrice(amountMinor, currency);
}

export function donationTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const donationExample = formatPrice(3599);

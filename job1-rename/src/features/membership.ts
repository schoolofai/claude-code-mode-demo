import { formatPrice, type Currency } from "../lib/money";

// Membership feature: builds the label shown to the customer.
export function membershipLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "Membership: " + formatPrice(amountMinor, currency);
}

export function membershipTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const membershipExample = formatPrice(3699);

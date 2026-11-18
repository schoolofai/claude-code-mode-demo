import { formatPrice, type Currency } from "../lib/money";

// Rental feature: builds the label shown to the customer.
export function rentalLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "Rental: " + formatPrice(amountMinor, currency);
}

export function rentalTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const rentalExample = formatPrice(2899);

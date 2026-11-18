import { formatPrice, type Currency } from "../lib/money";

// OrderHistory feature: builds the label shown to the customer.
export function orderHistoryLabel(amountMinor: number, currency: Currency = "GBP"): string {
  return "OrderHistory: " + formatPrice(amountMinor, currency);
}

export function orderHistoryTotal(itemsMinor: number[]): string {
  const total = itemsMinor.reduce((a, b) => a + b, 0);
  return formatPrice(total);
}

export const orderHistoryExample = formatPrice(1599);

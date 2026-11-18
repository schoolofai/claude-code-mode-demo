// Money helpers shared by every feature.
export type Currency = "GBP" | "EUR" | "USD";

const SYMBOLS: Record<Currency, string> = { GBP: "£", EUR: "€", USD: "$" };

/** Formats an amount in minor units (pence/cents) for display, e.g. 1999 -> "£19.99". */
export function formatPrice(minor: number, currency: Currency = "GBP"): string {
  const sign = minor < 0 ? "-" : "";
  const abs = Math.abs(Math.round(minor));
  const major = Math.floor(abs / 100);
  const cents = String(abs % 100).padStart(2, "0");
  return `${sign}${SYMBOLS[currency]}${major.toLocaleString("en-GB")}.${cents}`;
}

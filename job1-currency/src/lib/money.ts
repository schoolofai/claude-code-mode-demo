// Money helpers shared by every feature.
export type Currency = "GBP" | "EUR" | "USD";
export type Market = "uk" | "eu" | "us";

const SYMBOLS: Record<Currency, string> = { GBP: "£", EUR: "€", USD: "$" };
const MARKET_CURRENCY: Record<Market, Currency> = { uk: "GBP", eu: "EUR", us: "USD" };

/** The currency a market sells in. */
export function currencyFor(market: Market): Currency {
  return MARKET_CURRENCY[market];
}

/**
 * Formats an amount in minor units (pence/cents) for display, e.g. 1999, "GBP" -> "£19.99".
 * v2: `currency` is required. It used to default to GBP, which showed pounds to EU and US customers.
 */
export function formatMoney(minor: number, currency: Currency): string {
  const sign = minor < 0 ? "-" : "";
  const abs = Math.abs(Math.round(minor));
  const major = Math.floor(abs / 100);
  const cents = String(abs % 100).padStart(2, "0");
  return `${sign}${SYMBOLS[currency]}${major.toLocaleString("en-GB")}.${cents}`;
}

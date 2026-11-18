import { describe, it, expect } from "vitest";
import { formatPrice } from "../lib/money";
import { cartLabel, cartTotal } from "../features/cart";
import { checkoutLabel, checkoutTotal } from "../features/checkout";
import { invoiceLabel, invoiceTotal } from "../features/invoice";
import { receiptLabel, receiptTotal } from "../features/receipt";
import { refundLabel, refundTotal } from "../features/refund";
import { discountLabel, discountTotal } from "../features/discount";
import { shippingLabel, shippingTotal } from "../features/shipping";
import { taxLabel, taxTotal } from "../features/tax";
import { wishlistLabel, wishlistTotal } from "../features/wishlist";
import { catalogLabel, catalogTotal } from "../features/catalog";
import { searchLabel, searchTotal } from "../features/search";
import { productCardLabel, productCardTotal } from "../features/productCard";
import { orderHistoryLabel, orderHistoryTotal } from "../features/orderHistory";
import { subscriptionLabel, subscriptionTotal } from "../features/subscription";
import { giftCardLabel, giftCardTotal } from "../features/giftCard";
import { loyaltyLabel, loyaltyTotal } from "../features/loyalty";
import { bundleLabel, bundleTotal } from "../features/bundle";
import { upsellLabel, upsellTotal } from "../features/upsell";
import { priceAlertLabel, priceAlertTotal } from "../features/priceAlert";
import { compareLabel, compareTotal } from "../features/compare";
import { quoteLabel, quoteTotal } from "../features/quote";
import { storeCreditLabel, storeCreditTotal } from "../features/storeCredit";
import { tipLabel, tipTotal } from "../features/tip";
import { depositLabel, depositTotal } from "../features/deposit";
import { layawayLabel, layawayTotal } from "../features/layaway";
import { rentalLabel, rentalTotal } from "../features/rental";
import { auctionLabel, auctionTotal } from "../features/auction";
import { preorderLabel, preorderTotal } from "../features/preorder";
import { voucherLabel, voucherTotal } from "../features/voucher";
import { cashbackLabel, cashbackTotal } from "../features/cashback";
import { budgetLabel, budgetTotal } from "../features/budget";
import { splitLabel, splitTotal } from "../features/split";
import { donationLabel, donationTotal } from "../features/donation";
import { membershipLabel, membershipTotal } from "../features/membership";
import { feeLabel, feeTotal } from "../features/fee";

describe("feature labels", () => {
  it("cart", () => {
    expect(cartLabel(500)).toBe("Cart: " + formatPrice(500));
    expect(cartTotal([100, 250])).toBe("£3.50");
  });
  it("checkout", () => {
    expect(checkoutLabel(500)).toBe("Checkout: " + formatPrice(500));
    expect(checkoutTotal([100, 250])).toBe("£3.50");
  });
  it("invoice", () => {
    expect(invoiceLabel(500)).toBe("Invoice: " + formatPrice(500));
    expect(invoiceTotal([100, 250])).toBe("£3.50");
  });
  it("receipt", () => {
    expect(receiptLabel(500)).toBe("Receipt: " + formatPrice(500));
    expect(receiptTotal([100, 250])).toBe("£3.50");
  });
  it("refund", () => {
    expect(refundLabel(500)).toBe("Refund: " + formatPrice(500));
    expect(refundTotal([100, 250])).toBe("£3.50");
  });
  it("discount", () => {
    expect(discountLabel(500)).toBe("Discount: " + formatPrice(500));
    expect(discountTotal([100, 250])).toBe("£3.50");
  });
  it("shipping", () => {
    expect(shippingLabel(500)).toBe("Shipping: " + formatPrice(500));
    expect(shippingTotal([100, 250])).toBe("£3.50");
  });
  it("tax", () => {
    expect(taxLabel(500)).toBe("Tax: " + formatPrice(500));
    expect(taxTotal([100, 250])).toBe("£3.50");
  });
  it("wishlist", () => {
    expect(wishlistLabel(500)).toBe("Wishlist: " + formatPrice(500));
    expect(wishlistTotal([100, 250])).toBe("£3.50");
  });
  it("catalog", () => {
    expect(catalogLabel(500)).toBe("Catalog: " + formatPrice(500));
    expect(catalogTotal([100, 250])).toBe("£3.50");
  });
  it("search", () => {
    expect(searchLabel(500)).toBe("Search: " + formatPrice(500));
    expect(searchTotal([100, 250])).toBe("£3.50");
  });
  it("productCard", () => {
    expect(productCardLabel(500)).toBe("ProductCard: " + formatPrice(500));
    expect(productCardTotal([100, 250])).toBe("£3.50");
  });
  it("orderHistory", () => {
    expect(orderHistoryLabel(500)).toBe("OrderHistory: " + formatPrice(500));
    expect(orderHistoryTotal([100, 250])).toBe("£3.50");
  });
  it("subscription", () => {
    expect(subscriptionLabel(500)).toBe("Subscription: " + formatPrice(500));
    expect(subscriptionTotal([100, 250])).toBe("£3.50");
  });
  it("giftCard", () => {
    expect(giftCardLabel(500)).toBe("GiftCard: " + formatPrice(500));
    expect(giftCardTotal([100, 250])).toBe("£3.50");
  });
  it("loyalty", () => {
    expect(loyaltyLabel(500)).toBe("Loyalty: " + formatPrice(500));
    expect(loyaltyTotal([100, 250])).toBe("£3.50");
  });
  it("bundle", () => {
    expect(bundleLabel(500)).toBe("Bundle: " + formatPrice(500));
    expect(bundleTotal([100, 250])).toBe("£3.50");
  });
  it("upsell", () => {
    expect(upsellLabel(500)).toBe("Upsell: " + formatPrice(500));
    expect(upsellTotal([100, 250])).toBe("£3.50");
  });
  it("priceAlert", () => {
    expect(priceAlertLabel(500)).toBe("PriceAlert: " + formatPrice(500));
    expect(priceAlertTotal([100, 250])).toBe("£3.50");
  });
  it("compare", () => {
    expect(compareLabel(500)).toBe("Compare: " + formatPrice(500));
    expect(compareTotal([100, 250])).toBe("£3.50");
  });
  it("quote", () => {
    expect(quoteLabel(500)).toBe("Quote: " + formatPrice(500));
    expect(quoteTotal([100, 250])).toBe("£3.50");
  });
  it("storeCredit", () => {
    expect(storeCreditLabel(500)).toBe("StoreCredit: " + formatPrice(500));
    expect(storeCreditTotal([100, 250])).toBe("£3.50");
  });
  it("tip", () => {
    expect(tipLabel(500)).toBe("Tip: " + formatPrice(500));
    expect(tipTotal([100, 250])).toBe("£3.50");
  });
  it("deposit", () => {
    expect(depositLabel(500)).toBe("Deposit: " + formatPrice(500));
    expect(depositTotal([100, 250])).toBe("£3.50");
  });
  it("layaway", () => {
    expect(layawayLabel(500)).toBe("Layaway: " + formatPrice(500));
    expect(layawayTotal([100, 250])).toBe("£3.50");
  });
  it("rental", () => {
    expect(rentalLabel(500)).toBe("Rental: " + formatPrice(500));
    expect(rentalTotal([100, 250])).toBe("£3.50");
  });
  it("auction", () => {
    expect(auctionLabel(500)).toBe("Auction: " + formatPrice(500));
    expect(auctionTotal([100, 250])).toBe("£3.50");
  });
  it("preorder", () => {
    expect(preorderLabel(500)).toBe("Preorder: " + formatPrice(500));
    expect(preorderTotal([100, 250])).toBe("£3.50");
  });
  it("voucher", () => {
    expect(voucherLabel(500)).toBe("Voucher: " + formatPrice(500));
    expect(voucherTotal([100, 250])).toBe("£3.50");
  });
  it("cashback", () => {
    expect(cashbackLabel(500)).toBe("Cashback: " + formatPrice(500));
    expect(cashbackTotal([100, 250])).toBe("£3.50");
  });
  it("budget", () => {
    expect(budgetLabel(500)).toBe("Budget: " + formatPrice(500));
    expect(budgetTotal([100, 250])).toBe("£3.50");
  });
  it("split", () => {
    expect(splitLabel(500)).toBe("Split: " + formatPrice(500));
    expect(splitTotal([100, 250])).toBe("£3.50");
  });
  it("donation", () => {
    expect(donationLabel(500)).toBe("Donation: " + formatPrice(500));
    expect(donationTotal([100, 250])).toBe("£3.50");
  });
  it("membership", () => {
    expect(membershipLabel(500)).toBe("Membership: " + formatPrice(500));
    expect(membershipTotal([100, 250])).toBe("£3.50");
  });
  it("fee", () => {
    expect(feeLabel(500)).toBe("Fee: " + formatPrice(500));
    expect(feeTotal([100, 250])).toBe("£3.50");
  });
});

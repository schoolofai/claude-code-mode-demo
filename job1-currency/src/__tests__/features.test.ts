import { describe, it, expect } from "vitest";
import * as cartM from "../features/cart";
import * as checkoutM from "../features/checkout";
import * as invoiceM from "../features/invoice";
import * as receiptM from "../features/receipt";
import * as refundM from "../features/refund";
import * as discountM from "../features/discount";
import * as shippingM from "../features/shipping";
import * as taxM from "../features/tax";
import * as wishlistM from "../features/wishlist";
import * as catalogM from "../features/catalog";
import * as searchM from "../features/search";
import * as productCardM from "../features/productCard";
import * as orderHistoryM from "../features/orderHistory";
import * as subscriptionM from "../features/subscription";
import * as giftCardM from "../features/giftCard";
import * as loyaltyM from "../features/loyalty";
import * as bundleM from "../features/bundle";
import * as upsellM from "../features/upsell";
import * as priceAlertM from "../features/priceAlert";
import * as compareM from "../features/compare";
import * as quoteM from "../features/quote";
import * as storeCreditM from "../features/storeCredit";
import * as tipM from "../features/tip";
import * as depositM from "../features/deposit";
import * as layawayM from "../features/layaway";
import * as rentalM from "../features/rental";
import * as auctionM from "../features/auction";
import * as preorderM from "../features/preorder";
import * as voucherM from "../features/voucher";
import * as cashbackM from "../features/cashback";
import * as budgetM from "../features/budget";
import * as splitM from "../features/split";
import * as donationM from "../features/donation";
import * as membershipM from "../features/membership";
import * as feeM from "../features/fee";
import * as insuranceM from "../features/insurance";
const { cartLabel, cartTotal, cartLines, cartFee, cartExample, cartEuroReference } = cartM;
const { checkoutLabel, checkoutTotal, checkoutLines, checkoutFee, checkoutExample } = checkoutM;
const { invoiceLabel, invoiceTotal, invoiceLines, invoiceFee, invoiceExample } = invoiceM;
const { receiptLabel, receiptTotal, receiptLines, receiptFee, receiptExample } = receiptM;
const { refundLabel, refundTotal, refundLines, refundFee, refundExample } = refundM;
const { discountLabel, discountTotal, discountLines, discountFee, discountExample, discountEuroReference } = discountM;
const { shippingLabel, shippingTotal, shippingLines, shippingFee, shippingExample } = shippingM;
const { taxLabel, taxTotal, taxLines, taxFee, taxExample } = taxM;
const { wishlistLabel, wishlistTotal, wishlistLines, wishlistFee, wishlistExample } = wishlistM;
const { catalogLabel, catalogTotal, catalogLines, catalogFee, catalogExample } = catalogM;
const { searchLabel, searchTotal, searchLines, searchFee, searchExample, searchEuroReference } = searchM;
const { productCardLabel, productCardTotal, productCardLines, productCardFee, productCardExample } = productCardM;
const { orderHistoryLabel, orderHistoryTotal, orderHistoryLines, orderHistoryFee, orderHistoryExample } = orderHistoryM;
const { subscriptionLabel, subscriptionTotal, subscriptionLines, subscriptionFee, subscriptionExample } = subscriptionM;
const { giftCardLabel, giftCardTotal, giftCardLines, giftCardFee, giftCardExample } = giftCardM;
const { loyaltyLabel, loyaltyTotal, loyaltyLines, loyaltyFee, loyaltyExample, loyaltyEuroReference } = loyaltyM;
const { bundleLabel, bundleTotal, bundleLines, bundleFee, bundleExample } = bundleM;
const { upsellLabel, upsellTotal, upsellLines, upsellFee, upsellExample } = upsellM;
const { priceAlertLabel, priceAlertTotal, priceAlertLines, priceAlertFee, priceAlertExample } = priceAlertM;
const { compareLabel, compareTotal, compareLines, compareFee, compareExample } = compareM;
const { quoteLabel, quoteTotal, quoteLines, quoteFee, quoteExample, quoteEuroReference } = quoteM;
const { storeCreditLabel, storeCreditTotal, storeCreditLines, storeCreditFee, storeCreditExample } = storeCreditM;
const { tipLabel, tipTotal, tipLines, tipFee, tipExample } = tipM;
const { depositLabel, depositTotal, depositLines, depositFee, depositExample } = depositM;
const { layawayLabel, layawayTotal, layawayLines, layawayFee, layawayExample } = layawayM;
const { rentalLabel, rentalTotal, rentalLines, rentalFee, rentalExample, rentalEuroReference } = rentalM;
const { auctionLabel, auctionTotal, auctionLines, auctionFee, auctionExample } = auctionM;
const { preorderLabel, preorderTotal, preorderLines, preorderFee, preorderExample } = preorderM;
const { voucherLabel, voucherTotal, voucherLines, voucherFee, voucherExample } = voucherM;
const { cashbackLabel, cashbackTotal, cashbackLines, cashbackFee, cashbackExample } = cashbackM;
const { budgetLabel, budgetTotal, budgetLines, budgetFee, budgetExample, budgetEuroReference } = budgetM;
const { splitLabel, splitTotal, splitLines, splitFee, splitExample } = splitM;
const { donationLabel, donationTotal, donationLines, donationFee, donationExample } = donationM;
const { membershipLabel, membershipTotal, membershipLines, membershipFee, membershipExample } = membershipM;
const { feeLabel, feeTotal, feeLines, feeFee, feeExample } = feeM;
const { insuranceLabel, insuranceTotal, insuranceLines, insuranceFee, insuranceExample, insuranceEuroReference } = insuranceM;

describe("every call passes the right currency", () => {
  it("cart", () => {
    expect(cartLabel(500, "USD")).toBe("Cart: $5.00");
    expect(cartTotal([100, 250])).toBe("€3.50");
    expect(cartLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(cartFee(10000, 200, "USD")).toBe("$3.00");
    expect(cartExample).toBe("€3.99");
    expect(cartEuroReference(1234)).toBe("€12.34");
  });
  it("checkout", () => {
    expect(checkoutLabel(500, "USD")).toBe("Checkout: $5.00");
    expect(checkoutTotal([100, 250])).toBe("$3.50");
    expect(checkoutLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(checkoutFee(10000, 200, "USD")).toBe("$4.00");
    expect(checkoutExample).toBe("$4.99");
  });
  it("invoice", () => {
    expect(invoiceLabel(500, "USD")).toBe("Invoice: $5.00");
    expect(invoiceTotal([100, 250])).toBe("£3.50");
    expect(invoiceLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(invoiceFee(10000, 200, "USD")).toBe("$5.00");
    expect(invoiceExample).toBe("£5.99");
  });
  it("receipt", () => {
    expect(receiptLabel(500, "USD")).toBe("Receipt: $5.00");
    expect(receiptTotal([100, 250])).toBe("$3.50");
    expect(receiptLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(receiptFee(10000, 200, "USD")).toBe("$6.00");
    expect(receiptExample).toBe("$6.99");
  });
  it("refund", () => {
    expect(refundLabel(500, "USD")).toBe("Refund: $5.00");
    expect(refundTotal([100, 250])).toBe("€3.50");
    expect(refundLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(refundFee(10000, 200, "USD")).toBe("$7.00");
    expect(refundExample).toBe("€7.99");
  });
  it("discount", () => {
    expect(discountLabel(500, "USD")).toBe("Discount: $5.00");
    expect(discountTotal([100, 250])).toBe("£3.50");
    expect(discountLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(discountFee(10000, 200, "USD")).toBe("$8.00");
    expect(discountExample).toBe("£8.99");
    expect(discountEuroReference(1234)).toBe("€12.34");
  });
  it("shipping", () => {
    expect(shippingLabel(500, "USD")).toBe("Shipping: $5.00");
    expect(shippingTotal([100, 250])).toBe("£3.50");
    expect(shippingLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(shippingFee(10000, 200, "USD")).toBe("$9.00");
    expect(shippingExample).toBe("£9.99");
  });
  it("tax", () => {
    expect(taxLabel(500, "USD")).toBe("Tax: $5.00");
    expect(taxTotal([100, 250])).toBe("£3.50");
    expect(taxLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(taxFee(10000, 200, "USD")).toBe("$3.00");
    expect(taxExample).toBe("£10.99");
  });
  it("wishlist", () => {
    expect(wishlistLabel(500, "USD")).toBe("Wishlist: $5.00");
    expect(wishlistTotal([100, 250])).toBe("£3.50");
    expect(wishlistLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(wishlistFee(10000, 200, "USD")).toBe("$4.00");
    expect(wishlistExample).toBe("£11.99");
  });
  it("catalog", () => {
    expect(catalogLabel(500, "USD")).toBe("Catalog: $5.00");
    expect(catalogTotal([100, 250])).toBe("€3.50");
    expect(catalogLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(catalogFee(10000, 200, "USD")).toBe("$5.00");
    expect(catalogExample).toBe("€12.99");
  });
  it("search", () => {
    expect(searchLabel(500, "USD")).toBe("Search: $5.00");
    expect(searchTotal([100, 250])).toBe("€3.50");
    expect(searchLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(searchFee(10000, 200, "USD")).toBe("$6.00");
    expect(searchExample).toBe("€13.99");
    expect(searchEuroReference(1234)).toBe("€12.34");
  });
  it("productCard", () => {
    expect(productCardLabel(500, "USD")).toBe("ProductCard: $5.00");
    expect(productCardTotal([100, 250])).toBe("£3.50");
    expect(productCardLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(productCardFee(10000, 200, "USD")).toBe("$7.00");
    expect(productCardExample).toBe("£14.99");
  });
  it("orderHistory", () => {
    expect(orderHistoryLabel(500, "USD")).toBe("OrderHistory: $5.00");
    expect(orderHistoryTotal([100, 250])).toBe("€3.50");
    expect(orderHistoryLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(orderHistoryFee(10000, 200, "USD")).toBe("$8.00");
    expect(orderHistoryExample).toBe("€15.99");
  });
  it("subscription", () => {
    expect(subscriptionLabel(500, "USD")).toBe("Subscription: $5.00");
    expect(subscriptionTotal([100, 250])).toBe("$3.50");
    expect(subscriptionLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(subscriptionFee(10000, 200, "USD")).toBe("$9.00");
    expect(subscriptionExample).toBe("$16.99");
  });
  it("giftCard", () => {
    expect(giftCardLabel(500, "USD")).toBe("GiftCard: $5.00");
    expect(giftCardTotal([100, 250])).toBe("£3.50");
    expect(giftCardLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(giftCardFee(10000, 200, "USD")).toBe("$3.00");
    expect(giftCardExample).toBe("£17.99");
  });
  it("loyalty", () => {
    expect(loyaltyLabel(500, "USD")).toBe("Loyalty: $5.00");
    expect(loyaltyTotal([100, 250])).toBe("$3.50");
    expect(loyaltyLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(loyaltyFee(10000, 200, "USD")).toBe("$4.00");
    expect(loyaltyExample).toBe("$18.99");
    expect(loyaltyEuroReference(1234)).toBe("€12.34");
  });
  it("bundle", () => {
    expect(bundleLabel(500, "USD")).toBe("Bundle: $5.00");
    expect(bundleTotal([100, 250])).toBe("€3.50");
    expect(bundleLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(bundleFee(10000, 200, "USD")).toBe("$5.00");
    expect(bundleExample).toBe("€19.99");
  });
  it("upsell", () => {
    expect(upsellLabel(500, "USD")).toBe("Upsell: $5.00");
    expect(upsellTotal([100, 250])).toBe("£3.50");
    expect(upsellLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(upsellFee(10000, 200, "USD")).toBe("$6.00");
    expect(upsellExample).toBe("£20.99");
  });
  it("priceAlert", () => {
    expect(priceAlertLabel(500, "USD")).toBe("PriceAlert: $5.00");
    expect(priceAlertTotal([100, 250])).toBe("£3.50");
    expect(priceAlertLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(priceAlertFee(10000, 200, "USD")).toBe("$7.00");
    expect(priceAlertExample).toBe("£21.99");
  });
  it("compare", () => {
    expect(compareLabel(500, "USD")).toBe("Compare: $5.00");
    expect(compareTotal([100, 250])).toBe("£3.50");
    expect(compareLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(compareFee(10000, 200, "USD")).toBe("$8.00");
    expect(compareExample).toBe("£22.99");
  });
  it("quote", () => {
    expect(quoteLabel(500, "USD")).toBe("Quote: $5.00");
    expect(quoteTotal([100, 250])).toBe("£3.50");
    expect(quoteLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(quoteFee(10000, 200, "USD")).toBe("$9.00");
    expect(quoteExample).toBe("£23.99");
    expect(quoteEuroReference(1234)).toBe("€12.34");
  });
  it("storeCredit", () => {
    expect(storeCreditLabel(500, "USD")).toBe("StoreCredit: $5.00");
    expect(storeCreditTotal([100, 250])).toBe("€3.50");
    expect(storeCreditLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(storeCreditFee(10000, 200, "USD")).toBe("$3.00");
    expect(storeCreditExample).toBe("€24.99");
  });
  it("tip", () => {
    expect(tipLabel(500, "USD")).toBe("Tip: $5.00");
    expect(tipTotal([100, 250])).toBe("€3.50");
    expect(tipLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(tipFee(10000, 200, "USD")).toBe("$4.00");
    expect(tipExample).toBe("€25.99");
  });
  it("deposit", () => {
    expect(depositLabel(500, "USD")).toBe("Deposit: $5.00");
    expect(depositTotal([100, 250])).toBe("£3.50");
    expect(depositLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(depositFee(10000, 200, "USD")).toBe("$5.00");
    expect(depositExample).toBe("£26.99");
  });
  it("layaway", () => {
    expect(layawayLabel(500, "USD")).toBe("Layaway: $5.00");
    expect(layawayTotal([100, 250])).toBe("€3.50");
    expect(layawayLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(layawayFee(10000, 200, "USD")).toBe("$6.00");
    expect(layawayExample).toBe("€27.99");
  });
  it("rental", () => {
    expect(rentalLabel(500, "USD")).toBe("Rental: $5.00");
    expect(rentalTotal([100, 250])).toBe("$3.50");
    expect(rentalLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(rentalFee(10000, 200, "USD")).toBe("$7.00");
    expect(rentalExample).toBe("$28.99");
    expect(rentalEuroReference(1234)).toBe("€12.34");
  });
  it("auction", () => {
    expect(auctionLabel(500, "USD")).toBe("Auction: $5.00");
    expect(auctionTotal([100, 250])).toBe("£3.50");
    expect(auctionLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(auctionFee(10000, 200, "USD")).toBe("$8.00");
    expect(auctionExample).toBe("£29.99");
  });
  it("preorder", () => {
    expect(preorderLabel(500, "USD")).toBe("Preorder: $5.00");
    expect(preorderTotal([100, 250])).toBe("$3.50");
    expect(preorderLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(preorderFee(10000, 200, "USD")).toBe("$9.00");
    expect(preorderExample).toBe("$30.99");
  });
  it("voucher", () => {
    expect(voucherLabel(500, "USD")).toBe("Voucher: $5.00");
    expect(voucherTotal([100, 250])).toBe("€3.50");
    expect(voucherLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(voucherFee(10000, 200, "USD")).toBe("$3.00");
    expect(voucherExample).toBe("€31.99");
  });
  it("cashback", () => {
    expect(cashbackLabel(500, "USD")).toBe("Cashback: $5.00");
    expect(cashbackTotal([100, 250])).toBe("£3.50");
    expect(cashbackLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(cashbackFee(10000, 200, "USD")).toBe("$4.00");
    expect(cashbackExample).toBe("£32.99");
  });
  it("budget", () => {
    expect(budgetLabel(500, "USD")).toBe("Budget: $5.00");
    expect(budgetTotal([100, 250])).toBe("£3.50");
    expect(budgetLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(budgetFee(10000, 200, "USD")).toBe("$5.00");
    expect(budgetExample).toBe("£33.99");
    expect(budgetEuroReference(1234)).toBe("€12.34");
  });
  it("split", () => {
    expect(splitLabel(500, "USD")).toBe("Split: $5.00");
    expect(splitTotal([100, 250])).toBe("£3.50");
    expect(splitLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(splitFee(10000, 200, "USD")).toBe("$6.00");
    expect(splitExample).toBe("£34.99");
  });
  it("donation", () => {
    expect(donationLabel(500, "USD")).toBe("Donation: $5.00");
    expect(donationTotal([100, 250])).toBe("£3.50");
    expect(donationLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(donationFee(10000, 200, "USD")).toBe("$7.00");
    expect(donationExample).toBe("£35.99");
  });
  it("membership", () => {
    expect(membershipLabel(500, "USD")).toBe("Membership: $5.00");
    expect(membershipTotal([100, 250])).toBe("€3.50");
    expect(membershipLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(membershipFee(10000, 200, "USD")).toBe("$8.00");
    expect(membershipExample).toBe("€36.99");
  });
  it("fee", () => {
    expect(feeLabel(500, "USD")).toBe("Fee: $5.00");
    expect(feeTotal([100, 250])).toBe("€3.50");
    expect(feeLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(feeFee(10000, 200, "USD")).toBe("$9.00");
    expect(feeExample).toBe("€37.99");
  });
  it("insurance", () => {
    expect(insuranceLabel(500, "USD")).toBe("Insurance: $5.00");
    expect(insuranceTotal([100, 250])).toBe("£3.50");
    expect(insuranceLines([100, 2500], "EUR")).toEqual(["€1.00", "€25.00"]);
    expect(insuranceFee(10000, 200, "USD")).toBe("$3.00");
    expect(insuranceExample).toBe("£38.99");
    expect(insuranceEuroReference(1234)).toBe("€12.34");
  });
});

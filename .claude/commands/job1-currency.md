---
description: Job 1 - pass the right currency to every formatMoney call
---
In job1-currency/src, formatMoney no longer has a default currency, so the tests fail. Fix every formatMoney call that leaves the currency out by passing the right currency for that spot: the enclosing function's currency parameter if it has one, otherwise the file's STORE_CURRENCY, otherwise currencyFor(MARKET), otherwise "GBP". Leave calls that already pass a currency alone. Then run npm run test:job1 and tell me whether all tests pass.

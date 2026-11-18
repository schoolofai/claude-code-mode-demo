# Job 1: pass the right currency to every formatMoney call (36 files)

Anthropic's docs suggest Code Mode for "a change that repeats across many files". This one repeats, but the right change depends on where each call sits, so a single find-and-replace can't do it.

## The setup
`job1-currency/src` is a small TypeScript shop library. `formatMoney(minor, currency)` in `src/lib/money.ts` used to default to GBP; now the currency is required. 180 calls across 36 feature files leave it out, and the tests fail.

## The prompt (`/job1-currency`)
> In job1-currency/src, formatMoney no longer has a default currency, so the tests fail. Fix every formatMoney call that leaves the currency out by passing the right currency for that spot: the enclosing function's currency parameter if it has one, otherwise the file's STORE_CURRENCY, otherwise currencyFor(MARKET), otherwise "GBP". Leave calls that already pass a currency alone. Then run npm run test:job1 and tell me whether all tests pass.

## Why a one-liner fails
- `sed 's/formatMoney(\(.*\))/formatMoney(\1, "GBP")/'` leaves 36 of 36 feature tests failing (customers in the EU and US see pounds).
- Passing `currency` everywhere breaks files with no `currency` in scope, and the test file won't even load.
- Some calls span several lines, some are inside arrow functions, and some already pass a currency.

## Check it
`npm run test:job1`: 40 tests, all should pass. `./scripts/reset.sh` puts the files back.

## What I got
See [results.md](results.md).

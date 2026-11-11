# Pricing — Page Spec

**Route:** `/pricing` (live behind `featureFlags.showPricingPage`; when the flag is false the route redirects to `/contact?source=pricing`)
**Source:** `src/pages/Pricing.tsx`, styles at the end of `src/styles/marketing.css` (`marketing-plan-*`, `marketing-pricing-*`)
**Updated:** 2026-11-11 (rebuilt from the old Developer / Team / Enterprise page, which was not routed)

## One place for the numbers

Every price, plan name, included credit, trial amount and limit on this page comes from **`src/config/pricing.ts`**. The billing FAQ (`src/config/billingFaq.ts`), the SEO description (`src/seo/metadata.ts`) and the legal Markdown (`{{tokens}}`, filled by `src/legal/policyTemplate.ts`) read the same file. **To change a price or a limit, edit that one file and rebuild.** Do not type a number into the page or into a policy.

Values come from decisions E1 to E19 of `docs/billing/BILLING_GO_LIVE_DECISIONS.md` in the monorepo. They are still being settled, so the page says "Prices and included credits may change before launch" (remove that line at launch).

## Structure (top to bottom)

| Section | Content | Source of the text |
|---|---|---|
| Hero (`PageHero`, centered) | "Pay for what your agents actually run."; primary "Start free trial" (Console), secondary "How credits work" | trial length and card rule from `TRIAL` |
| Plans (`#plans`) | One card per plan in `PLANS`: monthly price, yearly price and "two months free", model credits and platform credits included each month, "Choose <plan>" button to the Console. Then an Enterprise strip ("Talk to us" to `/contact?source=enterprise`) and a small note (USD, taxes added where required, yearly credits at the start of the year, prices may change) | `PLANS`, `YEARLY_MONTHS_PAID`, `ENTERPRISE` |
| How credits work (`#credits`, soft band) | Three cards: model credits, platform credits, top-ups | `TOP_UP` |
| Free trial (`#trial`) | Copy plus a dark fact panel (plan, length, platform credits, model credits, card needed) | `TRIAL` |
| Billing questions (`#billing-faq`, soft band) | Plain-words FAQ, each answer with a link to the matching section of the Billing and Credits Policy | `BILLING_FAQ` |
| Closing `CallToAction` | Start the trial, or talk to us | |

## What the page deliberately does not say

- No "Most popular" badge and no plan taglines: nothing in the system supports them.
- No plan limits on agents, runs or members, no "24/7 alerts": plans differ only by price and credits (decision E18). The old page's agent and run limits were never real.
- No prices per platform action (a workflow step, a tool call): still open in the decisions sheet.
- No top-up rate formula: the checkout shows how many credits a payment buys.
- No tax rates or registrations: "added where required" only.

## Verification checklist

- [ ] `npm run lint`, `npx tsc -p tsconfig.app.json --noEmit` and `npm run build` pass; `/pricing` is prerendered (it is in the sitemap).
- [ ] Prices on the page equal the table in the Billing and Credits Policy (both read `pricing.ts`).
- [ ] Phone width (390 px): plan cards stack in one column, no horizontal scroll, the fact panel and FAQ read cleanly.
- [ ] Menu and footer show "Pricing" only while the flag is true.
- [ ] Every CTA goes to the Console or to `/contact?source=enterprise`.

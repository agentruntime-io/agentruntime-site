# Billing and legal wording: review checklist

Written 2026-11-11 for the owner. This is the list of everything the new pricing page and the billing, terms and privacy wording **assume or leave open**, so the owner can confirm each point before the product goes public.

**This is drafting, not legal advice.** It was written from what the billing system does and from the decisions recorded in the monorepo (`docs/billing/BILLING_GO_LIVE_DECISIONS.md`, section E; `BILLING_SETTINGS_REFERENCE.md`; `PARTNER_PROGRAM_DESIGN.md`; `STRIPE_TAX_DESIGN.md`). A lawyer and an accountant should read the pages before launch. Where a page needed a fact I do not have, I wrote the sentence so it stays true without it and listed the gap here instead of guessing.

## How to finish the review

1. Go through the lines below and answer or change each one.
2. Remove the visible line **"This policy is under review and may change before launch."** from the four changed pages when you are happy. Search the repo for `under review and may change` (it is in `Billing_and_Credits_Policy.md`, `Terms_and_Conditions.md`, `Privacy_Policy.md` and `Partner_Program_Terms_DRAFT.md` under `src/docs/`).
3. Set the "Effective Date" of each page (it still says March 1, 2026 on the billing policy, terms and privacy policy; "Last Updated" is November 11, 2026).
4. Prices and credit amounts are **not** in the wording: they all come from one file, `src/config/pricing.ts`. Change a number there and rebuild; the pricing page, the billing FAQ and the policy text all follow.

## A. Company facts I did not know (not written into any page)

| # | What I left out | Where it matters | What you confirm |
|---|---|---|---|
| A1 | Registration number, state or country of incorporation, registered office | Terms 1.1 still says "a company incorporated under applicable laws" (unchanged). No policy prints a postal address. The site config (`src/config/company.ts`) has "30 N Gould St Ste R, Sheridan, WY 82801", which I did not copy into any policy | Whether to print the legal details, and whether that address is the registered office |
| A2 | Governing law and courts | Terms 19.1 says the law of "the jurisdiction in which AgentRuntime Labs LLC is incorporated" (unchanged). The partner draft (13.3) only points to the Terms | The actual law, the courts or arbitration, and the class-action waiver in Terms 19.3 |
| A3 | Who is the data controller, data protection contact, EU or UK representative | Privacy policy: only `privacy@agentruntime.io` is named (unchanged) | Whether you need a named contact or a representative for EU and UK users |
| A4 | VAT, GST or sales-tax registrations; tax invoice details; company tax number | Billing policy 4.5 and the pricing page say only "taxes are added where required", no rates, no countries | That this wording stays true once Stripe Tax is switched on (it is built and OFF today) |
| A5 | How long billing and tax records must be kept | Privacy 7 says "as long as the law requires", no number | The retention period your accountant gives you |
| A6 | Effective dates | All changed pages | The date each one takes effect |

## B. Billing and Credits Policy: points I assumed

Section numbers are those of `src/docs/Billing_and_Credits_Policy.md`.

| # | Assumption | Where | What you confirm |
|---|---|---|---|
| B1 | I kept the existing rule that fees are non-refundable unless the law or the policy says otherwise, and added no refund window. Refunds are "reviewed individually" on request to billing@agentruntime.io | 5.3 | Whether you want a refund window (for example for a first payment), and what to promise |
| B2 | A refund goes back to the original payment method through Stripe | 5.4 | Nothing new, it is how Stripe works; confirm you are happy to say it |
| B3 | A top-up refund removes the credits it granted, in proportion (the billing tests do this). For a plan payment refund I only say the plan's credits "may be removed": I did not confirm in the code that they are removed automatically | 5.5 | What you want to happen to plan credits on a plan refund, and then whether the system does it |
| B4 | A refund of a **yearly** plan deducts the value of the included credits already used (decision E11) | 5.6 | Your lawyer's view, with EU and UK consumer rights in mind |
| B5 | Chargebacks: credits are removed while the dispute is open, restored if we win, stay removed if the customer wins (matches what the system does) | 5.8 | That you want this stated publicly |
| B6 | Cancelling always takes effect at the **end of the billing period**; the customer cannot cancel immediately (only support can) | 3.5, 5.1 | That this is acceptable, including where the law requires an easy cancellation or an earlier end |
| B7 | A cancel or an ended subscription forfeits the plan's included credits and unused trial credits, and keeps top-up credits | 5.2 | That you want this stated publicly |
| B8 | Top-up credits **never expire** (decision E3: "stay until used") | 6.3 | Whether any country you sell in limits that, or whether you want an expiry or an inactivity rule |
| B9 | Credits have no cash value and are not withdrawable, except through a refund | 6.4 | Whether credits count as stored value or e-money anywhere, and whether Stripe accepts credits sold by the seller (an open item in the decisions sheet) |
| B10 | "Model credits you buy are priced to include the cost of processing the payment, so a payment buys slightly fewer model credits"; "the price of credits is the same whichever payment method you use"; platform credits at face value (decisions E4, E6, E7). The exact rate is not printed | 6.5(b) to (d), pricing page, billing FAQ | The lawyer and accountant check the wording against EU and UK surcharge rules and how the credits are taxed. Also check it sits well beside "no markup on the tokens" (2.4(a)) |
| B11 | "Model credits also pay for other work a provider charges us directly" (voice, the model part of memory jobs, decision E17). Memory embeddings and the Explorer chat are **not metered yet** | 6.1(a) | Fine as a statement of intent, or narrow it until that work is metered |
| B12 | Top-up limits (minimum, maximum, per 24 hours) are listed and "contact us for more" | 6.5 | The numbers in `pricing.ts` (decision E14) |
| B13 | Plan changes: an upgrade is paid at once and the new plan's credits are granted in proportion; if the payment fails the plan does not change | 3.5(a) | Nothing new, it is what the system does after the 2026-11-09 release |
| B14 | Trial: no card, one trial plan, at most three per person, credits expire at the end, a card added converts at the end of the trial | 1.3 | The numbers in `pricing.ts` (decision E12); that the trial rules can be stated this plainly |
| B15 | Usage is prepaid: when a kind of credit runs out, that usage stops (we do not bill after the fact) | 3.2 | Enterprise agreements are left to their own terms |
| B16 | Failed payment: we or Stripe may retry; access may be restricted while overdue; after the retries the subscription is cancelled. The earlier collections and cure-period wording (4.4) is kept as it was | 4.3, 4.4 | Whether 4.4 (collections agency, costs of collection) still reflects what you want to do |
| B17 | The bank-confirmation step (3-D Secure) is described in plain words | 4.6 | Nothing legal; confirm the description matches the Console |
| B18 | Billing disputes must be raised within 30 days (old wording, "thirty (30) days", now read from `pricing.ts`) | 10.1 | Whether 30 days is right for consumers |
| B19 | Consumers' statutory rights: only a general sentence that nothing in the policy limits them. **No** cooling-off or withdrawal waiver wording | 5.9 | The wording for EU and UK consumers (right to withdraw from a digital service, and how it is waived at checkout), which also lives in the Console checkout, not on this site |
| B20 | Prices are stated in US dollars only; an Order Form may differ | 1.2, Terms 10.1 | Nothing new (decision: all packages in USD) |
| B21 | "Price shown when you subscribe or top up is the price you pay" | 11.3 | That you want this commitment |

## C. Terms and Conditions: what I changed

`src/docs/Terms_and_Conditions.md`: the Billing and Credits Policy is now listed in 1.2 (it already said it was part of the Terms); 10.1 points to the pricing page and states prices in USD; 10.2 names Stripe; 10.3 points to the cancellation and refund rules; 10.4 adds that collected taxes are shown separately; new 10.7 (credits) and 10.8 (trials); 14.1 adds that a paid subscription cancels at the end of the period. Nothing else was touched. **Confirm:** that the new 10.7 and 10.8 are enough, or whether the Terms should repeat more of the billing policy.

## D. Privacy Policy: what I changed

`src/docs/Privacy_Policy.md`: 1.4 now names Stripe, lists the billing details kept (billing country and postal code, card brand and last four digits, invoices, credit balances and usage records), says a country, postal code and VAT number may be shared with Stripe to calculate tax and that a VAT number may be checked with the tax authority, and adds a paragraph for partners (their payout account id; bank and tax details stay at Stripe; they never see a customer's name or email). Section 5 names Stripe as an example processor, section 7 says billing and tax records are kept as long as the law requires, section 12 links Stripe's privacy policy. **Confirm:** the legal basis wording for tax data, whether Stripe is a processor or a separate controller in your view, and whether the Data Processing Agreement's sub-processor list (6.3, currently generic "payment processing providers", not edited) should name Stripe.

## E. Partner program terms (draft only)

`src/docs/Partner_Program_Terms_DRAFT.md`, shown at `/legal/partner-program-terms`. **The program ships OFF**, so this page is dated, marked DRAFT, **not linked** from the Legal index, the sidebar, the footer or the menu, **not in the sitemap or the llms files**, and served with `noindex` (a meta tag in the page and an `X-Robots-Tag` header in `vercel.json`). Only someone with the exact address can open it.

| # | Left open on purpose | What you confirm |
|---|---|---|
| E1 | The commission rate, the number of months it lasts, the hold period, the minimum payout and the payout day are **not printed**; the page says they are shown in the partner dashboard. The design defaults are 20%, 12 months, 30 days, $50 and the 5th of the month. **The 20% is a placeholder until prices are settled** | Whether to print numbers on the page, and the real rate |
| E2 | Amounts a partner owes after a late refund: "we may carry it against future commission or, at our discretion, write it off" (section 6.3) | Whether you want to say this, or chase the money |
| E3 | Payouts are US dollars only, through Stripe Connect; "we cannot pay a partner in a country Stripe does not support" (7.2). Which countries Stripe allows from your account is **not checked** | The real country list and Stripe's approval of Connect for this use |
| E4 | Taxes: the partner is independent and handles their own taxes; we may ask for tax forms, withhold where the law requires, and may ask for an invoice or issue a self-billing statement (section 8) | The accountant's answer on US forms (W-9 and 1099 or W-8), VAT on commission, self-billing and withholding. Where the company is registered decides these |
| E5 | Rules for partners: disclose that they are paid, follow advertising and anti-spam law, no self-referral, no bidding on our brand (section 9) | Whether the brand rules go further (for example named terms or domains) |
| E6 | A customer who uses a partner's code still gets the welcome credits; the partner gets cash instead of credits (3.4) | Nothing new, it is the design; confirm |
| E7 | Governing law and liability point back to the Terms of Service (13.3) | A lawyer's view on whether the partner program needs its own clauses |
| E8 | At launch: put this page's final address in the partner settings (`terms_url`, must be https) and raise `terms_version` so every partner accepts again | Do it when the program is switched on |

## F. The pricing page

`src/pages/Pricing.tsx` at `/pricing`. It was **not published before**: the address redirected to the contact page and the page was not linked anywhere. It is now live behind a flag (`featureFlags.showPricingPage`, set to true at your request on 2026-11-11), with a menu link, a footer link, a sitemap entry and an llms entry. Set the flag to false to put the old redirect back.

| # | Point | What you confirm |
|---|---|---|
| F1 | **The page shows the pricing that was decided on 2026-11-11 (decisions E8 to E12), but production does not apply it yet.** Today's production plans include 0 credits a month, the trial is 5 credits, and there is no Scale plan. The two-tracks build that makes the page true is finished and unreleased, with every switch off | Whether to keep the page live now, or set the flag to false until the build is switched on |
| F2 | Every price, plan name, included credit, trial amount and limit sits in `src/config/pricing.ts`. Nothing on the page is typed in separately | The final numbers (the pricing session is still settling them) |
| F3 | I removed claims that nothing in the system supports: the old Developer, Team and Enterprise cards, "5 agents", "100 runs a month", "24/7 status alerts", "Most popular". The page says only what is decided: four plans, two kinds of credit, a yearly price of ten times monthly, the trial, top-ups, no member limit, Enterprise by agreement | That nothing you want is missing |
| F4 | The page says "every plan has the full platform, with no limit on the number of members" (decision E18) | That you want this said |
| F5 | The page does not show prices per platform action (a workflow step, a tool call) because those are still open in the decisions sheet, and it does not state the top-up rate | When the action prices are set, whether to publish them |
| F6 | "Choose <plan>" and "Start free trial" go to the Console (`console.agentruntime.io`); there is no link straight to one plan | Nothing, unless you want deep links |
| F7 | The page says "Prices and included credits may change before launch" | Remove it at launch |

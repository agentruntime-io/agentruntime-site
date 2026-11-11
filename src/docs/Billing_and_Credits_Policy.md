# AGENTRUNTIME BILLING AND CREDITS POLICY

**Effective Date:** March 1, 2026
**Last Updated:** November 11, 2026

> **This policy is under review and may change before launch.**

This Billing and Credits Policy ("**Policy**") governs all billing, payment, credit, and subscription matters related to your use of the AgentRuntime platform and services (the "**Services**") provided by **AgentRuntime Labs LLC** ("**AgentRuntime**," "**we**," "**us**," or "**our**"). This Policy is incorporated by reference into AgentRuntime's Terms of Service and constitutes a binding part of your agreement with AgentRuntime.

Capitalized terms not defined in this Policy have the meanings given to them in the Terms of Service.

Payments are processed by **Stripe**, our payment provider.

---

## 1. PRICING AND SUBSCRIPTION PLANS

**1.1 Plans.** AgentRuntime offers {{plans.count}} self-serve subscription plans: {{plans.names}}. Each plan is billed monthly or yearly, as you choose when you subscribe. The plans differ by price and by the credits they include; they do not limit the number of members in your workspace. A sales-assisted Enterprise plan is arranged by agreement. You can also buy credits on their own, without a subscription, by topping up (Section 6.5). AgentRuntime may also offer free or trial offerings, promotional pricing, and other pricing models, each subject to the terms stated when it is offered.

**1.2 Prices.** Prices are in {{currency.name}}. At the date of this version of the Policy, the self-serve plans are:

{{plans.table}}

The yearly price is {{yearly.monthsPaid}} times the monthly price: a yearly plan is paid for {{yearly.monthsPaid}} months and covers {{yearly.months}}. The same plans and prices are shown on the Pricing Page of AgentRuntime's website (the "**Pricing Page**"). Prices exclude taxes (Section 4.5). AgentRuntime may update plan offerings and pricing in accordance with Section 11 of this Policy.

**1.3 Free Trial.** Eligible users can start a free trial of the {{trial.plan}} plan that lasts {{trial.days}} days. No payment card is needed to start. The trial includes {{trial.platformCredits}} of platform credits and {{trial.modelCredits}} of model credits (Section 6). One person can start at most {{trial.maxPerPerson}} trials across all of their workspaces. If you add a payment card, the paid plan starts when the trial ends, or earlier if you choose to start billing. If you do not add a card, the trial ends when the {{trial.days}} days are over, nothing is charged, and the credits left from the trial expire. We may change or end the trial offer for new trials at any time.

**1.4 Order of Precedence.** In the event of a conflict between this Policy and a separately executed Order Form or enterprise agreement, the Order Form or enterprise agreement shall prevail with respect to the commercial terms.

---

## 2. USAGE MEASUREMENT

**2.1 Metered Usage.** Usage of the Services is measured using objective platform usage metrics, which may include, without limitation:

&nbsp;&nbsp;&nbsp;&nbsp;(a) number of workflow executions and automated tasks;

&nbsp;&nbsp;&nbsp;&nbsp;(b) compute time, including processing duration of agent operations;

&nbsp;&nbsp;&nbsp;&nbsp;(c) API requests made to AgentRuntime endpoints;

&nbsp;&nbsp;&nbsp;&nbsp;(d) data storage consumption;

&nbsp;&nbsp;&nbsp;&nbsp;(e) data transfer and egress volumes;

&nbsp;&nbsp;&nbsp;&nbsp;(f) integration and connector usage; and

&nbsp;&nbsp;&nbsp;&nbsp;(g) consumption of Third-Party Services billed through AgentRuntime, including but not limited to external AI model API calls.

**2.2 Authoritative Records.** Usage metrics are recorded automatically by AgentRuntime's platform infrastructure. AgentRuntime's usage records shall be considered authoritative for billing purposes, absent manifest error.

**2.3 Access to Usage Data.** AgentRuntime will endeavor to make usage data available to you through the platform dashboard. You are responsible for monitoring your usage to avoid unintended charges.

**2.4 How Usage Is Charged.** Usage is paid for with credits (Section 6):

&nbsp;&nbsp;&nbsp;&nbsp;(a) **Hosted models.** When your agents use a model that AgentRuntime pays the model provider for, the usage is charged to your model credits at the model provider's price for the tokens used, with no markup on the tokens;

&nbsp;&nbsp;&nbsp;&nbsp;(b) **Your own provider keys.** When your agents use a model through your own provider key, the provider bills you directly and AgentRuntime does not charge you for those tokens. AgentRuntime charges only for the platform actions in the same workflow; and

&nbsp;&nbsp;&nbsp;&nbsp;(c) **Platform actions.** Workflow steps and other work done by the platform are charged to your platform credits at the price set for that action. Prices of platform actions are set by AgentRuntime and may change in accordance with Section 11.

---

## 3. BILLING CYCLE AND INVOICING

**3.1 Subscription Billing.** Subscription fees are billed in advance on a recurring basis, either monthly or annually, as elected by you at the time of enrollment, unless otherwise specified in an applicable Order Form. A yearly plan is one payment for the year.

**3.2 Credits, Not Billing in Arrears.** On self-serve plans, usage is paid for with prepaid credits: the credits included in your plan and the credits you buy by top-up. We do not bill self-serve usage after the fact. When the credits that a kind of usage needs are used up, that usage stops until you add credits or your plan's included credits are granted again. Enterprise customers may be subject to different terms under their agreement.

**3.3 Enterprise Billing.** Enterprise customers may be subject to custom billing cycles, invoicing terms, and payment conditions as set forth in their applicable enterprise agreement.

**3.4 Invoices.** AgentRuntime, or Stripe on its behalf, will provide invoices or receipts electronically to the email address associated with your billing profile or as otherwise specified, and your payment history is available in the Console. It is your responsibility to ensure your billing contact information remains current.

**3.5 Changing or Ending a Plan.**

&nbsp;&nbsp;&nbsp;&nbsp;(a) **Upgrades take effect right away.** You pay the prorated difference for the rest of the current billing period at once. If that payment does not go through, your plan stays as it was. After a successful upgrade, the credits included in the new plan are granted in proportion to the rest of the billing period.

&nbsp;&nbsp;&nbsp;&nbsp;(b) **Downgrades and cancellations take effect at the end of the current billing period.** You keep your current plan, and the credits it includes, until then.

&nbsp;&nbsp;&nbsp;&nbsp;(c) **You can change your mind.** A scheduled downgrade or cancellation can be withdrawn in the Console before it takes effect ("Keep my subscription").

---

## 4. PAYMENT

**4.1 Payment Methods.** Payments must be made using payment methods approved and supported by AgentRuntime at the time of purchase. Accepted payment methods are detailed on the platform. Payments are processed by Stripe. AgentRuntime does not store your full card number.

**4.2 Automatic Renewal.** Unless you cancel your subscription prior to the renewal date, subscriptions will automatically renew for successive billing periods at the then-current pricing. By subscribing, you authorize AgentRuntime to charge your designated payment method at each renewal.

**4.3 Failed Payments.** If a payment is declined or otherwise fails, AgentRuntime or Stripe may: (a) retry the charge automatically on later dates or with another saved method; (b) notify you of the payment failure and request updated payment information; and (c) suspend or restrict access to the Services, including starting workflow runs, until all outstanding amounts are paid in full. If a subscription payment cannot be collected after the retries, the subscription is cancelled and Section 5.2 applies.

**4.4 Overdue Accounts.** Unpaid invoices that remain outstanding following the applicable due date may be subject to: (a) service suspension; (b) account restrictions; (c) referral to a collections agency; and/or (d) termination of the account following written notice and a reasonable cure period. AgentRuntime reserves the right to recover unpaid balances, including reasonable costs of collection.

**4.5 Taxes.** All prices are exclusive of applicable taxes, duties, levies, and governmental charges. Where AgentRuntime is required to collect value-added tax, sales tax, or a similar tax on your purchase, it is added to the price at checkout or on your invoice and shown as a separate amount. To work out the tax, we may ask for billing details such as your country, your postal code and, if you buy as a business, a tax or VAT registration number. Tax does not change how many credits a purchase gives: credits are granted for the price before tax. You are responsible for paying all other applicable taxes in connection with your purchase of the Services.

**4.6 Bank Confirmation.** Your bank or card issuer may ask you to confirm a payment, for example through a 3-D Secure step. The Console tells you when this is needed. Until you confirm, the payment is not complete: a new subscription or an upgrade does not start, and a trial continues. A confirmation that is not completed in time expires, and you can start again.

---

## 5. CANCELLATION AND REFUNDS

**5.1 Cancelling a Subscription.** You can cancel a subscription at any time in the Console. The cancellation takes effect at the end of the current billing period (Section 3.5). You keep your plan, and the credits it includes, until then, and no further subscription payment is taken after it ends. You do not receive a refund of the prepaid fee for the rest of the period unless Section 5.3 or applicable law provides otherwise.

**5.2 Credits When a Subscription Ends.** When a subscription ends, the credits that came with it end too: the credits included in the plan and any credits left from a trial. Credits you bought by top-up are not affected. You keep them and can keep using them (Section 6).

**5.3 Refunds in General.** All fees paid to AgentRuntime are non-refundable unless otherwise expressly required by applicable law or specifically stated in this Policy. To ask for a refund, write to **billing@agentruntime.io** with your account identifier, the payment, and the reason. We review each request individually and will tell you the outcome.

**5.4 How Refunds Are Paid.** A refund is paid to the payment method used for the original payment, through Stripe. How long it takes to show on your statement depends on your bank or card issuer.

**5.5 Credits and Refunds.** When a top-up is refunded, the credits it granted are removed from your balance in proportion to the refund. When a plan payment is refunded, the credits included with that plan period may be removed too. If some of those credits have already been used, we may refund only the part that was not used. Credits that have been used are not refunded, except for a confirmed billing error (Section 5.7).

**5.6 Yearly Plans.** If a yearly plan is refunded, the value of the included credits you have already used is deducted from the refund. Included credits that are not used end when the plan ends.

**5.7 Billing Errors.** In the event of a confirmed billing error, AgentRuntime will apply a correction in the form of a credit to your account or, at AgentRuntime's election, a refund of the overcharged amount. See Section 10 for the dispute resolution procedure.

**5.8 Disputes With Your Bank.** If you ask your bank or card issuer to reverse a payment (a chargeback), the credits that payment granted are removed from your balance while the dispute is open. If the payment is upheld, the credits are restored. If the payment is reversed in your favor, the credits stay removed. We encourage you to contact **billing@agentruntime.io** first, because we may be able to resolve the problem faster.

**5.9 Statutory Rights.** Nothing in this Policy excludes or limits any rights to refunds or to cancel a purchase that you may have under applicable consumer protection or statutory law.

---

## 6. CREDITS

**6.1 Two Kinds of Credits.** Credits are a prepaid balance in your workspace ("**Credits**"). They come in two kinds, shown separately in the Console:

&nbsp;&nbsp;&nbsp;&nbsp;(a) **Model credits** pay for usage of hosted models (Section 2.4(a)) and for other work for which an AI or speech provider charges AgentRuntime directly; and

&nbsp;&nbsp;&nbsp;&nbsp;(b) **Platform credits** pay for workflow steps and the other platform actions described in Section 2.4(c).

Each kind of Credits is spent only on its own kind of usage.

**6.2 Where Credits Come From.**

&nbsp;&nbsp;&nbsp;&nbsp;(a) **Your plan.** Each plan includes the Credits shown in Section 1.2 for every billing month. A yearly plan grants {{yearly.months}} months of its included Credits at once, at the start of the year.

&nbsp;&nbsp;&nbsp;&nbsp;(b) **A free trial.** The Credits described in Section 1.3.

&nbsp;&nbsp;&nbsp;&nbsp;(c) **A top-up.** Credits you buy (Section 6.5).

&nbsp;&nbsp;&nbsp;&nbsp;(d) **Other grants.** AgentRuntime may, at its discretion, issue Credits to users through promotional offers, service credits, developer grant programs, compensation for confirmed service outages, or referral programs. Referral rewards are platform credits.

**6.3 Expiry.** Credits included with a plan expire at the end of the billing period they were granted for, which is the end of the year for a yearly plan; they do not roll over. Credits from a free trial expire at the end of the trial. Credits you buy by top-up stay in your balance until they are used. Credits issued under Section 6.2(d) may carry an expiration date, which is stated when they are issued.

**6.4 Nature of Credits.** Credits:

&nbsp;&nbsp;&nbsp;&nbsp;(a) have no cash value and are not redeemable for cash, except where a refund is due under Section 5 or applicable law;

&nbsp;&nbsp;&nbsp;&nbsp;(b) are non-transferable and may not be sold, traded, or assigned to any third party;

&nbsp;&nbsp;&nbsp;&nbsp;(c) may only be applied against eligible Services as specified at the time of issuance;

&nbsp;&nbsp;&nbsp;&nbsp;(d) may be subject to an expiration date as described in Section 6.3, after which unused Credits will be forfeited; and

&nbsp;&nbsp;&nbsp;&nbsp;(e) may be subject to additional terms communicated at the time of issuance.

**6.5 Top-Ups.** You can buy Credits at any time by topping up. The minimum is {{topup.min}} and the maximum is {{topup.max}} per top-up, and one person can top up at most {{topup.maxPerDay}} in any 24 hours. If you need more, contact **billing@agentruntime.io**. AgentRuntime may change these limits. When you top up:

&nbsp;&nbsp;&nbsp;&nbsp;(a) you choose how the payment is split between model credits and platform credits, and you can later move Credits you bought by top-up from one kind to the other. Credits included with a plan cannot be moved;

&nbsp;&nbsp;&nbsp;&nbsp;(b) platform credits are credited at face value;

&nbsp;&nbsp;&nbsp;&nbsp;(c) model credits you buy, or get by moving platform credits, are priced to include the cost of processing the payment, so a payment buys slightly fewer model credits than the amount paid. Moving model credits to platform credits is one for one;

&nbsp;&nbsp;&nbsp;&nbsp;(d) the checkout shows exactly how many Credits your payment buys before you pay, and the price of Credits is the same whichever payment method you use; and

&nbsp;&nbsp;&nbsp;&nbsp;(e) taxes are handled as described in Section 4.5.

**6.6 Revocation.** AgentRuntime reserves the right to revoke Credits if they were obtained through fraud, misrepresentation, violation of this Policy, or any breach of the Terms of Service.

---

## 7. THIRD-PARTY SERVICES AND API CREDENTIALS

**7.1 Third-Party Integration.** AgentRuntime may allow you to integrate Third-Party Services, including external APIs, AI model providers, and infrastructure services, into your workflows.

**7.2 User-Supplied Credentials.** You may provide your own credentials for Third-Party Services, including API keys, OAuth tokens, or other access credentials. By doing so, you represent that you are authorized to use such credentials and that their use through the Services complies with the applicable third-party's terms of service.

**7.3 Security of Credentials.** AgentRuntime will store user-supplied credentials using commercially reasonable security practices and will use such credentials solely for executing your authorized workflows and integrations. Notwithstanding the foregoing, you remain responsible for:

&nbsp;&nbsp;&nbsp;&nbsp;(a) managing the security of your external service accounts;

&nbsp;&nbsp;&nbsp;&nbsp;(b) regularly rotating API keys and access credentials as appropriate;

&nbsp;&nbsp;&nbsp;&nbsp;(c) applying the principle of least privilege when configuring third-party credentials; and

&nbsp;&nbsp;&nbsp;&nbsp;(d) promptly revoking any credentials you suspect have been compromised.

**7.4 Third-Party Charges.** AgentRuntime is not responsible for any charges, fees, or costs incurred with Third-Party Service providers. This includes situations where:

&nbsp;&nbsp;&nbsp;&nbsp;(a) the same credentials are used across multiple systems;

&nbsp;&nbsp;&nbsp;&nbsp;(b) credentials are shared with or reused by other platforms;

&nbsp;&nbsp;&nbsp;&nbsp;(c) third-party integrations or connected services misuse credentials through no fault of AgentRuntime;

&nbsp;&nbsp;&nbsp;&nbsp;(d) automated workflows generate usage on Third-Party Service accounts; or

&nbsp;&nbsp;&nbsp;&nbsp;(e) you use **WhatsApp Business** or other messaging platforms and incur conversation, template, or usage charges billed by **Meta** or another provider directly or through your connected account.

---

## 8. USER RESPONSIBILITY FOR USAGE

**8.1 User Accountability.** You are solely responsible for all usage of the Services under your account, including usage generated by automated agents, workflows, and integrations, whether or not such usage was intended.

**8.2 Configuration Responsibility.** You are responsible for ensuring that:

&nbsp;&nbsp;&nbsp;&nbsp;(a) all workflows are correctly configured and behave as intended;

&nbsp;&nbsp;&nbsp;&nbsp;(b) automated systems do not generate unintended or excessive resource consumption; and

&nbsp;&nbsp;&nbsp;&nbsp;(c) integrations with Third-Party Services are properly authorized and scoped.

**8.3 Charges from Misconfiguration.** Charges resulting from misconfigured workflows, runaway automation, or excessive usage remain your responsibility, even if such charges were unintended. The availability of monitoring tools or dashboards does not transfer billing responsibility from you to AgentRuntime.

---

## 9. USAGE LIMITS AND SPENDING CONTROLS

**9.1 Optional Controls.** AgentRuntime may make available optional tools to help you manage your usage and costs, which may include:

&nbsp;&nbsp;&nbsp;&nbsp;(a) usage monitoring dashboards;

&nbsp;&nbsp;&nbsp;&nbsp;(b) configurable spending caps and billing alerts;

&nbsp;&nbsp;&nbsp;&nbsp;(c) workflow execution limits; and

&nbsp;&nbsp;&nbsp;&nbsp;(d) automated notifications upon reaching defined thresholds, such as a low balance of model credits or platform credits.

**9.2 Limitations of Safeguards.** These tools are provided as convenience features. They do not guarantee the prevention of excess charges and do not shift billing responsibility from you to AgentRuntime. You are encouraged to configure appropriate limits both within the AgentRuntime platform and within any Third-Party Services you integrate.

---

## 10. BILLING DISPUTES

**10.1 Dispute Window.** If you believe a billing error has occurred, you must submit a written dispute to AgentRuntime within {{dispute.windowDays}} days of the date of the relevant invoice or charge. Disputes submitted after this period may not be considered, and charges may be treated as final.

**10.2 Dispute Submission.** Billing disputes must be submitted to **billing@agentruntime.io** with sufficient detail to enable investigation, including your account identifier, the relevant invoice or transaction reference, the amount disputed, and the basis for your dispute.

**10.3 Investigation and Resolution.** AgentRuntime will investigate disputes in good faith within a commercially reasonable timeframe and will notify you of the outcome. If AgentRuntime confirms a billing error, it will apply the appropriate correction to your account.

**10.4 No Suspension During Dispute.** AgentRuntime will not suspend access to the Services solely on account of a bona fide billing dispute submitted in accordance with this Section, provided that you pay all undisputed charges by their due date.

**10.5 Chargebacks.** A request to your bank or card issuer to reverse a payment is handled as described in Section 5.8.

---

## 11. CHANGES TO PRICING AND POLICY

**11.1 Pricing Changes.** AgentRuntime may modify pricing for existing plans with reasonable prior notice to affected customers. Such notice will be provided through platform notifications, email to the billing contact, or publication on the Pricing Page, as appropriate.

**11.2 Policy Changes.** AgentRuntime may update this Billing and Credits Policy at any time. Material changes will be communicated as described above. Continued use of the Services following the effective date of any change constitutes acceptance of the revised Policy.

**11.3 Price at Purchase.** The price shown to you when you subscribe or top up is the price you pay for that purchase.

---

## 12. CONTACT

For billing inquiries, cancellation help, refund requests, or to submit a billing dispute:

**AgentRuntime Labs LLC — Billing Team**
Email: [billing@agentruntime.io](mailto:billing@agentruntime.io)

---

*© 2026 AgentRuntime Labs LLC. All rights reserved.*

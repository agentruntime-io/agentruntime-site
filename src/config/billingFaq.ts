/**
 * Billing questions shown on the pricing page. Plain words, and every number comes from
 * `src/config/pricing.ts`. The binding wording is the Billing and Credits Policy
 * (`src/docs/Billing_and_Credits_Policy.md`); keep these answers consistent with it.
 */

import {
  MONTHS_IN_YEAR,
  PLANS,
  TOP_UP,
  TRIAL,
  YEARLY_MONTHS_PAID,
  formatUsd,
  numberWord,
  planByCode,
} from "@/config/pricing";

export interface BillingFaqItem {
  id: string;
  question: string;
  answer: string;
  /** Optional link to the full policy text. */
  policyLink?: { label: string; to: string };
}

const BILLING_POLICY = "/legal/billing-and-credits-policy";
const example = PLANS[0];
const trialPlan = planByCode(TRIAL.planCode);

export const BILLING_FAQ: readonly BillingFaqItem[] = [
  {
    id: "credit-kinds",
    question: "What are model credits and platform credits?",
    answer:
      "Your balance has two kinds of credits. Model credits pay for the model calls AgentRuntime pays the model provider for, at the provider's price for the tokens used, with no markup on the tokens. Platform credits pay for workflow steps and the other work the platform does. Each kind is spent only on its own kind of usage, and the Console shows both balances.",
    policyLink: { label: "Credits in the Billing and Credits Policy", to: `${BILLING_POLICY}#6-credits` },
  },
  {
    id: "included",
    question: "What does a plan include each month?",
    answer: `Every plan includes both kinds of credits each billing month. For example, ${example.name} includes ${formatUsd(example.includedModelUsd)} of model credits and ${formatUsd(example.includedPlatformUsd)} of platform credits. A yearly plan is paid for ${numberWord(YEARLY_MONTHS_PAID)} months and covers ${numberWord(MONTHS_IN_YEAR)}, and its ${numberWord(MONTHS_IN_YEAR)} months of credits are granted at once at the start of the year. No plan limits the number of members in your workspace.`,
  },
  {
    id: "rollover",
    question: "Do unused credits roll over?",
    answer:
      "Credits included with a plan expire at the end of the billing period they were granted for (the end of the year for a yearly plan). Credits you buy by top-up stay in your balance until you use them.",
    policyLink: { label: "Expiry in the Billing and Credits Policy", to: `${BILLING_POLICY}#6-credits` },
  },
  {
    id: "run-out",
    question: "What happens when I run out of credits?",
    answer: `Usage that needs that kind of credit stops until you top up or your plan's included credits are granted again. You can top up at any time, from ${formatUsd(TOP_UP.minUsd)} to ${formatUsd(TOP_UP.maxUsd)} per top-up. If you need more than that, contact us.`,
  },
  {
    id: "trial",
    question: "How does the free trial work?",
    answer: `Eligible users can start a ${TRIAL.days}-day trial of the ${trialPlan.name} plan${TRIAL.requiresCard ? "" : " without adding a card"}. It includes ${formatUsd(TRIAL.platformCreditsUsd)} of platform credits and ${formatUsd(TRIAL.modelCreditsUsd)} of model credits. If you add a card, your plan starts when the trial ends, or sooner if you choose to start billing. If you do not, the trial ends, nothing is charged, and the credits left from it expire. One person can start at most ${numberWord(TRIAL.maxPerPerson)} trials.`,
  },
  {
    id: "own-keys",
    question: "Can I use my own model provider keys?",
    answer:
      "Yes. When your agents use a model through your own provider key, the provider bills you directly and AgentRuntime does not charge you for those tokens. You pay AgentRuntime only for the platform work in the same workflow.",
    policyLink: { label: "How usage is charged", to: `${BILLING_POLICY}#2-usage-measurement` },
  },
  {
    id: "topup-rate",
    question: "Why does a top-up buy slightly fewer model credits than I pay?",
    answer:
      "The price of model credits you buy includes the cost of processing the payment. It is the same whichever payment method you use, and the checkout shows exactly how many credits your payment buys before you pay. Platform credits are credited at face value.",
    policyLink: { label: "Top-ups in the Billing and Credits Policy", to: `${BILLING_POLICY}#6-credits` },
  },
  {
    id: "plan-changes",
    question: "When do upgrades, downgrades, and cancellations take effect?",
    answer:
      "An upgrade takes effect right away: you pay the prorated difference at once, and if that payment does not go through, your plan stays as it was. A downgrade or a cancellation takes effect at the end of the current billing period, and you can withdraw it before then with \"Keep my subscription\".",
    policyLink: { label: "Changing or ending a plan", to: `${BILLING_POLICY}#3-billing-cycle-and-invoicing` },
  },
  {
    id: "bank-confirmation",
    question: "My bank asked me to confirm a payment. What happens?",
    answer:
      "Some banks ask you to confirm a card payment. The Console tells you when that is needed. Until you confirm, a new subscription or an upgrade does not start and a trial carries on. If the confirmation is not completed in time, it expires and you can start again.",
  },
  {
    id: "taxes",
    question: "Are taxes included in the prices?",
    answer:
      "Prices are in US dollars and do not include taxes. Where we are required to collect VAT, sales tax, or a similar tax, it is added at checkout or on your invoice and shown as a separate amount.",
    policyLink: { label: "Taxes in the Billing and Credits Policy", to: `${BILLING_POLICY}#4-payment` },
  },
  {
    id: "refunds",
    question: "How do cancellations and refunds work?",
    answer:
      "You can cancel any time and keep your plan until the end of the billing period. When a subscription ends, its included credits end, and credits you bought by top-up stay with you. Fees are generally non-refundable unless the law requires it or the policy says so; to ask for a refund, write to billing@agentruntime.io. A refund goes back to the payment method you used, through Stripe, and the credits it granted are adjusted.",
    policyLink: { label: "Cancellation and refunds", to: `${BILLING_POLICY}#5-cancellation-and-refunds` },
  },
  {
    id: "enterprise",
    question: "Do you offer custom enterprise plans?",
    answer:
      "Yes. Enterprise terms, pricing, and billing are arranged by agreement with our team. Contact us and tell us what you need.",
  },
];

/**
 * Plans, credits, trial and limits shown on the public site.
 *
 * THE ONE PLACE FOR EVERY PRICE AND LIMIT. The pricing page (`src/pages/Pricing.tsx`),
 * the billing FAQ (`src/config/billingFaq.ts`) and the legal Markdown under `src/docs/`
 * (through `src/legal/policyTemplate.ts`, `{{tokens}}`) all read this file. To change a
 * price, a credit amount or a limit, edit it here and rebuild: nothing else holds a number.
 *
 * Where the values come from: section E ("The pricing talk", decisions E1 to E19) of
 * `docs/billing/BILLING_GO_LIVE_DECISIONS.md` in the monorepo. Prices are still being
 * settled, so treat every number here as "decided today, may change before launch".
 *
 *   E8  four self-serve plans: $10, $20, $100 and $200 a month, plus sales-only Enterprise
 *   E9  every plan includes half its price as model credits and half as platform credits
 *   E10 a yearly plan costs ten times the monthly price ("two months free")
 *   E11 a yearly plan grants a year of included credits at once, expiring at the end of the year
 *   E12 trial: $10 of platform credits and $2 of model credits, 14 days, Pro, no card, 3 per person
 *   E14 top-up limits: $5 minimum, $1,000 per top-up, $5,000 per person per 24 hours
 *   E18 no member limits on any plan
 *   E19 the $200 plan is called Scale
 *
 * Money amounts are whole US dollars unless noted. Everything is in USD (owner, 2026-11-10).
 */

export const CURRENCY_CODE = "USD";
export const CURRENCY_NAME = "US dollars";

export type PlanCode = "pro" | "plus" | "max" | "scale";

export interface Plan {
  code: PlanCode;
  name: string;
  /** Price per month, USD. */
  monthlyUsd: number;
  /** Model credits included each billing month (E9), USD value. */
  includedModelUsd: number;
  /** Platform credits included each billing month (E9), USD value. */
  includedPlatformUsd: number;
}

export const PLANS: readonly Plan[] = [
  {
    code: "pro",
    name: "Pro",
    monthlyUsd: 10,
    includedModelUsd: 5,
    includedPlatformUsd: 5,
  },
  {
    code: "plus",
    name: "Plus",
    monthlyUsd: 20,
    includedModelUsd: 10,
    includedPlatformUsd: 10,
  },
  {
    code: "max",
    name: "Max",
    monthlyUsd: 100,
    includedModelUsd: 50,
    includedPlatformUsd: 50,
  },
  {
    code: "scale",
    name: "Scale",
    monthlyUsd: 200,
    includedModelUsd: 100,
    includedPlatformUsd: 100,
  },
];

/**
 * A yearly plan costs this many months of the monthly price (E10): ten, so two months free.
 * A yearly plan also grants twelve months of included credits at the start of the year (E11).
 */
export const YEARLY_MONTHS_PAID = 10;
export const MONTHS_IN_YEAR = 12;
export const YEARLY_MONTHS_FREE = MONTHS_IN_YEAR - YEARLY_MONTHS_PAID;

export const yearlyUsd = (plan: Plan): number => plan.monthlyUsd * YEARLY_MONTHS_PAID;

/** The free trial (E12). It runs on the plan named by `planCode`. */
export const TRIAL = {
  planCode: "pro" as PlanCode,
  days: 14,
  platformCreditsUsd: 10,
  modelCreditsUsd: 2,
  requiresCard: false,
  /** Most trials one person can start across all their workspaces. */
  maxPerPerson: 3,
} as const;

/** Top-up limits (E14), in dollars of credits bought. */
export const TOP_UP = {
  minUsd: 5,
  maxUsd: 1000,
  maxPerPersonPer24HoursUsd: 5000,
} as const;

/** Days after an invoice or charge in which a billing error must be reported (existing policy wording). */
export const BILLING_DISPUTE_WINDOW_DAYS = 30;

/** Enterprise is sales-only: no public price. */
export const ENTERPRISE = {
  name: "Enterprise",
  contactPath: "/contact?source=enterprise",
} as const;

export const planByCode = (code: PlanCode): Plan => {
  const plan = PLANS.find((p) => p.code === code);
  if (!plan) throw new Error(`Unknown plan code: ${code}`);
  return plan;
};

/** "$1,000", "$12.50": whole dollars have no decimals. */
export const formatUsd = (amount: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: CURRENCY_CODE,
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);

/** "Pro, Plus, Max and Scale" */
export const planNamesSentence = (): string => {
  const names = PLANS.map((p) => p.name);
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
};

const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];

/** Whole numbers up to twelve as words ("four"), larger ones as digits. */
export const numberWord = (n: number): string => (Number.isInteger(n) && n >= 0 && n < WORDS.length ? WORDS[n] : String(n));

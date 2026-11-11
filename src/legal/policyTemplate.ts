/**
 * Fills `{{tokens}}` in the legal Markdown with the numbers from `src/config/pricing.ts`,
 * so a price change is a one-file edit and the policies can never disagree with the pricing page.
 *
 * Use a token in a `.md` file as `{{trial.days}}`. An unknown token throws at load time,
 * so a typo fails the build and the dev server loudly instead of publishing `{{...}}`.
 */

import {
  BILLING_DISPUTE_WINDOW_DAYS,
  CURRENCY_NAME,
  MONTHS_IN_YEAR,
  PLANS,
  TOP_UP,
  TRIAL,
  YEARLY_MONTHS_FREE,
  YEARLY_MONTHS_PAID,
  formatUsd,
  numberWord,
  planByCode,
  planNamesSentence,
  yearlyUsd,
} from "@/config/pricing";

const plansTable = (): string => {
  const rows = PLANS.map(
    (plan) =>
      `| ${plan.name} | ${formatUsd(plan.monthlyUsd)} | ${formatUsd(yearlyUsd(plan))} | ${formatUsd(
        plan.includedModelUsd,
      )} of model credits and ${formatUsd(plan.includedPlatformUsd)} of platform credits |`,
  );
  return [
    "| Plan | Price per month | Price per year | Credits included each month |",
    "| --- | --- | --- | --- |",
    ...rows,
  ].join("\n");
};

export const policyTokens = (): Record<string, string> => ({
  "currency.name": CURRENCY_NAME,
  "plans.count": numberWord(PLANS.length),
  "plans.names": planNamesSentence(),
  "plans.table": plansTable(),
  "yearly.monthsPaid": numberWord(YEARLY_MONTHS_PAID),
  "yearly.monthsFree": numberWord(YEARLY_MONTHS_FREE),
  "yearly.months": numberWord(MONTHS_IN_YEAR),
  "trial.days": String(TRIAL.days),
  "trial.plan": planByCode(TRIAL.planCode).name,
  "trial.platformCredits": formatUsd(TRIAL.platformCreditsUsd),
  "trial.modelCredits": formatUsd(TRIAL.modelCreditsUsd),
  "trial.maxPerPerson": numberWord(TRIAL.maxPerPerson),
  "topup.min": formatUsd(TOP_UP.minUsd),
  "topup.max": formatUsd(TOP_UP.maxUsd),
  "topup.maxPerDay": formatUsd(TOP_UP.maxPerPersonPer24HoursUsd),
  "dispute.windowDays": numberWord(BILLING_DISPUTE_WINDOW_DAYS),
});

const TOKEN = /\{\{\s*([A-Za-z0-9_.]+)\s*\}\}/g;

export function renderPolicyTemplate(raw: string, source = "policy"): string {
  const tokens = policyTokens();
  const filled = raw.replace(TOKEN, (_match, key: string) => {
    const value = tokens[key];
    if (value === undefined) {
      throw new Error(`Unknown token {{${key}}} in ${source}. Add it to src/legal/policyTemplate.ts.`);
    }
    return value;
  });
  if (filled.includes("{{") || filled.includes("}}")) {
    throw new Error(`Malformed {{token}} left in ${source}.`);
  }
  return filled;
}

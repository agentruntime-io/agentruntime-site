import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import {
  ActionLink,
  CallToAction,
  PageHero,
} from "@/components/marketing/MarketingPrimitives";
import { BILLING_FAQ } from "@/config/billingFaq";
import {
  CURRENCY_NAME,
  ENTERPRISE,
  PLANS,
  TOP_UP,
  TRIAL,
  YEARLY_MONTHS_FREE,
  formatUsd,
  numberWord,
  planByCode,
  yearlyUsd,
} from "@/config/pricing";
import { CONSOLE_APP_URL } from "@/config/site";
import { seoCopy } from "@/seo/metadata";

const trialPlan = planByCode(TRIAL.planCode);
const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);

const creditKinds = [
  {
    pill: "Model credits",
    title: "For model calls we pay for",
    description:
      "Charged at the model provider's price for the tokens used, with no markup on the tokens. If your agent uses your own provider key, the provider bills you directly and we charge nothing for those tokens.",
  },
  {
    pill: "Platform credits",
    title: "For the work the platform does",
    description:
      "Pay for workflow steps and the other work AgentRuntime performs to run your agents and workflows. Each kind of credit is spent only on its own kind of usage.",
  },
  {
    pill: "Top-ups",
    title: "Add credits any time",
    description: `Buy ${formatUsd(TOP_UP.minUsd)} to ${formatUsd(TOP_UP.maxUsd)} at a time and split it between the two kinds. Credits you buy stay until you use them. Credits included with a plan expire at the end of the billing period.`,
  },
];

export default function Pricing() {
  return (
    <div className="marketing-page">
      <Seo {...seoCopy.pricing} canonicalPath="/pricing" />
      <PageHero
        centered
        eyebrow="Pricing"
        title="Pay for what your agents actually run."
        description={`Pick a plan, or just add credits. Every plan includes credits for model calls and for platform work, and eligible new users can try the platform free for ${TRIAL.days} days${TRIAL.requiresCard ? "" : " without a card"}.`}
        primary={{ label: "Start free trial →", href: CONSOLE_APP_URL }}
        secondary={{ label: "How credits work", to: "/pricing#credits" }}
      />

      <section
        className="marketing-section"
        data-flush-top="true"
        id="plans"
      >
        <div className="marketing-container">
          <div className="marketing-section-label">Plans</div>
          <h2>
            {capitalize(numberWord(PLANS.length))} plans. Credits included in
            every one.
          </h2>
          <p className="marketing-section-intro">
            Plans differ by price and by the credits they include. Every plan
            has the full platform, with no limit on the number of members in
            your workspace.
          </p>

          <div className="marketing-grid-4">
            {PLANS.map((plan) => (
              <article
                className="marketing-card marketing-plan-card"
                key={plan.code}
                data-plan={plan.code}
              >
                <h3>{plan.name}</h3>
                <p className="marketing-plan-price">
                  <strong>{formatUsd(plan.monthlyUsd)}</strong>
                  <span>/ month</span>
                </p>
                <p className="marketing-plan-yearly">
                  or {formatUsd(yearlyUsd(plan))} a year,{" "}
                  {numberWord(YEARLY_MONTHS_FREE)} months free
                </p>
                <ul className="marketing-plan-includes">
                  <li>
                    <strong>{formatUsd(plan.includedModelUsd)}</strong> of model
                    credits every month
                  </li>
                  <li>
                    <strong>{formatUsd(plan.includedPlatformUsd)}</strong> of
                    platform credits every month
                  </li>
                </ul>
                <ActionLink
                  label={`Choose ${plan.name}`}
                  href={CONSOLE_APP_URL}
                  variant="secondary"
                />
              </article>
            ))}
          </div>

          <div className="marketing-enterprise-strip">
            <div>
              <h3>{ENTERPRISE.name}</h3>
              <p>
                Custom pricing, terms, and billing, arranged by agreement with
                our team.
              </p>
            </div>
            <ActionLink
              label="Talk to us →"
              to={ENTERPRISE.contactPath}
              variant="primary"
            />
          </div>

          <p className="marketing-tiny marketing-pricing-note">
            Prices are in {CURRENCY_NAME} and do not include taxes. Where we are
            required to collect VAT, sales tax, or a similar tax, it is added at
            checkout or on your invoice and shown separately. A yearly plan
            grants its credits for the whole year at the start of the year.
            Prices and included credits may change before launch.
          </p>
        </div>
      </section>

      <section className="marketing-section" data-tone="soft" id="credits">
        <div className="marketing-container">
          <div className="marketing-section-label">How credits work</div>
          <h2>Two kinds of credit, one balance.</h2>
          <p className="marketing-section-intro">
            Usage is prepaid. When a kind of credit runs out, the usage that
            needs it stops until you add credits or your plan's credits are
            granted again.
          </p>
          <div className="marketing-grid-3">
            {creditKinds.map((kind) => (
              <article
                className="marketing-card"
                data-compact="true"
                key={kind.pill}
              >
                <span className="marketing-pill">{kind.pill}</span>
                <h3>{kind.title}</h3>
                <p>{kind.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section" id="trial">
        <div className="marketing-container">
          <div className="marketing-section-label">Free trial</div>
          <h2>
            Try it free for {TRIAL.days} days
            {TRIAL.requiresCard ? "." : ", no card needed."}
          </h2>
          <div className="marketing-split">
            <div className="marketing-feature-copy">
              <h3>Start on {trialPlan.name}, decide later.</h3>
              <p>
                Eligible users can start a trial of the {trialPlan.name} plan.
                If you add a card, your plan starts when the trial ends, or
                sooner if you choose to start billing. If you do not, the trial
                ends, nothing is charged, and the credits left from it expire.
                One person can start at most {numberWord(TRIAL.maxPerPerson)}{" "}
                trials.
              </p>
              <div className="marketing-hero-actions">
                <ActionLink
                  label="Start free trial →"
                  href={CONSOLE_APP_URL}
                  variant="primary"
                />
              </div>
            </div>
            <div className="marketing-pricing-facts">
              <div className="marketing-status-row">
                <span>Plan</span>
                <span>{trialPlan.name}</span>
              </div>
              <div className="marketing-status-row">
                <span>Length</span>
                <span>{TRIAL.days} days</span>
              </div>
              <div className="marketing-status-row">
                <span>Platform credits</span>
                <span>{formatUsd(TRIAL.platformCreditsUsd)}</span>
              </div>
              <div className="marketing-status-row">
                <span>Model credits</span>
                <span>{formatUsd(TRIAL.modelCreditsUsd)}</span>
              </div>
              <div className="marketing-status-row">
                <span>Card needed</span>
                <span>{TRIAL.requiresCard ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="marketing-section" data-tone="soft" id="billing-faq">
        <div className="marketing-container">
          <div className="marketing-section-label">Billing questions</div>
          <h2>Plain answers about billing.</h2>
          <p className="marketing-section-intro">
            The binding wording is in the{" "}
            <Link to="/legal/billing-and-credits-policy">
              Billing and Credits Policy
            </Link>
            .
          </p>
          <div className="marketing-faq-list marketing-pricing-faq">
            {BILLING_FAQ.map((item) => (
              <article key={item.id} id={item.id}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
                {item.policyLink && (
                  <p>
                    <Link to={item.policyLink.to}>{item.policyLink.label} →</Link>
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <CallToAction
        title="Start with the trial. Add credits when you need them."
        description="Or tell us about your workflows and we will help you choose."
        primary={{ label: "Start free trial →", href: CONSOLE_APP_URL }}
        secondary={{ label: "Talk to us", to: ENTERPRISE.contactPath }}
      />
    </div>
  );
}

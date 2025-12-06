import { FC } from "react";
import type { PricingTier, SectionHeading } from "../../lib/types";
import { PageSection } from "../layout/PageSection";

interface PricingSectionProps {
  heading?: SectionHeading;
  tiers: PricingTier[];
  contactEmail: string;
  consoleUrl: string;
}

export const PricingSection: FC<PricingSectionProps> = ({
  heading,
  tiers,
  contactEmail,
  consoleUrl,
}) => {
  return (
    <PageSection id="pricing" align="center">
      <div className="pricing-card">
        {heading ? (
          <>
            <h2>{heading.title}</h2>
            {heading.subtitle ? <p>{heading.subtitle}</p> : null}
          </>
        ) : null}
        <ul>
          {tiers.map((tier, index) => (
            <li key={`${tier.name}-${index}`}>
              {tier.name} — <strong>{tier.priceDisplay}</strong>{" "}
              {tier.summary ? `— ${tier.summary}` : null}
            </li>
          ))}
        </ul>
        <div className="pricing-actions">
          <a className="primary-button giant" href={`mailto:${contactEmail}`}>
            Talk to sales
          </a>
          <a className="ghost-button giant" href={consoleUrl}>
            Launch console
          </a>
        </div>
      </div>
    </PageSection>
  );
};


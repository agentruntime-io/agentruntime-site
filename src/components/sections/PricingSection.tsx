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
      <div className="pricing-card teaser">
        {heading ? (
          <>
            <h2>{heading.title}</h2>
            {heading.subtitle ? <p>{heading.subtitle}</p> : null}
          </>
        ) : null}
        <ul className="pricing-teaser-list">
          {tiers.map((tier, index) => (
            <li key={`${tier.name}-${index}`}>
              <span className="pricing-teaser-name">{tier.name}</span> —{" "}
              <strong>{tier.priceDisplay}</strong>{" "}
              {tier.summary ? <span className="pricing-teaser-summary">— {tier.summary}</span> : null}
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


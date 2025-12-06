import { FC } from "react";
import type { FeatureItem, SectionHeading } from "../../lib/types";
import { PageSection } from "../layout/PageSection";

interface FeaturesSectionProps {
  heading?: SectionHeading;
  features: FeatureItem[];
}

export const FeaturesSection: FC<FeaturesSectionProps> = ({ heading, features }) => {
  return (
    <PageSection id="platform" align={heading ? "center" : "left"}>
      {heading ? (
        <>
          <h2 className="section-title">{heading.title}</h2>
          {heading.subtitle ? <p className="section-subtitle">{heading.subtitle}</p> : null}
        </>
      ) : null}

      <div className="feature-grid">
        {features.map((feature, index) => (
          <article key={`${feature.headline}-${index}`}>
            <div className="feature-icon">
              {feature.iconLabel ?? String(index + 1).padStart(2, "0")}
            </div>
            <h3>{feature.headline}</h3>
            {feature.description ? <p>{feature.description}</p> : null}
          </article>
        ))}
      </div>
    </PageSection>
  );
};


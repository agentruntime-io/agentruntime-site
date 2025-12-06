import { FC } from "react";
import type { SectionHeading, UseCase } from "../../lib/types";
import { PageSection } from "../layout/PageSection";

interface UseCasesSectionProps {
  heading?: SectionHeading;
  useCases: UseCase[];
}

export const UseCasesSection: FC<UseCasesSectionProps> = ({ heading, useCases }) => {
  return (
    <PageSection id="use-cases" variant="muted">
      {heading ? <h2 className="section-title">{heading.title}</h2> : null}
      <div className="card-grid">
        {useCases.map((item, index) => (
          <article key={`${item.title}-${index}`}>
            <h3>{item.title}</h3>
            {item.description ? <p>{item.description}</p> : null}
            {item.ctaLabel && item.ctaUrl ? (
              <a href={item.ctaUrl} className="text-link">
                {item.ctaLabel}
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </PageSection>
  );
};


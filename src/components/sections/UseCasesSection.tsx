import { FC } from "react";
import type { SectionHeading, UseCase } from "../../lib/types";
import { PageSection } from "../layout/PageSection";

interface UseCasesSectionProps {
  heading?: SectionHeading;
  useCases: UseCase[];
}

export const UseCasesSection: FC<UseCasesSectionProps> = ({ heading, useCases }) => {
  return (
    <PageSection id="use-cases" variant="muted" align="center">
      {heading ? (
        <>
          <h2 className="section-title">{heading.title}</h2>
          {heading.subtitle ? <p className="section-subtitle">{heading.subtitle}</p> : null}
        </>
      ) : null}
      <div className="legacy-usecases-grid">
        {useCases.map((item, index) => (
          <article key={`${item.title}-${index}`} className="legacy-usecase-card" style={{ animationDelay: `${index * 80}ms` }}>
            <div className="legacy-usecase-icon">✔</div>
            <div className="legacy-usecase-body">
              <h3>{item.title}</h3>
              {item.description ? <p>{item.description}</p> : null}
              {item.ctaLabel && item.ctaUrl ? (
                <a href={item.ctaUrl} className="text-link">
                  {item.ctaLabel}
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
      <div className="legacy-usecase-cta">
        <a className="primary-button giant" href="/use-cases">
          Explore all use cases
        </a>
      </div>
    </PageSection>
  );
};


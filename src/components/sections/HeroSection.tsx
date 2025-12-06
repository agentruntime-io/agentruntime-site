import { FC } from "react";
import type { HeroVariant } from "../../lib/types";

interface HeroSectionProps {
  variant: HeroVariant;
}

export const HeroSection: FC<HeroSectionProps> = ({ variant }) => {
  return (
    <section className="hero">
      <div className="shell hero-grid">
        <div className="hero-content">
          {variant.badge ? <div className="hero-badge">{variant.badge}</div> : null}
          <h1 className="hero-title">{variant.title}</h1>
          {variant.subtitle ? <p className="hero-subtitle">{variant.subtitle}</p> : null}
          <div className="hero-actions">
            {variant.primaryCta ? (
              <a className="primary-button giant" href={variant.primaryCta.url}>
                {variant.primaryCta.label}
              </a>
            ) : null}
            {variant.secondaryCta ? (
              <a className="ghost-button giant" href={variant.secondaryCta.url} target="_blank" rel="noreferrer">
                {variant.secondaryCta.label}
              </a>
            ) : null}
          </div>
          {variant.footnote ? <div className="hero-footnote">{variant.footnote}</div> : null}
        </div>
        <div className="hero-card">
          <div className="hero-card-header">
            <span>Workflow timeline</span>
            <span className="hero-chip">Supervised</span>
          </div>
          <ol className="hero-card-list">
            {(variant.steps ?? []).map((step, index) => (
              <li key={`${step.title}-${index}`}>
                <span className="hero-step-index">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h4>{step.title}</h4>
                  {step.description ? <p>{step.description}</p> : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};


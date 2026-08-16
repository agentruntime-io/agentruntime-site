import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export type MarketingAction = {
  label: string;
  to?: string;
  href?: string;
};

type ActionLinkProps = MarketingAction & {
  variant?: "primary" | "secondary" | "light" | "ghost-dark";
};

export function ActionLink({
  label,
  to,
  href,
  variant = "primary",
}: ActionLinkProps) {
  const className = `marketing-button marketing-button-${variant}`;

  if (to) {
    return (
      <Link className={className} to={to}>
        {label}
      </Link>
    );
  }

  return (
    <a
      className={className}
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {label}
    </a>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="marketing-eyebrow">
      <span className="marketing-eyebrow-dot" aria-hidden="true" />
      {children}
    </div>
  );
}

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  primary?: MarketingAction;
  secondary?: MarketingAction;
  centered?: boolean;
  aside?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  centered = false,
  aside,
}: PageHeroProps) {
  return (
    <section
      className="marketing-page-hero"
      data-centered={centered}
      data-has-aside={aside ? "true" : undefined}
    >
      <div className="marketing-container">
        <div className={aside ? "marketing-page-hero-layout" : undefined}>
          <div className="marketing-page-hero-main">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1>{title}</h1>
            <p className="marketing-page-copy">{description}</p>
            {(primary || secondary) && (
              <div className="marketing-hero-actions">
                {primary && <ActionLink {...primary} variant="primary" />}
                {secondary && <ActionLink {...secondary} variant="secondary" />}
              </div>
            )}
          </div>
          {aside ? (
            <div className="marketing-page-hero-aside">{aside}</div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

type CallToActionProps = {
  title: ReactNode;
  description: string;
  primary: MarketingAction;
  secondary?: MarketingAction;
  tone?: "default" | "soft" | "dark";
};

export function CallToAction({
  title,
  description,
  primary,
  secondary,
  tone = "default",
}: CallToActionProps) {
  return (
    <section className="marketing-cta" data-tone={tone}>
      <div className="marketing-container">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="marketing-hero-actions">
          <ActionLink
            {...primary}
            variant={tone === "dark" ? "light" : "primary"}
          />
          {secondary && (
            <ActionLink
              {...secondary}
              variant={tone === "dark" ? "ghost-dark" : "secondary"}
            />
          )}
        </div>
      </div>
    </section>
  );
}

type WorkflowVisualProps = {
  title: string;
  status: string;
  outcome?: string;
  rows: Array<{
    left: string;
    connector?: string;
    right: string;
    hot?: "left" | "right";
  }>;
};

export function WorkflowVisual({
  title,
  status,
  outcome,
  rows,
}: WorkflowVisualProps) {
  return (
    <div
      className="marketing-workflow-visual"
      role="img"
      aria-label={`${title} workflow. Status: ${status}.${outcome ? ` Outcome: ${outcome}` : ""}`}
    >
      <div className="marketing-ui-header">
        <strong>{title}</strong>
        <span className="marketing-status" data-status={status.toLowerCase()}>
          {status}
        </span>
      </div>
      <div className="marketing-workflow-timeline">
        {rows.map((row, index) => (
          <div className="marketing-flow-line" key={`${row.left}-${row.right}`}>
            <span className="marketing-flow-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div
              className="marketing-flow-step"
              data-hot={row.hot === "left" || undefined}
            >
              {row.left}
            </div>
            <span className="marketing-flow-arrow" aria-hidden="true">
              {row.connector ?? "→"}
            </span>
            <div
              className="marketing-flow-step"
              data-hot={row.hot === "right" || undefined}
            >
              {row.right}
            </div>
          </div>
        ))}
      </div>
      {outcome && (
        <div className="marketing-workflow-outcome">
          <span>Run outcome</span>
          <strong>{outcome}</strong>
        </div>
      )}
    </div>
  );
}

export { ProductStage } from "./ProductStage";

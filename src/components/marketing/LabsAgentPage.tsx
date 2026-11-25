import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Seo, type SeoProps } from "@/components/Seo";
import { ActionLink, PageHero } from "@/components/marketing/MarketingPrimitives";
import { trackLabsLink, type LabsAgent } from "@/lib/labsProjects";

type Fact = { label: string; value: string };
type Feature = { title: string; description: string };
type Panel = { title: string; body: ReactNode };

type LabsAgentPageProps = {
  agent: LabsAgent;
  seo: Pick<SeoProps, "title" | "description">;
  canonicalPath: string;
  facts: Fact[];
  installTitle: string;
  /** Short lead-in above the install command. */
  installIntro: string;
  /** Steps shown under the command, in order. */
  installSteps: ReactNode[];
  /** Optional section shown right after the install steps (for example a secondary platform). */
  extraSection?: ReactNode;
  featuresHeading: string;
  features: Feature[];
  warning: Panel;
  privacy: Panel;
  fineprint: ReactNode;
};

/**
 * Page for a Labs tool that ships as an npm package. Links go to npm and to the site's own
 * privacy policy, never to a GitHub repository (those two are private and would 404).
 */
export function LabsAgentPage({
  agent,
  seo,
  canonicalPath,
  facts,
  installTitle,
  installIntro,
  installSteps,
  extraSection,
  featuresHeading,
  features,
  warning,
  privacy,
  fineprint,
}: LabsAgentPageProps) {
  const npm = {
    label: "View on npm ↗",
    href: agent.npmUrl,
    onClick: () => trackLabsLink(agent.slug, "npm"),
  };
  const privacyLink = {
    label: "Privacy policy →",
    to: `/legal/${agent.privacySlug}`,
    onClick: () => trackLabsLink(agent.slug, "privacy"),
  };

  return (
    <div className="marketing-page">
      <Seo {...seo} canonicalPath={canonicalPath} />
      <PageHero
        eyebrow={
          <>
            <Link className="marketing-labs-text-link" to="/labs">
              Labs
            </Link>
            <span aria-hidden="true">/</span>
            <span>Local agent tool</span>
          </>
        }
        title={agent.name}
        description={agent.summary}
        primary={npm}
        secondary={privacyLink}
      />

      <section className="marketing-section" data-flush-top="true">
        <div className="marketing-container">
          <div className="marketing-section-label">At a glance</div>
          <dl className="marketing-labs-facts">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="marketing-section">
        <div className="marketing-container">
          <div className="marketing-section-label">Install</div>
          <h2>{installTitle}</h2>
          <p className="marketing-labs-intro">{installIntro}</p>
          <code className="marketing-labs-checksum marketing-labs-command">
            {agent.installCommand}
          </code>
          <ol className="marketing-labs-steps">
            {installSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </section>

      {extraSection}

      <section className="marketing-section">
        <div className="marketing-container">
          <div className="marketing-section-label">What it does</div>
          <h2>{featuresHeading}</h2>
          <div className="marketing-grid-3">
            {features.map((feature) => (
              <article
                className="marketing-card marketing-labs-feature"
                data-compact="true"
                key={feature.title}
              >
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section" data-tone="soft">
        <div className="marketing-container">
          <div className="marketing-section-label">Before you install</div>
          <h2>Know what it can reach, and what it does with it.</h2>
          <div className="marketing-grid-2 marketing-labs-before">
            <div className="marketing-labs-panel" data-tone="warning">
              <h3>{warning.title}</h3>
              {warning.body}
            </div>
            <div className="marketing-labs-panel">
              <h3>{privacy.title}</h3>
              {privacy.body}
            </div>
          </div>

          <div className="marketing-hero-actions marketing-labs-actions">
            <ActionLink {...npm} variant="primary" />
            <ActionLink {...privacyLink} variant="secondary" />
          </div>

          <p className="marketing-labs-fineprint">{fineprint}</p>
        </div>
      </section>
    </div>
  );
}

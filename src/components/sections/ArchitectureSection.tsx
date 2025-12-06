import { FC } from "react";
import type { ArchitecturePanel, SectionHeading } from "../../lib/types";
import { PageSection } from "../layout/PageSection";

interface ArchitectureSectionProps {
  heading?: SectionHeading;
  panels: ArchitecturePanel[];
}

const defaultPanels = [
  "Multi-tenant context enforcement via the BFF and policy-as-code.",
  "Workflows orchestrated by a battle-tested event bus with at-least-once delivery.",
  "Realtime collaboration overlays for supervisors to approve, annotate, or reroute.",
  "Pluggable evaluation loops (auto QA, human scoring, or synthetic monitors).",
];

export const ArchitectureSection: FC<ArchitectureSectionProps> = ({ heading, panels }) => {
  return (
    <PageSection id="architecture" variant="muted" className="architecture">
      <div>
        {heading ? (
          <>
            <h2 className="section-title">{heading.title}</h2>
            {heading.subtitle ? <p className="section-subtitle">{heading.subtitle}</p> : null}
          </>
        ) : null}
        <ul className="architecture-list">
          {panels.length === 0
            ? defaultPanels.map((item, index) => <li key={index}>{item}</li>)
            : null}
        </ul>
      </div>
      <div className="architecture-diagram">
        {panels.map((panel, index) => (
          <div key={`${panel.heading}-${index}`} className="diagram-panel feature-card">
            <h4>{panel.heading}</h4>
            {panel.description ? <p>{panel.description}</p> : null}
            {panel.points.length > 0 ? (
              <ul>
                {panel.points.map((point, pointIndex) => (
                  <li key={`${panel.heading}-${pointIndex}`}>{point}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </PageSection>
  );
};


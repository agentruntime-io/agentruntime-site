import { FC } from "react";
import type { Metric, SectionHeading } from "../../lib/types";
import { PageSection } from "../layout/PageSection";

interface MetricsSectionProps {
  heading?: SectionHeading;
  metrics: Metric[];
}

export const MetricsSection: FC<MetricsSectionProps> = ({ heading, metrics }) => {
  return (
    <PageSection align="center">
      <div className="stats-grid">
        {(heading ? [heading] : []).map((item) => (
          <div key={item.title} className="stat-card highlight">
            <h3 className="stat-metric">{item.title}</h3>
            {item.subtitle ? <p className="stat-caption">{item.subtitle}</p> : null}
          </div>
        ))}
        {metrics.map((metric, index) => (
          <div key={`${metric.metric}-${index}`} className="stat-card">
            <div className="stat-metric">{metric.metric}</div>
            {metric.caption ? <p className="stat-caption">{metric.caption}</p> : null}
          </div>
        ))}
      </div>
    </PageSection>
  );
};


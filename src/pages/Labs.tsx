import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/marketing/MarketingPrimitives";
import { labsProjects } from "@/lib/labsProjects";
import { seoCopy } from "@/seo/metadata";

export default function Labs() {
  return (
    <div className="marketing-page">
      <Seo {...seoCopy.labs} canonicalPath="/labs" />
      <PageHero
        eyebrow="Labs"
        title="Small open-source tools from the AgentRuntime team."
        description="Things we built and published on GitHub. They are not part of the AgentRuntime product, and each one has its own license."
      />

      <section className="marketing-section" data-flush-top="true">
        <div className="marketing-container">
          <div className="marketing-section-label">Projects</div>
          <div className="marketing-grid-3 marketing-labs-grid">
            {labsProjects.map((project) => (
              <Link
                className="marketing-card marketing-labs-card"
                data-compact="true"
                to={`/labs/${project.slug}`}
                key={project.slug}
              >
                <div className="marketing-labs-tags">
                  <span className="marketing-pill">{project.platform}</span>
                  <span className="marketing-pill">{project.license} license</span>
                </div>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <span className="marketing-inline-link">View project →</span>
              </Link>
            ))}
          </div>
          <p className="marketing-labs-fineprint">
            Each project lives in its own repository in the{" "}
            <a
              className="marketing-labs-text-link"
              href="https://github.com/agentruntime-io"
              target="_blank"
              rel="noopener noreferrer"
            >
              agentruntime-io GitHub organization
            </a>
            , where you can report issues and send contributions.
          </p>
        </div>
      </section>
    </div>
  );
}

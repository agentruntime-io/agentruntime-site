import { track } from "@/lib/analytics";

/**
 * Small open-source tools the AgentRuntime team publishes under the agentruntime-io GitHub
 * org (shown at /labs). They are not part of the AgentRuntime product and each has its own
 * license, so keep their copy apart from product pages and claims.
 */
type LabsProject = {
  slug: string;
  name: string;
  summary: string;
  platform: string;
  license: string;
  sourceUrl: string;
  downloadUrl: string;
};

export const diskScout = {
  slug: "diskscout",
  name: "DiskScout",
  summary:
    "A small Windows tool that shows where your disk space went, finds duplicate files by their contents, and deletes carefully.",
  platform: "Windows",
  license: "MIT",
  sourceUrl: "https://github.com/agentruntime-io/diskscout",
  downloadUrl: "https://github.com/agentruntime-io/diskscout/releases/latest",
} satisfies LabsProject;

export const labsProjects: LabsProject[] = [diskScout];

/** Sends only the project slug and which link was clicked; never anything about the visitor. */
export function trackLabsLink(project: string, link: "download" | "source") {
  track("labs_project_link_clicked", { project, link });
}

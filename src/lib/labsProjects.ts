import { track } from "@/lib/analytics";

/**
 * Small tools the AgentRuntime team publishes (shown at /labs). They are not part of the
 * AgentRuntime platform and each has its own license, so keep their copy apart from product
 * pages and claims.
 *
 * DiskScout is a GitHub release. Browser Agent and Desktop Agent are npm packages: their
 * GitHub repositories are private, so they link to npm and never to GitHub (a private repo
 * link is a 404 for everyone else).
 */
type LabsProject = {
  slug: string;
  name: string;
  summary: string;
  platform: string;
  license: string;
  sourceUrl?: string;
  downloadUrl?: string;
};

type LabsAgent = LabsProject & {
  npmPackage: string;
  npmUrl: string;
  installCommand: string;
  /** Slug of the privacy policy in src/legal/policies.ts. */
  privacySlug: string;
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

export const browserAgent = {
  slug: "browser-agent",
  name: "Browser Agent",
  summary:
    "A Chrome extension and helper that let the AI agents you run on your own computer work in your real browser tabs, over a local connection only.",
  platform: "Chrome",
  license: "Apache-2.0",
  npmPackage: "@agentruntime-labs/browser-agent",
  npmUrl: "https://www.npmjs.com/package/@agentruntime-labs/browser-agent",
  installCommand: "npx @agentruntime-labs/browser-agent install",
  privacySlug: "browser-agent-privacy",
} satisfies LabsAgent;

export const desktopAgent = {
  slug: "desktop-agent",
  name: "Desktop Agent",
  summary:
    "Real mouse, keyboard, clipboard and window control for Windows, for AI agents and for you: an MCP server for Cursor and Claude Desktop plus a shell command line.",
  platform: "Windows",
  license: "Apache-2.0",
  npmPackage: "@agentruntime-labs/desktop-agent",
  npmUrl: "https://www.npmjs.com/package/@agentruntime-labs/desktop-agent",
  installCommand: "npx @agentruntime-labs/desktop-agent install",
  privacySlug: "desktop-agent-privacy",
} satisfies LabsAgent;

export type { LabsAgent };

export const labsProjects: LabsProject[] = [browserAgent, desktopAgent, diskScout];

/** Sends only the project slug and which link was clicked; never anything about the visitor. */
export function trackLabsLink(
  project: string,
  link: "download" | "source" | "npm" | "privacy",
) {
  track("labs_project_link_clicked", { project, link });
}

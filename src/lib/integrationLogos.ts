const integrationLogoPathBySlug: Record<string, string> = {
  exa: "/integrations/exa.svg",
  firecrawl: "/integrations/firecrawl.svg",
  freshdesk: "/integrations/freshdesk.svg",
  gmail: "/integrations/gmail.svg",
  "google-drive": "/integrations/google-drive.svg",
  hubspot: "/integrations/hubspot.svg",
  notion: "/integrations/notion.svg",
  posthog: "/integrations/posthog.svg",
  quickbooks: "/integrations/quickbooks.svg",
  slack: "/integrations/slack.svg",
};

export function getIntegrationLogoPath(slug: string) {
  return integrationLogoPathBySlug[slug];
}

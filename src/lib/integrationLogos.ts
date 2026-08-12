const integrationLogoPathBySlug: Record<string, string> = {
  hubspot: "/integrations/hubspot.svg",
  notion: "/integrations/notion.svg",
  slack: "/integrations/slack.svg",
};

export function getIntegrationLogoPath(slug: string) {
  return integrationLogoPathBySlug[slug];
}

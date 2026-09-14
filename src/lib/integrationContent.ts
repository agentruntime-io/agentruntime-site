import gmail from "@/content/integrations/gmail.json";
import slack from "@/content/integrations/slack.json";
import type { IntegrationCategory } from "@/lib/marketingCatalog";

export type IntegrationOutcome = {
  title: string;
  description: string;
};

export type IntegrationConfigField = {
  key: string;
  requirement: string;
  description: string;
};

export type IntegrationFaq = {
  question: string;
  answer: string;
};

export type IntegrationContent = {
  slug: string;
  category: IntegrationCategory;
  maturity: "verified" | "registered" | "preview";
  logoPath: string;
  headline: string;
  summary: string;
  cardSummary: string;
  authLabel: string;
  workflowStartLabel: string;
  authentication: string;
  workflowStart: string;
  docsPath: string;
  docsUrl: string;
  connectedServiceSlugs: readonly string[];
  relatedConnectorSlugs: readonly string[];
  relatedWorkflowSlugs?: readonly string[];
  outcomes: readonly IntegrationOutcome[];
  howItWorks: readonly string[];
  configuration: readonly IntegrationConfigField[];
  representativeScopes: readonly string[];
  faq: readonly IntegrationFaq[];
};

const integrationContentBySlug = {
  gmail,
  slack,
} satisfies Record<string, IntegrationContent>;

export function getIntegrationContent(slug: string): IntegrationContent | undefined {
  return integrationContentBySlug[slug as keyof typeof integrationContentBySlug];
}

export const curatedIntegrationSlugs = Object.keys(
  integrationContentBySlug,
) as (keyof typeof integrationContentBySlug)[];

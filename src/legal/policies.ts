/**
 * Legal policy manifest. Maps URL slugs to markdown content and display titles.
 * Markdown is loaded on-demand to avoid pulling all policies into the initial bundle.
 */

export interface LegalPolicy {
  slug: string;
  title: string;
  content: string;
}

const policyMeta: { slug: string; title: string }[] = [
  { slug: "terms-and-conditions", title: "Terms and Conditions" },
  { slug: "privacy-policy", title: "Privacy Policy" },
  { slug: "acceptable-use-policy", title: "Acceptable Use Policy" },
  { slug: "data-processing-agreement", title: "Data Processing Agreement" },
  { slug: "security-policy", title: "Security Policy" },
  { slug: "billing-and-credits-policy", title: "Billing and Credits Policy" },
  { slug: "ai-usage-policy", title: "AI Usage Policy" },
  { slug: "developer-platform-license", title: "Developer Platform License" },
  { slug: "service-level-agreement", title: "Service Level Agreement" },
];

const policyLoaders: Record<string, () => Promise<{ default: string }>> = {
  "terms-and-conditions": () => import("@/docs/Terms_and_Conditions.md?raw"),
  "privacy-policy": () => import("@/docs/Privacy_Policy.md?raw"),
  "acceptable-use-policy": () => import("@/docs/Acceptable_Use_Policy.md?raw"),
  "data-processing-agreement": () => import("@/docs/Data_Processing_Agreement.md?raw"),
  "security-policy": () => import("@/docs/Security_Policy.md?raw"),
  "billing-and-credits-policy": () => import("@/docs/Billing_and_Credits_Policy.md?raw"),
  "ai-usage-policy": () => import("@/docs/AI_Usage_Policy.md?raw"),
  "developer-platform-license": () => import("@/docs/Developer_Platform_License.md?raw"),
  "service-level-agreement": () => import("@/docs/Service_Level_Agreement.md?raw"),
};

export const LEGAL_POLICIES: { slug: string; title: string }[] = policyMeta;

export function getPolicySlugs(): string[] {
  return policyMeta.map((p) => p.slug);
}

export async function getPolicyBySlug(slug: string): Promise<LegalPolicy | undefined> {
  const meta = policyMeta.find((p) => p.slug === slug);
  const load = policyLoaders[slug];
  if (!meta || !load) return undefined;

  const mod = await load();
  return { slug: meta.slug, title: meta.title, content: mod.default };
}

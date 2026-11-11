/**
 * Legal policy manifest. Maps URL slugs to markdown content and display titles.
 * Add new policies by adding an entry here and placing the .md file in src/docs.
 */

import termsRaw from "@/docs/Terms_and_Conditions.md?raw";
import privacyRaw from "@/docs/Privacy_Policy.md?raw";
import acceptableUseRaw from "@/docs/Acceptable_Use_Policy.md?raw";
import dataProcessingRaw from "@/docs/Data_Processing_Agreement.md?raw";
import securityRaw from "@/docs/Security_Policy.md?raw";
import billingRaw from "@/docs/Billing_and_Credits_Policy.md?raw";
import aiUsageRaw from "@/docs/AI_Usage_Policy.md?raw";
import developerLicenseRaw from "@/docs/Developer_Platform_License.md?raw";
import slaRaw from "@/docs/Service_Level_Agreement.md?raw";
import userDataDeletionRaw from "@/docs/User_Data_Deletion_Instructions.md?raw";
import cookiePolicyRaw from "@/docs/Cookie_Policy.md?raw";
import partnerProgramTermsRaw from "@/docs/Partner_Program_Terms_DRAFT.md?raw";
import { renderPolicyTemplate } from "@/legal/policyTemplate";

export interface LegalPolicy {
  slug: string;
  title: string;
  content: string;
  /**
   * An unlisted policy has a page at its URL but is left out of the Legal index, the sidebar,
   * the sitemap and the llms files, and is served with `noindex`. Used for drafts that are
   * not offered yet (the partner program ships off).
   */
  unlisted?: boolean;
}

const policyMap: Record<string, Omit<LegalPolicy, "content"> & { content: string }> = {
  "terms-and-conditions": {
    slug: "terms-and-conditions",
    title: "Terms and Conditions",
    content: termsRaw,
  },
  "privacy-policy": {
    slug: "privacy-policy",
    title: "Privacy Policy",
    content: privacyRaw,
  },
  "acceptable-use-policy": {
    slug: "acceptable-use-policy",
    title: "Acceptable Use Policy",
    content: acceptableUseRaw,
  },
  "data-processing-agreement": {
    slug: "data-processing-agreement",
    title: "Data Processing Agreement",
    content: dataProcessingRaw,
  },
  "security-policy": {
    slug: "security-policy",
    title: "Security Policy",
    content: securityRaw,
  },
  "billing-and-credits-policy": {
    slug: "billing-and-credits-policy",
    title: "Billing and Credits Policy",
    content: billingRaw,
  },
  "ai-usage-policy": {
    slug: "ai-usage-policy",
    title: "AI Usage Policy",
    content: aiUsageRaw,
  },
  "developer-platform-license": {
    slug: "developer-platform-license",
    title: "Developer Platform License",
    content: developerLicenseRaw,
  },
  "service-level-agreement": {
    slug: "service-level-agreement",
    title: "Service Level Agreement",
    content: slaRaw,
  },
  "data-deletion-instructions": {
    slug: "data-deletion-instructions",
    title: "User Data Deletion Instructions",
    content: userDataDeletionRaw,
  },
  "cookie-policy": {
    slug: "cookie-policy",
    title: "Cookie Policy",
    content: cookiePolicyRaw,
  },
  // DRAFT. Not linked anywhere while the partner program ships off (see docs/BILLING_LEGAL_REVIEW_CHECKLIST.md).
  "partner-program-terms": {
    slug: "partner-program-terms",
    title: "Partner Program Terms (Draft)",
    content: partnerProgramTermsRaw,
    unlisted: true,
  },
};

// Fill {{tokens}} with the numbers in src/config/pricing.ts once, at load time.
for (const policy of Object.values(policyMap)) {
  policy.content = renderPolicyTemplate(policy.content, `src/docs (${policy.slug})`);
}

/** Policies shown in the Legal index and the sidebar (unlisted drafts excluded). */
export const LEGAL_POLICIES: LegalPolicy[] = Object.values(policyMap).filter((p) => !p.unlisted);

export function getPolicyBySlug(slug: string): LegalPolicy | undefined {
  const policy = policyMap[slug];
  return policy ? { ...policy } : undefined;
}

/** Slugs of listed policies. Unlisted drafts are deliberately not returned. */
export function getPolicySlugs(): string[] {
  return LEGAL_POLICIES.map((p) => p.slug);
}

import rawHomeContent from "../../content/home.json";
import rawPricingContent from "../../content/pricing.json";
import rawUseCasesContent from "../../content/use-cases.json";
import rawDocsContent from "../../content/docs.json";
import rawContactContent from "../../content/contact.json";
import {
  landingPageSchema,
  pricingPageSchema,
  useCasesPageSchema,
  docsPageSchema,
  contactPageSchema,
} from "./schema";
import type {
  LandingPageContent,
  PricingPageContent,
  UseCasesPageContent,
  DocsPageContent,
  ContactPageContent,
} from "../lib/types";

const parsedHome = landingPageSchema.parse(rawHomeContent);
const parsedPricing = pricingPageSchema.parse(rawPricingContent);
const parsedUseCases = useCasesPageSchema.parse(rawUseCasesContent);
const parsedDocs = docsPageSchema.parse(rawDocsContent);
const parsedContact = contactPageSchema.parse(rawContactContent);

export const homeContent: LandingPageContent = parsedHome;
export const pricingContent: PricingPageContent = parsedPricing;
export const useCasesContent: UseCasesPageContent = parsedUseCases;
export const docsContent: DocsPageContent = parsedDocs;
export const contactContent: ContactPageContent = parsedContact;

export function selectHeroVariant(
  content: LandingPageContent,
  scenario?: string,
) {
  if (!scenario) {
    return content.heroVariants[0];
  }
  return (
    content.heroVariants.find(
      (variant) => variant.scenario.toLowerCase() === scenario.toLowerCase(),
    ) ?? content.heroVariants[0]
  );
}


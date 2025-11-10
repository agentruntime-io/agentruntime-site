export interface HeroStep {
  title: string;
  description?: string;
}

export interface HeroVariant {
  scenario: string;
  badge?: string;
  title: string;
  subtitle?: string;
  footnote?: string;
  primaryCta?: {
    label: string;
    url: string;
  };
  secondaryCta?: {
    label: string;
    url: string;
  };
  steps: HeroStep[];
}

export interface SectionHeading {
  title: string;
  subtitle?: string;
}

export interface FeatureItem {
  headline: string;
  description?: string;
  iconLabel?: string;
}

export interface UseCase {
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

export interface Metric {
  metric: string;
  caption?: string;
}

export interface ArchitecturePanel {
  heading: string;
  description?: string;
  points: string[];
}

export interface PricingTier {
  name: string;
  priceDisplay: string;
  summary?: string;
  highlight?: boolean;
  features: string[];
  ctaLabel?: string;
  ctaUrl?: string;
}

export interface LandingPageContent {
  slug: string;
  locale: string;
  heroVariants: HeroVariant[];
  featuresHeading?: SectionHeading;
  features: FeatureItem[];
  useCasesHeading?: SectionHeading;
  useCases: UseCase[];
  metricsHeading?: SectionHeading;
  metrics: Metric[];
  architectureHeading?: SectionHeading;
  architecturePanels: ArchitecturePanel[];
  pricingHeading?: SectionHeading;
  pricingTiers: PricingTier[];
  footerCopy?: string;
  statusPageUrl?: string;
  documentationUrl?: string;
  consoleUrl?: string;
  contactEmail?: string;
}


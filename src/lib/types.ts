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
  testimonials?: {
    quote: string;
    author: string;
    role?: string;
  }[];
  finalCta?: {
    title: string;
    subtitle?: string;
    primaryCtaLabel: string;
    primaryCtaUrl: string;
    secondaryCtaLabel?: string;
    secondaryCtaUrl?: string;
    footnote?: string;
    icon?: string;
  };
  footerCopy?: string;
  statusPageUrl?: string;
  documentationUrl?: string;
  consoleUrl?: string;
  contactEmail?: string;
}

export interface PricingPageContent {
  hero: {
    title: string;
    subtitle?: string;
    badge?: string;
  };
  tiers: PricingTier[];
  faq: {
    question: string;
    answer: string;
  }[];
  cta: {
    title: string;
    subtitle?: string;
    primaryCtaLabel: string;
    primaryCtaUrl: string;
    secondaryCtaLabel?: string;
    secondaryCtaUrl?: string;
  };
}

export interface UseCasesDetail {
  id: string;
  title: string;
  summary?: string;
  painPoints: string[];
  solutions: string[];
  ctaLabel?: string;
  ctaUrl?: string;
}

export interface UseCasesPageContent {
  hero: {
    title: string;
    subtitle?: string;
    badge?: string;
  };
  sections: UseCasesDetail[];
  cta: {
    title: string;
    subtitle?: string;
    primaryCtaLabel: string;
    primaryCtaUrl: string;
    secondaryCtaLabel?: string;
    secondaryCtaUrl?: string;
  };
}

export interface DocsPageContent {
  hero: {
    title: string;
    subtitle?: string;
    badge?: string;
  };
  quickstart: string[];
  sdks: {
    name: string;
    description: string;
    url: string;
  }[];
  resources: {
    title: string;
    description: string;
    url: string;
  }[];
  cta: {
    title: string;
    subtitle?: string;
    primaryCtaLabel: string;
    primaryCtaUrl: string;
    secondaryCtaLabel?: string;
    secondaryCtaUrl?: string;
  };
}

export interface ContactFormField {
  name: string;
  label: string;
  type: "text" | "email" | "textarea";
  placeholder?: string;
  required?: boolean;
}

export interface ContactPageContent {
  hero: {
    title: string;
    subtitle?: string;
    badge?: string;
  };
  intro: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
  };
  reasons: {
    title: string;
    description?: string;
  }[];
  contactMethods: {
    label: string;
    value: string;
    href: string;
    description?: string;
  }[];
  form: {
    title: string;
    subtitle?: string;
    mailto: string;
    subject: string;
    successMessage: string;
    fields: ContactFormField[];
  };
  faq: {
    question: string;
    answer: string;
  }[];
}


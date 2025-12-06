import { z } from "zod";

export const heroStepSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

export const heroVariantSchema = z.object({
  scenario: z.string(),
  badge: z.string().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  footnote: z.string().optional(),
  primaryCta: z
    .object({
      label: z.string(),
      url: z.string(),
    })
    .optional(),
  secondaryCta: z
    .object({
      label: z.string(),
      url: z.string(),
    })
    .optional(),
  steps: z.array(heroStepSchema).default([]),
});

const sectionHeadingSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
});

const featureSchema = z.object({
  headline: z.string(),
  description: z.string().optional(),
  iconLabel: z.string().optional(),
});

const useCaseSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  ctaLabel: z.string().optional(),
  ctaUrl: z.string().optional(),
});

const metricSchema = z.object({
  metric: z.string(),
  caption: z.string().optional(),
});

const architecturePanelSchema = z.object({
  heading: z.string(),
  description: z.string().optional(),
  points: z.array(z.string()).default([]),
});

const pricingTierSchema = z.object({
  name: z.string(),
  priceDisplay: z.string(),
  summary: z.string().optional(),
  highlight: z.boolean().optional(),
  features: z.array(z.string()).default([]),
  ctaLabel: z.string().optional(),
  ctaUrl: z.string().optional(),
});

const contactFormFieldSchema = z.object({
  name: z.string(),
  label: z.string(),
  type: z.enum(["text", "email", "textarea"]).default("text"),
  placeholder: z.string().optional(),
  required: z.boolean().optional(),
});

export const landingPageSchema = z.object({
  slug: z.string().default("home"),
  locale: z.string().default("en"),
  heroVariants: z.array(heroVariantSchema).default([]),
  featuresHeading: sectionHeadingSchema.optional(),
  features: z.array(featureSchema).default([]),
  useCasesHeading: sectionHeadingSchema.optional(),
  useCases: z.array(useCaseSchema).default([]),
  metricsHeading: sectionHeadingSchema.optional(),
  metrics: z.array(metricSchema).default([]),
  architectureHeading: sectionHeadingSchema.optional(),
  architecturePanels: z.array(architecturePanelSchema).default([]),
  pricingHeading: sectionHeadingSchema.optional(),
  pricingTiers: z.array(pricingTierSchema).default([]),
  testimonials: z
    .array(
      z.object({
        quote: z.string(),
        author: z.string(),
        role: z.string().optional(),
      }),
    )
    .default([]),
  finalCta: z
    .object({
      title: z.string(),
      subtitle: z.string().optional(),
      primaryCtaLabel: z.string(),
      primaryCtaUrl: z.string(),
      secondaryCtaLabel: z.string().optional(),
      secondaryCtaUrl: z.string().optional(),
      footnote: z.string().optional(),
      icon: z.string().optional(),
    })
    .optional(),
  footerCopy: z.string().optional(),
  statusPageUrl: z.string().optional(),
  documentationUrl: z.string().optional(),
  consoleUrl: z.string().optional(),
  contactEmail: z.string().optional(),
});

export type LandingPageSchema = z.infer<typeof landingPageSchema>;

export const pricingPageSchema = z.object({
  hero: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    badge: z.string().optional(),
  }),
  tiers: z.array(pricingTierSchema).default([]),
  faq: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    )
    .default([]),
  cta: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    primaryCtaLabel: z.string(),
    primaryCtaUrl: z.string(),
    secondaryCtaLabel: z.string().optional(),
    secondaryCtaUrl: z.string().optional(),
  }),
});

export const useCasesPageSchema = z.object({
  hero: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    badge: z.string().optional(),
  }),
  sections: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      summary: z.string().optional(),
      painPoints: z.array(z.string()).default([]),
      solutions: z.array(z.string()).default([]),
      ctaLabel: z.string().optional(),
      ctaUrl: z.string().optional(),
    }),
  ),
  cta: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    primaryCtaLabel: z.string(),
    primaryCtaUrl: z.string(),
    secondaryCtaLabel: z.string().optional(),
    secondaryCtaUrl: z.string().optional(),
  }),
});

export const docsPageSchema = z.object({
  hero: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    badge: z.string().optional(),
  }),
  quickstart: z.array(z.string()).default([]),
  sdks: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      url: z.string(),
    }),
  ),
  resources: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      url: z.string(),
    }),
  ),
  cta: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    primaryCtaLabel: z.string(),
    primaryCtaUrl: z.string(),
    secondaryCtaLabel: z.string().optional(),
    secondaryCtaUrl: z.string().optional(),
  }),
});

export const contactPageSchema = z.object({
  hero: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    badge: z.string().optional(),
  }),
  intro: z.object({
    eyebrow: z.string().optional(),
    title: z.string(),
    subtitle: z.string().optional(),
  }),
  reasons: z
    .array(
      z.object({
        title: z.string(),
        description: z.string().optional(),
      }),
    )
    .default([]),
  contactMethods: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
      href: z.string(),
      description: z.string().optional(),
    }),
  ),
  form: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    mailto: z.string(),
    subject: z.string().default("AgentRuntime contact request"),
    successMessage: z.string(),
    fields: z.array(contactFormFieldSchema),
  }),
  faq: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    )
    .default([]),
});


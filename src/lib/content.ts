import type {
  ArchitecturePanel,
  FeatureItem,
  HeroVariant,
  LandingPageContent,
  Metric,
  PricingTier,
  SectionHeading,
  UseCase,
} from "./types";

type Nullable<T> = T | null | undefined;

interface RawHeroStep {
  title?: string | null;
  description?: string | null;
}

interface RawHeroVariant {
  scenario?: string | null;
  badge?: string | null;
  title?: string | null;
  subtitle?: string | null;
  footnote?: string | null;
  primaryCtaLabel?: string | null;
  primaryCtaUrl?: string | null;
  secondaryCtaLabel?: string | null;
  secondaryCtaUrl?: string | null;
  steps?: RawHeroStep[] | null;
}

interface RawSectionHeading {
  title?: string | null;
  subtitle?: string | null;
}

interface RawFeatureItem {
  headline?: string | null;
  description?: string | null;
  iconLabel?: string | null;
}

interface RawUseCase {
  title?: string | null;
  description?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
}

interface RawMetric {
  metric?: string | null;
  caption?: string | null;
}

interface RawArchitecturePoint {
  text?: string | null;
}

interface RawArchitecturePanel {
  heading?: string | null;
  description?: string | null;
  points?: RawArchitecturePoint[] | null;
}

interface RawPricingFeature {
  text?: string | null;
}

interface RawPricingTier {
  name?: string | null;
  priceDisplay?: string | null;
  summary?: string | null;
  highlight?: boolean | null;
  features?: RawPricingFeature[] | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
}

interface RawLandingPageAttributes {
  heroVariants?: RawHeroVariant[] | null;
  featuresHeading?: RawSectionHeading | null;
  features?: RawFeatureItem[] | null;
  useCasesHeading?: RawSectionHeading | null;
  useCases?: RawUseCase[] | null;
  metricsHeading?: RawSectionHeading | null;
  metrics?: RawMetric[] | null;
  architectureHeading?: RawSectionHeading | null;
  architecturePanels?: RawArchitecturePanel[] | null;
  pricingHeading?: RawSectionHeading | null;
  pricingTiers?: RawPricingTier[] | null;
  footerCopy?: string | null;
  statusPageUrl?: string | null;
  documentationUrl?: string | null;
  consoleUrl?: string | null;
  contactEmail?: string | null;
}

interface RawLandingPageEntry {
  attributes?: RawLandingPageAttributes | null;
}

interface RawStrapiResponse {
  data?: RawLandingPageEntry[] | null;
}

const mapSectionHeading = (component: Nullable<RawSectionHeading>): SectionHeading | undefined => {
  if (!component) return undefined;
  return {
    title: component.title ?? "",
    subtitle: component.subtitle ?? undefined,
  };
};

const mapHeroVariant = (component: Nullable<RawHeroVariant>): HeroVariant | undefined => {
  if (!component) return undefined;
  return {
    scenario: component.scenario ?? "default",
    badge: component.badge ?? undefined,
    title: component.title ?? "",
    subtitle: component.subtitle ?? undefined,
    footnote: component.footnote ?? undefined,
    primaryCta: component.primaryCtaLabel
      ? { label: component.primaryCtaLabel, url: component.primaryCtaUrl ?? "#" }
      : undefined,
    secondaryCta: component.secondaryCtaLabel
      ? { label: component.secondaryCtaLabel, url: component.secondaryCtaUrl ?? "#" }
      : undefined,
    steps:
      component.steps?.map((step) => ({
        title: step?.title ?? "",
        description: step?.description ?? undefined,
      })) ?? [],
  };
};

const mapFeature = (component: Nullable<RawFeatureItem>): FeatureItem | undefined => {
  if (!component) return undefined;
  return {
    headline: component.headline ?? "",
    description: component.description ?? undefined,
    iconLabel: component.iconLabel ?? undefined,
  };
};

const mapUseCase = (component: Nullable<RawUseCase>): UseCase | undefined => {
  if (!component) return undefined;
  return {
    title: component.title ?? "",
    description: component.description ?? undefined,
    ctaLabel: component.ctaLabel ?? undefined,
    ctaUrl: component.ctaUrl ?? undefined,
  };
};

const mapMetric = (component: Nullable<RawMetric>): Metric | undefined => {
  if (!component) return undefined;
  return {
    metric: component.metric ?? "",
    caption: component.caption ?? undefined,
  };
};

const mapArchitecturePanel = (
  component: Nullable<RawArchitecturePanel>,
): ArchitecturePanel | undefined => {
  if (!component) return undefined;
  return {
    heading: component.heading ?? "",
    description: component.description ?? undefined,
    points:
      component.points?.map((point) => point?.text ?? "").filter((text): text is string => Boolean(text)) ?? [],
  };
};

const mapPricingTier = (component: Nullable<RawPricingTier>): PricingTier | undefined => {
  if (!component) return undefined;
  return {
    name: component.name ?? "",
    priceDisplay: component.priceDisplay ?? "",
    summary: component.summary ?? undefined,
    highlight: component.highlight ?? false,
    features:
      component.features?.map((feature) => feature?.text ?? "").filter((text): text is string => Boolean(text)) ?? [],
    ctaLabel: component.ctaLabel ?? undefined,
    ctaUrl: component.ctaUrl ?? undefined,
  };
};

const buildPopulateParam = () =>
  [
    "heroVariants.steps",
    "features",
    "useCases",
    "metrics",
    "architecturePanels.points",
    "pricingTiers.features",
    "featuresHeading",
    "useCasesHeading",
    "metricsHeading",
    "architectureHeading",
    "pricingHeading",
  ].join(",");

export interface FetchLandingPageOptions {
  baseUrl: string;
  slug?: string;
  locale?: string;
}

export async function fetchLandingPageContent(
  options: FetchLandingPageOptions,
): Promise<LandingPageContent | null> {
  const { baseUrl, slug = "main", locale = "en" } = options;

  const params = new URLSearchParams();
  params.set("filters[slug][$eq]", slug);
  params.set("locale", locale);
  params.set("populate", buildPopulateParam());

  const url = `${baseUrl.replace(/\/+$/, "")}/api/landing-pages?${params.toString()}`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch landing page content: ${response.status}`);
  }

  const payload = (await response.json()) as RawStrapiResponse;

  const entry = payload?.data?.[0]?.attributes ?? null;
  if (!entry) return null;

  const heroVariants: HeroVariant[] =
    entry.heroVariants
      ?.map((variant) => mapHeroVariant(variant))
      .filter((variant): variant is HeroVariant => Boolean(variant)) ?? [];

  return {
    slug,
    locale,
    heroVariants: heroVariants.length > 0 ? heroVariants : [],
    featuresHeading: mapSectionHeading(entry.featuresHeading),
    features:
      entry.features?.map((feature) => mapFeature(feature)).filter((item): item is FeatureItem => Boolean(item)) ?? [],
    useCasesHeading: mapSectionHeading(entry.useCasesHeading),
    useCases:
      entry.useCases?.map((useCase) => mapUseCase(useCase)).filter((item): item is UseCase => Boolean(item)) ?? [],
    metricsHeading: mapSectionHeading(entry.metricsHeading),
    metrics:
      entry.metrics?.map((metric) => mapMetric(metric)).filter((item): item is Metric => Boolean(item)) ?? [],
    architectureHeading: mapSectionHeading(entry.architectureHeading),
    architecturePanels:
      entry.architecturePanels
        ?.map((panel) => mapArchitecturePanel(panel))
        .filter((item): item is ArchitecturePanel => Boolean(item)) ?? [],
    pricingHeading: mapSectionHeading(entry.pricingHeading),
    pricingTiers:
      entry.pricingTiers
        ?.map((tier) => mapPricingTier(tier))
        .filter((item): item is PricingTier => Boolean(item)) ?? [],
    footerCopy: entry.footerCopy ?? undefined,
    statusPageUrl: entry.statusPageUrl ?? undefined,
    documentationUrl: entry.documentationUrl ?? undefined,
    consoleUrl: entry.consoleUrl ?? undefined,
    contactEmail: entry.contactEmail ?? undefined,
  };
}


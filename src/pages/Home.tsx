import { useMemo } from "react";
import { homeContent, selectHeroVariant } from "../content";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { HeroSection } from "../components/sections/HeroSection";
import { FeaturesSection } from "../components/sections/FeaturesSection";
import { UseCasesSection } from "../components/sections/UseCasesSection";
import { MetricsSection } from "../components/sections/MetricsSection";
import { ArchitectureSection } from "../components/sections/ArchitectureSection";
import { PricingSection } from "../components/sections/PricingSection";

function getScenarioFromLocation() {
  if (typeof window === "undefined") return undefined;
  const params = new URLSearchParams(window.location.search);
  return params.get("scenario") ?? undefined;
}

export const HomePage = () => {
  const scenario = useMemo(() => getScenarioFromLocation(), []);
  const heroVariant = selectHeroVariant(homeContent, scenario);

  const documentationUrl = homeContent.documentationUrl ?? "https://docs.agentruntime.io";
  const consoleUrl = homeContent.consoleUrl ?? "/console";
  const statusUrl = homeContent.statusPageUrl ?? "https://status.agentruntime.io";
  const contactEmail = homeContent.contactEmail ?? "hello@agentruntime.io";

  return (
    <div className="page" id="top">
      <Header documentationUrl={documentationUrl} consoleUrl={consoleUrl} />
      <main>
        <HeroSection variant={heroVariant} />
        <FeaturesSection heading={homeContent.featuresHeading} features={homeContent.features} />
        <UseCasesSection heading={homeContent.useCasesHeading} useCases={homeContent.useCases} />
        <MetricsSection heading={homeContent.metricsHeading} metrics={homeContent.metrics} />
        <ArchitectureSection
          heading={homeContent.architectureHeading}
          panels={homeContent.architecturePanels}
        />
        <PricingSection
          heading={homeContent.pricingHeading}
          tiers={homeContent.pricingTiers}
          contactEmail={contactEmail}
          consoleUrl={consoleUrl}
        />
      </main>
      <Footer
        documentationUrl={documentationUrl}
        consoleUrl={consoleUrl}
        statusUrl={statusUrl}
        contactEmail={contactEmail}
        footerCopy={homeContent.footerCopy}
      />
    </div>
  );
};


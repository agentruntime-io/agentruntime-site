import { useEffect, useMemo, useState } from "react";
import "./styles.css";
import { fetchLandingPageContent } from "./lib/content";
import { fallbackLandingPage } from "./lib/fallback";
import type { HeroVariant, LandingPageContent } from "./lib/types";

const navLinks = [
    {label: "Platform", href: "#platform"},
    {label: "Use cases", href: "#use-cases"},
    {label: "Architecture", href: "#architecture"},
    {label: "Pricing", href: "#pricing"},
    {label: "Docs", href: "https://docs.agentruntime.io"},
];

function getScenarioFromLocation() {
    if (typeof window === "undefined") return undefined;
    const params = new URLSearchParams(window.location.search);
    return params.get("scenario") ?? undefined;
}

function App() {
    const [content, setContent] = useState<LandingPageContent>(fallbackLandingPage);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const baseUrl = import.meta.env.VITE_STRAPI_API_URL;
        const slug = import.meta.env.VITE_STRAPI_LANDING_SLUG || "main";
        const locale = import.meta.env.VITE_STRAPI_LOCALE || "en";

        if (!baseUrl) {
            setIsLoading(false);
            return;
        }

        let isMounted = true;

        fetchLandingPageContent({baseUrl, slug, locale})
            .then((data) => {
                if (!isMounted || !data) return;
                setContent(data);
            })
            .catch((error) => {
                console.warn("[marketing] Unable to fetch CMS content, falling back to defaults:", error);
            })
            .finally(() => {
                if (isMounted) setIsLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const scenario = useMemo(() => getScenarioFromLocation(), []);

    const heroVariant: HeroVariant | undefined = useMemo(() => {
        const match = scenario
            ? content.heroVariants.find((variant) => variant.scenario === scenario)
            : undefined;
        return match ?? content.heroVariants[0];
    }, [content.heroVariants, scenario]);

    const highlightMetrics = content.metrics;
    const featuresHeading = content.featuresHeading;
    const useCasesHeading = content.useCasesHeading;
    const metricsHeading = content.metricsHeading;
    const architectureHeading = content.architectureHeading;
    const pricingHeading = content.pricingHeading;

    const documentationUrl = content.documentationUrl ?? "https://docs.agentruntime.io";
    const consoleUrl = content.consoleUrl ?? "/console";
    const statusUrl = content.statusPageUrl ?? "https://status.agentruntime.io";
    const contactEmail = content.contactEmail ?? "hello@agentruntime.io";

    return (
        <div className="page">
            <header className="site-header">
                <div className="shell">
                    <a className="brand" href="#">
                        <span className="brand-mark">AR</span>
                        <span className="brand-name">AgentRuntime</span>
                    </a>
                    <nav className="nav">
                        {navLinks.map(({label, href}) => (
                            <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
                                {label}
                            </a>
                        ))}
                    </nav>
                    <div className="nav-actions">
                        <a className="ghost-button" href={documentationUrl} target="_blank" rel="noreferrer">
                            Documentation
                        </a>
                        <a className="primary-button" href={consoleUrl}>
                            Launch Console
                        </a>
                    </div>
                </div>
            </header>

            <main>
                <section className="hero">
                    <div className="shell hero-grid">
                        <div className="hero-content">
                            {heroVariant?.badge ? (
                                <div className="hero-badge">{heroVariant.badge}</div>
                            ) : null}
                            <h1 className="hero-title">
                                {heroVariant?.title ?? "AgentRuntime"}
                            </h1>
                            {heroVariant?.subtitle ? (
                                <p className="hero-subtitle">{heroVariant.subtitle}</p>
                            ) : null}
                            <div className="hero-actions">
                                {heroVariant?.primaryCta ? (
                                    <a className="primary-button giant" href={heroVariant.primaryCta.url}>
                                        {heroVariant.primaryCta.label}
                                    </a>
                                ) : null}
                                {heroVariant?.secondaryCta ? (
                                    <a className="ghost-button giant" href={heroVariant.secondaryCta.url} target="_blank" rel="noreferrer">
                                        {heroVariant.secondaryCta.label}
                                    </a>
                                ) : null}
                            </div>
                            {heroVariant?.footnote ? (
                                <div className="hero-footnote">{heroVariant.footnote}</div>
                            ) : null}
                        </div>
                        <div className="hero-card">
                            <div className="hero-card-header">
                                <span>Workflow timeline</span>
                                <span className="hero-chip">Supervised</span>
                            </div>
                            <ol className="hero-card-list">
                                {(heroVariant?.steps ?? []).map((step, index) => (
                                    <li key={`${step.title}-${index}`}>
                                        <span className="hero-step-index">{String(index + 1).padStart(2, "0")}</span>
                                        <div>
                                            <h4>{step.title}</h4>
                                            {step.description ? <p>{step.description}</p> : null}
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </section>

                <section id="platform" className="section">
                    <div className="shell">
                        {featuresHeading ? (
                            <>
                                <h2 className="section-title">{featuresHeading.title}</h2>
                                {featuresHeading.subtitle ? (
                                    <p className="section-subtitle">{featuresHeading.subtitle}</p>
                                ) : null}
                            </>
                        ) : null}

                        <div className="feature-grid">
                            {content.features.map((feature, index) => (
                                <article key={`${feature.headline}-${index}`}>
                                    <div className="feature-icon">
                                        {feature.iconLabel ?? String(index + 1).padStart(2, "0")}
                                    </div>
                                    <h3>{feature.headline}</h3>
                                    {feature.description ? <p>{feature.description}</p> : null}
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="use-cases" className="section muted">
                    <div className="shell">
                        {useCasesHeading ? (
                            <h2 className="section-title">{useCasesHeading.title}</h2>
                        ) : null}
                        <div className="card-grid">
                            {content.useCases.map((item, index) => (
                                <article key={`${item.title}-${index}`}>
                                    <h3>{item.title}</h3>
                                    {item.description ? <p>{item.description}</p> : null}
                                    {item.ctaLabel && item.ctaUrl ? (
                                        <a href={item.ctaUrl} className="text-link">
                                            {item.ctaLabel}
                                        </a>
                                    ) : null}
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="shell stats-grid">
                        {(metricsHeading ? [metricsHeading] : []).map((heading) => (
                            <div key={heading.title} className="stat-card">
                                <h3 className="stat-metric">{heading.title}</h3>
                                {heading.subtitle ? <p className="stat-caption">{heading.subtitle}</p> : null}
                            </div>
                        ))}
                        {highlightMetrics.map((highlight, index) => (
                            <div key={`${highlight.metric}-${index}`} className="stat-card">
                                <div className="stat-metric">{highlight.metric}</div>
                                {highlight.caption ? (
                                    <p className="stat-caption">{highlight.caption}</p>
                                ) : null}
                            </div>
                        ))}
                    </div>
                </section>

                <section id="architecture" className="section muted">
                    <div className="shell architecture">
                        <div>
                            {architectureHeading ? (
                                <>
                                    <h2 className="section-title">{architectureHeading.title}</h2>
                                    {architectureHeading.subtitle ? (
                                        <p className="section-subtitle">{architectureHeading.subtitle}</p>
                                    ) : null}
                                </>
                            ) : null}
                            <ul className="architecture-list">
                                {content.architecturePanels.length === 0
                                    ? ["Multi-tenant context enforcement via the BFF and policy-as-code.",
                                        "Workflows orchestrated by a battle-tested event bus with at-least-once delivery.",
                                        "Realtime collaboration overlays for supervisors to approve, annotate, or reroute.",
                                        "Pluggable evaluation loops (auto QA, human scoring, or synthetic monitors).",
                                    ].map((item, index) => <li key={index}>{item}</li>)
                                    : null}
                            </ul>
                        </div>
                        <div className="architecture-diagram">
                            {content.architecturePanels.map((panel, index) => (
                                <div key={`${panel.heading}-${index}`} className="diagram-panel">
                                    <h4>{panel.heading}</h4>
                                    {panel.description ? <p>{panel.description}</p> : null}
                                    {panel.points.length > 0 ? (
                                        <ul>
                                            {panel.points.map((point, pointIndex) => (
                                                <li key={`${panel.heading}-${pointIndex}`}>{point}</li>
                                            ))}
                                        </ul>
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="pricing" className="section">
                    <div className="shell pricing-card">
                        {pricingHeading ? (
                            <>
                                <h2>{pricingHeading.title}</h2>
                                {pricingHeading.subtitle ? <p>{pricingHeading.subtitle}</p> : null}
                            </>
                        ) : null}
                        <ul>
                            {content.pricingTiers.map((tier, index) => (
                                <li key={`${tier.name}-${index}`}>
                                    {tier.name} — <strong>{tier.priceDisplay}</strong>{" "}
                                    {tier.summary ? `— ${tier.summary}` : null}
                                </li>
                            ))}
                        </ul>
                        <div className="pricing-actions">
                            <a className="primary-button giant" href={`mailto:${contactEmail}`}>
                                Talk to sales
                            </a>
                            <a className="ghost-button giant" href={consoleUrl}>
                                Launch console
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="site-footer">
                <div className="shell footer-grid">
                    <div>
                        <div className="brand mark-only">AR</div>
                        <p className="footer-copy">
                            {content.footerCopy ??
                                "AgentRuntime gives teams a production-ready foundation for orchestrating AI-first operations."}
                        </p>
                    </div>
                    <div className="footer-links">
                        <div>
                            <h4>Product</h4>
                            <a href="#platform">Platform</a>
                            <a href="#use-cases">Use cases</a>
                            <a href="#architecture">Architecture</a>
                        </div>
                        <div>
                            <h4>Company</h4>
                            <a href={`mailto:careers@${contactEmail.split("@")[1] || "agentruntime.io"}`}>Careers</a>
                            <a href={`mailto:press@${contactEmail.split("@")[1] || "agentruntime.io"}`}>Press</a>
                            <a href={`mailto:${contactEmail}`}>Contact</a>
                        </div>
                        <div>
                            <h4>Resources</h4>
                            <a href={documentationUrl} target="_blank" rel="noreferrer">
                                Documentation
                            </a>
                            <a href={statusUrl} target="_blank" rel="noreferrer">
                                Status
                            </a>
                            <a href={consoleUrl}>Console</a>
                        </div>
                    </div>
                </div>
                <div className="shell footer-bottom">
                    <span>© {new Date().getFullYear()} AgentRuntime. All rights reserved.</span>
                    <span className="footer-bottom-links">
                        <a href="#">Privacy</a>
                        <a href="#">Security</a>
                        <a href="#">Terms</a>
                    </span>
                </div>
            </footer>

            {isLoading ? <div className="loading-indicator" aria-hidden="true" /> : null}
        </div>
    );
}

export default App;


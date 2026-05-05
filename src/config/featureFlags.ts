/**
 * Feature flags for conditionally showing/hiding sections.
 * Toggle these to control visibility without removing code.
 *
 * SEO / sitemap / prerender / llms:
 * When a **route** is disabled here (redirects in App.tsx), do **not** list that URL in
 * `public/sitemap.xml`, `public/llms.txt`, or `public/llms-full.txt` - crawlers would see a
 * mismatch (sitemap promises a page; app redirects to `/`). The prerender script reads
 * `sitemap.xml`, so those URLs would also get wrong static HTML.
 * Applies today to **showAboutPage** (`/about`) and **showCareersPage** (`/careers`).
 * When you turn a flag on for production, add the URL(s) back to those files and rebuild.
 */

export const featureFlags = {
  /** Hero section variant: "cta" = centered with Get Started / See Docs; "waitlist" = split layout with waitlist form on right */
  heroVariant: "waitlist" as "cta" | "waitlist",

  /**
   * Show About page and its nav link (`/about`).
   * If false, `/about` redirects to `/` - keep it out of sitemap + llms until true.
   */
  showAboutPage: false,

  /** About page: "Join Our Team" careers section */
  showAboutCareers: false,

  /**
   * Standalone `/careers` page and footer link.
   * If false, `/careers` redirects to `/` - keep it out of sitemap + llms until true.
   */
  showCareersPage: false,

  /** About page: Contact & Location section (location + social links) */
  showAboutContactLocation: false,

  /** Use Cases page: "Calculate Your ROI" section */
  showUseCasesROISection: false,

  /** Use Cases page: "Ready to get started?" CTA section */
  showUseCasesCTASection: false,

  /** Contact page: Support contact method (support@agentruntime.io, Documentation) */
  showContactSupport: false,

  /** Contact page: Sales contact method (sales@agentruntime.io, +1-800-123-4567) */
  showContactSales: false,
} as const;

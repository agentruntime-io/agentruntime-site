/**
 * Feature flags for conditionally showing/hiding sections.
 * Toggle these to control visibility without removing code.
 */

export const featureFlags = {
  /** Show About page and its nav link */
  showAboutPage: false,

  /** About page: "Join Our Team" careers section */
  showAboutCareers: false,

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

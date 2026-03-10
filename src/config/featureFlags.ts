/**
 * Feature flags for conditionally showing/hiding sections.
 * Toggle these to control visibility without removing code.
 */

export const featureFlags = {
  /** About page: "Join Our Team" careers section */
  showAboutCareers: false,

  /** About page: Contact & Location section (location + social links) */
  showAboutContactLocation: false,
} as const;

/**
 * API/BFF base URL for form submissions and data fetching.
 * Derives from VITE_BFF_URL or VITE_CONTACT_FORM_ENDPOINT for backward compatibility.
 */
const contactEndpoint =
  (import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined)?.trim() || "";
const bffBase =
  (import.meta.env.VITE_BFF_URL as string | undefined)?.trim() ||
  (contactEndpoint ? contactEndpoint.replace(/\/v1\/contact\/?$/, "") : "");

export const api = {
  /** Base URL for BFF API (e.g. https://api.agentruntime.io). Empty if not configured. */
  baseUrl: bffBase,
  /** Contact form endpoint (legacy, full URL). */
  contact: contactEndpoint || (bffBase ? `${bffBase.replace(/\/$/, "")}/v1/contact` : ""),
  waitlist: bffBase ? `${bffBase.replace(/\/$/, "")}/v1/waitlist` : "",
  newsletter: bffBase ? `${bffBase.replace(/\/$/, "")}/v1/newsletter` : "",
  careersApplications: bffBase ? `${bffBase.replace(/\/$/, "")}/v1/careers/applications` : "",
  careersJobs: bffBase ? `${bffBase.replace(/\/$/, "")}/v1/careers/jobs` : "",
} as const;

import posthog from "posthog-js";

/**
 * Product analytics for the marketing site (PostHog, same EU instance as the console).
 *
 * Consent model:
 * - Before a choice, and after "Reject": PostHog runs in cookieless mode (no cookies,
 *   no local storage for tracking; visitors are counted with a hash computed on
 *   PostHog's servers). Cookieless mode must be enabled in the PostHog project settings.
 * - After "Accept": PostHog uses its normal cookie, shared across agentruntime.io
 *   subdomains, so a site visit can be linked to a console signup.
 * - Do Not Track turns analytics off entirely; Global Privacy Control counts as "Reject".
 *
 * Nothing is sent unless VITE_POSTHOG_KEY is set, and never from the prerender browser.
 * Never pass names, emails or free-text form contents to `track`.
 */

const key = (import.meta.env.VITE_POSTHOG_KEY as string | undefined)?.trim() || "";
const host =
  (import.meta.env.VITE_POSTHOG_HOST as string | undefined)?.trim() ||
  "https://eu.i.posthog.com";

export type ConsentStatus = "granted" | "denied" | "pending";

const CONSENT_EVENT = "ar:consent-change";
const SETTINGS_EVENT = "ar:open-cookie-settings";

let started = false;

// PostHog's own respect_dnt only opts the visitor out, and cookieless "on_reject" mode would
// still count opted-out visitors, so Do Not Track is checked here and PostHog never starts.
function sendsDoNotTrack(): boolean {
  const nav = navigator as Navigator & { msDoNotTrack?: string };
  const win = window as Window & { doNotTrack?: string };
  return [nav.doNotTrack, nav.msDoNotTrack, win.doNotTrack].some(
    (value) => value === "1" || value === "yes",
  );
}

/**
 * True when analytics is configured, this is a real visitor (not the prerender browser),
 * and the browser does not send Do Not Track.
 */
export function analyticsEnabled(): boolean {
  return (
    Boolean(key) &&
    typeof window !== "undefined" &&
    !navigator.webdriver &&
    !sendsDoNotTrack()
  );
}

function sendsPrivacySignal(): boolean {
  return Boolean(
    (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl,
  );
}

export function initAnalytics(): void {
  if (started || !analyticsEnabled()) return;
  started = true;

  posthog.init(key, {
    api_host: host,
    person_profiles: "identified_only",
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: true,
    disable_session_recording: true,
    opt_out_capturing_by_default: true,
    cookieless_mode: "on_reject",
    respect_dnt: true,
    cross_subdomain_cookie: true,
  });

  if (sendsPrivacySignal() && posthog.get_explicit_consent_status() === "pending") {
    posthog.opt_out_capturing();
  }
}

export function getConsentStatus(): ConsentStatus {
  if (!started) return "pending";
  return posthog.get_explicit_consent_status();
}

export function setConsent(granted: boolean): void {
  if (!started) return;
  if (granted) {
    posthog.opt_in_capturing();
  } else {
    posthog.opt_out_capturing();
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT));
}

export function onConsentChange(listener: () => void): () => void {
  window.addEventListener(CONSENT_EVENT, listener);
  return () => window.removeEventListener(CONSENT_EVENT, listener);
}

/** Reopens the cookie banner so a visitor can change their choice. */
export function openCookieSettings(): void {
  window.dispatchEvent(new CustomEvent(SETTINGS_EVENT));
}

export function onOpenCookieSettings(listener: () => void): () => void {
  window.addEventListener(SETTINGS_EVENT, listener);
  return () => window.removeEventListener(SETTINGS_EVENT, listener);
}

export function track(
  event: string,
  properties?: Record<string, string | number | boolean | undefined>,
): void {
  if (!started) return;
  posthog.capture(event, properties);
}

export function trackPageview(): void {
  if (!started) return;
  posthog.capture("$pageview");
}

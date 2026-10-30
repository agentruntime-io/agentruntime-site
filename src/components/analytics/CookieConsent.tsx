import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  analyticsEnabled,
  getConsentStatus,
  initAnalytics,
  onOpenCookieSettings,
  setConsent,
  type ConsentStatus,
} from "@/lib/analytics";

const choiceLabel: Record<ConsentStatus, string | null> = {
  granted: "Your current choice: analytics cookies allowed.",
  denied: "Your current choice: analytics cookies rejected.",
  pending: null,
};

/**
 * Cookie banner. Shown only when PostHog is configured and the visitor has not chosen yet;
 * the footer's "Cookie settings" reopens it. Accept and Reject carry equal weight.
 */
export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<ConsentStatus>("pending");
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!analyticsEnabled()) return;
    initAnalytics();
    const current = getConsentStatus();
    setStatus(current);
    setOpen(current === "pending");
    return onOpenCookieSettings(() => {
      setStatus(getConsentStatus());
      setOpen(true);
      window.setTimeout(() => headingRef.current?.focus(), 0);
    });
  }, []);

  if (!open) return null;

  const choose = (granted: boolean) => {
    setConsent(granted);
    setStatus(granted ? "granted" : "denied");
    setOpen(false);
  };

  return (
    <section className="marketing-consent" aria-labelledby="cookie-consent-title">
      <h2 id="cookie-consent-title" ref={headingRef} tabIndex={-1}>
        Cookies on this site
      </h2>
      <p>
        We count visits to this site without cookies. With your permission, we
        also use analytics cookies to understand how people move between this
        site and the AgentRuntime console.{" "}
        <Link to="/legal/cookie-policy">Cookie Policy</Link>
      </p>
      {choiceLabel[status] && (
        <p className="marketing-consent-current">{choiceLabel[status]}</p>
      )}
      <div className="marketing-consent-actions">
        <button
          type="button"
          className="marketing-button marketing-button-secondary"
          onClick={() => choose(false)}
        >
          Reject
        </button>
        <button
          type="button"
          className="marketing-button marketing-button-secondary"
          onClick={() => choose(true)}
        >
          Accept
        </button>
      </div>
    </section>
  );
}

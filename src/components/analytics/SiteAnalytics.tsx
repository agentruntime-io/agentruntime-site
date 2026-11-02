import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  analyticsEnabled,
  initAnalytics,
  track,
  trackPageview,
} from "@/lib/analytics";

/**
 * Site-wide event tracking. One delegated click listener and one section observer cover
 * every page, so page components stay free of analytics code.
 *
 * Events: $pageview, cta_clicked, demo_interacted, section_viewed, pricing_intent.
 * The contact form sends its own contact_form_* events.
 */

const SECTION_SELECTOR =
  ".marketing-page > section, .marketing-page > div > section";

function clean(text: string | null | undefined, max = 80) {
  return (text ?? "").replace(/\s+/g, " ").trim().slice(0, max) || undefined;
}

function sectionName(section: Element | null) {
  if (!section) return undefined;
  return (
    clean(section.querySelector("h1, h2")?.textContent) ||
    section.id ||
    section.classList[0] ||
    undefined
  );
}

function destinationOf(url: URL) {
  if (url.protocol === "mailto:") return "email";
  if (url.origin === window.location.origin) {
    if (url.pathname.startsWith("/contact")) return "contact";
    if (url.pathname.startsWith("/api-reference")) return "docs";
    return "internal";
  }
  if (url.hostname.startsWith("console.")) return "console";
  if (url.hostname.startsWith("docs.")) return "docs";
  return "external";
}

function areaOf(element: Element) {
  if (element.closest(".marketing-nav-wrap")) return "nav";
  if (element.closest(".marketing-footer")) return "footer";
  return "page";
}

export function SiteAnalytics() {
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    if (!analyticsEnabled()) return;
    trackPageview();
    const params = new URLSearchParams(location.search);
    if (location.pathname === "/contact" && params.get("source") === "pricing") {
      track("pricing_intent");
    }
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!analyticsEnabled()) return;

    const onClick = (event: MouseEvent) => {
      const element = (event.target as Element | null)?.closest("a[href], button");
      if (!element || element.closest(".marketing-consent")) return;

      const label = clean(element.getAttribute("aria-label") || element.textContent);
      const page = window.location.pathname;

      if (element.closest(".marketing-product-stage")) {
        track("demo_interacted", { label, page });
        return;
      }
      if (!element.closest(".marketing-page, .marketing-nav-wrap, .marketing-footer")) {
        return;
      }

      const common = {
        label,
        page,
        area: areaOf(element),
        section: sectionName(element.closest("section")),
      };
      if (element instanceof HTMLAnchorElement) {
        const url = new URL(element.href, window.location.href);
        const destination = destinationOf(url);
        track("cta_clicked", {
          ...common,
          destination,
          // Paths only; never the address of a mailto link.
          target:
            destination === "email"
              ? undefined
              : url.origin === window.location.origin
                ? url.pathname + url.hash
                : url.hostname,
        });
      } else if (element.classList.contains("marketing-button")) {
        track("cta_clicked", { ...common, destination: "action" });
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (!analyticsEnabled() || !("IntersectionObserver" in window)) return;

    const page = location.pathname;
    let observer: IntersectionObserver | undefined;
    let attempts = 0;
    let timer = 0;

    // Pages load lazily, so wait until their sections are in the DOM.
    const start = () => {
      const sections = Array.from(document.querySelectorAll(SECTION_SELECTOR));
      if (sections.length === 0 && attempts++ < 10) {
        timer = window.setTimeout(start, 500);
        return;
      }
      // A section counts as viewed once its top reaches the upper 60% of the screen.
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            track("section_viewed", {
              page,
              section: sectionName(entry.target),
              position: sections.indexOf(entry.target) + 1,
            });
            observer?.unobserve(entry.target);
          }
        },
        { rootMargin: "0px 0px -40% 0px" },
      );
      sections.forEach((section) => observer?.observe(section));
    };

    timer = window.setTimeout(start, 500);
    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, [location.pathname]);

  return null;
}

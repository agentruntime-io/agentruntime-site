import { useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import {
  clearBlogListScroll,
  readBlogListScroll,
  restoreBlogListScroll,
  saveBlogListScroll,
  type BlogScrollLocationState,
} from "@/lib/blogScrollRestoration";

const BLOG_INDEX = "/blog";

/**
 * Central scroll policy for client-side routing:
 * - Forward nav (PUSH/REPLACE) → top, except `/blog` restore/top rules below
 * - Back/forward (POP) → browser history; `/blog` restores saved list position
 * - `/blog` list position saved to sessionStorage when leaving the index
 */
export function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const prevPathnameRef = useRef(location.pathname);

  useLayoutEffect(() => {
    const prevPathname = prevPathnameRef.current;
    const { pathname, hash, state } = location;
    const scrollState = (state ?? {}) as BlogScrollLocationState;

    if (prevPathname === BLOG_INDEX && pathname !== BLOG_INDEX) {
      saveBlogListScroll(window.scrollY);
    }

    let clearRestoreRetry: (() => void) | undefined;

    if (hash) {
      document.querySelector(hash)?.scrollIntoView();
    } else if (pathname === BLOG_INDEX) {
      if (scrollState.scrollToTop) {
        clearBlogListScroll();
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      } else if (navigationType === "POP" || scrollState.restoreBlogScroll) {
        const y = readBlogListScroll();
        if (y != null && y > 0) {
          clearRestoreRetry = restoreBlogListScroll(y);
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        }
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    } else if (navigationType !== "POP") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }

    prevPathnameRef.current = pathname;
    return () => clearRestoreRetry?.();
  }, [location, navigationType]);

  return null;
}

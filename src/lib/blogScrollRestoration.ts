/** sessionStorage key for `/blog` list scroll position. */
export const BLOG_SCROLL_STORAGE_KEY = "scroll:/blog";

/** React Router location state for blog index navigation. */
export type BlogScrollLocationState = {
  /** Restore list scroll (Back to Blog, browser back). */
  restoreBlogScroll?: boolean;
  /** Force top of list (nav/footer Blog). */
  scrollToTop?: boolean;
};

export const blogRestoreScrollState: BlogScrollLocationState = { restoreBlogScroll: true };
export const blogScrollToTopState: BlogScrollLocationState = { scrollToTop: true };

export function saveBlogListScroll(y: number): void {
  sessionStorage.setItem(BLOG_SCROLL_STORAGE_KEY, String(Math.round(y)));
}

export function readBlogListScroll(): number | null {
  const raw = sessionStorage.getItem(BLOG_SCROLL_STORAGE_KEY);
  if (raw == null) {
    return null;
  }
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

export function clearBlogListScroll(): void {
  sessionStorage.removeItem(BLOG_SCROLL_STORAGE_KEY);
}

/** Clear saved position and scroll window to blog list top (same-route nav clicks). */
export function scrollToBlogTop(): void {
  clearBlogListScroll();
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

/**
 * Restore list scroll after layout; retries briefly for lazy-loaded cover images.
 * Returns cleanup for the delayed retry timer.
 */
export function restoreBlogListScroll(y: number): () => void {
  window.scrollTo({ top: y, left: 0, behavior: "auto" });
  requestAnimationFrame(() => {
    window.scrollTo({ top: y, left: 0, behavior: "auto" });
  });
  const timer = window.setTimeout(() => {
    window.scrollTo({ top: y, left: 0, behavior: "auto" });
  }, 150);
  return () => window.clearTimeout(timer);
}

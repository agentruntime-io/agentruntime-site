import { Link, type LinkProps, useLocation } from "react-router-dom";
import { blogScrollToTopState, scrollToBlogTop } from "@/lib/blogScrollRestoration";

const BLOG_INDEX = "/blog";

type BlogIndexLinkProps = Omit<LinkProps, "to" | "state">;

/**
 * Link to `/blog` that scrolls to the list top (nav/footer intent).
 * When already on `/blog`, scrolls immediately without a route change.
 */
export function BlogIndexLink({ onClick, ...props }: BlogIndexLinkProps) {
  const location = useLocation();

  return (
    <Link
      to={BLOG_INDEX}
      state={blogScrollToTopState}
      onClick={(event) => {
        if (location.pathname === BLOG_INDEX) {
          scrollToBlogTop();
        }
        onClick?.(event);
      }}
      {...props}
    />
  );
}

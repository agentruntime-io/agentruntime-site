import { Helmet } from "react-helmet-async";
import {
  DEFAULT_DESCRIPTION,
  OG_IMAGE_PATH,
  SITE_NAME,
  SITE_URL,
  TWITTER_HANDLE,
} from "@/config/site";

export type SeoProps = {
  /** Short page title; ` | ${SITE_NAME}` is appended when missing */
  title: string;
  description?: string;
  /** Path only, e.g. `/pricing` - canonical and og:url. Omit on error pages. */
  canonicalPath?: string;
  /** Use for 404, thank-you pages, etc. */
  noindex?: boolean;
  /** Absolute URL or path starting with / (defaults to OG image on SITE_URL) */
  ogImage?: string;
  /** Open Graph type; blog posts should use `"article"` */
  ogType?: "website" | "article";
  /** ISO 8601, e.g. `2026-05-07T12:00:00.000Z`. Used when `ogType === "article"`. */
  articlePublishedTime?: string;
};

function absoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_URL}${path}`;
}

function formatTitle(title: string): string {
  if (title.includes(SITE_NAME)) {
    return title;
  }
  return `${title} | ${SITE_NAME}`;
}

export function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  canonicalPath,
  noindex = false,
  ogImage,
  ogType = "website",
  articlePublishedTime,
}: SeoProps) {
  const fullTitle = formatTitle(title);
  const canonical =
    canonicalPath !== undefined ? absoluteUrl(canonicalPath) : undefined;
  const ogImageUrl = ogImage ? absoluteUrl(ogImage) : absoluteUrl(OG_IMAGE_PATH);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical !== undefined ? (
        <link rel="canonical" href={canonical} />
      ) : null}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {canonical !== undefined ? (
        <meta property="og:url" content={canonical} />
      ) : null}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:locale" content="en_US" />
      {ogType === "article" && articlePublishedTime ? (
        <meta property="article:published_time" content={articlePublishedTime} />
      ) : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />

      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
    </Helmet>
  );
}

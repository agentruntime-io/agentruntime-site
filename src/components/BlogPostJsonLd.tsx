import { Helmet } from "react-helmet-async";
import { company } from "@/config/company";
import type { BlogPost } from "@/blog/types";
import { OG_IMAGE_PATH, SITE_NAME, SITE_URL } from "@/config/site";

/**
 * BlogPosting + BreadcrumbList for article pages (`@graph` so publishers can coexist with breadcrumbs).
 */
export function BlogPostJsonLd({ post }: { post: BlogPost }) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const datePublished = `${post.publishedAt}T12:00:00.000Z`;
  const images = post.coverImage ? [`${SITE_URL}${post.coverImage}`] : [`${SITE_URL}${OG_IMAGE_PATH}`];

  const publisher = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: company.name,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}${OG_IMAGE_PATH}`,
    },
  };

  const blogPosting = {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    datePublished,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: images,
    publisher,
    isPartOf: { "@id": `${SITE_URL}/#website`, "@type": "WebSite" },
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [blogPosting, breadcrumb],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(graph)}</script>
    </Helmet>
  );
}

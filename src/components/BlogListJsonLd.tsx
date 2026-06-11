import { Helmet } from "react-helmet-async";
import { company } from "@/config/company";
import type { BlogPost } from "@/blog/types";
import { OG_IMAGE_PATH, SITE_NAME, SITE_URL } from "@/config/site";

type BlogListJsonLdProps = {
  /** Posts in the same order as shown on the listing UI (for ItemList). */
  posts: Pick<BlogPost, "slug" | "title" | "description" | "publishedAt">[];
  /** Listing page description (matches visible intro when unfiltered). */
  description: string;
};

const BLOG_URL = `${SITE_URL}/blog`;

/**
 * Blog + ItemList + BreadcrumbList for `/blog` (`@graph`).
 * ItemList entries reference each post as a nested BlogPosting.
 */
export function BlogListJsonLd({ posts, description }: BlogListJsonLdProps) {
  const publisher = {
    "@type": "Organization" as const,
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: company.name,
    logo: {
      "@type": "ImageObject" as const,
      url: `${SITE_URL}${OG_IMAGE_PATH}`,
    },
  };

  const blog = {
    "@type": "Blog" as const,
    "@id": `${BLOG_URL}#blog`,
    name: `${SITE_NAME} Blog`,
    description,
    url: BLOG_URL,
    publisher,
    isPartOf: { "@id": `${SITE_URL}/#website`, "@type": "WebSite" as const },
  };

  const itemList = {
    "@type": "ItemList" as const,
    "@id": `${BLOG_URL}#itemlist`,
    itemListOrder: "https://schema.org/ItemListUnordered",
    numberOfItems: posts.length,
    itemListElement: posts.map((post, index) => {
      const url = `${BLOG_URL}/${post.slug}`;
      return {
        "@type": "ListItem" as const,
        position: index + 1,
        item: {
          "@type": "BlogPosting" as const,
          "@id": `${url}#article`,
          headline: post.title,
          description: post.description,
          datePublished: `${post.publishedAt}T12:00:00.000Z`,
          url,
        },
      };
    }),
  };

  const breadcrumb = {
    "@type": "BreadcrumbList" as const,
    itemListElement: [
      { "@type": "ListItem" as const, position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem" as const, position: 2, name: "Blog", item: BLOG_URL },
    ],
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [blog, itemList, breadcrumb],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(graph)}</script>
    </Helmet>
  );
}

import { Helmet } from "react-helmet-async";

type Crumb = { name: string; item: string };

/**
 * Schema.org BreadcrumbList for richer search results where supported.
 */
export function BreadcrumbListJsonLd({ items }: { items: Crumb[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.item,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

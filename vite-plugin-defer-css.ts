import type { Plugin } from "vite";

/**
 * Makes main stylesheet non-blocking by loading it with media="print" and
 * switching to media="all" on load. Reduces render-blocking CSS impact on LCP.
 * Only transforms built CSS (href starting with /assets/), not external stylesheets.
 */
export function deferCss(): Plugin {
  return {
    name: "defer-css",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        return html.replace(
          /<link rel="stylesheet"([^>]*?)href="(\/assets\/[^"]+\.css)"([^>]*)>/g,
          (match, before, href, after) => {
            const attrs = `${before}href="${href}"${after}`.trim();
            return `<link rel="stylesheet" ${attrs} media="print" onload="this.media='all'">\n    <noscript><link rel="stylesheet" ${attrs}></noscript>`;
          }
        );
      },
    },
  };
}

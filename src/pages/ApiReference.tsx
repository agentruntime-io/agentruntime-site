import { useEffect, useRef } from "react";
import { createApiReference } from "@scalar/api-reference";
import "@scalar/api-reference/style.css";
import { Seo } from "@/components/Seo";

/**
 * Full-page Scalar API Reference viewer.
 * Rendered entirely client-side from /openapi.yaml served in public/.
 * No Scalar account or cloud needed — the renderer is bundled with the app.
 */
const ApiReference = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current || !containerRef.current) return;
    initializedRef.current = true;

    createApiReference(containerRef.current, {
      spec: { url: "/openapi.yaml" },
      theme: "default",
      layout: "modern",
      hideDownloadButton: false,
      searchHotKey: "k",
      /*
       * To hide Scalar's branding/AI elements, uncomment the customCss block below.
       *
       * customCss: `
       *   a[href="https://www.scalar.com"] { display: none !important; }   // Powered by Scalar
       *   button:has(.mcp-nav) { display: none !important; }               // Generate MCP
       *   button[class*="bg-sidebar-b-search"],
       *   .agent-button-container { display: none !important; }            // Ask AI
       * `,
       */
    });
  }, []);

  return (
    <>
      <Seo
        title="API Reference | AgentRuntime"
        description="Full OpenAPI reference for the AgentRuntime API — workflows, runs, human-in-the-loop tasks, MCP tools, and more."
        canonicalPath="/api-reference"
      />
      <div
        ref={containerRef}
        style={{ minHeight: "100vh" }}
        aria-label="API Reference"
      />
    </>
  );
};

export default ApiReference;

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Mirrors the /ingest rewrites in vercel.json so PostHog works the same locally.
const posthogProxy = {
  "/ingest/static": {
    target: "https://eu-assets.i.posthog.com",
    changeOrigin: true,
    rewrite: (p: string) => p.replace(/^\/ingest/, ""),
  },
  "/ingest/array": {
    target: "https://eu-assets.i.posthog.com",
    changeOrigin: true,
    rewrite: (p: string) => p.replace(/^\/ingest/, ""),
  },
  "/ingest": {
    target: "https://eu.i.posthog.com",
    changeOrigin: true,
    rewrite: (p: string) => p.replace(/^\/ingest/, ""),
  },
};

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 3080,
    proxy: posthogProxy,
  },
  preview: {
    proxy: posthogProxy,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["@scalar/typebox"],
  },
  optimizeDeps: {
    include: ["@scalar/api-reference", "@scalar/typebox", "@scalar/typebox/value"],
  },
}));

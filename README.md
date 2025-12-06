# AgentRuntime Marketing Site

A lightweight Vite + React project for the public-facing landing page at `agentruntime.io`. This project lives alongside the console (`webapp/`) and BFF (`bff/`), but ships independently.

## Development

```bash
cd agentruntime-site
npm install
npm run dev
```

The dev server runs on http://localhost:5174 by default. Update `vite.config.ts` if you need a different port to avoid conflicts with the main console.

### Environment variables

No environment variables are required—the site now renders using the baked-in content under `src/lib/fallback.ts`.

## Build & Deploy

```bash
npm run build
npm run preview
```

The output in `dist/` is static and can be hosted on any CDN or static host (Netlify, Vercel, S3 + CloudFront, etc.).

## Notes

- The console lives at `console.agentruntime.io`; keep DNS, caching, and deployment pipelines separate from the marketing site.
- Content is currently static. When you introduce a CMS or blog, add adapters in `src/` or consume a headless CMS via API.
- Update hero copy, pricing, and CTA targets as you define GTM motions. Buttons currently route to docs, sales email, and console entry points.


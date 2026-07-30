# AgentRuntime Marketing Site

Public marketing website for [AgentRuntime](https://www.agentruntime.io) — production infrastructure for AI workflows that cross agents, tools, business rules, and people.

## Tech Stack

- Vite
- React
- TypeScript
- shadcn/ui
- Tailwind CSS

## Development

```sh
npm install
npm run dev
```

Primary marketing routes are `/platform`, `/solutions`, `/integrations`,
`/developers`, `/enterprise`, `/company`, and `/contact`. Legacy campaign routes
redirect to the closest current page.

## Build

```sh
npm run build
```

Output is in `dist/`. Production deploys to **Vercel** (`www.agentruntime.io`; apex redirects to `www`). Config: `vercel.json`, install hook `scripts/vercel-install.sh` (Playwright Chromium for prerender).

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_CONTACT_FORM_ENDPOINT` | Optional. Full URL for the contact form (e.g. `https://api.agentruntime.io/v1/contact`). If unset, form shows fallback message. |
| `VITE_BFF_URL` | Optional. Base URL for BFF API (e.g. `https://api.agentruntime.io`). If unset, derived from `VITE_CONTACT_FORM_ENDPOINT`. Used for waitlist, newsletter, and careers endpoints. |

## Scripts

- `npm run dev` — Start dev server
- `npm run build` — Optimize blog images, regenerate sitemap/RSS, Vite build, prerender static HTML
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint
- `npm run optimize:blog-images` — Generate WebP/AVIF variants for `public/blog/` covers
- `npm run generate:sitemap` — Regenerate `public/sitemap.xml` and `public/blog/rss.xml` (runs image optimize first)

## Docs

- [Scroll restoration](./docs/SCROLL_RESTORATION.md) — `/blog` list position save/restore and global route scroll policy

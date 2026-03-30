# AgentRuntime Marketing Site

Public marketing website for [AgentRuntime](https://agentruntime.io) — API-first runtime for orchestrating AI agents at scale.

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

## Build

```sh
npm run build
```

Output is in `dist/`. Deployed to AWS Amplify via the monorepo pipeline.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_CONTACT_FORM_ENDPOINT` | Optional. Full URL for the contact form (e.g. `https://api.agentruntime.io/v1/contact`). If unset, form shows fallback message. |
| `VITE_BFF_URL` | Optional. Base URL for BFF API (e.g. `https://api.agentruntime.io`). If unset, derived from `VITE_CONTACT_FORM_ENDPOINT`. Used for waitlist, newsletter, and careers endpoints. |

## Scripts

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint

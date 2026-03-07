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
| `VITE_CONTACT_FORM_ENDPOINT` | Optional. Formspree/backend URL for the contact form. If unset, form shows fallback message. |

## Scripts

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint

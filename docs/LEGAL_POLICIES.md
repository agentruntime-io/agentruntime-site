# Legal policy pages (agentruntime-site)

Public legal text lives as Markdown under `src/docs/` and is exposed at `/legal/:slug` via `src/legal/policies.ts`.

## Add or update a policy

1. Add or edit `src/docs/Your_Policy_Name.md` (use `#` title and sections like existing policies).
2. Register the slug in `src/legal/policies.ts` (import `?raw`, add entry to `policyMap`).
3. Add the URL to `scripts/generate-seo-assets.mjs` static sitemap list.
4. Add a link in `public/llms-full.txt` (and `public/llms.txt` if it should appear in the short index).
5. Run `npm run build` in `agentruntime-site` to regenerate `public/sitemap.xml`.

Routes are already wired: `App.tsx` → `/legal` and `/legal/:policyName` → `LegalPolicy.tsx`.

## Meta app settings

- **Privacy Policy URL:** `https://www.agentruntime.io/legal/privacy-policy`
- **Terms of Service URL:** `https://www.agentruntime.io/legal/terms-and-conditions`
- **User data deletion instructions URL:** `https://www.agentruntime.io/legal/data-deletion-instructions` (platform-wide deletion; includes a Meta/Facebook/WhatsApp section for developer compliance)

Update the Meta Developer app **Basic** settings after deploy.

## WhatsApp / Meta (cross-policy)

When adding or changing WhatsApp-related product behavior, align at least:

| Document | What to cover |
| --- | --- |
| [User Data Deletion Instructions](/legal/data-deletion-instructions) | Disconnect steps, Meta revoke, deletion email |
| [Privacy Policy](/legal/privacy-policy) | §1.6 integrations/messaging, §12 third parties |
| [Terms](/legal/terms-and-conditions) | §8.4 messaging platforms |
| [Acceptable Use](/legal/acceptable-use-policy) | §3(g) messaging platform compliance |
| [DPA](/legal/data-processing-agreement) | §3.5 messaging data, controller roles |
| [Billing](/legal/billing-and-credits-policy) | §7.4 Meta/WhatsApp usage charges |

Have counsel review substantive legal changes before publish.

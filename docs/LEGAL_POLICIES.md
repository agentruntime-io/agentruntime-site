# Legal policy pages (agentruntime-site)

Public legal text lives as Markdown under `src/docs/` and is exposed at `/legal/:slug` via `src/legal/policies.ts`.

## Add or update a policy

1. Add or edit `src/docs/Your_Policy_Name.md` (use `#` title and sections like existing policies).
2. Register the slug in `src/legal/policies.ts` (import `?raw`, add entry to `policyMap`).
3. Add the URL to `scripts/generate-seo-assets.mjs` static sitemap list.
4. Add a link in `public/llms-full.txt` (and `public/llms.txt` if it should appear in the short index).
5. Run `npm run build` in `agentruntime-site` to regenerate `public/sitemap.xml`.

Routes are already wired: `App.tsx` → `/legal` and `/legal/:policyName` → `LegalPolicy.tsx`.

## Prices and limits in policy text (`{{tokens}}`)

Never type a price, credit amount, trial length or limit into a policy. Every such number lives in **`src/config/pricing.ts`**, which the pricing page and the billing FAQ also read. In a policy `.md` file write a token, for example `{{trial.days}}`, `{{topup.max}}` or `{{plans.table}}`; `src/legal/policyTemplate.ts` fills it when the policy loads. An unknown token throws, so a typo fails the build instead of publishing `{{...}}`. To add a token, add one line to `policyTokens()` in `policyTemplate.ts`.

To change a price: edit `src/config/pricing.ts`, run the build, done. The Billing and Credits Policy, the pricing page, the FAQ and the pricing SEO description all follow.

## Unlisted drafts

A policy with `unlisted: true` in `policies.ts` has a page at its URL but is left out of the Legal index, the sidebar, the sitemap and the llms files, and is served with `noindex` (a meta tag in the page, plus an `X-Robots-Tag` header in `vercel.json`, because an unlisted page is not prerendered and crawlers that skip JavaScript would otherwise see the default `index, follow`). The partner program terms (`Partner_Program_Terms_DRAFT.md`, `/legal/partner-program-terms`) are one: the program ships off. To publish it, drop `unlisted`, remove its `vercel.json` header, rename the file, add the URL to `scripts/generate-seo-assets.mjs` and `public/llms-full.txt`, set the Console partner settings `terms_url` and bump `terms_version`.

## Under-review line

While counsel and the owner review them, the Billing and Credits Policy, Terms and Conditions, Privacy Policy and the partner draft carry the line "This policy is under review and may change before launch." under the title block. Remove it when the review is done. What each page assumes is listed in [BILLING_LEGAL_REVIEW_CHECKLIST.md](./BILLING_LEGAL_REVIEW_CHECKLIST.md).

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
| [Billing](/legal/billing-and-credits-policy) | §7.4 Meta/WhatsApp usage charges (keep section 7 numbered as is) |

Have counsel review substantive legal changes before publish.

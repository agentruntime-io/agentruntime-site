# Page Specs — Deterministic Design System Reference

Each page has a spec that defines **hierarchy, content, styling, colors, fonts, sizes** using tokens from [brand-design-system.md](../brand-design-system.md). Use these to compare against the frontend and fix discrepancies.

---

## How to Use

1. **Read the spec** for the page you're working on
2. **Compare** each element against `src/pages/[Page].tsx`
3. **Fix** any mismatches (wrong tokens, missing hierarchy, incorrect spacing)

---

## Page Specs

| Page | Spec | Route | Frontend |
|------|------|-------|----------|
| **Index (Home)** | [Index.md](./Index.md) | `/` | `src/pages/Index.tsx` |
| **Features** | [Features.md](./Features.md) | `/features` | `src/pages/Features.tsx` |
| **Pricing** | [Pricing.md](./Pricing.md) | `/pricing` | `src/pages/Pricing.tsx` |
| **Contact** | [Contact.md](./Contact.md) | `/contact` | `src/pages/Contact.tsx` |
| **About** | [About.md](./About.md) | `/about` | `src/pages/About.tsx` |
| **Documentation** | [Documentation.md](./Documentation.md) | `/docs` | `src/pages/Documentation.tsx` |
| **How It Works** | [HowItWorks.md](./HowItWorks.md) | `/how-it-works` | `src/pages/HowItWorks.tsx` |
| **Use Cases** | [UseCases.md](./UseCases.md) | `/use-cases` | `src/pages/UseCases.tsx` |
| **NotFound** | [NotFound.md](./NotFound.md) | `*` | `src/pages/NotFound.tsx` |
| **Navigation** | [Navigation.md](./Navigation.md) | — | `src/components/Navigation.tsx` |
| **Footer** | [Footer.md](./Footer.md) | — | `src/components/Footer.tsx` |

---

## Footer

Footer is not yet implemented. Per [improve.md](../improve.md), add footer with Product (Features, Pricing, Docs), Company (About, Contact), Legal (Privacy, Terms), Social. When implemented, create Footer.md spec.

---

## Spec Format (Each Page)

Each spec includes:

| Section | Purpose |
|---------|---------|
| **Page Hierarchy** | Level 1 (primary), Level 2 (supporting), Level 3 (detail) |
| **Images** | Asset path, usage, generation prompt |
| **Layout** | Container, grid, spacing (exact Tailwind classes) |
| **Content & Styling** | Element-by-element design tokens |
| **Copy** | Exact text for each element (where applicable) |
| **Dark mode** | `dark:` variants (where applicable) |
| **Typography** | Font, weight, size (px) |
| **Design System Compliance Checklist** | Quick verify table |
| **Verification Checklist** | Compare spec vs implementation |

---

## Image Assets

| Asset | Path | Page | Section |
|-------|------|------|---------|
| hero-background.jpg | `src/assets/hero-background.jpg` | Index | Hero |
| support-background.jpg | `src/assets/support-background.jpg` | Index | Use Cases |
| workflow-background.jpg | `src/assets/workflow-background.jpg` | Index | Human-AI Collaboration |
| cta-background.jpg | `src/assets/cta-background.jpg` | Index | Final CTA |
| features-background.jpg | `src/assets/features-background.jpg` | Features | Hero |
| contact-background.jpg | `src/assets/contact-background.jpg` | Contact | Hero |
| about-background.jpg | `src/assets/about-background.jpg` | About | Hero |
| usecases-background.jpg | `src/assets/usecases-background.jpg` | Use Cases | Hero |

Each image spec includes a generation prompt for creating replacement images that match the brand and preserve the color palette (deep purples, blues, magentas, electric cyan).

---

## Design System Reference

All tokens come from [brand-design-system.md](../brand-design-system.md):

- **Colors:** `background`, `foreground`, `primary`, `muted`, etc.
- **Typography:** Inter, JetBrains Mono; H1 4xl–7xl, H2 3xl–4xl, body base
- **Spacing:** `py-20`, `gap-8`, `mb-16`, etc. Breakpoints: see [brand-design-system.md](../brand-design-system.md) §4.4.
- **Components:** Button variants (hero, glass, outline), Card (card-gradient, hover-lift), Badge
- **Effects:** fade-in-up, glow-text, pulse-glow (dark mode)

---

## Known Discrepancies (from [improve.md](../improve.md))

- **NotFound:** Uses `bg-gray-100`, `text-blue-500` — not design system tokens
- **CTAs:** Many buttons lack `Link`/`href` — see improve.md
- **Documentation:** Section links have `cursor-pointer` but no `href`

---

*Cross-reference: [improve.md](../improve.md) for technical fixes, [business.md](../business.md) for content/credibility.*

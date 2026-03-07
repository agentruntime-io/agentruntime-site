# Footer — Component Spec

**Source:** [brand-design-system.md](../brand-design-system.md)

Deterministic spec for comparison against `src/components/Footer.tsx`.

---

## Hierarchy

| Level | Element | Purpose |
|-------|---------|---------|
| **L1** | Brand logo + tagline | Identity |
| **L2** | Social links | Engagement |
| **L2** | Link columns (Product, Company, Legal) | Navigation |
| **L3** | Copyright, built-with | Meta |

---

## Layout

- Full width, `bg-background`, `border-t border-border`
- Container: `max-w-7xl`, `px-4 sm:px-6 lg:px-8`, `py-12 md:py-16`
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-5`, `gap-8 lg:gap-12`
- Brand column: `lg:col-span-2`
- Bottom bar: `border-t border-border`, `mt-12 pt-8`, flex row on desktop

---

## Brand Column

| Element | Design Token |
|---------|--------------|
| Logo | Same as Navigation: Code `h-8 w-8`, Zap `h-4 w-4`, "AgentRuntime" `text-xl font-bold` |
| Tagline | `text-muted-foreground`, `text-sm`, `leading-relaxed`, `max-w-sm`, `mb-6` |
| Social icons | `w-10 h-10`, `rounded-lg`, `bg-primary/10`, `hover:bg-primary/20` |

### Social Icons (3)
- GitHub, LinkedIn, Twitter
- Icon size: `h-5 w-5`, `text-primary`

---

## Link Columns (3)

### Product
- Features, Pricing, Documentation, How It Works

### Company
- About, Contact, Use Cases

### Legal
- Privacy Policy, Terms of Service

### Column Header
- `font-semibold`, `text-foreground`, `text-sm`, `uppercase`, `tracking-wider`, `mb-4`

### Link Items
- `text-muted-foreground`, `hover:text-primary`, `text-sm`, `transition-colors`
- Spacing: `space-y-3`

---

## Dark Mode

- Section: `dark:space-grid`
- Logo: `dark:glow-text` on text, `dark:pulse-glow` on Zap
- Links: `dark:hover:glow-text`

---

## Bottom Bar

| Element | Design Token |
|---------|--------------|
| Border | `border-t border-border`, `mt-12`, `pt-8` |
| Layout | `flex flex-col md:flex-row`, `justify-between`, `gap-4` |
| Copyright | `text-muted-foreground`, `text-sm` |
| Built-with | `text-muted-foreground`, `text-sm` |

---

## Copy

| Element | Exact Text |
|---------|------------|
| Tagline | API-first runtime for importing, testing, and running AI agents at scale. Empowering developers to orchestrate intelligent workflows with confidence. |
| Copyright | © {year} AgentRuntime. All rights reserved. |
| Built-with | Built with ❤️ for developers |
| Column headers | Product, Company, Legal |

---

## Design System Compliance Checklist

| Token | Expected | Verify |
|-------|----------|--------|
| Container | max-w-7xl | ✓ |
| Padding | px-4 sm:px-6 lg:px-8 | ✓ |
| Section padding | py-12 md:py-16 | ✓ |
| Grid gaps | gap-8 lg:gap-12 | ✓ |
| Link hover | text-primary | ✓ |
| Dark mode | space-grid | ✓ |

---

## Verification Checklist

Compare against `src/components/Footer.tsx`:

- [ ] Layout: max-w-7xl, 5-column grid on lg
- [ ] Brand column: logo + tagline + social icons
- [ ] Product links: Features, Pricing, Docs, How It Works
- [ ] Company links: About, Contact, Use Cases
- [ ] Legal links: Privacy, Terms
- [ ] Social icons: GitHub, LinkedIn, Twitter with correct URLs
- [ ] Bottom bar: copyright, built-with text
- [ ] Dark mode: space-grid, glow-text on hover
- [ ] All links use Link from react-router
- [ ] External links have target="_blank" and rel="noopener noreferrer"

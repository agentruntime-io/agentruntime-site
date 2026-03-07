# Pricing — Page Spec

**Route:** `/pricing`  
**Source:** [brand-design-system.md](../brand-design-system.md)

Deterministic spec for comparison against `src/pages/Pricing.tsx`.

---

## Page Hierarchy

| Level | Element | Purpose |
|-------|---------|---------|
| **L1** | H1 "Simple, Transparent Pricing" | Primary focal point |
| **L1** | Team plan card (popular) | Primary conversion |
| **L2** | Page description | Supporting copy |
| **L2** | Developer, Enterprise cards | Secondary options |
| **L2** | "All plans include" section | Trust |
| **L3** | FAQ items | Detail |

---

## Header Section

### Layout
- `text-center`, `mb-16`
- No hero background — page uses `bg-background` only

### Content & Styling

| Element | Content | Design Token |
|---------|---------|--------------|
| H1 line 1 | "Simple, Transparent" | `text-4xl md:text-5xl`, `font-bold`, `text-foreground`, `mb-6`, `fade-in-up` |
| H1 line 2 | "Pricing" | `text-gradient`, `block` |
| Paragraph | Plan description | `text-xl`, `text-muted-foreground`, `max-w-3xl`, `mx-auto`, `fade-in-up` |

### Copy
| Element | Exact Text |
|---------|------------|
| H1 line 1 | Simple, Transparent |
| H1 line 2 | Pricing |
| Paragraph | Choose the plan that fits your needs. Start free and scale as you grow. All plans include API access, versioning, and 24/7 status alerts. |

---

## Pricing Cards (3)

### Layout
- Grid: `grid-cols-1 md:grid-cols-3`, `gap-8`, `mb-16`
- Container: `max-w-7xl`, `px-4 sm:px-6 lg:px-8`, `py-20`

### Card Spec — Developer (outline CTA)
- Base: `Card`, `card-gradient`, `hover-lift`, `transition-all duration-300`
- No ring, no scale
- Icon: Zap, `w-12 h-12`, `rounded-lg`, `bg-primary/10`
- Title: `text-2xl`, `font-bold`, `text-foreground`
- Price: `text-4xl`, `font-bold`, `text-foreground`; period: `text-muted-foreground`
- Description: `CardDescription`, `text-muted-foreground`
- Features: `space-y-3`, Check `h-4 w-4`, `text-primary`, `text-sm`, `text-foreground`
- CTA: `Button variant="outline" size="lg"`, "Start Free"

### Card Spec — Team (popular, hero CTA)
- Adds: `ring-2 ring-primary`, `scale-105`
- Badge: `absolute -top-3 left-1/2 -translate-x-1/2`, `Badge`, `bg-primary text-primary-foreground`, "Most Popular"
- Icon: Star
- CTA: `Button variant="hero" size="lg"`, "Start Team Trial"

### Card Spec — Enterprise (outline CTA)
- Icon: Crown
- Price: "Custom" (no period)
- CTA: `Button variant="outline" size="lg"`, "Contact Sales"

### Card Structure
- `CardHeader`: `text-center`, icon `mb-4`, title, price block `mb-4`, description
- `CardContent`: `space-y-6`, ul `space-y-3`, CTA `w-full`

---

## All Plans Include

### Layout
- `text-center`, `mb-12`
- Card: `bg-gradient-card`, `p-6`, `rounded-lg`, `max-w-4xl`, `mx-auto`

### Content & Styling

| Element | Design Token |
|---------|--------------|
| H3 | `text-lg`, `font-semibold`, `text-foreground`, `mb-4` |
| Items | `grid-cols-1 md:grid-cols-3`, `gap-4`, `text-sm`, `text-muted-foreground` |
| Each item | Check `h-4 w-4`, `text-primary`, `gap-2` |

### Content
- API access
- Versioning & rollback
- 24/7 status alerts

### Copy (plans)
- **Developer:** Free, "Perfect for individual developers and small projects", "Start Free" — 5 agents, 100 runs/month, Community support, Basic analytics, API access, Versioning, 24/7 status alerts
- **Team:** $49/month, "For growing teams and production workflows", "Most Popular", "Start Team Trial" — 25 agents, 10,000 runs/month, Email support, Advanced analytics, etc.
- **Enterprise:** Custom, "For large organizations with advanced requirements", "Contact Sales" — Unlimited agents, etc.

---

## FAQ Section

### Layout
- `max-w-3xl`, `mx-auto`
- H2: `text-2xl`, `font-bold`, `text-center`, `mb-8`
- Items: `space-y-6`

### FAQ Item Spec
- Container: `bg-gradient-card`, `p-6`, `rounded-lg`
- Question: `font-semibold`, `text-foreground`, `mb-2`
- Answer: `text-muted-foreground`

### Copy (FAQ)
1. Q: "Can I upgrade or downgrade my plan anytime?" A: "Yes, you can change your plan at any time. Changes take effect immediately, and you'll be billed pro-rata for the remainder of your billing cycle."
2. Q: "What happens if I exceed my plan limits?" A: "We'll send you notifications as you approach your limits. You can upgrade your plan or purchase additional capacity to avoid any service interruption."
3. Q: "Do you offer custom enterprise plans?" A: "Yes, we work with enterprise customers to create custom plans that meet their specific requirements, including on-premise deployment and dedicated support."

---

## Design System Compliance Checklist

| Token | Expected | Verify |
|-------|----------|--------|
| Badge (Most Popular) | default variant, primary | ✓ |
| Popular card | ring-2 ring-primary | ✓ |
| Hero CTA | Team plan only | ✓ |
| Outline CTA | Developer, Enterprise | ✓ |
| Card | card-gradient, hover-lift | ✓ |
| Rounded | rounded-lg (cards), rounded-2xl (CTA area) | ✓ |

---

## Verification Checklist

Compare against `src/pages/Pricing.tsx`:

- [ ] Hierarchy: H1 L1, Team plan L1
- [ ] Container: max-w-7xl, px-4 sm:px-6 lg:px-8
- [ ] Badge "Most Popular" on Team plan
- [ ] Plan buttons: Developer "Start Free", Team "Start Team Trial", Enterprise "Contact Sales"
- [ ] Cards use card-gradient, hover-lift
- [ ] Hero CTA on Team only
- [ ] Copy matches exactly
- [ ] All CTAs have Link/href

# AgentRuntime Site — Roadmap & Future Features

Planned work for the marketing site and design system. Priorities are suggestions; adjust based on capacity.

**Design system:** Use [brand-design-system.md](./brand-design-system.md) for current design decisions. The [enterprise-design-system-guide.md](./enterprise-design-system-guide.md) is deferred.

---

## 1. Design System Roadmap

### 1.1 Versioning & Changelog

**Goal:** Design system has a version number and changelog so teams know when tokens change.

**Planned:**
- [ ] Add version field to [brand-design-system.md](./brand-design-system.md) (e.g. `v1.0.0`)
- [ ] Create `docs/design-system/CHANGELOG.md` for token/component changes
- [ ] Semantic versioning: MAJOR (breaking), MINOR (additions), PATCH (fixes)
- [ ] Document process: when to bump version, how to announce changes

**Why:** Prevents drift when multiple people touch the system. Enterprise teams expect versioned design systems.

---

### 1.2 Accessibility Standards

**Goal:** WCAG 2.1 AA compliance documented and verified.

**Planned:**
- [ ] Add accessibility section to [brand-design-system.md](./brand-design-system.md)
- [ ] Document contrast ratios for all text/background combinations
- [ ] Add `prefers-reduced-motion` support for animations
- [ ] Document focus ring, skip-nav, ARIA landmark patterns
- [ ] Run automated audit (axe, Lighthouse) and document results

**Why:** Enterprise buyers ask about accessibility. Proactive documentation builds trust.

---

### 1.3 Component States

**Goal:** Loading, empty, error, disabled, skeleton states defined for all interactive components.

**Planned:**
- [ ] Add "Component States" section to design system
- [ ] Define loading state patterns (spinner vs skeleton vs progress)
- [ ] Define empty state templates (illustration + copy + CTA)
- [ ] Define error state patterns (inline vs toast vs banner)
- [ ] Document disabled state styling
- [ ] Apply to: buttons, forms, cards, tables, lists

**Why:** Real products need these. Marketing site has few, but product UI will.

---

### 1.4 Data Visualization Palette

**Goal:** Status colors, chart palettes, severity levels for dashboards and analytics.

**Planned:**
- [ ] Add semantic color tokens: success, warning, error, info
- [ ] Define chart color palette (sequential, categorical)
- [ ] Define severity levels (critical, high, medium, low)
- [ ] Document usage in [brand-design-system.md](./brand-design-system.md)

**Why:** AgentRuntime has analytics, monitoring, dashboards. Product needs this.

---

### 1.5 Layout & Grid System

**Goal:** Documented grid, breakpoints, responsive patterns.

**Planned:**
- [ ] Document breakpoint strategy (sm, md, lg, xl, 2xl)
- [ ] Add grid system (columns, gutters, max-widths)
- [ ] Document responsive patterns (stack, hide, show, reorder)
- [ ] Add layout examples (dashboard, form, list, detail)

**Why:** Consistency across pages. Onboarding new contributors.

---

### 1.6 Content Patterns

**Goal:** Empty state templates, error message formats, form validation copy.

**Planned:**
- [ ] Empty state: illustration + headline + description + CTA
- [ ] Error messages: what went wrong + what to do next
- [ ] Form validation: inline vs submit-time, tone (helpful, not blaming)
- [ ] Loading copy: "Loading…" vs "Fetching data…" vs progress %

**Why:** Copy consistency. Reduces cognitive load.

---

### 1.7 Iconography Standards

**Goal:** Beyond "use Lucide" — sizing rules, icon + text pairing, custom icons.

**Planned:**
- [ ] Document icon sizes by context (nav, button, card, hero)
- [ ] Icon + text spacing and alignment
- [ ] When to use outline vs filled
- [ ] Custom icon creation guidelines (if needed)
- [ ] Accessibility: decorative vs meaningful, aria-labels

**Why:** Prevents icon inconsistency as the product grows.

---

### 1.8 Usage Examples

**Goal:** Visual do/don't examples, real-world component compositions.

**Planned:**
- [ ] Expand Quick Reference with 10–15 common patterns
- [ ] Add do/don't examples (e.g. CTA hierarchy, form layout)
- [ ] Document component compositions (hero + CTA, card grid, form + sidebar)
- [ ] Consider Storybook or similar for live examples

**Why:** Design systems are only useful if people can find and apply patterns.

---

## 2. Site Roadmap (Non–Design System)

### 2.1 Technical (from [improve.md](./improve.md))

- [ ] Wire all CTAs (P0)
- [ ] Simplify nav (P1)
- [ ] Add footer (P1)
- [ ] Fix Documentation links (P1)
- [ ] Fix Tailwind animation key (P2)
- [ ] Responsive audit (P2)

### 2.2 Business (from [business.md](./business.md))

- [ ] Fix OG/Twitter meta tags (P0)
- [ ] Remove or replace fabricated testimonials (P0)
- [ ] Replace placeholder contact/team content (P1)
- [ ] Define photography direction (P2)
- [ ] Document brand voice (P2)

### 2.3 Page-Specific (from [pages/](./pages/README.md))

- [ ] Index: enforce single primary CTA
- [ ] Pricing: wire plan buttons
- [ ] Contact: inline validation, remove duplicate copy
- [ ] Documentation: real doc URLs or "Coming soon"

---

## 3. Suggested Phasing

| Phase | Focus | Outcomes |
|-------|-------|----------|
| **Phase 1** | Launch readiness | CTAs wired, meta fixed, footer added, placeholders addressed |
| **Phase 2** | Design system maturity | Versioning, accessibility, component states |
| **Phase 3** | Product alignment | Data viz palette, layout system, content patterns |
| **Phase 4** | Scale | Iconography, usage examples, Storybook |

---

*Update this doc as items are completed or reprioritized.*

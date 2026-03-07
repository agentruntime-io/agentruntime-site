# AgentRuntime Site — Technical Improvements

Technical and global UI/UX fixes. Page-specific items are in [pages/](./pages/README.md); business/content items are in [business.md](./business.md).

---

## 1. Critical: Broken CTAs

**What's wrong:** Many CTAs do not navigate. Buttons are styled but not wired to routes or URLs.

**Affected areas:** Nav, Pricing, Contact, Features, Documentation, HowItWorks, UseCases, About.

**Fix:** Add `Link`/`href` to all CTAs. See [pages/README.md](./pages/README.md) for per-page destinations.

**Priority:** **P0** — Blocks conversion.

---

## 2. Navigation Overload

**What's wrong:** 8 nav items + 2 buttons. Exceeds 7-item guideline; mixes nav with CTAs.

**Current:** Home, Features, How It Works, Pricing, Use Cases, Documentation, About, Contact | Docs (button) | Get Started Free (button)

**Recommendation:**
- Reduce to 5–6 items, or group under dropdowns (Product, Company)
- Remove "Docs" button redundancy (nav already has Documentation)
- Keep "Get Started Free" as single primary CTA; wire to `/pricing`

**Priority:** **P1**

---

## 3. Footer (Implemented ✓)

**Status:** Footer component created with Product, Company, Legal columns and Social links.

**Spec:** See [pages/Footer.md](./pages/Footer.md) for full specification.

---

## 4. Tailwind Config: Animation Key Overwrite

**What's wrong:** `tailwind.config.ts` has duplicate `animation` key in `extend`. The second block (accordion) overwrites the first (fade-in-up, fade-in-left, fade-in-right).

**Fix:** Merge into one `animation` object:

```ts
animation: {
  'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
  'fade-in-left': 'fadeInLeft 0.8s ease-out forwards',
  'fade-in-right': 'fadeInRight 0.8s ease-out forwards',
  'accordion-down': 'accordion-down 0.2s ease-out',
  'accordion-up': 'accordion-up 0.2s ease-out'
}
```

**Note:** Fade animations still work via `index.css` keyframes + `fade-in-up` class; Tailwind `animate-fade-in-up` would not. Fix for consistency.

**Priority:** **P2**

---

## 5. Documentation Page: Non-Functional Links

**What's wrong:** Doc section links look clickable but have no `href`. Misleading affordance.

**Fix:** Add real doc URLs or use disabled/"Coming soon" styling. See [pages/README.md](./pages/README.md#documentation).

**Priority:** **P1**

---

## 6. Responsive / Mobile

**What's wrong:** Breakpoints used but not verified.

**Recommendation:**
- Test at 320px, 375px, 768px, 1024px
- Touch targets ≥ 44×44px
- Hero text overflow on small screens
- Mobile nav closes on route change (already implemented)

**Priority:** **P2**

---

## 7. Fix Order

| Priority | Item |
|----------|------|
| **P0** | Wire all CTAs |
| **P1** | Simplify nav |
| **P1** | Add footer |
| **P1** | Fix Documentation links |
| **P2** | Fix Tailwind animation key |
| **P2** | Responsive audit |

---

## 8. Quick Wins

1. Nav "Get Started Free" → `asChild` + `Link to="/pricing"`
2. Pricing buttons → `Link` to signup or `/contact?source=enterprise`
3. Contact bottom CTAs → `Link` to `/pricing`, `/contact`
4. Footer → 2–3 column layout

---

*See [pages/](./pages/README.md) for page-specific items, [business.md](./business.md) for content and credibility, [roadmap.md](./roadmap.md) for future features.*

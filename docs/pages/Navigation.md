# Navigation Spec

Spec for `src/components/Navigation.tsx`. Shared across all pages.

---

## Hierarchy

| Level | Element | Purpose |
|-------|---------|---------|
| L1 | Logo (Code + Zap + "AgentRuntime") | Brand identity |
| L2 | Nav links (7 items) | Primary navigation |
| L2 | Docs button, Get Started Free button | CTAs |

---

## Layout

| Property | Value | Notes |
|----------|-------|-------|
| Position | `sticky top-0 z-50` | Sticky header |
| Container | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` | Standard container |
| Height | `h-16` | Header bar |
| Background | `bg-background/95 backdrop-blur-sm border-b border-border` | Glass effect |

---

## Desktop (md and up)

| Element | Classes | Notes |
|---------|---------|-------|
| Nav wrapper | `hidden md:flex items-center space-x-8` | Horizontal nav |
| Nav links | `text-sm font-medium transition-colors duration-200 hover:text-primary` | 7 items |
| Button group | `flex items-center space-x-3` | Docs + Get Started Free |
| Docs button | `variant="outline" size="sm"` | Links to `/docs` |
| Get Started Free | `variant="hero" size="sm"` | Primary CTA |

---

## Mobile (below md)

| Element | Classes | Notes |
|---------|---------|-------|
| Toggle | `md:hidden` | Hamburger/Menu icon |
| Menu button | `variant="ghost" size="icon"` | Menu/X toggle |
| Dropdown | `md:hidden` | Full-width stacked nav |
| Dropdown content | `px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border` | Stacked links |

---

## Nav Items (7)

| Path | Label |
|------|-------|
| `/features` | Features |
| `/how-it-works` | How It Works |
| `/pricing` | Pricing |
| `/use-cases` | Use Cases |
| `/docs` | Documentation |
| `/about` | About |
| `/contact` | Contact |

---

## Dark Mode Variants

| Element | Classes |
|---------|---------|
| Nav bar | `dark:space-grid` |
| Logo icon | `dark:glow-text` |
| Zap accent | `dark:pulse-glow` |
| Logo text | `dark:glow-text` |
| Nav links (hover/active) | `dark:hover:glow-text`, `dark:glow-text` |
| Docs button | `dark:border-primary/50`, `dark:hover:bg-primary/10` |
| Get Started Free | `dark:shadow-glow` |
| Mobile menu button | `dark:hover:bg-primary/10` |
| Mobile dropdown | `dark:space-grid` |
| Mobile links (active) | `dark:glow-text`, `dark:bg-primary/20` |
| Mobile links (hover) | `dark:hover:bg-primary/10`, `dark:hover:glow-text` |

---

## Icon Sizes

| Icon | Size | Usage |
|------|------|-------|
| Code | `h-8 w-8` | Logo |
| Zap | `h-4 w-4` | Logo accent |
| Menu / X | `h-6 w-6` | Mobile toggle |

---

## Verification Checklist

Compare against `src/components/Navigation.tsx`:

- [ ] Hierarchy: Logo L1, nav links L2, CTAs L2
- [ ] Layout: sticky top-0 z-50, h-16, max-w-7xl
- [ ] Desktop: hidden md:flex, space-x-8 nav, space-x-3 buttons
- [ ] Mobile: hamburger md:hidden dropdown
- [ ] All 7 nav items present with correct paths
- [ ] Docs button links to /docs
- [ ] Get Started Free uses hero variant
- [ ] Icon sizes: Code h-8 w-8, Zap h-4 w-4, Menu/X h-6 w-6
- [ ] Dark mode: space-grid, glow-text, pulse-glow, border-primary/50, hover:bg-primary/10

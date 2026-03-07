# AgentRuntime — Brand Identity & Design System

A single source of truth for brand identity, visual language, and design tokens used across the AgentRuntime marketing site.

---

## 1. Brand Identity

### 1.1 Brand Name & Tagline

| Element | Value |
|---------|-------|
| **Brand Name** | AgentRuntime |
| **Tagline** | Orchestrate AI Agents at Scale |
| **Positioning** | API-first runtime for importing, testing, and running your agents and tools—no frontend needed. Build production-ready agent workflows with confidence. |

### 1.2 Brand Personality

- **Professional** — Technical, trustworthy, enterprise-ready
- **Developer-first** — Built for engineers who demand reliability and control
- **Modern** — Clean, contemporary, forward-looking
- **Confident** — Bold without being overwhelming
- **Harmonious** — Human-AI collaboration, not replacement. Friendly, engaging, balanced.

### 1.3 Core Brand Concept: Human-AI Harmony

AgentRuntime's brand embodies the duality of human-AI coexistence:

**Light Mode (Default) — "The Professional Workplace"**
- Clean, airy, sky-inspired blues
- Represents daytime productivity, enterprise trust, human workspace
- Default for business hours, professional contexts

**Dark Mode — "The Agent Dimension" (Easter Egg)**
- Cosmic, electric cyan and purple
- Represents the AI agent's world — energetic, futuristic, harmonious
- Activated by user choice, revealing the "friendly, engaging side"
- Visual metaphor: humans and AI coexisting in harmony

**Why this matters:**
The theme switch isn't just aesthetics — it's a brand statement. Light mode says "we're a serious tool for serious work." Dark mode says "but we're also friendly, approachable, and built for human-AI collaboration." The purple accent (`269 100% 70%`) only appears in dark mode because it represents the "agent energy" that emerges when you invite AI into your workflow.

### 1.4 Logo & Mark

**Current implementation:**
- **Wordmark:** "AgentRuntime" in bold, primary color
- **Icon:** Code bracket (`< />`) + Zap bolt overlay — represents code + speed/energy
- **Icon sizes:** 24px (mobile), 32px (desktop nav)
- **Usage:** Logo + wordmark together; icon can be used alone in favicons or small contexts

**Dark mode:** Icon and text use `glow-text` and `pulse-glow` for a subtle futuristic effect.

---

## 2. Color System

### 2.1 Light Mode — "The Human Workspace"

The default, professional appearance. Sky-inspired blues evoke clarity, trust, and daytime productivity.

| Token | HSL | Usage |
|-------|-----|-------|
| **Background** | `210 20% 98%` | Page background, sky-inspired |
| **Foreground** | `222 84% 4.9%` | Primary text |
| **Primary** | `213 94% 68%` | CTAs, links, accents, brand blue |
| **Primary Foreground** | `0 0% 100%` | Text on primary |

| Token | HSL | Usage |
|-------|-----|-------|
| **Secondary** | `210 40% 96%` | Secondary surfaces |
| **Muted** | `210 40% 96%` | Subtle backgrounds |
| **Muted Foreground** | `215 16% 47%` | Captions, descriptions |
| **Accent** | `213 94% 68%` | Hover states, highlights |
| **Destructive** | `0 84% 60%` | Errors, destructive actions |
| **Border** | `214 32% 91%` | Borders, dividers |
| **Card** | `0 0% 100%` | Card backgrounds |

**Approximate hex:** Primary ≈ `#3B82F6` (blue), Background ≈ `#F8FAFC` (off-white).

**Brand meaning:** The human workspace — clean, professional, trustworthy.

### 2.2 Dark Mode — "The Agent Dimension" (Easter Egg)

Activated by user choice. The AI agent's world — energetic, futuristic, harmonious.

**Brand meaning:** Reveals the "friendly, engaging side" of AI agents. The purple accent (`269 100% 70%`) represents agent energy — it only appears in dark mode because it symbolizes the AI presence that emerges when humans invite agents into their workflow.

| Token | HSL | Usage |
|-------|-----|-------|
| **Background** | `222 47% 4%` | Deep space — the agent's native environment |
| **Foreground** | `210 40% 98%` | Primary text |
| **Primary** | `193 100% 60%` | Electric cyan — agent energy, communication |
| **Primary Foreground** | `222 47% 4%` | Text on primary |

| Token | HSL | Usage |
|-------|-----|-------|
| **Accent** | `269 100% 70%` | **Purple — the agent signature color** |
| **Secondary** | `217 32% 12%` | Secondary surfaces |
| **Muted** | `217 32% 12%` | Subtle backgrounds |
| **Muted Foreground** | `215 20% 65%` | Captions |
| **Card** | `224 47% 6%` | Card backgrounds |

**Approximate hex:** Primary ≈ `#22D3EE` (cyan), Accent ≈ `#A78BFA` (purple).

**Note:** The purple accent is intentionally exclusive to dark mode. It represents the AI agent's presence and only appears when users "enter the agent dimension" by switching themes.

### 2.3 Theme Duality Guidelines

**When to use each theme:**

| Context | Recommended Theme |
|---------|-------------------|
| Default user experience | Light mode |
| Enterprise/professional contexts | Light mode |
| Documentation, API reference | Light mode |
| Marketing to developers | Light mode (primary) |
| Nighttime usage, personal preference | Dark mode |
| "Delight" moments, easter eggs | Dark mode |
| Showcasing AI/human harmony concept | Either — demonstrate the switch |

**Theming as brand storytelling:**
- Don't apologize for the theme difference — celebrate it
- Light mode = human workspace, dark mode = agent dimension
- The toggle is a brand moment: "See how agents work alongside you"
- Use glow effects (`glow-text`, `pulse-glow`, `shadow-beam`) in dark mode to reinforce the "agent energy" concept

### 2.4 Gradients

| Name | Light Mode | Dark Mode |
|------|------------|-----------|
| **gradient-sky** | Blue → teal → light gray | Cyan → purple → dark |
| **gradient-hero** | Primary tint → background | Primary tint → dark bg |
| **gradient-card** | White → light gray | Dark card → darker |

**Usage:** Headlines (`.text-gradient`), hero backgrounds, card backgrounds. Use `bg-gradient-card` for CTA cards and gradient surfaces (Tailwind maps to `var(--gradient-card)`).

### 2.4 Shadows

| Token | Usage |
|-------|-------|
| **shadow-card** | Soft card elevation |
| **shadow-elegant** | Hover elevation |
| **shadow-glow** | Dark mode glow (primary) |
| **shadow-beam** | Dark mode hover glow (accent) |

---

## 3. Typography

### 3.1 Font Families

| Font | Weights | Usage |
|------|---------|-------|
| **Inter** | 300, 400, 500, 600, 700 | Body, headings, UI |
| **JetBrains Mono** | 400, 500 | Code, badges, technical content |

**Fallbacks:** `system-ui`, `sans-serif`; `Consolas`, `monospace`.

### 3.2 Type Scale

| Element | Size | Weight | Usage |
|---------|------|--------|-------|
| **H1 (Hero)** | 4xl–7xl (36–72px) | Bold | Page titles |
| **H2 (Section)** | 3xl–4xl (30–36px) | Bold | Section headings |
| **H3 (Card)** | xl–2xl (20–24px) | Bold/Semibold | Card titles |
| **H4** | lg | Semibold | Sub-sections |
| **Body** | base (16px) | Regular | Paragraphs |
| **Small** | sm (14px) | Regular | Captions, descriptions |
| **Caption** | xs (12px) | Semibold | Badges, labels |

### 3.3 Line Heights

- **Headings:** `leading-none` or `tracking-tight`
- **Body:** `leading-relaxed`
- **Descriptions:** `leading-relaxed`

---

## 4. Spacing & Layout

### 4.1 Container

| Breakpoint | Max Width | Padding |
|------------|-----------|---------|
| Default | `max-w-7xl` (1280px) | `px-4 sm:px-6 lg:px-8` |
| 2xl | 1400px | `2rem` |

### 4.2 Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `space-y-1` | 4px | Tight inline |
| `space-y-2` | 8px | Small gaps |
| `space-y-4` | 16px | Form fields, list items |
| `space-y-6` | 24px | Card content |
| `space-y-8` | 32px | Section elements |
| `gap-4` | 16px | Button groups |
| `gap-8` | 32px | Card grids |
| `py-20` | 80px | Section padding |
| `mb-16` | 64px | Section margins |

### 4.3 Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius` | 0.75rem (12px) | Base radius |
| `rounded-md` | 4px less | Buttons, inputs |
| `rounded-lg` | 12px | Cards, modals |
| `rounded-2xl` | 16px | CTA cards |
| `rounded-3xl` | 24px | Hero CTA |

### 4.4 Breakpoints (Tailwind default + override)

| Name | Width | Usage |
|------|-------|-------|
| sm | 640px | Mobile landscape |
| md | 768px | Tablet |
| lg | 1024px | Desktop |
| xl | 1280px | Wide desktop |
| 2xl | 1400px | Ultra-wide (overridden in tailwind.config) |

---

## 5. Components

### 5.1 Buttons

| Variant | Usage |
|---------|-------|
| **hero** | Primary CTA (signup, trial, main actions) |
| **glass** | Secondary CTA on dark/hero backgrounds |
| **outline** | Secondary actions, tertiary CTAs |
| **default** | General purpose |
| **destructive** | Delete, remove |
| **ghost** | Low-emphasis actions |
| **link** | Inline links styled as buttons |

**Sizes:** `sm` (36px), `default` (40px), `lg` (48px), `xl` (56px), `icon` (40×40px).

**States:** Hover lift (`-translate-y-1`), shadow increase, glow in dark mode.

### 5.2 Cards

- **Base:** `rounded-lg`, `border`, `shadow-sm`
- **Enhanced:** `card-gradient` for hero cards, `hover-lift` for interactivity
- **Structure:** `CardHeader` (p-6) → `CardContent` (p-6 pt-0) → `CardFooter` (optional)

### 5.3 Badges

| Variant | Usage |
|---------|-------|
| **default** | Primary badge (e.g. "Most Popular") |
| **outline** | Secondary labels (e.g. "API-First" tag) |
| **secondary** | Muted emphasis |

**Size:** `text-xs`, `px-2.5`, `py-0.5`, `rounded-full`.

### 5.4 Form Inputs

- **Height:** 40px
- **Border:** `border-input`, `focus-visible:ring-2 focus-visible:ring-ring`
- **Radius:** `rounded-md`

---

## 6. Effects & Animations

### 6.1 Transitions

| Token | Value | Usage |
|-------|-------|-------|
| `--transition-smooth` | 0.3s cubic-bezier(0.4, 0, 0.2, 1) | Hover, state changes |
| `--transition-bounce` | 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) | Playful feedback |

### 6.2 Animations

| Class | Duration | Behavior |
|-------|----------|----------|
| `fade-in-up` | 0.6s | Fade in + translate up 30px |
| `fade-in-left` | 0.8s | Fade in + translate from left |
| `fade-in-right` | 0.8s | Fade in + translate from right |
| `hover-lift` | 0.3s | Translate up 4px on hover |
| `pulse-glow` | 2s loop | Glow pulse (dark mode) |
| `float-particle` | 6s loop | Float up/down (decorative) |
| `beam` | 3s loop | Light sweep (dark mode) |

**Stagger:** Use `animationDelay: ${index * 100}ms` for card grids, `${index * 200}ms` for larger blocks. Omit on Contact page.

### 6.3 Dark Mode Effects

| Class | Effect |
|-------|--------|
| `glow-text` | Text shadow glow (primary) |
| `light-beam` | Animated sweep overlay |
| `space-grid` | Grid background (50×50px) |
| `dark:border-primary/20` | Subtle primary border |

---

## 7. Iconography

| Library | Usage |
|---------|-------|
| **Lucide React** | All UI icons |

**Sizes:** 16px (sm), 20px (default), 24px (lg), 32px (hero).

**Common icons:** `Code`, `Zap`, `ArrowRight`, `CheckCircle`, `Play`, `Settings`, `Mail`, `ExternalLink`, `Menu`, `X`.

---

## 8. Usage Guidelines

### 8.1 Do

- Use **primary** for one main CTA per section
- Use **secondary** or **outline** for secondary actions
- Apply `card-gradient` and `hover-lift` for feature/use-case cards
- Use `text-gradient` for headline emphasis (e.g. second word of H1)
- Keep dark mode effects subtle; avoid motion overload
- **Celebrate the theme duality** — light is professional, dark is the "agent dimension"
- Use glow effects in dark mode to reinforce the human-AI harmony concept

### 8.2 Don't

- Use more than one **hero** variant CTA per viewport
- Mix light and dark gradients inconsistently
- Use `destructive` for non-destructive actions
- Override design tokens without documenting
- Try to "normalize" dark mode to match light mode — the contrast is intentional and part of the brand

### 8.3 Accessibility

- Ensure sufficient contrast (text on background, buttons)
- Maintain focus ring visibility (`focus-visible:ring-2`)
- Keep touch targets ≥ 44×44px on mobile
- Use semantic HTML for headings and structure

---

## 9. File References

| Token Source | Path |
|--------------|------|
| CSS variables | `src/index.css` |
| Tailwind config | `tailwind.config.ts` |
| Components | `src/components/ui/` |
| shadcn/ui base | `components.json` (base: slate) |

---

## 10. Quick Reference

```css
/* Primary CTA */
<Button variant="hero" size="lg">Get Started Free</Button>

/* Secondary on dark background */
<Button variant="glass" size="lg">See Docs</Button>

/* Gradient headline */
<h1>Orchestrate AI Agents <span className="text-gradient">at Scale</span></h1>

/* Card with hover */
<Card className="card-gradient hover-lift transition-all duration-300">

/* Badge */
<Badge variant="outline">API-First Agent Orchestration</Badge>
```

---

## 11. Known Gaps & Future Enhancements

These items are not yet defined. See [roadmap.md](./roadmap.md) for planned work.

| Gap | Why It Matters |
|-----|----------------|
| **Accessibility standards** | No WCAG compliance notes, contrast ratios, or reduced-motion support. Enterprise buyers ask about this. |
| **Component states** | No loading, empty, error, disabled, skeleton states. Real products need these. |
| **Data visualization palette** | Dashboards need status colors (success, warning, error, info), chart palettes, severity levels beyond `primary` and `destructive`. |
| **Layout/grid system** | No documented grid, breakpoint strategy, or responsive patterns beyond "use Tailwind classes". |
| **Content patterns** | No empty state templates, error message formats, form validation copy guidelines. |
| **Iconography standards** | "Use Lucide" is minimal. No custom icon creation, sizing rules, or icon + text pairing. |
| **Usage examples** | Quick reference is minimal. No visual do/don't examples, no real-world component compositions. |
| **Versioning** | No changelog or version number for the design system. Teams need to know when tokens change. |

**Technical:** Tailwind config duplicate `animation` key — see [improve.md](./improve.md#4-tailwind-config-animation-key-overwrite).

---

## Related Docs

| Concern | Document |
|---------|----------|
| Technical fixes (CTAs, nav, footer) | [improve.md](./improve.md) |
| Page-specific recommendations | [pages/README.md](./pages/README.md) |
| Business, content, credibility | [business.md](./business.md) |
| Future features | [roadmap.md](./roadmap.md) |

---

*Document version: 1.0 — Extracted from agentruntime-site codebase*

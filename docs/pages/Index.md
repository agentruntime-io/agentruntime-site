# Index (Home) — Page Spec

**Route:** `/`  
**Source:** [brand-design-system.md](../brand-design-system.md)

Deterministic spec for comparison against `src/pages/Index.tsx`.

---

## Page Hierarchy

| Level | Element | Purpose |
|-------|---------|---------|
| **L1** | H1 "Orchestrate AI Agents at Scale" | Primary focal point |
| **L1** | Button "Get Started Free" (hero) | Primary CTA |
| **L2** | Badge "API-First Agent Orchestration" | Context |
| **L2** | Paragraph (positioning) | Supporting copy |
| **L2** | Button "See Docs" (glass) | Secondary CTA |
| **L2** | Section H2s | Section headings |
| **L3** | Feature cards, use case cards, testimonials | Supporting content |
| **L3** | Mid-page CTAs | Tertiary actions |

---

## Images

### hero-background.jpg

| Property | Value |
|----------|-------|
| **Path** | `src/assets/hero-background.jpg` |
| **Usage** | Hero section, full viewport, `backgroundSize: cover`, `backgroundPosition: center` |
| **Overlay** | `bg-black/60` (light), `bg-black/80` (dark) |

**Generation prompt:** A futuristic, serene landscape under a gradient cosmic sky transitioning from vibrant magenta on the left to deep indigo-blue on the right, filled with scattered glowing pink and purple stars. Large amorphous dark blue-purple clouds with magenta undertones along the horizon. Three sleek, stylized humanoid robots (white with dark grey joints) of varying sizes, with glowing white circular eyes and purple/pink cores. Four diverse humans in smart-casual attire, smaller in scale, each holding a glowing tablet. One or two robots extend their hands holding a small glowing orb, sharing with humans. Mood: wonder, collaboration, human-AI harmony. Color palette: deep purples, blues, magentas, electric cyan accents. Digital art, ultra-realistic, wide shot, cinematic lighting, highly detailed.

---

### support-background.jpg

| Property | Value |
|----------|-------|
| **Path** | `src/assets/support-background.jpg` |
| **Usage** | Use Cases section, `backgroundSize: cover`, `backgroundPosition: center` |
| **Overlay** | `bg-black/70` (light), `bg-black/80` (dark) |

**Generation prompt:** A futuristic high-tech collaboration scene with two diverse individuals (one male, one female) working alongside two sleek humanoid AI robots at a dark polished table with glowing laptops. Robots have smooth white plating, intricate dark metallic components, and distinct glowing eyes (one orange/amber, one electric blue). Background: dynamic blurred digital landscape with neon purples, deep blues, subtle magenta highlights, vertical light streaks evoking data flow. Lighting: soft ambient from background glow and laptop screens. Color palette: deep purples, blues, magentas, electric cyan. Professional sci-fi aesthetic, high detail, ethereal.

---

### workflow-background.jpg

| Property | Value |
|----------|-------|
| **Path** | `src/assets/workflow-background.jpg` |
| **Usage** | Human-AI Collaboration section, `backgroundSize: cover`, `backgroundPosition: center` |
| **Overlay** | `bg-black/70` |

**Generation prompt:** Two highly advanced sleek humanoid robots with matte white plating and bright electric blue glowing accents on faces, chests, and joints. Standing in profile facing each other collaboratively. One robot holds a translucent glowing holographic tablet displaying complex data architecture or system flowchart in vibrant electric blue. The other points to the display with glowing blue fingertips. Background: deep swirling cosmic nebula rich with deep purples, fuchsia, indigo, subtle lighter blue and pink nebulae. Clean lines, intricate internal mechanisms at joints, strong luminous blue elements. Color palette: electric blue, deep purples, fuchsia, indigo. Futuristic, collaborative, high-tech. Digital art, cinematic lighting.

---

### cta-background.jpg

| Property | Value |
|----------|-------|
| **Path** | `src/assets/cta-background.jpg` |
| **Usage** | Final CTA section, behind inner card, `backgroundSize: cover`, `backgroundPosition: center` |
| **Overlay** | `bg-black/70` |

**Generation prompt:** A group of six sleek futuristic humanoid robots in a dark atmospheric outdoor setting. One central robot stands with arms raised towards a powerful radiant magenta-purple light beam descending from the sky. Five other robots gathered around observing. Robots: smooth white and dark grey/black armor, glowing red eye-slits, subtle cyan-blue light accents on joints and hands. Sky: deep purplish-blue with faint atmospheric effects. Background: sparse dark muted purplish-red foliage. Color palette: deep purples, blues, bright magenta, stark white, contrasting red and cyan glowing elements. Cinematic, high-detail render, sense of wonder and technology.

---

## Section 1: Hero

### Layout
- `min-h-screen`, `flex items-center justify-center`, `text-center`
- Background: `hero-background.jpg`, `cover`, `center`
- Overlay: `bg-black/60` (light), `bg-black/80` (dark)
- Container: `max-w-7xl`, `px-4 sm:px-6 lg:px-8`, `flex flex-col items-center justify-center min-h-screen`

### Content & Styling

| Element | Content | Design Token |
|---------|---------|--------------|
| Badge | "API-First Agent Orchestration" | `Badge variant="outline"`, `bg-white/20`, `text-primary`, `border-white/40`, `backdrop-blur-md`, `px-4 py-1.5` |
| H1 line 1 | "Orchestrate AI Agents" | `text-4xl md:text-6xl lg:text-7xl`, `font-bold`, `text-white`, `fade-in-up`, `dark:glow-text` |
| H1 line 2 | "at Scale" | `text-gradient`, `block` |
| Paragraph | Positioning copy | `text-xl md:text-2xl`, `text-white/90`, `max-w-4xl`, `mx-auto` |
| Button 1 | "Get Started Free" + ArrowRight | `Button variant="hero" size="xl"`, `gap-2`, `dark:shadow-glow` |
| Button 2 | "See Docs" + Code2 | `Button variant="glass" size="xl"`, `gap-2`, `bg-white/20 border-white/40 hover:bg-white/30` (hero override for contrast) |

### Dark mode
- Overlay: `dark:bg-black/80`
- H1: `dark:glow-text`
- Button 1: `dark:shadow-glow`

### Typography
- H1: Inter, 700, 36px→60px→72px (sm→md→lg)
- Body: Inter, 400, 20px→24px
- Badge: Inter, 600, 12px (`text-xs`)

### Spacing
- Badge `mb-6`
- H1 `mb-6`
- Paragraph `mb-8`
- Buttons `gap-4`, `mb-12`

### Icons
- ArrowRight: 20px (`h-5 w-5`)
- Code2: 20px

### Copy
| Element | Exact Text |
|---------|------------|
| Badge | API-First Agent Orchestration |
| H1 line 1 | Orchestrate AI Agents |
| H1 line 2 | at Scale |
| Paragraph | API-first runtime for importing, testing, and running your agents and tools—no frontend needed. Build production-ready agent workflows with confidence. |
| Button 1 | Get Started Free |
| Button 2 | See Docs |

---

## Section 2: Features (3 cards)

### Layout
- `py-20`, `bg-background`, `dark:space-grid`
- Grid: `grid-cols-1 md:grid-cols-3`, `gap-8`
- Container: `max-w-7xl`, `px-4 sm:px-6 lg:px-8`

### Card Spec (each)
- Component: `Card` + `card-gradient`, `hover-lift`, `transition-all duration-300`, `border-0`, `light-beam`, `dark:border-primary/20`
- Icon container: `w-16 h-16`, `rounded-2xl`, `bg-primary/10`, `dark:bg-primary/20`, `dark:shadow-glow`
- Icon: `h-8 w-8`, `text-primary`, `dark:glow-text`
- Title: `CardTitle`, `text-xl`, `font-bold`, `text-foreground`, `dark:glow-text`
- Description: `CardDescription`, `text-muted-foreground`, `text-base`, `leading-relaxed`

### Content
1. Register in Seconds — Code2 — "Import or connect agents via API, Swagger, or uploads. Automatic schema extraction and dependency mapping."
2. Simulate & Compile — Settings — "Validate flows pre-deploy with dependency checks. Comprehensive testing before production deployment."
3. Run & Monitor — Play — "Trigger, pause, parallelize, and trace runs in real time. Complete visibility and control over execution."

### Dark mode
- Section: `dark:space-grid`
- Card: `dark:border-primary/20`
- Icon container: `dark:bg-primary/20`, `dark:shadow-glow`
- Icon: `dark:glow-text`
- Title: `dark:glow-text`

---

## Section 3: Use Cases (dark background)

### Layout
- Background: `support-background.jpg`, overlay `bg-black/70` (dark: `bg-black/80`)
- `py-20`, `grid-cols-1 md:grid-cols-2`, `gap-6`
- CTA: `mt-12`, `text-center`

### Content & Styling

| Element | Design Token |
|---------|--------------|
| H2 | `text-3xl md:text-4xl`, `font-bold`, `text-white`, `dark:glow-text` |
| Paragraph | `text-xl`, `text-white/90`, `max-w-3xl` |
| Cards | `bg-white/10`, `backdrop-blur-sm`, `border-white/20`, `dark:bg-background/20`, `dark:border-primary/30` |
| Card icon | `w-8 h-8`, `rounded-full`, `bg-primary/20`, CheckCircle `h-4 w-4` |
| Card text | `text-white`, `font-medium` |
| CTA | `Button variant="glass" size="lg"`, "Explore All Use Cases" + ArrowRight |

### Copy
| Element | Exact Text |
|---------|------------|
| H2 | Built for Real-World Use Cases |
| Paragraph | From customer support to IoT automation, AgentRuntime powers intelligent workflows across industries. |
| Use case 1 | Customer-support bots that intelligently route and resolve issues |
| Use case 2 | IoT automation that coordinates devices and responds to conditions |
| Use case 3 | Data-processing pipelines that transform and validate information |
| Use case 4 | AI-driven workflows that make decisions and adapt to context |
| CTA | Explore All Use Cases |

### Dark mode
- Overlay: `dark:bg-black/80`
- H2: `dark:glow-text`
- Cards: `dark:bg-background/20`, `dark:border-primary/30`

---

## Section 4: Human-AI Collaboration

### Layout
- Background: `workflow-background.jpg`
- Overlay: `bg-black/80` (light), `bg-black/90` (dark)
- Gradient: `bg-gradient-to-t from-black/60 via-transparent to-transparent` — darkens lower half where cards sit
- `py-20`, `text-center`
- 4 cards: `grid-cols-1 sm:grid-cols-2 md:grid-cols-4`, `gap-6`, `mb-12`

### Content & Styling

| Element | Design Token |
|---------|--------------|
| H2 line 1 | "Human-AI", `text-3xl md:text-4xl`, `font-bold`, `text-white` |
| H2 line 2 | "Collaboration", `text-gradient`, `block` |
| H2 spacing | `mb-6` |
| Paragraph spacing | `mb-0` (heading block has `mb-12`) |
| Cards grid | `grid-cols-1 sm:grid-cols-2 md:grid-cols-4`, `gap-6`, `mb-12` |
| Card | `bg-white/20`, `backdrop-blur-sm`, `rounded-xl`, `p-6`, `border-white/30`, `text-left` |
| Card icon container | `w-10 h-10`, `rounded-lg`, `bg-primary/20`, `mb-4` |
| Card icon | CheckCircle `h-5 w-5`, `text-primary` |
| Card title | `font-semibold`, `text-white`, `mb-2` |
| Card description | `text-sm`, `text-white/70`, `leading-relaxed` |
| CTA | `Button variant="glass" size="lg"`, "Learn More" + ArrowRight |

### Copy
| Element | Exact Text |
|---------|------------|
| H2 line 1 | Human-AI |
| H2 line 2 | Collaboration |
| Paragraph | Our agents are designed to work alongside humans, not replace them. Every feature is built around the principle that AI should empower people to do more. |
| Card 1 title | Intuitive Interfaces |
| Card 1 description | Agents surface the right information at the right moment, so humans stay in flow. |
| Card 2 title | Transparent Decisions |
| Card 2 description | Every agent action is logged and explainable — no black boxes, full audit trails. |
| Card 3 title | Human Oversight |
| Card 3 description | Pause, review, and approve at any step. Humans stay in control of every critical decision. |
| Card 4 title | Adaptive Learning |
| Card 4 description | Agents improve from feedback loops, getting smarter with every interaction over time. |
| CTA | Learn More |

### Dark mode
- Overlay: `dark:bg-black/90`
- H2: `dark:glow-text`

---

## Section 5: Testimonials

### Layout
- `py-20`, `bg-background`
- Grid: `grid-cols-1 md:grid-cols-2`, `gap-8`
- Section header: `mb-16`, `text-center`

### Content & Styling

| Element | Design Token |
|---------|--------------|
| H2 | `text-3xl md:text-4xl`, `font-bold`, `text-foreground` |
| Subheading | `text-xl`, `text-muted-foreground` |
| Cards | `card-gradient`, `hover-lift`, `border-0` |
| Quote icon | Quote, `h-8 w-8`, `text-primary`, `mb-4` |
| Quote text | `text-lg`, `text-foreground`, `leading-relaxed`, `mb-6` |
| Avatar | `w-12 h-12`, `rounded-full`, `bg-gradient-hero`, Users `h-6 w-6` |
| Author | `font-semibold`, `text-foreground` |
| Role | `text-sm`, `text-muted-foreground` |

### Copy
| Element | Exact Text |
|---------|------------|
| H2 | Trusted by Engineering Teams |
| Subheading | See what leaders are saying about AgentRuntime |
| Testimonial 1 quote | "AgentRuntime transformed how we handle customer support. We've reduced response times by 75% while improving satisfaction scores." |
| Testimonial 1 author | Sarah Chen, Engineering Lead, TechFlow |
| Testimonial 2 quote | "The platform's reliability and monitoring capabilities gave us confidence to deploy AI agents in production. Absolutely game-changing." |
| Testimonial 2 author | Marcus Rodriguez, CTO, DataStream |

---

## Section 6: Final CTA

### Layout
- Background: `cta-background.jpg`, overlay `bg-black/70`
- Inner card: `max-w-4xl`, `rounded-3xl`, `p-8 md:p-12`, `bg-white/10`, `backdrop-blur-sm`, `border-white/20`, `dark:bg-background/20`, `dark:border-primary/30`, `light-beam`

### Content & Styling

| Element | Design Token |
|---------|--------------|
| Icon | Zap, `h-16 w-16`, `text-primary`, `dark:glow-text`, `dark:pulse-glow` |
| H2 | `text-3xl md:text-4xl`, `font-bold`, `text-white`, `dark:glow-text` |
| Paragraph | `text-xl`, `text-white/90`, `max-w-2xl` |
| Button 1 | `variant="hero" size="xl"`, "Start Free Trial" + ArrowRight |
| Button 2 | `variant="glass" size="xl"`, "Contact Sales" + Building |
| Footer text | `text-sm`, `text-white/90` |

### Copy
| Element | Exact Text |
|---------|------------|
| H2 | Start Your Free Trial |
| Paragraph | Join hundreds of companies already using AgentRuntime to orchestrate their AI agents. Get started in minutes with our comprehensive documentation and support. |
| Button 1 | Start Free Trial |
| Button 2 | Contact Sales |
| Footer text | No credit card required • 5 agents included • Community support |

### Dark mode
- Overlay: `dark:bg-black/80`
- Icon: `dark:glow-text`, `dark:pulse-glow`
- H2: `dark:glow-text`
- Inner card: `dark:bg-background/20`, `dark:border-primary/30`
- Button 2: `dark:border-primary/50`, `dark:hover:bg-primary/10`

---

## Design System Compliance Checklist

| Token | Expected | Verify |
|-------|----------|--------|
| Container | max-w-7xl (1280px) | ✓ |
| Padding | px-4 sm:px-6 lg:px-8 | ✓ |
| Section padding | py-20 | ✓ |
| H1 sizes | 4xl→6xl→7xl (hero) | ✓ |
| H2 sizes | 3xl→4xl | ✓ |
| Primary CTA | hero variant | ✓ |
| Secondary on dark | glass variant | ✓ |
| Card | card-gradient, hover-lift | ✓ |
| Font | Inter | ✓ |
| Badge | outline, text-xs | ✓ |

---

## Verification Checklist

Compare against `src/pages/Index.tsx`:

- [ ] Hierarchy: H1 L1, primary CTA L1
- [ ] Container: max-w-7xl, px-4 sm:px-6 lg:px-8
- [ ] H1/H2 sizes match spec
- [ ] Primary CTA uses hero variant
- [ ] Cards use card-gradient, hover-lift where specified
- [ ] Dark mode: glow-text, pulse-glow, space-grid, border-primary variants present
- [ ] Copy matches exactly
- [ ] All CTAs have Link/href

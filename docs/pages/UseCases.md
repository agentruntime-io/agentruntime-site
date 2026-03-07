# Use Cases — Page Spec

**Route:** `/use-cases`  
**Source:** [brand-design-system.md](../brand-design-system.md)

Deterministic spec for comparison against `src/pages/UseCases.tsx`.

---

## Page Hierarchy

| Level | Element | Purpose |
|-------|---------|---------|
| **L1** | H1 "Real-World Use Cases" | Primary focal point |
| **L2** | 4 use case cards | Primary content |
| **L2** | CTA "Start Free Trial" | Primary action |
| **L3** | Industries grid | Supporting |
| **L3** | ROI calculator teaser | Conversion |
| **L3** | Bottom CTA | Secondary |

---

## Images

### usecases-background.jpg

| Property | Value |
|----------|-------|
| **Path** | `src/assets/usecases-background.jpg` |
| **Usage** | Hero section, `backgroundSize: cover`, `backgroundPosition: center` |
| **Overlay** | `bg-background/80 backdrop-blur-sm` + `gradient-to-b from-transparent via-background/50 to-background` |

**Generation prompt:** A professional futuristic high-tech collaborative workspace. Clean minimalist design with dominant deep blue and electric cyan hues, luminous quality. Central focal point: large glowing interactive screen displaying abstract data-driven visualizations or starry cosmic pattern in bright cyan and white. In foreground, silhouetted figure in dark suit reaches out towards the screen. On either side behind clear glass walls: modern office or lab areas with diverse professionals (some business casual, some bright orange shirts for subtle accent) interacting with advanced computer workstations displaying glowing code or data interfaces. Subtle elements of robotics or AI hardware. Highly reflective floors and ceilings with sleek cool-toned strip lighting and visible organized conduits. Color palette: deep navy, electric cyan, bright white, subtle orange accents. Mood: sophisticated, data-driven, ethereal. Human interaction with advanced technology. Aspect ratio suitable for hero background. Digital art, high detail.

---

## Hero Section

### Layout
- `py-32`, background: `usecases-background.jpg`
- Overlay: `bg-background/80 backdrop-blur-sm` + gradient
- Container: `max-w-7xl`, `px-4 sm:px-6 lg:px-8`, `text-center`

### Content & Styling

| Element | Design Token |
|---------|--------------|
| H1 line 1 | "Real-World", `text-4xl md:text-5xl`, `font-bold`, `text-foreground`, `mb-6`, `fade-in-up` |
| H1 line 2 | "Use Cases", `text-gradient`, `block` |
| Paragraph | `text-xl`, `text-muted-foreground`, `max-w-3xl`, `mx-auto`, `fade-in-up` |

### Copy
| Element | Exact Text |
|---------|------------|
| H1 line 1 | Real-World |
| H1 line 2 | Use Cases |
| Paragraph | See how leading organizations use AgentRuntime to orchestrate AI agents across different industries and achieve measurable results. |

---

## Use Cases Grid (4 cards)

### Layout
- `py-20`, `max-w-7xl`, `px-4 sm:px-6 lg:px-8`
- Grid: `grid-cols-1 lg:grid-cols-2`, `gap-8`, `mb-16`

### Card Spec
- `Card`, `card-gradient`, `hover-lift`, `transition-all duration-300`, `h-full`
- Header: icon `w-12 h-12`, `rounded-lg`, `bg-primary/10` + Badge `variant="outline"`, `bg-primary/5`, `text-primary`, `border-primary/20`, "Industry Solution", `mb-4`
- Title: `CardTitle`, `text-2xl`, `font-bold`, `text-foreground`, `mb-2`
- Description: `CardDescription`, `text-base`, `text-muted-foreground`, `leading-relaxed`

### Card Content (CardContent, space-y-6)
- Impact box: `bg-primary/5`, `rounded-lg`, `p-4` — H4 `font-semibold`, `text-foreground`, `mb-2`; P `text-primary`, `font-medium`
- Features: H4 `font-semibold`, `mb-3`; grid `grid-cols-2`, `gap-2` — dot `w-1.5 h-1.5`, `rounded-full`, `bg-primary` + `text-sm`, `text-muted-foreground`
- Case study: `border-t`, `pt-4`, `text-sm`, `text-muted-foreground`, `italic`

### Content (4 use cases)
1. Customer Support Automation — Headphones
2. IoT & Robotics Orchestration — Cpu
3. Data Processing Pipelines — Database
4. AI-Driven Workflows — Brain

### Copy (4 use cases)
1. Customer Support Automation — "Auto-route customer calls and enrich responses with knowledge-base integration. Reduce response times by 75% while maintaining high satisfaction scores." — Impact: "75% faster response times, 90% customer satisfaction" — "TechCorp reduced support costs by 60% while improving CSAT scores"
2. IoT & Robotics Orchestration — "Orchestrate sensor checks and command sequences across distributed IoT devices. Enable complex automation with real-time coordination and failover handling." — Impact: "40% reduction in downtime, 3x faster deployment" — "ManufactureCorp automated 500+ robots with 99.9% uptime"
3. Data Processing Pipelines — "Chain ETL tools and enforce schema validation at each step. Build resilient data pipelines with automatic retry, error handling, and data quality checks." — Impact: "85% fewer pipeline failures, 50% faster processing" — "DataFlow Inc. processes 10TB daily with zero data loss"
4. AI-Driven Workflows — "Combine LLMs and business logic for dynamic decision trees. Create intelligent workflows that adapt to context and make autonomous decisions with human oversight." — Impact: "60% reduction in manual reviews, 4x process speed" — "FinanceAI automated 90% of loan approvals safely"

---

## Industries Section

### Layout
- `text-center`, `mb-16`
- H2: "Trusted Across Industries", `text-3xl`, `font-bold`, `text-foreground`, `mb-8`
- Grid: `grid-cols-2 md:grid-cols-4`, `gap-6`, `max-w-4xl`, `mx-auto`

### Industry Pill Spec
- `bg-gradient-card`, `p-4`, `rounded-lg`, `text-center`
- Text: `text-foreground`, `font-medium`

### Industries
- FinTech, Healthcare, Manufacturing, E-commerce, Logistics, Media, Government, Education

### Copy
- H2: "Trusted Across Industries"

---

## ROI Calculator Teaser

### Layout
- `bg-gradient-card`, `p-8`, `rounded-2xl`, `shadow-lg`, `max-w-4xl`, `mx-auto`, `mb-16`
- Grid: `grid-cols-1 md:grid-cols-2`, `gap-8`, `items-center`

### Left
- H3: "Calculate Your ROI", `text-2xl`, `font-bold`, `text-foreground`, `mb-4`
- Paragraph: `text-muted-foreground`, `mb-6`
- List: `space-y-2`, `text-sm`, `text-muted-foreground`

### Right
- Stat: `text-4xl`, `font-bold`, `text-primary`, `mb-2` — "$250K+"
- Label: `text-muted-foreground`, `mb-4`
- Button: `variant="hero"`, "Calculate Your Savings" + ArrowRight

### Copy (ROI)
- H3: "Calculate Your ROI"
- Paragraph: "See how much time and money you could save by automating your agent workflows with AgentRuntime. Most customers see ROI within 3 months."
- List: Average 65% reduction in operational costs; 40+ hours saved per developer per month; 85% faster time-to-market for new features
- Stat: "$250K+", "Average annual savings"
- Button: "Calculate Your Savings"

---

## Bottom CTA

### Layout
- `text-center`
- Card: `bg-gradient-card`, `p-8`, `rounded-2xl`, `shadow-lg`, `max-w-2xl`, `mx-auto`

### Content & Styling

| Element | Design Token |
|---------|--------------|
| H2 | "Ready to get started?", `text-2xl`, `font-bold`, `text-foreground`, `mb-4` |
| Paragraph | `text-muted-foreground`, `mb-6` |
| Button 1 | `variant="hero" size="lg"`, "Start Free Trial" |
| Button 2 | `variant="outline" size="lg"`, "See Detailed Case Studies" + ArrowRight |

### Copy
| Element | Exact Text |
|---------|------------|
| H2 | Ready to get started? |
| Paragraph | Join hundreds of companies already using AgentRuntime to orchestrate their AI agents. |
| Button 1 | Start Free Trial |
| Button 2 | See Detailed Case Studies |

---

## Design System Compliance Checklist

| Token | Expected | Verify |
|-------|----------|--------|
| Card | card-gradient, hover-lift | ✓ |
| Badge | outline, primary/5 | ✓ |
| Impact box | bg-primary/5 | ✓ |
| CTA | hero + outline | ✓ |

---

## Verification Checklist

Compare against `src/pages/UseCases.tsx`:

- [ ] Hierarchy: H1 L1, use case cards L2
- [ ] Container: max-w-7xl, px-4 sm:px-6 lg:px-8
- [ ] H1 sizes match
- [ ] Primary CTA uses hero variant
- [ ] Cards use card-gradient, hover-lift
- [ ] 4 use case cards, industries grid
- [ ] Copy matches exactly
- [ ] All CTAs have Link/href

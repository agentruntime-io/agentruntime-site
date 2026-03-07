# Features — Page Spec

**Route:** `/features`  
**Source:** [brand-design-system.md](../brand-design-system.md)

Deterministic spec for comparison against `src/pages/Features.tsx`.

---

## Page Hierarchy

| Level | Element | Purpose |
|-------|---------|---------|
| **L1** | H1 "Powerful Features for Agent Orchestration" | Primary focal point |
| **L2** | Paragraph (description) | Supporting copy |
| **L2** | CTA "Explore the Full API" | Primary action |
| **L3** | 10 feature cards | Supporting content |

---

## Images

### features-background.jpg

| Property | Value |
|----------|-------|
| **Path** | `src/assets/features-background.jpg` |
| **Usage** | Hero section, `backgroundSize: cover`, `backgroundPosition: center` |
| **Overlay** | `bg-background/80 backdrop-blur-sm` + `gradient-to-b from-transparent via-background/50 to-background` |

**Generation prompt:** A sophisticated high-tech laboratory environment illuminated primarily by electric blues, vibrant teals, and soft whites. Two sleek modern humanoid robots and two human collaborators (one female with dark hair, one male) engaged in interaction around a central glowing translucent table displaying intricate holographic UI patterns. Large panoramic wall screens in the background showcase complex data visualizations, network graphs, flowing code snippets, and system diagrams, all rendered in luminous teal and blue hues. Color palette: electric blue, vibrant teal, deep purples, subtle magenta. Clean futuristic aesthetic emphasizing collaboration and advanced data processing. Sharp details, shallow depth of field, cinematic lighting. Digital art, high detail.

---

## Hero Section

### Layout
- `py-32`, `overflow-hidden`
- Background: `features-background.jpg`, `cover`, `center`
- Overlay: `bg-background/80 backdrop-blur-sm` + `gradient-to-b from-transparent via-background/50 to-background`
- Container: `max-w-7xl`, `px-4 sm:px-6 lg:px-8`, `text-center`

### Content & Styling

| Element | Content | Design Token |
|---------|---------|--------------|
| H1 line 1 | "Powerful Features for" | `text-4xl md:text-5xl`, `font-bold`, `text-foreground`, `mb-6`, `fade-in-up` |
| H1 line 2 | "Agent Orchestration" | `text-gradient`, `block` |
| Paragraph | Description | `text-xl`, `text-muted-foreground`, `max-w-3xl`, `mx-auto`, `fade-in-up` |

### Copy
| Element | Exact Text |
|---------|------------|
| H1 line 1 | Powerful Features for |
| H1 line 2 | Agent Orchestration |
| Paragraph | Everything you need to register, test, run, and monitor AI agents at scale. Built for developers who demand reliability, performance, and complete control. |

### Typography
- H1: Inter, 700, 36px→48px (md→lg)
- Body: Inter, 400, 20px

---

## Features Grid

### Layout
- `py-20`, `max-w-7xl`, `px-4 sm:px-6 lg:px-8`
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, `gap-8`, `mb-16`

### Card Spec (each of 10)
- Component: `Card`, `card-gradient`, `hover-lift`, `transition-all duration-300`
- Icon container: `w-12 h-12`, `rounded-lg`, `bg-primary/10`
- Icon: `h-6 w-6`, `text-primary`
- Title: `CardTitle`, `text-xl`, `font-semibold`, `text-foreground`
- Description: `CardDescription`, `text-muted-foreground`, `text-base`, `leading-relaxed`

### Card Structure
- `CardHeader`: icon + title, `mb-4` on icon
- `CardContent`: description (default `p-6 pt-0`)

### Content (10 features)
1. Agent Registration — Code2
2. Simulation & Compile — Settings
3. Runtime API — Play
4. Context Management — Database
5. Flow Management — GitBranch
6. Logging & Tracing — Eye
7. Post-Run Analytics — BarChart3
8. Security & Multi-Tenancy — Shield
9. Versioning & Rollback — History
10. Data Handling — FileText

### Copy (10 features)
1. Agent Registration — "Import MCPs via code, API, Swagger or manual form. Extract IDs, schemas, and tooling automatically with intelligent dependency resolution."
2. Simulation & Compile — "Pre-flight dependency analysis, schema linting, and dry-run validation. Catch errors before deployment with comprehensive testing frameworks."
3. Runtime API — "Programmatic triggers, pause/resume, controlled looping, parallel and nested runs. Full control over agent execution with real-time monitoring."
4. Context Management — "Redis-backed context snapshots with run_id/parent_run_id tracking. Real-time updates with persistent state management across runs."
5. Flow Management — "Type-safe JSON handoffs, schema-driven branching, LLM-powered decision fallbacks. Build complex workflows with confidence and reliability."
6. Logging & Tracing — "OpenTelemetry/Jaeger integration, structured logs, run-level and node-level drilldowns. Complete visibility into agent behavior and performance."
7. Post-Run Analytics — "Performance dashboards, pattern mining, cost optimization recommendations. Turn execution data into actionable insights for improvement."
8. Security & Multi-Tenancy — "Per-key OAuth, SLIs/SLOs, circuit breakers, tenant isolation. Enterprise-grade security with comprehensive access controls and monitoring."
9. Versioning & Rollback — "Immutable workflows, side-by-side execution, deterministic replay. Safely manage updates and rollbacks with complete version history."
10. Data Handling — "Pydantic/JSON Schema validation, encrypted transports, large payload references. Secure and efficient data processing at any scale."

---

## CTA Section

### Layout
- `text-center`
- Card: `bg-gradient-card`, `p-8`, `rounded-2xl`, `shadow-lg`, `max-w-2xl`, `mx-auto`

### Content & Styling

| Element | Design Token |
|---------|--------------|
| H2 | `text-2xl`, `font-bold`, `text-foreground`, `mb-4` |
| Paragraph | `text-muted-foreground`, `mb-6` |
| Button | `variant="hero" size="lg"`, "Explore the Full API" + ExternalLink `h-5 w-5` |

### Copy
| Element | Exact Text |
|---------|------------|
| H2 | Ready to explore the full API? |
| Paragraph | Dive into our comprehensive documentation and start building with AgentRuntime today. |
| Button | Explore the Full API |

---

## Design System Compliance Checklist

| Token | Expected | Verify |
|-------|----------|--------|
| Container | max-w-7xl | ✓ |
| H1 | 4xl→5xl | ✓ |
| Card | card-gradient, hover-lift | ✓ |
| Icon container | w-12 h-12, rounded-lg | ✓ |
| CTA | hero variant, lg size | ✓ |
| CTA card | rounded-2xl (design system: CTA cards) | ✓ |

---

## Verification Checklist

Compare against `src/pages/Features.tsx`:

- [ ] Hierarchy: H1 L1, CTA L2
- [ ] Container: max-w-7xl, px-4 sm:px-6 lg:px-8
- [ ] H1 sizes match
- [ ] Primary CTA uses hero variant
- [ ] Cards use card-gradient, hover-lift
- [ ] All 10 feature cards present
- [ ] Copy matches exactly
- [ ] CTA has Link/href

# How It Works — Page Spec

**Route:** `/how-it-works`  
**Source:** [brand-design-system.md](../brand-design-system.md)

Deterministic spec for comparison against `src/pages/HowItWorks.tsx`.

---

## Page Hierarchy

| Level | Element | Purpose |
|-------|---------|---------|
| **L1** | H1 "How AgentRuntime Works" | Primary focal point |
| **L2** | 5 step cards | Process explanation |
| **L2** | CTA "See Live Demo" | Primary action |
| **L3** | API snippet section | Code example |
| **L3** | Step details (bullets) | Supporting |

---

## Header Section

### Layout
- No hero background
- Container: `max-w-7xl`, `px-4 sm:px-6 lg:px-8`, `py-20`
- Header: `text-center`, `mb-16`

### Content & Styling

| Element | Design Token |
|---------|--------------|
| H1 line 1 | "How AgentRuntime", `text-4xl md:text-5xl`, `font-bold`, `text-foreground`, `mb-6`, `fade-in-up` |
| H1 line 2 | "Works", `text-gradient`, `block` |
| Paragraph | `text-xl`, `text-muted-foreground`, `max-w-3xl`, `mx-auto`, `fade-in-up` |

### Copy
| Element | Exact Text |
|---------|------------|
| H1 line 1 | How AgentRuntime |
| H1 line 2 | Works |
| Paragraph | A simple 5-step process to orchestrate your AI agents with confidence. From registration to optimization, we've got you covered. |

---

## Steps Section (5 steps)

### Layout
- `space-y-12`, `mb-20`
- Each step: `flex flex-col lg:flex-row` (alternating `lg:flex-row-reverse` for odd index)
- Gap: `gap-8`, `items-center`

### Step Content (left/right by parity)
- Badge: `variant="outline"`, `text-lg`, `px-4`, `py-2`, `font-mono` — "01", "02", etc.
- Icon container: `w-12 h-12`, `rounded-lg`, `bg-primary/10`
- Icon: `h-6 w-6`, `text-primary`
- Title: `text-2xl`, `font-bold`, `text-foreground`, `mb-4`
- Description: `text-lg`, `text-muted-foreground`, `mb-6`
- Details grid: `grid-cols-2`, `gap-3` — CheckCircle `h-4 w-4`, `text-primary`, `text-sm`, `text-muted-foreground`

### Step Visual (right/left)
- `Card`, `card-gradient`
- Placeholder: `w-full`, `h-48`, `rounded-lg`, `bg-gradient-hero`, icon `h-16 w-16`, `text-primary`, `opacity-50`

### Steps
1. Connect Your Agents — Settings
2. Configure & Validate — CheckCircle
3. Execute & Orchestrate — Play
4. Monitor & Trace — Activity
5. Analyze & Optimize — BarChart3

### Copy (5 steps)
1. Connect Your Agents — "Register via API or UI, fetch tool definitions automatically. Import from multiple sources including Swagger, OpenAPI, or manual configuration." — API endpoint registration, Tool definition extraction, Dependency mapping, Schema validation
2. Configure & Validate — "Fill environment keys, run schema linting, simulate flows. Comprehensive pre-flight checks ensure your agents work correctly before deployment." — Environment setup, Schema linting, Flow simulation, Dependency checks
3. Execute & Orchestrate — "Trigger workflows, parallel runs, loop controls. Advanced orchestration with real-time execution management and dynamic scaling." — Workflow triggers, Parallel execution, Loop controls, Dynamic scaling
4. Monitor & Trace — "Real-time context, logs, Jaeger spans, pause/edit mid-run. Complete visibility into execution with interactive debugging capabilities." — Real-time monitoring, Distributed tracing, Interactive debugging, Mid-run modifications
5. Analyze & Optimize — "View analytics, spot bottlenecks, auto-tune patterns. Data-driven insights help you optimize performance and reduce costs." — Performance analytics, Bottleneck detection, Pattern optimization, Cost analysis

---

## API Snippet Section

### Layout
- `grid-cols-1 lg:grid-cols-2`, `gap-12`, `items-center`, `mb-16`

### Left Column
- H2: "Simple API Integration", `text-3xl`, `font-bold`, `text-foreground`, `mb-6`
- Paragraph: `text-lg`, `text-muted-foreground`, `mb-6`
- List: `space-y-3`, CheckCircle `h-5 w-5`, `text-primary`

### Right Column — Code Block
- `Card`, `card-gradient`, `p-6`
- `pre`, `text-sm`, `overflow-x-auto`
- `code`, `language-python`, `text-muted-foreground`

### Copy (API section)
- H2: "Simple API Integration"
- Paragraph: "Get started with just a few lines of code. Our Python SDK makes it easy to integrate AgentRuntime into your existing workflows."
- List: RESTful API with comprehensive documentation; Python, Go, and JavaScript SDKs available; WebSocket support for real-time updates

---

## CTA Section

### Layout
- `text-center`
- Card: `bg-gradient-card`, `p-8`, `rounded-2xl`, `shadow-lg`, `max-w-2xl`, `mx-auto`

### Content & Styling

| Element | Design Token |
|---------|--------------|
| H2 | "Ready to see it in action?", `text-2xl`, `font-bold`, `text-foreground`, `mb-4` |
| Paragraph | `text-muted-foreground`, `mb-6` |
| Button | `variant="hero" size="lg"`, Play, "See Live Demo" |

### Copy
| Element | Exact Text |
|---------|------------|
| H2 | Ready to see it in action? |
| Paragraph | Try our interactive sandbox and see how easy it is to orchestrate AI agents. |
| Button | See Live Demo |

---

## Design System Compliance Checklist

| Token | Expected | Verify |
|-------|----------|--------|
| Badge | outline, font-mono | ✓ |
| Card | card-gradient | ✓ |
| Step layout | alternating row direction | ✓ |
| CTA | hero variant | ✓ |

---

## Verification Checklist

Compare against `src/pages/HowItWorks.tsx`:

- [ ] Hierarchy: H1 L1, steps L2
- [ ] Container: max-w-7xl, px-4 sm:px-6 lg:px-8
- [ ] H1 sizes match
- [ ] Primary CTA uses hero variant
- [ ] Cards use card-gradient
- [ ] 5 steps with alternating layout
- [ ] Copy matches exactly
- [ ] CTA has Link/href

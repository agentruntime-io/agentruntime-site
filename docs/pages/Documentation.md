# Documentation — Page Spec

**Route:** `/docs`  
**Source:** [brand-design-system.md](../brand-design-system.md)

Deterministic spec for comparison against `src/pages/Documentation.tsx`.

---

## Page Hierarchy

| Level | Element | Purpose |
|-------|---------|---------|
| **L1** | H1 "Comprehensive Documentation" | Primary focal point |
| **L2** | 4 main doc section cards | Primary navigation |
| **L2** | CTA "Contact Support", "Join Community" | Actions |
| **L3** | Quick Access (3 cards) | Secondary nav |
| **L3** | Glossary (5 terms) | Reference |
| **L3** | Popular Tutorials (6 items) | Discovery |

---

## Header Section

### Layout
- No hero background — `py-20` on container
- Container: `max-w-7xl`, `px-4 sm:px-6 lg:px-8`
- Header: `text-center`, `mb-16`

### Content & Styling

| Element | Design Token |
|---------|--------------|
| H1 line 1 | "Comprehensive", `text-4xl md:text-5xl`, `font-bold`, `text-foreground`, `mb-6`, `fade-in-up` |
| H1 line 2 | "Documentation", `text-gradient`, `block` |
| Paragraph | `text-xl`, `text-muted-foreground`, `max-w-3xl`, `mx-auto`, `fade-in-up` |

### Copy
| Element | Exact Text |
|---------|------------|
| H1 line 1 | Comprehensive |
| H1 line 2 | Documentation |
| Paragraph | Everything you need to build, deploy, and scale AI agent workflows. From quickstart guides to advanced integrations. |

---

## Main Documentation Sections (4 cards)

### Layout
- Grid: `grid-cols-1 md:grid-cols-2`, `gap-8`, `mb-16`

### Card Spec
- `Card`, `card-gradient`, `hover-lift`, `transition-all duration-300`
- Header: icon `w-12 h-12`, `rounded-lg`, `bg-primary/10` + Badge `variant="outline"`, `bg-primary/5`, `text-primary`, `border-primary/20`, `mb-4`
- Title: `CardTitle`, `text-xl`, `font-bold`, `text-foreground`
- Description: `CardDescription`, `text-muted-foreground`
- Content: link rows — `space-y-3`, each `flex gap-3`, `p-2`, `rounded`, `hover:bg-muted/50`, `cursor-pointer`, ExternalLink `h-4 w-4`, `text-primary`, `text-sm`, `font-medium`, `text-foreground`

### Sections
1. Getting Started — Zap — Quickstart, Installation, First Agent, Authentication
2. API Reference — Code — REST API, WebSocket API, CLI Reference, Rate Limits
3. SDKs & Samples — Wrench — Python SDK, Go SDK, JavaScript SDK, Code Examples
4. Tutorials — GraduationCap — Build Your First Pipeline, Advanced Flow Branching, Error Handling, Performance Optimization

**Note:** Links must have `href` or be disabled. No `cursor-pointer` without navigation.

### Copy (4 sections)
1. Getting Started — Zap — "Quick setup guide, sample code, and one-minute tutorial to get you running in minutes." — Quickstart Guide, Installation, First Agent, Authentication
2. API Reference — Code — "Complete REST endpoints, WebSocket hooks, and CLI examples with interactive documentation." — REST API, WebSocket API, CLI Reference, Rate Limits
3. SDKs & Samples — Wrench — "Python, Go, and JavaScript code snippets with real-world implementation examples." — Python SDK, Go SDK, JavaScript SDK, Code Examples
4. Tutorials — GraduationCap — "Step-by-step guides for building agent pipelines and advanced workflow configurations." — Build Your First Pipeline, Advanced Flow Branching, Error Handling, Performance Optimization

---

## Quick Access (3 cards)

### Layout
- `mb-16`, H2: `text-2xl`, `font-bold`, `text-center`, `mb-8`
- Grid: `grid-cols-1 md:grid-cols-3`, `gap-6`

### Card Spec
- `Card`, `card-gradient`, `hover-lift`, `cursor-pointer`
- Content: `p-6`, `text-center`
- Icon: `w-12 h-12`, `rounded-lg`, `bg-primary/10`, `mx-auto`, `mb-4`
- Title: `font-semibold`, `text-foreground`, `mb-2`
- Description: `text-sm`, `text-muted-foreground`

### Content
- Changelog (FileText) — "Latest updates and version history"
- Community Forum (MessageCircle) — "Get help from other developers"
- Glossary (Search) — "Key terms and definitions"

---

## Glossary Section

### Layout
- `mb-16`, H2: `text-2xl`, `font-bold`, `text-center`, `mb-8`
- List: `max-w-4xl mx-auto`, `space-y-4`

### Glossary Item Spec
- `Card`, `card-gradient`
- Layout: `flex-col md:flex-row md:items-center`, `gap-4`
- Term: `Badge variant="outline"`, `bg-primary/5`, `text-primary`, `border-primary/20`, `font-mono`, `md:w-1/4`
- Definition: `text-muted-foreground`, `md:w-3/4`

### Terms
- Agent — "An autonomous software component that can perform tasks and make decisions within the AgentRuntime environment."
- MCP (Model Context Protocol) — "A standardized protocol for connecting and communicating with AI models and agents."
- Run ID — "A unique identifier for each execution instance of an agent or workflow."
- Context — "The persistent state and memory that agents maintain across interactions and executions."
- Flow — "A defined sequence of agent interactions and decision points that make up a complete workflow."

### Copy
- H2: "Key Terms & Glossary"

---

## Popular Tutorials (6 cards)

### Layout
- `mb-16`, H2: `text-2xl`, `font-bold`, `text-center`, `mb-8`
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, `gap-6`

### Card Spec
- `Card`, `card-gradient`, `hover-lift`, `cursor-pointer`
- BookOpen `h-5 w-5`, `text-primary` + Badge `variant="outline"`, `text-xs`, "Tutorial"
- Title: `font-semibold`, `text-foreground`, `mb-2`
- Description: `text-sm`, `text-muted-foreground`

### Items
- Build Your First Agent Pipeline, Advanced Flow Branching, Error Handling Best Practices, Performance Optimization, Multi-Tenant Setup, Custom Integrations

### Copy
- Each tutorial card: "Step-by-step guide with code examples"

---

## CTA Section

### Layout
- `text-center`
- Card: `bg-gradient-card`, `p-8`, `rounded-2xl`, `shadow-lg`, `max-w-2xl`, `mx-auto`

### Content & Styling

| Element | Design Token |
|---------|--------------|
| H2 | "Need more help?", `text-2xl`, `font-bold`, `text-foreground`, `mb-4` |
| Paragraph | `text-muted-foreground`, `mb-6` |
| Button 1 | `variant="hero" size="lg"`, MessageCircle, "Contact Support" |
| Button 2 | `variant="outline" size="lg"`, ExternalLink, "Join Community" |

### Copy
| Element | Exact Text |
|---------|------------|
| H2 | Need more help? |
| Paragraph | Can't find what you're looking for? Our support team is here to help you succeed. |
| Button 1 | Contact Support |
| Button 2 | Join Community |

---

## Design System Compliance Checklist

| Token | Expected | Verify |
|-------|----------|--------|
| Card | card-gradient, hover-lift | ✓ |
| Badge | outline, primary/5 | ✓ |
| Section links | Must have href or disabled state | ⚠️ |
| CTA | hero + outline | ✓ |

---

## Verification Checklist

Compare against `src/pages/Documentation.tsx`:

- [ ] Hierarchy: H1 L1, section cards L2
- [ ] Container: max-w-7xl, px-4 sm:px-6 lg:px-8
- [ ] H1 sizes match
- [ ] Primary CTA uses hero variant
- [ ] Cards use card-gradient, hover-lift
- [ ] Section links have href or disabled state
- [ ] Copy matches exactly
- [ ] All CTAs have Link/href

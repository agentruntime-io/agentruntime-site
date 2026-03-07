# Guide: Building an Enterprise-Grade, WCAG-Compliant Design System

**Status: Future reference.** Not the current plan. Use [brand-design-system.md](./brand-design-system.md) for day-to-day design decisions.

---

A practical roadmap from the current marketing site to a complete design system suitable for enterprise products and teams. Refer to this when scaling beyond the marketing site.

---

## What "Enterprise-Grade" Means

| Dimension | Current State | Enterprise-Grade Target |
|-----------|---------------|------------------------|
| **Accessibility** | Basic notes | WCAG 2.1 AA documented, tested, certified |
| **Components** | Presentational (buttons, cards) | Interactive, all states, accessible, tested |
| **Tokens** | CSS variables | Multi-platform (Web, iOS, Android, Figma) |
| **Documentation** | Markdown files | Interactive Storybook with examples |
| **Governance** | Ad-hoc | Versioned, contribution process, review |
| **Distribution** | In-repo | npm package with semantic versioning |
| **Testing** | Manual | Visual regression, a11y automation, unit tests |
| **Design Tool** | None | Figma library with parity to code |

---

## Phase 1: Foundation (Weeks 1–4)

### 1.1 Token Architecture

**Current:** CSS variables in `index.css`

**Target:** Token system supporting multiple platforms

```
packages/
├── tokens/                 # Source of truth
│   ├── src/
│   │   ├── colors.json     # All color values
│   │   ├── typography.json # Font families, sizes
│   │   ├── spacing.json    # Spacing scale
│   │   └── shadows.json    # Shadow definitions
│   └── build/              # Generated outputs
│       ├── css/variables.css
│       ├── js/tokens.js
│       ├── swift/Colors.swift
│       ├── kotlin/Colors.kt
│       └── figma/tokens.json
```

**Tools:**
- [Style Dictionary](https://amzn.github.io/style-dictionary/) — multi-platform token generation
- [Tokens Studio](https://tokens.studio/) — Figma plugin for token management

**Deliverables:**
- [ ] All current CSS variables migrated to JSON tokens
- [ ] Build pipeline generates web, mobile, Figma outputs
-   [ ] Tokens published to npm (`@agentruntime/tokens`)

---

### 1.2 WCAG 2.1 AA Compliance

**Current:** Basic accessibility notes

**Target:** Documented, tested, certified compliance

#### Step 1: Audit Current State

```bash
# Install testing tools
npm install -D @axe-core/cli pa11y lighthouse

# Run audits
axe http://localhost:3080 --tags wcag2aa
pa11y http://localhost:3080 --standard WCAG2AA
lighthouse http://localhost:3080 --only-categories=accessibility
```

#### Step 2: Document Contrast Ratios

Create `docs/design-system/accessibility.md`:

```markdown
## Color Contrast Compliance

| Token Combination | Ratio | WCAG AA | Notes |
|-------------------|-------|---------|-------|
| Primary / Background | 4.5:1 | ✅ Pass | Main CTA text |
| Muted Foreground / Background | 3.2:1 | ⚠️ Fail | Captions need darker |
| ... | ... | ... | ... |

## Required Fixes
- [ ] Muted Foreground: darken from `215 16% 47%` to `215 16% 40%`
- [ ] Card borders in dark mode: increase contrast
```

#### Step 3: Implement Fixes

- [ ] Fix failing contrast ratios
- [ ] Add `prefers-reduced-motion` support
- [ ] Add skip-nav link
- [ ] Verify focus ring visibility
- [ ] Add ARIA labels to icon-only buttons

#### Step 4: Automated Testing

Add to CI/CD:

```yaml
# .github/workflows/accessibility.yml
name: Accessibility Tests
on: [pull_request]
jobs:
  a11y:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run axe-core
        run: npx @axe-core/cli http://localhost:3080 --exit
```

**Deliverables:**
- [ ] All WCAG 2.1 AA criteria met
- [ ] Automated a11y testing in CI
- [ ] `docs/design-system/accessibility.md` with compliance matrix

---

### 1.3 Component Library Foundation

**Current:** shadcn/ui components, lightly customized

**Target:** Documented, tested, accessible component library

#### Structure

```
packages/
├── components/             # React component library
│   ├── src/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── index.ts
│   │   ├── Card/
│   │   ├── Input/
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
```

#### Component Specification Template

Every component needs:

```markdown
## Button

### Variants
- `primary` — Main actions
- `secondary` — Secondary actions
- `ghost` — Low emphasis
- `danger` — Destructive

### States
- Default
- Hover
- Active/Pressed
- Focus (keyboard)
- Disabled
- Loading

### Accessibility
- Keyboard: Enter/Space triggers
- ARIA: `aria-label` when icon-only
- Focus: Visible ring, trap in modals

### Tokens Used
- `--color-primary`
- `--spacing-md`
- `--radius-md`
```

**Deliverables:**
- [ ] All existing components refactored to spec
- [ ] Storybook setup with stories for each variant/state
- [ ] Basic unit tests (render, interaction)

---

## Phase 2: Scale (Weeks 5–8)

### 2.1 Figma Library Parity

**Goal:** Design and code are synchronized

```
design/
├── AgentRuntime.figma/     # Figma library
│   ├── Foundations/
│   │   ├── Colors
│   │   ├── Typography
│   │   └── Spacing
│   └── Components/
│       ├── Button
│       ├── Card
│       └── Input
```

**Process:**
1. Designer updates tokens in Figma using Tokens Studio
2. Tokens sync to GitHub PR
3. Developer approves and merges
4. Tokens rebuild, components update

**Deliverables:**
- [ ] Figma library matches code components
- [ ] Token sync workflow documented
- [ ] Designers can use components without coding

---

### 2.2 Complete Component States

**Components needing state definitions:**

| Component | States Needed |
|-----------|---------------|
| Button | Default, hover, active, focus, disabled, loading |
| Input | Default, focus, error, disabled, filled |
| Card | Default, hover, loading, empty, error |
| Form | Valid, invalid, submitting, success |
| Table | Loading, empty, error, pagination |
| Modal | Open, closing, loading content |

**Skeleton/Loading Pattern:**

```tsx
// Skeleton.tsx
export const Skeleton = ({ height, width }: SkeletonProps) => (
  <div
    className="animate-pulse bg-muted rounded"
    style={{ height, width }}
  />
);

// Usage in Card
<Card>
  {isLoading ? (
    <>
      <Skeleton height={24} width="60%" />
      <Skeleton height={16} width="100%" />
    </>
  ) : (
    <CardContent>{content}</CardContent>
  )}
</Card>
```

---

### 2.3 Data Visualization System

**Current:** Primary + Destructive only

**Target:** Complete semantic color system

```json
{
  "color": {
    "semantic": {
      "success": { "light": "142 76% 36%", "dark": "142 71% 45%" },
      "warning": { "light": "38 92% 50%", "dark": "38 92% 55%" },
      "error": { "light": "0 84% 60%", "dark": "0 62% 50%" },
      "info": { "light": "213 94% 68%", "dark": "193 100% 60%" }
    },
    "chart": {
      "categorical": ["#3B82F6", "#22C55E", "#F59E0B", "#EF4444", "#8B5CF6"],
      "sequential": ["#DBEAFE", "#93C5FD", "#3B82F6", "#1D4ED8", "#1E40AF"]
    }
  }
}
```

**Status Badge Component:**

```tsx
<Badge variant="status" status="success">Active</Badge>
<Badge variant="status" status="warning">Pending</Badge>
<Badge variant="status" status="error">Failed</Badge>
```

---

### 2.4 Layout & Grid System

**Document:**

```markdown
## Grid System

### Breakpoints
| Name | Width | Usage |
|------|-------|-------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Wide desktop |
| `2xl` | 1536px | Ultra-wide |

### Grid
- 12 columns
- 24px gutters (desktop), 16px (mobile)
- Max container: 1280px (7xl)

### Patterns
- Dashboard: Sidebar (fixed 240px) + Content (fluid)
- Form: Single column, max-width 640px
- List: Full width, responsive table
```

---

## Phase 3: Enterprise Hardening (Weeks 9–12)

### 3.1 Testing Infrastructure

**Visual Regression Testing:**

```bash
npm install -D @chromatic/storybook
```

- Every component variant captured as screenshot
- PRs show visual diffs
- Prevents accidental UI changes

**Accessibility Automation:**

```tsx
// Button.test.tsx
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

test('Button is accessible', async () => {
  const { container } = render(<Button>Click me</Button>);
  expect(await axe(container)).toHaveNoViolations();
});
```

**Interaction Testing:**

```tsx
// Button.test.tsx
test('Button handles click', async () => {
  const onClick = jest.fn();
  render(<Button onClick={onClick}>Click</Button>);
  await userEvent.click(screen.getByRole('button'));
  expect(onClick).toHaveBeenCalled();
});
```

---

### 3.2 Documentation (Storybook)

**Structure:**

```
.storybook/
├── main.ts
├── preview.tsx
└── manager-head.html

src/
├── Button/
│   ├── Button.stories.tsx    # All variants
│   ├── Button.docs.mdx       # Usage guidelines
│   └── Button.specs.md       # Design specs
```

**Story Example:**

```tsx
// Button.stories.tsx
export default {
  title: 'Components/Button',
  component: Button,
};

export const Variants = () => (
  <>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="ghost">Ghost</Button>
  </>
);

export const States = () => (
  <>
    <Button>Default</Button>
    <Button disabled>Disabled</Button>
    <Button loading>Loading</Button>
  </>
);

export const Accessibility = () => (
  <>
    <Button aria-label="Close" icon={<X />} />
    <Button tabIndex={-1}>Not focusable</Button>
  </>
);
```

---

### 3.3 Governance & Contribution

**Create `GOVERNANCE.md`:**

```markdown
# Design System Governance

## Roles

- **Design System Lead**: Reviews all changes, maintains vision
- **Core Contributors**: Regular contributors with merge rights
- **Community**: Contributors via PR

## Contribution Process

1. **Proposal**: Open RFC issue for new components/patterns
2. **Design**: Design team creates Figma spec
3. **Development**: Implement in `packages/components`
4. **Review**: PR requires design + code review
5. **Release**: Merged to `main`, published to npm

## Versioning

- MAJOR: Breaking changes (token renames, component API changes)
- MINOR: New components, features
- PATCH: Bug fixes, docs updates

## RFC Template

- Problem statement
- Proposed solution
- Alternatives considered
- Impact analysis
- Implementation plan
```

---

### 3.4 Migration Strategy

**From Current State:**

```
Phase 1: Parallel Development
- Keep existing site on current components
- Build new design system in `packages/`
- No immediate migration

Phase 2: Gradual Adoption
- New features use new components
- Old components migrated on touch

Phase 3: Complete Migration
- All components from `@agentruntime/components`
- Old shadcn components removed
```

---

## Phase 4: Distribution (Weeks 13–16)

### 4.1 NPM Packages

```json
// packages/components/package.json
{
  "name": "@agentruntime/components",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  }
}
```

### 4.2 Documentation Site

**Options:**
- **Storybook** (recommended for now)
- **Docusaurus** (if heavy documentation needed)
- **Custom Next.js site** (if full control needed)

### 4.3 Design Tokens Distribution

```bash
# Web
npm install @agentruntime/tokens
import tokens from '@agentruntime/tokens';

# Figma
Import tokens.json via Tokens Studio

# Mobile (future)
npm install @agentruntime/tokens-swift  # iOS
npm install @agentruntime/tokens-kotlin # Android
```

---

## Checklist: Enterprise-Grade Completion

### Accessibility
- [ ] WCAG 2.1 AA compliance audit passed
- [ ] Automated a11y testing in CI
- [ ] `prefers-reduced-motion` support
- [ ] Focus management documented
- [ ] Screen reader testing completed

### Components
- [ ] All states defined (default, hover, active, focus, disabled, loading)
- [ ] ARIA attributes correct
- [ ] Keyboard navigation works
- [ ] Visual regression tests passing

### Tokens
- [ ] Multi-platform generation (Web, Figma, Mobile-ready)
- [ ] Semantic tokens (success, warning, error, info)
- [ ] Dark mode tokens validated

### Documentation
- [ ] Storybook with all components
- [ ] Usage examples (do/don't)
- [ ] Migration guides
- [ ] Contribution guidelines

### Governance
- [ ] Semantic versioning
- [ ] Changelog maintained
- [ ] RFC process documented
- [ ] Review process defined

### Quality
- [ ] Unit tests > 80% coverage
- [ ] Visual regression testing
- [ ] Performance budgets
- [ ] Bundle size monitoring

---

## Resources

**Tools:**
- [Style Dictionary](https://amzn.github.io/style-dictionary/) — Token management
- [Storybook](https://storybook.js.org/) — Component documentation
- [Chromatic](https://www.chromatic.com/) — Visual regression
- [axe-core](https://github.com/dequelabs/axe-core) — Accessibility testing
- [Tokens Studio](https://tokens.studio/) — Figma token management

**References:**
- [Carbon Design System](https://carbondesignsystem.com/) — IBM
- [Material Design](https://m3.material.io/) — Google
- [Polaris](https://polaris.shopify.com/) — Shopify
- [Atlassian Design System](https://atlassian.design/)

---

*This is a 16-week roadmap. Adjust based on team capacity and priorities.*

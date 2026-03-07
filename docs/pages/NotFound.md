# NotFound — Page Spec

**Route:** `*` (catch-all)  
**Source:** [brand-design-system.md](../brand-design-system.md)

Deterministic spec for comparison against `src/pages/NotFound.tsx`.

---

## Current State (Non-Compliant)

The NotFound page **does not use the design system**. It uses hardcoded values.

---

## Spec (Target)

### Layout
- `min-h-screen`, `flex items-center justify-center`
- Background: `bg-background` (design system token)
- Content: `text-center`

### Content & Styling

| Element | Current (Wrong) | Target (Design System) |
|---------|-----------------|------------------------|
| Container | — | `max-w-md`, `mx-auto`, `px-4` |
| Background | `bg-gray-100` | `bg-background` |
| H1 "404" | `text-4xl font-bold mb-4` | `text-6xl`, `font-bold`, `text-foreground`, `mb-4` |
| Message | `text-xl text-gray-600 mb-4` | `text-xl`, `text-muted-foreground`, `mb-6` |
| Link | `text-blue-500 hover:text-blue-700 underline` | `Button variant="link"` or `text-primary`, `hover:underline`, `underline-offset-4` |

### Hierarchy
- **L1:** "404" — the error code
- **L2:** "Oops! Page not found" (or similar)
- **L2:** Link "Return to Home"

### Copy
| Element | Exact Text |
|---------|------------|
| H1 | 404 |
| Message | Oops! Page not found |
| Link | Return to Home |

### Recommended Implementation

```tsx
<div className="min-h-screen flex items-center justify-center bg-background">
  <div className="text-center max-w-md mx-auto px-4">
    <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
    <p className="text-xl text-muted-foreground mb-6">
      Oops! Page not found
    </p>
    <Button variant="outline" asChild>
      <Link to="/">Return to Home</Link>
    </Button>
  </div>
</div>
```

---

## Design System Compliance Checklist

| Token | Expected | Current |
|-------|----------|---------|
| Background | bg-background | ❌ bg-gray-100 |
| Text | text-foreground | ❌ (default) |
| Muted text | text-muted-foreground | ❌ text-gray-600 |
| Link | text-primary, or Button | ❌ text-blue-500 |
| Navigation | Link (react-router) | ❌ anchor href |

---

## Verification Checklist

Compare against `src/pages/NotFound.tsx`:

- [ ] Background: bg-background (not bg-gray-100)
- [ ] H1: text-6xl, text-foreground
- [ ] Message: text-muted-foreground (not text-gray-600)
- [ ] Link: text-primary or Button variant (not text-blue-500)
- [ ] Uses Link from react-router for navigation

# Contact — Page Spec

**Route:** `/contact`  
**Source:** [brand-design-system.md](../brand-design-system.md)

Deterministic spec for comparison against `src/pages/Contact.tsx`.

---

## Page Hierarchy

| Level | Element | Purpose |
|-------|---------|---------|
| **L1** | H1 "Get in Touch" | Primary focal point |
| **L1** | Contact form (primary action) | Main conversion |
| **L2** | Form description | Supporting copy |
| **L2** | Contact method cards | Alternative paths |
| **L3** | Office info, hours, FAQ | Detail |
| **L3** | Bottom CTA | Secondary conversion |

---

## Images

### contact-background.jpg

| Property | Value |
|----------|-------|
| **Path** | `src/assets/contact-background.jpg` |
| **Usage** | Hero section, `backgroundSize: cover`, `backgroundPosition: center` |
| **Overlay** | `bg-background/80 backdrop-blur-sm` + `gradient-to-b from-transparent via-background/50 to-background` |

**Generation prompt:** A futuristic collaborative workspace or control room. Core color palette: deep rich blues (indigo, navy) for environment and walls, contrasted with vibrant glowing electric blue or cyan for digital interfaces, screens, holographic projections, and accent lines. Striking orange-red linear lights overhead as strong secondary accent. Central figure as virtual or holographic presenter/agent engaging with a translucent glowing blue virtual interface at waist height. Multiple individuals (3-6) seated at sleek light-colored desks working on computers, screens glowing with electric blue interfaces displaying code or data. Walls with glowing rectangular screens showing professional headshots and data visualizations in electric blue. Subtle floating icons (gears, connection points). Floor with subtle grid pattern and glowing blue lines around central figure. Clean modern stylized digital art. Mood: efficiency, advanced technology, teamwork, innovation. Color palette: deep blues, electric cyan, orange-red accents.

---

## Hero Section

### Layout
- `py-32`, `overflow-hidden`
- Background: `contact-background.jpg`, `cover`, `center`
- Overlay: `bg-background/80 backdrop-blur-sm` + `gradient-to-b from-transparent via-background/50 to-background`
- Container: `max-w-7xl`, `px-4 sm:px-6 lg:px-8`, `text-center`

### Content & Styling

| Element | Content | Design Token |
|---------|---------|--------------|
| H1 line 1 | "Get in" | `text-4xl md:text-5xl`, `font-bold`, `text-foreground`, `mb-6`, `fade-in-up` |
| H1 line 2 | "Touch" | `text-gradient`, `block` |
| Paragraph | Intro copy | `text-xl`, `text-muted-foreground`, `max-w-3xl`, `mx-auto`, `fade-in-up` |

### Copy
| Element | Exact Text |
|---------|------------|
| H1 line 1 | Get in |
| H1 line 2 | Touch |
| Paragraph | Have questions about AgentRuntime? Need help getting started? Our team is here to help you succeed with AI agent orchestration. |

---

## Main Content Layout

### Grid
- `grid-cols-1 lg:grid-cols-2`, `gap-12`, `mb-16`
- Container: `max-w-7xl`, `px-4 sm:px-6 lg:px-8`, `py-20`

---

## Contact Form Card

### Card
- `Card`, `card-gradient`
- `CardHeader`: title + description
- `CardContent`: `space-y-6`

### Form Fields (design system: Form Inputs)
- Height: 40px (`h-10`)
- Border: `border-input`, `focus-visible:ring-2 focus-visible:ring-ring`
- Radius: `rounded-md`
- Label: `Label`, `space-y-2` per field

### Field Spec

| Field | Type | Required | Placeholder |
|-------|------|----------|-------------|
| First Name | Input | yes | "John" |
| Last Name | Input | yes | "Doe" |
| Email | Input email | yes | "john@company.com" |
| Company | Input | no | "Acme Corp" |
| Subject | Input | no | "How can we help?" |
| Message | Textarea, 5 rows | yes | "Tell us about your project..." |

### Field Layout
- Name fields: `grid-cols-1 md:grid-cols-2`, `gap-4`
- All fields: `space-y-6`

### Submit Button
- `Button variant="hero" size="lg"`, `w-full`
- States: "Send Message" | "Sending…" (disabled when submitting)

### Honeypot (spam prevention)
When `VITE_CONTACT_FORM_ENDPOINT` is set, include a hidden `website` field:
- `type="text"`, `name="website"`, `tabIndex={-1}`, `autoComplete="off"`, `aria-hidden="true"`
- Classes: `sr-only`
- Style: `position: absolute`, `left: -9999px`, `width: 1px`, `height: 1px`
- Omit when formEndpoint is not set

### formEndpoint conditional
- **When set:** Form submits via POST to the endpoint. Payload includes `_subject`, `_replyto`, `name`, `email`, `company`, `message`, `website` (honeypot), optional `source`.
- **When not set:** Form does not submit; shows error: "There seems to be an issue. Please contact hello@agentruntime.io directly. Sorry for the inconvenience."

### Feedback
- Success: `text-sm`, `text-green-600`, `dark:text-green-400`
- Error: `text-sm`, `text-destructive`
- Helper: `text-sm`, `text-muted-foreground`, `text-center`

---

## Contact Method Cards (3)

### Card Spec
- `Card`, `card-gradient`, `hover-lift`, `transition-all duration-300`
- Icon container: `w-12 h-12`, `rounded-lg`, `bg-primary/10`
- Icon: `h-6 w-6`, `text-primary`
- Title: `font-semibold`, `text-foreground`
- Description: `text-sm`, `text-muted-foreground`
- Links: `text-sm`, Mail/Phone/ExternalLink `h-4 w-4`, `text-primary`, `hover:underline`

### Content
1. Support — Headphones, support@agentruntime.io, docs link — "Technical support and documentation"
2. Sales — DollarSign, sales@agentruntime.io, +1-800-123-4567 — "Pricing and enterprise inquiries"
3. General — MessageCircle, hello@agentruntime.io — "General questions and partnerships"

### Copy (form)
- Card title: "Send us a message"
- Card description: "Fill out the form below and we'll get back to you within one business day."
- Form labels: First Name, Last Name, Email, Company, Subject, Message
- Placeholders: John, Doe, john@company.com, Acme Corp, How can we help?, Tell us about your project and how AgentRuntime can help...
- Submit: "Send Message" | "Sending…"
- Success: "Thanks! We've received your message and will reply within one business day."
- Helper: "We typically respond within one business day."

---

## Office & Hours Cards

### Office Card
- MapPin icon, `w-12 h-12`, `rounded-lg`, `bg-primary/10`
- Title: "Headquarters"
- Content: `text-sm`, `text-muted-foreground`

### Hours Card
- Clock icon
- Title: "Support Hours"
- Content: hours list, `text-primary font-medium` for enterprise note

---

## FAQ Section

### Layout
- `mb-16`, `grid-cols-1 md:grid-cols-2`, `gap-6`, `max-w-4xl mx-auto`
- H2: `text-2xl`, `font-bold`, `text-foreground`, `text-center`, `mb-8`

### FAQ Card Spec
- `Card`, `card-gradient`
- Question: `font-semibold`, `text-foreground`, `mb-2`
- Answer: `text-sm`, `text-muted-foreground`

---

## Bottom CTA

### Layout
- `text-center`
- Card: `bg-gradient-card`, `p-8`, `rounded-2xl`, `shadow-lg`, `max-w-2xl`, `mx-auto`

### Content & Styling

| Element | Design Token |
|---------|--------------|
| H2 | `text-2xl`, `font-bold`, `text-foreground`, `mb-4` |
| Paragraph | `text-muted-foreground`, `mb-6` |
| Button 1 | `variant="hero" size="lg"`, "Start Free Trial" |
| Button 2 | `variant="outline" size="lg"`, "Schedule Demo" |

### Copy (CTA)
- H2: "Ready to get started?"
- Paragraph: "Join thousands of developers already using AgentRuntime to orchestrate their AI agents."
- Button 1: "Start Free Trial"
- Button 2: "Schedule Demo"

### Copy (FAQ)
1. "How quickly do you respond to support requests?" — "We aim to respond to all support requests within 4 hours during business hours. Enterprise customers receive priority support with 1-hour response times."
2. "Do you offer phone support?" — "Phone support is available for Team and Enterprise customers. Developer plan users can access support through our community forum and email."
3. "Can I schedule a demo?" — "Yes! Contact our sales team to schedule a personalized demo. We'll show you how AgentRuntime can solve your specific use cases."
4. "Do you offer on-site training?" — "We offer virtual and on-site training for Enterprise customers. Our team can help your developers get up to speed quickly."

---

## Design System Compliance Checklist

| Token | Expected | Verify |
|-------|----------|--------|
| Form input height | 40px | ✓ |
| Form input radius | rounded-md | ✓ |
| Primary CTA | hero variant | ✓ |
| Card | card-gradient | ✓ |
| Icon container | w-12 h-12, rounded-lg | ✓ |

---

## Verification Checklist

Compare against `src/pages/Contact.tsx`:

- [ ] Hierarchy: H1 L1, form L1, contact methods L2
- [ ] Container: max-w-7xl, px-4 sm:px-6 lg:px-8
- [ ] Form fields: First Name, Last Name, Email, Company, Subject, Message
- [ ] Honeypot: website field present when formEndpoint set, sr-only, position absolute left -9999px
- [ ] formEndpoint: submits when set; error + hello@agentruntime.io when not set
- [ ] Primary CTA uses hero variant
- [ ] Cards use card-gradient, hover-lift on contact method cards
- [ ] Copy matches exactly

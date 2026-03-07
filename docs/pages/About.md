# About — Page Spec

**Route:** `/about`  
**Source:** [brand-design-system.md](../brand-design-system.md)

Deterministic spec for comparison against `src/pages/About.tsx`.

---

## Page Hierarchy

| Level | Element | Purpose |
|-------|---------|---------|
| **L1** | H1 "About AgentRuntime" | Primary focal point |
| **L2** | Mission statement | Core message |
| **L2** | Our Story | Narrative |
| **L2** | Team section | People |
| **L2** | Values section | Principles |
| **L3** | Stats card, careers CTA, location | Supporting |

---

## Images

### about-background.jpg

| Property | Value |
|----------|-------|
| **Path** | `src/assets/about-background.jpg` |
| **Usage** | Hero section, `backgroundSize: cover`, `backgroundPosition: center` |
| **Overlay** | `bg-background/80 backdrop-blur-sm` + `gradient-to-b from-transparent via-background/50 to-background` |

**Generation prompt:** A team of diverse professionals (male and female, various ethnicities, aged 25-45) collaborating in a cutting-edge minimalist office. Geometrically clean space with smooth light-colored walls and highly reflective dark floor. Room dramatically illuminated by gradient ambient light: vibrant electric blue and cool cyan on one side, blending into rich magenta and warm orange on the other. Large transparent or projected screens displaying intricate data visualizations, complex algorithms, and abstract AI network diagrams glowing with blue-to-magenta color palette. People engaged in focused work on sleek modern laptops, gesturing towards projections, having animated discussions. Mood: innovation, seamless human-AI collaboration, futuristic technology. Color palette: electric blue, cyan, magenta, orange. Cinematic high-contrast lighting emphasizing glowing screens and reflective surfaces. Ultra-realistic, high detail.

---

## Hero Section

### Layout
- `py-32`, background: `about-background.jpg`
- Overlay: `bg-background/80 backdrop-blur-sm` + gradient
- Container: `max-w-7xl`, `px-4 sm:px-6 lg:px-8`, `text-center`

### Content & Styling

| Element | Design Token |
|---------|--------------|
| H1 line 1 | "About", `text-4xl md:text-5xl`, `font-bold`, `text-foreground`, `mb-6`, `fade-in-up` |
| H1 line 2 | "AgentRuntime", `text-gradient`, `block` |
| Paragraph | `text-xl`, `text-muted-foreground`, `max-w-3xl`, `mx-auto`, `fade-in-up` |

### Copy
| Element | Exact Text |
|---------|------------|
| H1 line 1 | About |
| H1 line 2 | AgentRuntime |
| Paragraph | We're on a mission to empower developers to orchestrate AI agents with confidence and scale. Founded by experienced engineers who understand the challenges of building production AI systems. |

---

## Mission Section

### Layout
- `mb-20`
- Card: `card-gradient`, `p-12`, `text-center`

### Content & Styling

| Element | Design Token |
|---------|--------------|
| H2 | "Our Mission", `text-3xl`, `font-bold`, `text-foreground`, `mb-6` |
| Paragraph | `text-xl`, `text-muted-foreground`, `max-w-4xl`, `mx-auto`, `leading-relaxed` |

### Copy
| Element | Exact Text |
|---------|------------|
| H2 | Our Mission |
| Paragraph | "Empower developers to orchestrate AI agents with confidence and scale. We believe that powerful AI agent workflows should be accessible to every developer, not just those with massive infrastructure teams." |

---

## Story Section

### Layout
- `mb-20`, `grid-cols-1 lg:grid-cols-2`, `gap-12`, `items-center`

### Left Column
- H2: "Our Story", `text-3xl`, `font-bold`, `text-foreground`, `mb-6`
- Paragraphs: `space-y-4`, `text-muted-foreground`

### Right Column — Stats Card
- `Card`, `card-gradient`, `p-8`
- Grid: `grid-cols-2`, `gap-6`
- Stat value: `text-3xl`, `font-bold`, `text-primary`
- Stat label: `text-sm`, `text-muted-foreground`
- Stats: 2023 (Founded), 500+ (Companies), 1M+ (Agent Runs), 99.9% (Uptime)

### Copy
| Element | Exact Text |
|---------|------------|
| H2 | Our Story |
| Paragraph 1 | AgentRuntime was born from frustration. Our founders spent years building and scaling AI systems at major tech companies, repeatedly encountering the same challenges: complex agent coordination, unreliable execution, and lack of proper tooling. |
| Paragraph 2 | In 2023, we decided to solve this once and for all. We envisioned a platform where developers could focus on building intelligent agents rather than wrestling with infrastructure, monitoring, and orchestration complexity. |
| Paragraph 3 | Today, AgentRuntime powers thousands of agent workflows for companies ranging from innovative startups to Fortune 500 enterprises, processing millions of agent interactions daily with industry-leading reliability. |

---

## Team Section

### Layout
- `mb-20`
- Header: `text-center`, `mb-12`
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`, `gap-8`

### Team Card Spec
- `Card`, `card-gradient`, `hover-lift`, `transition-all duration-300`
- Avatar: `w-24 h-24`, `rounded-full`, `bg-gradient-hero`, Users `h-12 w-12`, `text-primary`
- Name: `font-bold`, `text-foreground`, `mb-1`
- Role: `Badge variant="outline"`, `bg-primary/5`, `text-primary`, `border-primary/20`, `mb-4`
- Bio: `text-sm`, `text-muted-foreground`

### Content (4 members)
- Sarah Chen — CEO & Co-Founder — "Former VP of Engineering at Stripe. Expert in distributed systems and developer tools with 15+ years experience."
- Marcus Rodriguez — CTO & Co-Founder — "Ex-Principal Engineer at Google. Specialist in AI/ML infrastructure and scalable agent orchestration platforms."
- Dr. Emily Watson — VP of Product — "Former Product Lead at Microsoft Azure. PhD in Computer Science with focus on human-AI interaction design."
- David Kim — Head of Engineering — "Previously Senior Staff Engineer at Uber. Builds developer platforms that scale to millions of operations daily."

### Copy
| Element | Exact Text |
|---------|------------|
| H2 | Meet Our Team |
| Subheading | Experienced engineers and researchers from leading tech companies, united by a passion for developer tools and AI innovation. |

---

## Values Section

### Layout
- `mb-20`
- Header: `text-center`, `mb-12`
- Grid: `grid-cols-1 md:grid-cols-3`, `gap-8`

### Value Card Spec
- `Card`, `card-gradient`, `hover-lift`, `text-center`
- Icon container: `w-16 h-16`, `rounded-full`, `bg-primary/10`, `mx-auto`, `mb-6`
- Icon: `h-8 w-8`, `text-primary`
- Title: `text-xl`, `font-bold`, `text-foreground`, `mb-4`
- Description: `text-muted-foreground`

### Content
- Openness (Target), Reliability (Shield), Innovation (Lightbulb)

### Copy
| Element | Exact Text |
|---------|------------|
| H2 | Our Values |
| Subheading | The principles that guide our decisions and shape our culture. |
| Openness | "We believe in transparent development, open APIs, and fostering a collaborative ecosystem that benefits everyone." |
| Reliability | "Our platform is built with enterprise-grade reliability, ensuring your agents run smoothly in production environments." |
| Innovation | "We continuously push the boundaries of what's possible in AI agent orchestration and developer experience." |

---

## Careers Section

### Layout
- `mb-20`
- Card: `card-gradient`, `p-12`, `text-center`

### Content & Styling

| Element | Design Token |
|---------|--------------|
| H2 | "Join Our Team", `text-3xl`, `font-bold`, `text-foreground`, `mb-6` |
| Paragraph | `text-xl`, `text-muted-foreground`, `mb-8`, `max-w-3xl`, `mx-auto` |
| Button 1 | `variant="hero" size="lg"`, "View Open Roles" |
| Button 2 | `variant="outline" size="lg"`, "Life at AgentRuntime" |

### Copy
| Element | Exact Text |
|---------|------------|
| H2 | Join Our Team |
| Paragraph | We're always looking for talented engineers, designers, and researchers who share our passion for building developer tools that matter. |
| Button 1 | View Open Roles |
| Button 2 | Life at AgentRuntime |

---

## Location CTA

### Layout
- `text-center`
- Card: `bg-gradient-card`, `p-8`, `rounded-2xl`, `shadow-lg`, `max-w-2xl`, `mx-auto`

### Content & Styling

| Element | Design Token |
|---------|--------------|
| Location | MapPin `h-5 w-5`, `text-primary`, `font-semibold`, `text-foreground`, `mb-4` |
| Paragraph | `text-muted-foreground`, `mb-6` |
| Icons | Button `variant="outline" size="icon"`, GitHub, LinkedIn |

### Copy
| Element | Exact Text |
|---------|------------|
| Location | San Francisco, CA |
| Paragraph | Headquarters in the heart of Silicon Valley, with a global remote-first culture. |

---

## Design System Compliance Checklist

| Token | Expected | Verify |
|-------|----------|--------|
| Card | card-gradient, hover-lift | ✓ |
| Badge | outline, primary/5 bg | ✓ |
| Icon containers | w-16 h-16 (values), w-12 h-12 (team avatar 24) | ✓ |
| Section spacing | mb-20 | ✓ |

---

## Verification Checklist

Compare against `src/pages/About.tsx`:

- [ ] Hierarchy: H1 L1, mission L2
- [ ] Container: max-w-7xl, px-4 sm:px-6 lg:px-8
- [ ] H1/H2 sizes match
- [ ] Primary CTA uses hero variant
- [ ] Cards use card-gradient, hover-lift where specified
- [ ] Team, values, stats present
- [ ] Copy matches exactly
- [ ] All CTAs have Link/href

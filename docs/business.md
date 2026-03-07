# AgentRuntime Site — Business & Strategy

General business, content, and credibility concerns. Not technical implementation.

---

## 1. Social Proof & Testimonials

### 1.1 Fabricated Content

**What's wrong:** Testimonials, team bios, company names, and metrics appear to be invented:

- **Testimonials:** Sarah Chen (TechFlow), Marcus Rodriguez (DataStream) — names and companies may not exist
- **Use case metrics:** "75% faster response times", "$250K+ savings", "TechCorp reduced support costs by 60%" — unverifiable
- **Team:** Sarah Chen (CEO), Marcus Rodriguez (CTO), etc. — bios reference placeholder credentials
- **About stats:** "500+ companies", "1M+ agent runs", "99.9% uptime" — may not reflect reality

**Risk:** Enterprise buyers verify claims. Fabricated social proof damages trust more than having none.

**Recommendation:**
- Remove testimonials until real customers can provide them
- Replace team section with real bios/photos, or remove until ready
- Use only verifiable metrics; remove or qualify aspirational numbers
- If case studies are fictional, label as "Example scenario" or remove

---

## 2. Placeholder Content

### 2.1 Contact Page

- **Address:** "123 Innovation Drive, San Francisco, CA 94105" — generic placeholder
- **Phone:** "+1-800-123-4567" — placeholder
- Use real address/phone or remove if remote-only

### 2.2 About Page

- **Team images:** `/api/placeholder/150/150` — replace with real photos or remove avatars
- **Company story:** Verify dates and numbers before launch

### 2.3 Copy Inconsistencies

- Index: "Join hundreds of companies" vs "Join thousands of developers" — pick one and be accurate
- Ensure all claims are consistent across pages

---

## 3. Meta Tags & SEO

### 3.1 Broken Open Graph / Twitter Tags

**Current state (index.html):**
- `og:title` = UUID `2bd4f3c2-5061-445b-86b5-020d195eed12`
- `og:description` = "Lovable Generated Project"
- `og:image` = `https://lovable.dev/opengraph-image-p98pqg.png`
- `twitter:site` = `@lovable_dev`

**Impact:** When shared on Slack, LinkedIn, Twitter, etc., links show wrong title, description, and Lovable branding.

**Recommendation:**
- `og:title` = "AgentRuntime - Orchestrate AI Agents at Scale"
- `og:description` = "API-first runtime for importing, testing, and running your agents and tools—no frontend needed."
- `og:image` = AgentRuntime branded image (1200×630px recommended)
- `twitter:site` = `@agentruntime` (or remove if no account)

### 3.2 Per-Page Meta

- Add unique `title` and `meta description` per route (Index, Features, Pricing, etc.)
- Consider JSON-LD for Organization, Product
- Add sitemap.xml

---

## 4. Photography & Imagery

### 4.1 Current Hero Imagery

- AI-generated sci-fi robot imagery (hero-background, support-background, etc.)
- Reads as "early-stage startup" to enterprise evaluators

**Recommendation:**
- Define imagery direction: product screenshots, abstract/editorial, or real customer environments
- Replace AI robot imagery with visuals that support enterprise credibility
- Document photography style in brand-design-system.md

---

## 5. Brand Voice & Copy

### 5.1 Inconsistent Tone

- Mix of casual ("Get started in minutes"), aspirational ("Orchestrate AI Agents at Scale"), and inflated ("Join thousands")
- No guidance on voice for different audiences (developer vs. CTO vs. procurement)

**Recommendation:**
- Define brand voice guidelines: tone, vocabulary, what to avoid
- Align audience-specific copy (technical vs. business-focused)
- Add to brand-design-system.md

---

## 6. Trust & Credibility

| Priority | Item | Impact |
|----------|------|--------|
| **P0** | Fix OG/Twitter meta tags | Broken share previews everywhere |
| **P0** | Remove or replace fabricated testimonials/metrics | Trust damage if verified |
| **P1** | Replace placeholder contact info | Credibility |
| **P1** | Replace placeholder team images | Credibility |
| **P2** | Define photography direction | Enterprise positioning |
| **P2** | Document brand voice | Copy consistency |

---

*See also: [improve.md](./improve.md) for technical fixes, [pages/](./pages/README.md) for page-specific content, [roadmap.md](./roadmap.md) for future features.*

# Integrations + Marketplace — marketing site plan

**Status:** Planning (Mar 2026)  
**Scope:** `agentruntime-site` public pages, BFF public read APIs, marketplace catalog surfacing  
**Not in scope:** Console marketplace UX (`webapp` — already shipped behind `enableMarketplace`)

---

## 1. Goals

Build a **Composio / n8n / Make–quality** public discovery layer that is honest to AgentRuntime:

1. **Integrations directory** — what first-party connectors are registered in the platform catalog (from DB).
2. **Integration detail pages** — dedicated `/integrations/:slug` pages with curated marketing + real tool facts.
3. **Marketplace** — public browse/install entry for **workflow packages** (and later agents/bundles) listed with `visibility: public | platform`.
4. **Apps (Surfaces)** — marketplace-installable app packages (views + workflow templates + connections). Design: [../../docs/surfaces/SURFACES_ARCHITECTURE.md](../../docs/surfaces/SURFACES_ARCHITECTURE.md).
5. **Cross-linking** — integration pages show example workflows from marketplace; marketplace items show required connectors.

**Core principle:** dynamic **index** (DB) + curated **detail** (site content) + **marketplace examples** (published packages), merged at render time.

---

## 2. What exists today

| Layer | Today | Gap |
|-------|--------|-----|
| Platform connector registry | `mcp_servers` → BFF `/v1/mcp/platform-catalog` (auth) | Need **public** read: `/v1/public/connectors` (in progress) |
| Tool contracts | `connectors/catalog/{slug}.json` | Not exposed to site; use for **tool grouping** on detail pages |
| Integration detail (site) | `/integrations/:slug` route; **Slack only** has rich `integrationDetails.ts` | ~70 connectors get generic template |
| Marketing blueprints | Static `workflowBlueprints.ts` → `/solutions/:slug` | Illustrative, not installable marketplace items |
| Marketplace backend | `workflow_packages`, `agent_packages`, `catalog_bundles` in control-service | Browse/install APIs require **Console auth** |
| Marketplace UI | `webapp` `/marketplace` | Authenticated; not on marketing site |
| Connector ↔ workflow link | None indexed | Must extract connector slugs from workflow graph at publish time |

---

## 3. Site map (target)

```
/integrations                          Directory (DB-backed)
/integrations/:slug                      Connector detail (DB facts + authored content)

/marketplace                             Public marketplace home
/marketplace/workflows                   Workflow package grid
/marketplace/workflows/:packageId        Workflow package detail
/marketplace/agents                    (phase 2)
/marketplace/agents/:packageId         (phase 2)
/marketplace/bundles                   (phase 2)

/solutions/:slug                         Keep as **product blueprints** (sales narratives)
                                         Distinct from installable marketplace workflows
```

**Redirects:** `/connectors` → `/integrations` (existing).

---

## 4. Integration pages

### 4.1 Index (`/integrations`)

**Data:** `GET /v1/public/connectors`

| Field | Source |
|-------|--------|
| slug, name, description, icon_url, tool_count | Platform DB (`mcp_servers`) |
| maturity badge | Authored override or rule (`registered` / `preview` / `verified`) |
| category | Authored or heuristic (optional filter) |

**UX (n8n-style directory):** search, category/status filters, card grid, count in hero.

### 4.2 Detail (`/integrations/:slug`)

Merge **three sources:**

| Section | Source | Notes |
|---------|--------|-------|
| Hero (name, summary, auth type, tool count, status) | DB + authored | Composio-style facts strip |
| What you can build | **Authored** | 3–5 workflow outcomes (AgentRuntime-specific: agent + rules + human_task) |
| Supported tools (grouped) | **`connectors/catalog/{slug}.json`** | Read / Write / Search groups; our differentiator vs competitors |
| How it works in AgentRuntime | **Authored template** | Connection → MCP instance → `mcp_call` → governance |
| Example workflows | **Marketplace API** | `GET /v1/public/marketplace/workflows?connector=gmail` (new) |
| Works well with | Authored + graph-derived | Related connector slugs |
| Auth & setup | Docs links | `docs.agentruntime.io/connectors/{slug}`, Google Workspace hub pages |
| FAQ | Authored | 4–6 questions |
| CTA | Site standard | Contact, docs, Console sign-in |

**Content storage (site repo):**

```
agentruntime-site/src/content/integrations/
  gmail.json          # or gmail.mdx — curated marketing fields
  slack.json          # migrate from integrationDetails.ts
  _schema.ts          # TypeScript types
```

**Build-time helper (optional):** script reads `connectors/catalog/{slug}.json` → generates tool groups for detail pages (not the 440-connector index mistake — only for **registered** slugs from public API).

### 4.3 Tool grouping (extra capability)

From each catalog JSON, group tools by:

1. **Explicit metadata** (preferred when connector has `mcp/metadata.go` groups), or
2. **Heuristic:** tool name prefix / handler path (`gmail_*` → Message, Label, Draft), or
3. **Access:** read vs write from tool metadata when available

Expose on page as **Supported actions** (Make-style) with collapsible groups.

---

## 5. Marketplace on the marketing site

### 5.1 Yes — separate section required

Console marketplace (`webapp`) is for **signed-in install/hire**. The marketing site needs:

- **Discovery** for prospects (SEO, evaluation)
- **Deep links** from integration pages (“see this workflow with Gmail”)
- **Install CTA** → `console.agentruntime.io/marketplace/install/workflow?package_id=…` (existing Console landing)

### 5.2 Public API layer (new BFF routes)

Mirror pattern of `/v1/public/connectors`:

| Route | Purpose | Auth |
|-------|---------|------|
| `GET /v1/public/marketplace/workflows` | List `visibility IN (public, platform)` | None |
| `GET /v1/public/marketplace/workflows/lookup` | Single package + summary manifest | None |
| `GET /v1/public/marketplace/workflows?connector={slug}` | Filter by connector (needs index) | None |
| `GET /v1/public/marketplace/agents` | Phase 2 | None |
| `GET /v1/public/marketplace/bundles` | Phase 2 | None |

**Do not** expose full workflow graph manifest publicly without review (may contain internal step names). Public detail can include: display_name, description, publisher, version, connector requirements, step count, trigger type, screenshot/hero image URL.

### 5.3 Marketplace index (`/marketplace`)

**Tabs:** Workflows (phase 1) → Agents → Bundles

**Cards:** title, description, connector icons, trigger badge, “Install in Console” CTA

**Filters:** connector, category/use-case tag, trigger type (webhook / schedule / manual)

### 5.4 Marketplace item page (`/marketplace/workflows/:packageId`)

| Section | Content |
|---------|---------|
| Hero | Title, description, publisher, version, install CTA |
| What it does | Outcome summary (from package summary + optional site editorial) |
| Connectors required | Slugs + links to `/integrations/:slug` |
| Execution overview | Simplified step list (derived from manifest graph — read-only marketing view) |
| Governance notes | Human checkpoints, approval gates if present |
| Related integrations | Cross-links |
| CTA | Open in Console to install |

**Install flow:** Marketing page → `https://console.agentruntime.io/marketplace/install/workflow?package_id=…&version=…` (existing).

---

## 6. Example workflows on integration pages

**Yes — from marketplace, not static blueprints.**

| Source | Use on integration page |
|--------|-------------------------|
| `workflow_packages` where `visibility = public \| platform` | Real, installable examples |
| Static `workflowBlueprints.ts` | Keep for `/solutions/*` sales narratives only |

**Publisher workflow:**

1. Author workflow in Studio.
2. Publish package (`POST /v1/workflows/{id}/publish-package`).
3. Set visibility to `public` (or `platform` for first-party).
4. Optional: `site_featured: true` or tag `connectors: [gmail, slack]` in package summary (schema extension).

**Backend prerequisite — connector index on packages:**

At publish time, parse workflow graph and persist:

```json
{
  "connector_slugs": ["gmail", "google-sheets"],
  "trigger_kinds": ["webhook", "schedule"],
  "has_human_task": true
}
```

Enables:

- `GET /v1/public/marketplace/workflows?connector=gmail`
- Integration detail section: “Example workflows using Gmail”

Until index exists: manual `connector_slugs` in package summary or site-side curated map (`gmail → [package_ids]`).

---

## 7. Data architecture

```
┌─────────────────────┐     ┌──────────────────────────┐
│  mcp_servers (DB)   │────▶│ GET /v1/public/connectors │
└─────────────────────┘     └───────────┬──────────────┘
                                          │
┌─────────────────────┐     ┌─────────────▼──────────────┐
│ connectors/catalog  │────▶│ Integration detail merge  │
│  {slug}.json        │     │  (build-time or BFF enrich) │
└─────────────────────┘     └─────────────┬──────────────┘
                                          │
┌─────────────────────┐     ┌─────────────▼──────────────┐
│ site content        │────▶│ /integrations/:slug       │
│ integrations/*.json │     └──────────────────────────┘
└─────────────────────┘

┌─────────────────────┐     ┌──────────────────────────┐
│ workflow_packages   │────▶│ GET /v1/public/marketplace/... │
│ visibility public   │     └───────────┬──────────────┘
└─────────────────────┘                 │
                          ┌─────────────▼──────────────┐
                          │ /marketplace/workflows/…  │
                          │ + integration cross-links │
                          └──────────────────────────┘
```

---

## 8. Phased delivery

### Phase 0 — Unblock (1–2 days)

- [ ] Deploy BFF `GET /v1/public/connectors`
- [ ] Fix integrations index fetch on site
- [ ] Hero/error states polished

### Phase 1 — Integration detail v2 (1–2 weeks)

- [ ] Content schema (`src/content/integrations/`)
- [ ] Migrate Slack to schema; add **Gmail** as second full page
- [ ] Tool grouping from catalog JSON (build script for registered slugs only)
- [ ] Detail page template: hero, tools, governance, docs links
- [ ] Prerender + sitemap for slugs with `maturity: verified`

### Phase 2 — Marketplace public surfacing (2–3 weeks)

- [ ] BFF public marketplace list/lookup (workflows only)
- [ ] Publish-time `connector_slugs` index on workflow packages (control-service)
- [ ] Site: `/marketplace`, `/marketplace/workflows/:id`
- [ ] Integration pages: “Example workflows” section from marketplace filter
- [ ] Seed 5–10 platform `visibility: platform` workflow packages as examples

### Phase 3 — Scale content (ongoing)

- [ ] Top 20 connectors get full authored pages
- [ ] Remaining registered connectors: catalog-backed tools + light template
- [ ] Agents + bundles on public marketplace
- [ ] Search across integrations + marketplace
- [ ] Optional: `llms.txt` entries for verified integration + marketplace pages

### Phase 4 — Parity polish (later)

- [ ] Community / verified publisher badges
- [ ] Workflow screenshots / Studio preview images
- [ ] FAQ from docs/support themes
- [ ] Analytics on integration → marketplace → Console install funnel

---

## 9. Relationship to existing `/solutions`

| | `/solutions/:slug` | `/marketplace/workflows/:id` |
|--|-------------------|------------------------------|
| Purpose | Sales / positioning blueprints | Installable workflow packages |
| Data | Static `workflowBlueprints.ts` | `workflow_packages` DB |
| CTA | Contact / discuss | Install in Console |
| Audience | Prospects evaluating platform | Users ready to try |

Keep both. Cross-link: solution blueprint → “Install a similar workflow” → marketplace item.

---

## 10. Open decisions

1. **Public manifest exposure** — summary-only vs redacted graph for marketing detail pages?
2. **Connector slug canonical** — marketing URLs use catalog filename (`gemini-image`) vs adapter slug (`geminiimage`)? Pick one mapping table.
3. **Composio connectors** — show on marketing site or first-party only? Recommend **first-party only** on `/integrations`; Composio stays Console/platform catalog.
4. **Who authors integration pages** — eng generates tool tables, product writes use cases, or docs team mirrors `agentruntime-docs/connectors/*.mdx`?
5. **Featured workflows** — `site_featured` flag on package vs curated site JSON map until index ships?

---

## 11. Success criteria

- Visitor finds Gmail (or any registered connector) on `/integrations`, sees grouped tools and 2+ real marketplace workflows.
- Visitor opens `/marketplace/workflows/...`, sees connectors required, clicks through to integration pages, installs via Console.
- Integration count on homepage matches platform DB, not repo catalog file count.
- Only connectors with real content get sitemap/prerender entries; others remain discoverable via index search.
- No marketing page claims tools or triggers that are not in committed catalog JSON.

---

## 12. References

- Console marketplace: `webapp/src/pages/Marketplace.tsx`, BFF `handlers/marketplace_*.go`
- Workflow sharing: `docs/workflows/WORKFLOW_SHARING.md`
- Marketplace roadmap: `docs/agent/AGENT_PACKAGES_MARKETPLACE_ROADMAP.md`
- Site analysis: `agentruntime-site/COMPOSIO_SITE_ANALYSIS.md`
- Slack detail pattern: `agentruntime-site/src/lib/integrationDetails.ts`
- Docs connector pages: `agentruntime-docs/connectors/{slug}.mdx`

# Home Page Copy Brief

Last updated: 2026-10-18

## Handoff context

This file is the working copy of the brief. Update it here, in git, so every machine and every Claude session sees the same version. The original draft lives at [claude.ai](https://claude.ai/code/artifact/97f035c2-6f11-4040-a3b1-c7467773dbe8) and is no longer kept in sync.

Where things stand:

- Branch `develop`. Commit `36d4e79` finished the home page layout pass: white background, light grey section bands (`--marketing-band`), hero badge and statement band removed, problem and execution-model sections merged into one problem → answer list, a real API call on the builders card, and integration logos with a fallback list.
- The copy rewrite has not started. It waits on the research checklist below.
- Do not change the workflow demo (`ProductStage`) or the integrations section as part of the copy rewrite.
- Files involved: `src/pages/Home.tsx` (page copy), `src/lib/marketingCatalog.ts` (shared product surfaces and audience data), `src/styles/marketing.css` (styles and color tokens).
- Run locally with `npm run dev` (port 3080). The connectors API at `localhost:8080` is optional; the integrations section falls back to six built-in logos without it.
- `docs/brand-design-system.md` is out of date (it describes a blue palette). The current color tokens are at the top of `src/styles/marketing.css`.
- `docs/business.md` flags fabricated testimonials and placeholder content, which is relevant to the proof rows below.

## Goal

We gather the facts in this brief first, then rewrite the home page copy section by section. The layout pass is already done (commit `36d4e79` on `develop`); this brief covers words only.

The current copy reads as AI-written because it is abstract: slogans, lists of nouns, and claims with no names or numbers behind them. Concrete copy needs material only we have — customers, numbers, real workflows, named systems.

How to use it:

1. Check the page structure (next section) and confirm what is in scope.
2. Work through the research checklist, assigning an owner and status to each row.
3. When most rows are found, draft each section from the facts, following the writing rules.

## Page structure

Six of the eight sections get new copy; the workflow demo and the integrations section stay as they are for now.

| # | Section | Its job | Current headline | Copy in scope |
| --- | --- | --- | --- | --- |
| 1 | Hero | Say what AgentRuntime is, who it is for, and the outcome, in five seconds | Put AI inside the way your business actually runs. | Yes |
| 2 | Workflow demo | Show one real run end to end | Connected support (interactive) | No, leave as is |
| 3 | Product surfaces | Name the four parts of the product and what each does | Four surfaces. One execution model. | Headline and intro only |
| 4 | Problem and answer | Where AI projects break, and what the runtime does about each | Most AI projects stop exactly where real business begins. | Yes |
| 5 | Who it is for | Send each audience to its solution page | Start from the responsibility your team already owns. | Headline only |
| 6 | Integrations | Show the systems we connect to | Connect the stack you already operate. | No, later |
| 7 | Two entry points | Separate the operations path from the builder path | Adopt AgentRuntime from the workflow or from the infrastructure. | Yes |
| 8 | Closing call to action | Ask for the conversation and say what happens next | Start with one workflow that matters. | Yes |

The product surface cards (section 3) and audience rows (section 5) come from shared data that also feeds the Platform and Solutions pages and the nav menu, so rewriting them changes those pages too. The page's search title and description are also separate and not yet in scope.

## Section by section

Each in-scope section needs a short list of facts before anyone writes it. The checklist below tracks who finds them.

| Section | What it must say | Facts needed to write it |
| --- | --- | --- |
| Hero | What AgentRuntime is in plain words, who buys it, and the result they get | The one-sentence definition the team agrees on; the main buyer's role; the workflow most customers run first; one proof point to sit under the buttons |
| Product surfaces | What each of the four parts lets someone do, in their words | Whether the four names are final; which parts are live today and which are planned; one concrete capability per part |
| Problem and answer | Three real ways AI projects break, each paired with the runtime feature that handles it | Three real failure stories from sales calls or customers; the feature that fixed each; any before and after number |
| Who it is for | Which teams use it and what they run | Which audiences current customers come from; one named workflow per audience, with the systems involved |
| Two entry points | What an operations team does in week one, and what a developer does in the first hour | First steps for each path; how a developer gets access (API key, docs, SDK); whether the human-task API call is the right example |
| Closing call to action | What happens after someone books, so the ask feels small | Call length and who joins; what they leave with; whether a pilot, trial or pricing can be mentioned |

## Research checklist

Seventeen facts to find, grouped by what they unlock; add an owner to each row and move its status as you go (To find, Found, Not available). Put the answer, or a link to it, in the Notes column.

| Fact to find | Group | Where to look | Owner | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| One-sentence definition of AgentRuntime the team agrees on | Positioning | Founders |  | To find |  |
| Main buyer's role, and who signs | Positioning | Sales calls, CRM |  | To find |  |
| Alternatives prospects compare us to (tools or in-house builds) | Positioning | Sales calls, lost deals |  | To find |  |
| The one thing we do that those alternatives don't | Positioning | Founders, sales |  | To find |  |
| Customer names we are allowed to show | Proof | Customer agreements |  | To find |  |
| One or two customer stories with before and after numbers | Proof | Customer success, customers |  | To find |  |
| A customer quote with name and job title | Proof | Customers |  | To find |  |
| Usage numbers we can publish (runs, steps, uptime) | Proof | Product analytics |  | To find |  |
| Which of the four product parts are live and which are planned | Product | Product team |  | To find |  |
| Failures the runtime handles today and how (retries, fallback steps, timeouts, approvals) | Product | Engineering, API spec |  | To find |  |
| Ways a run can start today (API, webhook, schedule, event) | Product | Engineering |  | To find |  |
| Security and compliance facts we can state | Product | Security, Enterprise page |  | To find |  |
| How a developer gets started, and time to first run | Product | Developer docs, engineering |  | To find |  |
| Which audiences current customers come from | Audiences | CRM |  | To find |  |
| One real workflow per audience, with systems and owners | Audiences | Solution pages, customers |  | To find |  |
| What happens after someone books a conversation | Offer | Sales |  | To find |  |
| Pilot, trial or pricing wording we can publish | Offer | Founders |  | To find |  |

## What we already know

Ten facts are already on record in the site's own code; the API spec items are confirmed behavior, while the product catalog items are marketing claims that engineering should confirm.

| Fact | Source |
| --- | --- |
| A workflow has four step types: a tool call on an MCP server, a model call, a human task, and a sandboxed Lua script for rules | API spec (`public/openapi.yaml`) |
| A run can be started, paused, resumed or cancelled; its states are pending, running, paused, completed, failed and cancelled | API spec |
| At a human task the run pauses; a reviewer approves or rejects, and their notes go into the run's event log | API spec |
| On rejection, a step can retry (`retry_count`) or hand off to a fallback step | API spec |
| Apps get live events over a WebSocket stream: step started, completed or failed; human task created or completed; run completed or failed | API spec |
| Steps can use earlier steps' results and the run's starting data | API spec |
| The product has four parts: Workflow Studio (build), Runtime APIs (run), Command Center (operate), Control plane (govern) | Product catalog (`src/lib/marketingCatalog.ts`), to confirm |
| Runs can start from APIs, webhooks, schedules or events | Product catalog, to confirm |
| The home page demo runs a support ticket from Freshdesk, pulls HubSpot context, routes it to automatic or human review, and follows up in Slack | Home page demo data |
| We have logo files for Exa, Firecrawl, Freshdesk, Gmail, Google Drive, HubSpot, Notion, PostHog, QuickBooks and Slack | `public/integrations/` |

## Writing rules

Every line should contain something only AgentRuntime could say: a system name, a number, a role, or a real step.

| Avoid | Do instead | Example on the page today |
| --- | --- | --- |
| "Not X, it's Y" contrasts | State Y plainly | Built for real operations — not isolated prompts or one-off demos. |
| Short slogan headlines | Say what the reader gets | Four surfaces. One execution model. |
| Lists of three abstract nouns | One named example with real tools | context, judgment, synthesis, or natural-language interaction |
| Headlines that could fit any company | Add a name, number or system | Route every step to the right kind of intelligence. |
| Claims with no proof | Add a number or customer, or cut the claim | reliable workflows that can operate for minutes, days, or continuously |
| Dashes joining clauses | Two short sentences | Most dashes in the current copy |

Style check, not final copy:

- **Before:** Keep humans where they matter.
- **After:** Your billing lead approves the $48 credit. The run picks up where it stopped.

Numbers like $48 must come from a real or clearly illustrative run, never made up as a claim.

## Open questions and next steps

Two scope decisions and two research tasks come before drafting; the last step is the rewrite itself.

- [ ] Assign an owner to each row in the research checklist
- [ ] Decide whether the shared product cards and audience rows are rewritten here, which also changes the Platform and Solutions pages and the nav
- [ ] Decide whether the page's search title and description are rewritten with it
- [ ] Confirm with engineering the two product catalog claims marked "to confirm"
- [ ] Once most rows are found, Claude drafts each section on the live page for review, then everything is committed together

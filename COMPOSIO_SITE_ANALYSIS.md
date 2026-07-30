# Composio Website Reference Analysis

Reviewed: July 30, 2026  
Reference: [composio.dev](https://composio.dev)

## Purpose

This document records the useful patterns observed across the Composio marketing
site and translates them into concrete opportunities for the AgentRuntime
website. It is a reference, not a recommendation to copy Composio's branding or
claims.

The review covered:

- [Homepage](https://composio.dev/)
- Product mega menu
- Solutions mega menu
- [Toolkits directory](https://composio.dev/toolkits)
- [Gmail toolkit detail](https://composio.dev/toolkits/gmail)
- [Use-case directory](https://composio.dev/use-cases)
- [Unread-email use case](https://composio.dev/use-case/summarize-unread-emails)
- Desktop and mobile navigation behavior

## Executive summary

Composio's main strength is not its gradients or animation. It is the way the
same platform is explained through three different visitor mental models:

1. **Products** answer: "What can I buy or use?"
2. **Solutions and use cases** answer: "What can I accomplish?"
3. **Toolkits** answer: "Does it work with the applications I already use?"

Each overview leads to a more specific page. Those detail pages combine
marketing, product data, setup guidance, related content, and a contextual CTA.
This gives visitors multiple entry points without creating disconnected
content.

AgentRuntime already has the correct top-level foundation:

- `/platform`
- `/solutions`
- `/integrations`
- `/integrations/:slug`

The largest remaining opportunity is to make the content below those routes
more specific, data-backed, and interconnected.

## 1. Information architecture

### Product navigation

Composio groups product offerings by the type of buyer or deployment:

- A user-facing product
- Developer platform
- CLI
- Enterprise
- MCP gateway

The product mega menu includes a short explanation under each item. This lets a
visitor choose based on intent rather than having to understand internal
product terminology first.

### Solutions navigation

Solutions are divided into two dimensions:

- **For agents:** Claude, Codex, Cursor, and other agent environments
- **Built for:** office work, sales, marketing, product and design, customer
  support, engineering, HR, finance, ecommerce, content, and security

This is useful because visitors may arrive knowing either their technical
environment or their business function.

### Toolkit navigation

Integrations are treated as a first-class destination rather than a supporting
feature buried inside the product page. The directory, integration details, and
use-case pages cross-reference one another.

### AgentRuntime implication

The current AgentRuntime navigation direction is sound:

- Product should describe the platform surfaces.
- Solutions should cover audiences and repeatable workflows.
- Integrations should expose connector capabilities.

The next improvement should be deeper destination pages, not additional
top-level navigation.

## 2. Homepage observations

### Hero

The homepage uses one clear promise:

> Everything your agents need to take action.

The supporting sentence immediately adds concrete capability categories:
integrations, delegated authentication, sandboxed execution, and parallel
execution.

Two CTAs serve different buyer readiness levels:

- Start immediately
- Request a demo

### Product evidence

The page uses recognizable integration and customer logos directly below the
hero. It then shows product behavior through interface-like scenes rather than
generic decorative illustrations.

AgentRuntime does not yet have customer proof, so it should not manufacture an
equivalent logo strip or unverified reliability claims. It can use verifiable
product evidence instead:

- Catalogued and production-ready connector counts, clearly distinguished
- Supported workflow step types
- Execution timeline states
- Human-intervention and approval capabilities
- Run observability and policy controls

### Interactive feature storytelling

The "Why Composio" section uses four selectable topics:

1. Smart tools
2. Constant evolution
3. End-user authentication
4. Dynamic sandbox

Selecting a topic changes both the product visual and the supporting content.
This creates one strong Level-1 story instead of four equally weighted cards.

AgentRuntime's interactive product mockups are directionally similar. They
should eventually use realistic workflow and run data so that interaction
demonstrates behavior rather than only changing presentation.

### Product-to-workflow bridge

The "One product, every workflow" section connects platform capabilities to
recognizable outcomes such as creating tickets, opening pull requests, sending
reports, and scheduling work. This translates infrastructure into user value.

### Security

Security is presented as a dedicated high-contrast section with selectable
topics and a link to deeper material. It is not reduced to a row of badges.

AgentRuntime can use the same content principle for:

- Tenant isolation
- Role and policy controls
- Audit history
- Human approval boundaries
- Private deployment options

Only implemented and documented capabilities should be presented as available.

## 3. Toolkits directory

The directory is designed as a list/index page whose primary job is discovery.

### Observed structure

1. Integration-focused hero
2. Real application logos used as the main visual
3. Search input
4. Sort control
5. Category navigation with result counts
6. Result count and visible range
7. Three-column integration grid
8. Logo, name, and short description for every card

At review time, the directory displayed approximately 1,050 entries and showed
30 results in the initial range.

### Why it works

- Search is the primary action.
- Categories provide an alternative browsing path.
- Counts communicate catalog depth.
- Real logos make scanning substantially faster than monograms.
- Every card has a clear detail destination.
- The layout supports both known-item search and exploratory browsing.

### Risks visible in the reference

Some category names overlap, including variations of analytics, data,
marketing, and social media. AgentRuntime should use one canonical taxonomy and
avoid assigning near-identical category labels.

### AgentRuntime recommendation

Extend the existing integrations directory with:

- Real, locally managed logo assets
- Category result counts
- Alphabetical and capability-based sorting
- Availability or maturity filters
- Authentication filters
- Trigger support filters
- Verified tool counts where available
- Related workflow labels

Status must be explicit. A catalogued connector, a tested connector, and a
production-ready connector are not equivalent states.

## 4. Integration detail pages

The Gmail page is a strong example of a detail page that serves both evaluation
and implementation.

### Observed hero information

- Integration-specific H1
- Plain-language explanation of supported outcomes
- Application logo
- Authentication type (`OAUTH2`)
- Tool count (`61`)
- Trigger count (`2`)
- Start and demo CTAs

### Observed page sections

1. Interactive "Try Gmail now" area
2. Supported tools and triggers
3. MCP connection instructions
4. Direct API connection instructions
5. Reasons to use the platform
6. Managed authentication explanation
7. Agent-optimized execution explanation
8. Enterprise security controls
9. Framework-specific setup options
10. Related toolkits
11. Frequently asked questions
12. Contextual final CTA

### Why it works

The page answers the main visitor questions in sequence:

1. Can this integration do what I need?
2. How is it authenticated?
3. Which operations are supported?
4. How do I install or connect it?
5. Is it safe enough for production?
6. What can I combine it with?

### AgentRuntime integration-page blueprint

Each AgentRuntime integration page should eventually support:

1. **Identity**
   - Name
   - Official logo
   - Category
   - Short capability statement
2. **Readiness**
   - Status
   - Last verified date
   - Authentication method
   - Supported deployment modes
3. **Capabilities**
   - Verified tools
   - Verified triggers
   - Read/write/destructive-operation indicators
4. **Example workflows**
   - Concrete workflows that use the connector
   - Required human checkpoints
5. **Quick start**
   - Installation or configuration steps
   - Minimal MCP or API example
6. **Operational controls**
   - Permission boundaries
   - Retry and error behavior
   - Auditability
7. **Related content**
   - Similar integrations
   - Relevant solution blueprints
   - Connector documentation
8. **Contextual CTA**
   - Start building
   - Read documentation
   - Discuss a production deployment

Content should come from connector manifests, validation results, and curated
metadata wherever possible. Unknown values should remain unknown rather than
being inferred.

## 5. Use-case directory

Composio does not stop at broad audience pages. It also publishes a directory of
small, concrete workflow blueprints.

Examples observed include:

- Summarize today's unread emails
- Catch up on Slack since yesterday
- Turn an email into a Notion task
- Send a quick email from any client
- Build a daily morning brief

Each card describes one recognizable job and displays the primary integration.
This makes the page task-oriented rather than feature-oriented.

### AgentRuntime implication

Keep the existing "who it is for" content, but add a reusable workflow library.
Audience pages explain relevance; workflow blueprint pages demonstrate
execution.

## 6. Use-case detail pages

The unread-email example follows a repeatable narrative:

1. Specific workflow title
2. Named operator and operating condition
3. Expected number of tool calls
4. Required integration
5. Copyable prompt
6. Current pain or manual process
7. Exact execution steps
8. Outcome
9. Related workflows

The page turns an abstract promise into something a visitor can understand and
try.

### AgentRuntime solution-page blueprint

Recommended route:

`/solutions/:workflow-slug`

Recommended content:

1. **Workflow identity**
   - Outcome-focused title
   - Intended team or role
   - Required systems
2. **Current problem**
   - Manual process
   - Failure modes
   - Why the process does not scale
3. **Trigger and inputs**
   - Starting event
   - Required context
4. **Execution graph**
   - Agent steps
   - Deterministic steps
   - Tool calls
   - Wait states
   - Human decisions
5. **Operational behavior**
   - Retry path
   - Failure path
   - Approval boundary
   - Audit output
6. **Result**
   - Produced artifact or system change
   - Completion state
7. **Reusable artifact**
   - Copyable prompt, workflow JSON, or starter template
8. **Related content**
   - Required integrations
   - Related workflows
   - Relevant product surfaces
9. **Contextual CTA**
   - Build this workflow
   - Import the template
   - Map a production version

Outcome claims must be framed as expected behavior unless supported by customer
or measured production evidence.

## 7. Cross-linking model

The most important structural idea is the relationship between products,
workflows, and integrations.

Example AgentRuntime path:

1. A visitor discovers "Incident response" under Solutions.
2. The blueprint shows Slack, PagerDuty, GitHub, and Sentry.
3. Each integration links to its supported operations and readiness.
4. The blueprint links to Workflow Studio and Command Center.
5. The CTA offers a starter graph or a production-mapping conversation.

The reverse path should also work:

1. A visitor searches for Slack.
2. The Slack page shows supported operations.
3. The page lists incident response, support escalation, and approval workflows.
4. The visitor opens a workflow blueprint and sees Slack in context.

This creates a connected content system rather than separate marketing silos.

## 8. Suggested content models

### Integration record

Useful fields include:

- `slug`
- `name`
- `description`
- `category`
- `logo`
- `status`
- `lastVerifiedAt`
- `authTypes`
- `toolCount`
- `triggerCount`
- `capabilities`
- `destructiveCapabilities`
- `docsUrl`
- `sourceUrl`
- `quickStart`
- `relatedIntegrationSlugs`
- `relatedWorkflowSlugs`

### Workflow blueprint record

Useful fields include:

- `slug`
- `title`
- `summary`
- `audience`
- `problem`
- `trigger`
- `inputs`
- `steps`
- `humanCheckpoints`
- `failurePath`
- `output`
- `integrationSlugs`
- `productSurfaceIds`
- `templatePath`
- `cta`

Structured records allow route generation, navigation, related-content blocks,
sitemap entries, and prerendering to remain synchronized.

## 9. Visual-system lessons

Patterns worth adapting:

- Large, direct headlines
- Small monospaced labels for technical context
- Strong black/white contrast
- One accent treatment per section
- Real integration logos as functional imagery
- Product visuals that show states and actions
- Clear borders and alignment instead of enclosing everything in rounded cards
- Motion used to explain execution, not as ambient decoration

Patterns not to copy directly:

- Composio's exact blue/cyan gradient treatment
- Its exact typography and visual brand
- Very dense mega-menu layouts
- Unsupported "production-ready" or reliability claims
- Customer logos without permission
- Large integration counts that mix different readiness levels

## 10. Technical observations

The served Composio site uses Next.js App Router assets. Its exact CMS and build
pipeline are not observable from the public site. However, the repeated toolkit
and use-case structures strongly suggest template-driven pages backed by
structured records.

AgentRuntime does not need a Next.js migration to reproduce this information
architecture. The current React/Vite application already supports:

- Dynamic React routes
- Catalog-backed rendering
- Static SEO asset generation
- Prerendered integration detail pages

The existing prerender and SEO generator can be extended to include workflow
blueprint routes in the same way it includes integration slugs.

## 11. Recommended implementation order

### Phase 1: establish two reference templates

Build one complete pair:

- Slack integration detail
- Incident-response workflow blueprint

Connect them in both directions and validate desktop, tablet, mobile, SEO, and
prerendered output.

### Phase 2: make integration content data-backed

- Add readiness and authentication metadata
- Add real logos
- Add verified tool and trigger information
- Add documentation and source links
- Generate related workflows

### Phase 3: publish the workflow library

- Start with 8–12 high-confidence workflows
- Add `/solutions/:workflow-slug`
- Add sitemap and prerender entries
- Add workflow filters by team, trigger, and integration

### Phase 4: strengthen discovery

- Add category counts and sorting to integrations
- Add readiness and capability filters
- Add workflow search
- Add cross-links to product surfaces

### Phase 5: improve homepage evidence

- Feature a real workflow blueprint
- Show an interactive execution path
- Link visible steps to product capabilities
- Use only verified product metrics and claims

## 12. Acceptance criteria

The content system is successful when:

- A visitor can enter through a product, workflow, or integration.
- Every route has an obvious next step.
- Integration capabilities and readiness are accurate.
- Workflow pages expose triggers, steps, human boundaries, and outcomes.
- Integration and workflow pages cross-link in both directions.
- Detail routes are prerendered and included in the sitemap.
- Mobile layouts preserve search, identity, and primary CTAs.
- No marketing claim exceeds the available product or validation evidence.


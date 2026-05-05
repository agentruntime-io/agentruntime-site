# Blog Cover Image Prompts

Prompts used to generate cover images via Cursor's `GenerateImage` tool.
All images follow the same base style: **dark navy background (`#0a0f1e`), flat illustration, 16:9, no text unless specified.**

To generate a new cover image, open a Cursor chat and say:
> "Generate an image: [paste prompt below]"
Then copy the output to `public/blog/` and add `coverImage: "/blog/filename.png"` to the post entry in `posts.ts`.

---

## Existing covers

### `blog-introducing.png`
> Dark tech blog cover image. A glowing rocket or launch signal being emitted from a sleek dark terminal/server node. Clean geometric lines radiate outward like a broadcast wave. Electric blue and indigo color scheme on deep navy background (#0a0f1e). Minimal flat illustration, 16:9. Represents a product launch and a new blog beginning. No text.

### `blog-why-agents-fail.png`
> Dark tech blog cover image. A cracked or shattered glowing circuit board in the center, with warning symbols and red error indicators around broken nodes. Some workflow graph edges are disconnected, dangling. Deep red and amber warning glows contrast against the dark navy background (#0a0f1e). Conveys failure and breakdown of AI agents in production. Flat illustration style, 16:9. No text.

### `blog-what-is-mcp.png`
> Dark tech blog cover image. Abstract visualization of a protocol or communication standard. Two glowing entities (an AI brain icon and a toolbox/wrench icon) connected by a glowing standardized plug or connector in the center, like a universal adapter. Clean geometric lines. The connector glows bright blue/cyan suggesting a new standard. Deep navy background (#0a0f1e). Flat illustration, 16:9. Represents MCP as the universal tool protocol for AI. No text.

### `blog-human-in-the-loop.png`
> Dark tech blog cover image. A workflow graph with glowing blue automated nodes on the left, flowing toward a central glowing amber node showing a human silhouette or hand icon — an approval gate. A green checkmark or pause symbol emanates from the human node before the workflow continues to the right. Represents human-in-the-loop control over AI automation. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-simulate-before-deploy.png`
> Dark tech blog cover image. A glowing aircraft or spacecraft on a runway with a pre-flight checklist overlay — green checkmarks ticking off items: schema, dependencies, graph, config. The checklist glows in neon green against a dark navy background (#0a0f1e). Suggests validation and safety before deployment. Clean, minimal flat illustration style, 16:9. No text.

### `blog-observability.png`
> Dark tech blog cover image. A multi-layered observability visualization: top layer shows a timeline trace bar (like Jaeger/Zipkin), middle layer shows nested spans as colored horizontal bars, bottom layer shows structured log lines glowing faintly. All three layers are connected by vertical dotted lines suggesting correlation. Electric blue, teal, and violet on deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-diy-vs-runtime.png`
> Dark tech blog cover image. Split composition: left side shows a tangled mess of wires, gears, and hand-written code snippets labeled "DIY" in a warm red/orange tone suggesting chaos and complexity. Right side shows a clean, minimal dark interface with glowing blue/indigo orchestration nodes connected by smooth lines, labeled "Runtime" — order and clarity. A subtle gradient divider separates the two halves. Deep dark navy background (#0a0f1e). Modern, flat illustration style, no text except "DIY" and "Runtime" labels. Wide 16:9 aspect ratio.

### `blog-versioning-immutability.png`
> Dark tech blog cover image. Abstract visualization of immutable versioning. A vertical stack of glowing rectangular "slabs" or layers, each slightly offset, labeled v1, v2, v3, v4 from bottom to top in a monospace font. Each slab has a subtle circuit-board texture. The top slab glows brightest in electric blue/indigo. A faint lock icon or seal on the completed lower slabs suggests they are frozen and immutable. Deep dark background (#0a0f1e). Clean, minimal flat illustration style. Wide 16:9 aspect ratio. No extra text.

### `blog-credential-management.png`
> Dark tech blog cover image. A glowing vault door (like a bank vault, circular with locking bolts) partially open, revealing digital key and credential icons inside — API keys, tokens, certificates shown as glowing cards. A red X over an environment variable file (.env) is shown outside the vault, contrasting with the secure interior. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-customer-support.png`
> Dark tech blog cover image. A customer support workflow pipeline visualization. Left to right: a chat bubble icon feeds into a classification node, then a CRM database node, then an AI brain/LLM node generating a draft, then a human review node with a checkmark, then a resolved ticket icon. All connected by glowing arrows. Warm teal and blue color scheme on deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-parallel-execution.png`
> Dark tech blog cover image. Abstract visualization of parallel fan-out and fan-in execution. A single glowing node on the left shoots multiple bright lines that fan outward to 4-5 parallel nodes in the middle, each doing independent work (small icons: database, LLM brain, API symbol, tool icon). All lines then converge back into a single result node on the right. The lines glow in different colors (blue, violet, teal, green) suggesting concurrent execution. Deep dark navy background (#0a0f1e). Flat, modern illustration style. Wide 16:9 aspect ratio. No text.

### `blog-multi-tenant.png`
> Dark tech blog cover image. An abstract multi-tenant architecture. Three isolated glowing "pods" or containers side by side, each a different color (blue, violet, teal), each containing a small workflow graph inside. A strong visual wall or separator between them suggests isolation. A shared infrastructure layer glows faintly beneath all three. Deep navy background (#0a0f1e). Flat illustration, 16:9. Represents multi-tenant AI infrastructure isolation. No text.

### `blog-retry-logic.png`
> Dark tech blog cover image. A looping circuit diagram showing a retry cycle: a glowing node attempts an operation, a red X appears, arrows loop back and try again with a timer/delay indicator, then a green checkmark on success. An idempotency key badge glows in the corner. Exponential backoff represented by widening gaps between retry arrows. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-agent-memory.png`
> Dark tech blog cover image. Three distinct glowing memory tiers visualized as concentric rings or layers: innermost ring is bright and fast (working memory, context window), middle ring is medium-glow persistent storage (run memory, database), outer ring is a large diffuse glow suggesting retrieval from a large store (long-term memory, vector DB). An AI brain icon sits at the center. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-rate-limits.png`
> Dark tech blog cover image. A traffic control metaphor: multiple glowing data streams (blue flowing lines) approaching a bottleneck gate. A rate limit meter or gauge glows amber showing capacity usage. Some streams flow through smoothly, one is held back by a red stop signal with a timer showing backoff delay. Cost meter visible in corner. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-testing-workflows.png`
> Dark tech blog cover image. A testing pyramid visualization with glowing layers: bottom layer (widest, brightest green) is unit tests, middle layer is integration tests with mock LLM icons, top layer is evaluation harness with human review symbol. A magnifying glass icon overlays the whole structure. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-timeouts.png`
> Dark tech blog cover image. A countdown timer or deadline clock glowing red/amber in the center, with a workflow graph around it. Some nodes glow green (completed), one node pulses amber (in progress, approaching deadline), a watchdog symbol (an eye or shield) monitors the scene. Arrows show timeout and cancellation signals propagating. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-structured-output.png`
> Dark tech blog cover image. An LLM response being validated against a schema. Left: a flowing text/prose output from an AI brain node. Center: a schema validator icon (document with checkboxes) with some fields checked green, one field glowing red for validation failure. Right: a corrected structured JSON object glowing blue/green. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-notebook-to-prod.png`
> Dark tech blog cover image. A split journey: left side shows a laptop with a Jupyter notebook icon in a warm amber glow (development, prototype). A bridge or transformation arrow leads to the right side showing a server rack or cloud infrastructure with cool blue/indigo glow (production). The gap between them is visible as a chasm with infrastructure icons crossing it: database, queue, monitoring dashboard. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-event-driven.png`
> Dark tech blog cover image. An event stream visualization: a flowing horizontal river of glowing event particles on the left. Multiple workflow nodes tap into the stream at different points, each lighting up as events arrive. A webhook icon, a calendar/schedule icon, and a database change icon feed into the stream. The stream flows into a durable queue buffer before reaching the workflow nodes. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-choosing-llm.png`
> Dark tech blog cover image. A three-tier model selection diagram. Top tier: a large glowing frontier model brain (expensive, bright gold/white). Middle tier: a medium brain node glowing blue. Bottom tier: a small fast brain node glowing teal. Arrows route different task types (classification icon, reasoning icon, generation icon) to the appropriate tier. Cost and speed indicators alongside each tier. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-workflow-code-config.png`
> Dark tech blog cover image. Split composition showing two workflow definition styles. Left side: clean code editor with a typed workflow graph structure in blue/teal syntax highlighting, suggesting expressiveness and engineering power. Right side: a YAML/config file with simple key-value pairs in a lighter style, suggesting simplicity but less flexibility. A scale or balance icon in the center weighing the two approaches. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-document-processing.png`
> Dark tech blog cover image. A document (PDF/paper icon) entering a multi-stage pipeline from left to right: first a text extraction funnel, then a chunking grid breaking content into blocks, then an AI brain extracting structured fields, then a validation checklist, then a database with a green checkmark. The pipeline flows smoothly with teal and blue glowing connectors. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-context-window.png`
> Dark tech blog cover image. A context window visualized as a glowing rectangular frame. Inside it, text content fills the frame — some sections highlighted in bright blue (relevant, used), other large sections dimmed and greyed out (ignored by the model). Outside the frame, overflow content is cut off with a red boundary indicator. A token counter gauge shows capacity usage near the limit. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-graceful-degradation.png`
> Dark tech blog cover image. A circuit breaker switch in the center glowing red in open state, protecting a downstream AI brain node. From the left, error signals approach but are stopped by the breaker. On the right, a fallback path glows green — an alternate route carrying data around the broken dependency. A health status indicator shows degraded but not down. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-webhook-security.png`
> Dark tech blog cover image. A webhook payload arriving at a layered security gate. The gate has multiple glowing security checks: an HMAC signature badge glowing green, a timestamp clock showing within-window validation, a deduplication fingerprint icon, and an IP shield. One incoming request passes all checks and flows through in blue. Another request is stopped at a red barrier representing invalid signature. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-self-hosted-llm.png`
> Dark tech blog cover image. A large GPU server cluster on the right glowing with power indicators showing significant infrastructure weight — multiple rack units, cooling systems, high cost meters. On the left, a simple API cloud icon with a modest cost indicator. An iceberg below the GPU cluster reveals hidden costs: engineering hours, model updates, latency tuning. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-code-review-agent.png`
> Dark tech blog cover image. A code diff pull request visualization with an AI agent scanning it. Green added lines and red removed lines visible. The AI agent magnifying glass highlights a specific code region with a red security warning badge. A confidence meter shows HIGH confidence on the finding. A separate low-confidence finding is dimmed and suppressed. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-chaining-vs-single.png`
> Dark tech blog cover image. Two paths diverge from the same starting node. Top path: a single large glowing AI brain processing everything in one call — fast, direct. Bottom path: four smaller brain nodes chained in sequence, each passing output to the next — more steps but higher latency. A decision diamond icon sits at the fork. Speed and quality tradeoff indicators glow alongside each path. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-sla-design.png`
> Dark tech blog cover image. An SLA monitoring dashboard with four glowing metric panels arranged in a 2x2 grid: availability percentage bar in green, latency P99 gauge in amber approaching threshold, quality score trend line in blue, consistency variance indicator in teal. One panel shows a warning indicator suggesting a quality SLA threshold was crossed. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-compliance.png`
> Dark tech blog cover image. A compliance audit trail pipeline. A document enters on the left, flows through AI review nodes glowing blue with a flagged clause highlighted, then reaches a human reviewer approval gate glowing amber, then a final immutable sealed record node on the right with a lock icon. Below the flow, a chain of linked record hashes represents a tamper-proof audit log. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-lead-enrichment.png`
> Dark tech blog cover image. A sales pipeline visualization with AI enrichment. A lead card (person icon) enters on the left and flows through enrichment stages: research magnifying glass, company data nodes, ICP scoring gauge showing a high score, personalization sparks, then lands in a CRM database on the right glowing green as "enriched". Clean pipeline flow with teal and blue accent colors. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

---

## Template for new posts

Copy this block and fill in the details:

```
Dark tech blog cover image. [CONCEPT: describe the main visual metaphor in 1-2 sentences].
[ELEMENTS: list the key icons, nodes, or visual components and their colors/states].
[MOOD: describe what emotion or idea the image should convey].
Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.
```

### Tips for consistent results
- Always specify `deep navy background (#0a0f1e)` to match the site's dark theme
- Always end with `Flat illustration, 16:9. No text.` for consistency
- Use colors from the site palette: electric blue, indigo/violet, teal, green (success), amber (warning), red (error)
- Anchor each image to a concrete visual metaphor (pipeline, vault, pyramid, fan-out) rather than abstract shapes
- Mention specific icons (brain, database, wrench, shield, checkmark) for clearer output

---

## Batch 3 (posts 33–50)

### `blog-prompt-engineering.png`
> Dark tech blog cover image. A prompt text block in a code editor with a version tag badge glowing blue in the corner. An evaluation test suite icon shows green passing tests below it. A git diff indicator shows a prompt change being reviewed. Suggests disciplined, version-controlled prompt management. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-multi-agent.png`
> Dark tech blog cover image. A central orchestrator node glowing bright blue in the middle, with four specialist agent nodes surrounding it — each a different color (research teal, writing violet, fact-check amber, classification green). Arrows flow from the orchestrator to specialists and back, showing coordination. Each specialist has a focused icon representing its task. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-pii-handling.png`
> Dark tech blog cover image. Personal data icons (person silhouette, email envelope, ID card) flowing through a pipeline with a privacy filter gate. Some data is redacted or masked (shown as blurred blocks) before entering the LLM brain node. A GDPR/compliance shield glows at the end of the pipeline. A data flow map diagram shows the full journey. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-prompt-injection.png`
> Dark tech blog cover image. A malicious text payload (shown as red glowing text with hazard symbol) attempting to enter an AI brain node from the left. Four defense layers intercept it: a structural separation barrier, a schema validator, a privilege scope limiter, and an output monitor. The payload is neutralized before reaching the model. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-zero-downtime.png`
> Dark tech blog cover image. Two overlapping workflow version deployment graphs. Old version v1 nodes glow dimly as they complete their in-flight runs. New version v2 nodes glow brightly as new runs start on them. A smooth transition arrow shows seamless handoff with zero gap in execution. A version tag badge floats above each run. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-provider-portability.png`
> Dark tech blog cover image. A thin abstraction layer in the center glowing teal, with multiple LLM provider logos as abstract glowing icons above it (blue circle, purple diamond, gradient hexagon). Below the abstraction layer, workflow step nodes connect cleanly regardless of which provider is active above. A failover arrow shows traffic rerouting when one provider dims. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-queue-design.png`
> Dark tech blog cover image. Multiple job queues visualized as parallel lanes with different colors and speeds. A fast bright blue lane for quick classification tasks, a slower violet lane for deep research workflows, a priority gold lane for live user requests. A rate limit gate controls throughput from all lanes before they reach a worker pool. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-workflow-debugging.png`
> Dark tech blog cover image. A detective magnifying glass examining a workflow trace. The trace shows a run timeline with green completed steps and one red failing step highlighted. Inside the magnifying glass, the step's input data and LLM response are visible as structured cards. A replay button glows beside the failed step. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-research-assistant.png`
> Dark tech blog cover image. A research workflow visualization: a question mark node on the left spawns multiple parallel search arrows going to different data source icons (web, database, news, financial data). Results flow back and converge into a synthesis brain node that produces a structured research report card on the right. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-invoice-processing.png`
> Dark tech blog cover image. An invoice document with PDF icon arrives on the left. It passes through a pipeline of five numbered stages: intake funnel, field extraction grid, PO matching link, GL coding label, approval checkmark. Each stage is a glowing node connected by arrows. An ERP database icon sits at the end. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-hr-automation.png`
> Dark tech blog cover image. A resume document icon on the left feeds into a scoring matrix with weighted bars. A calendar grid in the center shows interview slots being matched across multiple calendars. A feedback aggregation card on the right shows structured star ratings from multiple reviewers. A compliance shield floats above the whole scene. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-content-moderation.png`
> Dark tech blog cover image. A funnel with three layers: bottom layer showing fast automated rule filters (green check marks), middle layer showing an LLM brain analyzing nuanced content (amber), top layer showing a human reviewer with a decision card (blue). Flagged content flows up through layers. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-content-generation.png`
> Dark tech blog cover image. A content brief card on the left (structured fields: topic, keyword, angle, tone) feeds into a writing AI brain node. Multiple distinct output document cards fan out to the right, each with a different visual style suggesting unique angles. A quality score badge glows green on each approved card. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-ecommerce-orders.png`
> Dark tech blog cover image. An e-commerce shopping cart icon spawns three workflow branches: a fraud shield branch (red/amber), a package exception branch (orange), and a customer chat inquiry branch (teal). Each branch shows decision nodes with human escalation paths and automated resolution paths. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-ai-monitoring.png`
> Dark tech blog cover image. Multiple metric lines on a dark chart, most flat and unremarkable. A subtle multi-signal convergence pattern glows red-orange — three lines all trending slightly wrong simultaneously. An AI analysis node detects the correlation and sends an alert card to an on-call engineer before any single threshold is crossed. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-cold-start.png`
> Dark tech blog cover image. A timeline showing four phases of agent confidence calibration. Phase 1: a dim agent node with a human observer reviewing everything. Phase 2: agent handles some cases, human handles ambiguous ones. Phase 3: mostly automated with a small review queue. Phase 4: fully automated with a sampling indicator. A confidence dial increases from left to right. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-roi-measurement.png`
> Dark tech blog cover image. A balance scale in the center: left pan holds cost icons (dollar symbol, engineering gears, infrastructure servers), right pan holds value icons (time compression arrows, quality score badge, throughput chart). Above the scale, a rising ROI graph with percentage markers. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

### `blog-tracing-vs-logging.png`
> Dark tech blog cover image. Split comparison: left side shows a wall of raw log lines (dim, hard to read, chaotic). Right side shows a clean distributed trace tree — root span with child step spans and grandchild LLM call spans, each with input/output structured cards. A magnifying glass highlights the contrast. Deep navy background (#0a0f1e). Flat illustration, 16:9. No text.

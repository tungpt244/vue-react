# Phase 2: First 5 Topics - Context

**Gathered:** 2026-03-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver sidebar navigation + 6 live interactive topic demos (Template/JSX, Reactivity, Computed, Watchers, Lifecycle, Class & Style Bindings) establishing the content pattern for all future phases. Each topic has a working interactive demo on both Vue and React sides, plus explanation text highlighting key differences.

</domain>

<decisions>
## Implementation Decisions

### Sidebar Navigation
- **D-01:** Sidebar lives in the host app (React side), shared between both panels — it controls navigation for both Vue and React via existing React Router + CustomEvent bridge
- **D-02:** Left sidebar, collapsible — standard learning tool pattern, avoids eating demo space on smaller screens
- **D-03:** Topics grouped by category in sidebar, using topic registry from `@vibe/shared` as data source

### Topic Component Structure
- **D-04:** Each topic is a single component (`.vue` / `.tsx`) with demo + explanation inline — simplest approach for establishing patterns, refactor later if needed
- **D-05:** Explanation text lives inline in each topic component as JSX/template — no separate data files, content is code
- **D-06:** Follow existing PascalCase file naming + `import.meta.glob` lazy loading pattern from Phase 1

### Explanation Format
- **D-07:** Short paragraph(s) highlighting key differences between Vue and React approaches — keeps focus on live demos, not wall of text
- **D-08:** Explanation appears below the live demo in each topic component

### Demo Interactivity
- **D-09:** Fully interactive demos — buttons, inputs, state changes responding to user input (counter, toggle, form, etc.)
- **D-10:** Each demo must be self-contained within its topic component (no shared state between topics)

### Topic Registry
- **D-11:** Expand topic registry in `@vibe/shared` from 2 entries to all 6 Phase 2 topics (template-syntax, reactivity, computed, watchers, lifecycle, class-style-bindings)

### Claude's Discretion
- Sidebar width and collapse mechanism (icon toggle, hover, etc.)
- Exact demo scenarios for each topic (what the counter counts, what the toggle toggles, etc.)
- Styling details — Tailwind classes, spacing, colors within the established design system
- Category display order in sidebar
- Loading/fallback states for lazy-loaded topic components

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Architecture
- `PROJECT_BRIEF.md` — Full project brief with topic list, structure, routing flow
- `.planning/PROJECT.md` — Project context, core value, constraints
- `.planning/REQUIREMENTS.md` — Phase 2 requirements: NAV-01, NAV-02, NAV-03, DISP-01, DISP-02, ESS-01/02/03/08/10/11
- `.planning/research/STACK.md` — Technology versions (React 19, Vue 3.5, TailwindCSS 4, React Router 7)
- `.planning/research/ARCHITECTURE.md` — System structure, dual-root mount, event bridge

### Phase 1 Context
- `.planning/phases/01-infrastructure-scaffold/01-CONTEXT.md` — Infrastructure decisions, package naming, code formatting

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `packages/react-app/src/components/TopicRenderer.tsx` — Lazy-loads topic components via `import.meta.glob`, PascalCase convention
- `packages/vue-app/src/components/TopicRenderer.vue` — Same pattern for Vue side with `defineAsyncComponent`
- `packages/react-app/src/components/Layout.tsx` — React layout with framework badge, route display, `<Outlet />`
- `packages/react-app/src/router.tsx` — React Router with `/:category/:topicId` pattern
- `packages/shared/src/topics.ts` — Topic registry with `getTopicsByCategory()` and `findTopic()` helpers
- `packages/shared/src/types.ts` — `TopicMeta`, `Category` union type, `RouteChangeDetail`

### Established Patterns
- Topic file convention: `src/topics/{category}/{PascalCase}.tsx|.vue`
- Lazy loading via `import.meta.glob` + `lazy()` (React) / `defineAsyncComponent` (Vue)
- Tailwind utility classes for all styling
- CSS Grid `1fr 1fr` for side-by-side layout in `#app-shell`
- React Router dispatches `CustomEvent('route-change')` → Vue app listens and renders

### Integration Points
- Sidebar will be added to host app HTML or React Layout component
- Topic registry needs 4 new entries (computed, watchers, lifecycle, class-style-bindings)
- Layout.tsx needs sidebar integration alongside existing `<Outlet />`

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches. Key patterns to follow:
- Existing placeholder topics (TemplateSyntax, Reactivity) show the file structure — replace placeholders with real interactive demos
- Sidebar should use `getTopicsByCategory()` from shared package for consistency

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-first-5-topics*
*Context gathered: 2026-03-27*

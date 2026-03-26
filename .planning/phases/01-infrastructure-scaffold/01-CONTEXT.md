# Phase 1: Infrastructure Scaffold - Context

**Gathered:** 2026-03-26
**Status:** Ready for planning

<domain>
## Phase Boundary

Scaffold pnpm monorepo với 4 packages (@vibe/shared, @vibe/vue-app, @vibe/react-app, @vibe/host). Cả Vue 3 và React mount side-by-side trên cùng 1 page. React Router quản lý URL, Vue sync qua CustomEvent. TypeScript và Vite config validated. HMR hoạt động cho cả 2 frameworks.

</domain>

<decisions>
## Implementation Decisions

### Package Naming
- **D-01:** Scoped packages: `@vibe/shared`, `@vibe/vue-app`, `@vibe/react-app`, `@vibe/host`

### Code Formatting
- **D-02:** Prettier — single quotes, no semicolons

### Claude's Discretion
- Topic registry data structure (fields, nested vs flat)
- Placeholder content cho topics chưa implement
- Dev workflow (single command vs multiple terminals)
- Port config, auto-open browser behavior
- TypeScript strictness level
- ESLint config details

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Architecture
- `PROJECT_BRIEF.md` — Full project brief với structure, routing flow, layout, topics list
- `.planning/PROJECT.md` — Project context, core value, constraints
- `.planning/REQUIREMENTS.md` — 42 v1 requirements, Phase 1 covers INFRA-01→07
- `.planning/research/STACK.md` — Technology recommendations with versions (Vite 8, Vue 3.5, React 19, TailwindCSS 4, etc.)
- `.planning/research/ARCHITECTURE.md` — System structure, dual-root mount, event bridge, build order
- `.planning/research/PITFALLS.md` — Vite plugin collision, CustomEvent race condition, Tailwind pipeline

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — greenfield project, no existing code

### Established Patterns
- None yet — Phase 1 establishes all foundational patterns

### Integration Points
- Topic registry from `@vibe/shared` consumed by both vue-app and react-app
- Host app imports and boots both framework apps
- CustomEvent bridge connects React Router to Vue app

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches. Research docs recommend:
- Vite multi-plugin with explicit `include` patterns to avoid transform conflicts
- Vue app reads `window.location` on mount as fallback (race condition prevention)
- Single Tailwind pipeline (not separate configs per app)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-infrastructure-scaffold*
*Context gathered: 2026-03-26*

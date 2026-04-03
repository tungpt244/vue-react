---
phase: 01-infrastructure-scaffold
plan: 02
subsystem: infra
tags: [react-router, vue, react, custom-event, routing, import-meta-glob]

# Dependency graph
requires:
  - phase: 01-infrastructure-scaffold/01
    provides: monorepo scaffold, shared types/constants/topics, host mount points, Vite config
provides:
  - React app shell with Router v7 and /:category/:topicId routing
  - Vue app shell with CustomEvent-based route sync
  - useRouteDispatch hook (React -> window CustomEvent bridge)
  - useRouteSync composable (window CustomEvent -> Vue reactive state)
  - Dynamic topic component resolution via import.meta.glob in both frameworks
  - 2 placeholder topics (TemplateSyntax, Reactivity) in both apps
affects: [01-infrastructure-scaffold/03, 02-content-topics]

# Tech tracking
tech-stack:
  added: []
  patterns:
    [
      CustomEvent bridge for cross-framework routing,
      import.meta.glob for dynamic component loading,
      URL fallback on mount for race condition handling,
    ]

key-files:
  created:
    - packages/react-app/src/main.tsx
    - packages/react-app/src/App.tsx
    - packages/react-app/src/router.tsx
    - packages/react-app/src/components/Layout.tsx
    - packages/react-app/src/components/TopicRenderer.tsx
    - packages/react-app/src/hooks/useRouteDispatch.ts
    - packages/react-app/src/topics/essentials/TemplateSyntax.tsx
    - packages/react-app/src/topics/essentials/Reactivity.tsx
    - packages/react-app/env.d.ts
    - packages/vue-app/src/main.ts
    - packages/vue-app/src/App.vue
    - packages/vue-app/src/components/TopicRenderer.vue
    - packages/vue-app/src/composables/useRouteSync.ts
    - packages/vue-app/src/topics/essentials/TemplateSyntax.vue
    - packages/vue-app/src/topics/essentials/Reactivity.vue
    - packages/vue-app/env.d.ts
    - packages/host/env.d.ts
  modified:
    - packages/react-app/tsconfig.json
    - packages/react-app/package.json
    - packages/vue-app/tsconfig.json
    - packages/vue-app/package.json
    - packages/host/tsconfig.json
    - packages/shared/tsconfig.json
    - tsconfig.base.json
    - pnpm-lock.yaml

key-decisions:
  - 'Replaced TS project references with paths-based resolution -- composite/references conflicted with noEmit typecheck workflow'
  - 'Added vite as devDep to react-app and vue-app for import.meta.glob type support'

patterns-established:
  - 'CustomEvent bridge: React dispatches ROUTE_CHANGE_EVENT, Vue listens with useEventListener'
  - 'URL fallback: Vue reads window.location.pathname on mount for initial state'
  - "Dynamic topic loading: import.meta.glob('../topics/**/*.tsx|vue') with PascalCase slug mapping"
  - 'Framework badges: React uses bg-cyan-400, Vue uses bg-emerald-500'

requirements-completed: [INFRA-03, INFRA-04, INFRA-01]

# Metrics
duration: 5min
completed: 2026-03-26
---

# Phase 01 Plan 02: App Shells Summary

**React Router v7 with CustomEvent bridge to Vue, dynamic topic loading via import.meta.glob, and URL fallback for initial route sync**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-26T09:44:05Z
- **Completed:** 2026-03-26T09:49:08Z
- **Tasks:** 2
- **Files modified:** 25

## Accomplishments

- React app shell with Router v7 handling /:category/:topicId, dispatching CustomEvent on navigation
- Vue app shell with useRouteSync composable listening for CustomEvent + URL fallback on mount
- Both apps dynamically resolve topic components via import.meta.glob with PascalCase slug mapping
- 2 placeholder topics (TemplateSyntax, Reactivity) in both apps with matching folder structure
- pnpm -r typecheck passes across all 4 packages (shared, react-app, vue-app, host)

## Task Commits

Each task was committed atomically:

1. **Task 1: React app shell -- router, layout, event dispatch, placeholder topics** - `e18de8a` (feat)
2. **Task 2: Vue app shell -- event listener, topic renderer, placeholder topics** - `c1d3a13` (feat)

## Files Created/Modified

- `packages/react-app/src/hooks/useRouteDispatch.ts` - Hook that dispatches CustomEvent on route param change
- `packages/react-app/src/components/TopicRenderer.tsx` - Dynamically loads topic component via import.meta.glob + lazy/Suspense
- `packages/react-app/src/components/Layout.tsx` - Shell layout with React 19 badge and Outlet
- `packages/react-app/src/router.tsx` - createBrowserRouter with /:category/:topicId route
- `packages/react-app/src/App.tsx` - Root component with RouterProvider
- `packages/react-app/src/main.tsx` - Mounts React app into #react-root
- `packages/react-app/src/topics/essentials/TemplateSyntax.tsx` - Placeholder topic (React side)
- `packages/react-app/src/topics/essentials/Reactivity.tsx` - Placeholder topic (React side)
- `packages/vue-app/src/composables/useRouteSync.ts` - Composable: listens for CustomEvent + URL fallback on mount
- `packages/vue-app/src/components/TopicRenderer.vue` - Dynamically loads topic component via import.meta.glob + defineAsyncComponent
- `packages/vue-app/src/App.vue` - Root component with Vue 3 badge and TopicRenderer
- `packages/vue-app/src/main.ts` - Mounts Vue app into #vue-root
- `packages/vue-app/src/topics/essentials/TemplateSyntax.vue` - Placeholder topic (Vue side)
- `packages/vue-app/src/topics/essentials/Reactivity.vue` - Placeholder topic (Vue side)
- `packages/vue-app/env.d.ts` - Vue SFC type declarations + vite/client reference
- `packages/react-app/env.d.ts` - Vite client type reference
- `packages/host/env.d.ts` - Vite client + Vue SFC type declarations

## Decisions Made

- Replaced TS project references (composite + references) with paths-based @vibe/shared resolution -- composite requires emit which conflicts with noEmit typecheck; since Vite resolves workspace packages via source imports, project references are unnecessary
- Added vite as devDependency to react-app and vue-app so import.meta.glob types are available for tsc
- Removed declaration/declarationMap from tsconfig.base.json -- not needed since packages are consumed as source, not as built artifacts

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed TS project references conflicting with noEmit typecheck**

- **Found during:** Task 2 (typecheck verification)
- **Issue:** TS6310 error: Referenced project 'shared' may not disable emit. composite: true + noEmit: true from base config are incompatible with project references.
- **Fix:** Removed composite/references from all tsconfigs, added paths-based @vibe/shared resolution instead. Removed declaration/declarationMap from base config.
- **Files modified:** packages/react-app/tsconfig.json, packages/vue-app/tsconfig.json, packages/host/tsconfig.json, packages/shared/tsconfig.json, tsconfig.base.json
- **Verification:** pnpm -r typecheck passes across all 4 packages
- **Committed in:** c1d3a13 (Task 2 commit)

**2. [Rule 3 - Blocking] Added vite devDependency for import.meta.glob types**

- **Found during:** Task 2 (typecheck verification)
- **Issue:** TS2339: Property 'glob' does not exist on type 'ImportMeta'. vite/client types not available in react-app/vue-app.
- **Fix:** Added vite as devDep to both packages, created env.d.ts with vite/client reference
- **Files modified:** packages/react-app/package.json, packages/vue-app/package.json, packages/react-app/env.d.ts, packages/vue-app/env.d.ts, pnpm-lock.yaml
- **Verification:** pnpm -r typecheck passes
- **Committed in:** c1d3a13 (Task 2 commit)

**3. [Rule 3 - Blocking] Fixed host typecheck errors (jsx, CSS import, Vue SFC types)**

- **Found during:** Task 2 (typecheck verification)
- **Issue:** Host tsconfig missing jsx setting (needed for .tsx imports), missing vite/client types for CSS imports, missing Vue SFC declarations
- **Fix:** Added jsx: "react-jsx" to host tsconfig, created host/env.d.ts with vite/client + Vue SFC declarations
- **Files modified:** packages/host/tsconfig.json, packages/host/env.d.ts
- **Verification:** pnpm -r typecheck passes
- **Committed in:** c1d3a13 (Task 2 commit)

---

**Total deviations:** 3 auto-fixed (3 blocking)
**Impact on plan:** All fixes necessary for typecheck to pass. No scope creep -- these are infrastructure corrections for the tsconfig setup from Plan 01.

## Known Stubs

Placeholder topics are intentional stubs -- they will be replaced with real content in Phase 02 (content-topics):

- `packages/react-app/src/topics/essentials/TemplateSyntax.tsx` - placeholder text only
- `packages/react-app/src/topics/essentials/Reactivity.tsx` - placeholder text only
- `packages/vue-app/src/topics/essentials/TemplateSyntax.vue` - placeholder text only
- `packages/vue-app/src/topics/essentials/Reactivity.vue` - placeholder text only

These are explicitly part of the plan's scope (scaffold placeholder topics for route testing). Real content comes in Phase 02.

## Issues Encountered

None beyond the auto-fixed deviations above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Both apps mount and boot successfully
- React Router handles URL navigation with dynamic topic loading
- Vue syncs route state via CustomEvent bridge with URL fallback
- Ready for Plan 03 (navigation sidebar, code display) or Phase 02 (real topic content)

## Self-Check: PASSED

All 17 created files verified present. Both task commits (e18de8a, c1d3a13) verified in git log.

---

_Phase: 01-infrastructure-scaffold_
_Completed: 2026-03-26_

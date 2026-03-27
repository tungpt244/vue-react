---
phase: 02-first-5-topics
plan: 01
subsystem: ui
tags: [react, sidebar, navigation, react-router, tailwindcss, typescript]

# Dependency graph
requires:
  - phase: 01-infrastructure-scaffold
    provides: React Router setup, Layout.tsx, shared topic registry, side-by-side CSS grid

provides:
  - Sidebar navigation component (collapsible, category-grouped, active state)
  - Topic registry expanded to 6 topics (all Phase 2 essentials)
  - getAllCategories() helper function in shared package
  - app-shell CSS with sidebar-width CSS variable and smooth transition

affects:
  - 02-first-5-topics (all plans — sidebar is the navigation prerequisite)
  - future phases adding more topics (expand topics array in shared/src/topics.ts)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "CSS variable --sidebar-width on :root, mutated by Sidebar via document.documentElement.style"
    - "Fixed-position sidebar spanning full viewport height, app-shell shifted via margin-left"
    - "React Router useNavigate + useParams for active state detection in sidebar"

key-files:
  created:
    - packages/react-app/src/components/Sidebar.tsx
  modified:
    - packages/shared/src/topics.ts
    - packages/shared/src/index.ts
    - packages/shared/tsconfig.json
    - packages/react-app/src/components/Layout.tsx
    - packages/host/src/styles.css

key-decisions:
  - "Sidebar uses position:fixed so it spans both Vue and React panels visually (not just React panel)"
  - "CSS variable --sidebar-width coordinates sidebar width with app-shell margin-left without React state"
  - "packages/shared tsconfig overrides types to exclude vite/client (shared has no vite dependency)"

patterns-established:
  - "Sidebar: collapsed boolean state + useEffect to set CSS var on document root"
  - "Topic navigation: navigate(/{category}/{slug}) via useNavigate from react-router"
  - "Active topic detection: compare useParams() against topic.category + topic.slug"

requirements-completed: [NAV-01, NAV-02, NAV-03]

# Metrics
duration: 12min
completed: 2026-03-27
---

# Phase 2 Plan 01: Sidebar Navigation Summary

**Collapsible sidebar with 6 essentials topics, category grouping, and CSS-variable-based layout coordination shared across both Vue and React panels**

## Performance

- **Duration:** ~12 min
- **Started:** 2026-03-27T05:50:00Z
- **Completed:** 2026-03-27T06:02:00Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments

- Topic registry expanded from 2 to 6 topics (added: computed, watchers, lifecycle, class-style-bindings)
- Sidebar component created with collapse toggle, category grouping, active state highlight, and CSS variable coordination
- Layout.tsx updated to render Sidebar, styles.css updated with --sidebar-width and smooth transition

## Task Commits

Each task was committed atomically:

1. **Task 1: Expand topic registry + create Sidebar component** - `299edda` (feat)
2. **Task 2: Integrate sidebar into Layout + update app-shell CSS** - `777489a` (feat)

**Plan metadata:** (docs commit — see below)

## Files Created/Modified

- `packages/react-app/src/components/Sidebar.tsx` - Sidebar component (fixed position, collapsible, category-grouped topics)
- `packages/shared/src/topics.ts` - Added 4 topics + getAllCategories() helper
- `packages/shared/src/index.ts` - Export getAllCategories
- `packages/shared/tsconfig.json` - Override types to exclude vite/client
- `packages/react-app/src/components/Layout.tsx` - Import and render Sidebar
- `packages/host/src/styles.css` - Add --sidebar-width CSS variable + margin-left on app-shell

## Decisions Made

- Sidebar uses `position: fixed` so it visually spans both Vue and React panels (not just the React panel it's rendered in)
- CSS variable `--sidebar-width` set by Sidebar on `document.documentElement` coordinates with `margin-left` on `#app-shell` — no shared React state needed
- Sidebar rendered inside `#react-root` via Layout.tsx, but positioned absolutely to visually cover full viewport height

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed packages/shared tsconfig vite/client type error**
- **Found during:** Task 1 (typecheck verification)
- **Issue:** `tsconfig.base.json` declares `"types": ["vite/client", "node"]` but `packages/shared` has no vite dependency, causing `TS2688: Cannot find type definition file for 'vite/client'`
- **Fix:** Added `compilerOptions.types: ["node"]` override in `packages/shared/tsconfig.json` to exclude vite/client
- **Files modified:** packages/shared/tsconfig.json
- **Verification:** `pnpm -r typecheck` passes with zero errors across all 4 packages
- **Committed in:** 299edda (Task 1 commit)

**2. [Rule 1 - Bug] Fixed Set<Category> type incompatibility in getAllCategories**
- **Found during:** Task 1 (typecheck on shared package)
- **Issue:** `new Set(topics.map(t => t.category))` creates `Set<Category>` but `.has(c)` receives `string`, causing TS2345
- **Fix:** Explicitly typed Set as `Set<string>` to allow string comparison
- **Files modified:** packages/shared/src/topics.ts
- **Verification:** `pnpm -r typecheck` passes
- **Committed in:** 299edda (Task 1 commit)

---

**Total deviations:** 2 auto-fixed (1 blocking pre-existing issue, 1 TypeScript type bug)
**Impact on plan:** Both fixes necessary for typecheck to pass. No scope creep.

## Issues Encountered

- Pre-existing `packages/shared` typecheck failure due to base tsconfig including `vite/client` types — fixed as part of Task 1 (Rule 3)

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Sidebar navigation fully functional — topic selection drives both Vue and React panels via existing React Router + CustomEvent bridge
- 6 topics registered and visible in sidebar under "Essentials" category
- Ready for Plan 02: topic content implementation (template-syntax and reactivity)
- No blockers

---
*Phase: 02-first-5-topics*
*Completed: 2026-03-27*

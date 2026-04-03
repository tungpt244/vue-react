---
phase: 02-first-5-topics
plan: '02'
subsystem: ui
tags:
  [vue, react, topics, computed, reactivity, template-syntax, useMemo, useState]

requires:
  - phase: 02-01
    provides: TopicRenderer lazy-loading, sidebar navigation, layout scaffold

provides:
  - Interactive TemplateSyntax demo (Vue directives vs React JSX) on both sides
  - Interactive Reactivity demo (ref/reactive vs useState) on both sides
  - Interactive Computed demo (computed() vs useMemo) — new topic on both sides
  - Content pattern established: live demo + Key Differences explanation section

affects: [02-03, 02-04, all future topic plans]

tech-stack:
  added: []
  patterns:
    - 'Topic component pattern: demo section (border/padding) + explanation section (bg-slate-50)'
    - 'Buttons: px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm'
    - 'Inputs: border border-slate-300 rounded px-2 py-1 text-sm'
    - 'Summary boxes: bg-blue-50 rounded p-3'
    - 'Explanation: h3 text-sm font-semibold + p text-sm text-slate-600'

key-files:
  created:
    - packages/react-app/src/topics/essentials/Computed.tsx
    - packages/vue-app/src/topics/essentials/Computed.vue
  modified:
    - packages/react-app/src/topics/essentials/TemplateSyntax.tsx
    - packages/vue-app/src/topics/essentials/TemplateSyntax.vue
    - packages/react-app/src/topics/essentials/Reactivity.tsx
    - packages/vue-app/src/topics/essentials/Reactivity.vue

key-decisions:
  - 'Demo area uses border border-slate-200 rounded-lg p-4 mb-4 for consistent visual framing'
  - 'Explanation section uses bg-slate-50 rounded p-4 — visually separated from interactive demo'
  - 'All demos self-contained: no shared state, no props — each topic is independent'

patterns-established:
  - 'Topic pattern: <demo box> + <explanation box> — established by this plan, all future topics follow'
  - 'Vue topics: <script setup lang=ts> with composables, template directives (v-if/v-for/v-model/@click)'
  - 'React topics: function component with hooks (useState/useMemo), JSX conditionals and .map()'

requirements-completed: [ESS-01, ESS-02, ESS-03, DISP-01, DISP-02]

duration: 5min
completed: '2026-03-27'
---

# Phase 02 Plan 02: Interactive Topic Demos Summary

**3 interactive topics (6 files) with live demos + explanations: TemplateSyntax (directives vs JSX), Reactivity (ref/reactive vs useState), Computed (computed() vs useMemo)**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-03-27T05:50:00Z
- **Completed:** 2026-03-27T05:52:57Z
- **Tasks:** 2
- **Files modified:** 6 (4 replaced, 2 created)

## Accomplishments

- Replaced TemplateSyntax placeholder with profile card demo: toggle show/hide, v-if/v-for vs JSX conditionals/.map()
- Replaced Reactivity placeholder with counter + live form: ref/reactive/v-model (Vue) vs useState/onChange (React)
- Created Computed topic from scratch: shopping list with derived total/count/mostExpensive using computed() vs useMemo
- Established the canonical topic component pattern (demo box + explanation box) for all future topics

## Task Commits

1. **Task 1: TemplateSyntax + Reactivity topics (replace placeholders)** - `4bae966` (feat)
2. **Task 2: Computed topic (new files)** - `c34d8cc` (feat)

## Files Created/Modified

- `packages/vue-app/src/topics/essentials/TemplateSyntax.vue` - Profile card with v-if/v-for/@click directives + explanation
- `packages/react-app/src/topics/essentials/TemplateSyntax.tsx` - Same UI with JSX conditionals/map/onClick + explanation
- `packages/vue-app/src/topics/essentials/Reactivity.vue` - Counter + live form using ref/reactive/v-model + explanation
- `packages/react-app/src/topics/essentials/Reactivity.tsx` - Counter + live form using useState/onChange + explanation
- `packages/vue-app/src/topics/essentials/Computed.vue` - Shopping list with computed() for total/count/mostExpensive
- `packages/react-app/src/topics/essentials/Computed.tsx` - Shopping list with useMemo for total/count/mostExpensive

## Decisions Made

- Topic structure: demo area in bordered box, explanation in bg-slate-50 box below — clear visual separation
- All demos self-contained with no external dependencies or props — lazy-loading compatible
- Tailwind utility classes reused consistently across all 6 files — establishes style convention

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Self-Check: PASSED

All 6 files present on disk. Both task commits (4bae966, c34d8cc) confirmed in git log.

## Next Phase Readiness

- 3 of 5 essentials topics complete (TemplateSyntax, Reactivity, Computed)
- Topic component pattern established — plans 02-03 and 02-04 can follow same structure
- All files pass TypeScript typecheck

---

_Phase: 02-first-5-topics_
_Completed: 2026-03-27_

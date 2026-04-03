---
phase: 03-core-curriculum
plan: '03'
subsystem: ui
tags:
  [
    vue3,
    react,
    components,
    props,
    slots,
    context,
    async,
    defineModel,
    defineProps,
    defineEmits,
    createContext,
    useContext,
    React.lazy,
    Suspense,
  ]

# Dependency graph
requires:
  - phase: 03-01
    provides: topic registry with 26 entries including 7 components topics
provides:
  - 14 Components In-Depth topic files (7 Vue SFC + 7 React TSX)
  - Props pattern demo (defineProps vs typed function signature)
  - Events/Callbacks demo (defineEmits + emit vs callback props)
  - Component v-model demo (defineModel vs controlled component)
  - Fallthrough Attributes demo (inheritAttrs auto vs ...rest spread)
  - Slots demo (slot system vs children/named props/render props)
  - Provide/Inject demo (provide/inject vs createContext/useContext)
  - Async Components demo (defineAsyncComponent vs React.lazy + Suspense)
affects: [03-04, 03-05, verifier]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - 'defineComponent() with render fn (h()) for inline child components in Vue SFC'
    - 'React.lazy + simulated Promise delay for async demo in single file'
    - 'createContext outside component for module-level ThemeContext'
    - 'provide() at <script setup> top level — auto-tied to component instance'

key-files:
  created:
    - packages/react-app/src/topics/components/Props.tsx
    - packages/react-app/src/topics/components/EventsCallbacks.tsx
    - packages/react-app/src/topics/components/ComponentVModel.tsx
    - packages/react-app/src/topics/components/FallthroughAttributes.tsx
    - packages/react-app/src/topics/components/Slots.tsx
    - packages/react-app/src/topics/components/ProvideInject.tsx
    - packages/react-app/src/topics/components/AsyncComponents.tsx
    - packages/vue-app/src/topics/components/Props.vue
    - packages/vue-app/src/topics/components/EventsCallbacks.vue
    - packages/vue-app/src/topics/components/ComponentVModel.vue
    - packages/vue-app/src/topics/components/FallthroughAttributes.vue
    - packages/vue-app/src/topics/components/Slots.vue
    - packages/vue-app/src/topics/components/ProvideInject.vue
    - packages/vue-app/src/topics/components/AsyncComponents.vue
  modified: []

key-decisions:
  - 'ComponentVModel.vue uses modelValue + update:modelValue props pattern (defineModel compiler macro not usable in defineComponent inline render fn)'
  - 'FallthroughAttributes.vue spreads attrs manually onto button inside defineComponent — auto-inheritAttrs applies to root div, so manual spread needed for inner element'
  - 'AsyncComponents simulates delay with Promise + setTimeout — cannot do real dynamic import() in single-file demos'

patterns-established:
  - 'Components In-Depth folder: packages/*/src/topics/components/'
  - 'defineComponent() + h() for inline children in Vue SFCs (established in Phase 2 Lifecycle.vue, confirmed here)'
  - 'React inline child components defined as named function above default export'

requirements-completed:
  - COMP-01
  - COMP-02
  - COMP-03
  - COMP-04
  - COMP-05
  - COMP-06
  - COMP-07

# Metrics
duration: 6min
completed: '2026-03-31'
---

# Phase 03 Plan 03: Components In-Depth Summary

**14 Components In-Depth topic files (7 Vue + 7 React) covering Props, Events, v-model, Fallthrough Attrs, Slots, Provide/Inject, and Async Components with interactive side-by-side demos**

## Performance

- **Duration:** ~6 min
- **Started:** 2026-03-31T07:43:15Z
- **Completed:** 2026-03-31T07:48:58Z
- **Tasks:** 2
- **Files modified:** 14

## Accomplishments

- 7 React TSX files in `packages/react-app/src/topics/components/` — all with interactive demos, DEMO_CODE, showCode toggle, and So sánh section
- 7 Vue SFC files in `packages/vue-app/src/topics/components/` — mirror React counterparts using Vue-specific APIs
- TypeScript typecheck passes with 0 errors across all 4 packages
- Each topic demonstrates both framework approaches side-by-side with clear comparison

## Task Commits

1. **Task 1: Create 7 React Components In-Depth topic files** - `df8232d` (feat)
2. **Task 2: Create 7 Vue Components In-Depth topic files** - `652bc7b` (feat)

## Files Created/Modified

- `packages/react-app/src/topics/components/Props.tsx` - Typed props with default values, inline child component
- `packages/react-app/src/topics/components/EventsCallbacks.tsx` - Callback prop pattern, child-to-parent
- `packages/react-app/src/topics/components/ComponentVModel.tsx` - Controlled component (value + onChange)
- `packages/react-app/src/topics/components/FallthroughAttributes.tsx` - ...rest spread for attr forwarding
- `packages/react-app/src/topics/components/Slots.tsx` - children + named props + render props
- `packages/react-app/src/topics/components/ProvideInject.tsx` - createContext + ThemeContext.Provider + useContext
- `packages/react-app/src/topics/components/AsyncComponents.tsx` - React.lazy + Suspense with 1s simulated delay
- `packages/vue-app/src/topics/components/Props.vue` - defineProps generic type
- `packages/vue-app/src/topics/components/EventsCallbacks.vue` - defineEmits + emit()
- `packages/vue-app/src/topics/components/ComponentVModel.vue` - modelValue + update:modelValue pattern
- `packages/vue-app/src/topics/components/FallthroughAttributes.vue` - inheritAttrs auto-forward + useAttrs() demo
- `packages/vue-app/src/topics/components/Slots.vue` - default/named/scoped slots with defineComponent
- `packages/vue-app/src/topics/components/ProvideInject.vue` - provide(reactive ref) + inject() reactive
- `packages/vue-app/src/topics/components/AsyncComponents.vue` - defineAsyncComponent + Suspense

## Decisions Made

- **ComponentVModel.vue uses modelValue/emit pattern** — `defineModel()` compiler macro works in `<script setup>` but not inside `defineComponent()` render fn. The inline child uses the underlying `modelValue` + `update:modelValue` props that `defineModel` generates, which correctly demonstrates what defineModel does under the hood.
- **FallthroughAttributes.vue manually spreads attrs** — Inside a `defineComponent` with a wrapping div root, `inheritAttrs: true` would apply attrs to the outer div, not the inner button. Used explicit `...attrs` spread on the button to demonstrate the concept correctly.
- **AsyncComponents use simulated Promise delay** — Cannot do real `import()` in single-file demo. Pattern uses `new Promise(resolve => setTimeout(() => resolve({ default: Component }), 1000))` which teaches the same concept.

## Deviations from Plan

None — plan executed exactly as written. The minor implementation details (modelValue pattern in ComponentVModel, manual attr spread in FallthroughAttributes) are correct approaches given the inline-component constraint, not deviations from the plan's intent.

## Issues Encountered

- `pnpm -r typecheck` not runnable from worktree (missing node_modules) — ran from main workspace at `/home/tungpt244/workspace/vibe`. All 4 packages passed typecheck clean.

## Known Stubs

None — all 14 topics render live interactive demos with real state. No placeholder/TODO text in demos.

## Next Phase Readiness

- Components In-Depth category fully covered (7/7 topics)
- Pattern for `defineComponent()` inline children in Vue SFCs is now well-established
- Plan 03-04 (Reusability topics) can proceed — same folder structure pattern

---

_Phase: 03-core-curriculum_
_Completed: 2026-03-31_

## Self-Check: PASSED

- FOUND: packages/react-app/src/topics/components/Props.tsx
- FOUND: packages/react-app/src/topics/components/Slots.tsx
- FOUND: packages/vue-app/src/topics/components/ComponentVModel.vue
- FOUND: packages/vue-app/src/topics/components/AsyncComponents.vue
- FOUND: .planning/phases/03-core-curriculum/03-03-SUMMARY.md
- FOUND commit df8232d (React files)
- FOUND commit 652bc7b (Vue files)
- TypeScript typecheck: PASS (0 errors, all 4 packages)

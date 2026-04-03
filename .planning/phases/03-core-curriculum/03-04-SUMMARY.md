---
phase: '03'
plan: '04'
subsystem: 'topics/reusability + topics/built-in'
tags:
  [
    'vue',
    'react',
    'composables',
    'hooks',
    'directives',
    'plugins',
    'transitions',
    'keep-alive',
    'teleport',
    'suspense',
  ]
dependency_graph:
  requires: ['03-01']
  provides:
    [
      'REUS-01',
      'REUS-02',
      'REUS-03',
      'BTIN-01',
      'BTIN-02',
      'BTIN-03',
      'BTIN-04',
      'BTIN-05',
    ]
  affects: ['topic registry routing', 'sidebar navigation']
tech_stack:
  added: []
  patterns:
    - 'defineComponent() + h() for inline child components in Vue SFC (same pattern as 03-03)'
    - 'React.lazy() + Suspense for simulated async code splitting'
    - 'createPortal from react-dom for Teleport equivalent'
    - 'CSS transition + className toggle for React animation (no framer-motion)'
    - 'provide/inject for Vue plugin-like pattern in single-file demo'
key_files:
  created:
    - packages/react-app/src/topics/reusability/ComposablesHooks.tsx
    - packages/react-app/src/topics/reusability/CustomDirectives.tsx
    - packages/react-app/src/topics/reusability/Plugins.tsx
    - packages/react-app/src/topics/built-in/Transition.tsx
    - packages/react-app/src/topics/built-in/TransitionGroup.tsx
    - packages/react-app/src/topics/built-in/KeepAlive.tsx
    - packages/react-app/src/topics/built-in/Teleport.tsx
    - packages/react-app/src/topics/built-in/Suspense.tsx
    - packages/vue-app/src/topics/reusability/ComposablesHooks.vue
    - packages/vue-app/src/topics/reusability/CustomDirectives.vue
    - packages/vue-app/src/topics/reusability/Plugins.vue
    - packages/vue-app/src/topics/built-in/Transition.vue
    - packages/vue-app/src/topics/built-in/TransitionGroup.vue
    - packages/vue-app/src/topics/built-in/KeepAlive.vue
    - packages/vue-app/src/topics/built-in/Teleport.vue
    - packages/vue-app/src/topics/built-in/Suspense.vue
  modified: []
decisions:
  - 'Suspense.tsx: replaced JSX.Element type with ReactElement from react import — JSX namespace unavailable without explicit import'
  - 'KeepAlive.vue: uses defineComponent+h() for inline TabA/TabB — same pattern as AsyncComponents in 03-03'
  - 'Plugins.vue: uses provide/inject at component level to simulate plugin behavior in single-file demo'
metrics:
  duration: '7min'
  completed_date: '2026-03-31'
  tasks_completed: 2
  files_created: 16
---

# Phase 03 Plan 04: Reusability + Built-in Components Summary

**One-liner:** 16 topic files (8 React .tsx + 8 Vue .vue) for Reusability (composables/hooks, directives, plugins) and Built-in (Transition, TransitionGroup, KeepAlive, Teleport, Suspense) categories.

## Tasks Completed

| Task | Name                       | Commit  | Files                             |
| ---- | -------------------------- | ------- | --------------------------------- |
| 1    | Create 8 React topic files | 0ed1c67 | 3 in reusability/, 5 in built-in/ |
| 2    | Create 8 Vue topic files   | 7134c91 | 3 in reusability/, 5 in built-in/ |

## What Was Built

### Reusability (3 topic pairs)

**ComposablesHooks (REUS-01)**

- Vue: `useCounter` composable with dual independent counter demo
- React: `useCounter` custom hook — identical API, different primitives (ref vs useState)
- Key insight: same naming convention, same isolation semantics

**CustomDirectives (REUS-02)**

- Vue: `vFocus` local directive (`{ mounted: el => el.focus() }`) with toggle demo
- React: `useAutoFocus` hook using useRef + useEffect — no directive system
- Key insight: Vue directives are Vue-only syntactic sugar; React uses hooks instead

**Plugins (REUS-03)**

- Vue: `provide/inject` pattern simulating what a plugin does internally; conceptual `app.use()` in DEMO_CODE
- React: `createContext` + Provider pattern with NotificationContext demo
- Key insight: Vue plugins can modify app instance globally; React requires explicit imports

### Built-in Components (5 topic pairs)

**Transition (BTIN-01)**

- Vue: `<Transition name="fade">` with CSS `<style scoped>` block — handles DOM removal cleanly
- React: Tailwind CSS transition + className toggle — element stays in DOM; framer-motion NOT used
- Key insight: Vue's built-in handles enter/leave automatically; React needs a library for true leave animation

**TransitionGroup (BTIN-02)**

- Vue: `<TransitionGroup name="list">` with `.list-move` FLIP animation
- React: List with CSS opacity transition — items disappear immediately on remove
- Key insight: leave animation gap is the biggest difference

**KeepAlive (BTIN-03)**

- Vue: `<KeepAlive>` wrapping `<component :is>` — tabs preserve internal state automatically
- React: Lifted state pattern — counterA and textB live in parent, passed as props
- Key insight: Vue caches component instances; React requires explicit state lifting

**Teleport (BTIN-04)**

- Vue: `<Teleport to="body">` with modal demo
- React: `createPortal(children, document.body)` imported from react-dom
- Key insight: both preserve event bubbling through component tree; Vue syntax more declarative

**Suspense (BTIN-05)**

- Vue: `defineAsyncComponent` + `<Suspense>` with #default and #fallback slots
- React: `React.lazy()` + `<Suspense>` with fallback prop and reload button
- Key insight: Vue Suspense works with async setup(); React Suspense works with React.lazy()

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed JSX namespace error in Suspense.tsx**

- **Found during:** Task 1 verification (typecheck)
- **Issue:** `JSX.Element` type referenced without namespace — `Cannot find namespace 'JSX'` (TS error)
- **Fix:** Replaced `JSX.Element` with `ReactElement` imported from react
- **Files modified:** `packages/react-app/src/topics/built-in/Suspense.tsx`
- **Commit:** 0ed1c67 (fixed inline before commit)

## Known Stubs

None — all demos are fully interactive with real state. DEMO_CODE strings show accurate
representations of the patterns implemented.

## Self-Check: PASSED

All 16 files exist on disk. Both commits verified in git log. TypeScript typecheck passes 0 errors.

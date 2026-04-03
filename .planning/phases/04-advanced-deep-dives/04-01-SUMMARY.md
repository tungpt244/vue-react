---
phase: 04
plan: 01
subsystem: topics
tags: [scaling-up, routing, state-management, testing, typescript, registry]
dependency_graph:
  requires: []
  provides: [scaling-up-topics, deep-dive-registry-entries]
  affects:
    [topic-registry, vue-app-topics, react-app-topics, sidebar-navigation]
tech_stack:
  added: []
  patterns: [demo-box-pattern, code-toggle-pattern, explanation-box-pattern]
key_files:
  created:
    - packages/vue-app/src/topics/scaling-up/Routing.vue
    - packages/vue-app/src/topics/scaling-up/StateManagement.vue
    - packages/vue-app/src/topics/scaling-up/Testing.vue
    - packages/vue-app/src/topics/scaling-up/Typescript.vue
    - packages/react-app/src/topics/scaling-up/Routing.tsx
    - packages/react-app/src/topics/scaling-up/StateManagement.tsx
    - packages/react-app/src/topics/scaling-up/Testing.tsx
    - packages/react-app/src/topics/scaling-up/Typescript.tsx
  modified:
    - packages/shared/src/topics.ts
decisions:
  - 'No new npm packages installed — all demos use existing primitives (ref/useState) with code snippets showing real library APIs'
  - 'Pre-existing Slots.vue typecheck error confirmed out of scope — existed before plan execution'
metrics:
  duration: 8min
  completed: 2026-03-31T10:19:00Z
  tasks: 2
  files: 9
---

# Phase 04 Plan 01: Scaling Up Topics Summary

**One-liner:** 4 Scaling Up topics (Routing/StateManagement/Testing/TypeScript) added to both Vue and React sides with live demos using framework primitives to simulate real library APIs (Vue Router, Pinia, VTU, Zustand, RTL).

## Tasks Completed

| Task | Name                                         | Commit  | Files                    |
| ---- | -------------------------------------------- | ------- | ------------------------ |
| 1    | Registry expansion + 4 Vue Scaling Up topics | bc808bc | topics.ts + 4 .vue files |
| 2    | 4 React Scaling Up topics                    | 5d0987c | 4 .tsx files             |

## What Was Built

### Registry Expansion (topics.ts)

Added 7 new entries to the shared registry:

- 4 `scaling-up` entries: routing, state-management, testing, typescript
- 3 `deep-dive` entries: rendering-mechanism, reactivity-in-depth, rerender-optimization

Total registry entries: 33 (26 existing + 7 new)

### Vue Scaling Up Topics

**Routing.vue** — Simulated router with `ref<string>` for current route + button navigation. DEMO_CODE shows actual Vue Router setup (`createRouter`, `useRouter`, `<RouterLink>`, `<RouterView>`).

**StateManagement.vue** — Pinia-like store simulation using `ref()` + `computed()`. DEMO_CODE shows real Pinia `defineStore()` Setup Store API.

**Testing.vue** — Dual code display (component + test file). Shows `mount()`, `.find()`, `.trigger()` from `@vue/test-utils`. Run button simulates green test output.

**Typescript.vue** — Live typed component with `name` + `count` inputs. DEMO_CODE shows `defineProps<T>()`, `defineEmits<T>()`, `withDefaults()`.

### React Scaling Up Topics

**Routing.tsx** — Same simulation pattern with `useState<string>`. DEMO_CODE shows React Router v7 JSX route declaration, `<Routes>`, `<Route>`, `useNavigate`, `useParams`. Imports from `react-router` only (project convention).

**StateManagement.tsx** — Zustand-like simulation with `useState` + `useMemo`. DEMO_CODE shows `create<CounterState>()` with typed store interface.

**Testing.tsx** — Dual code display + run simulation. Shows RTL `render()`, `screen.getByRole()`, `fireEvent`, accessibility-first query philosophy.

**Typescript.tsx** — Live `TypedCard` component with real interface typing on function params. DEMO_CODE shows props interface, event callback typing, generic components.

## Deviations from Plan

### Pre-existing Issue Logged

**[Out of Scope] Slots.vue typecheck error**

- **Found during:** Task 2 verification (`pnpm -r typecheck`)
- **Issue:** `src/topics/components/Slots.vue(17,22): error TS2769` — VNode null type mismatch
- **Status:** Confirmed pre-existing (existed before any Phase 04 changes via git stash test)
- **Action:** Logged to deferred items; out of scope per deviation rules

None of the new files introduced TypeScript errors.

## Known Stubs

None — all 8 topic files have functional live demos (not placeholder data). The "simulated" store/router demos are intentional educational simplifications, not stubs blocking the plan goal.

## Self-Check: PASSED

Files exist:

- FOUND: packages/vue-app/src/topics/scaling-up/Routing.vue
- FOUND: packages/vue-app/src/topics/scaling-up/StateManagement.vue
- FOUND: packages/vue-app/src/topics/scaling-up/Testing.vue
- FOUND: packages/vue-app/src/topics/scaling-up/Typescript.vue
- FOUND: packages/react-app/src/topics/scaling-up/Routing.tsx
- FOUND: packages/react-app/src/topics/scaling-up/StateManagement.tsx
- FOUND: packages/react-app/src/topics/scaling-up/Testing.tsx
- FOUND: packages/react-app/src/topics/scaling-up/Typescript.tsx

Commits exist:

- FOUND: bc808bc (Task 1)
- FOUND: 5d0987c (Task 2)

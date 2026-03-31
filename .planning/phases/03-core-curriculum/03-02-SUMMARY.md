---
phase: 03-core-curriculum
plan: "02"
subsystem: topic-files
tags: [vue, react, essentials, topics, conditional-rendering, list-rendering, event-handling, form-bindings, template-refs]
dependency_graph:
  requires: ["03-01"]
  provides: [ESS-04, ESS-05, ESS-06, ESS-07, ESS-09]
  affects: [topic-renderer, sidebar-navigation]
tech_stack:
  added: []
  patterns:
    - React controlled components (value + onChange)
    - Vue v-model two-way binding
    - React useRef for DOM access
    - Vue template refs
    - React .map() + key for lists
    - Vue v-for + :key for lists
key_files:
  created:
    - packages/react-app/src/topics/essentials/ConditionalRendering.tsx
    - packages/react-app/src/topics/essentials/ListRendering.tsx
    - packages/react-app/src/topics/essentials/EventHandling.tsx
    - packages/react-app/src/topics/essentials/FormBindings.tsx
    - packages/react-app/src/topics/essentials/TemplateRefs.tsx
    - packages/vue-app/src/topics/essentials/ConditionalRendering.vue
    - packages/vue-app/src/topics/essentials/ListRendering.vue
    - packages/vue-app/src/topics/essentials/EventHandling.vue
    - packages/vue-app/src/topics/essentials/FormBindings.vue
    - packages/vue-app/src/topics/essentials/TemplateRefs.vue
  modified: []
decisions:
  - "Vue EventHandling uses @keydown.enter modifier inline with arrow function for Enter logging demo"
  - "ConditionalRendering demo shows all 3 React patterns (&&, ternary, status switcher) without early return wrapper since it would require a sub-component"
metrics:
  duration: 8min
  completed_date: "2026-03-31T07:41:00Z"
  tasks_completed: 2
  files_created: 10
  files_modified: 0
---

# Phase 03 Plan 02: Essentials Topic Files (5 Vue + 5 React) Summary

**One-liner:** 10 interactive topic files covering conditional rendering (&&/v-if), list rendering (.map()/v-for), event handling (modifiers vs explicit JS), form bindings (v-model vs controlled components), and template refs (useRef vs ref()).

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create 5 React Essentials topic files | 2ec2e5d | ConditionalRendering.tsx, ListRendering.tsx, EventHandling.tsx, FormBindings.tsx, TemplateRefs.tsx |
| 2 | Create 5 Vue Essentials topic files | 30db962 | ConditionalRendering.vue, ListRendering.vue, EventHandling.vue, FormBindings.vue, TemplateRefs.vue |

## What Was Built

### ConditionalRendering (ESS-04)
- React: toggle với &&, ternary, và status switcher dùng JSX expressions
- Vue: v-if/v-else, v-show (giữ trong DOM), v-else-if chain
- So sánh: Vue directives vs React JS expressions, v-show vs && (unmount vs display:none)

### ListRendering (ESS-05)
- React: dynamic list với add/remove, .map() + key prop, immutable array updates (spread/filter)
- Vue: v-for + :key, mutable push/splice trực tiếp trên ref([])
- So sánh: directive vs JS method, mutable vs immutable update pattern

### EventHandling (ESS-06)
- React: onClick counter, e.preventDefault() trên link, onKeyDown với if (e.key === 'Enter'), event log
- Vue: @click, @click.prevent modifier, @keydown.enter modifier, event log
- So sánh: Vue modifiers là sugar, React yêu cầu explicit JS

### FormBindings (ESS-07)
- React: controlled input (value+onChange), select (value+onChange), checkbox (checked+e.target.checked), live preview
- Vue: v-model trên input/select/checkbox, live preview
- So sánh: v-model two-way binding sugar vs controlled component pattern

### TemplateRefs (ESS-09)
- React: useRef<HTMLInputElement>(null), ref={inputRef} JSX prop, .current?.focus(), focus + select all buttons
- Vue: ref<HTMLInputElement>(), ref="inputRef" template attr, .value?.focus(), focus + select all buttons
- So sánh: Vue refs reactive (ref()), React refs không trigger re-render

## Deviations from Plan

None — plan executed exactly as written. All 10 files follow the locked Phase 2 topic template (demo box với h2 bên trong, code toggle, explanation box).

## Verification

- `ls packages/react-app/src/topics/essentials/*.tsx | wc -l` = 11 (6 old + 5 new)
- `ls packages/vue-app/src/topics/essentials/*.vue | wc -l` = 11 (6 old + 5 new)
- `pnpm -r typecheck` passed with 0 errors across all 4 packages

## Known Stubs

None. All 10 topic files have wired interactive demos with real state.

## Self-Check: PASSED

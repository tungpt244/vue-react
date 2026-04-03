# Deferred Items — Phase 03 Core Curriculum

## Pre-existing TypeScript Errors (Out of Scope)

### Slots.vue TS2769 — vue-tsc null assignability

- **File:** `packages/vue-app/src/topics/components/Slots.vue` line 17
- **Error:** `Type 'null' is not assignable to type 'RawChildren | RawSlots | undefined'`
- **Discovered:** Plan 03-05 (Sidebar enhancement)
- **Status:** Pre-existing before Plan 03-05 changes — confirmed via git stash
- **Impact:** vue-tsc typecheck fails but does not affect runtime behavior
- **Suggested fix:** Cast `null` to `undefined` or use `?? undefined` in the h() call at line 17

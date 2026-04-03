# Project Research Summary

**Project:** Vue vs React Comparison Hub (vibe)
**Domain:** Multi-framework monorepo — interactive side-by-side learning tool
**Researched:** 2026-03-26
**Confidence:** MEDIUM-HIGH

## Executive Summary

This project is a personal learning tool that mounts two independent framework apps (Vue 3 and React) side-by-side in a single browser page, enabling interactive comparison of how each framework handles the same concept. The recommended approach is a pnpm monorepo with 4 packages: `shared` (types + topic registry), `vue-app`, `react-app`, and `host` (which owns the Vite config and HTML shell). A single Vite dev server compiles both Vue SFCs and React TSX using co-registered plugins. React Router owns URL routing; Vue syncs passively via CustomEvent on `window`. This architecture is well-documented and sound — the tricky part is getting the multi-framework Vite config and the event-driven route bridge right before writing any content.

The key differentiator over existing tools like Component Party is live running demos: both frameworks actually execute on the page and respond to interaction, not just display code snippets. This means the infrastructure (dual-mount, event bridge, dynamic topic loading) is the hard technical work — individual topic components are mechanical once the pipeline is proven. The recommended MVP is 5 Essentials topics running end-to-end, which validates the entire architecture before committing to all 32 topics.

The biggest risks are all in Phase 1: Vite plugin collision between `@vitejs/plugin-vue` and `@vitejs/plugin-react`, the CustomEvent race condition on first load, and TypeScript path resolution inconsistencies across 4 packages. All 5 critical pitfalls from PITFALLS.md are scaffold-time problems that become very costly to fix after topics are built. Get the infrastructure solid, then content is just filling in a proven template.

## Key Findings

### Recommended Stack

A single Vite 8 instance in `packages/host` runs both `@vitejs/plugin-vue` and `@vitejs/plugin-react` — they coexist cleanly because each plugin only handles its own file extension (`.vue` vs `.tsx`/`.jsx`). TailwindCSS v4 uses a CSS-first config with a single entry point in host, covering both apps' template files. Shiki v4 (VS Code's syntax engine) handles code display with no client-side runtime cost — far superior to Prism or highlight.js for this use case. All packages use TypeScript 6 with per-package `tsconfig.json` files extending a shared base.

**Core technologies:**

- Vite 8 + pnpm workspaces: Build tool and monorepo management — single dev server, native HMR for both frameworks
- Vue 3.5 (`<script setup>`): Left-side demos — Boss's primary framework, Composition API is the standard
- React 19 + React Router 7: Right-side demos + host navigation — React owns the URL, more React exposure for learning
- TypeScript 6: Type safety across all packages — shared types in `packages/shared` consumed by both apps
- TailwindCSS 4: Styling via single CSS-first config — consistent classes across both framework panels
- Shiki 4 + `?raw` imports: Code display — TextMate grammar accuracy, zero drift between displayed and running code

**Do not use:** Vue Router (conflicts with React Router), Prism.js (no Vue SFC grammar), Monaco/CodeMirror (overkill for read-only display), CSS Modules (inconsistent DX across frameworks), separate Tailwind configs per package.

### Expected Features

The core value proposition over Component Party is live running demos. Component Party shows static code snippets across many frameworks; this project runs 2 frameworks with interactive demos and written explanations of the "why", not just the "what".

**Must have (table stakes):**

- Host app mounting both Vue and React side-by-side — the entire concept depends on this
- Sidebar navigation driven by shared topic registry — 32 topics across 6 categories needs structure
- URL routing with React Router + CustomEvent sync to Vue — bookmarkable topics
- Source code display with Shiki syntax highlighting — code is as important as the demo
- Explanation text per topic — "here's what changed and why" is the differentiator over code-only tools
- At least 5 Essentials topics implemented end-to-end — validates the pattern

**Should have (competitive):**

- Live interactive demos (counters, forms, toggles) — Component Party doesn't run code; this does
- Search/filter across topics — becomes essential as topic count grows past 10
- Progress tracking via localStorage — mark topics as understood, track learning
- Remaining 27 topics across all 6 categories — fills out the learning curriculum
- Responsive stacked layout for narrow screens — sidebar + vertical panels on laptop

**Defer (v2+):**

- Deep dive pages with diagrams (3 topics) — high effort, validate basics first
- Scaling Up topics (routing, state management) — complex patterns, save for when fundamentals are solid
- Dark/light theme toggle — default dark is fine for personal use; add later
- Editable code playground — scope explosion; link to StackBlitz/CodeSandbox instead

### Architecture Approach

The system uses dual-root mounting: `#vue-root` and `#react-root` are peer DOM elements in `host/index.html`, each owned entirely by its framework. They never touch each other's DOM. Communication is unidirectional via `CustomEvent('route-change')` dispatched by React Router on `window` and received by Vue's `useRouteSync` composable. The `packages/shared` topic registry is the single source of truth — it drives sidebar navigation, component path resolution, and URL structure for both apps simultaneously. Topics are lazy-loaded via `import.meta.glob` for automatic code splitting.

**Major components:**

1. `packages/shared` — Topic registry (types, constants, topic list). Zero framework deps. Foundation for everything.
2. `packages/host` — HTML shell with 2 root divs, Vite config (both plugins), boot script that imports both `main.ts` files
3. `packages/react-app` — Right-side demos, React Router (URL owner), sidebar UI, dispatches `CustomEvent` on navigate
4. `packages/vue-app` — Left-side demos, listens for `CustomEvent`, renders matching `.vue` topic component dynamically

**Build order:** `shared` → `host` skeleton → `react-app` shell → `vue-app` shell → first topic end-to-end → remaining topics.

### Critical Pitfalls

1. **Vite plugin collision** — Add `include: /\.(tsx|jsx)$/` to `@vitejs/plugin-react` to prevent it touching `.vue` files. Test HMR for both sides in Phase 1 before writing any topic content.

2. **CustomEvent race condition** — Vue must read `window.location.pathname` on mount as initial state fallback. Do not rely solely on the first `route-change` event — Vue's listener may not be registered when React dispatches it. Mount Vue before React in `host/main.ts`.

3. **TypeScript path resolution across 4 packages** — Use pnpm workspace protocol (`workspace:*`) in `package.json` as the source of truth. Each package gets its own `tsconfig.json` extending `tsconfig.base.json`. Do not duplicate aliases in `vite.config.ts` — let pnpm symlinks handle resolution.

4. **Source code drift** — Never hardcode source strings. Use Vite's `?raw` import from the first topic: `import source from './Counter.vue?raw'`. This guarantees displayed code and running code are identical. Retrofitting 64 files is expensive.

5. **Topic component cleanup** — Establish the "demo contract" from topic 1: every `setInterval`, `setTimeout`, `addEventListener` must clean up on unmount. Use `key={topicId}` / `:key="topicId"` as the force-remount nuclear option for demos that are hard to clean up manually.

## Implications for Roadmap

Based on research, the clear dependency graph suggests 4 phases:

### Phase 1: Infrastructure Scaffold

**Rationale:** All 5 critical pitfalls are scaffold-time problems. The Vite multi-framework config, TypeScript path setup, CustomEvent bridge, and TailwindCSS pipeline must all be validated before any topic content is written. Retrofitting any of these is costly.

**Delivers:** A working dev environment where both Vue and React apps mount, HMR works for both, TypeScript checks pass across all packages, and navigating to a URL shows the correct (empty) state on both sides.

**Addresses:** Topic registry structure, URL routing, sidebar skeleton, dual-mount architecture

**Avoids:** Vite plugin collision (Pitfall 1), DOM mutation conflicts (Pitfall 2), route sync race (Pitfall 3), Tailwind conflicts (Pitfall 4), TypeScript path confusion (Pitfall 5)

**Definition of done:** `pnpm dev` starts, both `#vue-root` and `#react-root` render, HMR works on `.vue` edit AND `.tsx` edit, `pnpm -r typecheck` passes, direct URL access renders correct state on both sides.

### Phase 2: First 5 Topics (Essentials)

**Rationale:** Implement the first 5 Essentials topics end-to-end to prove the full pipeline: `?raw` source import, Shiki highlighting, topic component isolation, and the explanation text format. Five topics is enough to validate; expanding to 32 before validating creates compounding technical debt.

**Delivers:** A usable learning tool covering the most fundamental Vue-React differences. The `?raw` import pattern, component cleanup contract, and explanation content format established as templates for all future topics.

**Addresses:** Side-by-side live demos (core differentiator), source code display, explanation text, interactive demos

**Avoids:** Source code drift (Pitfall 7) — established from topic 1. Topic isolation failures (Pitfall 6) — established from topic 1.

**Suggested topics:** Reactive state, Computed state, Watchers/Effects, Lifecycle hooks, Template/JSX rendering

### Phase 3: Core Curriculum (Remaining Topics)

**Rationale:** Once the pattern is proven with 5 topics, the remaining 27 topics are mechanical — each follows the same structure. Group by category for organized progress: Components In-Depth (7 topics), Reusability (4 topics), Built-in Features (4 topics).

**Delivers:** Full Essentials + Components + Reusability + Built-in categories (28 of 32 topics). Search/filter and progress tracking added here as topic count makes them worthwhile.

**Addresses:** Remaining P2 features — search/filter (LOW complexity, adds value at 10+ topics), progress tracking (localStorage, LOW complexity), responsive layout

**Uses:** Established patterns from Phase 2. No new infrastructure needed.

### Phase 4: Advanced Topics + Deep Dives

**Rationale:** Scaling Up topics (routing, state management, SSR concepts) and Deep Dive pages (rendering diagrams, reactivity internals) require more effort per topic and involve larger patterns. Defer until core curriculum is complete and Boss has the Vue-React mental model to appreciate them.

**Delivers:** 4 Scaling Up topics, 3 Deep Dive pages with visual diagrams, optional theme toggle

**Addresses:** P3 features — deep dives with diagrams, scaling patterns

**Note:** Deep dive layout must maintain the side-by-side demo area above the diagram section to preserve UX consistency.

### Phase Ordering Rationale

- Infrastructure before content: The event bridge, Vite config, and TypeScript setup all have cross-cutting impact. One bad decision here multiplies across 64 topic files.
- Five topics before thirty-two: The architecture has never run before. Prove it works at small scale before committing to content volume.
- Search/progress tracking in Phase 3, not Phase 2: These require enough topics to be useful. At 5 topics, a sidebar is sufficient. At 15+ topics, search becomes necessary.
- Deep dives last: They require understanding the basic patterns first (both as a developer and as a learner), and the diagram content is harder to write without having taught the basics first.

### Research Flags

Phases likely needing deeper research during planning:

- **Phase 1:** Vite 8 + `@vitejs/plugin-vue@6` + `@vitejs/plugin-react@6` exact `include` pattern should be verified against actual plugin changelogs — training data is MEDIUM confidence on this specific version behavior
- **Phase 2:** Shiki v4 API (`codeToHtml`, bundle selection) changed from v0.x; verify `shiki/bundle/web` entry point exists and `@shikijs/transformers` API matches documented examples
- **Phase 4:** Deep dive diagram approach (SVG vs CSS vs library) needs a decision; research skipped this — pick a direction during phase planning

Phases with standard patterns (skip research-phase):

- **Phase 3 topic implementation:** Once Phase 2 pattern is established, remaining topics are mechanical. No research needed, just execution.
- **Phase 3 search/filter:** Client-side array filter on topic registry — trivial implementation, well-understood pattern.
- **Phase 3 progress tracking:** localStorage with topic IDs as keys — no research needed.

## Confidence Assessment

| Area         | Confidence  | Notes                                                                                                                                                                                                                                         |
| ------------ | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stack        | HIGH        | All version numbers verified via npm registry on 2026-03-26. React Router v7 consolidation and TailwindCSS v4 CSS-first config are confirmed behaviors.                                                                                       |
| Features     | MEDIUM      | Based on training data analysis of Component Party, TodoMVC, Vue/React docs. Web search unavailable — competitor analysis may be stale. Core feature set is driven by PROJECT_BRIEF.md (HIGH confidence).                                     |
| Architecture | MEDIUM-HIGH | Dual-root mount and CustomEvent bridge are standard Web APIs (HIGH). Vite multi-plugin coexistence is documented but version-specific behavior at Vite 8 is MEDIUM. `import.meta.glob` is stable Vite API (HIGH).                             |
| Pitfalls     | MEDIUM-HIGH | Vite plugin collision, DOM boundary, route race condition, Tailwind single-config, and TypeScript path pitfalls are all well-documented patterns from micro-frontend and multi-framework projects. No live verification of Vite 8 edge cases. |

**Overall confidence:** MEDIUM-HIGH

### Gaps to Address

- **Vite plugin coexistence at exact versions:** `@vitejs/plugin-vue@6` and `@vitejs/plugin-react@6` with Vite 8 — the `include` pattern behavior should be validated in Phase 1 scaffold by actually testing HMR on both sides before proceeding.
- **Shiki v4 exact API surface:** The research cites `codeToHtml` and `shiki/bundle/web` but Shiki has had significant API changes between versions. Verify during Phase 2 first topic implementation.
- **Component Party current state:** Feature comparison was based on training data (pre-May 2025). Check current site before finalizing differentiator strategy — they may have added live demos since.
- **TypeScript 6 + vue-tsc compatibility:** TS 6 is newer; verify vue-tsc tracks it cleanly during Phase 1 scaffold.

## Sources

### Primary (HIGH confidence)

- npm registry — All version numbers verified 2026-03-26 for: Vite 8, Vue 3.5, React 19, React Router 7, TailwindCSS 4, Shiki 4, TypeScript 6, all Vite plugins
- PROJECT_BRIEF.md — Project scope, topic list, category structure, out-of-scope definitions
- React Router v7 changelog — Confirmed `react-router-dom` merged into `react-router`
- TailwindCSS v4 release notes — CSS-first config via `@theme`, Vite plugin replaces PostCSS
- CustomEvent Web API (MDN) — Browser standard, cross-framework by design

### Secondary (MEDIUM confidence)

- Vite documentation (training data) — Multi-plugin architecture, `import.meta.glob`, `?raw` imports
- Component Party (component-party.dev, training data) — Competitor feature analysis, multi-framework code comparison patterns
- Micro-frontend architecture patterns — Dual-root mount, DOM boundary discipline, event bridge

### Tertiary (LOW confidence)

- Training data on Shiki v4 exact API — Needs validation; Shiki API changed significantly between major versions
- Training data on Vite 8 + both plugins coexisting — Core pattern is solid, but exact `include` regex behavior at this version combination needs live validation

---

_Research completed: 2026-03-26_
_Ready for roadmap: yes_

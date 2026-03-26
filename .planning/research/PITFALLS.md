# Pitfalls Research

**Domain:** Vue 3 + React side-by-side comparison tool (same page, Vite monorepo)
**Researched:** 2026-03-26
**Confidence:** MEDIUM-HIGH (based on well-documented patterns from micro-frontend and multi-framework Vite projects; web search unavailable for latest edge cases)

## Critical Pitfalls

### Pitfall 1: Vite Plugin Collision Between Vue and React

**What goes wrong:**
`@vitejs/plugin-vue` and `@vitejs/plugin-react` both hook into Vite's transform pipeline. When configured naively in the same `vite.config.ts`, they fight over file transforms -- the React plugin tries to inject React Refresh preamble into `.vue` files, or the Vue plugin interferes with `.tsx` transforms. Build errors, HMR breaks, or silent transform corruption result.

**Why it happens:**
Both plugins register broad `transform` hooks. The React plugin (using Babel or SWC) can match files it shouldn't. Without explicit `include`/`exclude` patterns, plugin ordering becomes a landmine.

**How to avoid:**
- Set explicit `include` patterns on both plugins:
  ```ts
  // vite.config.ts in host
  import vue from '@vitejs/plugin-vue'
  import react from '@vitejs/plugin-react'

  export default defineConfig({
    plugins: [
      vue(),
      react({
        include: /\.(tsx|jsx)$/,  // Only touch React files
      }),
    ],
  })
  ```
- Keep `.vue` files only in `packages/vue-app` and `.tsx` only in `packages/react-app`. Never mix file extensions in the same package.
- Test HMR for both frameworks early -- don't wait until you have 20 topics to discover HMR only works for one side.

**Warning signs:**
- HMR works for React but not Vue (or vice versa)
- Console warnings about "Fast Refresh" in non-React files
- Build errors mentioning JSX transform on `.vue` files
- `__vite_ssr_import__` or `__vite_plugin_react_preamble_installed__` errors

**Phase to address:**
Phase 1 (Infrastructure/Scaffold) -- this must be validated before any topic development begins.

---

### Pitfall 2: Shared DOM Mutation Conflicts

**What goes wrong:**
Vue and React both manage their own DOM subtrees. If they ever touch the same DOM nodes -- even accidentally via a shared parent wrapper, portal, or global event listener that modifies DOM -- one framework's virtual DOM diffing breaks because the real DOM no longer matches its expectations. Symptoms: ghost elements, missing updates, or React error boundaries firing with "The node to be removed is not a child of this node."

**Why it happens:**
Developers add a shared UI wrapper (like a layout component) rendered by one framework that wraps the other's mount point. Or they use `document.getElementById` / `document.querySelector` to manipulate DOM in areas owned by the other framework.

**How to avoid:**
- Hard boundary: `#vue-root` and `#react-root` are completely independent subtrees. No framework renders into the other's subtree.
- Navigation sidebar, description panel, and any shared UI should be rendered by the host (React, since it owns routing) -- NOT by Vue.
- Never use vanilla DOM manipulation (`innerHTML`, `appendChild`) on nodes inside either root.
- If you need a shared overlay/modal, use React's `createPortal` to a third root div (`#overlay-root`), not into Vue's territory.

**Warning signs:**
- React error: "The node to be removed is not a child of this node"
- Vue warning: "Hydration node mismatch" (even without SSR, Vue uses this for unexpected DOM state)
- Elements appearing/disappearing inconsistently after navigation

**Phase to address:**
Phase 1 (Scaffold) -- establish the DOM boundary contract. Phase 2 (First topics) -- validate it holds under real usage.

---

### Pitfall 3: CustomEvent Route Sync Race Condition

**What goes wrong:**
The architecture dispatches `CustomEvent('route-change')` from React Router to Vue. Race conditions occur: (1) Vue app hasn't mounted yet when the first route event fires, so the initial topic doesn't render on the Vue side. (2) Rapid navigation dispatches multiple events, and Vue processes them out of order or skips intermediate states, showing a stale topic.

**Why it happens:**
`window.dispatchEvent` is synchronous for listeners already attached, but if Vue's listener isn't registered yet (because `onMounted` hasn't fired), the event is lost. There's no built-in replay mechanism for CustomEvents. Also, if Vue's topic component is async-loaded, the previous event's render may still be in progress when a new event arrives.

**How to avoid:**
- **Initial state:** Don't rely on the first event. On Vue mount, read the current route from `window.location.pathname` to set initial state. Only use events for subsequent navigations.
- **Latest-wins pattern:** In Vue's event listener, use a simple counter or timestamp. Discard events older than the latest processed one.
- **Mount ordering:** In `host/main.ts`, mount Vue first, then React (which triggers the first route). Or use a "ready" handshake:
  ```ts
  // Vue dispatches when ready
  window.dispatchEvent(new Event('vue-ready'))
  // Host waits for both before enabling navigation
  ```
- Consider a shared reactive store (even a simple `window.__currentRoute`) as fallback for the initial state.

**Warning signs:**
- Vue side shows blank on first page load but works after clicking a topic
- Rapid clicking between topics shows wrong Vue component
- Vue side lags one topic behind React side

**Phase to address:**
Phase 1 (Scaffold) -- implement the event bridge with initial state handling. Phase 2 (First topics) -- stress-test with rapid navigation.

---

### Pitfall 4: TailwindCSS Class Conflicts Between Frameworks

**What goes wrong:**
Both Vue and React apps use TailwindCSS. If they share the same Tailwind config and output, everything is fine. But if they have separate configs or separate CSS builds, you get: (1) duplicate CSS bloat, (2) conflicting utility classes if configs diverge, (3) one app's `@layer` reset overriding the other's styles. Alternatively, if using scoped CSS in Vue (`:deep()`, `scoped`), Tailwind utilities inside scoped blocks may not work as expected.

**Why it happens:**
Monorepos make it tempting to let each package manage its own CSS pipeline. Two Tailwind builds = two CSS resets, two base layers, potential class conflicts.

**How to avoid:**
- **Single Tailwind config** at the monorepo root (or in `packages/host`), with `content` paths covering both `packages/vue-app/src/**/*.vue` and `packages/react-app/src/**/*.tsx`.
- **Single CSS entry point** imported in `host/main.ts` -- one `@tailwind base; @tailwind components; @tailwind utilities;`.
- Don't use Vue's `<style scoped>` for Tailwind utilities. Use Tailwind classes directly in templates. Reserve `<style scoped>` only for truly custom CSS (which should be rare with Tailwind).
- If you need framework-specific custom CSS, namespace it: `.vue-app .custom-class` / `.react-app .custom-class`.

**Warning signs:**
- Same Tailwind class renders differently in Vue vs React
- CSS file size is unexpectedly large (double what it should be)
- Vue components lose styling when navigating from React-rendered pages
- Console warnings about duplicate `@layer` declarations

**Phase to address:**
Phase 1 (Scaffold) -- single Tailwind pipeline from day one.

---

### Pitfall 5: TypeScript Path Alias and Module Resolution Confusion

**What goes wrong:**
In a pnpm monorepo with 4 packages, TypeScript path aliases (`@shared/`, `@vue-app/`, `@react-app/`) must be configured in multiple places: `tsconfig.json` (for type checking), `vite.config.ts` (for bundling), and `package.json` (for pnpm workspace resolution). When these go out of sync, you get: imports that work in IDE but fail at build time, or imports that build but show type errors in editor.

**Why it happens:**
Three different systems resolve imports independently: TypeScript compiler, Vite's resolver, and Node/pnpm's module resolution. Each has its own config surface. It's easy to update one and forget the others.

**How to avoid:**
- Use pnpm workspace protocol (`"@vibe/shared": "workspace:*"`) in `package.json` for cross-package imports. This is the source of truth.
- In `tsconfig.json`, use project references (`references`) and `composite: true` for each package. Each package has its own `tsconfig.json` with proper `paths`.
- In `vite.config.ts`, DON'T duplicate path aliases. Let Vite resolve through `node_modules` (pnpm symlinks workspace packages there). Only add aliases if Vite can't resolve naturally.
- Have a root `tsconfig.json` that only holds `references` to each package's config.

**Warning signs:**
- Import works in VS Code but fails on `tsc --noEmit`
- Import works in build but shows red squiggles in editor
- Same import path resolves to different files in different contexts
- `pnpm build` succeeds but `pnpm typecheck` fails (or vice versa)

**Phase to address:**
Phase 1 (Scaffold) -- get this right once and never think about it again.

---

### Pitfall 6: Topic Component Isolation Failures

**What goes wrong:**
Individual topic demo components leak state, event listeners, or timers between each other. User navigates from "Reactivity" to "Lifecycle" -- but the Reactivity demo's `setInterval` is still running, or a global event listener from the previous demo fires in the new one. This is especially bad because both Vue AND React demos can leak, doubling the surface area.

**Why it happens:**
Learning demos often use `setInterval`, `addEventListener`, `setTimeout`, or manual DOM APIs to illustrate concepts. When the component unmounts (topic change), cleanup is forgotten. In React, this means missing `useEffect` cleanup returns. In Vue, this means missing `onUnmounted` hooks.

**How to avoid:**
- Establish a "demo component contract" in shared documentation:
  - Every `setInterval`/`setTimeout` must be cleared in cleanup
  - Every `addEventListener` must have matching `removeEventListener`
  - No global state mutation without reset on unmount
- In React: lint rule `react-hooks/exhaustive-deps` catches some of this
- In Vue: review every `onMounted` for a corresponding `onUnmounted`
- Consider a wrapper component for each side that force-remounts the demo on topic change (using `key={topicId}`) -- this is the nuclear option but guarantees cleanup:
  ```tsx
  // React side
  <DemoWrapper key={topicId}>
    <TopicComponent />
  </DemoWrapper>
  ```
  ```vue
  <!-- Vue side -->
  <component :is="currentTopic" :key="topicId" />
  ```

**Warning signs:**
- Console logs from previous topic still appearing
- Memory usage growing steadily as you navigate between topics
- Event handlers firing twice or on wrong topic
- Animations from previous demo visible behind current one

**Phase to address:**
Phase 2 (First topics) -- establish the pattern with the first 2-3 topics. Enforce via code review for all subsequent topics.

---

### Pitfall 7: Source Code Display Gets Out of Sync with Actual Code

**What goes wrong:**
The app shows source code alongside live demos. If source code is hardcoded as strings, it inevitably drifts from the actual component code. The displayed code says one thing, the live demo does another. This destroys the tool's core value.

**Why it happens:**
Maintaining two copies of the same code (the actual component + its string representation) is a manual process. Developers update the component but forget to update the displayed source. Over 32 topics x 2 frameworks = 64 opportunities for drift.

**How to avoid:**
- Use Vite's `?raw` import to load the actual source file as a string:
  ```tsx
  import reactivitySource from './Reactivity.tsx?raw'
  // Display reactivitySource in a code block
  ```
  ```vue
  <script setup>
  import reactivitySource from './Reactivity.vue?raw'
  </script>
  ```
- This guarantees the displayed code IS the running code -- zero drift possible.
- For syntax highlighting, use a lightweight library like `shiki` or `prism` on the raw string.
- If you want to show only a portion of the file, use marker comments (`// #region demo` / `// #endregion`) and extract at display time.

**Warning signs:**
- You find yourself copy-pasting code into string literals
- Someone reports "the demo does X but the code shows Y"
- Updating a demo requires changes in two places

**Phase to address:**
Phase 2 (First topics) -- establish `?raw` import pattern from the very first topic. Never allow hardcoded source strings.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Hardcoded source code strings | Quick to implement first topic | 64 components to keep in sync, guaranteed drift | Never -- use `?raw` imports from day one |
| Separate Tailwind configs per package | Each package is "independent" | Double CSS output, style inconsistencies | Never -- single config always |
| Skip TypeScript strict mode | Fewer type errors to fix initially | Bugs hide in `any` types, especially in shared package | Never -- strict from start, it's a learning tool |
| Global CSS instead of Tailwind utilities | Faster for custom layouts | Specificity wars between Vue/React CSS | Only for truly global layout (sidebar, grid) |
| Inline route sync (no abstraction) | Ship first topic faster | Every topic re-implements event listening | Only for first prototype, refactor before topic 3 |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Both frameworks rendering heavy demos simultaneously | Page jank when rendering complex topics | Lazy-load demo components, only render visible side | Topics with animations, large lists, or canvas |
| Syntax highlighting on every render | Flicker/delay when switching topics | Memoize highlighted output (useMemo / computed) | When source code is > 100 lines |
| Mounting/unmounting entire framework apps on route change | Flash of blank content during navigation | Keep both apps mounted, swap topic components inside them | From topic 1 -- this must be the architecture, not an afterthought |
| Loading all 32+ topic components eagerly | Initial bundle > 500KB, slow first load | Dynamic import (`() => import('./topics/...')`) for every topic | When topic count exceeds ~10 |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Vue and React demos render at different speeds | Feels broken -- one side loads, other is blank | Show skeleton/loading state on both sides, reveal together |
| Source code panel takes too much vertical space | Demo pushed off-screen, constant scrolling | Collapsible source panels, default to collapsed. Or use tabs: Demo / Source |
| No visual indication which side is Vue vs React | Confusion about what you're looking at | Persistent labels with framework logos/colors at top of each panel |
| Deep dive pages break the side-by-side layout | Inconsistent UX between regular topics and deep dives | Deep dives should still have side-by-side demo, with diagram section below both |
| Navigation sidebar doesn't show current topic | Lost in 32 topics, no sense of progress | Active state styling, category collapsing, progress indicators |

## "Looks Done But Isn't" Checklist

- [ ] **Vite HMR:** Works for Vue side -- verify by editing a `.vue` file and confirming hot update without full reload
- [ ] **Vite HMR:** Works for React side -- verify by editing a `.tsx` file and confirming Fast Refresh preserves state
- [ ] **Route sync:** First page load shows correct topic on BOTH sides (not just React)
- [ ] **Route sync:** Browser back/forward updates BOTH sides correctly
- [ ] **Route sync:** Direct URL access (paste URL in new tab) renders correct topic on both sides
- [ ] **Cleanup:** Navigate away from a topic with `setInterval` -- verify interval stops (check console/devtools)
- [ ] **Source display:** Edit a topic component file -- verify displayed source code updates too (if using `?raw`)
- [ ] **TypeScript:** Run `pnpm -r typecheck` from root -- all packages pass, not just the one you're working on
- [ ] **Build:** Run `pnpm build` from root -- production build works, not just dev server
- [ ] **Shared package:** Change a type in `shared` -- verify both Vue and React apps pick up the change without manual steps

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Vite plugin collision | LOW | Add explicit `include` patterns to React plugin, restart dev server |
| DOM mutation conflicts | MEDIUM | Audit all components for cross-root DOM access, add third root div for shared UI |
| Route sync race condition | LOW | Add `window.location` fallback read on Vue mount, add ready handshake |
| TailwindCSS conflicts | MEDIUM | Consolidate to single config, delete duplicate CSS entries, test all components |
| TypeScript path confusion | LOW-MEDIUM | Standardize on workspace protocol, remove redundant Vite aliases, regenerate tsconfigs |
| Topic component leaks | LOW per topic | Add cleanup hooks, use `key={topicId}` for force-remount pattern |
| Source code drift | HIGH if many topics | Migrate all hardcoded strings to `?raw` imports -- touching every topic file |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Vite plugin collision | Phase 1: Scaffold | HMR works for both `.vue` and `.tsx` edits |
| DOM mutation conflicts | Phase 1: Scaffold | Both apps render independently, no cross-root DOM access in code |
| Route sync race condition | Phase 1: Scaffold | Direct URL access renders both sides; rapid nav shows correct state |
| TailwindCSS conflicts | Phase 1: Scaffold | Single `tailwind.config` with content paths for both packages |
| TypeScript path resolution | Phase 1: Scaffold | `pnpm -r typecheck` passes; imports resolve in IDE and build |
| Topic component isolation | Phase 2: First Topics | Navigate away from timer-based demo, verify cleanup in devtools |
| Source code display sync | Phase 2: First Topics | `?raw` import pattern established in first topic |
| Lazy loading topics | Phase 3: Scale to All Topics | Bundle size stays reasonable as topic count grows |
| Deep dive layout consistency | Phase 3-4: Deep Dives | Deep dive pages maintain side-by-side + diagram layout |

## Sources

- Training data on Vite multi-framework configuration (verified pattern from `@vitejs/plugin-vue` and `@vitejs/plugin-react` documentation)
- Common micro-frontend architecture patterns (single-spa, Module Federation learnings applied to simpler use case)
- Vue 3 Composition API and React Hooks cleanup patterns
- Vite `?raw` import feature (documented in Vite asset handling docs)
- pnpm workspace protocol documentation
- Note: Web search was unavailable during this research. Findings are based on well-established patterns but should be validated against latest Vite plugin versions during Phase 1 scaffold.

---
*Pitfalls research for: Vue vs React Comparison Hub (same-page monorepo)*
*Researched: 2026-03-26*

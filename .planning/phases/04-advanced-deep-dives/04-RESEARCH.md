# Phase 4: Advanced & Deep Dives - Research

**Researched:** 2026-03-31
**Domain:** Vue 3 + React 19 topic authoring (Scaling Up), inline SVG/CSS diagram authoring (Deep Dive pages)
**Confidence:** HIGH

## Summary

Phase 4 has two distinct work streams with very different complexity profiles. The first is authoring 4 Scaling Up topics (Routing, State Management, Testing, TypeScript) — these follow the **exact same locked pattern** as all 28 existing topics: demo box + code toggle + explanation box. No new infrastructure. Just new topic files in two new category folders.

The second stream is authoring 3 Deep Dive pages (Rendering Mechanism, Reactivity In-Depth, Re-render & Optimization). These topics require a **new layout section**: a diagram below the standard demo area. The diagram must visually represent internal framework behavior. No diagramming library exists in the stack — diagrams must be built using inline SVG or Tailwind CSS boxes. This is achievable without new dependencies and consistent with the project's no-external-library philosophy for display components.

The layout architecture supports both streams without changes: TopicRenderer in both Vue and React apps uses `import.meta.glob('../topics/**/*.tsx')` / `('../topics/**/*.vue')` — adding files in new `scaling-up/` and `deep-dive/` subfolders is automatically picked up. Registry expansion in `packages/shared/src/topics.ts` using the existing `'scaling-up'` and `'deep-dive'` Category types (already defined in `types.ts`) completes the wiring.

**Primary recommendation:** Split into 3 plans — (1) registry expansion + 4 Scaling Up topics, (2) 3 Deep Dive topic files with diagram sections, (3) final verification. Diagrams use inline SVG with Tailwind-styled labels — no new packages required.

<phase_requirements>

## Phase Requirements

| ID      | Description                                                                                | Research Support                                                                                  |
| ------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| SCAL-01 | Routing — Vue Router vs React Router                                                       | Vue Router 4 + React Router v7, both well-understood; demo shows basic setup diff                 |
| SCAL-02 | State Management — Pinia vs Zustand/Redux Toolkit                                          | Pinia (Vue standard), Zustand (React lightweight standard); simplified in-component demo possible |
| SCAL-03 | Testing — Vitest + Vue Test Utils vs Vitest + React Testing Library                        | Code snippet topic (no live test runner in browser); show test code side-by-side                  |
| SCAL-04 | TypeScript — defineProps\<T\>/defineEmits\<T\> vs React props type                         | Pure TypeScript patterns; code-display focused with small interactive demo                        |
| DEEP-01 | Rendering Mechanism — Vue compiler optimized diff vs React full subtree diff + diagram     | Inline SVG diagram of vdom diffing; demo shows update behavior                                    |
| DEEP-02 | Reactivity In-Depth — Proxy-based tracking vs immutable state comparison + diagram         | Inline SVG diagram of Proxy tracking vs setter pattern                                            |
| DEEP-03 | Re-render & Optimization — Vue auto vs React manual (memo, useMemo, useCallback) + diagram | Inline SVG diagram; demo shows React.memo, useMemo, useCallback vs Vue's automatic optimization   |

</phase_requirements>

---

## Standard Stack

### Core (all already installed — no new dependencies needed for either stream)

| Library                        | Version         | Purpose                    | Why Standard                                               |
| ------------------------------ | --------------- | -------------------------- | ---------------------------------------------------------- |
| Vue 3                          | ^3.5.31         | Vue side topic files       | Already installed                                          |
| React 19                       | ^19.2.4         | React side topic files     | Already installed                                          |
| TailwindCSS v4                 | ^4.2.2          | All styling in topic files | Already installed — use utility classes for diagram layout |
| lucide-react / lucide-vue-next | ^1.7.0 / ^1.0.0 | Icons in topic files       | Already installed                                          |

### No New Dependencies Required

| Instead of              | Could Use             | Tradeoff                                                                                                                |
| ----------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Inline SVG for diagrams | Mermaid.js            | Mermaid requires runtime JS bundle (~500KB). Inline SVG = zero bundle cost, same visual result for simple flow diagrams |
| Inline SVG for diagrams | D3.js                 | D3 is a data viz library — massive overkill for static educational diagrams                                             |
| Inline SVG for diagrams | React Flow / Vue Flow | Interactive graph libraries — again overkill for static diagrams                                                        |
| CSS Tailwind boxes      | Canvas API            | Canvas is imperative and non-accessible; Tailwind HTML is simpler to maintain                                           |

**Confirmed: zero new packages for Phase 4.** The constraint to not add packages for this personal project holds.

### Installation

None required — all dependencies already present.

## Architecture Patterns

### New Folders to Create

```
packages/vue-app/src/topics/
├── scaling-up/          # SCAL-01 to SCAL-04 (.vue files)
└── deep-dive/           # DEEP-01 to DEEP-03 (.vue files)

packages/react-app/src/topics/
├── scaling-up/          # SCAL-01 to SCAL-04 (.tsx files)
└── deep-dive/           # DEEP-01 to DEEP-03 (.tsx files)
```

`import.meta.glob('../topics/**/*.vue')` and `('../topics/**/*.tsx')` already cover these paths — no changes needed to TopicRenderer files.

### Pattern 1: Scaling Up Topics (Same as All Existing Topics)

**What:** demo box + optional code toggle + explanation box. Identical to all 28 prior topics.
**When to use:** SCAL-01, SCAL-02, SCAL-03, SCAL-04

```tsx
// React — standard topic structure (established Phase 2, locked pattern)
export default function Routing() {
  const [showCode, setShowCode] = useState(false)
  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">{title}</h2>
        {/* live demo content */}
      </div>
      <div className="mb-4">
        <button
          onClick={() => setShowCode(!showCode)}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
        >
          {showCode ? '▼ Ẩn code' : '▶ Xem code'}
        </button>
        {showCode && (
          <pre className="mt-2 bg-slate-900 text-slate-100 text-xs p-4 rounded overflow-x-auto">
            <code>{DEMO_CODE}</code>
          </pre>
        )}
      </div>
      <div className="p-4 bg-slate-50 rounded">
        <h3 className="text-sm font-semibold mb-2">So sánh</h3>
        <div className="text-sm text-slate-600 space-y-2">
          {/* comparison paragraphs */}
        </div>
      </div>
    </div>
  )
}
```

### Pattern 2: Deep Dive Topics (New Layout — Demo + Diagram)

**What:** Standard demo box + code toggle + explanation box (same as existing) + **diagram section below**.
**When to use:** DEEP-01, DEEP-02, DEEP-03

The diagram section is an additional block appended after the explanation box. It does NOT replace the existing structure — it extends it.

```tsx
// React — deep dive topic structure (new pattern for Phase 4)
export default function RenderingMechanism() {
  const [showCode, setShowCode] = useState(false)
  return (
    <div>
      {/* === STANDARD SECTION (identical to all topics) === */}
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">Rendering Mechanism</h2>
        {/* live demo */}
      </div>
      <div className="mb-4">{/* code toggle — standard */}</div>
      <div className="p-4 bg-slate-50 rounded mb-4">
        <h3 className="text-sm font-semibold mb-2">So sánh</h3>
        {/* comparison text */}
      </div>

      {/* === DIAGRAM SECTION (new for deep-dive) === */}
      <div className="border border-slate-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold mb-4">
          Diagram: React Re-render Flow
        </h3>
        <svg
          viewBox="0 0 400 200"
          className="w-full h-auto"
          aria-label="React re-render flow diagram"
        >
          {/* inline SVG diagram */}
        </svg>
      </div>
    </div>
  )
}
```

**Key constraint from requirements:** "Deep Dive layout duy trì side-by-side demo area phía trên, diagram section phía dưới" — this means each panel (Vue left, React right) shows its OWN diagram illustrating that framework's mechanism. They are separate components, not a shared full-width diagram.

### Inline SVG Diagram Approach

**What:** Static SVG diagrams with `viewBox`, `<rect>`, `<text>`, `<path>` elements. Tailwind classes on the wrapping `<div>`.

**Anatomy of a diagram node:**

```svg
<svg viewBox="0 0 400 160" className="w-full h-auto max-w-md">
  <!-- Node box -->
  <rect x="10" y="60" width="100" height="40" rx="4"
    fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
  <text x="60" y="84" textAnchor="middle" fontSize="11" fill="#334155">
    Component
  </text>
  <!-- Arrow -->
  <path d="M110 80 L150 80" stroke="#94a3b8" strokeWidth="1.5"
    markerEnd="url(#arrow)" />
  <!-- Arrow marker definition in <defs> -->
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="8"
      refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8" />
    </marker>
  </defs>
</svg>
```

**Diagram color palette (matching project Tailwind slate palette):**
| Element | Fill / Stroke | Tailwind Equiv |
|---------|-------------|----------------|
| Box background | #f1f5f9 | slate-100 |
| Box border | #cbd5e1 | slate-300 |
| Arrow | #94a3b8 | slate-400 |
| Text (label) | #334155 | slate-700 |
| Highlighted box | #dbeafe | blue-100 |
| Highlighted border | #93c5fd | blue-300 |
| Diff/changed node | #dcfce7 | green-100 |

### Pattern 3: Registry Expansion

Add to `packages/shared/src/topics.ts` — 7 new entries using existing Category types.

```typescript
// scaling-up (4 topics)
{ id: 'routing', slug: 'routing', title: 'Routing', category: 'scaling-up', order: 1, description: 'Vue Router vs React Router' },
{ id: 'state-management', slug: 'state-management', title: 'State Management', category: 'scaling-up', order: 2, description: 'Pinia vs Zustand' },
{ id: 'testing', slug: 'testing', title: 'Testing', category: 'scaling-up', order: 3, description: 'Vitest + Vue Test Utils vs React Testing Library' },
{ id: 'typescript', slug: 'typescript', title: 'TypeScript', category: 'scaling-up', order: 4, description: 'defineProps<T>/defineEmits<T> vs React props typing' },

// deep-dive (3 topics)
{ id: 'rendering-mechanism', slug: 'rendering-mechanism', title: 'Rendering Mechanism', category: 'deep-dive', order: 1, description: 'Vue compiler optimized diff vs React full subtree diff' },
{ id: 'reactivity-in-depth', slug: 'reactivity-in-depth', title: 'Reactivity In-Depth', category: 'deep-dive', order: 2, description: 'Proxy-based tracking vs immutable state comparison' },
{ id: 'rerender-optimization', slug: 'rerender-optimization', title: 'Re-render & Optimization', category: 'deep-dive', order: 3, description: 'Vue auto optimization vs React manual (memo, useMemo, useCallback)' },
```

**Category types already defined** in `packages/shared/src/types.ts`:

```typescript
export type Category =
  | 'essentials'
  | 'components'
  | 'reusability'
  | 'built-in'
  | 'scaling-up' // ← already there
  | 'deep-dive' // ← already there
```

**CATEGORIES map already defined** in `packages/shared/src/constants.ts`:

```typescript
'scaling-up': 'Scaling Up',
'deep-dive': 'Deep Dive',
```

No changes needed to shared types or constants — just topic registry entries.

### Anti-Patterns to Avoid

- **Loading a diagramming library (Mermaid, D3, React Flow):** Bundle cost, complexity, no precedent in this codebase. Use inline SVG.
- **Full-width shared diagram component:** The architecture is two independent panels (Vue left, React right). Each panel's Deep Dive component renders its own diagram. There is no mechanism to render a shared section spanning both panels without changing `host/src/styles.css` — don't do this.
- **Using `import.meta.glob` for new category**: Already handled by the `**/*.tsx` and `**/*.vue` wildcards — no TopicRenderer changes needed.
- **Vue Router import in vue-app for SCAL-01 demo:** Vue Router is explicitly excluded from this project. The SCAL-01 topic shows Vue Router as a code snippet/explanation only, not a live running demo using actual Vue Router.
- **Using defineModel() macro inside defineComponent render fn**: Known pitfall from Phase 3. For inline child components in Vue topics, use `modelValue`/`emit` pattern.

## Don't Hand-Roll

| Problem                                   | Don't Build            | Use Instead                                                         | Why                                                                            |
| ----------------------------------------- | ---------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Syntax-highlighted code in diagram labels | Custom highlight logic | Plain SVG `<text>` elements                                         | Diagrams show flow/structure, not code — no highlighting needed                |
| Arrow markers in SVG                      | Custom CSS shapes      | SVG `<marker>` + `<defs>`                                           | Native SVG standard, renders correctly in all browsers                         |
| Responsive SVG                            | Custom resize JS       | SVG `viewBox` + `w-full h-auto`                                     | viewBox makes SVG naturally responsive with CSS                                |
| Pinia store in Vue demo                   | Full store setup       | Simplified ref-based demo with Pinia-like API shown in code snippet | Can't install Pinia just for one demo; show the concept via code + explanation |
| Zustand store in React demo               | Full store setup       | useState-based demo with Zustand code snippet                       | Same reason — no new packages                                                  |

**Key insight:** Scaling Up topics (Routing, State Mgmt, Testing) involve external libraries NOT installed in this project. The demo pattern must be "code snippet that shows what you would write + explanation" rather than a live running integration. This is consistent with how BTIN-01 (Transition) showed framer-motion code without actually running it.

## Common Pitfalls

### Pitfall 1: Installing Pinia/Zustand/Vue Router for Live Demos

**What goes wrong:** Attempting to create live interactive demos for SCAL-01 (Routing) and SCAL-02 (State Management) by actually installing those libraries.
**Why it happens:** The requirements say "live demo" — misinterpreted as requiring the actual library to run.
**How to avoid:** Use the BTIN-01 (Transition) precedent — show code snippet of the library's API with a simplified "simulated" demo using existing primitives (ref/useState). The educational value is in seeing the API comparison, not running a real Pinia store.
**Warning signs:** PR adds Pinia, Zustand, Redux Toolkit, or Vue Router to any package.json.

### Pitfall 2: Shared Full-Width Diagram Breaking Layout

**What goes wrong:** Creating a diagram that spans both Vue and React panels by modifying the host CSS grid or adding new layout containers.
**Why it happens:** Diagrams comparing two frameworks feel like they "should" be full-width.
**How to avoid:** Each topic file (Vue .vue and React .tsx) renders its own diagram focused on THAT framework's mechanism. The side-by-side layout provides the visual comparison naturally — Vue's Proxy diagram left, React's setter pattern diagram right.
**Warning signs:** Any changes to `packages/host/src/styles.css` or `#app-shell` grid.

### Pitfall 3: SVG Not Scaling on Mobile / Narrow Panels

**What goes wrong:** SVG with fixed `width`/`height` attributes overflows on narrow panels.
**Why it happens:** SVG is sized with px dimensions instead of using viewBox.
**How to avoid:** Always use `viewBox="0 0 W H"` without `width`/`height` attributes, and apply `className="w-full h-auto"` on the SVG element. The `max-w-*` class can cap the diagram size.
**Warning signs:** SVG element has `width="400" height="200"` without corresponding CSS `w-full`.

### Pitfall 4: Arrow Marker ID Collision

**What goes wrong:** Multiple SVGs on the same page using the same `id="arrow"` for marker definitions cause one SVG's arrows to appear wrong.
**Why it happens:** SVG `<marker>` IDs are global in the DOM.
**How to avoid:** Use unique IDs per diagram, e.g., `id="arrow-rendering"`, `id="arrow-reactivity"`.
**Warning signs:** Two SVGs with identical marker IDs.

### Pitfall 5: SCAL-03 Testing Topic Shows Impossible Browser Demo

**What goes wrong:** Attempting to create a "live test runner" in the browser for the Testing topic.
**Why it happens:** "Live demo" requirement misinterpreted for a topic about testing frameworks.
**How to avoid:** The demo for SCAL-03 is an **interactive code display** — show the test file side-by-side, optionally with a fake "run" button that shows simulated output. No actual Vitest/RTL execution in the browser.
**Warning signs:** Any attempt to dynamically import vitest or run test assertions.

## Code Examples

Verified patterns from existing codebase:

### Vue Topic File Structure (from existing built-in/Transition.vue pattern)

```vue
<script setup lang="ts">
import { ref } from 'vue'
const showCode = ref(false)
const DEMO_CODE = `// Vue code snippet`
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">Topic Title</h2>
      <!-- demo content -->
    </div>
    <div class="mb-4">
      <button
        @click="showCode = !showCode"
        class="text-xs text-blue-600 hover:text-blue-800 font-medium"
      >
        {{ showCode ? '▼ Ẩn code' : '▶ Xem code' }}
      </button>
      <pre
        v-if="showCode"
        class="mt-2 bg-slate-900 text-slate-100 text-xs p-4 rounded overflow-x-auto"
      >
        <code>{{ DEMO_CODE }}</code>
      </pre>
    </div>
    <div class="p-4 bg-slate-50 rounded">
      <h3 class="text-sm font-semibold mb-2">So sánh</h3>
      <div class="text-sm text-slate-600 space-y-2">
        <!-- comparison paragraphs -->
      </div>
    </div>
    <!-- DEEP DIVE ONLY: diagram section -->
    <div class="border border-slate-200 rounded-lg p-4 mt-4">
      <h3 class="text-sm font-semibold mb-4">Diagram: Vue Proxy Tracking</h3>
      <svg
        viewBox="0 0 360 140"
        class="w-full h-auto"
        aria-label="Vue Proxy tracking diagram"
      >
        <!-- diagram nodes and arrows -->
      </svg>
    </div>
  </div>
</template>
```

### PascalCase Filename Convention (from TopicRenderer slug-to-filename mapping)

```typescript
// TopicRenderer converts slug to PascalCase filename:
// 'state-management' → 'StateManagement'
// 'rendering-mechanism' → 'RenderingMechanism'
// 'rerender-optimization' → 'RerenderOptimization'
// 'reactivity-in-depth' → 'ReactivityInDepth'
// 'typescript' → 'Typescript'
```

Files must match exactly: `StateManagement.tsx`, `RerenderOptimization.vue`, etc.

### TopicRenderer glob pattern (already covers new folders)

```typescript
// React (packages/react-app/src/components/TopicRenderer.tsx)
const topicModules = import.meta.glob<{ default: React.ComponentType }>(
  '../topics/**/*.tsx', // ← ** covers scaling-up/ and deep-dive/ automatically
)

// Vue (packages/vue-app/src/components/TopicRenderer.vue)
const topicModules = import.meta.glob<{ default: any }>('../topics/**/*.vue')
```

No changes to TopicRenderer in either app.

## Diagram Content Reference

What each diagram should show (for planning content):

### DEEP-01: Rendering Mechanism

**Vue side diagram:** "Vue Compiler Optimization" — template compiled to optimized VNode with static hoisting + patch flags. Only dynamic nodes get diffed.

- Nodes: `Template` → `Compiler` → `VNode Tree (optimized)` → `DOM diff (targeted)`
- Highlight: patch flags on dynamic nodes (skip static)

**React side diagram:** "React Full Subtree Re-render" — on setState, entire subtree re-renders from that component down. React Fiber traverses all children.

- Nodes: `setState()` → `Component re-renders` → `Children re-render` → `Reconciler (all nodes)`
- Highlight: the full traversal vs Vue's targeted diff

### DEEP-02: Reactivity In-Depth

**Vue side diagram:** "Proxy-based Tracking" — accessing a reactive property automatically registers the effect as a dependency. Mutating triggers re-run.

- Nodes: `reactive({})` / `ref()` → `Proxy` → `Effect tracking (get)` → `Trigger (set)` → `Re-render`

**React side diagram:** "Immutable State + Explicit Setter" — state is plain value, setter call queues a re-render. No automatic tracking.

- Nodes: `useState()` → `[value, setter]` → `Manual setter call` → `Component re-render (full)`

### DEEP-03: Re-render & Optimization

**Vue side diagram:** "Auto Optimization" — component only re-renders when its template's reactive dependencies change. memo/useMemo not needed.

- Nodes: `Reactive dep changes` → `Only affected components re-render` → `Static children: SKIP`

**React side diagram:** "Manual Optimization" — without memoization, all children re-render on parent state change.

- Nodes: `Parent state change` → `React.memo?` (Y → skip, N → re-render) → `useMemo/useCallback` for expensive derivations

## State of the Art

| Old Approach               | Current Approach                         | When Changed      | Impact                                                       |
| -------------------------- | ---------------------------------------- | ----------------- | ------------------------------------------------------------ |
| Vue 2 Options API watchers | Vue 3 Composition API + Proxy reactivity | Vue 3.0 (2020)    | Deep Dive diagrams show Vue 3 Proxy, not Vue 2 getter/setter |
| React class components     | React function components + hooks        | React 16.8 (2019) | All React topics use hooks                                   |
| Pinia as Vue 4 RFC         | Pinia as official Vue state library      | 2021              | SCAL-02 uses Pinia as the Vue standard                       |
| Vuex                       | Pinia                                    | 2021              | Vuex is deprecated; never reference it                       |

**Deprecated/outdated:**

- Vuex: Replaced by Pinia as official Vue state management. Do not reference in SCAL-02.
- `react-router-dom`: Merged into `react-router` v7. Import from `react-router` only.
- Redux (without Redux Toolkit): RTK is the modern standard if Redux is shown at all. Prefer Zustand as simpler alternative.

## Environment Availability

Step 2.6: SKIPPED — Phase 4 is purely source file authoring (new .vue/.tsx files + shared registry update). No external tools, services, or CLI utilities beyond `pnpm dev` (already verified working from Phase 3).

## Validation Architecture

Step 2.4: nyquist_validation is explicitly `false` in `.planning/config.json`. Section skipped.

## Open Questions

1. **SCAL-02 Demo Approach for State Management**
   - What we know: Pinia and Zustand are NOT installed; project policy prohibits new packages for demo purposes
   - What's unclear: How "live" should the demo be? Pure code display? Or simulate with useState/ref?
   - Recommendation: Use same approach as BTIN-01 (Transition + framer-motion) — interactive demo using existing primitives (ref for Vue, useState for React) to simulate the concept; code snippet shows actual Pinia/Zustand API

2. **SCAL-03 Testing Demo — How Interactive?**
   - What we know: Can't actually run Vitest in browser
   - What's unclear: Is a "fake run" button (shows static output) acceptable?
   - Recommendation: Static code display of test file + description of test output. The topic's value is in showing the API difference, not running tests.

3. **Diagram Complexity — How Detailed?**
   - What we know: Diagrams must "minh họa" (illustrate) the mechanism; 3-6 nodes per diagram is readable in a half-screen panel
   - What's unclear: Whether arrows should show data flow (→) or call stack (indented boxes)
   - Recommendation: Simple left-to-right flow diagrams with 4-6 nodes. Avoid complex branching that becomes unreadable at half-screen width (~400px).

## Sources

### Primary (HIGH confidence)

- `/home/tungpt244/workspace/vibe/packages/shared/src/types.ts` — Category type already includes `'scaling-up'` and `'deep-dive'`
- `/home/tungpt244/workspace/vibe/packages/shared/src/constants.ts` — CATEGORIES map already has both new categories
- `/home/tungpt244/workspace/vibe/packages/react-app/src/components/TopicRenderer.tsx` — `**/*.tsx` glob covers new folders automatically
- `/home/tungpt244/workspace/vibe/packages/vue-app/src/components/TopicRenderer.vue` — `**/*.vue` glob covers new folders automatically
- `/home/tungpt244/workspace/vibe/.planning/phases/03-core-curriculum/03-UI-SPEC.md` — Locked design system: spacing, color, typography
- All 28 existing topic files — locked pattern for demo box + code toggle + explanation box

### Secondary (MEDIUM confidence)

- MDN SVG documentation — SVG `viewBox`, `<marker>`, `<defs>` attributes for responsive inline diagrams
- Vue 3 documentation — Compiler optimization (patch flags, static hoisting) for DEEP-01 diagram content
- React documentation — Reconciler and fiber tree traversal for DEEP-01 React side diagram

### Tertiary (LOW confidence)

- Training data (Aug 2025) — Pinia as official Vue state management standard, Zustand as React lightweight standard

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH — all packages already installed; no new deps required
- Architecture patterns: HIGH — new folders, glob auto-coverage, and registry expansion are all verified from existing code
- Diagram approach: HIGH — inline SVG with viewBox is browser-native, no library needed; confirmed by MDN
- Deep Dive layout: HIGH — each panel renders independently, diagram is per-panel section appended after explanation
- Content for diagrams: MEDIUM — rendering mechanism and reactivity model descriptions are well-known but not verified against latest framework docs

**Research date:** 2026-03-31
**Valid until:** 2026-05-01 (stable stack — Tailwind v4, React 19, Vue 3.5 unlikely to change materially in 30 days)

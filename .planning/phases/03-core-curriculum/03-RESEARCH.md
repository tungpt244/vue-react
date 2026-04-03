# Phase 3: Core Curriculum - Research

**Researched:** 2026-03-31
**Domain:** Vue 3 + React 19 topic authoring, localStorage progress tracking, realtime search/filter
**Confidence:** HIGH

## Summary

Phase 3 is a content-heavy phase with two types of work: (1) authoring 22 new topic files following a locked pattern from Phase 2, and (2) extending the Sidebar component with search/filter (ENHC-01) and progress tracking (ENHC-02). No new architectural concepts are introduced — the phase extends proven infrastructure.

The topic authoring work is highly parallelizable. All 22 topics follow the exact same file structure: demo box + code toggle + explanation box. The pattern is locked (Phase 2 decision) and fully verified in 6 existing topic files. The only per-topic variation is demo content, code snippet, and comparison text.

The sidebar enhancements are contained to a single file (`packages/react-app/src/components/Sidebar.tsx`) plus a companion Vue search-hide behavior in `App.vue`. localStorage access needs a graceful degradation wrapper since the UI-SPEC mandates silent failure when localStorage is unavailable.

**Primary recommendation:** Split Phase 3 into 5-6 plans — one for shared registry expansion + new category folders, one per content batch (Essentials, Components, Reusability, Built-in), and one final plan for sidebar enhancements + spacing cleanup. This avoids monolithic plans while keeping related topic pairs (Vue + React) together.

<phase_requirements>

## Phase Requirements

| ID      | Description                                                           | Research Support                                |
| ------- | --------------------------------------------------------------------- | ----------------------------------------------- |
| ESS-04  | Conditional Rendering — v-if/v-else/v-show vs &&/ternary/early return | Standard Vue + React pattern, well-understood   |
| ESS-05  | List Rendering — v-for + :key vs .map() + key                         | Standard Vue + React pattern                    |
| ESS-06  | Event Handling — @click/@input + modifiers vs onClick/onChange        | Standard Vue + React pattern                    |
| ESS-07  | Form Bindings — v-model vs controlled components                      | Standard Vue + React pattern                    |
| ESS-09  | Template Refs — ref + template ref vs useRef                          | Standard Vue + React pattern                    |
| COMP-01 | Props — defineProps<T>() vs props type annotation                     | Standard Vue + React component pattern          |
| COMP-02 | Events/Callbacks — emit() vs callback props                           | Standard Vue + React component pattern          |
| COMP-03 | Component v-model — defineModel() vs controlled + callback            | Vue 3.4+ defineModel() API                      |
| COMP-04 | Fallthrough Attributes — auto forward vs spread ...rest props         | Vue inheritAttrs, React ...rest                 |
| COMP-05 | Slots — default/named slots vs children + render props                | Vue slots vs React children                     |
| COMP-06 | Provide/Inject — provide()/inject() vs createContext/useContext       | Dependency injection pattern                    |
| COMP-07 | Async Components — defineAsyncComponent vs React.lazy + Suspense      | Vue + React lazy loading                        |
| REUS-01 | Composables/Hooks — composables vs custom hooks                       | Custom hook pattern                             |
| REUS-02 | Custom Directives — directive() vs hooks/HOC                          | Vue-only concept, React has no equivalent       |
| REUS-03 | Plugins — app.use() vs Context/Provider pattern                       | Vue plugin system vs React context              |
| BTIN-01 | Transition — `<Transition>` vs framer-motion                          | Vue built-in + framer-motion (already in stack) |
| BTIN-02 | TransitionGroup — `<TransitionGroup>` vs manual                       | Vue built-in vs CSS transition manually         |
| BTIN-03 | KeepAlive — `<KeepAlive>` vs manual state management                  | Vue-only concept                                |
| BTIN-04 | Teleport — `<Teleport>` vs createPortal                               | Vue + React DOM portals                         |
| BTIN-05 | Suspense — `<Suspense>` vs `<Suspense>`                               | Both frameworks have Suspense                   |
| ENHC-01 | Search/filter topics by keyword                                       | localStorage + realtime array filter            |
| ENHC-02 | Progress tracking with localStorage checkmarks                        | localStorage persistence                        |

</phase_requirements>

---

## Standard Stack

### Core (all already installed — no new dependencies needed)

| Library         | Version | Purpose                                                            | Why Standard                          |
| --------------- | ------- | ------------------------------------------------------------------ | ------------------------------------- |
| Vue 3           | ^3.5.31 | Vue side topic authoring                                           | Already in stack                      |
| React           | ^19.2.4 | React side topic authoring                                         | Already in stack                      |
| lucide-react    | ^1.7.0  | `CheckCircle2` + `Circle` icons for progress tracking              | Already in stack, required by UI-SPEC |
| lucide-vue-next | ^1.0.0  | Same icons on Vue side (sidebar is React-only but kept for parity) | Already in stack                      |

### New Dependencies

None. Phase 3 uses zero new packages. All required APIs (localStorage, array.filter, React useState, Vue ref) are either browser-native or already installed.

**framer-motion note:** BTIN-01 (Transition vs framer-motion) requires framer-motion for the React side demo. Verify if it is installed:

```bash
cd /home/tungpt244/workspace/vibe && cat packages/react-app/package.json | grep framer
```

If not installed, BTIN-01's React demo must use CSS transitions instead, or framer-motion must be added as a dependency in that plan. This is a LOW-risk decision point — the topic can demonstrate the concept with either approach.

---

## Architecture Patterns

### Recommended Project Structure After Phase 3

```
packages/
├── shared/src/
│   └── topics.ts                    ← expand: add 22 new topic entries
├── react-app/src/
│   ├── components/
│   │   └── Sidebar.tsx              ← extend: search input + checkmarks
│   └── topics/
│       ├── essentials/              ← add 5 new .tsx files
│       ├── components/              ← NEW folder: 7 .tsx files
│       ├── reusability/             ← NEW folder: 3 .tsx files
│       └── built-in/                ← NEW folder: 5 .tsx files
└── vue-app/src/
    └── topics/
        ├── essentials/              ← add 5 new .vue files
        ├── components/              ← NEW folder: 7 .vue files
        ├── reusability/             ← NEW folder: 3 .vue files
        └── built-in/                ← NEW folder: 5 .vue files
```

### Pattern 1: Topic File Structure (LOCKED from Phase 2)

Every topic file follows this exact structure. Deviation breaks visual consistency.

**React (.tsx):**

```tsx
// Source: packages/react-app/src/topics/essentials/Reactivity.tsx (Phase 2 reference)
import { useState } from 'react'

const DEMO_CODE = `// code string shown in pre/code block`

export default function TopicName() {
  const [showCode, setShowCode] = useState(false)
  // ... other state

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">{Title}</h2>
        {/* interactive demo */}
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
          <p>
            <strong>Key point.</strong> Explanation with{' '}
            <code className="bg-slate-200 px-1 rounded">inline code</code>.
          </p>
        </div>
      </div>
    </div>
  )
}
```

Note: Code block padding is `p-4` (16px), not `p-3` (12px). UI-SPEC mandates updating existing Phase 2 files from `p-3` to `p-4`.

**Vue (.vue):**

```vue
<!-- Source: packages/vue-app/src/topics/essentials/Reactivity.vue (Phase 2 reference) -->
<script setup lang="ts">
import { ref } from 'vue'

const showCode = ref(false)
const DEMO_CODE = `// code string`
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">Title</h2>
      <!-- interactive demo -->
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
      ><code>{{ DEMO_CODE }}</code></pre>
    </div>

    <div class="p-4 bg-slate-50 rounded">
      <h3 class="text-sm font-semibold mb-2">So sánh</h3>
      <div class="text-sm text-slate-600 space-y-2">
        <p><strong>Key point.</strong> Explanation.</p>
      </div>
    </div>
  </div>
</template>
```

### Pattern 2: Topic Registry Expansion (packages/shared/src/topics.ts)

Each new topic requires an entry in `topics.ts`. The `toPascalCase` converter in TopicRenderer maps slug to filename, so the slug must exactly match the filename (minus extension, minus PascalCase conversion):

- slug `conditional-rendering` → file `ConditionalRendering.tsx` / `ConditionalRendering.vue`
- slug `list-rendering` → file `ListRendering.tsx` / `ListRendering.vue`
- The category field MUST use one of the union types from `types.ts`: `'essentials' | 'components' | 'reusability' | 'built-in' | 'scaling-up' | 'deep-dive'`

**Important:** The `CATEGORIES` constant in `constants.ts` uses key `'built-in'` (with hyphen), not `'builtIn'`. Category folders must match: `topics/built-in/` not `topics/builtIn/`.

### Pattern 3: Search Filter (ENHC-01) in Sidebar.tsx

The search filter is a pure local state operation — no debounce needed (local array filter is synchronous). The implementation adds one `useState` for the search query and filters the topic list before rendering.

Key behavioral rules from UI-SPEC:

- Category headers still show if at least 1 matching topic exists in that category
- Category headers hide entirely if 0 matches in that category
- Empty state: `"Không tìm thấy topic nào."` in `text-sm text-slate-400 px-3 py-2`
- Input style: `w-full px-2 py-2 text-sm border border-slate-200 rounded bg-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500`
- Input hidden when sidebar is collapsed (already handled by `{!collapsed && <nav>}` structure)

### Pattern 4: Progress Tracking (ENHC-02) in Sidebar.tsx

localStorage key: `vibe-progress`, value: JSON array of visited topic ids (e.g., `["reactivity","computed"]`).

The topic is marked visited when the user clicks it (not a separate checkbox). This means `handleClick` must also update the progress state.

```tsx
// Source: UI-SPEC + localStorage API (browser-native)
const [visited, setVisited] = useState<string[]>(() => {
  try {
    return JSON.parse(localStorage.getItem('vibe-progress') ?? '[]')
  } catch {
    return []
  }
})

function handleClick(category: string, slug: string) {
  navigate(`/${category}/${slug}`)
  window.dispatchEvent(/* existing CustomEvent */)

  if (!visited.includes(slug)) {
    const updated = [...visited, slug]
    setVisited(updated)
    try {
      localStorage.setItem('vibe-progress', JSON.stringify(updated))
    } catch {
      // localStorage unavailable — silent degradation per UI-SPEC
    }
  }
}
```

Icon usage per UI-SPEC:

- Visited: `<CheckCircle2 size={14} className="text-blue-500" />`
- Not visited: `<Circle size={14} className="text-slate-300" />`

### Anti-Patterns to Avoid

- **Using `py-1.5` or `p-3` in code blocks:** Non-standard spacing. Use `py-2` and `p-4`. Existing Phase 2 files need backfill.
- **Using `font-medium` (weight 500):** UI-SPEC prohibits it. Use `font-normal` or `font-semibold` only.
- **Adding `<h2>` outside the demo box:** The demo box wraps both the h2 title and the interactive content. `ClassStyleBindings.tsx` has a deviation (h2 before the demo box wrapper) — do not replicate this pattern.
- **Using `reactive()` instead of `ref()` for simple state in Vue topics:** Keep Vue topic demos consistent with established pattern unless the topic specifically demonstrates reactive().
- **Creating topic files without registry entries:** TopicRenderer uses `import.meta.glob` to find files, but `getAllCategories()` and `getTopicsByCategory()` rely on `topics.ts`. Both must be updated.
- **Wrong category slug in folder path:** `built-in` (hyphenated), not `builtIn`. The `toPascalCase` function only applies to topic slugs, not category names. Category folder names must be lowercase-hyphenated to match the registry.

---

## Don't Hand-Roll

| Problem                 | Don't Build                | Use Instead                                              | Why                                                                                                                 |
| ----------------------- | -------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Conditional class names | Custom className builder   | Template literals or existing `clsx` (already installed) | clsx handles edge cases with null/undefined                                                                         |
| localStorage access     | Custom storage abstraction | Inline try/catch per UI-SPEC                             | Phase 3 scope is minimal — no abstraction needed                                                                    |
| Icon components         | SVG inline or custom icon  | lucide-react / lucide-vue-next (already installed)       | Consistent, tree-shakeable                                                                                          |
| Topic lazy loading      | Custom async loader        | Existing TopicRenderer handles this already              | TopicRenderer uses `import.meta.glob` + `React.lazy` + `defineAsyncComponent` — new topic files are auto-discovered |

**Key insight:** Topic files are auto-discovered via `import.meta.glob('../topics/**/*.tsx')` in TopicRenderer. Adding a new .tsx file in the right folder path is sufficient for the renderer to find it — no manual import or registration needed beyond the shared `topics.ts` registry entry.

---

## Common Pitfalls

### Pitfall 1: Category Folder Name Mismatch

**What goes wrong:** Creating `topics/builtIn/` instead of `topics/built-in/` causes 404s.
**Why it happens:** Category type value is `'built-in'` (hyphenated) in `types.ts`, but developer uses camelCase for folder.
**How to avoid:** Always derive folder path directly from the `category` field value in `topics.ts`. Verify folder path matches `../topics/${category}/${toPascalCase(topicId)}.tsx` template in TopicRenderer.
**Warning signs:** Topic shows "Không tìm thấy component" in the renderer despite file existing.

### Pitfall 2: Missing topics.ts Entry for New Folders

**What goes wrong:** Topic file exists, component loads, but sidebar doesn't show it and `getAllCategories()` returns empty for new categories.
**Why it happens:** `getAllCategories()` reads from `topics` array, not filesystem. New category folders only appear in sidebar when topics.ts has entries for that category.
**How to avoid:** Always add registry entries BEFORE or WITH the topic files, never after.

### Pitfall 3: Spacing Backfill Forgotten

**What goes wrong:** Inconsistent spacing between old and new topics — `p-3` in Phase 2 files, `p-4` in Phase 3 files.
**Why it happens:** Phase 2 used `p-3` for code blocks; UI-SPEC mandates `p-4` for all files.
**How to avoid:** Plan a dedicated task to backfill Phase 2 files (6 React + 6 Vue files), and write all Phase 3 files with `p-4` from the start.
**Warning signs:** Visible padding inconsistency between topics in the same session.

### Pitfall 4: localStorage Access Without Try/Catch

**What goes wrong:** App crashes in private browsing mode or when storage quota exceeded.
**Why it happens:** `localStorage.getItem/setItem` throw in some environments.
**How to avoid:** Wrap ALL localStorage calls in try/catch. UI-SPEC mandates silent degradation.

### Pitfall 5: defineModel() Vue Version Requirement

**What goes wrong:** `defineModel()` macro not recognized.
**Why it happens:** `defineModel()` was stabilized in Vue 3.4. The project uses Vue ^3.5.31 so this is fine, but it must be imported correctly.
**How to avoid:** In Vue 3.4+, `defineModel()` is a built-in compiler macro — no import needed (same as `defineProps`). Do NOT write `import { defineModel } from 'vue'`.

### Pitfall 6: h2 Placement Outside Demo Box

**What goes wrong:** `ClassStyleBindings.tsx` places `<h2>` before the demo box, not inside it. This deviates from the locked pattern.
**Why it happens:** Historical deviation in Phase 2.
**How to avoid:** All Phase 3 topics MUST place h2 inside the demo box (first child), per the Topic Template Contract in UI-SPEC. Do not copy ClassStyleBindings structure.

---

## Code Examples

### Sidebar Search Filter (ENHC-01)

```tsx
// Source: UI-SPEC interaction contract + React useState pattern
const [search, setSearch] = useState('')

const filteredCategories = getAllCategories().map((cat) => ({
  cat,
  topics: getTopicsByCategory(cat).filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  ),
})).filter(({ topics }) => topics.length > 0)

// Inside the not-collapsed block, before <nav>:
<input
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Tìm topic..."
  className="w-full px-2 py-2 text-sm border border-slate-200 rounded bg-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
/>
```

### Progress Checkmark Icons (ENHC-02)

```tsx
// Source: UI-SPEC + lucide-react
import { CheckCircle2, Circle } from 'lucide-react'

// Inside each topic button:
;<div className="flex items-center justify-between w-full">
  <span>{topic.title}</span>
  {visited.includes(topic.id) ? (
    <CheckCircle2 size={14} className="text-blue-500 shrink-0" />
  ) : (
    <Circle size={14} className="text-slate-300 shrink-0" />
  )}
</div>
```

### Vue Topic with Child Component (COMP-01 pattern)

```vue
<!-- defineProps — no import needed, compiler macro -->
<script setup lang="ts">
const props = defineProps<{
  title: string
  count?: number
}>()
</script>
```

### Vue defineModel (COMP-03 pattern)

```vue
<!-- defineModel — no import needed, Vue 3.4+ compiler macro -->
<script setup lang="ts">
const model = defineModel<string>()
// model.value = 'new value' updates parent
</script>

<template>
  <input v-model="model" />
</template>
```

---

## State of the Art

| Old Approach                                  | Current Approach              | When Changed | Impact                                                                   |
| --------------------------------------------- | ----------------------------- | ------------ | ------------------------------------------------------------------------ |
| `defineModel` (experimental)                  | `defineModel()` stable        | Vue 3.4      | Can use without `@experimental` flag                                     |
| React.lazy requires default export            | Still requires default export | React 19     | All topic files must use `export default function` (already the pattern) |
| `import { CheckCircle2 } from 'lucide-react'` | Same                          | Current      | No change — lucide API stable                                            |

**Deprecated/outdated:**

- `p-3` for code blocks: UI-SPEC replaces with `p-4` — backfill needed for Phase 2 files
- `py-1.5` for topic items: UI-SPEC replaces with `py-2` — backfill needed for Phase 2 files

---

## Open Questions

1. **framer-motion for BTIN-01**
   - What we know: BTIN-01 compares `<Transition>` vs framer-motion. CLAUDE.md mentions framer-motion is NOT in the current stack.
   - What's unclear: Whether to add framer-motion as a dependency for BTIN-01's React demo, or demonstrate React transitions using CSS transitions + `useEffect` instead.
   - Recommendation: Check `packages/react-app/package.json` before planning BTIN-01. If not installed, the plan for BTIN-01 should add framer-motion as a dev dependency OR substitute with CSS `transition` + `className` toggle approach. The CSS approach is simpler and avoids a new dep for a personal learning tool.

2. **Aria-label on collapse toggle**
   - What we know: UI-SPEC mandates `aria-label="Collapse sidebar"` / `aria-label="Expand sidebar"`. Current Sidebar.tsx uses `title` attribute only.
   - What's unclear: Whether to fix this in the sidebar enhancement plan or as a separate backfill.
   - Recommendation: Fix during the ENHC-01/ENHC-02 sidebar plan since that plan touches Sidebar.tsx anyway.

---

## Environment Availability

Step 2.6: SKIPPED (no external dependencies — all tools already verified in Phase 1 and 2. Phase 3 adds zero new external dependencies beyond what is already installed.)

---

## Sources

### Primary (HIGH confidence)

- Codebase inspection — `packages/shared/src/topics.ts`, `types.ts`, `constants.ts` — exact registry shape and category values verified
- Codebase inspection — `packages/react-app/src/components/Sidebar.tsx` — existing component structure for ENHC-01/02 integration
- Codebase inspection — `packages/react-app/src/components/TopicRenderer.tsx` — auto-discovery via `import.meta.glob` verified, no manual registration needed
- `03-UI-SPEC.md` — All interaction contracts, color tokens, spacing rules, component inventory for Phase 3
- `packages/react-app/src/topics/essentials/Reactivity.tsx` + `ClassStyleBindings.tsx` — locked topic template pattern

### Secondary (MEDIUM confidence)

- Vue 3.5 documentation (training data, Aug 2025) — `defineModel()` stable in 3.4+, `defineProps`/`defineEmits` compiler macros require no import
- React 19 documentation (training data, Aug 2025) — `React.lazy` still requires default export, `useRef` API unchanged

### Tertiary (LOW confidence)

- framer-motion availability in project — not verified against actual package.json, noted as open question

---

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH — all verified against actual installed packages in monorepo
- Architecture: HIGH — patterns directly read from existing working topic files
- Pitfalls: HIGH for structural pitfalls (verified by reading TopicRenderer source), MEDIUM for Vue API nuances (training data)
- Search/progress tracking: HIGH — based on UI-SPEC contract + browser-native localStorage API

**Research date:** 2026-03-31
**Valid until:** 2026-04-30 (stable framework versions, no fast-moving dependencies)

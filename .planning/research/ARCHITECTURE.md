# Architecture Research

**Domain:** Multi-framework monorepo (Vue 3 + React side-by-side on same page)
**Researched:** 2026-03-26
**Confidence:** MEDIUM-HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         Host App (Vite)                         │
│  vite.config.ts: @vitejs/plugin-vue + @vitejs/plugin-react      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐   CustomEvent    ┌──────────────────────┐  │
│  │   React App      │ ──────────────► │   Vue 3 App           │  │
│  │   #react-root    │  'route-change' │   #vue-root           │  │
│  │                  │                 │                       │  │
│  │  React Router    │                 │  Event Listener       │  │
│  │  Navigation UI   │                 │  Dynamic Component    │  │
│  │  Topic Renderer  │                 │  Topic Renderer       │  │
│  └────────┬─────────┘                 └───────────┬───────────┘  │
│           │                                       │              │
│           └───────────────┬───────────────────────┘              │
│                           │                                      │
│              ┌────────────▼────────────┐                         │
│              │     Shared Package       │                         │
│              │  types.ts  topics.ts     │                         │
│              │  constants.ts            │                         │
│              └─────────────────────────┘                         │
└─────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Implementation |
|-----------|----------------|----------------|
| **Host (`packages/host`)** | Vite config, HTML shell with 2 root divs, boot script that imports both apps | `main.ts` imports vue-app/main + react-app/main, `index.html` has `#vue-root` + `#react-root` |
| **React App (`packages/react-app`)** | Right-side demos, React Router (owns the URL), navigation sidebar, topic descriptions | `createRoot(#react-root).render(<App />)`, dispatches `CustomEvent` on route change |
| **Vue App (`packages/vue-app`)** | Left-side demos, listens for route events, renders matching Vue component | `createApp(App).mount('#vue-root')`, `window.addEventListener('route-change', ...)` |
| **Shared (`packages/shared`)** | Topic registry (single source of truth), TypeScript types, constants | Pure TS package, no framework dependencies, consumed by both apps |

## Recommended Project Structure

```
vibe/
├── packages/
│   ├── shared/                        # Framework-agnostic shared code
│   │   ├── src/
│   │   │   ├── types.ts               # Topic, Category, RouteInfo types
│   │   │   ├── topics.ts              # Topic registry — THE source of truth
│   │   │   ├── constants.ts           # Event names, route patterns
│   │   │   └── index.ts              # Barrel export
│   │   ├── tsconfig.json
│   │   └── package.json              # "name": "@vibe/shared"
│   │
│   ├── vue-app/
│   │   ├── src/
│   │   │   ├── topics/               # Mirror structure with react-app
│   │   │   │   ├── essentials/
│   │   │   │   ├── components/
│   │   │   │   ├── reusability/
│   │   │   │   ├── built-in/
│   │   │   │   ├── deep-dive/
│   │   │   │   └── scaling/
│   │   │   ├── composables/
│   │   │   │   └── useRouteSync.ts   # Listen to CustomEvent, expose reactive route
│   │   │   ├── components/
│   │   │   │   └── TopicRenderer.vue # Dynamic component loader
│   │   │   ├── App.vue
│   │   │   └── main.ts
│   │   ├── tsconfig.json
│   │   └── package.json              # "name": "@vibe/vue-app"
│   │
│   ├── react-app/
│   │   ├── src/
│   │   │   ├── topics/               # Mirror structure with vue-app
│   │   │   │   ├── essentials/
│   │   │   │   ├── components/
│   │   │   │   ├── reusability/
│   │   │   │   ├── built-in/
│   │   │   │   ├── deep-dive/
│   │   │   │   └── scaling/
│   │   │   ├── hooks/
│   │   │   │   └── useRouteDispatch.ts  # Dispatch CustomEvent on navigate
│   │   │   ├── components/
│   │   │   │   ├── Sidebar.tsx          # Navigation from topic registry
│   │   │   │   ├── TopicRenderer.tsx    # Dynamic component loader
│   │   │   │   └── Layout.tsx           # Shell layout with sidebar + content
│   │   │   ├── router.tsx
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   ├── tsconfig.json
│   │   └── package.json              # "name": "@vibe/react-app"
│   │
│   └── host/
│       ├── index.html                # Two root divs
│       ├── src/
│       │   └── main.ts               # Import & boot both apps
│       ├── vite.config.ts            # Both Vue + React plugins
│       ├── tsconfig.json
│       └── package.json              # "name": "@vibe/host"
│
├── pnpm-workspace.yaml
├── package.json                      # Root scripts: dev, build, lint
└── tsconfig.base.json                # Shared TS config
```

### Structure Rationale

- **`shared/` has zero framework deps:** Pure TypeScript ensures both Vue and React can import it without bundler conflicts. The topic registry here drives navigation, component resolution, and content for both apps.
- **Mirror `topics/` folders:** Enforces 1:1 correspondence. When adding a new topic, both folders get a file. This is critical for the side-by-side learning concept.
- **`host/` is minimal:** Its only job is HTML shell + Vite config + boot script. No UI logic lives here. The navigation UI lives in react-app because React Router lives there.
- **Each app has its own `main.ts`:** Independent mount points. They share a page but not a component tree. This is intentional -- they are peers, not parent-child.

## Architectural Patterns

### Pattern 1: Dual-Root Mount (Independent App Instances)

**What:** Two framework apps mounted to separate DOM elements on the same page, managed by one Vite dev server.
**When to use:** When apps need to run independently but share the same viewport.
**Trade-offs:** Simple isolation (no framework conflicts), but requires explicit communication mechanism. No shared component tree means no shared context/state by default.

**Example (host/src/main.ts):**
```typescript
// Boot both apps independently
import '@vibe/vue-app/main'
import '@vibe/react-app/main'
```

**Example (host/index.html):**
```html
<body>
  <div id="app-shell">
    <div id="sidebar"></div>
    <div id="comparison-area">
      <div id="vue-root"></div>
      <div id="react-root"></div>
    </div>
    <div id="description-area"></div>
  </div>
  <script type="module" src="/src/main.ts"></script>
</body>
```

### Pattern 2: CustomEvent Bridge (Decoupled Communication)

**What:** React Router dispatches `CustomEvent` on `window` when route changes. Vue app listens and reacts.
**When to use:** When two isolated apps on the same page need lightweight, unidirectional communication without shared state libraries.
**Trade-offs:** Very simple, no dependencies, follows browser standards. But: no type safety at the boundary unless you define event types in shared package, no guarantee listener is ready when event fires (race condition on boot).

**Example (shared/src/types.ts):**
```typescript
export interface RouteChangeDetail {
  category: string
  topicId: string
}

export const ROUTE_CHANGE_EVENT = 'route-change'
```

**Example (react-app, dispatch side):**
```typescript
// hooks/useRouteDispatch.ts
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ROUTE_CHANGE_EVENT, type RouteChangeDetail } from '@vibe/shared'

export function useRouteDispatch() {
  const { category, topicId } = useParams<{ category: string; topicId: string }>()

  useEffect(() => {
    if (category && topicId) {
      window.dispatchEvent(
        new CustomEvent<RouteChangeDetail>(ROUTE_CHANGE_EVENT, {
          detail: { category, topicId },
        })
      )
    }
  }, [category, topicId])
}
```

**Example (vue-app, listener side):**
```typescript
// composables/useRouteSync.ts
import { ref, onMounted, onUnmounted } from 'vue'
import { ROUTE_CHANGE_EVENT, type RouteChangeDetail } from '@vibe/shared'

export function useRouteSync() {
  const category = ref('')
  const topicId = ref('')

  function handleRouteChange(e: Event) {
    const { detail } = e as CustomEvent<RouteChangeDetail>
    category.value = detail.category
    topicId.value = detail.topicId
  }

  onMounted(() => window.addEventListener(ROUTE_CHANGE_EVENT, handleRouteChange))
  onUnmounted(() => window.removeEventListener(ROUTE_CHANGE_EVENT, handleRouteChange))

  return { category, topicId }
}
```

### Pattern 3: Dynamic Component Resolution from Registry

**What:** Topic registry in shared package maps `(category, topicId)` to component names. Each app resolves components dynamically using lazy imports.
**When to use:** When the set of renderable components is data-driven and should be consistent across apps.
**Trade-offs:** Single source of truth for topics, easy to add new ones. But dynamic imports need careful handling for build-time code splitting and error states.

**Example (react-app):**
```typescript
// TopicRenderer.tsx
import { lazy, Suspense } from 'react'

const topicModules = import.meta.glob('../topics/**/*.tsx')

function TopicRenderer({ category, topicId }: { category: string; topicId: string }) {
  const path = `../topics/${category}/${topicId}.tsx`
  const LazyComponent = lazy(topicModules[path] as () => Promise<{ default: React.FC }>)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  )
}
```

**Example (vue-app):**
```vue
<!-- TopicRenderer.vue -->
<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'

const props = defineProps<{ category: string; topicId: string }>()

const topicModules = import.meta.glob('../topics/**/*.vue')

const TopicComponent = computed(() => {
  const path = `../topics/${props.category}/${props.topicId}.vue`
  if (topicModules[path]) {
    return defineAsyncComponent(topicModules[path] as () => Promise<any>)
  }
  return null
})
</script>

<template>
  <component :is="TopicComponent" v-if="TopicComponent" />
  <div v-else>Topic not found</div>
</template>
```

### Pattern 4: Vite Multi-Framework Plugin Config

**What:** Single Vite config loading both `@vitejs/plugin-vue` and `@vitejs/plugin-react` to handle `.vue` SFC and `.tsx` JSX in the same build.
**When to use:** This exact project pattern -- two frameworks compiled by one Vite instance.
**Trade-offs:** Works out of the box because Vite plugins operate on file extensions (`.vue` goes to Vue plugin, `.tsx/.jsx` goes to React plugin). No conflict. However, HMR for both frameworks must be independently wired.

**Example (host/vite.config.ts):**
```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue(), react()],
  resolve: {
    alias: {
      '@vibe/shared': resolve(__dirname, '../shared/src'),
      '@vibe/vue-app': resolve(__dirname, '../vue-app/src'),
      '@vibe/react-app': resolve(__dirname, '../react-app/src'),
    },
  },
})
```

**Important note:** Both `@vitejs/plugin-vue` and `@vitejs/plugin-react` can coexist in the same Vite config. The Vue plugin processes `.vue` files, the React plugin processes `.tsx/.jsx` files. No file extension overlap means no conflicts. This is a known, supported pattern.

## Data Flow

### Route Change Flow (Primary)

```
User clicks sidebar link
    │
    ▼
React Router navigates (URL changes)
    │
    ▼
React route params update → useRouteDispatch hook fires
    │
    ├──► React TopicRenderer loads react-app/topics/{cat}/{id}.tsx
    │
    └──► window.dispatchEvent(CustomEvent('route-change'))
              │
              ▼
         Vue useRouteSync composable receives event
              │
              ▼
         Vue TopicRenderer loads vue-app/topics/{cat}/{id}.vue
```

### Boot Sequence (Critical Order)

```
1. Browser loads host/index.html
    │
    ▼
2. host/src/main.ts executes
    │
    ├──► import '@vibe/vue-app/main'   → createApp(App).mount('#vue-root')
    │                                     Vue starts listening for events
    │
    └──► import '@vibe/react-app/main' → createRoot(#react-root).render(<App />)
                                          React Router reads current URL
                                          Dispatches initial route-change event
```

**Race condition risk:** If React dispatches the initial `route-change` event before Vue has mounted and registered its listener, Vue misses the first route. Mitigation: Vue should read the current URL on mount as fallback, not rely solely on events for initial state.

### Key Data Flows

1. **Topic Discovery:** `shared/topics.ts` registry imported by both apps. React renders sidebar from it. Vue uses it for validation. Both use it for component path resolution.

2. **Route Sync:** Unidirectional. React Router is the source of truth for URL state. Vue is a consumer via CustomEvent. Vue never writes to the URL.

3. **Source Code Display:** Each topic component can export/co-locate its own source code as a string (using Vite's `?raw` import), or source code can be fetched at build time. This is per-component, not a shared concern.

## Build Order (Dependency Graph)

The monorepo packages have clear dependency ordering:

```
shared (0 deps)
    │
    ├──► vue-app (depends on shared)
    │
    ├──► react-app (depends on shared)
    │
    └──► host (depends on shared, vue-app, react-app)
```

**Recommended implementation order:**

| Phase | Package | Why First |
|-------|---------|-----------|
| 1 | `shared` | Foundation. Types and registry must exist before either app can import them. |
| 2 | `host` (skeleton) | Vite config + HTML shell + boot script. Needed to run anything in browser. |
| 3 | `react-app` (shell) | React Router + sidebar + layout. This owns navigation, so it must exist to drive the app. |
| 4 | `vue-app` (shell) | Event listener + dynamic renderer. Depends on React dispatching events. |
| 5 | First topic (both apps) | One topic end-to-end proves the full pipeline works. |
| 6+ | Remaining topics | Incremental. Each topic is independent of others. |

**Key insight:** `host` and both app shells should be built before any topic content. The infrastructure (routing, event bridge, dynamic loading) is the hard part. Individual topics are mechanical once the pipeline works.

## Anti-Patterns

### Anti-Pattern 1: Shared State Library Between Frameworks

**What people do:** Introduce Redux/Pinia/Zustand as a shared state bridge between Vue and React.
**Why it's wrong:** Massive over-engineering for this use case. The only shared state is "which topic is currently selected" -- a single string. CustomEvent handles this perfectly. Adding a state library creates coupling and confusion about which framework "owns" the state.
**Do this instead:** Use CustomEvent for the route bridge. If more shared state emerges later (unlikely for a learning tool), evaluate then.

### Anti-Pattern 2: Nested Framework Mounting

**What people do:** Mount Vue inside a React component (or vice versa), creating parent-child relationships between frameworks.
**Why it's wrong:** Creates lifecycle management nightmares. Parent framework re-renders can destroy child framework's DOM. Memory leaks from orphaned framework instances.
**Do this instead:** Peer mounting with separate root elements. Each framework owns its entire subtree. They communicate via events, not DOM hierarchy.

### Anti-Pattern 3: Single Vite Config with Framework-Specific Overrides Everywhere

**What people do:** Try to make one `tsconfig.json` handle both Vue SFC types and React JSX types, leading to conflicting `jsx` compiler options.
**Why it's wrong:** TypeScript's `jsx` option can be `"preserve"` (Vue) or `"react-jsx"` (React), but not both in one config.
**Do this instead:** Each package has its own `tsconfig.json` extending a shared `tsconfig.base.json`. The base has common settings (strict, paths). Each app overrides `jsx` and `types` as needed.

### Anti-Pattern 4: Vue Router Alongside React Router

**What people do:** Install both routers, each trying to manage browser history.
**Why it's wrong:** Two routers fighting over `window.history` causes navigation bugs, double URL updates, and broken back-button behavior.
**Do this instead:** One router only (React Router). Vue receives route info passively via events.

### Anti-Pattern 5: Importing Vue Components in React (or Vice Versa)

**What people do:** Try to use Veaury or similar adapters to render Vue components inside React.
**Why it's wrong:** For this project, the whole point is showing each framework's native approach. Cross-framework rendering defeats the learning purpose and adds fragile adapter complexity.
**Do this instead:** Each framework renders its own components. They are visually side-by-side via CSS layout, not via component nesting.

## Integration Points

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| React App <-> Vue App | `CustomEvent` on `window` | Unidirectional: React dispatches, Vue listens. Type-safe via shared `RouteChangeDetail` interface. |
| Both Apps <-> Shared | Direct TypeScript import | Compile-time only. No runtime coupling. Shared package is pure data/types. |
| Host <-> Both Apps | ES module import (boot) | Host imports each app's `main.ts`. After boot, host has no further role. Fire-and-forget. |
| Both Apps <-> Browser URL | React Router only | Vue never reads/writes `window.location` directly. React Router is the single owner. |

### Boot Synchronization

| Concern | Solution |
|---------|----------|
| Vue misses initial route event | Vue reads `window.location` on mount as fallback |
| React dispatches before Vue ready | Not a problem if Vue has URL fallback |
| HMR for Vue | `@vitejs/plugin-vue` handles HMR for `.vue` files independently |
| HMR for React | `@vitejs/plugin-react` handles HMR for `.tsx` files independently |

## Scaling Considerations

This is a personal learning tool, not a production SaaS. Scaling means "can I add 30+ topics without the architecture breaking?"

| Concern | At 5 topics | At 32 topics | At 50+ topics |
|---------|-------------|--------------|---------------|
| Bundle size | Negligible | Use `import.meta.glob` lazy loading. Each topic is a separate chunk. | Same pattern scales. Vite handles code splitting automatically. |
| Sidebar navigation | Flat list | Grouped by category (6 categories). Collapsible sections. | Same. Categories keep it manageable. |
| Build time | < 5s | < 15s | May want to consider Vite's manual chunk strategy if builds slow down. |
| Developer experience | Easy to find files | Mirror folder structure keeps it navigable | Conventions matter. Naming discipline is key. |

### What Breaks First

1. **Adding a topic requires touching 4+ files:** Topic component (Vue), topic component (React), registry entry (shared). If you also need description/metadata, that's more. Mitigate by making the registry the only config point -- components auto-discovered via `import.meta.glob`.

2. **TypeScript config drift between packages:** If one package upgrades TS settings and the other doesn't, subtle type mismatches appear. Mitigate with `tsconfig.base.json` and strict extension.

## Sources

- Vite documentation: plugins can coexist when they handle different file extensions (training data, MEDIUM confidence)
- `@vitejs/plugin-vue` and `@vitejs/plugin-react` operate on `.vue` and `.tsx/.jsx` respectively -- no extension conflict (training data, MEDIUM confidence)
- `import.meta.glob` for dynamic imports is stable Vite API (training data, HIGH confidence)
- `CustomEvent` is a standard Web API, works cross-framework by design (HIGH confidence)
- pnpm workspaces monorepo pattern is well-established (HIGH confidence)

---
*Architecture research for: Vue vs React Comparison Hub*
*Researched: 2026-03-26*

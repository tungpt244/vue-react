# Phase 1: Infrastructure Scaffold - Research

**Researched:** 2026-03-26
**Domain:** pnpm monorepo, Vite 8 multi-framework (Vue 3 + React 19), TypeScript 6, TailwindCSS 4, React Router 7
**Confidence:** HIGH

## Summary

Phase 1 scaffolds a pnpm monorepo with 4 packages (`@vibe/shared`, `@vibe/vue-app`, `@vibe/react-app`, `@vibe/host`) where Vue 3 and React 19 mount side-by-side on the same page. A single Vite 8 dev server handles both `.vue` SFC and `.tsx` JSX via coexisting plugins. React Router v7 owns the URL; Vue syncs via CustomEvent on `window`. TailwindCSS v4 provides unified styling through a single CSS pipeline.

All core package versions have been verified against npm registry on 2026-03-26. The dual-plugin Vite pattern is confirmed working -- plugins operate on different file extensions (`.vue` vs `.tsx/.jsx`) with no conflicts when properly configured. The critical technical risks are: (1) React plugin attempting to process non-React `.ts` files, mitigated by explicit `include` pattern, (2) Vue missing the initial route-change event due to boot order race condition, mitigated by reading `window.location` on mount, and (3) TailwindCSS content scanning missing cross-package files in monorepo, mitigated by `@source` directives.

**Primary recommendation:** Build in dependency order -- shared first, then host skeleton (Vite config + HTML), then React app shell (router + event dispatch), then Vue app shell (event listener + renderer). Validate HMR for both frameworks before writing any topic content.

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Scoped packages: `@vibe/shared`, `@vibe/vue-app`, `@vibe/react-app`, `@vibe/host`
- **D-02:** Prettier -- single quotes, no semicolons

### Claude's Discretion

- Topic registry data structure (fields, nested vs flat)
- Placeholder content cho topics chua implement
- Dev workflow (single command vs multiple terminals)
- Port config, auto-open browser behavior
- TypeScript strictness level
- ESLint config details

### Deferred Ideas (OUT OF SCOPE)

None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>

## Phase Requirements

| ID       | Description                                                                | Research Support                                                                                                                   |
| -------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| INFRA-01 | Host app mount ca Vue 3 va React vao 2 root divs tren cung 1 page          | Dual-Root Mount pattern (Architecture Pattern 1), `index.html` with `#vue-root` + `#react-root`, `main.ts` imports both apps       |
| INFRA-02 | Vite config xu ly ca Vue SFC (.vue) va React JSX (.tsx) trong cung 1 build | Vite multi-plugin config -- `vue()` + `react({ include: /\.(tsx\|jsx)$/ })` in same plugins array. Verified working pattern.       |
| INFRA-03 | React Router quan ly URL voi pattern `/:category/:topicId`                 | React Router v7 -- `createBrowserRouter` with dynamic segments, import from `react-router` (not `react-router-dom`)                |
| INFRA-04 | Vue app sync route qua CustomEvent tren window                             | CustomEvent Bridge pattern -- React dispatches `route-change`, Vue listens. Initial state fallback via `window.location.pathname`. |
| INFRA-05 | Topic registry tu shared package la single source of truth cho ca 2 apps   | `@vibe/shared` with types + registry, consumed via `workspace:*` protocol. Pure TS, no framework deps.                             |
| INFRA-06 | pnpm monorepo workspace voi 4 packages                                     | `pnpm-workspace.yaml` with `packages: ['packages/*']`, workspace protocol for cross-package deps                                   |
| INFRA-07 | TypeScript config cho ca monorepo voi correct jsx settings per package     | `tsconfig.base.json` at root, per-package `tsconfig.json` extending it. Vue: `jsx: "preserve"`, React: `jsx: "react-jsx"`.         |

</phase_requirements>

## Project Constraints (from CLAUDE.md)

- **Tech stack locked:** pnpm workspaces + TypeScript + Vite + TailwindCSS + Vue 3 + React
- **Routing:** Only React Router, Vue syncs via CustomEvent on window
- **Structure:** Both apps mirror `src/topics/{category}/{TopicId}` folder convention
- **Single source of truth:** Topic registry from `packages/shared/src/topics.ts`
- **No Vue Router** -- conflicts with React Router on same page
- **Import from `react-router`** -- not `react-router-dom` (merged in v7)
- **TailwindCSS v4 CSS-first config** -- no `tailwind.config.js`, use `@import "tailwindcss"` + `@theme {}`
- **Vite plugin order:** `vue()` BEFORE `react()` in plugins array
- **Direct source imports** via workspace protocol -- no Vite library mode for sub-packages
- **Avoid:** CSS Modules, Styled Components, npm/yarn, Turborepo/Nx

## Standard Stack

### Core (verified against npm registry 2026-03-26)

| Library      | Version             | Purpose                         | Why Standard                                                 |
| ------------ | ------------------- | ------------------------------- | ------------------------------------------------------------ |
| vite         | 8.0.3               | Build tool + dev server         | Single server handles both Vue SFC and React JSX via plugins |
| vue          | 3.5.31              | Left-side framework demos       | Composition API + `<script setup>`                           |
| react        | 19.2.4              | Right-side demos + host app     | React 19 stable, host uses React for max learning exposure   |
| react-dom    | 19.2.4              | React DOM renderer              | Must match react major version                               |
| typescript   | 6.0.2               | Type safety across all packages | Supports both Vue SFC (via vue-tsc) and React TSX            |
| tailwindcss  | 4.2.2               | Styling                         | CSS-first config, same utility classes for both frameworks   |
| react-router | 7.13.2              | URL routing (host app only)     | v7 merged react-router-dom. Import from `react-router`.      |
| pnpm         | 10.32.1 (installed) | Package manager + workspaces    | Already installed on system                                  |

### Vite Plugins

| Plugin               | Version | Purpose                                                   |
| -------------------- | ------- | --------------------------------------------------------- |
| @vitejs/plugin-vue   | 6.0.5   | Vue SFC compilation (.vue files)                          |
| @vitejs/plugin-react | 6.0.1   | React JSX/TSX compilation (Babel-based, Fast Refresh HMR) |
| @tailwindcss/vite    | 4.2.2   | TailwindCSS v4 Vite integration (replaces PostCSS)        |

### Supporting (Phase 1 only)

| Library      | Version | Purpose                                            | When to Use           |
| ------------ | ------- | -------------------------------------------------- | --------------------- |
| @vueuse/core | 14.2.1  | `useEventListener` for CustomEvent handling in Vue | Route sync composable |
| clsx         | 2.1.1   | Conditional CSS classes in React                   | Any className merging |

### Development Tools

| Tool     | Version | Purpose                                                |
| -------- | ------- | ------------------------------------------------------ |
| vue-tsc  | 3.2.6   | Vue SFC type checking (runs alongside tsc)             |
| prettier | ^3.x    | Code formatting -- single quotes, no semicolons (D-02) |

### Alternatives Considered

| Instead of                   | Could Use                      | Tradeoff                                                                                        |
| ---------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------- |
| @vitejs/plugin-react (Babel) | @vitejs/plugin-react-swc (SWC) | SWC is faster but Babel has broader compatibility. For learning tool, build speed not critical. |
| pnpm workspaces alone        | Turborepo / Nx                 | Over-engineering for single-dev project. No CI/CD to optimize.                                  |

**Installation (root):**

```bash
pnpm init
# pnpm-workspace.yaml created manually
```

**Installation (per package -- see Architecture Patterns for details):**

```bash
# host
pnpm add vite @vitejs/plugin-vue @vitejs/plugin-react @tailwindcss/vite tailwindcss react react-dom react-router -D --filter @vibe/host

# shared (no framework deps)
pnpm add typescript -D --filter @vibe/shared

# vue-app
pnpm add vue @vueuse/core --filter @vibe/vue-app
pnpm add @vibe/shared@workspace:* --filter @vibe/vue-app

# react-app
pnpm add react react-dom react-router clsx --filter @vibe/react-app
pnpm add @vibe/shared@workspace:* --filter @vibe/react-app

# root dev deps
pnpm add typescript vue-tsc prettier -D -w
```

## Architecture Patterns

### Recommended Project Structure

```
vibe/
├── packages/
│   ├── shared/                        # Framework-agnostic
│   │   ├── src/
│   │   │   ├── types.ts               # Topic, Category, RouteChangeDetail
│   │   │   ├── topics.ts              # Topic registry
│   │   │   ├── constants.ts           # Event names, route patterns
│   │   │   └── index.ts               # Barrel export
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── vue-app/
│   │   ├── src/
│   │   │   ├── topics/                # Mirror structure with react-app
│   │   │   │   └── essentials/        # Placeholder topic(s)
│   │   │   ├── composables/
│   │   │   │   └── useRouteSync.ts    # CustomEvent listener + URL fallback
│   │   │   ├── components/
│   │   │   │   └── TopicRenderer.vue  # Dynamic component via import.meta.glob
│   │   │   ├── App.vue
│   │   │   └── main.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── react-app/
│   │   ├── src/
│   │   │   ├── topics/                # Mirror structure with vue-app
│   │   │   │   └── essentials/        # Placeholder topic(s)
│   │   │   ├── hooks/
│   │   │   │   └── useRouteDispatch.ts  # Dispatch CustomEvent on navigate
│   │   │   ├── components/
│   │   │   │   ├── TopicRenderer.tsx     # Dynamic component via import.meta.glob
│   │   │   │   └── Layout.tsx            # Shell layout
│   │   │   ├── router.tsx
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── host/
│       ├── index.html                 # Two root divs: #vue-root, #react-root
│       ├── src/
│       │   ├── main.ts                # Import & boot both apps
│       │   └── styles.css             # @import "tailwindcss" + @source directives
│       ├── vite.config.ts             # Both Vue + React plugins
│       ├── tsconfig.json
│       └── package.json
│
├── pnpm-workspace.yaml               # packages: ['packages/*']
├── tsconfig.base.json                 # Shared TS settings
├── .prettierrc                        # Single quotes, no semicolons
├── package.json                       # Root scripts
└── PROJECT_BRIEF.md
```

### Pattern 1: Vite Multi-Plugin Config

**What:** Single `vite.config.ts` in host package with both `@vitejs/plugin-vue` and `@vitejs/plugin-react`.

**Critical detail:** The React plugin's default `include` covers `.js`, `.jsx`, `.ts`, `.tsx`. While `.vue` files won't be affected (Vue plugin handles them first), setting explicit `include` on the React plugin prevents it from unnecessarily processing plain `.ts` files in the Vue package.

```typescript
// packages/host/vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(), // MUST be before react()
    react({ include: /\.(tsx|jsx)$/ }), // Restrict to React files only
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@vibe/shared': resolve(__dirname, '../shared/src'),
      '@vibe/vue-app': resolve(__dirname, '../vue-app/src'),
      '@vibe/react-app': resolve(__dirname, '../react-app/src'),
    },
  },
})
```

**Confidence:** HIGH -- pattern confirmed via Vite discussion #6381 and npm docs for `@vitejs/plugin-react` `include` option.

### Pattern 2: CustomEvent Bridge with Initial State Fallback

**What:** React Router dispatches `CustomEvent('route-change')` on navigation. Vue listens and updates. On first mount, Vue reads `window.location` as fallback (race condition prevention).

```typescript
// packages/shared/src/types.ts
export interface RouteChangeDetail {
  category: string
  topicId: string
}

// packages/shared/src/constants.ts
export const ROUTE_CHANGE_EVENT = 'route-change'
```

```typescript
// packages/react-app/src/hooks/useRouteDispatch.ts
import { useEffect } from 'react'
import { useParams } from 'react-router'
import { ROUTE_CHANGE_EVENT, type RouteChangeDetail } from '@vibe/shared'

export function useRouteDispatch() {
  const { category, topicId } = useParams<{
    category: string
    topicId: string
  }>()

  useEffect(() => {
    if (category && topicId) {
      window.dispatchEvent(
        new CustomEvent<RouteChangeDetail>(ROUTE_CHANGE_EVENT, {
          detail: { category, topicId },
        }),
      )
    }
  }, [category, topicId])
}
```

```typescript
// packages/vue-app/src/composables/useRouteSync.ts
import { ref, onMounted } from 'vue'
import { useEventListener } from '@vueuse/core'
import { ROUTE_CHANGE_EVENT, type RouteChangeDetail } from '@vibe/shared'

export function useRouteSync() {
  const category = ref('')
  const topicId = ref('')

  function parseCurrentUrl() {
    const parts = window.location.pathname.split('/').filter(Boolean)
    if (parts.length >= 2) {
      category.value = parts[0]
      topicId.value = parts[1]
    }
  }

  // Fallback: read URL on mount (handles race condition)
  onMounted(() => parseCurrentUrl())

  // Listen for subsequent route changes
  useEventListener(window, ROUTE_CHANGE_EVENT, (e: Event) => {
    const { detail } = e as CustomEvent<RouteChangeDetail>
    category.value = detail.category
    topicId.value = detail.topicId
  })

  return { category, topicId }
}
```

**Confidence:** HIGH -- CustomEvent is standard Web API, VueUse `useEventListener` is well-documented.

### Pattern 3: Dynamic Component Resolution via import.meta.glob

**What:** Both apps use `import.meta.glob` to discover topic components dynamically, avoiding manual import maps.

```typescript
// React side
const topicModules = import.meta.glob('../topics/**/*.tsx')

// Vue side
const topicModules = import.meta.glob('../topics/**/*.vue')
```

**Confidence:** HIGH -- `import.meta.glob` is stable Vite API.

### Pattern 4: React Router v7 Setup

**What:** `createBrowserRouter` with dynamic segments, everything imported from `react-router`.

```typescript
// packages/react-app/src/router.tsx
import { createBrowserRouter } from 'react-router'
import { Layout } from './components/Layout'
import { TopicRenderer } from './components/TopicRenderer'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        path: ':category/:topicId',
        Component: TopicRenderer,
      },
    ],
  },
])
```

```typescript
// packages/react-app/src/App.tsx
import { RouterProvider } from 'react-router'
import { router } from './router'

export function App() {
  return <RouterProvider router={router} />
}
```

**Confidence:** HIGH -- verified via official React Router v7 docs at reactrouter.com.

### Pattern 5: TailwindCSS v4 Single Pipeline in Monorepo

**What:** Single CSS entry point in host with `@source` directives pointing to all packages.

```css
/* packages/host/src/styles.css */
@import 'tailwindcss';

/* Tell Tailwind to scan both app packages */
@source '../../vue-app/src/**/*.vue';
@source '../../react-app/src/**/*.tsx';

@theme {
  /* Custom theme tokens if needed */
}
```

**Confidence:** HIGH -- `@source` directive is documented TailwindCSS v4 feature, confirmed for monorepo use via Nx blog guide.

### Pattern 6: TypeScript Config Hierarchy

**What:** Base config at root, per-package configs override `jsx` and framework-specific settings.

```jsonc
// tsconfig.base.json (root)
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "declaration": true,
    "declarationMap": true,
    "paths": {
      "@vibe/shared": ["./packages/shared/src"],
      "@vibe/shared/*": ["./packages/shared/src/*"],
    },
  },
}
```

```jsonc
// packages/shared/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "composite": true,
    "rootDir": "src",
    "outDir": "dist",
  },
  "include": ["src"],
}
```

```jsonc
// packages/vue-app/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "jsx": "preserve", // Vue needs preserve
    "jsxImportSource": "vue",
    "composite": true,
  },
  "include": ["src/**/*.ts", "src/**/*.vue"],
  "references": [{ "path": "../shared" }],
}
```

```jsonc
// packages/react-app/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "jsx": "react-jsx", // React needs react-jsx
    "composite": true,
  },
  "include": ["src/**/*.ts", "src/**/*.tsx"],
  "references": [{ "path": "../shared" }],
}
```

```jsonc
// packages/host/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "composite": true,
  },
  "include": ["src"],
  "references": [
    { "path": "../shared" },
    { "path": "../vue-app" },
    { "path": "../react-app" },
  ],
}
```

**Confidence:** MEDIUM-HIGH -- TypeScript project references with monorepo is standard pattern, but exact config may need tweaking for `vue-tsc` compatibility.

### Anti-Patterns to Avoid

- **Two routers:** Never install Vue Router alongside React Router. Two routers fighting over `window.history` = bugs.
- **Nested framework mounting:** Never mount Vue inside React component or vice versa. Peer mounting with separate roots only.
- **Single tsconfig for both frameworks:** TypeScript `jsx` option can be `"preserve"` (Vue) or `"react-jsx"` (React), not both in one config. Each package needs its own.
- **Separate Tailwind configs per package:** Causes duplicate CSS, style inconsistencies. Single pipeline always.
- **Vite library mode for sub-packages:** Unnecessary build step. Host imports directly as source via workspace protocol.

## Don't Hand-Roll

| Problem                   | Don't Build               | Use Instead                       | Why                                             |
| ------------------------- | ------------------------- | --------------------------------- | ----------------------------------------------- |
| Event listener lifecycle  | Manual add/remove in Vue  | `@vueuse/core` `useEventListener` | Auto-cleanup on unmount, handles edge cases     |
| CSS class merging (React) | Template literals         | `clsx`                            | Handles falsy values, arrays, objects correctly |
| Route param access        | `window.location` parsing | `useParams` from `react-router`   | Type-safe, reactive, handles encoding           |
| Dynamic imports           | Manual `import()` calls   | `import.meta.glob`                | Vite handles code splitting, caching, HMR       |
| CSS build pipeline        | PostCSS config            | `@tailwindcss/vite` plugin        | v4 native integration, faster than PostCSS      |
| Monorepo linking          | npm link / file: protocol | pnpm `workspace:*`                | Proper symlinks, version resolution, hoisting   |

## Common Pitfalls

### Pitfall 1: Vite React Plugin Processing Non-React Files

**What goes wrong:** `@vitejs/plugin-react` by default processes `.js`, `.jsx`, `.ts`, `.tsx`. In a monorepo where Vue composables are `.ts` files, the React plugin injects its Babel transforms into them, causing subtle errors or unnecessary processing.
**Why it happens:** Default `include` pattern is too broad for multi-framework projects.
**How to avoid:** Set `react({ include: /\.(tsx|jsx)$/ })` to restrict to React-specific files only.
**Warning signs:** Console warnings about Fast Refresh in non-React files, unexpected Babel transforms.

### Pitfall 2: Vue Misses Initial Route Event (Race Condition)

**What goes wrong:** React app mounts, reads URL, dispatches `route-change` CustomEvent. But Vue hasn't mounted yet, so its listener isn't registered. Vue side shows blank on first load.
**Why it happens:** `window.dispatchEvent` is synchronous for attached listeners, but lost if no listener exists yet.
**How to avoid:** Vue reads `window.location.pathname` on mount as fallback. Don't rely solely on events for initial state.
**Warning signs:** Vue side blank on first load but works after clicking a topic link.

### Pitfall 3: TailwindCSS Content Scanning Misses Monorepo Packages

**What goes wrong:** Tailwind only scans the app where it's configured by default. Styles used in `vue-app` or `react-app` don't get included in the CSS output.
**Why it happens:** TailwindCSS v4 automatic content detection scans the current project, not sibling packages.
**How to avoid:** Use `@source` directives in the CSS entry point to explicitly include all packages' source directories.
**Warning signs:** Tailwind utility classes render correctly in one package but not in others.

### Pitfall 4: TypeScript Path Resolution Drift

**What goes wrong:** Imports work in IDE but fail in Vite build, or vice versa. Three systems resolve imports independently: TypeScript (tsconfig), Vite (vite.config), pnpm (workspace protocol).
**Why it happens:** Updating one config but not the others.
**How to avoid:** Use pnpm `workspace:*` as the primary resolution mechanism. Add Vite aliases only as needed. Keep tsconfig `paths` in sync. Test with both `pnpm -r typecheck` AND `pnpm dev`.
**Warning signs:** Import works in VS Code but fails on `tsc --noEmit`, or builds but shows red squiggles.

### Pitfall 5: HMR Only Works for One Framework

**What goes wrong:** Editing `.vue` files triggers hot update but editing `.tsx` files causes full page reload (or vice versa).
**Why it happens:** Plugin ordering or `include` patterns interfere with HMR boundary detection.
**How to avoid:** Register `vue()` before `react()` in plugins array. Verify HMR for both frameworks immediately after scaffold. Edit a `.vue` file -- should hot update. Edit a `.tsx` file -- should Fast Refresh.
**Warning signs:** Full page reload instead of hot update, React state lost on `.tsx` edit.

### Pitfall 6: pnpm Workspace Hoisting Issues

**What goes wrong:** A package can import a dependency it didn't declare in its own `package.json` because pnpm hoisted it from another package.
**Why it happens:** pnpm's default `shamefully-hoist` mode or incorrect `.npmrc` settings.
**How to avoid:** Use pnpm's default strict mode (no `shamefully-hoist=true`). Each package declares its own dependencies. Add `.npmrc` with `shamefully-hoist=false` if needed.
**Warning signs:** Build works locally but fails in CI, or works only after `pnpm install` from root.

## Code Examples

### Host HTML Shell (index.html)

```html
<!-- packages/host/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue vs React Comparison Hub</title>
  </head>
  <body>
    <div id="app-shell">
      <div id="react-root"></div>
      <div id="vue-root"></div>
    </div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

### Host Boot Script

```typescript
// packages/host/src/main.ts
import './styles.css'
import '@vibe/vue-app/main'
import '@vibe/react-app/main'
```

### Vue App Entry

```typescript
// packages/vue-app/src/main.ts
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#vue-root')
```

### React App Entry

```typescript
// packages/react-app/src/main.tsx
import { createRoot } from 'react-dom/client'
import { App } from './App'

createRoot(document.getElementById('react-root')!).render(<App />)
```

### pnpm-workspace.yaml

```yaml
packages:
  - 'packages/*'
```

### Root package.json Scripts

```json
{
  "name": "vibe",
  "private": true,
  "scripts": {
    "dev": "pnpm --filter @vibe/host dev",
    "build": "pnpm --filter @vibe/host build",
    "typecheck": "pnpm -r typecheck",
    "format": "prettier --write ."
  }
}
```

### Prettier Config (.prettierrc)

```json
{
  "singleQuote": true,
  "semi": false
}
```

## State of the Art

| Old Approach                        | Current Approach                                  | When Changed           | Impact                                                                                   |
| ----------------------------------- | ------------------------------------------------- | ---------------------- | ---------------------------------------------------------------------------------------- |
| `react-router-dom` separate package | `react-router` (merged in v7)                     | React Router v7 (2024) | Import everything from `react-router`, not `react-router-dom`                            |
| `tailwind.config.js` (JavaScript)   | `@import "tailwindcss"` + `@theme {}` (CSS-first) | TailwindCSS v4 (2025)  | No config file needed. `@source` directive for content paths.                            |
| PostCSS for TailwindCSS             | `@tailwindcss/vite` plugin                        | TailwindCSS v4 (2025)  | Direct Vite integration, faster than PostCSS pipeline                                    |
| TypeScript 5.x                      | TypeScript 6.0                                    | 2025                   | Bundler moduleResolution is standard. No breaking changes for this use case.             |
| Vite 5/6                            | Vite 8                                            | 2025-2026              | Plugin API stable. `@vitejs/plugin-vue@6` and `@vitejs/plugin-react@6` built for Vite 8. |

## Open Questions

1. **Topic Registry Data Structure (Claude's Discretion)**
   - What we know: Must include `id`, `category`, `title` at minimum. Used by sidebar navigation, dynamic component resolution, and route matching.
   - Recommendation: Flat array with `TopicMeta` type. Add `slug` (URL-safe), `order` (sort within category), optional `description`. Keep it simple -- can extend later.

2. **Dev Workflow: Single Command vs Multiple Terminals**
   - What we know: `pnpm dev` from root runs host's Vite dev server, which serves everything via aliases.
   - Recommendation: Single `pnpm dev` command. Vite handles both frameworks in one process. No need for multiple terminals.

3. **TypeScript Strictness Level**
   - What we know: CLAUDE.md says "strict from start, it's a learning tool" (PITFALLS.md).
   - Recommendation: `"strict": true` in `tsconfig.base.json`. This catches bugs early and is the standard for new TypeScript projects.

4. **ESLint Configuration**
   - What we know: ESLint v9 flat config format is current. Need both Vue and React rules.
   - Recommendation: Defer ESLint to a separate concern (can add after scaffold validates). Focus Phase 1 on getting the apps running. Prettier handles formatting (D-02).

## Environment Availability

| Dependency | Required By        | Available   | Version | Fallback                   |
| ---------- | ------------------ | ----------- | ------- | -------------------------- |
| pnpm       | Package management | Yes         | 10.32.1 | --                         |
| Node.js    | Runtime            | Yes         | 22.22.1 | --                         |
| git        | Version control    | Yes         | 2.43.0  | --                         |
| TypeScript | Type checking      | No (global) | --      | Install as devDep via pnpm |

**Missing dependencies with no fallback:** None -- all prerequisites available.

**Missing dependencies with fallback:** TypeScript not globally installed, but will be installed as project devDependency (standard practice).

## Validation Architecture

### Test Framework

| Property           | Value                                                                                    |
| ------------------ | ---------------------------------------------------------------------------------------- |
| Framework          | Manual validation (Phase 1 is infrastructure -- behavior verified by running dev server) |
| Config file        | none -- no test framework installed yet                                                  |
| Quick run command  | `pnpm dev` + manual browser verification                                                 |
| Full suite command | `pnpm -r typecheck` (TypeScript validation across all packages)                          |

### Phase Requirements -> Test Map

| Req ID   | Behavior                                        | Test Type | Automated Command                                     | File Exists? |
| -------- | ----------------------------------------------- | --------- | ----------------------------------------------------- | ------------ |
| INFRA-01 | Both #vue-root and #react-root render content   | smoke     | `pnpm dev` + verify both divs have content in browser | -- Wave 0    |
| INFRA-02 | Vite processes .vue and .tsx without errors     | smoke     | `pnpm dev` (dev server starts without errors)         | -- Wave 0    |
| INFRA-03 | URL /:category/:topicId renders React component | smoke     | Navigate to URL in browser, verify React side renders | -- Wave 0    |
| INFRA-04 | Vue side syncs when URL changes                 | smoke     | Navigate in browser, verify Vue side updates          | -- Wave 0    |
| INFRA-05 | Shared registry importable in both apps         | typecheck | `pnpm -r typecheck`                                   | -- Wave 0    |
| INFRA-06 | All 4 packages resolve and link correctly       | smoke     | `pnpm install` succeeds + `pnpm dev` starts           | -- Wave 0    |
| INFRA-07 | TypeScript passes across all packages           | typecheck | `pnpm -r typecheck`                                   | -- Wave 0    |

### Sampling Rate

- **Per task commit:** `pnpm -r typecheck` (fast, catches type errors immediately)
- **Per wave merge:** `pnpm dev` + manual browser smoke test (both sides render)
- **Phase gate:** All 7 requirements verified: typecheck passes, dev server starts, both roots render, navigation works

### Wave 0 Gaps

- [ ] TypeScript installed as devDep -- `pnpm add typescript vue-tsc -D -w`
- [ ] `typecheck` script added to each package's `package.json`
- [ ] Placeholder topic components exist for both Vue and React (needed to verify routing)

_(No automated test framework needed for Phase 1 -- infrastructure validation is typecheck + dev server smoke test)_

## Sources

### Primary (HIGH confidence)

- npm registry -- all package versions verified via `npm view [package] version` on 2026-03-26
- [React Router v7 docs](https://reactrouter.com/start/data/routing) -- `createBrowserRouter`, import from `react-router`
- [React Router useParams API](https://reactrouter.com/api/hooks/useParams) -- dynamic segments
- [@vitejs/plugin-react README](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) -- `include` option, default file matching
- [TailwindCSS v4 announcement](https://tailwindcss.com/blog/tailwindcss-v4) -- CSS-first config, `@import "tailwindcss"`
- [TailwindCSS v4 Vite install guide](https://tailwindcss.com/docs) -- `@tailwindcss/vite` plugin setup
- [Tailwind v4 monorepo @source guide](https://nx.dev/blog/setup-tailwind-4-npm-workspace) -- `@source` directive for workspace content scanning
- [pnpm workspaces docs](https://pnpm.io/workspaces) -- workspace protocol, pnpm-workspace.yaml

### Secondary (MEDIUM confidence)

- [Vite Discussion #6381](https://github.com/vitejs/vite/discussions/6381) -- confirmed Vue + React plugins coexist in same project
- [Vite Plugin API docs](https://vite.dev/guide/api-plugin) -- plugin ordering, transform hooks
- `.planning/research/ARCHITECTURE.md` -- project-specific architecture patterns (internal doc)
- `.planning/research/PITFALLS.md` -- project-specific pitfall analysis (internal doc)

### Tertiary (LOW confidence)

- Training data (May 2025) -- multi-framework Vite HMR behavior, TypeScript project references exact syntax

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH -- all versions verified against npm registry, APIs confirmed via official docs
- Architecture: HIGH -- patterns well-documented, Vite dual-plugin confirmed
- Pitfalls: MEDIUM-HIGH -- documented from established patterns, some edge cases may surface during implementation
- TypeScript config: MEDIUM -- project references with vue-tsc may need adjustment

**Research date:** 2026-03-26
**Valid until:** 2026-04-26 (stable ecosystem, 30-day validity)

---

_Phase: 01-infrastructure-scaffold_
_Researched: 2026-03-26_

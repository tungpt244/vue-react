# Stack Research

**Domain:** Multi-framework monorepo — Vue 3 + React side-by-side comparison learning tool
**Researched:** 2026-03-26
**Confidence:** HIGH (versions verified via npm registry)

## Recommended Stack

### Core Technologies

| Technology   | Version | Purpose                               | Why Recommended                                                                                                                                                     |
| ------------ | ------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vite         | ^8.0.3  | Build tool & dev server               | Native support for both Vue SFC and React JSX via plugins. Single dev server for monorepo. HMR for both frameworks simultaneously.                                  |
| Vue 3        | ^3.5.31 | Left-side framework demos             | Boss's primary framework. Composition API + `<script setup>` is the standard.                                                                                       |
| React        | ^19.2.4 | Right-side framework demos + host app | React 19 is stable. Host app uses React because Boss is learning it — more exposure.                                                                                |
| TypeScript   | ^6.0.2  | Type safety across all packages       | TS 6 supports both Vue SFC (via vue-tsc) and React TSX natively. Shared types in `packages/shared`.                                                                 |
| TailwindCSS  | ^4.2.2  | Styling                               | v4 uses CSS-first config (no tailwind.config.js). Both Vue and React components use the same utility classes — consistent styling with zero framework-specific CSS. |
| pnpm         | ^10.x   | Package manager + workspaces          | Fastest installs, strict dependency isolation, native workspace protocol. Better than npm/yarn for monorepos.                                                       |
| React Router | ^7.13.2 | URL routing (host app only)           | v7 merged react-router-dom into react-router. Import everything from `react-router`. Single router controls URL, Vue syncs via CustomEvent.                         |

### Vite Plugins

| Plugin               | Version | Purpose                   | Why                                                                                    |
| -------------------- | ------- | ------------------------- | -------------------------------------------------------------------------------------- |
| @vitejs/plugin-vue   | ^6.0.5  | Vue SFC compilation       | Official Vite plugin. Handles `<template>`, `<script setup>`, `<style>` in .vue files. |
| @vitejs/plugin-react | ^6.0.1  | React JSX/TSX compilation | Official Vite plugin using Babel. Supports Fast Refresh HMR.                           |
| @tailwindcss/vite    | ^4.2.2  | TailwindCSS integration   | v4 native Vite plugin — replaces PostCSS config. Faster than postcss approach.         |

### Syntax Highlighting & Code Display

| Library               | Version | Purpose                                     | Why                                                                                                                                                                                                                     |
| --------------------- | ------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| shiki                 | ^4.0.2  | Syntax highlighting for source code display | TextMate grammar-based (same engine as VS Code). Supports Vue SFC, TSX, TypeScript out of the box. Generates pre-highlighted HTML — no client-side JS runtime cost. Far superior to Prism.js/highlight.js for accuracy. |
| @shikijs/transformers | ^4.0.2  | Line highlighting, diff display, focus      | Built-in transformers for line numbers, line highlighting, diff markers. Essential for educational code display.                                                                                                        |

### Supporting Libraries

| Library         | Version | Purpose                         | When to Use                                                                                     |
| --------------- | ------- | ------------------------------- | ----------------------------------------------------------------------------------------------- |
| @vueuse/core    | ^14.2.1 | Vue composition utilities       | `useEventListener` for CustomEvent handling in Vue app. Avoid reinventing browser API wrappers. |
| lucide-react    | ^1.7.0  | Icons (React side)              | Consistent icon set. Tree-shakeable, TypeScript-native.                                         |
| lucide-vue-next | ^1.0.0  | Icons (Vue side)                | Same icon set as React side — visual consistency across both panels.                            |
| clsx            | ^2.x    | Conditional CSS classes (React) | Tiny utility for className merging in React. Vue uses `:class` binding natively.                |

### Development Tools

| Tool                     | Version | Purpose           | Notes                                                                                  |
| ------------------------ | ------- | ----------------- | -------------------------------------------------------------------------------------- |
| vue-tsc                  | latest  | Vue type checking | Required for TS checking in Vue SFCs. Run alongside tsc for React packages.            |
| eslint                   | ^9.x    | Linting           | Flat config format. Use `@vue/eslint-config-typescript` + `eslint-plugin-react-hooks`. |
| prettier                 | ^3.x    | Code formatting   | Consistent formatting across Vue and React files.                                      |
| vite-plugin-vue-devtools | ^8.1.1  | Vue debugging     | Browser devtools integration. Dev only.                                                |

## Installation

```bash
# In monorepo root — pnpm-workspace.yaml handles linking
pnpm init

# Host app (React + Vue mount point)
cd packages/host
pnpm add react@^19 react-dom@^19 react-router@^7 vue@^3
pnpm add -D @vitejs/plugin-vue@^6 @vitejs/plugin-react@^6 typescript@^6 vite@^8

# Shared package
cd packages/shared
pnpm add -D typescript@^6

# Vue app
cd packages/vue-app
pnpm add vue@^3 @vueuse/core@^14
pnpm add -D @vitejs/plugin-vue@^6 typescript@^6 vue-tsc

# React app
cd packages/react-app
pnpm add react@^19 react-dom@^19
pnpm add -D @vitejs/plugin-react@^6 typescript@^6

# Shared dev deps (root)
cd /project-root
pnpm add -D tailwindcss@^4 @tailwindcss/vite@^4 shiki@^4 @shikijs/transformers@^4
pnpm add -D eslint prettier
```

## Key Architecture Decisions

### Single Vite Config in Host

The host package runs a single Vite dev server with BOTH `@vitejs/plugin-vue` and `@vitejs/plugin-react` registered. Vite resolves `.vue` files through the Vue plugin and `.tsx`/`.jsx` through the React plugin. No conflict — they operate on different file extensions.

```typescript
// packages/host/vite.config.ts
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(), // Handles .vue files
    react(), // Handles .tsx/.jsx files
    tailwindcss(),
  ],
})
```

### Shiki for Code Display (Not Runtime Highlighting)

Shiki generates highlighted HTML at build time or on first render, then caches it. This means:

- No flicker on page load (unlike Prism.js which highlights after mount)
- Accurate Vue SFC highlighting (TextMate grammars handle `<template>` + `<script>` + `<style>` correctly)
- Supports line highlighting to draw attention to specific patterns

```typescript
import { codeToHtml } from 'shiki'

const html = await codeToHtml(code, {
  lang: 'vue',
  theme: 'github-dark',
  transformers: [transformerNotationHighlight()],
})
```

### React Router v7 — Import from `react-router`

React Router v7 consolidated packages. There is no separate `react-router-dom` — everything comes from `react-router`. The `BrowserRouter`, `Routes`, `Route`, `useNavigate` etc. all import from `react-router`.

```typescript
import { BrowserRouter, Routes, Route } from 'react-router'
```

### TailwindCSS v4 — CSS-First Configuration

No `tailwind.config.js` needed. Configuration is done in CSS:

```css
@import 'tailwindcss';
@theme {
  --color-primary: #3b82f6;
}
```

## Alternatives Considered

| Recommended                  | Alternative                    | When to Use Alternative                                                                                                                                                              |
| ---------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| shiki                        | Prism.js                       | Never for this project. Prism lacks Vue SFC support and requires client-side highlighting.                                                                                           |
| shiki                        | highlight.js                   | Never. Less accurate than Shiki, no Vue SFC grammar.                                                                                                                                 |
| @vitejs/plugin-react (Babel) | @vitejs/plugin-react-swc (SWC) | SWC is faster but Babel has broader ecosystem compatibility. For a learning tool, build speed is not critical. Either works — Babel is safer.                                        |
| React Router v7              | TanStack Router                | If you want file-based routing with full type safety. Overkill for this project — React Router v7 is simpler and Boss is learning React conventions.                                 |
| pnpm workspaces              | Turborepo / Nx                 | If you need task orchestration, caching, CI optimization. This is a single-dev personal project — pnpm workspaces alone is sufficient. Turborepo adds complexity without value here. |
| TailwindCSS v4               | TailwindCSS v3                 | If a critical plugin doesn't support v4 yet. v4 is stable and the Vite plugin is the recommended approach.                                                                           |
| clsx                         | classnames                     | Never. clsx is smaller and faster. classnames is the legacy option.                                                                                                                  |
| Lucide                       | Heroicons                      | Purely preference. Lucide has more icons and consistent Vue+React packages.                                                                                                          |

## What NOT to Use

| Avoid                               | Why                                                                                                                   | Use Instead                                   |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Vue Router                          | Conflicts with React Router on same page. Two routers fighting over URL = bugs.                                       | React Router only. Vue syncs via CustomEvent. |
| react-router-dom (separate package) | Deprecated in v7. Merged into react-router.                                                                           | `import from 'react-router'`                  |
| Prism.js                            | No Vue SFC grammar. Client-side highlighting causes flash-of-unstyled-code.                                           | Shiki                                         |
| Monaco Editor                       | Massive bundle (~5MB). This is code DISPLAY, not code EDITING.                                                        | Shiki + `<pre><code>`                         |
| CodeMirror                          | Same as Monaco — overkill for read-only code display.                                                                 | Shiki                                         |
| CSS Modules                         | Inconsistent DX between Vue (scoped styles) and React (CSS modules). TailwindCSS unifies styling across both.         | TailwindCSS                                   |
| Styled Components / Emotion         | CSS-in-JS adds runtime cost and is React-only. Doesn't help Vue side.                                                 | TailwindCSS                                   |
| npm / yarn                          | npm has phantom dependencies. yarn v4 PnP mode causes issues with Vue SFC tooling.                                    | pnpm                                          |
| Turborepo / Nx                      | Over-engineering for a single-dev personal project. pnpm workspaces handles dependency linking. No CI/CD to optimize. | pnpm workspaces alone                         |
| Vite library mode for sub-packages  | Unnecessary build step. Host imports Vue/React packages directly as source (not pre-built). Vite resolves everything. | Direct source imports via workspace protocol  |
| tailwind.config.js                  | Legacy v3 approach. v4 uses CSS-first config via `@theme` directive.                                                  | CSS `@import "tailwindcss"` + `@theme {}`     |

## Stack Patterns

**For the host Vite config (multi-framework):**

- Register `vue()` plugin BEFORE `react()` — Vue plugin must handle .vue files before React plugin processes remaining files
- Both plugins coexist without configuration changes

**For code display components:**

- Create a shared `CodeBlock` component (one in Vue, one in React) that wraps Shiki
- Initialize Shiki highlighter once (singleton) to avoid re-loading grammars
- Use `shiki/bundle/web` for smaller bundle with only web-relevant languages

**For route synchronization:**

- Host dispatches `CustomEvent('route-change', { detail: { category, topicId } })` on `window`
- Vue app listens with `useEventListener(window, 'route-change', handler)` from VueUse
- Keep it simple — no state management library needed for this

## Version Compatibility

| Package A      | Compatible With          | Notes                      |
| -------------- | ------------------------ | -------------------------- |
| react@^19      | react-dom@^19            | Must match major versions  |
| react@^19      | react-router@^7          | v7 requires react >= 18    |
| vue@^3.5       | @vitejs/plugin-vue@^6    | v6 plugin requires Vue 3.x |
| vite@^8        | @vitejs/plugin-vue@^6    | Plugin v6 built for Vite 8 |
| vite@^8        | @vitejs/plugin-react@^6  | Plugin v6 built for Vite 8 |
| tailwindcss@^4 | @tailwindcss/vite@^4     | Must match major versions  |
| shiki@^4       | @shikijs/transformers@^4 | Must match major versions  |
| typescript@^6  | vue-tsc@latest           | vue-tsc tracks TS versions |

## Sources

- npm registry — All version numbers verified via `npm view [package] version` on 2026-03-26
- Vite documentation — Multi-plugin architecture (both Vue and React plugins register on different file extensions)
- React Router v7 changelog — Confirmed react-router-dom merged into react-router
- TailwindCSS v4 release — CSS-first configuration, Vite plugin replaces PostCSS
- Shiki documentation — TextMate grammar support for Vue SFC and TSX
- Training data (May 2025) — Architecture patterns for multi-framework Vite projects [MEDIUM confidence]

---

_Stack research for: Vue vs React Comparison Hub_
_Researched: 2026-03-26_

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vue vs React Comparison Hub — app cá nhân để học React thông qua so sánh side-by-side với Vue 3.

Chi tiết scope, topics, structure xem `PROJECT_BRIEF.md`.

## Tech Stack

- Monorepo (pnpm workspaces)
- TypeScript + Vite + TailwindCSS
- Vue 3 (left side) + React (right side + host)
- React Router (chỉ React Router, không dùng Vue Router)
- Vue app nhận route qua custom event trên window

## Architecture

- `packages/shared` — types, topic registry (single source of truth), constants
- `packages/vue-app` — Vue 3 components, mỗi topic = 1 .vue file
- `packages/react-app` — React components, mỗi topic = 1 .tsx file
- `packages/host` — mount cả 2 app, React Router quản lý navigation

Cả 2 app mirror cùng folder structure: `src/topics/{category}/{TopicId}.vue|.tsx`

## Status

Đang ở giai đoạn planning. Chưa có code, chỉ có PROJECT_BRIEF.md.

<!-- GSD:project-start source:PROJECT.md -->
## Project

**Vue vs React Comparison Hub**

App cá nhân để học React thông qua so sánh side-by-side với Vue 3. Mỗi topic hiển thị live demo + source code của cả 2 framework, kèm giải thích điểm giống/khác. Tận dụng nền tảng Vue 3 đã có để hiểu React nhanh hơn.

**Core Value:** So sánh side-by-side chạy live giữa Vue 3 và React cho cùng một concept — giúp hiểu React thông qua mapping trực tiếp với Vue đã biết.

### Constraints

- **Tech stack**: pnpm workspaces + TypeScript + Vite + TailwindCSS + Vue 3 + React
- **Routing**: Chỉ React Router, Vue nhận route qua custom event trên window
- **Structure**: Cả 2 app mirror cùng folder convention `src/topics/{category}/{TopicId}`
- **Single source of truth**: Topic registry từ `packages/shared/src/topics.ts`
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Recommended Stack
### Core Technologies
| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Vite | ^8.0.3 | Build tool & dev server | Native support for both Vue SFC and React JSX via plugins. Single dev server for monorepo. HMR for both frameworks simultaneously. |
| Vue 3 | ^3.5.31 | Left-side framework demos | Boss's primary framework. Composition API + `<script setup>` is the standard. |
| React | ^19.2.4 | Right-side framework demos + host app | React 19 is stable. Host app uses React because Boss is learning it — more exposure. |
| TypeScript | ^6.0.2 | Type safety across all packages | TS 6 supports both Vue SFC (via vue-tsc) and React TSX natively. Shared types in `packages/shared`. |
| TailwindCSS | ^4.2.2 | Styling | v4 uses CSS-first config (no tailwind.config.js). Both Vue and React components use the same utility classes — consistent styling with zero framework-specific CSS. |
| pnpm | ^10.x | Package manager + workspaces | Fastest installs, strict dependency isolation, native workspace protocol. Better than npm/yarn for monorepos. |
| React Router | ^7.13.2 | URL routing (host app only) | v7 merged react-router-dom into react-router. Import everything from `react-router`. Single router controls URL, Vue syncs via CustomEvent. |
### Vite Plugins
| Plugin | Version | Purpose | Why |
|--------|---------|---------|-----|
| @vitejs/plugin-vue | ^6.0.5 | Vue SFC compilation | Official Vite plugin. Handles `<template>`, `<script setup>`, `<style>` in .vue files. |
| @vitejs/plugin-react | ^6.0.1 | React JSX/TSX compilation | Official Vite plugin using Babel. Supports Fast Refresh HMR. |
| @tailwindcss/vite | ^4.2.2 | TailwindCSS integration | v4 native Vite plugin — replaces PostCSS config. Faster than postcss approach. |
### Syntax Highlighting & Code Display
| Library | Version | Purpose | Why |
|---------|---------|---------|-----|
| shiki | ^4.0.2 | Syntax highlighting for source code display | TextMate grammar-based (same engine as VS Code). Supports Vue SFC, TSX, TypeScript out of the box. Generates pre-highlighted HTML — no client-side JS runtime cost. Far superior to Prism.js/highlight.js for accuracy. |
| @shikijs/transformers | ^4.0.2 | Line highlighting, diff display, focus | Built-in transformers for line numbers, line highlighting, diff markers. Essential for educational code display. |
### Supporting Libraries
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @vueuse/core | ^14.2.1 | Vue composition utilities | `useEventListener` for CustomEvent handling in Vue app. Avoid reinventing browser API wrappers. |
| lucide-react | ^1.7.0 | Icons (React side) | Consistent icon set. Tree-shakeable, TypeScript-native. |
| lucide-vue-next | ^1.0.0 | Icons (Vue side) | Same icon set as React side — visual consistency across both panels. |
| clsx | ^2.x | Conditional CSS classes (React) | Tiny utility for className merging in React. Vue uses `:class` binding natively. |
### Development Tools
| Tool | Version | Purpose | Notes |
|------|---------|---------|-------|
| vue-tsc | latest | Vue type checking | Required for TS checking in Vue SFCs. Run alongside tsc for React packages. |
| eslint | ^9.x | Linting | Flat config format. Use `@vue/eslint-config-typescript` + `eslint-plugin-react-hooks`. |
| prettier | ^3.x | Code formatting | Consistent formatting across Vue and React files. |
| vite-plugin-vue-devtools | ^8.1.1 | Vue debugging | Browser devtools integration. Dev only. |
## Installation
# In monorepo root — pnpm-workspace.yaml handles linking
# Host app (React + Vue mount point)
# Shared package
# Vue app
# React app
# Shared dev deps (root)
## Key Architecture Decisions
### Single Vite Config in Host
### Shiki for Code Display (Not Runtime Highlighting)
- No flicker on page load (unlike Prism.js which highlights after mount)
- Accurate Vue SFC highlighting (TextMate grammars handle `<template>` + `<script>` + `<style>` correctly)
- Supports line highlighting to draw attention to specific patterns
### React Router v7 — Import from `react-router`
### TailwindCSS v4 — CSS-First Configuration
## Alternatives Considered
| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| shiki | Prism.js | Never for this project. Prism lacks Vue SFC support and requires client-side highlighting. |
| shiki | highlight.js | Never. Less accurate than Shiki, no Vue SFC grammar. |
| @vitejs/plugin-react (Babel) | @vitejs/plugin-react-swc (SWC) | SWC is faster but Babel has broader ecosystem compatibility. For a learning tool, build speed is not critical. Either works — Babel is safer. |
| React Router v7 | TanStack Router | If you want file-based routing with full type safety. Overkill for this project — React Router v7 is simpler and Boss is learning React conventions. |
| pnpm workspaces | Turborepo / Nx | If you need task orchestration, caching, CI optimization. This is a single-dev personal project — pnpm workspaces alone is sufficient. Turborepo adds complexity without value here. |
| TailwindCSS v4 | TailwindCSS v3 | If a critical plugin doesn't support v4 yet. v4 is stable and the Vite plugin is the recommended approach. |
| clsx | classnames | Never. clsx is smaller and faster. classnames is the legacy option. |
| Lucide | Heroicons | Purely preference. Lucide has more icons and consistent Vue+React packages. |
## What NOT to Use
| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Vue Router | Conflicts with React Router on same page. Two routers fighting over URL = bugs. | React Router only. Vue syncs via CustomEvent. |
| react-router-dom (separate package) | Deprecated in v7. Merged into react-router. | `import from 'react-router'` |
| Prism.js | No Vue SFC grammar. Client-side highlighting causes flash-of-unstyled-code. | Shiki |
| Monaco Editor | Massive bundle (~5MB). This is code DISPLAY, not code EDITING. | Shiki + `<pre><code>` |
| CodeMirror | Same as Monaco — overkill for read-only code display. | Shiki |
| CSS Modules | Inconsistent DX between Vue (scoped styles) and React (CSS modules). TailwindCSS unifies styling across both. | TailwindCSS |
| Styled Components / Emotion | CSS-in-JS adds runtime cost and is React-only. Doesn't help Vue side. | TailwindCSS |
| npm / yarn | npm has phantom dependencies. yarn v4 PnP mode causes issues with Vue SFC tooling. | pnpm |
| Turborepo / Nx | Over-engineering for a single-dev personal project. pnpm workspaces handles dependency linking. No CI/CD to optimize. | pnpm workspaces alone |
| Vite library mode for sub-packages | Unnecessary build step. Host imports Vue/React packages directly as source (not pre-built). Vite resolves everything. | Direct source imports via workspace protocol |
| tailwind.config.js | Legacy v3 approach. v4 uses CSS-first config via `@theme` directive. | CSS `@import "tailwindcss"` + `@theme {}` |
## Stack Patterns
- Register `vue()` plugin BEFORE `react()` — Vue plugin must handle .vue files before React plugin processes remaining files
- Both plugins coexist without configuration changes
- Create a shared `CodeBlock` component (one in Vue, one in React) that wraps Shiki
- Initialize Shiki highlighter once (singleton) to avoid re-loading grammars
- Use `shiki/bundle/web` for smaller bundle with only web-relevant languages
- Host dispatches `CustomEvent('route-change', { detail: { category, topicId } })` on `window`
- Vue app listens with `useEventListener(window, 'route-change', handler)` from VueUse
- Keep it simple — no state management library needed for this
## Version Compatibility
| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| react@^19 | react-dom@^19 | Must match major versions |
| react@^19 | react-router@^7 | v7 requires react >= 18 |
| vue@^3.5 | @vitejs/plugin-vue@^6 | v6 plugin requires Vue 3.x |
| vite@^8 | @vitejs/plugin-vue@^6 | Plugin v6 built for Vite 8 |
| vite@^8 | @vitejs/plugin-react@^6 | Plugin v6 built for Vite 8 |
| tailwindcss@^4 | @tailwindcss/vite@^4 | Must match major versions |
| shiki@^4 | @shikijs/transformers@^4 | Must match major versions |
| typescript@^6 | vue-tsc@latest | vue-tsc tracks TS versions |
## Sources
- npm registry — All version numbers verified via `npm view [package] version` on 2026-03-26
- Vite documentation — Multi-plugin architecture (both Vue and React plugins register on different file extensions)
- React Router v7 changelog — Confirmed react-router-dom merged into react-router
- TailwindCSS v4 release — CSS-first configuration, Vite plugin replaces PostCSS
- Shiki documentation — TextMate grammar support for Vue SFC and TSX
- Training data (May 2025) — Architecture patterns for multi-framework Vite projects [MEDIUM confidence]
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->

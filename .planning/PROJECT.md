# Vue vs React Comparison Hub

## What This Is

App cá nhân để học React thông qua so sánh side-by-side với Vue 3. Mỗi topic hiển thị live demo + source code của cả 2 framework, kèm giải thích điểm giống/khác. Tận dụng nền tảng Vue 3 đã có để hiểu React nhanh hơn.

## Core Value

So sánh side-by-side chạy live giữa Vue 3 và React cho cùng một concept — giúp hiểu React thông qua mapping trực tiếp với Vue đã biết.

## Requirements

### Validated

- [x] Monorepo structure: shared, vue-app, react-app, host — Validated in Phase 1: Infrastructure Scaffold
- [x] React Router quản lý URL, Vue sync qua custom event — Validated in Phase 1: Infrastructure Scaffold
- [x] Topic registry là single source of truth từ shared package — Validated in Phase 1: Infrastructure Scaffold

### Active

- [ ] Side-by-side live demo Vue vs React cho mỗi topic
- [ ] Source code hiển thị bên dưới mỗi bên (collapsible)
- [ ] Giải thích điểm giống/khác cho mỗi topic
- [ ] Deep dive pages có diagram chi tiết (Rendering, Reactivity, Re-render)
- [ ] Navigation sidebar với topic list theo category
- [ ] Filter theo category, search theo keyword

### Out of Scope

- SSR (Nuxt/Next) — không cần cho learning tool
- Vue Router — tránh conflict 2 router trên 1 URL
- Backend/API — pure frontend, static content
- Mobile app — web-only
- Multi-user/auth — personal tool

## Context

- Boss là Frontend Dev, 3+ năm Vue 3, đang học React
- Project structure: monorepo 4 packages (shared, vue-app, react-app, host)
- ~32 topics across 6 categories: Essentials, Components, Reusability, Built-in, Deep Dive, Scaling
- Host app mount cả 2 framework apps vào 2 root divs
- Route pattern: `/:category/:topicId`
- Routing flow: React Router → CustomEvent → Vue app listen & render

## Constraints

- **Tech stack**: pnpm workspaces + TypeScript + Vite + TailwindCSS + Vue 3 + React
- **Routing**: Chỉ React Router, Vue nhận route qua custom event trên window
- **Structure**: Cả 2 app mirror cùng folder convention `src/topics/{category}/{TopicId}`
- **Single source of truth**: Topic registry từ `packages/shared/src/topics.ts`

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Chỉ dùng React Router | Tránh conflict 2 router trên 1 URL | ✓ Phase 1 |
| Vue sync qua CustomEvent | Lightweight, không cần shared state library | ✓ Phase 1 |
| Monorepo 4 packages | Separation of concerns, shared types/registry | ✓ Phase 1 |
| Host app mount cả 2 | Vite config xử lý cả Vue SFC + React JSX | ✓ Phase 1 |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-26 after Phase 1 completion*

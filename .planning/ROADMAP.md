# Roadmap: Vue vs React Comparison Hub

## Overview

Bắt đầu từ monorepo scaffold chưa có gì, kết thúc với một learning tool đầy đủ 32 topics so sánh Vue 3 vs React chạy live side-by-side. Phase 1 giải quyết toàn bộ rủi ro kỹ thuật (dual-mount, event bridge, Vite multi-framework config) trước khi viết bất kỳ content nào. Phase 2 triển khai 5 topics Essentials đầu tiên để validate toàn bộ pipeline. Phase 3 hoàn thiện curriculum còn lại (23 topics) cùng search/progress tracking. Phase 4 thêm Deep Dive pages với diagrams và Scaling Up topics.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Infrastructure Scaffold** - Monorepo + dual-mount + event bridge validated end-to-end
- [x] **Phase 2: First 5 Topics** - Pipeline proven with 5 Essentials topics running live side-by-side (completed 2026-03-27)
- [ ] **Phase 3: Core Curriculum** - Full Essentials + Components + Reusability + Built-in + enhancements
- [ ] **Phase 4: Advanced & Deep Dives** - Scaling Up topics + 3 Deep Dive pages with diagrams

## Phase Details

### Phase 1: Infrastructure Scaffold
**Goal**: Dev environment chạy được với cả Vue và React mount side-by-side, routing hoạt động, TypeScript passes, HMR works cho cả 2 sides
**Depends on**: Nothing (first phase)
**Requirements**: INFRA-01, INFRA-02, INFRA-03, INFRA-04, INFRA-05, INFRA-06, INFRA-07
**Success Criteria** (what must be TRUE):
  1. `pnpm dev` starts và cả `#vue-root` lẫn `#react-root` render trên cùng 1 page
  2. Edit một `.vue` file triggersHMR chỉ cho Vue side; edit một `.tsx` file triggers HMR chỉ cho React side
  3. Navigating đến URL `/:category/:topicId` renders đúng trên cả 2 sides, kể cả khi refresh trực tiếp
  4. `pnpm -r typecheck` passes trên tất cả 4 packages với zero errors
  5. Topic registry từ `packages/shared` import được trong cả vue-app và react-app
**Plans**: 3 plans
Plans:
- [x] 01-01-PLAN.md -- Monorepo scaffold + shared package + host app (Vite, HTML, CSS)
- [x] 01-02-PLAN.md -- React app shell (router, event dispatch) + Vue app shell (event listener, renderer)
- [x] 01-03-PLAN.md -- Side-by-side layout + end-to-end verification checkpoint
**UI hint**: yes

### Phase 2: First 5 Topics
**Goal**: 6 topics Essentials chạy live end-to-end, establishing patterns cho toàn bộ content sau này
**Depends on**: Phase 1
**Requirements**: NAV-01, NAV-02, NAV-03, DISP-01, DISP-02, ESS-01, ESS-02, ESS-03, ESS-08, ESS-10, ESS-11
**Success Criteria** (what must be TRUE):
  1. Sidebar hiển thị topic list grouped by category, click một topic navigates đến đó và cả 2 sides render đúng component
  2. Mỗi topic có live interactive demo thực sự chạy được (counter, toggle, hoặc form responding to user input) trên cả Vue và React side
  3. Mỗi topic có explanation text giải thích điểm giống/khác giữa Vue và React
  4. 5 topics hoạt động: Template/JSX, Reactivity (ref/useState), Computed/useMemo, Watchers/useEffect, Lifecycle hooks
  5. Class & Style Bindings topic hoạt động (ESS-11 — pattern cho binding syntax)
**Plans**: 4 plans
Plans:
- [x] 02-01-PLAN.md -- Sidebar navigation + topic registry expansion
- [x] 02-02-PLAN.md -- Template/JSX, Reactivity, Computed topics (replace placeholders + new)
- [x] 02-03-PLAN.md -- Watchers, Lifecycle, Class & Style Bindings topics (new)
- [x] 02-04-PLAN.md -- End-to-end verification checkpoint
**UI hint**: yes

### Phase 3: Core Curriculum
**Goal**: Tất cả 28 topics còn lại triển khai xong, search/filter và progress tracking hoạt động
**Depends on**: Phase 2
**Requirements**: ESS-04, ESS-05, ESS-06, ESS-07, ESS-09, COMP-01, COMP-02, COMP-03, COMP-04, COMP-05, COMP-06, COMP-07, REUS-01, REUS-02, REUS-03, BTIN-01, BTIN-02, BTIN-03, BTIN-04, BTIN-05, ENHC-01, ENHC-02
**Success Criteria** (what must be TRUE):
  1. Tất cả 6 categories đầy đủ trong sidebar (Essentials 11 topics, Components 7, Reusability 3, Built-in 5)
  2. Search box filter topics theo keyword realtime, kết quả cập nhật ngay khi gõ
  3. Mỗi topic trong sidebar có checkmark, trạng thái persist sau khi reload trang (localStorage)
  4. Mỗi topic trong 4 categories (Essentials, Components, Reusability, Built-in) có live demo + explanation theo đúng pattern từ Phase 2
**Plans**: 5 plans
Plans:
- [x] 03-01-PLAN.md -- Registry expansion (22 new topics) + spacing backfill for Phase 2 files
- [ ] 03-02-PLAN.md -- Essentials topics (5 Vue + 5 React): Conditional Rendering, List Rendering, Event Handling, Form Bindings, Template Refs
- [ ] 03-03-PLAN.md -- Components In-Depth topics (7 Vue + 7 React): Props, Events, v-model, Fallthrough, Slots, Provide/Inject, Async
- [ ] 03-04-PLAN.md -- Reusability (3) + Built-in (5) topics (8 Vue + 8 React): Composables, Directives, Plugins, Transition, TransitionGroup, KeepAlive, Teleport, Suspense
- [ ] 03-05-PLAN.md -- Sidebar enhancements (search filter + progress tracking) + human verification
**UI hint**: yes

### Phase 4: Advanced & Deep Dives
**Goal**: 4 Scaling Up topics và 3 Deep Dive pages với visual diagrams hoàn thiện curriculum
**Depends on**: Phase 3
**Requirements**: DEEP-01, DEEP-02, DEEP-03, SCAL-01, SCAL-02, SCAL-03, SCAL-04
**Success Criteria** (what must be TRUE):
  1. 4 Scaling Up topics (Routing, State Management, Testing, TypeScript) có live demo + explanation
  2. Deep Dive page Rendering Mechanism có diagram minh họa Vue compiler diff vs React full subtree diff
  3. Deep Dive page Reactivity In-Depth có diagram minh họa Proxy-based tracking vs immutable state comparison
  4. Deep Dive page Re-render & Optimization có diagram minh họa Vue auto optimization vs React manual (memo, useMemo, useCallback)
  5. Deep Dive layout duy trì side-by-side demo area phía trên, diagram section phía dưới
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Infrastructure Scaffold | 3/3 | Complete | - |
| 2. First 5 Topics | 4/4 | Complete   | 2026-03-27 |
| 3. Core Curriculum | 1/5 | In Progress|  |
| 4. Advanced & Deep Dives | 0/? | Not started | - |

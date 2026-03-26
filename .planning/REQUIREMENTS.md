# Requirements: Vue vs React Comparison Hub

**Defined:** 2026-03-26
**Core Value:** So sánh side-by-side chạy live giữa Vue 3 và React cho cùng một concept — giúp hiểu React thông qua mapping trực tiếp với Vue đã biết.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Infrastructure

- [x] **INFRA-01**: Host app mount cả Vue 3 và React vào 2 root divs trên cùng 1 page
- [x] **INFRA-02**: Vite config xử lý cả Vue SFC (.vue) và React JSX (.tsx) trong cùng 1 build
- [x] **INFRA-03**: React Router quản lý URL với pattern `/:category/:topicId`
- [x] **INFRA-04**: Vue app sync route qua CustomEvent trên window (không dùng Vue Router)
- [x] **INFRA-05**: Topic registry từ shared package là single source of truth cho cả 2 apps
- [x] **INFRA-06**: pnpm monorepo workspace với 4 packages (shared, vue-app, react-app, host)
- [x] **INFRA-07**: TypeScript config cho cả monorepo với correct jsx settings per package

### Navigation & Layout

- [ ] **NAV-01**: Sidebar navigation hiển thị topic list grouped by category
- [ ] **NAV-02**: Side-by-side layout: Vue app bên trái, React app bên phải
- [ ] **NAV-03**: Click topic trong sidebar navigate đến topic đó và cả 2 app render đúng component

### Content Display

- [ ] **DISP-01**: Mỗi topic có live interactive demo chạy thật (không chỉ code snippets)
- [ ] **DISP-02**: Mỗi topic có explanation text giải thích điểm giống/khác giữa Vue và React
- [ ] **DISP-03**: Deep dive pages (3 topics) có diagram chi tiết minh họa concepts

### Topic Content — Essentials (11 topics)

- [ ] **ESS-01**: Template vs JSX — template syntax/directives vs JSX expressions
- [ ] **ESS-02**: Reactivity — ref()/reactive() vs useState/useReducer
- [ ] **ESS-03**: Computed — computed() vs useMemo
- [ ] **ESS-04**: Conditional Rendering — v-if/v-else/v-show vs &&/ternary/early return
- [ ] **ESS-05**: List Rendering — v-for + :key vs .map() + key
- [ ] **ESS-06**: Event Handling — @click/@input + modifiers vs onClick/onChange
- [ ] **ESS-07**: Form Bindings — v-model vs controlled components
- [ ] **ESS-08**: Watchers — watch()/watchEffect() vs useEffect
- [ ] **ESS-09**: Template Refs — ref + template ref vs useRef
- [ ] **ESS-10**: Lifecycle — onMounted/onUnmounted vs useEffect + cleanup
- [ ] **ESS-11**: Class & Style Bindings — :class/:style vs className + style object

### Topic Content — Components In-Depth (7 topics)

- [ ] **COMP-01**: Props — defineProps<T>() vs props type annotation
- [ ] **COMP-02**: Events / Callbacks — emit() vs callback props
- [ ] **COMP-03**: Component v-model — defineModel() vs controlled + callback
- [ ] **COMP-04**: Fallthrough Attributes — auto forward vs spread ...rest props
- [ ] **COMP-05**: Slots — default/named slots vs children + render props
- [ ] **COMP-06**: Provide / Inject — provide()/inject() vs createContext/useContext
- [ ] **COMP-07**: Async Components — defineAsyncComponent vs React.lazy + Suspense

### Topic Content — Reusability (3 topics)

- [ ] **REUS-01**: Composables / Hooks — composables vs custom hooks
- [ ] **REUS-02**: Custom Directives — directive() vs hooks/HOC (Vue-only concept)
- [ ] **REUS-03**: Plugins — app.use() vs Context/Provider pattern

### Topic Content — Built-in Components (5 topics)

- [ ] **BTIN-01**: Transition — `<Transition>` vs framer-motion
- [ ] **BTIN-02**: TransitionGroup — `<TransitionGroup>` vs manual
- [ ] **BTIN-03**: KeepAlive — `<KeepAlive>` vs manual state management
- [ ] **BTIN-04**: Teleport — `<Teleport>` vs createPortal
- [ ] **BTIN-05**: Suspense — `<Suspense>` vs `<Suspense>`

### Topic Content — Deep Dive (3 topics)

- [ ] **DEEP-01**: Rendering Mechanism — Vue compiler optimized diff vs React full subtree diff + diagram
- [ ] **DEEP-02**: Reactivity In-Depth — Proxy-based tracking vs immutable state comparison + diagram
- [ ] **DEEP-03**: Re-render & Optimization — Vue auto vs React manual (memo, useMemo, useCallback) + diagram

### Topic Content — Scaling Up (4 topics)

- [ ] **SCAL-01**: Routing — Vue Router vs React Router
- [ ] **SCAL-02**: State Management — Pinia vs Zustand/Redux Toolkit
- [ ] **SCAL-03**: Testing — Vitest + Vue Test Utils vs Vitest + React Testing Library
- [ ] **SCAL-04**: TypeScript — defineProps<T>/defineEmits<T> vs props type trực tiếp

### Enhancements

- [ ] **ENHC-01**: Search/filter topics theo keyword
- [ ] **ENHC-02**: Progress tracking với localStorage (checkmarks trong sidebar)

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Display Enhancements

- **DISP-V2-01**: Source code display collapsible bên dưới mỗi demo
- **DISP-V2-02**: Syntax highlighting cho source code (Shiki)
- **NAV-V2-01**: Responsive layout — stack vertically trên mobile/tablet
- **ENHC-V2-01**: Dark/light theme toggle

## Out of Scope

| Feature | Reason |
|---------|--------|
| Editable code playground (StackBlitz-style) | Massive complexity, bundler-in-browser cho cả 2 frameworks |
| SSR (Nuxt/Next) | Personal tool, không cần SEO |
| Vue Router | Tránh conflict 2 router trên 1 URL |
| Backend/API/database | Pure frontend, localStorage đủ |
| Multi-framework (Svelte, Solid, Angular) | Scope explosion, focus Vue vs React |
| AI-generated explanations | Content cần opinionated, experience-based |
| Mobile app | Web-only |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-01 | Phase 1 | Complete |
| INFRA-02 | Phase 1 | Complete |
| INFRA-03 | Phase 1 | Complete |
| INFRA-04 | Phase 1 | Complete |
| INFRA-05 | Phase 1 | Complete |
| INFRA-06 | Phase 1 | Complete |
| INFRA-07 | Phase 1 | Complete |
| NAV-01 | Phase 2 | Pending |
| NAV-02 | Phase 2 | Pending |
| NAV-03 | Phase 2 | Pending |
| DISP-01 | Phase 2 | Pending |
| DISP-02 | Phase 2 | Pending |
| ESS-01 | Phase 2 | Pending |
| ESS-02 | Phase 2 | Pending |
| ESS-03 | Phase 2 | Pending |
| ESS-08 | Phase 2 | Pending |
| ESS-10 | Phase 2 | Pending |
| ESS-11 | Phase 2 | Pending |
| ESS-04 | Phase 3 | Pending |
| ESS-05 | Phase 3 | Pending |
| ESS-06 | Phase 3 | Pending |
| ESS-07 | Phase 3 | Pending |
| ESS-09 | Phase 3 | Pending |
| COMP-01 | Phase 3 | Pending |
| COMP-02 | Phase 3 | Pending |
| COMP-03 | Phase 3 | Pending |
| COMP-04 | Phase 3 | Pending |
| COMP-05 | Phase 3 | Pending |
| COMP-06 | Phase 3 | Pending |
| COMP-07 | Phase 3 | Pending |
| REUS-01 | Phase 3 | Pending |
| REUS-02 | Phase 3 | Pending |
| REUS-03 | Phase 3 | Pending |
| BTIN-01 | Phase 3 | Pending |
| BTIN-02 | Phase 3 | Pending |
| BTIN-03 | Phase 3 | Pending |
| BTIN-04 | Phase 3 | Pending |
| BTIN-05 | Phase 3 | Pending |
| ENHC-01 | Phase 3 | Pending |
| ENHC-02 | Phase 3 | Pending |
| DISP-03 | Phase 4 | Pending |
| DEEP-01 | Phase 4 | Pending |
| DEEP-02 | Phase 4 | Pending |
| DEEP-03 | Phase 4 | Pending |
| SCAL-01 | Phase 4 | Pending |
| SCAL-02 | Phase 4 | Pending |
| SCAL-03 | Phase 4 | Pending |
| SCAL-04 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 42 total
- Mapped to phases: 42
- Unmapped: 0

---
*Requirements defined: 2026-03-26*
*Last updated: 2026-03-26 after roadmap creation — all 42 requirements mapped*

# Vue vs React Comparison Hub

## Mục đích

App cá nhân để học React thông qua so sánh với Vue 3. Tận dụng nền tảng Vue 3 đã có để hiểu React nhanh hơn.

## Tính năng chính

- Xem code Vue vs React side-by-side theo từng topic
- Giải thích ngắn gọn điểm giống/khác cho mỗi topic
- Deep dive có giải thích chi tiết + diagram minh họa
- Filter theo category, search theo keyword

## Tech Stack

- Monorepo (pnpm workspaces)
- TypeScript + Vite + TailwindCSS
- Vue 3 app (bên trái)
- React app (bên phải)
- Host app mount cả 2

## Project Structure

```
vibe/
├── packages/
│   ├── shared/                         # Shared giữa 2 app
│   │   ├── src/
│   │   │   ├── types.ts                # Topic, Category, Route types
│   │   │   ├── topics.ts               # Topic registry — single source of truth
│   │   │   └── constants.ts
│   │   └── package.json
│   │
│   ├── vue-app/                        # Vue 3 app
│   │   ├── src/
│   │   │   ├── topics/                 # Mirror cấu trúc route
│   │   │   │   ├── essentials/
│   │   │   │   │   ├── TemplateVsJsx.vue
│   │   │   │   │   ├── Reactivity.vue
│   │   │   │   │   └── ...
│   │   │   │   ├── components/
│   │   │   │   ├── reusability/
│   │   │   │   ├── built-in/
│   │   │   │   ├── deep-dive/
│   │   │   │   └── scaling/
│   │   │   ├── router.ts
│   │   │   ├── App.vue
│   │   │   └── main.ts                # createApp().mount('#vue-root')
│   │   └── package.json
│   │
│   ├── react-app/                      # React app
│   │   ├── src/
│   │   │   ├── topics/                 # Mirror cùng cấu trúc
│   │   │   │   ├── essentials/
│   │   │   │   │   ├── TemplateVsJsx.tsx
│   │   │   │   │   ├── Reactivity.tsx
│   │   │   │   │   └── ...
│   │   │   │   ├── components/
│   │   │   │   ├── reusability/
│   │   │   │   ├── built-in/
│   │   │   │   ├── deep-dive/
│   │   │   │   └── scaling/
│   │   │   ├── router.tsx
│   │   │   ├── App.tsx
│   │   │   └── main.tsx               # createRoot('#react-root').render()
│   │   └── package.json
│   │
│   └── host/                           # Host app — mount cả 2
│       ├── src/
│       │   ├── index.html              # 2 root divs: #vue-root, #react-root
│       │   └── main.ts                 # Import & boot cả 2 apps
│       ├── vite.config.ts              # Config xử lý cả Vue SFC + React JSX
│       └── package.json
│
├── pnpm-workspace.yaml
├── package.json
└── PROJECT_BRIEF.md
```

### Routing

- **Chỉ dùng React Router** ở host app, quản lý URL
- Vue app không dùng Vue Router, nhận topic hiện tại qua **custom event** trên window
- Route pattern: `/:category/:topicId`

```
React Router navigate → URL đổi
      ↓
dispatch CustomEvent('route-change', { detail: { category, topicId } })
      ↓
Vue app listen → render đúng component
```

Topic registry từ `shared/topics.ts` — single source of truth:

```ts
// packages/shared/src/topics.ts
export const topics = [
  { id: 'template-vs-jsx', category: 'essentials', title: 'Template vs JSX' },
  { id: 'reactivity', category: 'essentials', title: 'Reactivity' },
  // ...
]
```

Cả 2 app follow cùng folder convention:
- Vue: `vue-app/src/topics/{category}/{TopicId}.vue`
- React: `react-app/src/topics/{category}/{TopicId}.tsx`

### Layout

```
┌──────────────────────────────────────────────────┐
│  [Sidebar / Navigation]   ← shared topic list    │
├────────────────────┬─────────────────────────────┤
│                    │                              │
│   Vue 3 App        │   React App                  │
│   #vue-root        │   #react-root                │
│                    │                              │
│   Render topic     │   Render cùng topic           │
│   component        │   component                  │
│                    │                              │
├────────────────────┴─────────────────────────────┤
│  [Description / So sánh / Diagram]                │
└──────────────────────────────────────────────────┘
```

### Mỗi topic page hiển thị gì

- Tiêu đề + short description
- Side-by-side: Vue app (trái) | React app (phải) — cả 2 chạy live
- Source code hiển thị bên dưới mỗi bên (collapsible)
- Giải thích điểm giống/khác
- Deep dive pages: thêm diagram + giải thích chi tiết

## Topics

### 1. Essentials

| Topic                  | Vue                           | React                                    | Ghi chú                    |
| ---------------------- | ----------------------------- | ---------------------------------------- | -------------------------- |
| Template vs JSX        | Template syntax, directives   | JSX — JS expressions trong markup        | Khác nhau về tư duy        |
| Reactivity             | ref(), reactive()             | useState, useReducer                     | Vue tự track, React manual |
| Computed               | computed()                    | useMemo                                  | Tương tự mục đích          |
| Conditional Rendering  | v-if, v-else, v-show          | &&, ternary, early return                | Vue directive vs JS thuần  |
| List Rendering         | v-for + :key                  | .map() + key                             | Tương tự logic             |
| Event Handling         | @click, @input, modifiers     | onClick, onChange                        | Vue có modifiers tiện hơn  |
| Form Bindings          | v-model (two-way)             | Controlled components (value + onChange) | Vue gọn hơn nhiều          |
| Watchers               | watch(), watchEffect()        | useEffect                                | Cần hiểu kỹ deps array     |
| Template Refs          | ref + template ref            | useRef                                   | Tương tự                   |
| Lifecycle              | onMounted, onUnmounted...     | useEffect + cleanup                      | Khác mental model          |
| Class & Style Bindings | :class, :style (object/array) | className + style object                 | Vue linh hoạt hơn          |

### 2. Components In-Depth

| Topic                  | Vue                  | React                      | Ghi chú                   |
| ---------------------- | -------------------- | -------------------------- | ------------------------- |
| Props                  | defineProps<T>()     | Props type annotation      | Tương tự                  |
| Events / Callbacks     | emit()               | Callback props             | Khác pattern              |
| Component v-model      | defineModel()        | Controlled + callback      | Vue tiện hơn              |
| Fallthrough Attributes | Tự động forward      | Spread ...rest props       | Vue tự động, React manual |
| Slots                  | default/named slots  | children + render props    | Khác khái niệm            |
| Provide / Inject       | provide() + inject() | createContext + useContext | Tương tự mục đích         |
| Async Components       | defineAsyncComponent | React.lazy + Suspense      | Tương tự                  |

### 3. Reusability

| Topic               | Vue         | React                     | Ghi chú                     |
| ------------------- | ----------- | ------------------------- | --------------------------- |
| Composables / Hooks | Composables | Custom Hooks              | Tương tự, naming khác       |
| Custom Directives   | directive() | Không có — dùng hooks/HOC | Vue-only concept            |
| Plugins             | app.use()   | Context/Provider pattern  | Không tương đương trực tiếp |

### 4. Built-in Components

| Topic           | Vue                 | React                          | Ghi chú          |
| --------------- | ------------------- | ------------------------------ | ---------------- |
| Transition      | `<Transition>`      | Không built-in — framer-motion | Vue tích hợp sẵn |
| TransitionGroup | `<TransitionGroup>` | Không built-in                 | Vue tích hợp sẵn |
| KeepAlive       | `<KeepAlive>`       | Không built-in — tự manage     | Vue-only         |
| Teleport        | `<Teleport>`        | createPortal                   | Tương tự         |
| Suspense        | `<Suspense>`        | `<Suspense>`                   | Cả hai đều có    |

### 5. Deep Dive (chi tiết + diagram)

#### 5.1 Rendering Mechanism

- Virtual DOM là gì, hoạt động thế nào
- Vue: Compiler phân tích template → đánh dấu static/dynamic nodes → chỉ diff phần dynamic
- React: Diff toàn bộ subtree mỗi lần render
- Diagram: Flow từ state change → re-render → DOM update cho cả 2

#### 5.2 Reactivity In-Depth

- Vue: Proxy-based → tự động track getter/setter → biết chính xác dependency
- React: Immutable state → so sánh reference (===) → không biết cái gì thay đổi bên trong
- Diagram: Vue dependency tracking vs React top-down re-render

#### 5.3 Re-render & Optimization

- Tại sao React re-render nhiều (parent render → children render)
- useEffect deps array — sai là infinite loop hoặc stale data
- Object/array trong deps luôn tạo reference mới
- Callback props tạo reference mới mỗi render
- Giải pháp: React.memo, useMemo, useCallback, useRef
- Diagram: Component tree re-render flow, trước vs sau optimize
- So sánh: Vue gần như không cần lo vs React phải tự optimize

### 6. Scaling Up

| Topic            | Vue                            | React                          | Ghi chú                    |
| ---------------- | ------------------------------ | ------------------------------ | -------------------------- |
| Routing          | Vue Router                     | React Router                   | Khác API, tương tự concept |
| State Management | Pinia                          | Zustand / Redux Toolkit        | Pinia đơn giản hơn         |
| Testing          | Vitest + Vue Test Utils        | Vitest + React Testing Library | Tương tự approach          |
| TypeScript       | defineProps<T>, defineEmits<T> | Props type trực tiếp           | React gọn hơn              |

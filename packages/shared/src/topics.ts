import type { TopicMeta } from './types'
import { CATEGORIES } from './constants'

export const topics: TopicMeta[] = [
  {
    id: 'template-syntax',
    slug: 'template-syntax',
    title: 'Template vs JSX',
    category: 'essentials',
    order: 1,
    description: 'Template syntax/directives vs JSX expressions',
  },
  {
    id: 'reactivity',
    slug: 'reactivity',
    title: 'Reactivity',
    category: 'essentials',
    order: 2,
    description: 'ref()/reactive() vs useState/useReducer',
  },
  {
    id: 'computed',
    slug: 'computed',
    title: 'Computed / useMemo',
    category: 'essentials',
    order: 3,
    description: 'computed() vs useMemo',
  },
  {
    id: 'watchers',
    slug: 'watchers',
    title: 'Watchers / useEffect',
    category: 'essentials',
    order: 4,
    description: 'watch()/watchEffect() vs useEffect',
  },
  {
    id: 'lifecycle',
    slug: 'lifecycle',
    title: 'Lifecycle Hooks',
    category: 'essentials',
    order: 5,
    description: 'onMounted/onUnmounted vs useEffect + cleanup',
  },
  {
    id: 'class-style-bindings',
    slug: 'class-style-bindings',
    title: 'Class & Style Bindings',
    category: 'essentials',
    order: 6,
    description: ':class/:style vs className + style object',
  },
  {
    id: 'conditional-rendering',
    slug: 'conditional-rendering',
    title: 'Conditional Rendering',
    category: 'essentials',
    order: 7,
    description: 'v-if/v-else/v-show vs &&/ternary/early return',
  },
  {
    id: 'list-rendering',
    slug: 'list-rendering',
    title: 'List Rendering',
    category: 'essentials',
    order: 8,
    description: 'v-for + :key vs .map() + key',
  },
  {
    id: 'event-handling',
    slug: 'event-handling',
    title: 'Event Handling',
    category: 'essentials',
    order: 9,
    description: '@click/@input + modifiers vs onClick/onChange',
  },
  {
    id: 'form-bindings',
    slug: 'form-bindings',
    title: 'Form Bindings',
    category: 'essentials',
    order: 10,
    description: 'v-model vs controlled components',
  },
  {
    id: 'template-refs',
    slug: 'template-refs',
    title: 'Template Refs',
    category: 'essentials',
    order: 11,
    description: 'ref + template ref vs useRef',
  },
  {
    id: 'props',
    slug: 'props',
    title: 'Props',
    category: 'components',
    order: 1,
    description: 'defineProps<T>() vs props type annotation',
  },
  {
    id: 'events-callbacks',
    slug: 'events-callbacks',
    title: 'Events / Callbacks',
    category: 'components',
    order: 2,
    description: 'emit() vs callback props',
  },
  {
    id: 'component-v-model',
    slug: 'component-v-model',
    title: 'Component v-model',
    category: 'components',
    order: 3,
    description: 'defineModel() vs controlled + callback',
  },
  {
    id: 'fallthrough-attributes',
    slug: 'fallthrough-attributes',
    title: 'Fallthrough Attributes',
    category: 'components',
    order: 4,
    description: 'Auto forward vs spread ...rest props',
  },
  {
    id: 'slots',
    slug: 'slots',
    title: 'Slots',
    category: 'components',
    order: 5,
    description: 'Default/named slots vs children + render props',
  },
  {
    id: 'provide-inject',
    slug: 'provide-inject',
    title: 'Provide / Inject',
    category: 'components',
    order: 6,
    description: 'provide()/inject() vs createContext/useContext',
  },
  {
    id: 'async-components',
    slug: 'async-components',
    title: 'Async Components',
    category: 'components',
    order: 7,
    description: 'defineAsyncComponent vs React.lazy + Suspense',
  },
  {
    id: 'composables-hooks',
    slug: 'composables-hooks',
    title: 'Composables / Hooks',
    category: 'reusability',
    order: 1,
    description: 'Composables vs custom hooks',
  },
  {
    id: 'custom-directives',
    slug: 'custom-directives',
    title: 'Custom Directives',
    category: 'reusability',
    order: 2,
    description: 'directive() vs hooks/HOC (Vue-only concept)',
  },
  {
    id: 'plugins',
    slug: 'plugins',
    title: 'Plugins',
    category: 'reusability',
    order: 3,
    description: 'app.use() vs Context/Provider pattern',
  },
  {
    id: 'transition',
    slug: 'transition',
    title: 'Transition',
    category: 'built-in',
    order: 1,
    description: '<Transition> vs CSS transitions',
  },
  {
    id: 'transition-group',
    slug: 'transition-group',
    title: 'TransitionGroup',
    category: 'built-in',
    order: 2,
    description: '<TransitionGroup> vs manual list animation',
  },
  {
    id: 'keep-alive',
    slug: 'keep-alive',
    title: 'KeepAlive',
    category: 'built-in',
    order: 3,
    description: '<KeepAlive> vs manual state preservation',
  },
  {
    id: 'teleport',
    slug: 'teleport',
    title: 'Teleport',
    category: 'built-in',
    order: 4,
    description: '<Teleport> vs createPortal',
  },
  {
    id: 'suspense',
    slug: 'suspense',
    title: 'Suspense',
    category: 'built-in',
    order: 5,
    description: '<Suspense> vs <Suspense>',
  },
]

export function getTopicsByCategory(category: string): TopicMeta[] {
  return topics.filter((t) => t.category === category)
}

export function findTopic(
  category: string,
  topicId: string,
): TopicMeta | undefined {
  return topics.find((t) => t.category === category && t.slug === topicId)
}

export function getAllCategories(): string[] {
  const cats = new Set<string>(topics.map((t) => t.category))
  return Object.keys(CATEGORIES).filter((c) => cats.has(c))
}

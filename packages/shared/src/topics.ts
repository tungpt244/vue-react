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

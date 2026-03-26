import type { TopicMeta } from './types'

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

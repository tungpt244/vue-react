export interface RouteChangeDetail {
  category: string
  topicId: string
}

export interface TopicMeta {
  id: string
  slug: string
  title: string
  category: Category
  order: number
  description?: string
}

export type Category =
  | 'essentials'
  | 'components'
  | 'reusability'
  | 'built-in'
  | 'scaling-up'
  | 'deep-dive'

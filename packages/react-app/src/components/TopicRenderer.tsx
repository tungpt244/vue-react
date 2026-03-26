import { lazy, Suspense } from 'react'
import { useRouteDispatch } from '../hooks/useRouteDispatch'
import { findTopic } from '@vibe/shared'

const topicModules = import.meta.glob<{ default: React.ComponentType }>('../topics/**/*.tsx')

function toPascalCase(slug: string): string {
  return slug
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')
}

export function TopicRenderer() {
  const { category, topicId } = useRouteDispatch()

  if (!category || !topicId) {
    return (
      <div className="text-slate-400 text-sm">
        No topic selected -- navigate to /:category/:topicId
      </div>
    )
  }

  const topic = findTopic(category, topicId)
  const modulePath = `../topics/${category}/${toPascalCase(topicId)}.tsx`
  const moduleLoader = topicModules[modulePath]

  if (!moduleLoader) {
    return (
      <div className="text-slate-400 text-sm">
        Topic component not found: {category}/{topicId}
      </div>
    )
  }

  const TopicComponent = lazy(moduleLoader)

  return (
    <Suspense fallback={<div className="text-slate-400 text-sm">Loading...</div>}>
      <TopicComponent />
    </Suspense>
  )
}

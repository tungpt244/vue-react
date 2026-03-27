import { lazy, Suspense, useMemo } from 'react'
import { useRouteDispatch } from '../hooks/useRouteDispatch'

const topicModules = import.meta.glob<{ default: React.ComponentType }>('../topics/**/*.tsx')

const lazyCache = new Map<string, React.LazyExoticComponent<React.ComponentType>>()

function getLazyComponent(modulePath: string) {
  if (!lazyCache.has(modulePath)) {
    const loader = topicModules[modulePath]
    if (!loader) return null
    lazyCache.set(modulePath, lazy(loader))
  }
  return lazyCache.get(modulePath)!
}

function toPascalCase(slug: string): string {
  return slug
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')
}

export function TopicRenderer() {
  const { category, topicId } = useRouteDispatch()

  const TopicComponent = useMemo(() => {
    if (!category || !topicId) return null
    const modulePath = `../topics/${category}/${toPascalCase(topicId)}.tsx`
    return getLazyComponent(modulePath)
  }, [category, topicId])

  if (!category || !topicId) {
    return (
      <div className="text-slate-400 text-sm">
        Chưa chọn topic
      </div>
    )
  }

  if (!TopicComponent) {
    return (
      <div className="text-slate-400 text-sm">
        Không tìm thấy component: {category}/{topicId}
      </div>
    )
  }

  return (
    <Suspense fallback={<div className="text-slate-400 text-sm">Đang tải...</div>}>
      <TopicComponent />
    </Suspense>
  )
}

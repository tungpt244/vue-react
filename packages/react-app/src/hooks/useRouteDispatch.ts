import { useEffect } from 'react'
import { useParams } from 'react-router'
import { ROUTE_CHANGE_EVENT, type RouteChangeDetail } from '@vibe/shared'

export function useRouteDispatch() {
  const { category, topicId } = useParams<{
    category: string
    topicId: string
  }>()

  useEffect(() => {
    if (category && topicId) {
      window.dispatchEvent(
        new CustomEvent<RouteChangeDetail>(ROUTE_CHANGE_EVENT, {
          detail: { category, topicId },
        }),
      )
    }
  }, [category, topicId])

  return { category, topicId }
}

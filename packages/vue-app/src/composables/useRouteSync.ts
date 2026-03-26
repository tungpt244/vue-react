import { ref, onMounted } from 'vue'
import { useEventListener } from '@vueuse/core'
import { ROUTE_CHANGE_EVENT, type RouteChangeDetail } from '@vibe/shared'

export function useRouteSync() {
  const category = ref('')
  const topicId = ref('')

  function parseCurrentUrl() {
    const parts = window.location.pathname.split('/').filter(Boolean)
    if (parts.length >= 2) {
      category.value = parts[0]
      topicId.value = parts[1]
    }
  }

  // Fallback: read URL on mount (handles race condition where React dispatches before Vue mounts)
  onMounted(() => parseCurrentUrl())

  // Listen for subsequent route changes from React Router
  useEventListener(window, ROUTE_CHANGE_EVENT, (e: Event) => {
    const { detail } = e as CustomEvent<RouteChangeDetail>
    category.value = detail.category
    topicId.value = detail.topicId
  })

  return { category, topicId }
}

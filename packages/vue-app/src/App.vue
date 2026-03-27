<script setup lang="ts">
import { useRouteSync } from './composables/useRouteSync'
import TopicRenderer from './components/TopicRenderer.vue'

const { category, topicId } = useRouteSync()
</script>

<template>
  <div class="p-4">
    <div class="flex items-center gap-2 mb-4">
      <span
        class="text-xs font-semibold text-white bg-emerald-500 rounded px-2 py-1"
      >
        Vue 3
      </span>
      <span v-if="category && topicId" class="text-sm text-slate-500">
        {{ category }} / {{ topicId }}
      </span>
    </div>
    <TopicRenderer
      v-if="category && topicId"
      :category="category"
      :topic-id="topicId"
    />
    <div v-else class="text-sm text-slate-400">
      Vue 3 -- Waiting for topic selection
    </div>
  </div>
</template>

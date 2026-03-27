<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { findTopic } from '@vibe/shared'

const props = defineProps<{
  category: string
  topicId: string
}>()

const topicModules = import.meta.glob<{ default: any }>('../topics/**/*.vue')

function toPascalCase(slug: string): string {
  return slug
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')
}

const topic = computed(() => findTopic(props.category, props.topicId))

const TopicComponent = computed(() => {
  const modulePath = `../topics/${props.category}/${toPascalCase(props.topicId)}.vue`
  const loader = topicModules[modulePath]
  if (!loader) return null
  return defineAsyncComponent(loader)
})
</script>

<template>
  <div v-if="TopicComponent">
    <component :is="TopicComponent" />
  </div>
  <div v-else class="text-sm text-slate-400">
    Topic component not found: {{ category }}/{{ topicId }}
  </div>
</template>

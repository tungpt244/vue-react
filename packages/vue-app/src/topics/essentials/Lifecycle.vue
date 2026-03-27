<script setup lang="ts">
import { ref, defineComponent, h, onMounted, onUnmounted } from 'vue'

const logs = ref<string[]>([])
const showTimer = ref(true)

const TimerDisplay = defineComponent({
  setup() {
    const elapsed = ref(0)
    let interval: ReturnType<typeof setInterval>

    onMounted(() => {
      logs.value.push(`[${new Date().toLocaleTimeString()}] onMounted`)
      interval = setInterval(() => elapsed.value++, 1000)
    })

    onUnmounted(() => {
      logs.value.push(`[${new Date().toLocaleTimeString()}] onUnmounted`)
      clearInterval(interval)
    })

    return () => h('div', { class: 'text-2xl font-bold text-blue-600' }, `${elapsed.value}s`)
  }
})

function clearLogs() {
  logs.value = []
}
</script>

<template>
  <div>
    <h2 class="text-lg font-semibold mb-3">Lifecycle Hooks</h2>

    <div class="border border-slate-200 rounded-lg p-4 mb-4 space-y-4">
      <!-- Timer toggle controls -->
      <div class="flex items-center gap-3">
        <button
          @click="showTimer = !showTimer"
          class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          {{ showTimer ? 'Unmount Timer' : 'Mount Timer' }}
        </button>
        <span class="text-sm text-slate-500">Toggle to trigger lifecycle hooks</span>
      </div>

      <!-- Timer display (conditional mount/unmount) -->
      <div class="bg-slate-50 rounded p-4 min-h-16 flex items-center justify-center">
        <TimerDisplay v-if="showTimer" />
        <span v-else class="text-slate-400 text-sm italic">Timer unmounted</span>
      </div>

      <!-- Log panel -->
      <div>
        <div class="flex items-center justify-between mb-1">
          <p class="text-xs font-medium text-slate-500 uppercase tracking-wide">Lifecycle log</p>
          <button
            @click="clearLogs"
            class="px-2 py-0.5 bg-slate-200 text-slate-600 rounded text-xs hover:bg-slate-300"
          >
            Clear
          </button>
        </div>
        <div class="bg-slate-900 text-green-400 font-mono text-xs p-3 rounded max-h-40 overflow-y-auto">
          <div v-if="logs.length === 0" class="text-slate-500">Mount/unmount the timer to see lifecycle events...</div>
          <div v-for="(log, i) in logs" :key="i">{{ log }}</div>
        </div>
      </div>
    </div>

    <!-- Explanation -->
    <div class="mt-6 p-4 bg-slate-50 rounded">
      <h3 class="text-sm font-semibold mb-2">Key Differences</h3>
      <ul class="text-sm text-slate-600 space-y-1 list-disc list-inside">
        <li>Vue provides explicit lifecycle hooks: <code class="bg-white px-1 rounded text-xs">onMounted</code>, <code class="bg-white px-1 rounded text-xs">onUnmounted</code>, <code class="bg-white px-1 rounded text-xs">onBeforeMount</code>, <code class="bg-white px-1 rounded text-xs">onBeforeUnmount</code>, etc.</li>
        <li>Each hook maps to a specific phase in the component lifecycle.</li>
        <li>Hooks only run once per component instance creation/destruction.</li>
        <li>When a component is toggled off and on, a new instance is created and all hooks fire again.</li>
        <li>React has no separate lifecycle hooks — <code class="bg-white px-1 rounded text-xs">useEffect(fn, [])</code> = mount, and its cleanup function = unmount.</li>
      </ul>
    </div>
  </div>
</template>

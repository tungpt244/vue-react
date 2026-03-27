<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'

const question = ref('')
const answer = ref('Ask a question ending with ?')
const searchQuery = ref('')
const logs = ref<string[]>([])

watch(question, (newVal, oldVal) => {
  logs.value.push(`watch: "${oldVal}" -> "${newVal}"`)
  if (newVal.endsWith('?')) {
    answer.value = 'Thinking...'
    setTimeout(() => {
      answer.value = 'Yes! 42 is the answer.'
    }, 500)
  }
})

watchEffect(() => {
  if (searchQuery.value) {
    logs.value.push(`watchEffect: searching "${searchQuery.value}"`)
  }
})

function clearLogs() {
  logs.value = []
}
</script>

<template>
  <div>
    <h2 class="text-lg font-semibold mb-3">Watchers / useEffect</h2>

    <div class="border border-slate-200 rounded-lg p-4 mb-4 space-y-4">
      <!-- Question watcher demo -->
      <div>
        <p class="text-sm font-medium text-slate-700 mb-2">Question watcher (watch)</p>
        <input
          v-model="question"
          placeholder="Ask something ending with ?"
          class="border border-slate-300 rounded px-2 py-1 text-sm w-full mb-2"
        />
        <div class="text-sm text-slate-600 bg-slate-50 rounded p-2">
          Answer: <span class="font-medium">{{ answer }}</span>
        </div>
      </div>

      <!-- Search watchEffect demo -->
      <div>
        <p class="text-sm font-medium text-slate-700 mb-2">Search query (watchEffect)</p>
        <input
          v-model="searchQuery"
          placeholder="Type to trigger watchEffect..."
          class="border border-slate-300 rounded px-2 py-1 text-sm w-full"
        />
      </div>

      <!-- Log panel -->
      <div>
        <div class="flex items-center justify-between mb-1">
          <p class="text-xs font-medium text-slate-500 uppercase tracking-wide">Watcher log</p>
          <button
            @click="clearLogs"
            class="px-2 py-0.5 bg-slate-200 text-slate-600 rounded text-xs hover:bg-slate-300"
          >
            Clear
          </button>
        </div>
        <div class="bg-slate-900 text-green-400 font-mono text-xs p-3 rounded max-h-40 overflow-y-auto">
          <div v-if="logs.length === 0" class="text-slate-500">No watcher events yet...</div>
          <div v-for="(log, i) in logs" :key="i">{{ log }}</div>
        </div>
      </div>
    </div>

    <!-- Explanation -->
    <div class="mt-6 p-4 bg-slate-50 rounded">
      <h3 class="text-sm font-semibold mb-2">Key Differences</h3>
      <ul class="text-sm text-slate-600 space-y-1 list-disc list-inside">
        <li><code class="bg-white px-1 rounded text-xs">watch(source, callback)</code> explicitly watches a specific ref and provides old/new values.</li>
        <li><code class="bg-white px-1 rounded text-xs">watchEffect(fn)</code> auto-tracks any reactive dependency accessed inside — no need to specify what to watch.</li>
        <li>Vue watchers are synchronous by default (flush: 'pre').</li>
        <li>Both are automatically cleaned up when the component unmounts.</li>
        <li>React has only <code class="bg-white px-1 rounded text-xs">useEffect(fn, deps)</code> — the dependency array <code class="bg-white px-1 rounded text-xs">[dep]</code> is like <code class="bg-white px-1 rounded text-xs">watch(dep, ...)</code>, while no equivalent to <code class="bg-white px-1 rounded text-xs">watchEffect</code> exists (must list deps manually).</li>
      </ul>
    </div>
  </div>
</template>

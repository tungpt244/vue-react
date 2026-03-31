<script setup lang="ts">
import { reactive, watchEffect, ref } from 'vue'

const showCode = ref(false)
const logs = ref<string[]>([])
const state = reactive({ name: 'Vue', version: 3 })

watchEffect(() => {
  // Accessing state.name and state.version triggers tracking
  logs.value.push(`[tracked] name="${state.name}", version=${state.version}`)
})

function mutateName() {
  state.name = state.name === 'Vue' ? 'Vue 3' : 'Vue'
  logs.value.push(`[triggered] name set → "${state.name}"`)
}

function mutateVersion() {
  state.version++
  logs.value.push(`[triggered] version set → ${state.version}`)
}

function clearLogs() {
  logs.value = []
}

const DEMO_CODE = `import { reactive, watchEffect } from 'vue'

const state = reactive({ name: 'Vue', version: 3 })

// Vue wraps state in Proxy
// get trap: auto-track which effect accessed which property
// set trap: trigger all effects that depend on that property
watchEffect(() => {
  console.log(state.name, state.version)
  // ↑ accessing these properties registers this effect
  //   as a dependency of state.name AND state.version
})

state.name = 'Vue 3'
// ↑ Proxy set trap fires → only effects that
//   depend on "name" are re-run (fine-grained)`
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">Reactivity In-Depth</h2>

      <p class="text-xs text-slate-500 mb-3">
        Vue's <code class="bg-slate-100 px-1 rounded">reactive()</code> dùng
        Proxy — tự động track dependency khi access, tự động trigger khi mutate.
      </p>

      <div class="flex gap-2 mb-3 flex-wrap">
        <button
          @click="mutateName"
          class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Toggle name
        </button>
        <button
          @click="mutateVersion"
          class="px-3 py-1 bg-violet-500 text-white rounded hover:bg-violet-600 text-sm"
        >
          Increment version
        </button>
        <button
          @click="clearLogs"
          class="px-3 py-1 bg-slate-400 text-white rounded hover:bg-slate-500 text-sm"
        >
          Clear
        </button>
      </div>

      <div
        class="bg-slate-900 rounded p-3 font-mono text-xs h-32 overflow-y-auto"
      >
        <div v-if="logs.length === 0" class="text-slate-500">
          — Log sẽ hiện ở đây —
        </div>
        <div
          v-for="(log, i) in logs"
          :key="i"
          :class="
            log.startsWith('[tracked]') ? 'text-blue-400' : 'text-green-400'
          "
        >
          {{ log }}
        </div>
      </div>
    </div>

    <div class="mb-4">
      <button
        @click="showCode = !showCode"
        class="text-xs text-blue-600 hover:text-blue-800 font-medium"
      >
        {{ showCode ? '▼ Ẩn code' : '▶ Xem code' }}
      </button>
      <pre
        v-if="showCode"
        class="mt-2 bg-slate-900 text-slate-100 text-xs p-4 rounded overflow-x-auto"
      ><code>{{ DEMO_CODE }}</code></pre>
    </div>

    <div class="p-4 bg-slate-50 rounded mb-4">
      <h3 class="text-sm font-semibold mb-2">So sánh</h3>
      <div class="text-sm text-slate-600 space-y-2">
        <p>
          <strong>Vue wrap objects trong Proxy.</strong> Get trap ghi lại effect
          nào đang access property đó. Set trap trigger đúng những effects đó.
          Fine-grained, tự động, không cần khai báo dependency.
        </p>
        <p>
          <strong>React không có tracking.</strong> State là immutable value —
          bạn gọi setter thủ công, toàn bộ component re-render. Derived values
          cần <code class="bg-slate-200 px-1 rounded">useMemo</code> với
          dependency array khai báo tay.
        </p>
        <p>
          <strong>Vue's Proxy approach hoàn toàn tự động</strong> — không cần
          dependency array, không lo stale closures. React's explicit model dễ
          predict hơn nhưng yêu cầu developer tự quản lý.
        </p>
      </div>
    </div>

    <div class="border border-slate-200 rounded-lg p-4">
      <h3 class="text-sm font-semibold mb-4">Diagram: Proxy-based Tracking</h3>
      <svg
        viewBox="0 0 460 140"
        class="w-full h-auto"
        aria-label="Vue Proxy-based reactivity tracking diagram"
      >
        <defs>
          <marker
            id="arrow-reactivity-vue"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8" />
          </marker>
        </defs>

        <!-- Node 1: reactive({}) -->
        <rect
          x="10"
          y="50"
          width="80"
          height="36"
          rx="4"
          fill="#f1f5f9"
          stroke="#cbd5e1"
          stroke-width="1"
        />
        <text x="50" y="66" text-anchor="middle" font-size="9" fill="#334155">
          reactive({})
        </text>
        <text x="50" y="79" text-anchor="middle" font-size="8" fill="#94a3b8">
          ref()
        </text>

        <!-- Arrow 1 -->
        <path
          d="M90 68 L114 68"
          stroke="#94a3b8"
          stroke-width="1.5"
          marker-end="url(#arrow-reactivity-vue)"
        />

        <!-- Node 2: Proxy -->
        <rect
          x="114"
          y="50"
          width="64"
          height="36"
          rx="4"
          fill="#dbeafe"
          stroke="#93c5fd"
          stroke-width="1"
        />
        <text x="146" y="66" text-anchor="middle" font-size="10" fill="#334155">
          Proxy
        </text>
        <text x="146" y="79" text-anchor="middle" font-size="8" fill="#60a5fa">
          intercepts
        </text>

        <!-- Arrow to get branch (up) -->
        <path
          d="M178 58 L220 35"
          stroke="#94a3b8"
          stroke-width="1.5"
          marker-end="url(#arrow-reactivity-vue)"
        />

        <!-- Arrow to set branch (down) -->
        <path
          d="M178 78 L220 101"
          stroke="#94a3b8"
          stroke-width="1.5"
          marker-end="url(#arrow-reactivity-vue)"
        />

        <!-- Node 3a: get trap -->
        <rect
          x="220"
          y="18"
          width="100"
          height="34"
          rx="4"
          fill="#f1f5f9"
          stroke="#cbd5e1"
          stroke-width="1"
        />
        <text x="270" y="33" text-anchor="middle" font-size="9" fill="#334155">
          get: Track dep
        </text>
        <text x="270" y="46" text-anchor="middle" font-size="8" fill="#94a3b8">
          activeEffect → dep
        </text>

        <!-- Node 3b: set trap -->
        <rect
          x="220"
          y="84"
          width="100"
          height="34"
          rx="4"
          fill="#f1f5f9"
          stroke="#cbd5e1"
          stroke-width="1"
        />
        <text x="270" y="99" text-anchor="middle" font-size="9" fill="#334155">
          set: Trigger effects
        </text>
        <text x="270" y="112" text-anchor="middle" font-size="8" fill="#94a3b8">
          dep.effects.run()
        </text>

        <!-- Arrow from get to re-render -->
        <path
          d="M320 35 L364 58"
          stroke="#94a3b8"
          stroke-width="1.5"
          marker-end="url(#arrow-reactivity-vue)"
        />

        <!-- Arrow from set to re-render -->
        <path
          d="M320 101 L364 78"
          stroke="#94a3b8"
          stroke-width="1.5"
          marker-end="url(#arrow-reactivity-vue)"
        />

        <!-- Node 4: Re-render affected -->
        <rect
          x="364"
          y="50"
          width="84"
          height="36"
          rx="4"
          fill="#dcfce7"
          stroke="#86efac"
          stroke-width="1"
        />
        <text x="406" y="65" text-anchor="middle" font-size="9" fill="#15803d">
          Re-render
        </text>
        <text x="406" y="78" text-anchor="middle" font-size="8" fill="#15803d">
          affected only
        </text>

        <!-- Label get/set -->
        <text x="196" y="30" text-anchor="middle" font-size="8" fill="#60a5fa">
          get
        </text>
        <text x="196" y="106" text-anchor="middle" font-size="8" fill="#f97316">
          set
        </text>
      </svg>
    </div>
  </div>
</template>

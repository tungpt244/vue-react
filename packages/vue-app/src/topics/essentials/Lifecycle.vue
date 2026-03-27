<script setup lang="ts">
import { ref, defineComponent, h, onMounted, onUnmounted } from 'vue'

const logs = ref<string[]>([])
const showTimer = ref(true)
const showCode = ref(false)

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
  },
})

function clearLogs() {
  logs.value = []
}

const DEMO_CODE = `// Vue — Lifecycle hooks riêng biệt
onMounted(() => {
  // Chạy 1 lần sau khi component mount vào DOM
  interval = setInterval(...)
})

onUnmounted(() => {
  // Chạy khi component bị remove khỏi DOM
  clearInterval(interval)
})

// Còn có: onBeforeMount, onBeforeUnmount,
// onUpdated, onBeforeUpdate, onActivated...
// Mỗi hook = 1 giai đoạn cụ thể trong lifecycle`
</script>

<template>
  <div>
    <h2 class="text-lg font-semibold mb-3">Lifecycle Hooks</h2>

    <div class="border border-slate-200 rounded-lg p-4 mb-4 space-y-4">
      <div class="flex items-center gap-3">
        <button
          @click="showTimer = !showTimer"
          class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          {{ showTimer ? 'Unmount Timer' : 'Mount Timer' }}
        </button>
        <span class="text-sm text-slate-500">Bấm để trigger lifecycle hooks</span>
      </div>

      <div class="bg-slate-50 rounded p-4 min-h-16 flex items-center justify-center">
        <TimerDisplay v-if="showTimer" />
        <span v-else class="text-slate-400 text-sm italic">Timer đã unmount</span>
      </div>

      <div>
        <div class="flex items-center justify-between mb-1">
          <p class="text-xs font-medium text-slate-500 uppercase tracking-wide">Lifecycle log</p>
          <button
            @click="clearLogs"
            class="px-2 py-0.5 bg-slate-200 text-slate-600 rounded text-xs hover:bg-slate-300"
          >
            Xóa
          </button>
        </div>
        <div class="bg-slate-900 text-green-400 font-mono text-xs p-3 rounded max-h-40 overflow-y-auto">
          <div v-if="logs.length === 0" class="text-slate-500">Mount/unmount timer để xem lifecycle events...</div>
          <div v-for="(log, i) in logs" :key="i">{{ log }}</div>
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
      <pre v-if="showCode" class="mt-2 bg-slate-900 text-slate-100 text-xs p-3 rounded overflow-x-auto">
        <code>{{ DEMO_CODE }}</code>
      </pre>
    </div>

    <div class="p-4 bg-slate-50 rounded">
      <h3 class="text-sm font-semibold mb-2">So sánh</h3>
      <div class="text-sm text-slate-600 space-y-2">
        <p>
          <strong>Vue có lifecycle hooks chuyên dụng cho từng giai đoạn.</strong>
          <code class="bg-slate-200 px-1 rounded">onMounted</code>,
          <code class="bg-slate-200 px-1 rounded">onUnmounted</code>,
          <code class="bg-slate-200 px-1 rounded">onBeforeMount</code>,
          <code class="bg-slate-200 px-1 rounded">onUpdated</code>... Mỗi hook rõ ràng
          chạy ở đâu trong lifecycle — dễ đọc và debug.
        </p>
        <p>
          <strong>Hooks chạy 1 lần per instance.</strong> Khi toggle component off/on, Vue tạo
          instance mới → tất cả hooks fire lại. Khác React useEffect có thể chạy nhiều lần
          nếu dependency thay đổi.
        </p>
        <p>
          <strong>onBeforeMount — chạy trước khi mount.</strong> React không có tương đương
          (useEffect chạy sau render). Hữu ích khi cần setup trước khi DOM được insert.
        </p>
      </div>
    </div>
  </div>
</template>

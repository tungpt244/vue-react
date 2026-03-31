<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'

const question = ref('')
const answer = ref('Hỏi gì đó kết thúc bằng ?')
const searchQuery = ref('')
const logs = ref<string[]>([])
const showCode = ref(false)

watch(question, (newVal, oldVal) => {
  logs.value.push(`watch: "${oldVal}" → "${newVal}"`)
  if (newVal.endsWith('?')) {
    answer.value = 'Đang nghĩ...'
    setTimeout(() => {
      answer.value = 'Có! 42 là câu trả lời.'
    }, 500)
  }
})

watchEffect(() => {
  if (searchQuery.value) {
    logs.value.push(`watchEffect: tìm "${searchQuery.value}"`)
  }
})

function clearLogs() {
  logs.value = []
}

const DEMO_CODE = `// Vue — watch() + watchEffect()
watch(question, (newVal, oldVal) => {
  // Chạy khi question thay đổi
  // Có cả old và new value
})

watchEffect(() => {
  // Tự track dependency — không cần khai báo
  console.log(searchQuery.value) // auto-tracked!
})

// watch: explicit source, có old/new
// watchEffect: auto-track, chạy ngay lần đầu`
</script>

<template>
  <div>
    <h2 class="text-lg font-semibold mb-3">Watchers / useEffect</h2>

    <div class="border border-slate-200 rounded-lg p-4 mb-4 space-y-4">
      <div>
        <p class="text-sm font-medium text-slate-700 mb-2">
          Question watcher (watch)
        </p>
        <input
          v-model="question"
          placeholder="Hỏi gì đó kết thúc bằng ?"
          class="border border-slate-300 rounded px-2 py-1 text-sm w-full mb-2"
        />
        <div class="text-sm text-slate-600 bg-slate-50 rounded p-2">
          Trả lời: <span class="font-medium">{{ answer }}</span>
        </div>
      </div>

      <div>
        <p class="text-sm font-medium text-slate-700 mb-2">
          Search (watchEffect)
        </p>
        <input
          v-model="searchQuery"
          placeholder="Gõ để trigger watchEffect..."
          class="border border-slate-300 rounded px-2 py-1 text-sm w-full"
        />
      </div>

      <div>
        <div class="flex items-center justify-between mb-1">
          <p class="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Watcher log
          </p>
          <button
            @click="clearLogs"
            class="px-2 py-0.5 bg-slate-200 text-slate-600 rounded text-xs hover:bg-slate-300"
          >
            Xóa
          </button>
        </div>
        <div
          class="bg-slate-900 text-green-400 font-mono text-xs p-3 rounded max-h-40 overflow-y-auto"
        >
          <div v-if="logs.length === 0" class="text-slate-500">
            Chưa có event nào...
          </div>
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
      <pre
        v-if="showCode"
        class="mt-2 bg-slate-900 text-slate-100 text-xs p-4 rounded overflow-x-auto"
      >
        <code>{{ DEMO_CODE }}</code>
      </pre>
    </div>

    <div class="p-4 bg-slate-50 rounded">
      <h3 class="text-sm font-semibold mb-2">So sánh</h3>
      <div class="text-sm text-slate-600 space-y-2">
        <p>
          <strong>watch() = explicit, watchEffect() = auto-track.</strong>
          <code class="bg-slate-200 px-1 rounded">watch(source, callback)</code>
          theo dõi 1 hoặc nhiều ref cụ thể, có cả old/new value.
          <code class="bg-slate-200 px-1 rounded">watchEffect(fn)</code> tự
          detect mọi reactive value truy cập bên trong — không cần khai báo.
        </p>
        <p>
          <strong>watchEffect chạy ngay lần đầu.</strong> watch mặc định chỉ
          chạy khi value thay đổi (trừ khi set
          <code class="bg-slate-200 px-1 rounded">immediate: true</code>).
          React's useEffect luôn chạy sau render đầu tiên (giống watchEffect
          hơn).
        </p>
        <p>
          <strong>Auto cleanup khi unmount.</strong> Cả watch và watchEffect tự
          dọn khi component unmount. React phải return cleanup function thủ công
          từ useEffect.
        </p>
      </div>
    </div>
  </div>
</template>

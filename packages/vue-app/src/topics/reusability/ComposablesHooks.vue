<script setup lang="ts">
import { ref } from 'vue'

// Composable — reusable stateful logic
function useCounter(initial = 0) {
  const count = ref(initial)
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => (count.value = initial)
  return { count, increment, decrement, reset }
}

const counterA = useCounter(0)
const counterB = useCounter(10)
const showCode = ref(false)

const DEMO_CODE = `// Composable — reusable stateful logic
function useCounter(initial = 0) {
  const count = ref(initial)
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initial
  return { count, increment, decrement, reset }
}

// Usage — reuse in multiple components
const counterA = useCounter(0)
const counterB = useCounter(10) // different initial

// Both have independent state
counterA.increment() // counterA.count = 1
counterB.increment() // counterB.count = 11`
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">Composables</h2>

      <div class="mb-4">
        <p class="text-sm font-medium mb-2">Counter A (starts at 0)</p>
        <div class="flex items-center gap-3">
          <button
            @click="counterA.decrement"
            class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            -
          </button>
          <span class="text-2xl font-bold">{{ counterA.count }}</span>
          <button
            @click="counterA.increment"
            class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            +
          </button>
          <button
            @click="counterA.reset"
            class="px-3 py-1 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 text-sm"
          >
            Reset
          </button>
        </div>
      </div>

      <div class="mb-2">
        <p class="text-sm font-medium mb-2">Counter B (starts at 10)</p>
        <div class="flex items-center gap-3">
          <button
            @click="counterB.decrement"
            class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            -
          </button>
          <span class="text-2xl font-bold">{{ counterB.count }}</span>
          <button
            @click="counterB.increment"
            class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            +
          </button>
          <button
            @click="counterB.reset"
            class="px-3 py-1 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 text-sm"
          >
            Reset
          </button>
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

    <div class="p-4 bg-slate-50 rounded">
      <h3 class="text-sm font-semibold mb-2">So sánh</h3>
      <div class="text-sm text-slate-600 space-y-2">
        <p>
          <strong>Vue composables = React custom hooks.</strong> Cả hai đều là
          functions bắt đầu bằng
          <code class="bg-slate-200 px-1 rounded">use</code> — extract stateful
          logic để tái sử dụng. Vue composable dùng
          <code class="bg-slate-200 px-1 rounded">ref()</code>, React hook dùng
          <code class="bg-slate-200 px-1 rounded">useState()</code>.
        </p>
        <p>
          <strong>Naming convention giống nhau.</strong> Cả Vue và React đều
          dùng prefix <code class="bg-slate-200 px-1 rounded">use</code>
          (useCounter, useFetch, useLocalStorage). Đây là best practice trong
          Vue và bắt buộc trong React (rules of hooks).
        </p>
        <p>
          <strong>Isolation.</strong> Mỗi lần gọi composable/hook tạo ra một
          instance state độc lập — counterA và counterB ở trên có state riêng dù
          cùng dùng <code class="bg-slate-200 px-1 rounded">useCounter</code>.
        </p>
      </div>
    </div>
  </div>
</template>

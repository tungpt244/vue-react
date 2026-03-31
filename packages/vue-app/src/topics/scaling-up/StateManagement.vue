<script setup lang="ts">
import { ref, computed } from 'vue'

// Simulated Pinia-like store using Vue primitives
const count = ref(0)
const double = computed(() => count.value * 2)

const showCode = ref(false)

function increment() {
  count.value++
}

function decrement() {
  count.value--
}

function reset() {
  count.value = 0
}

const DEMO_CODE = `// Pinia store definition
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const double = computed(() => count.value * 2)

  function increment() { count.value++ }
  function decrement() { count.value-- }
  function reset() { count.value = 0 }

  return { count, double, increment, decrement, reset }
})

// In component:
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()

// Template:
// <p>Count: {{ counter.count }}</p>
// <p>Double: {{ counter.double }}</p>
// <button @click="counter.increment()">+</button>

// main.ts setup:
import { createPinia } from 'pinia'
app.use(createPinia())`
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">State Management — Pinia</h2>

      <p class="text-sm text-slate-500 mb-3">
        Simulated Pinia store — dùng
        <code class="bg-slate-200 px-1 rounded">ref()</code> +
        <code class="bg-slate-200 px-1 rounded">computed()</code> như API thực
        của Pinia
      </p>

      <div class="p-3 bg-purple-50 border border-purple-200 rounded mb-4">
        <div class="flex items-center gap-4 mb-2">
          <span class="text-sm text-purple-700">
            count: <strong>{{ count }}</strong>
          </span>
          <span class="text-sm text-purple-700">
            double: <strong>{{ double }}</strong>
          </span>
        </div>
        <div class="flex gap-2">
          <button
            @click="decrement"
            class="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
          >
            −
          </button>
          <button
            @click="increment"
            class="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
          >
            +
          </button>
          <button
            @click="reset"
            class="px-3 py-1 bg-slate-300 text-slate-700 rounded text-sm hover:bg-slate-400"
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
          <strong>Pinia</strong> là official Vue state management.
          <code class="bg-slate-200 px-1 rounded">defineStore()</code> trả về
          composable-like API với
          <code class="bg-slate-200 px-1 rounded">state</code>,
          <code class="bg-slate-200 px-1 rounded">getters</code>,
          <code class="bg-slate-200 px-1 rounded">actions</code>. Setup store là
          plain <code class="bg-slate-200 px-1 rounded">ref()</code> và
          <code class="bg-slate-200 px-1 rounded">computed()</code> — quen thuộc
          với Composition API.
        </p>
        <p>
          <strong>Zustand (React)</strong> dùng
          <code class="bg-slate-200 px-1 rounded">create()</code> trả về một
          hook — gọi
          <code class="bg-slate-200 px-1 rounded">useStore()</code> trong bất kỳ
          component nào. Không cần Provider wrapper. Tương tự Pinia về độ đơn
          giản.
        </p>
        <p>
          <strong>Điểm khác biệt:</strong> Vuex đã deprecated, thay bằng Pinia.
          Redux Toolkit vẫn phổ biến trong React enterprise nhưng nặng hơn
          Zustand. Cả Pinia lẫn Zustand đều không cần Provider — đây là lợi thế
          lớn so với Context API.
        </p>
      </div>
    </div>
  </div>
</template>

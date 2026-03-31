<script setup lang="ts">
import { ref, defineComponent, defineAsyncComponent, h } from 'vue'

const show = ref(false)
const loadCount = ref(0)
const showCode = ref(false)

// Define the "heavy" component
const HeavyDashboard = defineComponent({
  setup() {
    return () =>
      h('div', { class: 'p-4 bg-green-50 border border-green-200 rounded' }, [
        h(
          'h3',
          { class: 'text-sm font-semibold text-green-800 mb-2' },
          'Dashboard loaded!',
        ),
        h(
          'p',
          { class: 'text-sm text-green-700' },
          'Component nặng đã được lazy load thành công. Trong production, đây sẽ là một dynamic import() thật sự từ file riêng.',
        ),
      ])
  },
})

// Async component with simulated delay
const AsyncDashboard = defineAsyncComponent(
  () =>
    new Promise<{ default: typeof HeavyDashboard }>((resolve) =>
      setTimeout(() => resolve({ default: HeavyDashboard }), 1000),
    ),
)

function handleLoad() {
  show.value = false
  loadCount.value++
  setTimeout(() => {
    show.value = true
  }, 50)
}

const DEMO_CODE = `// Vue — defineAsyncComponent for lazy loading
import { defineAsyncComponent } from 'vue'

// Wrap dynamic import (normally from a file):
const AsyncComp = defineAsyncComponent(
  () => import('./HeavyComponent.vue')
)

// With options (more control than React.lazy):
const AsyncComp = defineAsyncComponent({
  loader: () => import('./HeavyComponent.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorDisplay,
  delay: 200,  // delay before showing loading
  timeout: 3000,
})

// Usage with Suspense:
// <Suspense>
//   <AsyncComp />
//   <template #fallback>Loading...</template>
// </Suspense>

// React equivalent:
// const LazyComp = React.lazy(() => import('./HeavyComponent'))
// <Suspense fallback={<Loading />}><LazyComp /></Suspense>`
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">Async Components</h2>

      <div class="space-y-3">
        <button
          @click="handleLoad"
          class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Load Heavy Component (1s delay)
        </button>

        <Suspense v-if="show">
          <template #default>
            <AsyncDashboard />
          </template>
          <template #fallback>
            <div
              class="p-3 bg-slate-100 rounded text-sm text-slate-500 animate-pulse"
            >
              Loading component... (simulated 1s delay)
            </div>
          </template>
        </Suspense>

        <p v-if="loadCount > 0 && !show" class="text-xs text-slate-500">
          Đã load {{ loadCount }} lần. Click lại để xem loading state.
        </p>

        <p class="text-xs text-slate-500">
          <code class="bg-slate-200 px-1 rounded">defineAsyncComponent()</code>
          +
          <code class="bg-slate-200 px-1 rounded">&lt;Suspense&gt;</code> —
          loading fallback hiển thị trong khi component đang tải
        </p>
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
          <strong>Vue: defineAsyncComponent().</strong> Import from 'vue'. Nhiều
          options: loadingComponent, errorComponent, delay, timeout. Linh hoạt
          hơn React.lazy.
        </p>
        <p>
          <strong>React: React.lazy() + Suspense.</strong> Đơn giản hơn — chỉ
          wrap dynamic import. Không có built-in error/loading component config
          — phải tự xử lý.
        </p>
        <p>
          <strong>Cả hai cần Suspense để handle loading state.</strong> Vue's
          <code class="bg-slate-200 px-1 rounded">&lt;Suspense&gt;</code> dùng
          slot #fallback, React dùng prop
          <code class="bg-slate-200 px-1 rounded">fallback</code> — tương đương.
        </p>
      </div>
    </div>
  </div>
</template>

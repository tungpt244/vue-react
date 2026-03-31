<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import { defineComponent, h } from 'vue'

const showAsync = ref(false)
const loadKey = ref(0)
const showCode = ref(false)

// HeavyComponent — simulated async content
const HeavyComponent = defineComponent({
  name: 'HeavyContent',
  setup() {
    return () =>
      h(
        'div',
        {
          class:
            'p-3 bg-green-50 border border-green-200 rounded text-green-800 text-sm',
        },
        'Async component loaded successfully! (simulated 1.5s delay)',
      )
  },
})

// defineAsyncComponent with simulated delay
const AsyncContent = defineAsyncComponent(
  () =>
    new Promise<typeof HeavyComponent>((resolve) =>
      setTimeout(() => resolve(HeavyComponent), 1500),
    ),
)

const load = () => {
  showAsync.value = true
}

const reload = () => {
  showAsync.value = false
  setTimeout(() => {
    loadKey.value++
    showAsync.value = true
  }, 50)
}

const DEMO_CODE = `import { defineAsyncComponent } from 'vue'

// defineAsyncComponent with simulated delay
const AsyncContent = defineAsyncComponent(
  () => new Promise(resolve =>
    setTimeout(() => resolve(HeavyComponent), 1500)
  )
)

// In template:
// <Suspense>
//   <template #default>
//     <AsyncContent v-if="show" />
//   </template>
//   <template #fallback>
//     <div>Loading...</div>
//   </template>
// </Suspense>

// Vue Suspense also works with async setup():
// async setup() {
//   const data = await fetch('/api/data')  // triggers Suspense
//   return { data }
// }`
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">Suspense</h2>

      <div class="flex gap-2 mb-4">
        <button
          v-if="!showAsync"
          @click="load"
          class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Load Async Component
        </button>
        <button
          v-else
          @click="reload"
          class="px-3 py-1 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 text-sm"
        >
          Reload (see fallback again)
        </button>
      </div>

      <Suspense v-if="showAsync" :key="loadKey">
        <template #default>
          <AsyncContent />
        </template>
        <template #fallback>
          <div class="p-3 bg-slate-100 rounded text-slate-500 text-sm">
            Loading... (1.5s simulated delay)
          </div>
        </template>
      </Suspense>
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
          <strong>Cả Vue và React đều có &lt;Suspense&gt;.</strong> Hiển thị
          fallback content trong khi async operation đang load. Cả hai đều
          support fallback content — Vue dùng
          <code class="bg-slate-200 px-1 rounded">#fallback</code> slot, React
          dùng <code class="bg-slate-200 px-1 rounded">fallback</code> prop.
        </p>
        <p>
          <strong>Vue Suspense linh hoạt hơn.</strong> Hoạt động với async
          <code class="bg-slate-200 px-1 rounded">setup()</code> — bất kỳ
          component nào có async setup đều tự động trigger Suspense. Không cần
          wrap riêng như React.lazy(). Vue Suspense cũng handle
          <code class="bg-slate-200 px-1 rounded">await</code> trong setup()
          trực tiếp.
        </p>
        <p>
          <strong>React Suspense dùng với React.lazy().</strong> Chủ yếu cho
          code splitting — lazy load component khi cần. React 18+ cũng support
          data fetching với Suspense (qua libraries như React Query, SWR).
        </p>
      </div>
    </div>
  </div>
</template>

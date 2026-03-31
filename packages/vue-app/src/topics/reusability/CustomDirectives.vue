<script setup lang="ts">
import { ref } from 'vue'

// Vue 3 local directive — v-focus
const vFocus = {
  mounted: (el: HTMLElement) => el.focus(),
}

const showInput = ref(true)
const showCode = ref(false)

const DEMO_CODE = `// Vue 3: local directive in <script setup>
const vFocus = {
  mounted: (el: HTMLElement) => el.focus()
}

// Use directly in template as v-focus
// <input v-focus placeholder="Auto-focused!" />

// Global registration (in main.ts):
// app.directive('focus', {
//   mounted(el) { el.focus() }
// })
// Then use anywhere: <input v-focus />`
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">Custom Directives</h2>

      <div class="mb-4">
        <p class="text-sm font-medium mb-2">v-focus directive demo</p>
        <p class="text-xs text-slate-500 mb-3">
          Toggle input off/on — it re-mounts and auto-focuses via
          <code class="bg-slate-200 px-1 rounded">v-focus</code>
        </p>
        <button
          @click="showInput = !showInput"
          class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm mb-3"
        >
          {{ showInput ? 'Hide Input' : 'Show Input' }}
        </button>
        <div v-if="showInput">
          <input
            v-focus
            placeholder="Auto-focused on mount!"
            class="border border-green-400 rounded px-2 py-1 text-sm w-full"
          />
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
          <strong>Vue custom directives gắn behavior vào DOM element.</strong>
          <code class="bg-slate-200 px-1 rounded">v-focus</code>,
          <code class="bg-slate-200 px-1 rounded">v-tooltip</code>,
          <code class="bg-slate-200 px-1 rounded">v-click-outside</code> — dùng
          trực tiếp trong template như attribute HTML. Rất tiện và declarative.
        </p>
        <p>
          <strong>React không có directive system.</strong> Thay vào đó dùng
          custom hook + <code class="bg-slate-200 px-1 rounded">useRef</code> để
          access DOM, kết hợp
          <code class="bg-slate-200 px-1 rounded">useEffect</code> để chạy side
          effects khi mount/unmount. Verbose hơn nhưng explicit hơn.
        </p>
        <p>
          <strong>Vue directives là Vue-only syntactic sugar</strong> để
          manipulate DOM trong template. Có lifecycle hooks:
          <code class="bg-slate-200 px-1 rounded">mounted</code>,
          <code class="bg-slate-200 px-1 rounded">updated</code>,
          <code class="bg-slate-200 px-1 rounded">unmounted</code> — đầy đủ như
          component lifecycle.
        </p>
      </div>
    </div>
  </div>
</template>

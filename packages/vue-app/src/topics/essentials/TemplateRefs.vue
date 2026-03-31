<script setup lang="ts">
import { ref } from 'vue'

const inputRef = ref<HTMLInputElement>()
const value = ref('')
const focused = ref(false)
const showCode = ref(false)

const DEMO_CODE = `// Vue — Template Refs

// 1. Khai báo ref trong script
const inputRef = ref<HTMLInputElement>()

// 2. Gắn vào element bằng ref attribute
<input ref="inputRef" v-model="value" />

// 3. Truy cập DOM element
const focusInput = () => {
  inputRef.value?.focus()
}

// Khác với useRef: Vue template ref LÀ ref() reactive
// Thay đổi .value trigger update nếu dùng trong template

// React equivalent:
// const inputRef = useRef<HTMLInputElement>(null)
// <input ref={inputRef} />
// inputRef.current?.focus()`

const handleFocus = () => {
  inputRef.value?.focus()
}

const handleSelect = () => {
  inputRef.value?.select()
}
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">Template Refs</h2>

      <div class="mb-4">
        <p class="text-sm font-medium mb-2">Programmatic DOM access</p>
        <div class="flex gap-2 mb-3">
          <input
            ref="inputRef"
            v-model="value"
            @focus="focused = true"
            @blur="focused = false"
            placeholder="Input này được control bằng ref..."
            class="border border-slate-300 rounded px-2 py-1 text-sm flex-1"
          />
        </div>
        <div class="flex gap-2">
          <button
            @click="handleFocus"
            class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Focus
          </button>
          <button
            @click="handleSelect"
            class="px-3 py-1 bg-slate-500 text-white rounded hover:bg-slate-600 text-sm"
          >
            Select All
          </button>
        </div>
        <p class="text-xs text-slate-400 mt-2">
          Trạng thái: {{ focused ? 'focused' : 'blurred' }} — value: "{{
            value
          }}"
        </p>
      </div>

      <div class="bg-slate-50 rounded p-3 text-sm text-slate-500">
        <p>
          <code class="bg-slate-200 px-1 rounded">inputRef.value</code> chứa
          reference đến DOM element thực. Dùng để gọi
          <code class="bg-slate-200 px-1 rounded">.focus()</code>,
          <code class="bg-slate-200 px-1 rounded">.blur()</code>,
          <code class="bg-slate-200 px-1 rounded">.scrollIntoView()</code>, etc.
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
          <strong>Syntax khác nhau.</strong> Vue:
          <code class="bg-slate-200 px-1 rounded">ref="inputRef"</code> trong
          template +
          <code class="bg-slate-200 px-1 rounded"
            >const inputRef = ref&lt;HTMLInputElement&gt;()</code
          >. React:
          <code class="bg-slate-200 px-1 rounded">ref={inputRef}</code> JSX prop
          +
          <code class="bg-slate-200 px-1 rounded"
            >useRef&lt;HTMLInputElement&gt;(null)</code
          >.
        </p>
        <p>
          <strong>Vue refs là reactive, React refs không.</strong> Vue template
          ref là <code class="bg-slate-200 px-1 rounded">ref()</code> — thay đổi
          <code class="bg-slate-200 px-1 rounded">.value</code> có thể trigger
          update. React <code class="bg-slate-200 px-1 rounded">useRef</code> là
          mutable object — thay đổi
          <code class="bg-slate-200 px-1 rounded">.current</code> không trigger
          re-render.
        </p>
        <p>
          <strong>Access pattern.</strong> Vue:
          <code class="bg-slate-200 px-1 rounded">inputRef.value?.focus()</code>
          (vì ref() wraps). React:
          <code class="bg-slate-200 px-1 rounded"
            >inputRef.current?.focus()</code
          >
          (truy cập qua .current). Cả hai đều cần optional chaining vì element
          có thể chưa mount.
        </p>
      </div>
    </div>
  </div>
</template>

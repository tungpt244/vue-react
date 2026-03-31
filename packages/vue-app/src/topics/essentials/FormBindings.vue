<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const framework = ref('vue')
const agree = ref(false)
const showCode = ref(false)

const DEMO_CODE = `// Vue — Form Bindings với v-model

// Text input — two-way binding tự động
const name = ref('')
<input v-model="name" placeholder="Nhập tên..." />

// Select dropdown
const framework = ref('vue')
<select v-model="framework">
  <option value="vue">Vue</option>
  <option value="react">React</option>
</select>

// Checkbox
const agree = ref(false)
<input type="checkbox" v-model="agree" />

// React equivalent: phải viết value + onChange thủ công
// <input value={name} onChange={e => setName(e.target.value)} />`
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">Form Bindings</h2>

      <div class="space-y-4">
        <div>
          <label class="text-sm font-medium block mb-1">Text input</label>
          <input
            v-model="name"
            placeholder="Nhập tên..."
            class="border border-slate-300 rounded px-2 py-1 text-sm w-full"
          />
        </div>

        <div>
          <label class="text-sm font-medium block mb-1">Select dropdown</label>
          <select
            v-model="framework"
            class="border border-slate-300 rounded px-2 py-1 text-sm w-full"
          >
            <option value="vue">Vue</option>
            <option value="react">React</option>
            <option value="svelte">Svelte</option>
            <option value="angular">Angular</option>
          </select>
        </div>

        <div>
          <label class="flex items-center gap-2 text-sm cursor-pointer">
            <input v-model="agree" type="checkbox" class="rounded" />
            <span class="font-medium">Checkbox</span>
          </label>
        </div>

        <div class="bg-slate-50 rounded p-3 text-sm text-slate-600 space-y-1">
          <p class="text-xs text-slate-400 mb-2">Live preview:</p>
          <p>
            Tên: <strong>{{ name || '(chưa nhập)' }}</strong>
          </p>
          <p>
            Framework: <strong>{{ framework }}</strong>
          </p>
          <p>
            Đồng ý: <strong>{{ agree ? 'Có' : 'Chưa' }}</strong>
          </p>
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
          <strong>v-model là two-way binding sugar.</strong> Vue
          <code class="bg-slate-200 px-1 rounded">v-model</code> tự động bind
          <code class="bg-slate-200 px-1 rounded">:value</code> +
          <code class="bg-slate-200 px-1 rounded">@input</code>. React yêu cầu
          viết <code class="bg-slate-200 px-1 rounded">value</code> +
          <code class="bg-slate-200 px-1 rounded">onChange</code> thủ công cho
          mỗi input (controlled component).
        </p>
        <p>
          <strong>Checkbox tự động.</strong> Vue
          <code class="bg-slate-200 px-1 rounded">v-model</code> trên checkbox
          tự bind boolean. React phải dùng
          <code class="bg-slate-200 px-1 rounded">checked</code> +
          <code class="bg-slate-200 px-1 rounded">e.target.checked</code>.
        </p>
        <p>
          <strong>v-model modifiers.</strong> Vue có thêm
          <code class="bg-slate-200 px-1 rounded">v-model.trim</code>,
          <code class="bg-slate-200 px-1 rounded">v-model.number</code>,
          <code class="bg-slate-200 px-1 rounded">v-model.lazy</code>. React
          không có tương đương — phải xử lý trong onChange handler.
        </p>
      </div>
    </div>
  </div>
</template>

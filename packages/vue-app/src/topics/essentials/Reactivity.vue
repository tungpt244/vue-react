<script setup lang="ts">
import { ref, reactive } from 'vue'

const count = ref(0)
const user = reactive({ name: '', email: '' })
const showCode = ref(false)

const DEMO_CODE = `// Vue — ref() + reactive()
const count = ref(0)
const user = reactive({ name: '', email: '' })

// ref: primitive, truy cập qua .value trong script
count.value++          // ✓ trigger re-render
// template auto-unwrap: {{ count }} (không cần .value)

// reactive: object, mutation trực tiếp
user.name = 'Tùng'    // ✓ tự track property

// v-model: two-way binding
<input v-model="user.name" />
// = :value="user.name" @input="user.name = $event.target.value"`
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">Reactivity</h2>

      <div class="mb-4">
        <p class="text-sm font-medium mb-2">Counter</p>
        <div class="flex items-center gap-3">
          <button
            @click="count--"
            class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            -
          </button>
          <span class="text-2xl font-bold">{{ count }}</span>
          <button
            @click="count++"
            class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            +
          </button>
        </div>
      </div>

      <div class="space-y-2">
        <p class="text-sm font-medium">Live Form</p>
        <input
          v-model="user.name"
          placeholder="Nhập tên..."
          class="border border-slate-300 rounded px-2 py-1 text-sm w-full"
        />
        <input
          v-model="user.email"
          placeholder="Nhập email..."
          class="border border-slate-300 rounded px-2 py-1 text-sm w-full"
        />
        <p class="text-sm text-slate-600">
          Hello, <strong>{{ user.name || '(chưa nhập)' }}</strong>
          <span v-if="user.email"> — {{ user.email }}</span>
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
      <pre v-if="showCode" class="mt-2 bg-slate-900 text-slate-100 text-xs p-3 rounded overflow-x-auto">
        <code>{{ DEMO_CODE }}</code>
      </pre>
    </div>

    <div class="p-4 bg-slate-50 rounded">
      <h3 class="text-sm font-semibold mb-2">So sánh</h3>
      <div class="text-sm text-slate-600 space-y-2">
        <p>
          <strong>ref() cho primitive, reactive() cho object.</strong> Vue dùng Proxy-based
          reactivity — tự động track dependency khi truy cập property. Trong script dùng
          <code class="bg-slate-200 px-1 rounded">.value</code>, trong template thì auto-unwrap.
        </p>
        <p>
          <strong>Mutation trực tiếp.</strong> Khác React (immutable state), Vue cho phép mutate
          trực tiếp: <code class="bg-slate-200 px-1 rounded">count.value++</code>,
          <code class="bg-slate-200 px-1 rounded">user.name = 'abc'</code>. Vue tự detect thay
          đổi và chỉ re-render phần template bị ảnh hưởng (không re-render toàn component).
        </p>
        <p>
          <strong>v-model = two-way binding.</strong> Syntactic sugar cho
          <code class="bg-slate-200 px-1 rounded">:value</code> +
          <code class="bg-slate-200 px-1 rounded">@input</code>. React không có tương đương —
          phải viết <code class="bg-slate-200 px-1 rounded">value</code> +
          <code class="bg-slate-200 px-1 rounded">onChange</code> thủ công (controlled component).
        </p>
      </div>
    </div>
  </div>
</template>

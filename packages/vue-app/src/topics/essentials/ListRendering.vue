<script setup lang="ts">
import { ref } from 'vue'

interface Item {
  id: number
  text: string
}

const items = ref<Item[]>([
  { id: 1, text: 'Learn Vue' },
  { id: 2, text: 'Learn React' },
])
const newItem = ref('')
const nextId = ref(3)
const showCode = ref(false)

const DEMO_CODE = `// Vue — List Rendering với v-for

const items = ref([
  { id: 1, text: 'Learn Vue' },
  { id: 2, text: 'Learn React' },
])

// Render list — :key là bắt buộc
<li v-for="item in items" :key="item.id">
  {{ item.text }}
  <button @click="removeItem(item.id)">✕</button>
</li>

// Thêm item — mutation trực tiếp OK với Vue
const addItem = () => {
  items.value.push({ id: nextId.value++, text: newItem.value })
  newItem.value = ''
}

// Xoá item
const removeItem = (id: number) => {
  const idx = items.value.findIndex(i => i.id === id)
  items.value.splice(idx, 1)
}`

const addItem = () => {
  if (!newItem.value.trim()) return
  items.value.push({ id: nextId.value++, text: newItem.value.trim() })
  newItem.value = ''
}

const removeItem = (id: number) => {
  const idx = items.value.findIndex((i) => i.id === id)
  if (idx !== -1) items.value.splice(idx, 1)
}
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">List Rendering</h2>

      <div class="flex gap-2 mb-3">
        <input
          v-model="newItem"
          @keydown.enter="addItem"
          placeholder="Nhập item mới..."
          class="border border-slate-300 rounded px-2 py-1 text-sm flex-1"
        />
        <button
          @click="addItem"
          class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Thêm
        </button>
      </div>

      <p v-if="items.length === 0" class="text-sm text-slate-400 italic">
        Danh sách trống
      </p>
      <ul v-else class="space-y-2">
        <li
          v-for="item in items"
          :key="item.id"
          class="flex items-center justify-between bg-slate-50 px-3 py-2 rounded text-sm"
        >
          <span>
            <span class="text-slate-400 mr-2">#{{ item.id }}</span>
            {{ item.text }}
          </span>
          <button
            @click="removeItem(item.id)"
            class="text-red-400 hover:text-red-600 text-xs px-2 py-0.5 rounded hover:bg-red-50"
          >
            ✕
          </button>
        </li>
      </ul>
      <p class="text-xs text-slate-400 mt-2">{{ items.length }} item(s)</p>
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
          <strong>v-for vs .map().</strong> Vue dùng
          <code class="bg-slate-200 px-1 rounded"
            >v-for="item in items" :key="item.id"</code
          >
          directive. React dùng
          <code class="bg-slate-200 px-1 rounded">items.map(item => ...)</code>
          — JS thuần, không phải magic.
        </p>
        <p>
          <strong>key prop là bắt buộc.</strong> Cả Vue và React đều cần
          <code class="bg-slate-200 px-1 rounded">:key</code> (Vue) /
          <code class="bg-slate-200 px-1 rounded">key</code> (React) duy nhất để
          diff DOM hiệu quả. Dùng ID thay vì index.
        </p>
        <p>
          <strong>Mutable vs immutable update.</strong> Vue với
          <code class="bg-slate-200 px-1 rounded">ref([])</code> có thể dùng
          <code class="bg-slate-200 px-1 rounded">.push()</code> và
          <code class="bg-slate-200 px-1 rounded">.splice()</code> trực tiếp.
          React cần spread/filter để tạo array mới —
          <code class="bg-slate-200 px-1 rounded">[...prev, item]</code>.
        </p>
      </div>
    </div>
  </div>
</template>

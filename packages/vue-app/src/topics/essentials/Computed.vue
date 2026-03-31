<script setup lang="ts">
import { ref, computed } from 'vue'

interface Item {
  name: string
  price: number
}

const items = ref<Item[]>([
  { name: 'Apple', price: 1.5 },
  { name: 'Bread', price: 3.0 },
])
const newName = ref('')
const newPrice = ref(0)
const showCode = ref(false)

const total = computed(() => items.value.reduce((sum, i) => sum + i.price, 0))
const itemCount = computed(() => items.value.length)
const mostExpensive = computed(() =>
  items.value.length
    ? items.value.reduce((max, i) => (i.price > max.price ? i : max)).name
    : 'None',
)

function addItem() {
  if (!newName.value.trim()) return
  items.value.push({ name: newName.value.trim(), price: newPrice.value })
  newName.value = ''
  newPrice.value = 0
}

const DEMO_CODE = `// Vue — computed()
const total = computed(
  () => items.value.reduce((sum, i) => sum + i.price, 0)
)
// Tự động track dependency — không cần khai báo
// Chỉ recalculate khi items thay đổi (cached)

// Writable computed (React không có)
const fullName = computed({
  get: () => first.value + ' ' + last.value,
  set: (val) => { /* parse và set */ }
})`
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">Computed / useMemo</h2>

      <div class="flex gap-2 mb-3">
        <input
          v-model="newName"
          placeholder="Tên item..."
          class="border border-slate-300 rounded px-2 py-1 text-sm flex-1"
        />
        <input
          v-model.number="newPrice"
          type="number"
          placeholder="Giá"
          min="0"
          step="0.5"
          class="border border-slate-300 rounded px-2 py-1 text-sm w-24"
        />
        <button
          @click="addItem"
          class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Thêm
        </button>
      </div>

      <ul class="mb-3 space-y-1">
        <li
          v-for="item in items"
          :key="item.name"
          class="flex justify-between text-sm text-slate-700 bg-slate-50 px-2 py-1 rounded"
        >
          <span>{{ item.name }}</span>
          <span class="font-medium">${{ item.price.toFixed(2) }}</span>
        </li>
      </ul>

      <div class="bg-blue-50 rounded p-3 space-y-1">
        <p class="text-sm">
          <span class="text-slate-500">Tổng:</span>
          <strong class="ml-2">${{ total.toFixed(2) }}</strong>
        </p>
        <p class="text-sm">
          <span class="text-slate-500">Số lượng:</span>
          <strong class="ml-2">{{ itemCount }}</strong>
        </p>
        <p class="text-sm">
          <span class="text-slate-500">Đắt nhất:</span>
          <strong class="ml-2">{{ mostExpensive }}</strong>
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
      >
        <code>{{ DEMO_CODE }}</code>
      </pre>
    </div>

    <div class="p-4 bg-slate-50 rounded">
      <h3 class="text-sm font-semibold mb-2">So sánh</h3>
      <div class="text-sm text-slate-600 space-y-2">
        <p>
          <strong>computed() tự track dependency.</strong> Vue dùng Proxy để
          biết function đọc những reactive value nào — không cần khai báo
          dependency array. Kết quả được cache và chỉ recalculate khi dependency
          thực sự thay đổi.
        </p>
        <p>
          <strong>computed là bắt buộc cho derived state.</strong> Khác React
          (useMemo chỉ là optimization), Vue's computed là cách chính thức để
          tạo derived reactive value. Nếu tính trực tiếp trong template → chạy
          lại mỗi render, không cache.
        </p>
        <p>
          <strong>Writable computed.</strong> Vue hỗ trợ
          <code class="bg-slate-200 px-1 rounded">computed({ get, set })</code>
          — cho phép gán ngược (ví dụ: fullName parsed thành firstName +
          lastName). React không có tương đương.
        </p>
      </div>
    </div>
  </div>
</template>

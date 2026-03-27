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

const total = computed(() => items.value.reduce((sum, i) => sum + i.price, 0))
const itemCount = computed(() => items.value.length)
const mostExpensive = computed(() =>
  items.value.length
    ? items.value.reduce((max, i) => (i.price > max.price ? i : max)).name
    : 'None'
)

function addItem() {
  if (!newName.value.trim()) return
  items.value.push({ name: newName.value.trim(), price: newPrice.value })
  newName.value = ''
  newPrice.value = 0
}
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">Computed / useMemo</h2>

      <!-- Add item form -->
      <div class="flex gap-2 mb-3">
        <input
          v-model="newName"
          placeholder="Item name..."
          class="border border-slate-300 rounded px-2 py-1 text-sm flex-1"
        />
        <input
          v-model.number="newPrice"
          type="number"
          placeholder="Price"
          min="0"
          step="0.5"
          class="border border-slate-300 rounded px-2 py-1 text-sm w-24"
        />
        <button
          @click="addItem"
          class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Add
        </button>
      </div>

      <!-- Item list -->
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

      <!-- Summary box (computed values) -->
      <div class="bg-blue-50 rounded p-3 space-y-1">
        <p class="text-sm">
          <span class="text-slate-500">Total:</span>
          <strong class="ml-2">${{ total.toFixed(2) }}</strong>
        </p>
        <p class="text-sm">
          <span class="text-slate-500">Items:</span>
          <strong class="ml-2">{{ itemCount }}</strong>
        </p>
        <p class="text-sm">
          <span class="text-slate-500">Most Expensive:</span>
          <strong class="ml-2">{{ mostExpensive }}</strong>
        </p>
      </div>
    </div>

    <div class="mt-6 p-4 bg-slate-50 rounded">
      <h3 class="text-sm font-semibold mb-2">Key Differences</h3>
      <p class="text-sm text-slate-600 mb-2">
        <code class="bg-slate-200 px-1 rounded">computed()</code> tạo ra một derived value được
        cache. Vue tự động track reactive dependency — chỉ recalculate khi dependency thay đổi.
        Gọi nhiều lần mà dependency không đổi sẽ trả về cached value, không chạy lại function.
      </p>
      <p class="text-sm text-slate-600">
        Khác với method thông thường (luôn chạy lại khi template re-render),
        <code class="bg-slate-200 px-1 rounded">computed</code> caching hiệu quả hơn với phép tính
        nặng. Vue tự biết phải track dependency nào — không cần khai báo thủ công.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const items = ref(['Item 1', 'Item 2', 'Item 3'])
const counter = ref(4)
const showCode = ref(false)

const addItem = () => {
  items.value.push(`Item ${counter.value++}`)
}

const removeItem = (index: number) => {
  items.value.splice(index, 1)
}

const DEMO_CODE = `<template>
  <TransitionGroup name="list" tag="ul">
    <li v-for="(item, i) in items" :key="item">
      {{ item }}
      <button @click="removeItem(i)">✕</button>
    </li>
  </TransitionGroup>
</template>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
.list-move {
  transition: transform 0.3s ease;
}
</style>`
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">TransitionGroup</h2>

      <div class="flex gap-2 mb-4">
        <button
          @click="addItem"
          class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          + Add Item
        </button>
      </div>

      <TransitionGroup name="list" tag="ul" class="space-y-2">
        <li
          v-for="(item, i) in items"
          :key="item"
          class="flex items-center justify-between px-3 py-2 bg-slate-100 rounded"
        >
          <span class="text-sm">{{ item }}</span>
          <button
            @click="removeItem(i)"
            class="text-slate-400 hover:text-red-500 text-xs px-1"
          >
            ✕
          </button>
        </li>
      </TransitionGroup>

      <p
        v-if="items.length === 0"
        class="text-sm text-slate-400 text-center py-4"
      >
        List is empty
      </p>
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
          <strong
            >Vue's &lt;TransitionGroup&gt; xử lý list enter/leave/move.</strong
          >
          Tự động apply CSS classes khi item được thêm/xóa/di chuyển. Kể cả
          smooth move animation (FLIP) khi reorder — chỉ cần thêm
          <code class="bg-slate-200 px-1 rounded">.list-move</code> class.
        </p>
        <p>
          <strong>React không có &lt;TransitionGroup&gt;.</strong> New items
          hiển thị ngay lập tức. Remove items biến mất ngay — không có leave
          animation mà không có library. Cần react-transition-group hoặc
          framer-motion để có smooth transitions.
        </p>
        <p>
          <strong>Gap lớn nhất là leave animation.</strong> Khi remove item khỏi
          DOM, React không có cơ chế nào giữ element lại để animate — nó biến
          mất ngay. Vue's TransitionGroup handle điều này tự động.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
.list-move {
  transition: transform 0.3s ease;
}
</style>

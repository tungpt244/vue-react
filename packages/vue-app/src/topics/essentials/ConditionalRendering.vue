<script setup lang="ts">
import { ref } from 'vue'

const show = ref(true)
const status = ref<'loading' | 'error' | 'success'>('success')
const showCode = ref(false)

const DEMO_CODE = `// Vue — Conditional Rendering

// 1. v-if / v-else — unmount/mount element
<p v-if="show">Nội dung này hiện khi show = true</p>
<p v-else>Đang ẩn</p>

// 2. v-show — toggle display:none (không unmount)
<p v-show="show">Element vẫn trong DOM</p>

// 3. v-if / v-else-if / v-else chain
<p v-if="status === 'loading'">Đang tải...</p>
<p v-else-if="status === 'error'">Có lỗi!</p>
<p v-else>Thành công!</p>

// React equivalent: &&, ternary, early return`
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">Conditional Rendering</h2>

      <div class="mb-4">
        <p class="text-sm font-medium mb-2">1. v-if / v-else</p>
        <div class="flex items-center gap-3 mb-2">
          <button
            @click="show = !show"
            class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            {{ show ? 'Ẩn' : 'Hiện' }}
          </button>
          <span class="text-sm text-slate-500">show = {{ show }}</span>
        </div>
        <p
          v-if="show"
          class="text-sm text-green-700 bg-green-50 px-3 py-2 rounded"
        >
          Nội dung này hiện khi show = true (dùng v-if)
        </p>
        <p v-else class="text-sm text-slate-500 bg-slate-100 px-3 py-2 rounded">
          Trạng thái: <strong>Đang ẩn</strong> (v-else)
        </p>
      </div>

      <div class="mb-4">
        <p class="text-sm font-medium mb-2">2. v-show (giữ trong DOM)</p>
        <p
          v-show="show"
          class="text-sm text-blue-700 bg-blue-50 px-3 py-2 rounded"
        >
          Element này dùng v-show — vẫn trong DOM khi ẩn (inspect để thấy
          <code>display:none</code>)
        </p>
        <p v-show="!show" class="text-sm text-slate-400 text-xs mt-1">
          (v-show element đang ẩn)
        </p>
      </div>

      <div>
        <p class="text-sm font-medium mb-2">
          3. v-if / v-else-if / v-else chain
        </p>
        <div class="flex gap-2 mb-2">
          <button
            v-for="s in ['loading', 'error', 'success']"
            :key="s"
            @click="status = s as typeof status"
            :class="[
              'px-3 py-1 rounded text-sm',
              status === s
                ? 'bg-blue-500 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
            ]"
          >
            {{ s }}
          </button>
        </div>
        <div class="text-sm px-3 py-2 rounded bg-slate-50">
          <p v-if="status === 'loading'" class="text-yellow-700">Đang tải...</p>
          <p v-else-if="status === 'error'" class="text-red-700">
            Có lỗi xảy ra!
          </p>
          <p v-else class="text-green-700">Thành công!</p>
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
          <strong>Vue dùng directives, React dùng JS expressions.</strong> Vue
          có <code class="bg-slate-200 px-1 rounded">v-if</code>,
          <code class="bg-slate-200 px-1 rounded">v-else</code>,
          <code class="bg-slate-200 px-1 rounded">v-else-if</code> trong
          template. React dùng
          <code class="bg-slate-200 px-1 rounded">&&</code>, ternary, hoặc early
          return trực tiếp trong JSX.
        </p>
        <p>
          <strong>v-if vs v-show.</strong>
          <code class="bg-slate-200 px-1 rounded">v-if</code> unmount/mount
          element — tốt cho content ít thay đổi.
          <code class="bg-slate-200 px-1 rounded">v-show</code> chỉ toggle
          <code class="bg-slate-200 px-1 rounded">display:none</code> — tốt cho
          content thay đổi thường xuyên. React dùng
          <code class="bg-slate-200 px-1 rounded">&&</code> tương đương v-if
          (unmount).
        </p>
        <p>
          <strong>v-else-if chain.</strong> Vue cho phép chain nhiều điều kiện
          trực tiếp trên sibling elements. React dùng nested ternary hoặc switch
          statement.
        </p>
      </div>
    </div>
  </div>
</template>

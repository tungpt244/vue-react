<script setup lang="ts">
import { ref } from 'vue'

const name = ref('Nguyen Van A')
const showDetails = ref(false)
const skills = ref(['Vue', 'TypeScript', 'CSS'])
const showCode = ref(false)

const DEMO_CODE = `<!-- Vue — Template -->
<p>{{ name }}</p>

<!-- Conditional: v-if / v-show -->
<div v-if="showDetails">...</div>

<!-- List: v-for + :key -->
<li v-for="skill in skills" :key="skill">
  {{ skill }}
</li>

<!-- Event: @click (shorthand cho v-on:click) -->
<button @click="showDetails = !showDetails">
  {{ showDetails ? 'Ẩn' : 'Hiện' }}
</button>`
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">Template Syntax</h2>

      <div class="bg-white rounded p-3 border border-slate-100 mb-3">
        <p class="font-medium">{{ name }}</p>

        <button
          @click="showDetails = !showDetails"
          :class="{ 'font-bold': showDetails }"
          class="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          {{ showDetails ? 'Ẩn chi tiết' : 'Hiện chi tiết' }}
        </button>

        <div v-if="showDetails" class="mt-3 text-sm text-slate-600">
          <p>Email: nguyenvana@example.com</p>
          <p class="mt-1">Bio: Lập trình viên frontend yêu Vue.</p>
        </div>
      </div>

      <div>
        <p class="text-sm font-medium mb-1">Skills:</p>
        <ul class="list-disc list-inside text-sm text-slate-700">
          <li v-for="skill in skills" :key="skill">{{ skill }}</li>
        </ul>
      </div>
    </div>

    <!-- Source code -->
    <div class="mb-4">
      <button
        @click="showCode = !showCode"
        class="text-xs text-blue-600 hover:text-blue-800 font-medium"
      >
        {{ showCode ? '▼ Ẩn code' : '▶ Xem code' }}
      </button>
      <pre
        v-if="showCode"
        class="mt-2 bg-slate-900 text-slate-100 text-xs p-3 rounded overflow-x-auto"
      >
        <code>{{ DEMO_CODE }}</code>
      </pre>
    </div>

    <div class="p-4 bg-slate-50 rounded">
      <h3 class="text-sm font-semibold mb-2">So sánh</h3>
      <div class="text-sm text-slate-600 space-y-2">
        <p>
          <strong>Template = HTML mở rộng.</strong> Vue dùng template gần giống
          HTML thuần, thêm directive (<code class="bg-slate-200 px-1 rounded"
            >v-if</code
          >, <code class="bg-slate-200 px-1 rounded">v-for</code>,
          <code class="bg-slate-200 px-1 rounded">v-bind</code>) để xử lý logic.
          Directive được compile thành JavaScript tại build time — không có
          runtime overhead.
        </p>
        <p>
          <strong>Mustache syntax</strong>
          <code class="bg-slate-200 px-1 rounded">{{}}</code> cho text
          interpolation — tự động escape HTML (an toàn XSS). Event dùng
          <code class="bg-slate-200 px-1 rounded">@click</code> (shorthand của
          <code class="bg-slate-200 px-1 rounded">v-on:click</code>) với
          built-in modifiers (<code class="bg-slate-200 px-1 rounded"
            >.prevent</code
          >, <code class="bg-slate-200 px-1 rounded">.stop</code>,
          <code class="bg-slate-200 px-1 rounded">.once</code>).
        </p>
        <p>
          <strong>Dễ đọc hơn cho người quen HTML</strong>, nhưng kém linh hoạt
          hơn JSX khi cần logic phức tạp (multiple conditions, nested maps).
          Trường hợp đó nên dùng render function.
        </p>
      </div>
    </div>
  </div>
</template>

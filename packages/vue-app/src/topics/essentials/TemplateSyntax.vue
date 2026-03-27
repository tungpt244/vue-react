<script setup lang="ts">
import { ref } from 'vue'

const name = ref('Nguyen Van A')
const showDetails = ref(false)
const skills = ref(['Vue', 'TypeScript', 'CSS'])
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
          {{ showDetails ? 'Hide Details' : 'Show Details' }}
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

    <div class="mt-6 p-4 bg-slate-50 rounded">
      <h3 class="text-sm font-semibold mb-2">Key Differences</h3>
      <p class="text-sm text-slate-600 mb-2">
        Vue dùng <code class="bg-slate-200 px-1 rounded">&lt;template&gt;</code> với các directive
        (<code class="bg-slate-200 px-1 rounded">v-if</code>,
        <code class="bg-slate-200 px-1 rounded">v-for</code>,
        <code class="bg-slate-200 px-1 rounded">v-bind</code>,
        <code class="bg-slate-200 px-1 rounded">{{ }}</code>).
        Directive được compile away tại build time, không có runtime overhead.
      </p>
      <p class="text-sm text-slate-600">
        Template gần giống HTML thuần — dễ đọc và quen thuộc với người có nền tảng HTML.
        Conditional rendering và list rendering được xử lý bằng directive chuyên dụng.
      </p>
    </div>
  </div>
</template>

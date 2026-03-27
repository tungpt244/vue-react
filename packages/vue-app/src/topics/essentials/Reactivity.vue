<script setup lang="ts">
import { ref, reactive } from 'vue'

const count = ref(0)
const user = reactive({ name: '', email: '' })
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">Reactivity</h2>

      <!-- Counter -->
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

      <!-- Form with live binding -->
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

    <div class="mt-6 p-4 bg-slate-50 rounded">
      <h3 class="text-sm font-semibold mb-2">Key Differences</h3>
      <p class="text-sm text-slate-600 mb-2">
        Vue dùng <code class="bg-slate-200 px-1 rounded">ref()</code> cho primitive và
        <code class="bg-slate-200 px-1 rounded">reactive()</code> cho object. Trong script truy cập
        qua <code class="bg-slate-200 px-1 rounded">.value</code>, trong template thì auto-unwrap.
      </p>
      <p class="text-sm text-slate-600">
        Vue tự động track dependency — bất kỳ template expression nào dùng ref sẽ tự re-render khi
        ref thay đổi. <code class="bg-slate-200 px-1 rounded">v-model</code> là syntactic sugar cho
        <code class="bg-slate-200 px-1 rounded">:value</code> +
        <code class="bg-slate-200 px-1 rounded">@input</code>.
      </p>
    </div>
  </div>
</template>

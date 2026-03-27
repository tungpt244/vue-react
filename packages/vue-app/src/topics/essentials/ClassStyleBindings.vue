<script setup lang="ts">
import { ref } from 'vue'

const isActive = ref(true)
const isHighlighted = ref(false)
const fontSize = ref(16)
const textColor = ref('#334155')
const theme = ref<'light' | 'dark'>('light')
const showCode = ref(false)

const DEMO_CODE = `<!-- Vue — :class và :style directives -->
<!-- 1. Object syntax: { 'class-name': condition } -->
<div :class="{ 'bg-blue-100': isActive, 'ring-2': isHighlighted }">

<!-- 2. Array syntax: kết hợp static + dynamic -->
<div :class="[theme === 'dark' ? 'bg-black' : 'bg-white', 'base']">

<!-- 3. :style binding (auto-prefix!) -->
<p :style="{ fontSize: fontSize + 'px', color: textColor }">

<!-- Compile away tại build time — 0 runtime overhead -->
<!-- React không có tương đương, phải dùng clsx library -->`
</script>

<template>
  <div>
    <h2 class="text-lg font-semibold mb-3">Class & Style Bindings</h2>

    <div class="border border-slate-200 rounded-lg p-4 mb-4 space-y-5">
      <div>
        <p
          class="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2"
        >
          1. Object syntax (:class)
        </p>
        <div
          :class="{
            'bg-blue-100 border-blue-500': isActive,
            'ring-2 ring-yellow-400': isHighlighted,
          }"
          class="p-3 rounded border border-slate-200 text-sm mb-2 transition-all"
        >
          Box với dynamic classes
          <span class="text-xs ml-1 text-slate-500">
            ({{
              [isActive ? 'active' : '', isHighlighted ? 'highlighted' : '']
                .filter(Boolean)
                .join(', ') || 'không có class'
            }})
          </span>
        </div>
        <div class="flex gap-2">
          <button
            @click="isActive = !isActive"
            :class="
              isActive
                ? 'bg-blue-500 text-white'
                : 'bg-slate-200 text-slate-700'
            "
            class="px-3 py-1 rounded hover:opacity-80 text-sm"
          >
            {{ isActive ? 'Active BẬT' : 'Active TẮT' }}
          </button>
          <button
            @click="isHighlighted = !isHighlighted"
            :class="
              isHighlighted
                ? 'bg-yellow-400 text-white'
                : 'bg-slate-200 text-slate-700'
            "
            class="px-3 py-1 rounded hover:opacity-80 text-sm"
          >
            {{ isHighlighted ? 'Highlight BẬT' : 'Highlight TẮT' }}
          </button>
        </div>
      </div>

      <div>
        <p
          class="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2"
        >
          2. Array syntax (:class với ternary)
        </p>
        <div
          :class="[
            theme === 'dark'
              ? 'bg-slate-800 text-white'
              : 'bg-white text-slate-800',
            'p-3 rounded border',
          ]"
          class="text-sm mb-2 transition-all"
        >
          Theme preview — đang dùng {{ theme }}
        </div>
        <div class="flex gap-2">
          <button
            @click="theme = 'light'"
            :class="
              theme === 'light'
                ? 'bg-blue-500 text-white'
                : 'bg-slate-200 text-slate-700'
            "
            class="px-3 py-1 rounded hover:opacity-80 text-sm"
          >
            Light
          </button>
          <button
            @click="theme = 'dark'"
            :class="
              theme === 'dark'
                ? 'bg-slate-700 text-white'
                : 'bg-slate-200 text-slate-700'
            "
            class="px-3 py-1 rounded hover:opacity-80 text-sm"
          >
            Dark
          </button>
        </div>
      </div>

      <div>
        <p
          class="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2"
        >
          3. Style binding (:style)
        </p>
        <p
          :style="{ fontSize: fontSize + 'px', color: textColor }"
          class="mb-3 font-medium"
        >
          Styled text preview
        </p>
        <div class="flex flex-col gap-2">
          <label class="flex items-center gap-2 text-sm">
            <span class="text-slate-600 w-24">Font size: {{ fontSize }}px</span>
            <input
              v-model.number="fontSize"
              type="range"
              min="12"
              max="32"
              class="w-32"
            />
          </label>
          <label class="flex items-center gap-2 text-sm">
            <span class="text-slate-600 w-24">Màu:</span>
            <input
              v-model="textColor"
              type="color"
              class="w-8 h-8 rounded cursor-pointer border border-slate-300"
            />
            <span class="text-xs text-slate-400 font-mono">{{
              textColor
            }}</span>
          </label>
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
        class="mt-2 bg-slate-900 text-slate-100 text-xs p-3 rounded overflow-x-auto"
      >
        <code>{{ DEMO_CODE }}</code>
      </pre>
    </div>

    <div class="p-4 bg-slate-50 rounded">
      <h3 class="text-sm font-semibold mb-2">So sánh</h3>
      <div class="text-sm text-slate-600 space-y-2">
        <p>
          <strong>:class có object và array syntax built-in.</strong> Object:
          <code class="bg-slate-200 px-1 rounded"
            >{ 'class-name': condition }</code
          >. Array:
          <code class="bg-slate-200 px-1 rounded"
            >[staticClass, { dynamic: cond }]</code
          >. Tất cả compile away — 0 runtime overhead.
        </p>
        <p>
          <strong>:style auto-prefix vendor prefixes.</strong> Vue tự thêm
          <code class="bg-slate-200 px-1 rounded">-webkit-</code>,
          <code class="bg-slate-200 px-1 rounded">-moz-</code> khi cần. React
          style object không làm điều này — phải thêm thủ công.
        </p>
        <p>
          <strong>Kết hợp static + dynamic class dễ dàng.</strong> Vue cho phép
          dùng cả
          <code class="bg-slate-200 px-1 rounded">class="static"</code> và
          <code class="bg-slate-200 px-1 rounded">:class="{ dynamic }"</code>
          trên cùng element — tự merge. React chỉ có 1
          <code class="bg-slate-200 px-1 rounded">className</code> string.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isActive = ref(true)
const isHighlighted = ref(false)
const fontSize = ref(16)
const textColor = ref('#334155')
const theme = ref<'light' | 'dark'>('light')
</script>

<template>
  <div>
    <h2 class="text-lg font-semibold mb-3">Class & Style Bindings</h2>

    <div class="border border-slate-200 rounded-lg p-4 mb-4 space-y-5">
      <!-- Section 1: Object syntax for :class -->
      <div>
        <p class="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">1. Object syntax (:class)</p>
        <div
          :class="{
            'bg-blue-100 border-blue-500': isActive,
            'ring-2 ring-yellow-400': isHighlighted
          }"
          class="p-3 rounded border border-slate-200 text-sm mb-2 transition-all"
        >
          Box with dynamic classes
          <span class="text-xs ml-1 text-slate-500">
            ({{ [isActive ? 'active' : '', isHighlighted ? 'highlighted' : ''].filter(Boolean).join(', ') || 'no dynamic classes' }})
          </span>
        </div>
        <div class="flex gap-2">
          <button
            @click="isActive = !isActive"
            :class="isActive ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-700'"
            class="px-3 py-1 rounded hover:opacity-80 text-sm"
          >
            {{ isActive ? 'Active ON' : 'Active OFF' }}
          </button>
          <button
            @click="isHighlighted = !isHighlighted"
            :class="isHighlighted ? 'bg-yellow-400 text-white' : 'bg-slate-200 text-slate-700'"
            class="px-3 py-1 rounded hover:opacity-80 text-sm"
          >
            {{ isHighlighted ? 'Highlight ON' : 'Highlight OFF' }}
          </button>
        </div>
      </div>

      <!-- Section 2: Array syntax for :class -->
      <div>
        <p class="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">2. Array syntax (:class with ternary)</p>
        <div
          :class="[theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white text-slate-800', 'p-3 rounded border']"
          class="text-sm mb-2 transition-all"
        >
          Theme preview — currently {{ theme }}
        </div>
        <div class="flex gap-2">
          <button
            @click="theme = 'light'"
            :class="theme === 'light' ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-700'"
            class="px-3 py-1 rounded hover:opacity-80 text-sm"
          >
            Light
          </button>
          <button
            @click="theme = 'dark'"
            :class="theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-700'"
            class="px-3 py-1 rounded hover:opacity-80 text-sm"
          >
            Dark
          </button>
        </div>
      </div>

      <!-- Section 3: :style binding -->
      <div>
        <p class="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">3. Style binding (:style)</p>
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
            <span class="text-slate-600 w-24">Color:</span>
            <input
              v-model="textColor"
              type="color"
              class="w-8 h-8 rounded cursor-pointer border border-slate-300"
            />
            <span class="text-xs text-slate-400 font-mono">{{ textColor }}</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Explanation -->
    <div class="mt-6 p-4 bg-slate-50 rounded">
      <h3 class="text-sm font-semibold mb-2">Key Differences</h3>
      <ul class="text-sm text-slate-600 space-y-1 list-disc list-inside">
        <li>Vue has dedicated <code class="bg-white px-1 rounded text-xs">:class</code> and <code class="bg-white px-1 rounded text-xs">:style</code> directives that accept objects, arrays, or strings.</li>
        <li>Object syntax <code class="bg-white px-1 rounded text-xs">{ 'class-name': condition }</code> is the most common pattern.</li>
        <li>Array syntax allows combining static and dynamic classes cleanly.</li>
        <li><code class="bg-white px-1 rounded text-xs">:style</code> auto-prefixes CSS properties and accepts camelCase property names.</li>
        <li>React uses <code class="bg-white px-1 rounded text-xs">className</code> (a string) — no built-in object/array syntax. For complex logic, libraries like <code class="bg-white px-1 rounded text-xs">clsx</code> help.</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const log = ref<string[]>([])
const showCode = ref(false)

const DEMO_CODE = `// Vue — Event Handling

// 1. @click
<button @click="count++">Click me</button>

// 2. @click.prevent — stop default navigation
<a href="https://example.com" @click.prevent="addLog('prevented')">
  Click link
</a>

// 3. @keydown.enter — modifier syntax
<input @keydown.enter="handleEnter" />

// Hoặc inline:
<input @keydown.enter="addLog('Enter: ' + $event.target.value)" />

// React equivalent: onClick, e.preventDefault(), onKeyDown + if(e.key===)`

const addLog = (msg: string) => {
  log.value = [msg, ...log.value].slice(0, 5)
}
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">Event Handling</h2>

      <div class="mb-4">
        <p class="text-sm font-medium mb-2">1. @click — Click counter</p>
        <div class="flex items-center gap-3">
          <button
            @click="count++"
            class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Click me
          </button>
          <span class="text-sm text-slate-600">
            Đã click: <strong>{{ count }}</strong> lần
          </span>
        </div>
      </div>

      <div class="mb-4">
        <p class="text-sm font-medium mb-2">
          2. @click.prevent — Prevent link navigation
        </p>
        <a
          href="https://example.com"
          @click.prevent="addLog('Link clicked (navigation prevented)')"
          class="text-sm text-blue-600 underline cursor-pointer"
        >
          Click link này (sẽ không navigate)
        </a>
      </div>

      <div class="mb-4">
        <p class="text-sm font-medium mb-2">
          3. @keydown.enter — Enter key modifier
        </p>
        <input
          placeholder="Nhập gì đó rồi nhấn Enter..."
          class="border border-slate-300 rounded px-2 py-1 text-sm w-full"
          @keydown.enter="
            (e) => {
              addLog(
                `Enter: &quot;${(e.target as HTMLInputElement).value}&quot;`,
              )
              ;(e.target as HTMLInputElement).value = ''
            }
          "
        />
      </div>

      <div v-if="log.length > 0" class="bg-slate-900 rounded p-3">
        <p class="text-xs text-slate-400 mb-1">Event log:</p>
        <p
          v-for="(entry, i) in log"
          :key="i"
          class="text-xs text-green-400 font-mono"
        >
          &gt; {{ entry }}
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
      ><code>{{ DEMO_CODE }}</code></pre>
    </div>

    <div class="p-4 bg-slate-50 rounded">
      <h3 class="text-sm font-semibold mb-2">So sánh</h3>
      <div class="text-sm text-slate-600 space-y-2">
        <p>
          <strong>Vue modifiers vs React explicit JS.</strong> Vue có syntactic
          sugar: <code class="bg-slate-200 px-1 rounded">@click.prevent</code>,
          <code class="bg-slate-200 px-1 rounded">@keydown.enter</code>. React
          dùng event object trực tiếp:
          <code class="bg-slate-200 px-1 rounded">e.preventDefault()</code>,
          <code class="bg-slate-200 px-1 rounded">if (e.key === 'Enter')</code>.
        </p>
        <p>
          <strong>Event naming convention.</strong> Vue dùng
          <code class="bg-slate-200 px-1 rounded">@click</code>,
          <code class="bg-slate-200 px-1 rounded">@input</code>,
          <code class="bg-slate-200 px-1 rounded">@keydown</code>. React dùng
          camelCase prop:
          <code class="bg-slate-200 px-1 rounded">onClick</code>,
          <code class="bg-slate-200 px-1 rounded">onChange</code>,
          <code class="bg-slate-200 px-1 rounded">onKeyDown</code>.
        </p>
        <p>
          <strong>Other Vue modifiers.</strong>
          <code class="bg-slate-200 px-1 rounded">@click.stop</code>
          (stopPropagation),
          <code class="bg-slate-200 px-1 rounded">@click.once</code> (fire
          once),
          <code class="bg-slate-200 px-1 rounded">@click.self</code> (only on
          element itself). React phải viết những này bằng tay trong handler.
        </p>
      </div>
    </div>
  </div>
</template>

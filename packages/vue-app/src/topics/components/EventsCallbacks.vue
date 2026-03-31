<script setup lang="ts">
import { ref, defineComponent, h } from 'vue'

const count = ref(0)
const showCode = ref(false)

const ChildButton = defineComponent({
  emits: ['increment'],
  setup(_, { emit }) {
    return () =>
      h(
        'button',
        {
          class:
            'px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm',
          onClick: () => emit('increment'),
        },
        'Increment (from child)',
      )
  },
})

const DEMO_CODE = `// Vue — defineEmits compiler macro (no import needed!)
const emit = defineEmits<{
  increment: []
}>()

// Emit the event:
emit('increment')

// With payload:
const emit = defineEmits<{
  update: [value: string]
}>()
emit('update', 'new value')

// Parent listens:
// <ChildButton @increment="count++" />`
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">Events / Callbacks</h2>

      <div class="mb-4">
        <p class="text-sm text-slate-600 mb-3">
          Parent counter:
          <span class="text-2xl font-bold text-blue-600">{{ count }}</span>
        </p>

        <ChildButton @increment="count++" />
        <button
          @click="count = 0"
          class="ml-2 px-3 py-1 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 text-sm"
        >
          Reset
        </button>
      </div>

      <p class="text-xs text-slate-500">
        Child emit 'increment' → Parent tăng counter
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
          <strong>Vue: defineEmits + emit().</strong> Compiler macro, không cần
          import. Typed events với generic:
          <code class="bg-slate-200 px-1 rounded"
            >defineEmits&lt;{ increment: [] }&gt;()</code
          >. Convention: kebab-case event names.
        </p>
        <p>
          <strong>React: function props.</strong> Không có event system — truyền
          function như prop thường. Convention:
          <code class="bg-slate-200 px-1 rounded">on*</code> naming.
        </p>
        <p>
          <strong>Vue có thể truyền payload theo event.</strong>
          <code class="bg-slate-200 px-1 rounded"
            >emit('update', newValue)</code
          >
          — parent nhận qua
          <code class="bg-slate-200 px-1 rounded">@update="handler"</code>.
          React cũng làm được với callback args.
        </p>
      </div>
    </div>
  </div>
</template>

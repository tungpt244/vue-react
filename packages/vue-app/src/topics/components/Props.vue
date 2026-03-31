<script setup lang="ts">
import { ref, defineComponent, h } from 'vue'

const name = ref('Boss')
const age = ref(25)
const showCode = ref(false)

const ChildGreeting = defineComponent({
  props: {
    name: { type: String, required: true },
    age: { type: Number, default: 0 },
  },
  setup(props) {
    return () =>
      h(
        'div',
        { class: 'p-3 bg-white border border-slate-200 rounded text-sm' },
        [
          'Hello, ',
          h('strong', {}, props.name),
          '! Age: ',
          h('strong', {}, String(props.age)),
        ],
      )
  },
})

const DEMO_CODE = `// Vue — defineProps compiler macro (no import needed!)
const props = defineProps<{
  name: string
  age?: number
}>()

// With defaults:
const props = withDefaults(
  defineProps<{ name: string; age?: number }>(),
  { age: 0 }
)

// In template:
// <ChildGreeting :name="name" :age="age" />`
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">Props</h2>

      <div class="space-y-3 mb-4">
        <div>
          <label class="text-sm font-medium block mb-1">Name</label>
          <input
            v-model="name"
            class="border border-slate-300 rounded px-2 py-1 text-sm w-full"
          />
        </div>
        <div>
          <label class="text-sm font-medium block mb-1">Age</label>
          <input
            v-model.number="age"
            type="number"
            class="border border-slate-300 rounded px-2 py-1 text-sm w-32"
          />
        </div>
      </div>

      <p class="text-xs text-slate-500 mb-2">Child component nhận props:</p>
      <ChildGreeting :name="name" :age="age" />
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
          <strong>Vue dùng defineProps compiler macro.</strong> Không cần import
          — compiler xử lý. Type-safe qua generic:
          <code class="bg-slate-200 px-1 rounded"
            >defineProps&lt;{ name: string }&gt;()</code
          >.
        </p>
        <p>
          <strong>React type trong function signature.</strong> Dùng interface
          hoặc inline type. Default value dùng JS default params:
          <code class="bg-slate-200 px-1 rounded">{ age = 0 }</code>.
        </p>
        <p>
          <strong>Vue withDefaults() cho default values.</strong> Phải wrap
          defineProps để set default — hơi verbose hơn React nhưng vẫn
          type-safe.
        </p>
      </div>
    </div>
  </div>
</template>

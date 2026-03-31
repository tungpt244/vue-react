<script setup lang="ts">
import { ref } from 'vue'

// Live demo: typed component rendered inline
const name = ref('Vue')
const count = ref(3)
const showCode = ref(false)

const DEMO_CODE = `<!-- TypedCard.vue -->
<script setup lang="ts">
// defineProps<T>() — compiler macro, no runtime overhead
const props = defineProps<{
  name: string
  count: number
  variant?: 'primary' | 'secondary'
}>()

// defineEmits<T>() — typed event emitter
const emit = defineEmits<{
  increment: [value: number]
  reset: []
}>()

// withDefaults for optional props
const propsWithDefaults = withDefaults(
  defineProps<{ variant?: 'primary' | 'secondary' }>(),
  { variant: 'primary' }
)
<\/script>

<template>
  <div>
    <p>{{ props.name }}: {{ props.count }}</p>
    <button @click="emit('increment', props.count + 1)">+</button>
    <button @click="emit('reset')">Reset</button>
  </div>
</template>`
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">
        TypeScript — defineProps & defineEmits
      </h2>

      <p class="text-sm text-slate-500 mb-3">
        Typed component demo — thay đổi props để xem type safety
      </p>

      <div class="flex gap-3 mb-4 flex-wrap">
        <label class="flex flex-col gap-1 text-sm">
          <span class="text-slate-500">name (string)</span>
          <input
            v-model="name"
            class="border border-slate-300 rounded px-2 py-1 text-sm w-32"
            placeholder="Enter name"
          />
        </label>
        <label class="flex flex-col gap-1 text-sm">
          <span class="text-slate-500">count (number)</span>
          <input
            v-model.number="count"
            type="number"
            class="border border-slate-300 rounded px-2 py-1 text-sm w-24"
          />
        </label>
      </div>

      <div class="p-3 bg-indigo-50 border border-indigo-200 rounded text-sm">
        <p class="text-indigo-700">
          Rendering typed component:
          <code class="bg-indigo-100 px-1 rounded">
            &lt;TypedCard name="{{ name }}" :count="{{ count }}" /&gt;
          </code>
        </p>
        <p class="mt-2 text-indigo-800 font-medium">{{ name }}: {{ count }}</p>
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
          <strong>Vue SFC</strong> dùng compiler macros
          <code class="bg-slate-200 px-1 rounded">defineProps&lt;T&gt;()</code>
          và
          <code class="bg-slate-200 px-1 rounded">defineEmits&lt;T&gt;()</code>
          — type inference trực tiếp trong
          <code class="bg-slate-200 px-1 rounded">&lt;script setup&gt;</code>,
          không cần runtime overhead. Dùng
          <code class="bg-slate-200 px-1 rounded">withDefaults()</code> cho
          optional props.
        </p>
        <p>
          <strong>React</strong> type props trực tiếp trên function params:
          <code class="bg-slate-200 px-1 rounded"
            >function MyComp(props: Props)</code
          >
          hoặc
          <code class="bg-slate-200 px-1 rounded"
            >function MyComp(&#123; name, count &#125;: Props)</code
          >. Không cần macro — plain TypeScript interface/type.
        </p>
        <p>
          <strong>Events:</strong> Vue dùng
          <code class="bg-slate-200 px-1 rounded">defineEmits&lt;T&gt;()</code>,
          React type callback props trực tiếp:
          <code class="bg-slate-200 px-1 rounded"
            >onClick: (value: number) =&gt; void</code
          >. Vue cần
          <code class="bg-slate-200 px-1 rounded">defineComponent()</code>
          wrapper khi không dùng SFC
          <code class="bg-slate-200 px-1 rounded">&lt;script setup&gt;</code>.
        </p>
      </div>
    </div>
  </div>
</template>

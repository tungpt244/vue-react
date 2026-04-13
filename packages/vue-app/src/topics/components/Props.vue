<script setup lang="ts">
import { ref, defineComponent, h, onUpdated } from 'vue'

const name = ref('Boss')
const age = ref(25)
const showCode = ref(false)
const unrelatedParentState = ref(0)
const domEventCount = ref(0)
const stableConfig = {
  theme: 'dark',
  pageSize: 10,
}

function incrementDomEventCount() {
  domEventCount.value += 1
}

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

const StableConfigChild = defineComponent({
  name: 'StableConfigChild',
  props: {
    config: {
      type: Object as () => { theme: string; pageSize: number },
      required: true,
    },
  },
  setup(props) {
    let renderCount = 0

    onUpdated(() => {
      console.log('[StableConfigChild] updated')
    })

    return () => {
      renderCount += 1

      return h(
        'div',
        {
          class: 'p-3 bg-emerald-50 border border-emerald-200 rounded text-sm',
        },
        [
          h(
            'div',
            { class: 'font-medium text-emerald-800 mb-1' },
            'Stable prop',
          ),
          h('div', {}, `renderCount: ${renderCount}`),
          h('div', {}, `theme: ${props.config.theme}`),
          h('div', {}, `pageSize: ${props.config.pageSize}`),
        ],
      )
    }
  },
})

const InlineConfigChild = defineComponent({
  name: 'InlineConfigChild',
  props: {
    config: {
      type: Object as () => { theme: string; pageSize: number },
      required: true,
    },
  },
  setup(props) {
    let renderCount = 0

    onUpdated(() => {
      console.log('[InlineConfigChild] updated')
    })

    return () => {
      renderCount += 1

      return h(
        'div',
        { class: 'p-3 bg-amber-50 border border-amber-200 rounded text-sm' },
        [
          h(
            'div',
            { class: 'font-medium text-amber-800 mb-1' },
            'Inline object prop',
          ),
          h('div', {}, `renderCount: ${renderCount}`),
          h('div', {}, `theme: ${props.config.theme}`),
          h('div', {}, `pageSize: ${props.config.pageSize}`),
        ],
      )
    }
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

    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h3 class="text-base font-semibold mb-3">
        Parent update vs child update
      </h3>

      <p class="text-xs text-slate-500 mb-3">
        Bấm nút này chỉ đổi state ở parent. Child bên trái nhận object stable
        nên sẽ giữ nguyên render count. Child bên phải nhận object được tạo lại
        trong render từ các biến scope nên sẽ tăng render count mỗi lần parent
        re-render.
      </p>

      <div class="flex items-center gap-3 mb-4">
        <button
          @click="unrelatedParentState++"
          class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Update unrelated parent state
        </button>
        <span
          class="text-sm font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700"
        >
          unrelatedParentState = {{ unrelatedParentState }}
        </span>
      </div>

      <div class="grid gap-3 md:grid-cols-2">
        <StableConfigChild :config="stableConfig" />
        <InlineConfigChild
          :config="stableConfig"
          :has="() => incrementDomEventCount()"
        />
      </div>
    </div>

    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h3 class="text-base font-semibold mb-3">DOM event binding</h3>

      <p class="text-xs text-slate-500 mb-3">
        Hai nút dưới đây đều là event trên DOM node hiện tại, không phải
        function prop truyền xuống child. Vì vậy nó không tạo ra bài toán child
        update do prop reference đổi.
      </p>

      <div class="flex flex-wrap items-center gap-3 mb-3">
        <button
          @click="incrementDomEventCount"
          class="px-3 py-1 bg-emerald-500 text-white rounded hover:bg-emerald-600 text-sm"
        >
          @click="incrementDomEventCount"
        </button>
        <button
          @click="() => incrementDomEventCount()"
          class="px-3 py-1 bg-amber-500 text-white rounded hover:bg-amber-600 text-sm"
        >
          @click="() =&gt; incrementDomEventCount()"
        </button>
      </div>

      <div
        class="text-sm font-mono bg-slate-100 px-3 py-2 rounded text-slate-700"
      >
        domEventCount = {{ domEventCount }}
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

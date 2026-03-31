<script setup lang="ts">
import { ref, defineComponent, h } from 'vue'

const text = ref('')
const showCode = ref(false)

// defineModel is a compiler macro — no import needed
const CustomInput = defineComponent({
  setup() {
    // In a real separate SFC:
    // const model = defineModel<string>()
    // We simulate the v-model pattern here using props/emits
    return {
      model: ref(''),
    }
  },
  props: {
    modelValue: { type: String, default: '' },
  },
  emits: ['update:modelValue'],
  render() {
    return h('input', {
      value: this.modelValue,
      onInput: (e: Event) =>
        this.$emit('update:modelValue', (e.target as HTMLInputElement).value),
      class: 'border border-slate-300 rounded px-2 py-1 text-sm w-full',
      placeholder: 'Nhập text...',
    })
  },
})

const DEMO_CODE = `// Vue — defineModel compiler macro (Vue 3.4+, no import!)
// In child component:
const model = defineModel<string>()

// In template:
// <input v-model="model" />

// Parent just uses v-model:
// <CustomInput v-model="text" />

// defineModel is sugar for:
// const modelValue = defineProps<{ modelValue: string }>()
// const emit = defineEmits<{ 'update:modelValue': [string] }>()
// → React equivalent: value + onChange props`
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">Component v-model</h2>

      <div class="space-y-3">
        <div>
          <p class="text-sm font-medium mb-1">CustomInput với v-model:</p>
          <CustomInput v-model="text" />
        </div>

        <div class="p-3 bg-slate-50 rounded">
          <p class="text-sm text-slate-600">
            Parent state:
            <code class="bg-slate-200 px-1 rounded"
              >"{{ text || '(trống)' }}"</code
            >
          </p>
        </div>

        <p class="text-xs text-slate-500">
          v-model tự động bind
          <code class="bg-slate-200 px-1 rounded">:modelValue</code> +
          <code class="bg-slate-200 px-1 rounded">@update:modelValue</code>
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
          <strong>Vue: defineModel() compiler macro.</strong> Không cần import.
          Tự tạo two-way binding. Parent dùng
          <code class="bg-slate-200 px-1 rounded">v-model</code> — gọn và quen
          thuộc.
        </p>
        <p>
          <strong>React: controlled component pattern.</strong> Phải truyền
          <code class="bg-slate-200 px-1 rounded">value</code> +
          <code class="bg-slate-200 px-1 rounded">onChange</code> tường minh. Rõ
          ràng hơn nhưng verbose hơn.
        </p>
        <p>
          <strong>Vue v-model là syntactic sugar</strong> cho
          <code class="bg-slate-200 px-1 rounded">:modelValue</code> +
          <code class="bg-slate-200 px-1 rounded">@update:modelValue</code> — về
          bản chất giống React nhưng compiler xử lý boilerplate.
        </p>
      </div>
    </div>
  </div>
</template>

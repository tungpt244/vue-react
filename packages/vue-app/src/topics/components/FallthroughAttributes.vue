<script setup lang="ts">
import { ref, defineComponent, h, useAttrs } from 'vue'

const disabled = ref(false)
const clickCount = ref(0)
const showCode = ref(false)

// Component with auto-fallthrough (default behavior)
const MyButton = defineComponent({
  props: {
    label: { type: String, required: true },
  },
  setup(props) {
    // useAttrs() lets us inspect what's being forwarded
    const attrs = useAttrs()
    return () =>
      h(
        'div',
        {},
        h(
          'button',
          {
            // attrs auto-merge onto root element (inheritAttrs: true by default)
            class:
              'px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm disabled:opacity-50 disabled:cursor-not-allowed',
            ...attrs,
          },
          props.label,
        ),
      )
  },
})

const DEMO_CODE = `// Vue — attrs auto-forwarded to root element (inheritAttrs: true)
// In child <template>:
// <button>{{ label }}</button>
// → class, style, data-*, event listeners auto-applied to <button>

// Opt out + manual control:
defineOptions({ inheritAttrs: false })
const attrs = useAttrs()  // import from 'vue'
// Then bind manually: v-bind="attrs"

// React equivalent:
// function MyButton({ label, ...rest }) {
//   return <button {...rest}>{label}</button>
// }`
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">Fallthrough Attributes</h2>

      <div class="space-y-3">
        <div class="flex items-center gap-3">
          <label class="text-sm font-medium">
            <input v-model="disabled" type="checkbox" class="mr-2" />
            Disabled
          </label>
        </div>

        <MyButton
          label="MyButton (attrs auto-forwarded)"
          :disabled="disabled"
          @click="clickCount++"
        />

        <p v-if="clickCount > 0" class="text-sm text-slate-600">
          Clicked {{ clickCount }} time(s)
        </p>

        <p class="text-xs text-slate-500">
          Parent truyền
          <code class="bg-slate-200 px-1 rounded">:disabled</code>,
          <code class="bg-slate-200 px-1 rounded">@click</code> — Vue
          auto-forward lên root element
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
          <strong>Vue: auto-forward theo mặc định (inheritAttrs: true).</strong>
          Attrs không declare trong defineProps tự forward lên root element. Rất
          convenient khi wrap native elements.
        </p>
        <p>
          <strong>React: luôn explicit.</strong> Phải destructure
          <code class="bg-slate-200 px-1 rounded">...rest</code> và spread thủ
          công. Không có magic — rõ ràng nhưng thêm code.
        </p>
        <p>
          <strong>Vue opt-out với inheritAttrs: false.</strong> Khi muốn kiểm
          soát thủ công, dùng
          <code class="bg-slate-200 px-1 rounded">defineOptions</code> +
          <code class="bg-slate-200 px-1 rounded">useAttrs()</code> để bind ở
          bất kỳ element nào.
        </p>
      </div>
    </div>
  </div>
</template>

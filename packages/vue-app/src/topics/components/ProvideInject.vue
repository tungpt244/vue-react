<script setup lang="ts">
import { ref, provide, inject, defineComponent, h } from 'vue'

const theme = ref<'light' | 'dark'>('light')
const showCode = ref(false)

// Provide theme at this level
provide('theme', theme)

const DeepChild = defineComponent({
  setup() {
    const theme = inject<ReturnType<typeof ref<'light' | 'dark'>>>('theme')
    return () => {
      const currentTheme = theme?.value ?? 'light'
      return h(
        'div',
        {
          class: `p-3 rounded text-sm ${
            currentTheme === 'dark'
              ? 'bg-slate-800 text-white'
              : 'bg-white text-slate-800 border border-slate-200'
          }`,
        },
        ['DeepChild reads theme via inject: ', h('strong', {}, currentTheme)],
      )
    }
  },
})

const MiddleLayer = defineComponent({
  setup() {
    return () =>
      h('div', { class: 'pl-4 border-l-2 border-slate-300' }, [
        h(
          'p',
          { class: 'text-xs text-slate-400 mb-2' },
          'MiddleLayer (không có props)',
        ),
        h(DeepChild, {}),
      ])
  },
})

const DEMO_CODE = `// Vue — provide() + inject() for deep prop passing
// In parent (provider):
import { ref, provide } from 'vue'
const theme = ref('light')
provide('theme', theme)  // provide reactive ref

// In any nested child (consumer):
import { inject } from 'vue'
const theme = inject('theme')  // no prop drilling!

// Typed inject with default:
const theme = inject<Ref<'light' | 'dark'>>('theme', ref('light'))

// React equivalent:
// createContext + Provider + useContext`
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">Provide / Inject</h2>

      <div class="space-y-3">
        <div class="flex items-center gap-3">
          <span class="text-sm font-medium">Theme:</span>
          <button
            @click="theme = theme === 'light' ? 'dark' : 'light'"
            class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Toggle ({{ theme }})
          </button>
        </div>

        <p class="text-xs text-slate-500">
          provide('theme') ở đây. DeepChild ở dưới inject mà không cần props qua
          MiddleLayer:
        </p>

        <MiddleLayer />
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
          <strong>Vue: provide() + inject().</strong> Đơn giản — chỉ cần 2
          functions. Provide reactive ref thì inject cũng reactive. Không cần
          tạo context object hay wrapper component.
        </p>
        <p>
          <strong>React: createContext + Provider + useContext.</strong> Cần 3
          bước. Context được typed khi tạo. Provider là JSX wrapper. Consumer
          dùng <code class="bg-slate-200 px-1 rounded">useContext()</code>.
        </p>
        <p>
          <strong>Vue đơn giản hơn, React type-safe hơn.</strong> Vue inject trả
          về <code class="bg-slate-200 px-1 rounded">T | undefined</code> — cần
          type assertion. React context luôn có default value type.
        </p>
      </div>
    </div>
  </div>
</template>

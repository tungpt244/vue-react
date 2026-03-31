<script setup lang="ts">
import { ref, provide, inject } from 'vue'
import { defineComponent, h } from 'vue'

const showCode = ref(false)

// Simulate plugin-like provide/inject pattern
// (In a real plugin, this would be in app.use())
const message = ref('')
const visible = ref(false)

const show = (msg: string) => {
  message.value = msg
  visible.value = true
  setTimeout(() => (visible.value = false), 2000)
}

provide('notification', { show })

// Child components using inject
const ChildA = defineComponent({
  setup() {
    const notif = inject<{ show: (msg: string) => void }>('notification')
    return () =>
      h(
        'button',
        {
          onClick: () => notif?.show('Hello from Child A!'),
          class:
            'px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm',
        },
        'Notify from Child A',
      )
  },
})

const ChildB = defineComponent({
  setup() {
    const notif = inject<{ show: (msg: string) => void }>('notification')
    return () =>
      h(
        'button',
        {
          onClick: () => notif?.show('Hello from Child B!'),
          class:
            'px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm',
        },
        'Notify from Child B',
      )
  },
})

const DEMO_CODE = `// Vue plugin system — app.use()
// In main.ts:
const NotificationPlugin = {
  install(app: App) {
    const message = ref('')
    app.provide('notification', {
      show: (msg: string) => { message.value = msg }
    })
    // Can also register global components, directives, etc.
  }
}
app.use(NotificationPlugin)

// In any component (no import needed):
const notif = inject('notification')
notif.show('Hello!')

// Single-file demo uses provide/inject directly
// (equivalent to what plugin does internally)`
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">Plugins → provide/inject</h2>

      <div class="space-y-3">
        <p class="text-sm text-slate-500">
          Both buttons share the notification channel via
          <code class="bg-slate-200 px-1 rounded">inject('notification')</code>
        </p>
        <div class="flex gap-2">
          <ChildA />
          <ChildB />
        </div>
        <div
          v-if="visible"
          class="px-3 py-2 bg-green-100 border border-green-300 text-green-800 text-sm rounded"
        >
          {{ message }}
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
        class="mt-2 bg-slate-900 text-slate-100 text-xs p-4 rounded overflow-x-auto"
      ><code>{{ DEMO_CODE }}</code></pre>
    </div>

    <div class="p-4 bg-slate-50 rounded">
      <h3 class="text-sm font-semibold mb-2">So sánh</h3>
      <div class="text-sm text-slate-600 space-y-2">
        <p>
          <strong>Vue plugins dùng app.use().</strong> Plugin có quyền truy cập
          app instance — có thể register global components, directives, provide
          values qua provide/inject, thêm global properties (
          <code class="bg-slate-200 px-1 rounded"
            >app.config.globalProperties</code
          >). Rất flexible.
        </p>
        <p>
          <strong>React không có plugin system.</strong> Equivalent gần nhất là
          Context/Provider — inject values vào subtree. Custom hooks chia sẻ
          logic. Higher-Order Components (HOC) wrap components. Không có "global
          registration" — mọi thứ phải import explicit.
        </p>
        <p>
          <strong>Vue plugins tiện hơn nhưng ít explicit hơn.</strong> React
          Context buộc bạn thấy rõ dependency tree (provider ở đâu, consumer ở
          đâu). Vue plugin có thể inject magic vào mọi component mà không cần
          khai báo.
        </p>
      </div>
    </div>
  </div>
</template>

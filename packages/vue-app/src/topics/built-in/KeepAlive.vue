<script setup lang="ts">
import { ref, defineComponent, h } from 'vue'

const activeTab = ref('a')
const showCode = ref(false)

// Tab A — Counter component (internal state preserved by KeepAlive)
const TabA = defineComponent({
  name: 'TabA',
  setup() {
    const count = ref(0)
    return () =>
      h('div', { class: 'p-3 bg-blue-50 rounded' }, [
        h(
          'p',
          { class: 'text-sm font-medium mb-2' },
          `Counter: ${count.value}`,
        ),
        h('div', { class: 'flex gap-2' }, [
          h(
            'button',
            {
              onClick: () => count.value--,
              class:
                'px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm',
            },
            '-',
          ),
          h(
            'button',
            {
              onClick: () => count.value++,
              class:
                'px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm',
            },
            '+',
          ),
        ]),
      ])
  },
})

// Tab B — Input component (internal state preserved by KeepAlive)
const TabB = defineComponent({
  name: 'TabB',
  setup() {
    const text = ref('')
    return () =>
      h('div', { class: 'p-3 bg-purple-50 rounded' }, [
        h('p', { class: 'text-sm font-medium mb-2' }, 'Type something:'),
        h('input', {
          value: text.value,
          onInput: (e: Event) =>
            (text.value = (e.target as HTMLInputElement).value),
          placeholder: 'Input value persists...',
          class: 'border border-slate-300 rounded px-2 py-1 text-sm w-full',
        }),
        text.value
          ? h(
              'p',
              { class: 'text-sm text-slate-600 mt-2' },
              `You typed: ${text.value}`,
            )
          : null,
      ])
  },
})

const currentComponent = ref<typeof TabA | typeof TabB>(TabA)
const setTab = (tab: string) => {
  activeTab.value = tab
  currentComponent.value = tab === 'a' ? TabA : TabB
}

const DEMO_CODE = `<template>
  <button @click="activeTab = 'a'">Tab A</button>
  <button @click="activeTab = 'b'">Tab B</button>

  <!-- KeepAlive caches component instances -->
  <KeepAlive>
    <component :is="activeComponent" />
  </KeepAlive>
</template>

<!-- Without KeepAlive: component unmounts/remounts on switch -->
<!-- With KeepAlive: component is deactivated/activated — state preserved -->`
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">KeepAlive</h2>

      <p class="text-xs text-slate-500 mb-3">
        Switch tabs — state is preserved because KeepAlive caches component
        instances
      </p>

      <div class="flex gap-2 mb-4">
        <button
          @click="setTab('a')"
          :class="[
            'px-3 py-1 rounded text-sm font-medium',
            activeTab === 'a'
              ? 'bg-blue-500 text-white'
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300',
          ]"
        >
          Tab A (Counter)
        </button>
        <button
          @click="setTab('b')"
          :class="[
            'px-3 py-1 rounded text-sm font-medium',
            activeTab === 'b'
              ? 'bg-blue-500 text-white'
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300',
          ]"
        >
          Tab B (Input)
        </button>
      </div>

      <KeepAlive>
        <component :is="currentComponent" />
      </KeepAlive>
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
          <strong>Vue's &lt;KeepAlive&gt; cache component instance.</strong> Khi
          switch tab, component không bị unmount — toàn bộ state nội tại được
          giữ nguyên. Thêm
          <code class="bg-slate-200 px-1 rounded">&lt;KeepAlive&gt;</code> wrap
          là xong, không cần sửa child component.
        </p>
        <p>
          <strong>React không có KeepAlive.</strong> Phải lift state lên parent
          và pass down qua props. Child component được mount/unmount bình thường
          — chỉ có parent lưu trữ state. Cần sửa cả parent lẫn child để wire
          props đúng.
        </p>
        <p>
          <strong>Vue approach ít boilerplate hơn.</strong> React approach
          explicit hơn — dễ trace data flow. Với complex internal state (form
          với 20+ fields), React yêu cầu lift tất cả lên parent — có thể
          verbose. Alternative: dùng Zustand/Redux để persist state globally.
        </p>
      </div>
    </div>
  </div>
</template>

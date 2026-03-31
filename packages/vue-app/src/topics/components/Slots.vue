<script setup lang="ts">
import { ref, defineComponent, h } from 'vue'

const showCode = ref(false)

const Card = defineComponent({
  setup(_, { slots }) {
    return () =>
      h('div', { class: 'border border-slate-200 rounded p-3 text-sm' }, [
        slots.header
          ? h(
              'div',
              { class: 'border-b border-slate-200 pb-2 mb-2 font-semibold' },
              slots.header(),
            )
          : null,
        h('div', {}, slots.default ? slots.default() : undefined),
        slots.footer
          ? h(
              'div',
              {
                class:
                  'border-t border-slate-200 pt-2 mt-2 text-slate-500 text-xs',
              },
              slots.footer(),
            )
          : null,
      ])
  },
})

const DataList = defineComponent({
  setup(_, { slots }) {
    const items = ['Vue 3', 'React 19', 'Svelte 5']
    return () =>
      h(
        'ul',
        { class: 'space-y-1' },
        items.map((item, i) =>
          slots.item ? slots.item({ item, index: i }) : h('li', {}, item),
        ),
      )
  },
})

const DEMO_CODE = `// Vue — <slot> system

// Default slot:
// <slot />
// → children in React

// Named slot:
// <slot name="header" />
// → header prop (React.ReactNode) in React

// Scoped slot (passes data back to parent):
// <slot name="item" :item="item" :index="i" />
// → render prop in React

// Parent usage:
// <Card>
//   <template #header>Header content</template>
//   Main content (default slot)
//   <template #footer>Footer</template>
// </Card>
//
// <DataList>
//   <template #item="{ item, index }">
//     <li>{{ index + 1 }}. {{ item }}</li>
//   </template>
// </DataList>`
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">Slots</h2>

      <div class="space-y-4">
        <div>
          <p class="text-xs text-slate-500 mb-2">
            Card với default slot + named slots (header, footer):
          </p>
          <Card>
            <template #header>Card Header</template>
            <p class="text-slate-700">
              Đây là nội dung chính của card. Truyền qua
              <code class="bg-slate-200 px-1 rounded">default slot</code>.
            </p>
            <template #footer>
              Card Footer — created {{ new Date().getFullYear() }}
            </template>
          </Card>
        </div>

        <div>
          <p class="text-xs text-slate-500 mb-2">
            DataList với scoped slot (render prop equivalent):
          </p>
          <DataList>
            <template #item="{ item, index }">
              <li
                class="flex items-center gap-2 text-sm px-2 py-1 bg-slate-50 rounded"
              >
                <span class="text-xs text-slate-400">{{ index + 1 }}.</span>
                <strong>{{ item }}</strong>
              </li>
            </template>
          </DataList>
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
          <strong>Vue: slot system chuyên dụng.</strong>
          <code class="bg-slate-200 px-1 rounded">&lt;slot /&gt;</code> cho
          default,
          <code class="bg-slate-200 px-1 rounded">&lt;slot name="x" /&gt;</code>
          cho named, scoped slot truyền data ngược lên parent.
        </p>
        <p>
          <strong>React: children + named props + render props.</strong> Default
          slot →
          <code class="bg-slate-200 px-1 rounded">children: ReactNode</code>.
          Named → prop nhận ReactNode. Scoped → render prop function.
        </p>
        <p>
          <strong>Vue slot syntax đặc biệt hơn nhưng rõ ràng hơn</strong> với
          <code class="bg-slate-200 px-1 rounded">#header</code>,
          <code class="bg-slate-200 px-1 rounded">#item="{ data }"</code>. React
          dùng props thông thường — đơn giản hơn về concept.
        </p>
      </div>
    </div>
  </div>
</template>

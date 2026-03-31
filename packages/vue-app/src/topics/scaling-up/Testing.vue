<script setup lang="ts">
import { ref } from 'vue'

const showCode = ref(false)
const testRunning = ref(false)
const testPassed = ref(false)

function runTests() {
  testRunning.value = true
  testPassed.value = false
  setTimeout(() => {
    testRunning.value = false
    testPassed.value = true
  }, 800)
}

const COMPONENT_CODE = `<!-- Counter.vue -->
<script setup lang="ts">
const count = defineModel<number>({ default: 0 })
<\/script>

<template>
  <div>
    <p data-testid="count">Count: {{ count }}</p>
    <button @click="count++">Increment</button>
  </div>
</template>`

const DEMO_CODE = `// Counter.test.ts — using @vue/test-utils + vitest
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Counter from './Counter.vue'

describe('Counter', () => {
  it('renders initial count', () => {
    const wrapper = mount(Counter)
    expect(wrapper.find('[data-testid="count"]').text())
      .toBe('Count: 0')
  })

  it('increments on button click', async () => {
    const wrapper = mount(Counter)
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('[data-testid="count"]').text())
      .toBe('Count: 1')
  })

  it('calls handler with spy', async () => {
    const handler = vi.fn()
    const wrapper = mount(Counter, {
      props: { onUpdate: handler }
    })
    await wrapper.find('button').trigger('click')
    expect(handler).toHaveBeenCalled()
  })
})`
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">Testing — Vue Test Utils</h2>

      <div class="mb-4">
        <h4 class="text-xs font-semibold text-slate-500 uppercase mb-2">
          Component
        </h4>
        <pre
          class="bg-slate-900 text-slate-100 text-xs p-3 rounded overflow-x-auto"
        ><code>{{ COMPONENT_CODE }}</code></pre>
      </div>

      <div class="mb-4">
        <h4 class="text-xs font-semibold text-slate-500 uppercase mb-2">
          Test file
        </h4>
        <pre
          class="bg-slate-900 text-slate-100 text-xs p-3 rounded overflow-x-auto"
        ><code>{{ DEMO_CODE }}</code></pre>
      </div>

      <div class="flex items-center gap-3">
        <button
          @click="runTests"
          :disabled="testRunning"
          class="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50"
        >
          {{ testRunning ? 'Running...' : '▶ Run Tests' }}
        </button>
        <div v-if="testPassed" class="text-sm text-green-700 font-medium">
          ✓ 3 tests passed (simulated)
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
          <strong>Vue Test Utils (VTU)</strong> dùng
          <code class="bg-slate-200 px-1 rounded">mount()</code> /
          <code class="bg-slate-200 px-1 rounded">shallowMount()</code> để
          render component. Query bằng
          <code class="bg-slate-200 px-1 rounded">.find(selector)</code>,
          trigger events với
          <code class="bg-slate-200 px-1 rounded">.trigger('click')</code>.
        </p>
        <p>
          <strong>React Testing Library (RTL)</strong> dùng
          <code class="bg-slate-200 px-1 rounded">render()</code> +
          <code class="bg-slate-200 px-1 rounded">screen</code> queries. RTL
          khuyến khích query theo cách user thấy:
          <code class="bg-slate-200 px-1 rounded">getByRole()</code>,
          <code class="bg-slate-200 px-1 rounded">getByText()</code>,
          <code class="bg-slate-200 px-1 rounded">getByLabelText()</code>.
        </p>
        <p>
          <strong>Điểm khác biệt:</strong> VTU cho phép query theo CSS selector
          và implementation details. RTL enforce test theo perspective user
          (accessibility queries). Cả hai đều chạy trên Vitest. Cùng dùng
          <code class="bg-slate-200 px-1 rounded">vi.fn()</code> cho
          spies/mocks.
        </p>
      </div>
    </div>
  </div>
</template>

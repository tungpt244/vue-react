<script setup lang="ts">
import { ref, defineComponent, h, onUpdated } from 'vue'

const showCode = ref(false)
const parentCount = ref(0)

// Child component that does NOT depend on parentCount
const ChildComponent = defineComponent({
  name: 'ChildComponent',
  setup() {
    const renderCount = ref(0)
    onUpdated(() => {
      renderCount.value++
    })
    return () =>
      h(
        'div',
        {
          class:
            'text-xs bg-green-50 border border-green-200 rounded p-2 text-green-700',
        },
        [
          h('span', { class: 'font-medium' }, 'Child: '),
          'static content — render count: ',
          h('span', { class: 'font-bold' }, String(renderCount.value)),
          renderCount.value === 0
            ? h('span', { class: 'ml-2 text-green-600' }, '✓ never re-rendered')
            : h('span', { class: 'ml-2 text-orange-600' }, '(re-rendered)'),
        ],
      )
  },
})

const DEMO_CODE = `<script setup lang="ts">
import { ref, defineComponent, h, onUpdated } from 'vue'

const parentCount = ref(0)

// Child does NOT use parentCount — no reactive dependency
const ChildComponent = defineComponent({
  setup() {
    const renderCount = ref(0)
    onUpdated(() => { renderCount.value++ })
    return () => h('div', \`Child renders: \${renderCount.value}\`)
  }
})
<\/script>

<template>
  <!-- Clicking this button changes parentCount -->
  <!-- Child has NO dependency on parentCount -->
  <!-- Vue auto-skips re-rendering Child ✓ -->
  <button @click="parentCount++">Increment parent: {{ parentCount }}</button>
  <ChildComponent />
</template>

<!-- No React.memo() needed — Vue reactivity system
     automatically tracks each component's dependencies.
     If a component's reactive data didn't change, it won't re-render. -->`
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">Re-render & Optimization</h2>

      <p class="text-xs text-slate-500 mb-3">
        Click "Increment parent" — child component không re-render vì nó không
        có reactive dependency vào
        <code class="bg-slate-100 px-1 rounded">parentCount</code>. Tự động,
        không cần <code class="bg-slate-100 px-1 rounded">memo()</code>.
      </p>

      <div class="space-y-3">
        <div class="flex items-center gap-3">
          <button
            @click="parentCount++"
            class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Increment parent
          </button>
          <span
            class="text-sm font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700"
          >
            parentCount = {{ parentCount }}
          </span>
        </div>

        <ChildComponent />
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

    <div class="p-4 bg-slate-50 rounded mb-4">
      <h3 class="text-sm font-semibold mb-2">So sánh</h3>
      <div class="text-sm text-slate-600 space-y-2">
        <p>
          <strong
            >Vue components chỉ re-render khi reactive dependencies của chính nó
            thay đổi.</strong
          >
          Compiler + reactivity system tự track từng component. Không cần
          <code class="bg-slate-200 px-1 rounded">memo()</code> — optimization
          này là mặc định.
        </p>
        <p>
          <strong>React re-render TẤT CẢ children</strong> khi parent state thay
          đổi, trừ khi bạn wrap trong
          <code class="bg-slate-200 px-1 rounded">React.memo()</code>. Thêm
          <code class="bg-slate-200 px-1 rounded">useMemo()</code> cho expensive
          computation và
          <code class="bg-slate-200 px-1 rounded">useCallback()</code> cho
          stable function refs.
        </p>
        <p>
          <strong>Vue's approach:</strong> Zero-config optimization. Tradeoff là
          bạn cần hiểu reactivity system để debug khi component
          <em>không</em> update đúng lúc (stale reactive reference).
        </p>
      </div>
    </div>

    <div class="border border-slate-200 rounded-lg p-4">
      <h3 class="text-sm font-semibold mb-4">Diagram: Vue Auto Optimization</h3>
      <svg
        viewBox="0 0 440 150"
        class="w-full h-auto"
        aria-label="Vue automatic re-render optimization diagram"
      >
        <defs>
          <marker
            id="arrow-rerender-vue"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8" />
          </marker>
        </defs>

        <!-- Parent node -->
        <rect
          x="10"
          y="55"
          width="100"
          height="40"
          rx="4"
          fill="#dbeafe"
          stroke="#93c5fd"
          stroke-width="1"
        />
        <text x="60" y="72" text-anchor="middle" font-size="10" fill="#334155">
          Parent
        </text>
        <text x="60" y="85" text-anchor="middle" font-size="8" fill="#60a5fa">
          state changes
        </text>

        <!-- Arrow to Child A (up-right) -->
        <path
          d="M110 65 L170 38"
          stroke="#94a3b8"
          stroke-width="1.5"
          marker-end="url(#arrow-rerender-vue)"
        />
        <!-- Label: re-render -->
        <text x="148" y="45" text-anchor="middle" font-size="8" fill="#ef4444">
          re-render
        </text>

        <!-- Arrow to Child B (down-right) -->
        <path
          d="M110 85 L170 112"
          stroke="#94a3b8"
          stroke-width="1.5"
          marker-end="url(#arrow-rerender-vue)"
        />
        <!-- Label: SKIP -->
        <text x="148" y="108" text-anchor="middle" font-size="8" fill="#16a34a">
          SKIP
        </text>

        <!-- Child A: deps changed -->
        <rect
          x="170"
          y="18"
          width="110"
          height="40"
          rx="4"
          fill="#fee2e2"
          stroke="#fca5a5"
          stroke-width="1"
        />
        <text x="225" y="35" text-anchor="middle" font-size="9" fill="#334155">
          Child A
        </text>
        <text x="225" y="48" text-anchor="middle" font-size="8" fill="#ef4444">
          deps changed ↻
        </text>

        <!-- Child B: no deps — auto-skipped -->
        <rect
          x="170"
          y="95"
          width="110"
          height="40"
          rx="4"
          fill="#dcfce7"
          stroke="#86efac"
          stroke-width="1"
        />
        <text x="225" y="112" text-anchor="middle" font-size="9" fill="#334155">
          Child B
        </text>
        <text x="225" y="125" text-anchor="middle" font-size="8" fill="#15803d">
          no deps → skip ✓
        </text>

        <!-- Arrow from Child A to DOM update -->
        <path
          d="M280 38 L330 65"
          stroke="#94a3b8"
          stroke-width="1.5"
          marker-end="url(#arrow-rerender-vue)"
        />

        <!-- Annotation: auto-skipped -->
        <rect
          x="300"
          y="100"
          width="100"
          height="28"
          rx="4"
          fill="#dcfce7"
          stroke="#86efac"
          stroke-width="1"
        />
        <text x="350" y="112" text-anchor="middle" font-size="9" fill="#15803d">
          auto-skipped
        </text>
        <text x="350" y="122" text-anchor="middle" font-size="8" fill="#15803d">
          by Vue reactivity
        </text>

        <!-- DOM Update node -->
        <rect
          x="330"
          y="48"
          width="90"
          height="36"
          rx="4"
          fill="#f1f5f9"
          stroke="#cbd5e1"
          stroke-width="1"
        />
        <text x="375" y="64" text-anchor="middle" font-size="10" fill="#334155">
          DOM Update
        </text>
        <text x="375" y="77" text-anchor="middle" font-size="8" fill="#94a3b8">
          targeted only
        </text>
      </svg>
    </div>
  </div>
</template>

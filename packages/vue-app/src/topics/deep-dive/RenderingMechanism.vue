<script setup lang="ts">
import { ref, onUpdated } from 'vue'

const count = ref(0)
const showCode = ref(false)
const lastUpdatedNode = ref(false)

function increment() {
  count.value++
  lastUpdatedNode.value = true
  setTimeout(() => {
    lastUpdatedNode.value = false
  }, 600)
}

const DEMO_CODE = `<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
// Vue compiler hoists static nodes, marks dynamic ones
// with "patch flags" at compile time
<\/script>

<template>
  <!-- Static node: hoisted, never re-evaluated -->
  <div class="static-label">Counter Demo</div>

  <!-- Dynamic node: patch flag = TEXT (only text content changes) -->
  <!-- Vue only patches this specific text node on update -->
  <span>{{ count }}</span>

  <button @click="count++">Increment</button>
</template>

<!-- Compiled output (simplified):
const _hoisted_1 = createElementVNode("div", null, "Counter Demo")

function render() {
  return [
    _hoisted_1,  // ← reused, never recreated
    createElementVNode("span", null, toDisplayString(count.value),
      1 /* PATCH FLAG: TEXT */),
  ]
}
-->`
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">Rendering Mechanism</h2>

      <p class="text-xs text-slate-500 mb-3">
        Vue chỉ update node nào có dữ liệu thay đổi — static nodes bị hoisted và
        skip.
      </p>

      <div class="flex items-center gap-4 mb-3">
        <button
          @click="increment"
          class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Increment
        </button>
        <div class="text-sm text-slate-600">
          Clicks:
          <span
            :class="[
              'font-mono font-bold px-2 py-0.5 rounded transition-colors duration-300',
              lastUpdatedNode
                ? 'bg-green-100 text-green-700'
                : 'bg-slate-100 text-slate-700',
            ]"
          >
            {{ count }}
          </span>
          <span
            v-if="lastUpdatedNode"
            class="ml-2 text-xs text-green-600 font-medium"
          >
            ← only this text node updated
          </span>
        </div>
      </div>

      <div class="text-xs bg-slate-100 rounded p-3 text-slate-600 space-y-1">
        <div>
          <span class="text-slate-400">Static:</span>
          <code class="ml-1 bg-slate-200 px-1 rounded">Counter Demo</code>
          — hoisted, never re-created
        </div>
        <div>
          <span class="text-slate-400">Dynamic:</span>
          <code class="ml-1 bg-slate-200 px-1 rounded"
            >{{ '{{ count }}' }}</code
          >
          — patch flag TEXT, targeted update
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

    <div class="p-4 bg-slate-50 rounded mb-4">
      <h3 class="text-sm font-semibold mb-2">So sánh</h3>
      <div class="text-sm text-slate-600 space-y-2">
        <p>
          <strong>Vue compiler phân tích template lúc build.</strong> Nó đánh
          dấu mỗi binding với "patch flags" (TEXT, CLASS, PROPS...) và hoist
          static nodes ra ngoài render function. Khi state thay đổi, Vue chỉ
          diff những dynamic nodes có patch flag — bỏ qua toàn bộ static
          content.
        </p>
        <p>
          <strong>React không có compile-time optimization.</strong> Khi
          <code class="bg-slate-200 px-1 rounded">setState</code> được gọi, toàn
          bộ component function chạy lại, trả về JSX tree mới, Reconciler diff
          hết tất cả nodes từ component đó trở xuống.
        </p>
        <p>
          <strong>Kết quả:</strong> Vue's targeted update nhanh hơn cho các
          component có nhiều static content. React bù lại bằng Fiber scheduler
          và concurrent features cho complex UIs.
        </p>
      </div>
    </div>

    <div class="border border-slate-200 rounded-lg p-4">
      <h3 class="text-sm font-semibold mb-4">
        Diagram: Vue Compiler Optimization
      </h3>
      <svg
        viewBox="0 0 480 120"
        class="w-full h-auto"
        aria-label="Vue compiler optimization flow diagram"
      >
        <defs>
          <marker
            id="arrow-rendering-vue"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8" />
          </marker>
        </defs>

        <!-- Node 1: Template -->
        <rect
          x="10"
          y="40"
          width="76"
          height="36"
          rx="4"
          fill="#f1f5f9"
          stroke="#cbd5e1"
          stroke-width="1"
        />
        <text x="48" y="62" text-anchor="middle" font-size="10" fill="#334155">
          Template
        </text>

        <!-- Arrow 1 -->
        <path
          d="M86 58 L106 58"
          stroke="#94a3b8"
          stroke-width="1.5"
          marker-end="url(#arrow-rendering-vue)"
        />

        <!-- Node 2: Compiler -->
        <rect
          x="106"
          y="40"
          width="76"
          height="36"
          rx="4"
          fill="#dbeafe"
          stroke="#93c5fd"
          stroke-width="1"
        />
        <text x="144" y="57" text-anchor="middle" font-size="10" fill="#334155">
          Compiler
        </text>
        <text x="144" y="70" text-anchor="middle" font-size="8" fill="#60a5fa">
          (build time)
        </text>

        <!-- Arrow 2 -->
        <path
          d="M182 58 L202 58"
          stroke="#94a3b8"
          stroke-width="1.5"
          marker-end="url(#arrow-rendering-vue)"
        />

        <!-- Node 3: VNode Tree -->
        <rect
          x="202"
          y="28"
          width="90"
          height="58"
          rx="4"
          fill="#f1f5f9"
          stroke="#cbd5e1"
          stroke-width="1"
        />
        <text x="247" y="50" text-anchor="middle" font-size="10" fill="#334155">
          VNode Tree
        </text>
        <text x="247" y="63" text-anchor="middle" font-size="8" fill="#16a34a">
          patch flags
        </text>
        <text x="247" y="76" text-anchor="middle" font-size="8" fill="#94a3b8">
          static hoisted
        </text>

        <!-- Arrow 3 -->
        <path
          d="M292 58 L312 58"
          stroke="#94a3b8"
          stroke-width="1.5"
          marker-end="url(#arrow-rendering-vue)"
        />

        <!-- Node 4: DOM Diff -->
        <rect
          x="312"
          y="28"
          width="76"
          height="58"
          rx="4"
          fill="#f1f5f9"
          stroke="#cbd5e1"
          stroke-width="1"
        />
        <text x="350" y="50" text-anchor="middle" font-size="10" fill="#334155">
          DOM Diff
        </text>
        <text x="350" y="63" text-anchor="middle" font-size="8" fill="#16a34a">
          skip static
        </text>
        <text x="350" y="76" text-anchor="middle" font-size="8" fill="#94a3b8">
          flag-only
        </text>

        <!-- Arrow 4 -->
        <path
          d="M388 58 L408 58"
          stroke="#94a3b8"
          stroke-width="1.5"
          marker-end="url(#arrow-rendering-vue)"
        />

        <!-- Node 5: Targeted Update -->
        <rect
          x="408"
          y="35"
          width="64"
          height="46"
          rx="4"
          fill="#dcfce7"
          stroke="#86efac"
          stroke-width="1"
        />
        <text x="440" y="55" text-anchor="middle" font-size="9" fill="#15803d">
          Targeted
        </text>
        <text x="440" y="68" text-anchor="middle" font-size="9" fill="#15803d">
          Update
        </text>

        <!-- Labels below -->
        <text x="48" y="105" text-anchor="middle" font-size="8" fill="#94a3b8">
          source
        </text>
        <text x="144" y="105" text-anchor="middle" font-size="8" fill="#94a3b8">
          analyze
        </text>
        <text x="247" y="105" text-anchor="middle" font-size="8" fill="#94a3b8">
          optimized IR
        </text>
        <text x="350" y="105" text-anchor="middle" font-size="8" fill="#94a3b8">
          runtime
        </text>
        <text x="440" y="105" text-anchor="middle" font-size="8" fill="#94a3b8">
          DOM
        </text>
      </svg>
    </div>
  </div>
</template>

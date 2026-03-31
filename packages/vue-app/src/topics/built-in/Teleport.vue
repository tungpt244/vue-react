<script setup lang="ts">
import { ref } from 'vue'

const showModal = ref(false)
const showCode = ref(false)

const DEMO_CODE = `<template>
  <button @click="showModal = true">Open Modal</button>

  <!-- Teleport renders to document.body, outside component tree in DOM -->
  <!-- But Vue events still bubble through component tree -->
  <Teleport to="body">
    <div v-if="showModal" class="modal-overlay" @click="showModal = false">
      <div class="modal-content" @click.stop>
        <h2>Modal Content</h2>
        <button @click="showModal = false">Close</button>
      </div>
    </div>
  </Teleport>
</template>`
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">Teleport</h2>

      <p class="text-sm text-slate-500 mb-4">
        Open the modal and inspect the DOM — it renders directly under
        <code class="bg-slate-200 px-1 rounded">&lt;body&gt;</code>, not inside
        this component.
      </p>

      <button
        @click="showModal = true"
        class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
      >
        Open Modal
      </button>

      <Teleport to="body">
        <div
          v-if="showModal"
          class="fixed inset-0 flex items-center justify-center"
          style="background-color: rgba(0, 0, 0, 0.5); z-index: 9999"
          @click="showModal = false"
        >
          <div
            class="bg-white rounded-lg p-6 shadow-xl max-w-sm mx-4"
            @click.stop
          >
            <h2 class="text-lg font-semibold mb-2">Modal via Teleport</h2>
            <p class="text-sm text-slate-600 mb-4">
              This modal is rendered at
              <code class="bg-slate-200 px-1 rounded">document.body</code> —
              check the DOM tree. But Vue events still bubble through the
              component tree.
            </p>
            <button
              @click="showModal = false"
              class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </Teleport>
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
          <strong>Vue &lt;Teleport to="body"&gt; = React createPortal.</strong>
          Cả hai render content tại một DOM node khác — thường là
          <code class="bg-slate-200 px-1 rounded">document.body</code> — nhưng
          giữ nguyên event bubbling trong component tree. Dùng cho modals,
          tooltips, dropdowns để tránh
          <code class="bg-slate-200 px-1 rounded">overflow: hidden</code> clip.
        </p>
        <p>
          <strong>Vue syntax declarative hơn.</strong>
          <code class="bg-slate-200 px-1 rounded"
            >&lt;Teleport to="#modals"&gt;</code
          >
          trong template — tương tự một HTML attribute. React dùng function call
          <code class="bg-slate-200 px-1 rounded"
            >createPortal(children, container)</code
          >
          — phải import từ react-dom.
        </p>
        <p>
          <strong>Cả hai giữ Vue/React event bubbling.</strong> Click event
          trong modal vẫn bubble qua Vue component tree (không phải DOM tree) —
          cho phép parent component catch events dù modal render ở
          <code class="bg-slate-200 px-1 rounded">body</code>.
        </p>
      </div>
    </div>
  </div>
</template>

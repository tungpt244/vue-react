<script setup lang="ts">
import { ref } from 'vue'

const show = ref(true)
const showCode = ref(false)

const DEMO_CODE = `<template>
  <button @click="show = !show">Toggle</button>

  <Transition name="fade">
    <div v-if="show" class="box">
      Animated content
    </div>
  </Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}
</style>`
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">Transition</h2>

      <button
        @click="show = !show"
        class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm mb-4"
      >
        {{ show ? 'Hide' : 'Show' }}
      </button>

      <Transition name="fade">
        <div
          v-if="show"
          class="p-4 bg-blue-50 border border-blue-200 rounded text-blue-800 text-sm"
        >
          Animated box — fade + slide up
        </div>
      </Transition>
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
          <strong>Vue có built-in &lt;Transition&gt; component.</strong> Tự động
          apply CSS classes:
          <code class="bg-slate-200 px-1 rounded">v-enter-from</code>,
          <code class="bg-slate-200 px-1 rounded">v-enter-active</code>,
          <code class="bg-slate-200 px-1 rounded">v-leave-to</code> khi element
          mount/unmount. Declarative và handle cả trường hợp remove khỏi DOM.
        </p>
        <p>
          <strong>React không có built-in transition.</strong> Cách đơn giản
          nhất: CSS transition + className toggle (giữ element trong DOM). Để
          animate khi unmount thật sự cần library như framer-motion hoặc
          react-transition-group.
        </p>
        <p>
          <strong>Vue's approach đơn giản hơn nhiều</strong> cho enter/leave
          animations. Chỉ cần wrap
          <code class="bg-slate-200 px-1 rounded">v-if</code> element trong
          <code class="bg-slate-200 px-1 rounded">&lt;Transition&gt;</code> và
          define CSS classes — Vue làm phần còn lại.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}
</style>

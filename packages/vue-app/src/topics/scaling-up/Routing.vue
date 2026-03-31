<script setup lang="ts">
import { ref } from 'vue'

const currentRoute = ref('/')
const showCode = ref(false)

const routes = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/users/42', label: 'User Profile' },
]

const DEMO_CODE = `// Vue Router setup
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import AboutView from './views/AboutView.vue'
import UserView from './views/UserView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/about', component: AboutView },
    { path: '/users/:id', component: UserView },
  ],
})

// main.ts
app.use(router)

// In component:
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Navigate programmatically:
router.push('/about')
router.push({ path: '/users/42' })

// Template:
// <RouterLink to="/about">About</RouterLink>
// <RouterView />   ← renders matched component`
</script>

<template>
  <div>
    <div class="border border-slate-200 rounded-lg p-4 mb-4">
      <h2 class="text-lg font-semibold mb-3">Routing — Vue Router</h2>

      <p class="text-sm text-slate-500 mb-3">
        Simulated router using
        <code class="bg-slate-200 px-1 rounded">ref</code> — actual Vue Router
        uses <code class="bg-slate-200 px-1 rounded">createRouter</code>
      </p>

      <div class="flex gap-2 flex-wrap mb-4">
        <button
          v-for="route in routes"
          :key="route.path"
          @click="currentRoute = route.path"
          :class="[
            'px-3 py-1 rounded text-sm',
            currentRoute === route.path
              ? 'bg-green-500 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
          ]"
        >
          {{ route.label }}
        </button>
      </div>

      <div class="p-3 bg-green-50 border border-green-200 rounded text-sm">
        <span class="text-green-700 font-medium">Current route:</span>
        <code class="ml-2 text-green-800">{{ currentRoute }}</code>
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
          <strong>Vue Router</strong> dùng JS config array:
          <code class="bg-slate-200 px-1 rounded"
            >routes: [{ path, component }]</code
          >. Setup qua
          <code class="bg-slate-200 px-1 rounded">createRouter()</code> rồi
          <code class="bg-slate-200 px-1 rounded">app.use(router)</code>.
          Template dùng
          <code class="bg-slate-200 px-1 rounded">&lt;RouterLink&gt;</code> và
          <code class="bg-slate-200 px-1 rounded">&lt;RouterView&gt;</code>.
        </p>
        <p>
          <strong>React Router v7</strong> dùng JSX để declare routes:
          <code class="bg-slate-200 px-1 rounded"
            >&lt;Routes&gt;&lt;Route path="..." element={...}
            /&gt;&lt;/Routes&gt;</code
          >. Hooks:
          <code class="bg-slate-200 px-1 rounded">useNavigate()</code>,
          <code class="bg-slate-200 px-1 rounded">useParams()</code>,
          <code class="bg-slate-200 px-1 rounded">useLocation()</code>.
        </p>
        <p>
          <strong>Điểm giống nhau:</strong> Cả hai đều hỗ trợ nested routes,
          dynamic params (<code class="bg-slate-200 px-1 rounded">:id</code>),
          programmatic navigation. Vue có navigation guards ở router-level
          config, React v7 có loaders/actions.
        </p>
      </div>
    </div>
  </div>
</template>

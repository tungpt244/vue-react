import { lazy, Suspense, useState } from 'react'

const DEMO_CODE = `// React — React.lazy() + Suspense for async component loading

// Define the "heavy" component (normally in a separate file)
function HeavyDashboard() {
  return <div>Dashboard loaded!</div>
}

// Wrap with lazy + simulated delay
const LazyDashboard = lazy(
  () => new Promise<{ default: typeof HeavyDashboard }>(resolve =>
    setTimeout(() => resolve({ default: HeavyDashboard }), 1000)
  )
)

// Usage with Suspense:
function App() {
  const [show, setShow] = useState(false)
  return (
    <>
      <button onClick={() => setShow(true)}>Load Dashboard</button>
      {show && (
        <Suspense fallback={<div>Loading...</div>}>
          <LazyDashboard />
        </Suspense>
      )}
    </>
  )
}

// Vue equivalent:
// const AsyncComp = defineAsyncComponent(() => import('./HeavyComp.vue'))
// <Suspense><AsyncComp /></Suspense>`

function HeavyDashboard() {
  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded">
      <h3 className="text-sm font-semibold text-green-800 mb-2">
        Dashboard loaded!
      </h3>
      <p className="text-sm text-green-700">
        Component nặng đã được lazy load thành công. Trong production, đây sẽ là
        một dynamic import() thật sự từ file riêng.
      </p>
    </div>
  )
}

// Lazy with simulated 1s delay
const LazyDashboard = lazy(
  () =>
    new Promise<{ default: typeof HeavyDashboard }>((resolve) =>
      setTimeout(() => resolve({ default: HeavyDashboard }), 1000),
    ),
)

export default function AsyncComponents() {
  const [show, setShow] = useState(false)
  const [loadCount, setLoadCount] = useState(0)
  const [showCode, setShowCode] = useState(false)

  const handleLoad = () => {
    setShow(false)
    setLoadCount((c) => c + 1)
    // Re-mount to trigger fresh lazy load
    setTimeout(() => setShow(true), 50)
  }

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">Async Components</h2>

        <div className="space-y-3">
          <button
            onClick={handleLoad}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Load Heavy Component (1s delay)
          </button>

          {show && (
            <Suspense
              fallback={
                <div className="p-3 bg-slate-100 rounded text-sm text-slate-500 animate-pulse">
                  Loading component... (simulated 1s delay)
                </div>
              }
            >
              <LazyDashboard />
            </Suspense>
          )}

          {loadCount > 0 && !show && (
            <p className="text-xs text-slate-500">
              Đã load {loadCount} lần. Click lại để xem loading state.
            </p>
          )}

          <p className="text-xs text-slate-500">
            <code className="bg-slate-200 px-1 rounded">React.lazy()</code> +{' '}
            <code className="bg-slate-200 px-1 rounded">Suspense</code> —
            loading fallback hiển thị trong khi component đang tải
          </p>
        </div>
      </div>

      <div className="mb-4">
        <button
          onClick={() => setShowCode(!showCode)}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
        >
          {showCode ? '▼ Ẩn code' : '▶ Xem code'}
        </button>
        {showCode && (
          <pre className="mt-2 bg-slate-900 text-slate-100 text-xs p-4 rounded overflow-x-auto">
            <code>{DEMO_CODE}</code>
          </pre>
        )}
      </div>

      <div className="p-4 bg-slate-50 rounded">
        <h3 className="text-sm font-semibold mb-2">So sánh</h3>
        <div className="text-sm text-slate-600 space-y-2">
          <p>
            <strong>React: React.lazy() + Suspense.</strong>{' '}
            <code className="bg-slate-200 px-1 rounded">
              lazy(() =&gt; import('./Component'))
            </code>{' '}
            wrap dynamic import. Suspense cung cấp fallback UI trong khi load.
          </p>
          <p>
            <strong>Vue: defineAsyncComponent().</strong> Import from 'vue'.
            Nhận factory function trả về Promise. Có thể config
            loadingComponent, errorComponent, delay — nhiều option hơn
            React.lazy.
          </p>
          <p>
            <strong>Cả hai đều cần Suspense.</strong> Vue{"'"}s{' '}
            <code className="bg-slate-200 px-1 rounded">{'<Suspense>'}</code> và
            React{"'"}s{' '}
            <code className="bg-slate-200 px-1 rounded">{'<Suspense>'}</code>{' '}
            hoạt động tương tự — wrap async component để cung cấp fallback UI.
          </p>
        </div>
      </div>
    </div>
  )
}

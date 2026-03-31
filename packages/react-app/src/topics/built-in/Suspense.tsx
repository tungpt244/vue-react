import { useState, Suspense, lazy, type ReactElement } from 'react'

const DEMO_CODE = `import { lazy, Suspense } from 'react'

// React.lazy() — lazy load a component
const HeavyComponent = lazy(
  () => new Promise(resolve =>
    setTimeout(() => resolve({
      default: () => <div>Loaded async content!</div>
    }), 1500)
  )
)

function App() {
  const [show, setShow] = useState(false)

  return (
    <>
      <button onClick={() => setShow(true)}>Load Component</button>
      {show && (
        <Suspense fallback={<div>Loading...</div>}>
          <HeavyComponent />
        </Suspense>
      )}
    </>
  )
}`

const AsyncContent = lazy(
  () =>
    new Promise<{ default: () => ReactElement }>((resolve) =>
      setTimeout(
        () =>
          resolve({
            default: () => (
              <div className="p-3 bg-green-50 border border-green-200 rounded text-green-800 text-sm">
                Async component loaded successfully! (simulated 1.5s delay)
              </div>
            ),
          }),
        1500,
      ),
    ),
)

export default function SuspenseTopic() {
  const [showAsync, setShowAsync] = useState(false)
  const [key, setKey] = useState(0)
  const [showCode, setShowCode] = useState(false)

  const reload = () => {
    setShowAsync(false)
    setTimeout(() => {
      setShowAsync(true)
      setKey((k) => k + 1)
    }, 50)
  }

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">Suspense</h2>

        <div className="mb-4">
          <div className="flex gap-2 mb-4">
            {!showAsync ? (
              <button
                onClick={() => setShowAsync(true)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              >
                Load Async Component
              </button>
            ) : (
              <button
                onClick={reload}
                className="px-3 py-1 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 text-sm"
              >
                Reload (see fallback again)
              </button>
            )}
          </div>

          {showAsync && (
            <Suspense
              key={key}
              fallback={
                <div className="p-3 bg-slate-100 rounded text-slate-500 text-sm animate-pulse">
                  Loading... (1.5s simulated delay)
                </div>
              }
            >
              <AsyncContent />
            </Suspense>
          )}
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
            <strong>Cả Vue và React đều có {'<Suspense>'}.</strong> Hiển thị
            fallback content trong khi async operation đang load. Cả hai dùng{' '}
            <code className="bg-slate-200 px-1 rounded">fallback</code> prop
            (React) hoặc{' '}
            <code className="bg-slate-200 px-1 rounded">{'#fallback'}</code>{' '}
            slot (Vue).
          </p>
          <p>
            <strong>React Suspense dùng với React.lazy().</strong> Chủ yếu cho
            code splitting — lazy load component khi cần. React 18+ cũng support
            data fetching với Suspense (qua libraries như React Query, SWR).
          </p>
          <p>
            <strong>Vue Suspense linh hoạt hơn.</strong> Hoạt động với async{' '}
            <code className="bg-slate-200 px-1 rounded">setup()</code> — bất kỳ
            component nào có async setup đều tự động trigger Suspense. Không cần
            wrap riêng như React.lazy(). Vue Suspense cũng handle await trong
            setup() trực tiếp.
          </p>
        </div>
      </div>
    </div>
  )
}

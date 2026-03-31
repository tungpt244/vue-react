import { useState } from 'react'

const DEMO_CODE = `// Custom Hook — reusable stateful logic
function useCounter(initial = 0) {
  const [count, setCount] = useState(initial)
  const increment = () => setCount(c => c + 1)
  const decrement = () => setCount(c => c - 1)
  const reset = () => setCount(initial)
  return { count, increment, decrement, reset }
}

// Usage — reuse the same hook in multiple components
function CounterA() {
  const { count, increment, decrement, reset } = useCounter(0)
  // ...
}

function CounterB() {
  const { count, increment } = useCounter(10) // different initial
  // ...
}`

function useCounter(initial = 0) {
  const [count, setCount] = useState(initial)
  const increment = () => setCount((c) => c + 1)
  const decrement = () => setCount((c) => c - 1)
  const reset = () => setCount(initial)
  return { count, increment, decrement, reset }
}

export default function ComposablesHooks() {
  const counterA = useCounter(0)
  const counterB = useCounter(10)
  const [showCode, setShowCode] = useState(false)

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">Custom Hooks</h2>

        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Counter A (starts at 0)</p>
          <div className="flex items-center gap-3">
            <button
              onClick={counterA.decrement}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              -
            </button>
            <span className="text-2xl font-bold">{counterA.count}</span>
            <button
              onClick={counterA.increment}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              +
            </button>
            <button
              onClick={counterA.reset}
              className="px-3 py-1 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 text-sm"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="mb-2">
          <p className="text-sm font-medium mb-2">Counter B (starts at 10)</p>
          <div className="flex items-center gap-3">
            <button
              onClick={counterB.decrement}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              -
            </button>
            <span className="text-2xl font-bold">{counterB.count}</span>
            <button
              onClick={counterB.increment}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              +
            </button>
            <button
              onClick={counterB.reset}
              className="px-3 py-1 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 text-sm"
            >
              Reset
            </button>
          </div>
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
            <strong>Vue composables = React custom hooks.</strong> Cả hai đều là
            functions bắt đầu bằng{' '}
            <code className="bg-slate-200 px-1 rounded">use</code> — extract
            stateful logic để tái sử dụng. Vue composable dùng{' '}
            <code className="bg-slate-200 px-1 rounded">ref()</code>, React hook
            dùng <code className="bg-slate-200 px-1 rounded">useState()</code>.
          </p>
          <p>
            <strong>Naming convention giống nhau.</strong> Cả Vue và React đều
            dùng prefix <code className="bg-slate-200 px-1 rounded">use</code>{' '}
            (useCounter, useFetch, useLocalStorage). Đây là convention bắt buộc
            trong React (rules of hooks), và best practice trong Vue.
          </p>
          <p>
            <strong>Isolation.</strong> Mỗi lần gọi hook/composable tạo ra một
            instance state độc lập — counterA và counterB ở trên có state riêng
            dù cùng dùng{' '}
            <code className="bg-slate-200 px-1 rounded">useCounter</code>.
          </p>
        </div>
      </div>
    </div>
  )
}

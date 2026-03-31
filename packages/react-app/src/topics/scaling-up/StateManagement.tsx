import { useState, useMemo } from 'react'

const DEMO_CODE = `// Zustand store
import { create } from 'zustand'

interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))

// In any component — no Provider needed:
function Counter() {
  const { count, increment, decrement, reset } = useCounterStore()

  return (
    <div>
      <p>Count: {count}</p>
      <p>Double: {count * 2}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>−</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

// Shared state: multiple components call useCounterStore()
// and they all share the same state — no Context needed.`

export default function StateManagement() {
  // Simulate Zustand store with useState
  const [count, setCount] = useState(0)
  const double = useMemo(() => count * 2, [count])
  const [showCode, setShowCode] = useState(false)

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">
          State Management — Zustand
        </h2>

        <p className="text-sm text-slate-500 mb-3">
          Simulated Zustand store — dùng{' '}
          <code className="bg-slate-200 px-1 rounded">useState</code> +{' '}
          <code className="bg-slate-200 px-1 rounded">useMemo</code> như API
          thực của Zustand
        </p>

        <div className="p-3 bg-purple-50 border border-purple-200 rounded mb-4">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-sm text-purple-700">
              count: <strong>{count}</strong>
            </span>
            <span className="text-sm text-purple-700">
              double: <strong>{double}</strong>
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCount((c) => c - 1)}
              className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
            >
              −
            </button>
            <button
              onClick={() => setCount((c) => c + 1)}
              className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
            >
              +
            </button>
            <button
              onClick={() => setCount(0)}
              className="px-3 py-1 bg-slate-300 text-slate-700 rounded text-sm hover:bg-slate-400"
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
            <strong>Zustand</strong> dùng{' '}
            <code className="bg-slate-200 px-1 rounded">create()</code> trả về
            một hook — gọi{' '}
            <code className="bg-slate-200 px-1 rounded">useStore()</code> trong
            bất kỳ component nào. Không cần Provider wrapper. Lightweight và
            minimal boilerplate.
          </p>
          <p>
            <strong>Pinia (Vue)</strong> dùng{' '}
            <code className="bg-slate-200 px-1 rounded">defineStore()</code> trả
            về composable-like API. State là plain{' '}
            <code className="bg-slate-200 px-1 rounded">ref()</code> và{' '}
            <code className="bg-slate-200 px-1 rounded">computed()</code>. Cũng
            không cần Provider.
          </p>
          <p>
            <strong>Điểm khác biệt:</strong> Vuex đã deprecated, thay bằng
            Pinia. Redux Toolkit vẫn phổ biến trong React enterprise nhưng nặng
            hơn Zustand. Cả Zustand lẫn Pinia đều không cần Provider — lợi thế
            lớn so với Context API/Provider pattern.
          </p>
        </div>
      </div>
    </div>
  )
}

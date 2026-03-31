import { useState, useEffect, useRef } from 'react'

const DEMO_CODE = `// React: no directive system — use custom hook instead
function useAutoFocus(ref: React.RefObject<HTMLInputElement>) {
  useEffect(() => {
    ref.current?.focus()
  }, []) // runs once on mount
}

// Usage
function MyComponent() {
  const inputRef = useRef<HTMLInputElement>(null)
  useAutoFocus(inputRef)
  return <input ref={inputRef} placeholder="Auto-focused on mount" />
}

// Vue equivalent (for comparison):
// const vFocus = { mounted: (el: HTMLElement) => el.focus() }
// <input v-focus />`

function useAutoFocus(ref: React.RefObject<HTMLInputElement | null>) {
  useEffect(() => {
    ref.current?.focus()
  }, [ref])
}

export default function CustomDirectives() {
  const [showInput, setShowInput] = useState(true)
  const [showCode, setShowCode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useAutoFocus(inputRef)

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">
          Custom Directives → Hooks
        </h2>

        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Auto-focus demo</p>
          <p className="text-xs text-slate-500 mb-3">
            Toggle input off/on — it re-mounts and auto-focuses via{' '}
            <code className="bg-slate-200 px-1 rounded">useAutoFocus</code>
          </p>
          <button
            onClick={() => setShowInput((v) => !v)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm mb-3"
          >
            {showInput ? 'Hide Input' : 'Show Input'}
          </button>
          {showInput && <AutoFocusInput />}
        </div>

        <div>
          <p className="text-xs text-slate-500">
            Initial input above also has auto-focus via hook (page load)
          </p>
          <input
            ref={inputRef}
            placeholder="Auto-focused on mount..."
            className="border border-slate-300 rounded px-2 py-1 text-sm w-full mt-2"
          />
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
            <strong>Vue custom directives gắn behavior vào DOM element.</strong>{' '}
            <code className="bg-slate-200 px-1 rounded">v-focus</code>,{' '}
            <code className="bg-slate-200 px-1 rounded">v-tooltip</code>,{' '}
            <code className="bg-slate-200 px-1 rounded">v-click-outside</code> —
            dùng trực tiếp trong template như attribute HTML. Rất tiện và
            declarative.
          </p>
          <p>
            <strong>React không có directive system.</strong> Thay vào đó dùng
            custom hook +{' '}
            <code className="bg-slate-200 px-1 rounded">useRef</code> để access
            DOM, kết hợp{' '}
            <code className="bg-slate-200 px-1 rounded">useEffect</code> để chạy
            side effects khi mount/unmount. Verbose hơn nhưng explicit hơn.
          </p>
          <p>
            <strong>Vue directives là Vue-only syntactic sugar</strong> để
            manipulate DOM trong template. React muốn bạn làm mọi thứ qua JS
            functions (hooks) — không có magic attribute nào.
          </p>
        </div>
      </div>
    </div>
  )
}

function AutoFocusInput() {
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => {
    ref.current?.focus()
  }, [])
  return (
    <input
      ref={ref}
      placeholder="Re-mounted — auto-focused!"
      className="border border-green-400 rounded px-2 py-1 text-sm w-full"
    />
  )
}

import { useState } from 'react'

const DEMO_CODE = `// React: CSS transition + className toggle
// No built-in <Transition> — use Tailwind classes

function MyComponent() {
  const [show, setShow] = useState(true)

  return (
    <>
      <button onClick={() => setShow(!show)}>Toggle</button>
      <div
        className={\`transition-all duration-300 \${
          show
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }\`}
      >
        Content
      </div>
    </>
  )
}

// Note: this keeps element in DOM.
// To actually remove: use conditional rendering + CSS animation events
// or a library like framer-motion for enter/leave animations.`

export default function Transition() {
  const [show, setShow] = useState(true)
  const [showCode, setShowCode] = useState(false)

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">Transition</h2>

        <div className="mb-4">
          <button
            onClick={() => setShow((v) => !v)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm mb-4"
          >
            {show ? 'Hide' : 'Show'}
          </button>

          <div
            className={`transition-all duration-300 ${
              show
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}
          >
            <div className="p-4 bg-blue-50 border border-blue-200 rounded text-blue-800 text-sm">
              Animated box — fade + slide up
            </div>
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
            <strong>Vue có built-in {'<Transition>'} component.</strong> Tự động
            apply CSS classes:{' '}
            <code className="bg-slate-200 px-1 rounded">v-enter-from</code>,{' '}
            <code className="bg-slate-200 px-1 rounded">v-enter-active</code>,{' '}
            <code className="bg-slate-200 px-1 rounded">v-leave-to</code> khi
            element mount/unmount. Declarative và handle cả trường hợp remove
            khỏi DOM.
          </p>
          <p>
            <strong>React không có built-in transition.</strong> Cách đơn giản
            nhất: CSS transition + className toggle (giữ element trong DOM). Để
            animate khi unmount thật sự cần library như framer-motion hoặc
            react-transition-group.
          </p>
          <p>
            <strong>Vue{"'"}s approach đơn giản hơn nhiều</strong> cho
            enter/leave animations. React cần thêm effort hoặc library.
            TailwindCSS giúp React side tiện hơn với utility classes như{' '}
            <code className="bg-slate-200 px-1 rounded">transition-all</code>,{' '}
            <code className="bg-slate-200 px-1 rounded">duration-300</code>.
          </p>
        </div>
      </div>
    </div>
  )
}

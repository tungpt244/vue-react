import { useState, useRef } from 'react'

const DEMO_CODE = `// React: component function re-executes on every setState

function Counter() {
  const [count, setCount] = useState(0)
  const renderCount = useRef(0)
  renderCount.current++ // increments on every render

  // Every state change runs this entire function body again:
  // - All variable declarations re-evaluated
  // - All hooks re-run (useState, useEffect, useMemo...)
  // - Entire JSX tree returned and diffed by Reconciler

  return (
    <div>
      <p>Component fn called: {renderCount.current} times</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
    </div>
  )
}

// React Fiber reconciler then diffs returned JSX against
// previous render — no compile-time optimization,
// all nodes traversed at runtime.`

export default function RenderingMechanism() {
  const [count, setCount] = useState(0)
  const renderCount = useRef(0)
  const [showCode, setShowCode] = useState(false)

  // This runs on every render — including the initial
  renderCount.current++

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">Rendering Mechanism</h2>

        <p className="text-xs text-slate-500 mb-3">
          Mỗi khi state thay đổi, toàn bộ component function chạy lại. Render
          count tăng mỗi lần{' '}
          <code className="bg-slate-100 px-1 rounded">setState</code> được gọi.
        </p>

        <div className="flex items-center gap-4 mb-3 flex-wrap">
          <button
            onClick={() => setCount((c) => c + 1)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Increment
          </button>
          <div className="text-sm text-slate-600">
            Count:{' '}
            <span className="font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-700">
              {count}
            </span>
          </div>
        </div>

        <div className="text-xs bg-amber-50 border border-amber-200 rounded p-3 space-y-1">
          <div className="flex justify-between">
            <span className="text-slate-500">Component fn called:</span>
            <span className="font-mono font-bold text-amber-700">
              {renderCount.current}x
            </span>
          </div>
          <div className="text-amber-600 text-xs">
            ↑ entire function body re-executes each time
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

      <div className="p-4 bg-slate-50 rounded mb-4">
        <h3 className="text-sm font-semibold mb-2">So sánh</h3>
        <div className="text-sm text-slate-600 space-y-2">
          <p>
            <strong>
              React's Reconciler (Fiber) re-execute component function
            </strong>{' '}
            mỗi khi state thay đổi. Toàn bộ function body chạy lại, trả về JSX
            tree mới, rồi Reconciler diff với previous tree. Không có
            compile-time optimization.
          </p>
          <p>
            <strong>Vue compiler phân tích template lúc build.</strong> Chỉ
            những dynamic nodes có patch flags mới được diff. Static content
            được hoist ra ngoài, không bao giờ re-evaluated. Targeted update,
            không phải full subtree.
          </p>
          <p>
            <strong>React compensates</strong> bằng Fiber scheduler (ưu tiên
            urgent updates), concurrent mode, và{' '}
            <code className="bg-slate-200 px-1 rounded">useMemo</code> /{' '}
            <code className="bg-slate-200 px-1 rounded">React.memo</code> để
            skip expensive computations.
          </p>
        </div>
      </div>

      <div className="border border-slate-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold mb-4">
          Diagram: React Full Subtree Re-render
        </h3>
        <svg
          viewBox="0 0 480 120"
          className="w-full h-auto"
          aria-label="React full subtree re-render flow diagram"
        >
          <defs>
            <marker
              id="arrow-rendering-react"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8" />
            </marker>
          </defs>

          {/* Node 1: setState() */}
          <rect
            x="10"
            y="40"
            width="76"
            height="36"
            rx="4"
            fill="#fee2e2"
            stroke="#fca5a5"
            strokeWidth="1"
          />
          <text x="48" y="57" textAnchor="middle" fontSize="10" fill="#334155">
            setState()
          </text>
          <text x="48" y="70" textAnchor="middle" fontSize="8" fill="#ef4444">
            triggers render
          </text>

          {/* Arrow 1 */}
          <path
            d="M86 58 L106 58"
            stroke="#94a3b8"
            strokeWidth="1.5"
            markerEnd="url(#arrow-rendering-react)"
          />

          {/* Node 2: Component fn() */}
          <rect
            x="106"
            y="28"
            width="90"
            height="58"
            rx="4"
            fill="#fef9c3"
            stroke="#fde047"
            strokeWidth="1"
          />
          <text x="151" y="50" textAnchor="middle" fontSize="10" fill="#334155">
            Component fn()
          </text>
          <text x="151" y="63" textAnchor="middle" fontSize="8" fill="#ca8a04">
            entire function
          </text>
          <text x="151" y="76" textAnchor="middle" fontSize="8" fill="#ca8a04">
            re-executes
          </text>

          {/* Arrow 2 */}
          <path
            d="M196 58 L216 58"
            stroke="#94a3b8"
            strokeWidth="1.5"
            markerEnd="url(#arrow-rendering-react)"
          />

          {/* Node 3: New JSX Tree */}
          <rect
            x="216"
            y="40"
            width="80"
            height="36"
            rx="4"
            fill="#f1f5f9"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
          <text x="256" y="57" textAnchor="middle" fontSize="9" fill="#334155">
            New JSX Tree
          </text>
          <text x="256" y="70" textAnchor="middle" fontSize="8" fill="#94a3b8">
            returned
          </text>

          {/* Arrow 3 */}
          <path
            d="M296 58 L316 58"
            stroke="#94a3b8"
            strokeWidth="1.5"
            markerEnd="url(#arrow-rendering-react)"
          />

          {/* Node 4: Reconciler */}
          <rect
            x="316"
            y="28"
            width="90"
            height="58"
            rx="4"
            fill="#fef9c3"
            stroke="#fde047"
            strokeWidth="1"
          />
          <text x="361" y="50" textAnchor="middle" fontSize="9" fill="#334155">
            Reconciler
          </text>
          <text x="361" y="63" textAnchor="middle" fontSize="8" fill="#ca8a04">
            diffs all nodes
          </text>
          <text x="361" y="76" textAnchor="middle" fontSize="8" fill="#ca8a04">
            full subtree
          </text>

          {/* Arrow 4 */}
          <path
            d="M406 58 L426 58"
            stroke="#94a3b8"
            strokeWidth="1.5"
            markerEnd="url(#arrow-rendering-react)"
          />

          {/* Node 5: DOM Update */}
          <rect
            x="426"
            y="40"
            width="48"
            height="36"
            rx="4"
            fill="#f1f5f9"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
          <text x="450" y="57" textAnchor="middle" fontSize="9" fill="#334155">
            DOM
          </text>
          <text x="450" y="70" textAnchor="middle" fontSize="8" fill="#94a3b8">
            update
          </text>

          {/* Labels below */}
          <text x="48" y="105" textAnchor="middle" fontSize="8" fill="#94a3b8">
            trigger
          </text>
          <text x="151" y="105" textAnchor="middle" fontSize="8" fill="#ca8a04">
            ⚠ all re-runs
          </text>
          <text x="256" y="105" textAnchor="middle" fontSize="8" fill="#94a3b8">
            virtual DOM
          </text>
          <text x="361" y="105" textAnchor="middle" fontSize="8" fill="#ca8a04">
            ⚠ all traversed
          </text>
        </svg>
      </div>
    </div>
  )
}

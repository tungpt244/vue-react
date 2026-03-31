import { useState, useRef } from 'react'

const DEMO_CODE = `// React: immutable state + explicit setter
// No Proxy, no automatic tracking

function ReactivityDemo() {
  const [name, setName] = useState('React')
  const [version, setVersion] = useState(19)

  // No automatic dependency tracking.
  // You must explicitly call the setter function.
  // Calling setter queues a full component re-render.

  return (
    <div>
      <button onClick={() => setName(n => n === 'React' ? 'React 19' : 'React')}>
        Toggle name
      </button>
      <button onClick={() => setVersion(v => v + 1)}>
        Increment version
      </button>

      {/* React can't know WHICH state changed automatically.
          Any setState → entire component re-renders. */}
      <p>{name} v{version}</p>
    </div>
  )
}

// Derived values require explicit useMemo:
const display = useMemo(
  () => \`\${name} v\${version}\`, // ← must list deps manually
  [name, version]             // ← stale if you forget one
)`

export default function ReactivityInDepth() {
  const [name, setName] = useState('React')
  const [version, setVersion] = useState(19)
  const [showCode, setShowCode] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  const renderCount = useRef(0)

  renderCount.current++

  function toggleName() {
    const next = name === 'React' ? 'React 19' : 'React'
    setName(next)
    setLogs((prev) => [
      ...prev,
      `setState(name) called → full re-render #${renderCount.current + 1}`,
    ])
  }

  function incrementVersion() {
    setVersion((v) => v + 1)
    setLogs((prev) => [
      ...prev,
      `setState(version) called → full re-render #${renderCount.current + 1}`,
    ])
  }

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">Reactivity In-Depth</h2>

        <p className="text-xs text-slate-500 mb-3">
          React state là immutable value. Mỗi lần gọi setter → full re-render.
          Không có automatic tracking như Vue Proxy.
        </p>

        <div className="flex gap-2 mb-3 flex-wrap">
          <button
            onClick={toggleName}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Toggle name
          </button>
          <button
            onClick={incrementVersion}
            className="px-3 py-1 bg-violet-500 text-white rounded hover:bg-violet-600 text-sm"
          >
            Increment version
          </button>
          <button
            onClick={() => setLogs([])}
            className="px-3 py-1 bg-slate-400 text-white rounded hover:bg-slate-500 text-sm"
          >
            Clear
          </button>
        </div>

        <div className="bg-slate-900 rounded p-3 font-mono text-xs h-32 overflow-y-auto">
          {logs.length === 0 ? (
            <span className="text-slate-500">— Log sẽ hiện ở đây —</span>
          ) : (
            logs.map((log, i) => (
              <div key={i} className="text-green-400">
                {log}
              </div>
            ))
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

      <div className="p-4 bg-slate-50 rounded mb-4">
        <h3 className="text-sm font-semibold mb-2">So sánh</h3>
        <div className="text-sm text-slate-600 space-y-2">
          <p>
            <strong>React state là immutable snapshot.</strong>{' '}
            <code className="bg-slate-200 px-1 rounded">useState</code> trả về
            value hiện tại + setter function. Không có Proxy, không có automatic
            tracking. Muốn update → gọi setter → toàn bộ component re-render.
          </p>
          <p>
            <strong>Vue wrap object trong Proxy.</strong> Get trap tự động
            record effect nào đang access property. Set trap trigger đúng những
            effects đó. Fine-grained, không cần khai báo dependency.
          </p>
          <p>
            <strong>React's explicit model dễ predict hơn</strong> — bạn biết
            chính xác khi nào re-render. Tradeoff là cần
            <code className="bg-slate-200 px-1 rounded">useMemo</code> với
            dependency array thủ công, dễ bị stale nếu quên khai báo dep.
          </p>
        </div>
      </div>

      <div className="border border-slate-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold mb-4">
          Diagram: Immutable State + Setter
        </h3>
        <svg
          viewBox="0 0 460 120"
          className="w-full h-auto"
          aria-label="React immutable state and setter flow diagram"
        >
          <defs>
            <marker
              id="arrow-reactivity-react"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8" />
            </marker>
          </defs>

          {/* Node 1: useState(init) */}
          <rect
            x="10"
            y="40"
            width="80"
            height="36"
            rx="4"
            fill="#f1f5f9"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
          <text x="50" y="57" textAnchor="middle" fontSize="9" fill="#334155">
            useState(init)
          </text>
          <text x="50" y="70" textAnchor="middle" fontSize="8" fill="#94a3b8">
            hook
          </text>

          {/* Arrow 1 */}
          <path
            d="M90 58 L112 58"
            stroke="#94a3b8"
            strokeWidth="1.5"
            markerEnd="url(#arrow-reactivity-react)"
          />

          {/* Node 2: [value, setter] */}
          <rect
            x="112"
            y="40"
            width="80"
            height="36"
            rx="4"
            fill="#f1f5f9"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
          <text x="152" y="55" textAnchor="middle" fontSize="9" fill="#334155">
            [value,
          </text>
          <text x="152" y="68" textAnchor="middle" fontSize="9" fill="#334155">
            setter]
          </text>

          {/* Arrow 2 */}
          <path
            d="M192 58 L214 58"
            stroke="#94a3b8"
            strokeWidth="1.5"
            markerEnd="url(#arrow-reactivity-react)"
          />

          {/* Node 3: setter(newVal) */}
          <rect
            x="214"
            y="40"
            width="80"
            height="36"
            rx="4"
            fill="#fee2e2"
            stroke="#fca5a5"
            strokeWidth="1"
          />
          <text x="254" y="55" textAnchor="middle" fontSize="9" fill="#334155">
            setter(newVal)
          </text>
          <text x="254" y="68" textAnchor="middle" fontSize="8" fill="#ef4444">
            explicit call
          </text>

          {/* Arrow 3 */}
          <path
            d="M294 58 L316 58"
            stroke="#94a3b8"
            strokeWidth="1.5"
            markerEnd="url(#arrow-reactivity-react)"
          />

          {/* Node 4: Component re-render */}
          <rect
            x="316"
            y="28"
            width="88"
            height="58"
            rx="4"
            fill="#fef9c3"
            stroke="#fde047"
            strokeWidth="1"
          />
          <text x="360" y="48" textAnchor="middle" fontSize="9" fill="#334155">
            Component
          </text>
          <text x="360" y="61" textAnchor="middle" fontSize="9" fill="#ca8a04">
            re-render
          </text>
          <text x="360" y="74" textAnchor="middle" fontSize="8" fill="#ca8a04">
            full
          </text>

          {/* Arrow 4 */}
          <path
            d="M404 58 L424 58"
            stroke="#94a3b8"
            strokeWidth="1.5"
            markerEnd="url(#arrow-reactivity-react)"
          />

          {/* Node 5: All children */}
          <rect
            x="424"
            y="28"
            width="28"
            height="58"
            rx="4"
            fill="#fef9c3"
            stroke="#fde047"
            strokeWidth="1"
          />
          <text
            x="438"
            y="51"
            textAnchor="middle"
            fontSize="8"
            fill="#ca8a04"
            transform="rotate(-90, 438, 58)"
          >
            all children
          </text>

          {/* Labels below */}
          <text x="50" y="105" textAnchor="middle" fontSize="8" fill="#94a3b8">
            init
          </text>
          <text x="152" y="105" textAnchor="middle" fontSize="8" fill="#94a3b8">
            destructure
          </text>
          <text x="254" y="105" textAnchor="middle" fontSize="8" fill="#ef4444">
            ← manual call
          </text>
          <text x="360" y="105" textAnchor="middle" fontSize="8" fill="#ca8a04">
            ⚠ full subtree
          </text>
        </svg>
      </div>
    </div>
  )
}

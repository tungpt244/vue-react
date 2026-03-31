import { useState, useRef, memo } from 'react'

const DEMO_CODE = `import { useState, useRef, memo } from 'react'

// Without memo: re-renders every time parent state changes
function ChildNoMemo({ label }: { label: string }) {
  const renders = useRef(0)
  renders.current++
  return <div>Child (no memo) — renders: {renders.current}</div>
}

// With memo: skips re-render if props are unchanged
const ChildWithMemo = memo(function ChildWithMemo({ label }: { label: string }) {
  const renders = useRef(0)
  renders.current++
  return <div>Child (memo) — renders: {renders.current}</div>
})

function Parent() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Increment parent: {count}
      </button>
      {/* Re-renders every time: */}
      <ChildNoMemo label="static" />
      {/* Skips re-render (props unchanged): */}
      <ChildWithMemo label="static" />
    </div>
  )
}`

// Child WITHOUT memo — re-renders every time parent state changes
function ChildNoMemo({ label }: { label: string }) {
  const renders = useRef(0)
  renders.current++
  return (
    <div className="text-xs bg-red-50 border border-red-200 rounded p-2 text-red-700">
      <span className="font-medium">{label} (no memo):</span> render count ={' '}
      <span className="font-bold">{renders.current}</span>
      {renders.current > 1 && (
        <span className="ml-2 text-red-500">
          re-rendered {renders.current - 1}x
        </span>
      )}
    </div>
  )
}

// Child WITH React.memo — skips re-render when props unchanged
const ChildWithMemo = memo(function ChildWithMemo({
  label,
}: {
  label: string
}) {
  const renders = useRef(0)
  renders.current++
  return (
    <div className="text-xs bg-green-50 border border-green-200 rounded p-2 text-green-700">
      <span className="font-medium">{label} (memo):</span> render count ={' '}
      <span className="font-bold">{renders.current}</span>
      <span className="ml-2 text-green-600">✓ props unchanged, skipped</span>
    </div>
  )
})

export default function RerenderOptimization() {
  const [count, setCount] = useState(0)
  const [showCode, setShowCode] = useState(false)

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">Re-render & Optimization</h2>

        <p className="text-xs text-slate-500 mb-3">
          Click "Increment parent" — child without{' '}
          <code className="bg-slate-100 px-1 rounded">React.memo</code>{' '}
          re-renders, child với memo thì skip (props không đổi).
        </p>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCount((c) => c + 1)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              Increment parent
            </button>
            <span className="text-sm font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700">
              parentCount = {count}
            </span>
          </div>

          <ChildNoMemo label="Child A" />
          <ChildWithMemo label="Child B" />
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
            <strong>React re-render TẤT CẢ children</strong> khi parent state
            thay đổi — đây là default behavior. Để opt-out, bạn phải wrap
            component trong{' '}
            <code className="bg-slate-200 px-1 rounded">React.memo()</code>,
            dùng <code className="bg-slate-200 px-1 rounded">useMemo()</code>{' '}
            cho expensive computations, và{' '}
            <code className="bg-slate-200 px-1 rounded">useCallback()</code> cho
            stable function references.
          </p>
          <p>
            <strong>Vue components chỉ re-render</strong> khi reactive
            dependencies của chính nó thay đổi. Không cần{' '}
            <code className="bg-slate-200 px-1 rounded">memo()</code> —
            optimization này là mặc định từ reactivity system.
          </p>
          <p>
            <strong>React Compiler (experimental, 2024+)</strong> đang được phát
            triển để tự động hóa memoization. Khi stable, React sẽ gần hơn với
            Vue's auto-optimization model.
          </p>
        </div>
      </div>

      <div className="border border-slate-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold mb-4">
          Diagram: Manual Optimization with React.memo
        </h3>
        <svg
          viewBox="0 0 440 160"
          className="w-full h-auto"
          aria-label="React manual optimization with memo diagram"
        >
          <defs>
            <marker
              id="arrow-rerender-react"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8" />
            </marker>
          </defs>

          {/* Parent node */}
          <rect
            x="10"
            y="60"
            width="100"
            height="40"
            rx="4"
            fill="#dbeafe"
            stroke="#93c5fd"
            strokeWidth="1"
          />
          <text x="60" y="77" textAnchor="middle" fontSize="10" fill="#334155">
            Parent
          </text>
          <text x="60" y="90" textAnchor="middle" fontSize="8" fill="#60a5fa">
            state changes
          </text>

          {/* Arrow to Child A (up) */}
          <path
            d="M110 70 L170 42"
            stroke="#94a3b8"
            strokeWidth="1.5"
            markerEnd="url(#arrow-rerender-react)"
          />
          {/* label: re-render */}
          <text x="148" y="50" textAnchor="middle" fontSize="8" fill="#ef4444">
            re-render
          </text>

          {/* Arrow to Child B (down) */}
          <path
            d="M110 90 L170 118"
            stroke="#94a3b8"
            strokeWidth="1.5"
            markerEnd="url(#arrow-rerender-react)"
          />

          {/* Child A: no memo */}
          <rect
            x="170"
            y="22"
            width="110"
            height="40"
            rx="4"
            fill="#fee2e2"
            stroke="#fca5a5"
            strokeWidth="1"
          />
          <text x="225" y="39" textAnchor="middle" fontSize="9" fill="#334155">
            Child A (no memo)
          </text>
          <text x="225" y="52" textAnchor="middle" fontSize="8" fill="#ef4444">
            always re-renders ↻
          </text>

          {/* Diamond: memo check */}
          <polygon
            points="225,100 255,120 225,140 195,120"
            fill="#fef9c3"
            stroke="#fde047"
            strokeWidth="1"
          />
          <text x="225" y="117" textAnchor="middle" fontSize="8" fill="#92400e">
            memo?
          </text>
          <text x="225" y="128" textAnchor="middle" fontSize="7" fill="#92400e">
            props same?
          </text>

          {/* Arrow from diamond: YES → skip */}
          <path
            d="M255 120 L310 120"
            stroke="#94a3b8"
            strokeWidth="1.5"
            markerEnd="url(#arrow-rerender-react)"
          />
          <text x="280" y="115" textAnchor="middle" fontSize="8" fill="#16a34a">
            YES
          </text>

          {/* Child B: with memo */}
          <rect
            x="310"
            y="98"
            width="110"
            height="44"
            rx="4"
            fill="#dcfce7"
            stroke="#86efac"
            strokeWidth="1"
          />
          <text x="365" y="116" textAnchor="middle" fontSize="9" fill="#334155">
            Child B (memo)
          </text>
          <text x="365" y="129" textAnchor="middle" fontSize="8" fill="#15803d">
            props same → SKIP ✓
          </text>

          {/* Arrow left of diamond: NO → re-render */}
          <path
            d="M195 120 L160 120 L160 80 L165 80"
            stroke="#ef4444"
            strokeWidth="1.5"
            markerEnd="url(#arrow-rerender-react)"
            fill="none"
          />
          <text x="175" y="110" textAnchor="middle" fontSize="8" fill="#ef4444">
            NO
          </text>
        </svg>
      </div>
    </div>
  )
}

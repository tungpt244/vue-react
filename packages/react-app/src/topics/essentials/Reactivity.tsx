import { useState } from 'react'

const DEMO_CODE = `// React — useState
const [count, setCount] = useState(0)
const [name, setName] = useState('')

// State là immutable — phải dùng setter
setCount(c => c + 1)     // ✓
// count++                // ✗ không trigger re-render

// Input: controlled component
<input value={name} onChange={e => setName(e.target.value)} />
// Phải bind cả value + onChange thủ công`

export default function Reactivity() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [showCode, setShowCode] = useState(false)

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">Reactivity</h2>

        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Counter</p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCount((c) => c - 1)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              -
            </button>
            <span className="text-2xl font-bold">{count}</span>
            <button
              onClick={() => setCount((c) => c + 1)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              +
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Live Form</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên..."
            className="border border-slate-300 rounded px-2 py-1 text-sm w-full"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email..."
            className="border border-slate-300 rounded px-2 py-1 text-sm w-full"
          />
          <p className="text-sm text-slate-600">
            Hello, <strong>{name || '(chưa nhập)'}</strong>
            {email && ` — ${email}`}
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
          <pre className="mt-2 bg-slate-900 text-slate-100 text-xs p-3 rounded overflow-x-auto">
            <code>{DEMO_CODE}</code>
          </pre>
        )}
      </div>

      <div className="p-4 bg-slate-50 rounded">
        <h3 className="text-sm font-semibold mb-2">So sánh</h3>
        <div className="text-sm text-slate-600 space-y-2">
          <p>
            <strong>useState trả về [value, setter].</strong> State là immutable
            — phải gọi setter với giá trị mới, direct mutation (
            <code className="bg-slate-200 px-1 rounded">count++</code>) sẽ không
            trigger re-render. Mỗi lần gọi setter → component re-render toàn bộ.
          </p>
          <p>
            <strong>Controlled components.</strong> Input cần bind cả{' '}
            <code className="bg-slate-200 px-1 rounded">value</code> +{' '}
            <code className="bg-slate-200 px-1 rounded">onChange</code> thủ
            công. Vue có{' '}
            <code className="bg-slate-200 px-1 rounded">v-model</code> là
            syntactic sugar làm điều tương tự — React bắt buộc viết explicit.
          </p>
          <p>
            <strong>Không có .value.</strong> Truy cập state trực tiếp (không
            cần <code className="bg-slate-200 px-1 rounded">.value</code> như
            Vue ref). Nhưng cũng không có{' '}
            <code className="bg-slate-200 px-1 rounded">reactive()</code> cho
            object — phải dùng nhiều{' '}
            <code className="bg-slate-200 px-1 rounded">useState</code> hoặc{' '}
            <code className="bg-slate-200 px-1 rounded">useReducer</code> cho
            state phức tạp.
          </p>
        </div>
      </div>
    </div>
  )
}

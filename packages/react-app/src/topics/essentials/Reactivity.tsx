import { useState } from 'react'

export default function Reactivity() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">Reactivity</h2>

        {/* Counter */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Counter</p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCount(c => c - 1)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              -
            </button>
            <span className="text-2xl font-bold">{count}</span>
            <button
              onClick={() => setCount(c => c + 1)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              +
            </button>
          </div>
        </div>

        {/* Form with live binding */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Live Form</p>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Nhập tên..."
            className="border border-slate-300 rounded px-2 py-1 text-sm w-full"
          />
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Nhập email..."
            className="border border-slate-300 rounded px-2 py-1 text-sm w-full"
          />
          <p className="text-sm text-slate-600">
            Hello, <strong>{name || '(chưa nhập)'}</strong>
            {email && ` — ${email}`}
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-slate-50 rounded">
        <h3 className="text-sm font-semibold mb-2">Key Differences</h3>
        <p className="text-sm text-slate-600 mb-2">
          React dùng <code className="bg-slate-200 px-1 rounded">useState</code> trả về tuple{' '}
          <code className="bg-slate-200 px-1 rounded">[value, setter]</code>. State là immutable —
          phải gọi setter với giá trị mới, direct mutation sẽ không trigger re-render.
        </p>
        <p className="text-sm text-slate-600">
          Mỗi lần gọi setter, component re-renders. Không có{' '}
          <code className="bg-slate-200 px-1 rounded">.value</code> — truy cập state trực tiếp.
          Input cần <code className="bg-slate-200 px-1 rounded">value</code> +{' '}
          <code className="bg-slate-200 px-1 rounded">onChange</code> để tạo controlled component.
        </p>
      </div>
    </div>
  )
}

import { useState } from 'react'

const DEMO_CODE = `// React — callback props for child-to-parent communication
function ChildButton({ onIncrement }: { onIncrement: () => void }) {
  return (
    <button onClick={onIncrement}>
      Increment (from child)
    </button>
  )
}

// Parent:
const [count, setCount] = useState(0)
<ChildButton onIncrement={() => setCount(c => c + 1)} />

// Vue equivalent:
// defineEmits<{ increment: [] }>()
// emit('increment') — event naming convention`

function ChildButton({ onIncrement }: { onIncrement: () => void }) {
  return (
    <button
      onClick={onIncrement}
      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
    >
      Increment (from child)
    </button>
  )
}

export default function EventsCallbacks() {
  const [count, setCount] = useState(0)
  const [showCode, setShowCode] = useState(false)

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">Events / Callbacks</h2>

        <div className="mb-4">
          <p className="text-sm text-slate-600 mb-3">
            Parent counter:{' '}
            <span className="text-2xl font-bold text-blue-600">{count}</span>
          </p>
          <ChildButton onIncrement={() => setCount((c) => c + 1)} />
          <button
            onClick={() => setCount(0)}
            className="ml-2 px-3 py-1 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 text-sm"
          >
            Reset
          </button>
        </div>

        <p className="text-xs text-slate-500">
          Child gọi callback → Parent state thay đổi
        </p>
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
            <strong>React truyền function như prop.</strong> Không có event
            system — chỉ là callback function. Convention đặt tên{' '}
            <code className="bg-slate-200 px-1 rounded">on*</code> (onIncrement,
            onChange, onClick).
          </p>
          <p>
            <strong>Vue dùng defineEmits + emit().</strong>{' '}
            <code className="bg-slate-200 px-1 rounded">
              {'defineEmits<{ increment: [] }>()'}
            </code>{' '}
            rồi{' '}
            <code className="bg-slate-200 px-1 rounded">emit('increment')</code>
            . Vue có event naming convention (kebab-case).
          </p>
          <p>
            <strong>React explicit hơn Vue.</strong> React không có event bus —
            data flow một chiều rõ ràng. Vue emit có thể truyền data kèm theo.
          </p>
        </div>
      </div>
    </div>
  )
}

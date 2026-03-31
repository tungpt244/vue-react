import { useState } from 'react'

const DEMO_CODE = `// React: Manual list animation with CSS transitions
// No built-in <TransitionGroup> — items use opacity transition

function ListDemo() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3'])

  const addItem = () => {
    const n = items.length + 1
    setItems(prev => [...prev, \`Item \${n}\`])
  }

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <ul>
      {items.map((item, i) => (
        <li key={item} className="flex items-center gap-2 py-1 animate-fade-in">
          {item}
          <button onClick={() => removeItem(i)}>✕</button>
        </li>
      ))}
    </ul>
  )
}

// Note: React removes items instantly (no leave animation).
// For smooth leave transitions, need react-transition-group or framer-motion.`

export default function TransitionGroup() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3'])
  const [counter, setCounter] = useState(4)
  const [showCode, setShowCode] = useState(false)

  const addItem = () => {
    setItems((prev) => [...prev, `Item ${counter}`])
    setCounter((c) => c + 1)
  }

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">TransitionGroup</h2>

        <div className="flex gap-2 mb-4">
          <button
            onClick={addItem}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            + Add Item
          </button>
        </div>

        <ul className="space-y-2">
          {items.map((item, i) => (
            <li
              key={item}
              className="flex items-center justify-between px-3 py-2 bg-slate-100 rounded transition-opacity duration-300 opacity-100"
            >
              <span className="text-sm">{item}</span>
              <button
                onClick={() => removeItem(i)}
                className="text-slate-400 hover:text-red-500 text-xs px-1"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        {items.length === 0 && (
          <p className="text-sm text-slate-400 text-center py-4">
            List is empty
          </p>
        )}
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
            <strong>
              Vue{"'"}s {'<TransitionGroup>'} xử lý list enter/leave/move.
            </strong>{' '}
            Tự động apply CSS classes khi item được thêm/xóa/di chuyển. Kể cả
            smooth move animation (FLIP) khi reorder — chỉ cần thêm{' '}
            <code className="bg-slate-200 px-1 rounded">.list-move</code> class.
          </p>
          <p>
            <strong>React không có {'<TransitionGroup>'}.</strong> New items
            hiển thị ngay lập tức. Remove items biến mất ngay — không có leave
            animation mà không có library. Cần react-transition-group hoặc
            framer-motion để có smooth transitions.
          </p>
          <p>
            <strong>Gap lớn nhất là leave animation.</strong> Khi remove item
            khỏi DOM, React không có cơ chế nào giữ element lại để animate — nó
            biến mất ngay. Vue{"'"}s TransitionGroup handle điều này tự động.
          </p>
        </div>
      </div>
    </div>
  )
}

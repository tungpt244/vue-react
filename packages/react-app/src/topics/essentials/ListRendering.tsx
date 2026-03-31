import { useState } from 'react'

const DEMO_CODE = `// React — List Rendering với .map()

const [items, setItems] = useState([
  { id: 1, text: 'Learn Vue' },
  { id: 2, text: 'Learn React' },
])

// Render list — key prop là bắt buộc
{items.map(item => (
  <li key={item.id}>
    {item.text}
    <button onClick={() => removeItem(item.id)}>✕</button>
  </li>
))}

// Thêm item
const addItem = () => {
  setItems(prev => [...prev, { id: nextId, text: newItem }])
  setNextId(n => n + 1)
  setNewItem('')
}

// Xoá item
const removeItem = (id: number) => {
  setItems(prev => prev.filter(item => item.id !== id))
}`

interface Item {
  id: number
  text: string
}

export default function ListRendering() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, text: 'Learn Vue' },
    { id: 2, text: 'Learn React' },
  ])
  const [newItem, setNewItem] = useState('')
  const [nextId, setNextId] = useState(3)
  const [showCode, setShowCode] = useState(false)

  const addItem = () => {
    if (!newItem.trim()) return
    setItems((prev) => [...prev, { id: nextId, text: newItem.trim() }])
    setNextId((n) => n + 1)
    setNewItem('')
  }

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">List Rendering</h2>

        <div className="flex gap-2 mb-3">
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addItem()}
            placeholder="Nhập item mới..."
            className="border border-slate-300 rounded px-2 py-1 text-sm flex-1"
          />
          <button
            onClick={addItem}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Thêm
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-sm text-slate-400 italic">Danh sách trống</p>
        ) : (
          <ul className="space-y-2">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded text-sm"
              >
                <span>
                  <span className="text-slate-400 mr-2">#{item.id}</span>
                  {item.text}
                </span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-400 hover:text-red-600 text-xs px-2 py-0.5 rounded hover:bg-red-50"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="text-xs text-slate-400 mt-2">{items.length} item(s)</p>
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
            <strong>v-for vs .map().</strong> Vue dùng{' '}
            <code className="bg-slate-200 px-1 rounded">
              {'v-for="item in items" :key="item.id"'}
            </code>{' '}
            directive. React dùng{' '}
            <code className="bg-slate-200 px-1 rounded">
              items.map(item =&gt; ...)
            </code>{' '}
            — đây là JS thuần, không phải magic.
          </p>
          <p>
            <strong>key prop là bắt buộc.</strong> Cả Vue và React đều cần{' '}
            <code className="bg-slate-200 px-1 rounded">key</code> duy nhất để
            diff DOM hiệu quả. Dùng ID thay vì index để tránh bug khi xoá/thêm
            giữa list.
          </p>
          <p>
            <strong>Immutable update.</strong> React cần spread:{' '}
            <code className="bg-slate-200 px-1 rounded">
              {'[...prev, newItem]'}
            </code>{' '}
            và filter:{' '}
            <code className="bg-slate-200 px-1 rounded">
              {'prev.filter(i => i.id !== id)'}
            </code>
            . Vue với <code className="bg-slate-200 px-1 rounded">ref([])</code>{' '}
            có thể dùng{' '}
            <code className="bg-slate-200 px-1 rounded">.push()</code> và{' '}
            <code className="bg-slate-200 px-1 rounded">.splice()</code> trực
            tiếp.
          </p>
        </div>
      </div>
    </div>
  )
}

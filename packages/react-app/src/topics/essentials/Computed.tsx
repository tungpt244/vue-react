import { useState, useMemo } from 'react'

interface Item {
  name: string
  price: number
}

export default function Computed() {
  const [items, setItems] = useState<Item[]>([
    { name: 'Apple', price: 1.5 },
    { name: 'Bread', price: 3.0 },
  ])
  const [newName, setNewName] = useState('')
  const [newPrice, setNewPrice] = useState(0)

  const total = useMemo(() => items.reduce((sum, i) => sum + i.price, 0), [items])
  const itemCount = useMemo(() => items.length, [items])
  const mostExpensive = useMemo(
    () =>
      items.length ? items.reduce((max, i) => (i.price > max.price ? i : max)).name : 'None',
    [items]
  )

  function addItem() {
    if (!newName.trim()) return
    setItems(prev => [...prev, { name: newName.trim(), price: newPrice }])
    setNewName('')
    setNewPrice(0)
  }

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">Computed / useMemo</h2>

        {/* Add item form */}
        <div className="flex gap-2 mb-3">
          <input
            value={newName}
            onChange={e => setNewName(e.target.value)}
            placeholder="Item name..."
            className="border border-slate-300 rounded px-2 py-1 text-sm flex-1"
          />
          <input
            value={newPrice}
            onChange={e => setNewPrice(Number(e.target.value))}
            type="number"
            placeholder="Price"
            min={0}
            step={0.5}
            className="border border-slate-300 rounded px-2 py-1 text-sm w-24"
          />
          <button
            onClick={addItem}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Add
          </button>
        </div>

        {/* Item list */}
        <ul className="mb-3 space-y-1">
          {items.map(item => (
            <li
              key={item.name}
              className="flex justify-between text-sm text-slate-700 bg-slate-50 px-2 py-1 rounded"
            >
              <span>{item.name}</span>
              <span className="font-medium">${item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>

        {/* Summary box (memoized values) */}
        <div className="bg-blue-50 rounded p-3 space-y-1">
          <p className="text-sm">
            <span className="text-slate-500">Total:</span>
            <strong className="ml-2">${total.toFixed(2)}</strong>
          </p>
          <p className="text-sm">
            <span className="text-slate-500">Items:</span>
            <strong className="ml-2">{itemCount}</strong>
          </p>
          <p className="text-sm">
            <span className="text-slate-500">Most Expensive:</span>
            <strong className="ml-2">{mostExpensive}</strong>
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-slate-50 rounded">
        <h3 className="text-sm font-semibold mb-2">Key Differences</h3>
        <p className="text-sm text-slate-600 mb-2">
          <code className="bg-slate-200 px-1 rounded">useMemo(fn, deps)</code> memoize một computed
          value. Khác với Vue's <code className="bg-slate-200 px-1 rounded">computed()</code> tự
          track dependency, React yêu cầu khai báo{' '}
          <code className="bg-slate-200 px-1 rounded">dependency array</code> thủ công. Quên một
          dependency sẽ khiến memoized value không update.
        </p>
        <p className="text-sm text-slate-600">
          <code className="bg-slate-200 px-1 rounded">useMemo</code> là optimization — React vẫn có
          thể recalculate mà không cần nó, nhưng memo tránh recompute tốn kém. Với phép tính đơn
          giản, có thể bỏ qua <code className="bg-slate-200 px-1 rounded">useMemo</code> và tính
          trực tiếp trong render.
        </p>
      </div>
    </div>
  )
}

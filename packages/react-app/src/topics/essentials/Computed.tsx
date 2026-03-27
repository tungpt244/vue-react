import { useState, useMemo } from 'react'

interface Item {
  name: string
  price: number
}

const DEMO_CODE = `// React — useMemo
const total = useMemo(
  () => items.reduce((sum, i) => sum + i.price, 0),
  [items]  // dependency array — phải khai báo thủ công
)

// useMemo chỉ recalculate khi deps thay đổi
// Quên dep → stale value (bug phổ biến)
// useMemo là optimization, không phải bắt buộc`

export default function Computed() {
  const [items, setItems] = useState<Item[]>([
    { name: 'Apple', price: 1.5 },
    { name: 'Bread', price: 3.0 },
  ])
  const [newName, setNewName] = useState('')
  const [newPrice, setNewPrice] = useState(0)
  const [showCode, setShowCode] = useState(false)

  const total = useMemo(() => items.reduce((sum, i) => sum + i.price, 0), [items])
  const itemCount = useMemo(() => items.length, [items])
  const mostExpensive = useMemo(
    () =>
      items.length ? items.reduce((max, i) => (i.price > max.price ? i : max)).name : 'None',
    [items],
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

        <div className="flex gap-2 mb-3">
          <input
            value={newName}
            onChange={e => setNewName(e.target.value)}
            placeholder="Tên item..."
            className="border border-slate-300 rounded px-2 py-1 text-sm flex-1"
          />
          <input
            value={newPrice}
            onChange={e => setNewPrice(Number(e.target.value))}
            type="number"
            placeholder="Giá"
            min={0}
            step={0.5}
            className="border border-slate-300 rounded px-2 py-1 text-sm w-24"
          />
          <button
            onClick={addItem}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Thêm
          </button>
        </div>

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

        <div className="bg-blue-50 rounded p-3 space-y-1">
          <p className="text-sm">
            <span className="text-slate-500">Tổng:</span>
            <strong className="ml-2">${total.toFixed(2)}</strong>
          </p>
          <p className="text-sm">
            <span className="text-slate-500">Số lượng:</span>
            <strong className="ml-2">{itemCount}</strong>
          </p>
          <p className="text-sm">
            <span className="text-slate-500">Đắt nhất:</span>
            <strong className="ml-2">{mostExpensive}</strong>
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
            <strong>useMemo(fn, deps) — phải khai báo dependency thủ công.</strong> Khác với Vue's{' '}
            <code className="bg-slate-200 px-1 rounded">computed()</code> tự track dependency, React
            yêu cầu liệt kê rõ trong array. Quên 1 dependency → memoized value không update (bug
            rất phổ biến với beginners).
          </p>
          <p>
            <strong>useMemo là optimization, không phải bắt buộc.</strong> React vẫn hoạt động đúng
            nếu bỏ <code className="bg-slate-200 px-1 rounded">useMemo</code> — chỉ là recalculate
            mỗi render. Với phép tính đơn giản, có thể tính trực tiếp trong render body mà không
            cần memo.
          </p>
          <p>
            <strong>Không có writable computed.</strong> Vue cho phép{' '}
            <code className="bg-slate-200 px-1 rounded">computed({'{ get, set }'})</code> — React
            không có tương đương, phải viết getter + setter riêng.
          </p>
        </div>
      </div>
    </div>
  )
}

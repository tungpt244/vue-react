import { useState } from 'react'

const DEMO_CODE = `// React: Manual state preservation via lifted state
// No <KeepAlive> — must lift state to parent

function TabsDemo() {
  const [activeTab, setActiveTab] = useState('a')
  // State lifted up — persists even when tab is hidden
  const [counterA, setCounterA] = useState(0)
  const [textB, setTextB] = useState('')

  return (
    <div>
      <button onClick={() => setActiveTab('a')}>Tab A</button>
      <button onClick={() => setActiveTab('b')}>Tab B</button>

      {activeTab === 'a' && (
        <TabA counter={counterA} setCounter={setCounterA} />
      )}
      {activeTab === 'b' && (
        <TabB text={textB} setText={setTextB} />
      )}
    </div>
  )
}`

export default function KeepAlive() {
  const [activeTab, setActiveTab] = useState('a')
  const [counterA, setCounterA] = useState(0)
  const [textB, setTextB] = useState('')
  const [showCode, setShowCode] = useState(false)

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">KeepAlive → Lifted State</h2>

        <p className="text-xs text-slate-500 mb-3">
          Switch tabs — state is preserved because it lives in the parent
        </p>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('a')}
            className={`px-3 py-1 rounded text-sm font-medium ${
              activeTab === 'a'
                ? 'bg-blue-500 text-white'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            Tab A (Counter)
          </button>
          <button
            onClick={() => setActiveTab('b')}
            className={`px-3 py-1 rounded text-sm font-medium ${
              activeTab === 'b'
                ? 'bg-blue-500 text-white'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            Tab B (Input)
          </button>
        </div>

        {activeTab === 'a' && (
          <div className="p-3 bg-blue-50 rounded">
            <p className="text-sm font-medium mb-2">Counter: {counterA}</p>
            <div className="flex gap-2">
              <button
                onClick={() => setCounterA((c) => c - 1)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              >
                -
              </button>
              <button
                onClick={() => setCounterA((c) => c + 1)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              >
                +
              </button>
            </div>
          </div>
        )}

        {activeTab === 'b' && (
          <div className="p-3 bg-purple-50 rounded">
            <p className="text-sm font-medium mb-2">Type something:</p>
            <input
              value={textB}
              onChange={(e) => setTextB(e.target.value)}
              placeholder="Input value persists..."
              className="border border-slate-300 rounded px-2 py-1 text-sm w-full"
            />
            {textB && (
              <p className="text-sm text-slate-600 mt-2">You typed: {textB}</p>
            )}
          </div>
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
              Vue{"'"}s {'<KeepAlive>'} cache component instance.
            </strong>{' '}
            Khi switch tab, component không bị unmount — toàn bộ state nội tại
            được giữ nguyên. Thêm{' '}
            <code className="bg-slate-200 px-1 rounded">{'<KeepAlive>'}</code>{' '}
            wrap là xong, không cần sửa child component.
          </p>
          <p>
            <strong>React không có KeepAlive.</strong> Phải lift state lên
            parent và pass down qua props. Child component được mount/unmount
            bình thường — chỉ có parent lưu trữ state. Cần sửa cả parent lẫn
            child để wire props đúng.
          </p>
          <p>
            <strong>Vue approach ít boilerplate hơn.</strong> React approach
            explicit hơn — dễ trace data flow. Với complex internal state (form
            với 20+ fields), React yêu cầu lift tất cả lên parent — có thể
            verbose. Alternative: dùng Zustand/Redux để persist state globally.
          </p>
        </div>
      </div>
    </div>
  )
}

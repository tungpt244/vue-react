import { useState, useEffect } from 'react'

const DEMO_CODE = `// React — useEffect cho lifecycle
function TimerDisplay() {
  useEffect(() => {
    // = onMounted: chạy sau render đầu tiên
    const interval = setInterval(...)

    return () => {
      // = onUnmounted: cleanup khi unmount
      clearInterval(interval)
    }
  }, [])  // [] = chỉ mount/unmount, không watch gì

  // Không có onBeforeMount — effect chạy SAU render
  // Không có onUpdated — dùng useEffect với deps
}`

function TimerDisplay({ onLog }: { onLog: (msg: string) => void }) {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    onLog(`[${new Date().toLocaleTimeString()}] mounted (useEffect)`)
    const interval = setInterval(() => setElapsed(e => e + 1), 1000)
    return () => {
      onLog(`[${new Date().toLocaleTimeString()}] unmounted (cleanup)`)
      clearInterval(interval)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div className="text-2xl font-bold text-blue-600">{elapsed}s</div>
}

export default function Lifecycle() {
  const [showTimer, setShowTimer] = useState(true)
  const [logs, setLogs] = useState<string[]>([])
  const [showCode, setShowCode] = useState(false)

  function handleLog(msg: string) {
    setLogs(prev => [...prev, msg])
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Lifecycle Hooks</h2>

      <div className="border border-slate-200 rounded-lg p-4 mb-4 space-y-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowTimer(s => !s)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            {showTimer ? 'Unmount Timer' : 'Mount Timer'}
          </button>
          <span className="text-sm text-slate-500">Bấm để trigger lifecycle hooks</span>
        </div>

        <div className="bg-slate-50 rounded p-4 min-h-16 flex items-center justify-center">
          {showTimer ? (
            <TimerDisplay onLog={handleLog} />
          ) : (
            <span className="text-slate-400 text-sm italic">Timer đã unmount</span>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Lifecycle log</p>
            <button
              onClick={() => setLogs([])}
              className="px-2 py-0.5 bg-slate-200 text-slate-600 rounded text-xs hover:bg-slate-300"
            >
              Xóa
            </button>
          </div>
          <div className="bg-slate-900 text-green-400 font-mono text-xs p-3 rounded max-h-40 overflow-y-auto">
            {logs.length === 0 ? (
              <span className="text-slate-500">Mount/unmount timer để xem lifecycle events...</span>
            ) : (
              logs.map((log, i) => <div key={i}>{log}</div>)
            )}
          </div>
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
            <strong>React không có lifecycle hooks riêng — tất cả là useEffect.</strong>{' '}
            <code className="bg-slate-200 px-1 rounded">useEffect(fn, [])</code> = onMounted,
            return cleanup = onUnmounted. Một hook làm nhiều việc thay vì nhiều hooks chuyên dụng.
          </p>
          <p>
            <strong>Effect chạy SAU render, không phải trước.</strong> Không có{' '}
            <code className="bg-slate-200 px-1 rounded">onBeforeMount</code> tương đương. Nếu cần
            chạy code trước paint → dùng{' '}
            <code className="bg-slate-200 px-1 rounded">useLayoutEffect</code> (chạy synchronous
            sau DOM mutation, trước browser paint).
          </p>
          <p>
            <strong>Mount + unmount gộp chung.</strong> Vue tách rõ{' '}
            <code className="bg-slate-200 px-1 rounded">onMounted</code> /{' '}
            <code className="bg-slate-200 px-1 rounded">onUnmounted</code> — dễ đọc hơn. React
            gộp vào 1 useEffect — compact hơn nhưng dễ quên cleanup.
          </p>
        </div>
      </div>
    </div>
  )
}

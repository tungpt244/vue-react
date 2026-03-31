import { useState, useEffect } from 'react'

const DEMO_CODE = `// React — useEffect thay cho watch/watchEffect
useEffect(() => {
  // Chạy khi question thay đổi
  if (question.endsWith('?')) {
    setAnswer('Thinking...')
    const t = setTimeout(() => setAnswer('42!'), 500)
    return () => clearTimeout(t)  // cleanup
  }
}, [question])  // dependency array = "watch cái gì"

// Không có watchEffect — phải list deps thủ công
useEffect(() => {
  console.log(searchQuery)  // effect cho searchQuery
}, [searchQuery])            // phải khai báo explicit`

export default function Watchers() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('Hỏi gì đó kết thúc bằng ?')
  const [searchQuery, setSearchQuery] = useState('')
  const [logs, setLogs] = useState<string[]>([])
  const [showCode, setShowCode] = useState(false)

  useEffect(() => {
    if (question !== '') {
      setLogs((prev) => [...prev, `useEffect [question]: "${question}"`])
    }
    if (question.endsWith('?')) {
      setAnswer('Đang nghĩ...')
      const t = setTimeout(() => setAnswer('Có! 42 là câu trả lời.'), 500)
      return () => clearTimeout(t)
    } else {
      setAnswer('Hỏi gì đó kết thúc bằng ?')
    }
  }, [question])

  useEffect(() => {
    if (searchQuery) {
      setLogs((prev) => [
        ...prev,
        `useEffect [searchQuery]: tìm "${searchQuery}"`,
      ])
    }
  }, [searchQuery])

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Watchers / useEffect</h2>

      <div className="border border-slate-200 rounded-lg p-4 mb-4 space-y-4">
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">
            Question watcher (useEffect)
          </p>
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Hỏi gì đó kết thúc bằng ?"
            className="border border-slate-300 rounded px-2 py-1 text-sm w-full mb-2"
          />
          <div className="text-sm text-slate-600 bg-slate-50 rounded p-2">
            Trả lời: <span className="font-medium">{answer}</span>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">
            Search (useEffect với [searchQuery])
          </p>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Gõ để trigger useEffect..."
            className="border border-slate-300 rounded px-2 py-1 text-sm w-full"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Effect log
            </p>
            <button
              onClick={() => setLogs([])}
              className="px-2 py-0.5 bg-slate-200 text-slate-600 rounded text-xs hover:bg-slate-300"
            >
              Xóa
            </button>
          </div>
          <div className="bg-slate-900 text-green-400 font-mono text-xs p-3 rounded max-h-40 overflow-y-auto">
            {logs.length === 0 ? (
              <span className="text-slate-500">Chưa có event nào...</span>
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
          <pre className="mt-2 bg-slate-900 text-slate-100 text-xs p-4 rounded overflow-x-auto">
            <code>{DEMO_CODE}</code>
          </pre>
        )}
      </div>

      <div className="p-4 bg-slate-50 rounded">
        <h3 className="text-sm font-semibold mb-2">So sánh</h3>
        <div className="text-sm text-slate-600 space-y-2">
          <p>
            <strong>React chỉ có useEffect — "đa zi năng".</strong> Không phân
            biệt watch vs watchEffect vs onMounted. Dependency array quyết định
            behavior: <code className="bg-slate-200 px-1 rounded">[dep]</code> =
            watch specific,{' '}
            <code className="bg-slate-200 px-1 rounded">[]</code> = mount once,{' '}
            không có array = chạy mỗi render.
          </p>
          <p>
            <strong>Cleanup function.</strong> Return một function từ useEffect
            → chạy khi unmount hoặc trước khi effect chạy lại. Tương đương{' '}
            <code className="bg-slate-200 px-1 rounded">onUnmounted</code> hoặc{' '}
            <code className="bg-slate-200 px-1 rounded">onWatcherCleanup</code>{' '}
            của Vue.
          </p>
          <p>
            <strong>Dependency array là nguồn bug #1.</strong> Quên khai báo dep
            → stale closure. Khai báo thừa → infinite loop. Vue's{' '}
            <code className="bg-slate-200 px-1 rounded">watchEffect</code> tự
            track nên không gặp vấn đề này.
          </p>
        </div>
      </div>
    </div>
  )
}

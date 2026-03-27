import { useState, useEffect } from 'react'

export default function Watchers() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('Ask a question ending with ?')
  const [searchQuery, setSearchQuery] = useState('')
  const [logs, setLogs] = useState<string[]>([])

  // Equivalent to Vue's watch(question, ...)
  useEffect(() => {
    if (question !== '') {
      setLogs(prev => [...prev, `useEffect [question]: "${question}"`])
    }
    if (question.endsWith('?')) {
      setAnswer('Thinking...')
      const t = setTimeout(() => setAnswer('Yes! 42 is the answer.'), 500)
      return () => clearTimeout(t)
    } else {
      setAnswer('Ask a question ending with ?')
    }
  }, [question])

  // Equivalent to Vue's watchEffect for searchQuery
  useEffect(() => {
    if (searchQuery) {
      setLogs(prev => [...prev, `useEffect [searchQuery]: searching "${searchQuery}"`])
    }
  }, [searchQuery])

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Watchers / useEffect</h2>

      <div className="border border-slate-200 rounded-lg p-4 mb-4 space-y-4">
        {/* Question watcher demo */}
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Question watcher (useEffect)</p>
          <input
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="Ask something ending with ?"
            className="border border-slate-300 rounded px-2 py-1 text-sm w-full mb-2"
          />
          <div className="text-sm text-slate-600 bg-slate-50 rounded p-2">
            Answer: <span className="font-medium">{answer}</span>
          </div>
        </div>

        {/* Search useEffect demo */}
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Search query (useEffect with [searchQuery])</p>
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Type to trigger useEffect..."
            className="border border-slate-300 rounded px-2 py-1 text-sm w-full"
          />
        </div>

        {/* Log panel */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Effect log</p>
            <button
              onClick={() => setLogs([])}
              className="px-2 py-0.5 bg-slate-200 text-slate-600 rounded text-xs hover:bg-slate-300"
            >
              Clear
            </button>
          </div>
          <div className="bg-slate-900 text-green-400 font-mono text-xs p-3 rounded max-h-40 overflow-y-auto">
            {logs.length === 0 ? (
              <span className="text-slate-500">No effect events yet...</span>
            ) : (
              logs.map((log, i) => <div key={i}>{log}</div>)
            )}
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-6 p-4 bg-slate-50 rounded">
        <h3 className="text-sm font-semibold mb-2">Key Differences</h3>
        <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
          <li>React has only <code className="bg-white px-1 rounded text-xs">useEffect(fn, deps)</code> — no separate watch vs watchEffect.</li>
          <li>The dependency array <code className="bg-white px-1 rounded text-xs">[question]</code> is like Vue's <code className="bg-white px-1 rounded text-xs">watch(question, ...)</code>.</li>
          <li>An empty <code className="bg-white px-1 rounded text-xs">[]</code> runs once on mount (like <code className="bg-white px-1 rounded text-xs">onMounted</code>).</li>
          <li>Returning a cleanup function from <code className="bg-white px-1 rounded text-xs">useEffect</code> handles teardown (like <code className="bg-white px-1 rounded text-xs">onUnmounted</code>).</li>
          <li>Unlike Vue's <code className="bg-white px-1 rounded text-xs">watchEffect</code>, React doesn't auto-track dependencies — you must list them explicitly.</li>
        </ul>
      </div>
    </div>
  )
}

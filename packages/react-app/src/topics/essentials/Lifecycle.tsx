import { useState, useEffect } from 'react'

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

  function handleLog(msg: string) {
    setLogs(prev => [...prev, msg])
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Lifecycle Hooks</h2>

      <div className="border border-slate-200 rounded-lg p-4 mb-4 space-y-4">
        {/* Toggle controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowTimer(s => !s)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            {showTimer ? 'Unmount Timer' : 'Mount Timer'}
          </button>
          <span className="text-sm text-slate-500">Toggle to trigger lifecycle hooks</span>
        </div>

        {/* Timer display */}
        <div className="bg-slate-50 rounded p-4 min-h-16 flex items-center justify-center">
          {showTimer ? (
            <TimerDisplay onLog={handleLog} />
          ) : (
            <span className="text-slate-400 text-sm italic">Timer unmounted</span>
          )}
        </div>

        {/* Log panel */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Lifecycle log</p>
            <button
              onClick={() => setLogs([])}
              className="px-2 py-0.5 bg-slate-200 text-slate-600 rounded text-xs hover:bg-slate-300"
            >
              Clear
            </button>
          </div>
          <div className="bg-slate-900 text-green-400 font-mono text-xs p-3 rounded max-h-40 overflow-y-auto">
            {logs.length === 0 ? (
              <span className="text-slate-500">Mount/unmount the timer to see lifecycle events...</span>
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
          <li>React has no separate lifecycle hooks — everything is <code className="bg-white px-1 rounded text-xs">useEffect</code>.</li>
          <li><code className="bg-white px-1 rounded text-xs">useEffect(fn, [])</code> = <code className="bg-white px-1 rounded text-xs">onMounted</code> in Vue.</li>
          <li>The cleanup function returned from <code className="bg-white px-1 rounded text-xs">useEffect</code> = <code className="bg-white px-1 rounded text-xs">onUnmounted</code> in Vue.</li>
          <li>There's no <code className="bg-white px-1 rounded text-xs">onBeforeMount</code> equivalent — effects run after render, not before.</li>
          <li>React combines mount + unmount into a single <code className="bg-white px-1 rounded text-xs">useEffect</code> call, while Vue separates them into distinct named hooks.</li>
        </ul>
      </div>
    </div>
  )
}

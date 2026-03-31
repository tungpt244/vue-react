import { useState } from 'react'

const DEMO_CODE = `// React — Event Handling

// 1. onClick
<button onClick={() => setCount(c => c + 1)}>Click me</button>

// 2. Prevent default (không navigate khi click link)
<a href="https://example.com"
   onClick={e => {
     e.preventDefault()
     addLog('Link clicked (prevented)')
   }}
>
  Click link
</a>

// 3. onKeyDown — check key explicitly
<input
  onKeyDown={e => {
    if (e.key === 'Enter') {
      addLog('Enter pressed: ' + e.currentTarget.value)
    }
  }}
/>

// Vue equivalent:
// @click, @click.prevent, @keydown.enter`

export default function EventHandling() {
  const [count, setCount] = useState(0)
  const [log, setLog] = useState<string[]>([])
  const [showCode, setShowCode] = useState(false)

  const addLog = (msg: string) => {
    setLog((prev) => [msg, ...prev].slice(0, 5))
  }

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">Event Handling</h2>

        <div className="mb-4">
          <p className="text-sm font-medium mb-2">1. onClick — Click counter</p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCount((c) => c + 1)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              Click me
            </button>
            <span className="text-sm text-slate-600">
              Đã click: <strong>{count}</strong> lần
            </span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium mb-2">
            2. e.preventDefault() — Prevent link navigation
          </p>
          <a
            href="https://example.com"
            onClick={(e) => {
              e.preventDefault()
              addLog('Link clicked (navigation prevented)')
            }}
            className="text-sm text-blue-600 underline cursor-pointer"
          >
            Click link này (sẽ không navigate)
          </a>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium mb-2">
            3. onKeyDown — Enter key handler
          </p>
          <input
            placeholder="Nhập gì đó rồi nhấn Enter..."
            className="border border-slate-300 rounded px-2 py-1 text-sm w-full"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addLog(`Enter: "${e.currentTarget.value}"`)
                e.currentTarget.value = ''
              }
            }}
          />
        </div>

        {log.length > 0 && (
          <div className="bg-slate-900 rounded p-3">
            <p className="text-xs text-slate-400 mb-1">Event log:</p>
            {log.map((entry, i) => (
              <p key={i} className="text-xs text-green-400 font-mono">
                &gt; {entry}
              </p>
            ))}
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
            <strong>Vue modifiers vs React explicit JS.</strong> Vue có
            syntactic sugar:{' '}
            <code className="bg-slate-200 px-1 rounded">@click.prevent</code>,{' '}
            <code className="bg-slate-200 px-1 rounded">@keydown.enter</code>.
            React dùng event object trực tiếp:{' '}
            <code className="bg-slate-200 px-1 rounded">
              e.preventDefault()
            </code>
            ,{' '}
            <code className="bg-slate-200 px-1 rounded">
              {"if (e.key === 'Enter')"}
            </code>
            .
          </p>
          <p>
            <strong>Event naming convention.</strong> Vue dùng{' '}
            <code className="bg-slate-200 px-1 rounded">@click</code>,{' '}
            <code className="bg-slate-200 px-1 rounded">@input</code>,{' '}
            <code className="bg-slate-200 px-1 rounded">@keydown</code>. React
            dùng camelCase prop:{' '}
            <code className="bg-slate-200 px-1 rounded">onClick</code>,{' '}
            <code className="bg-slate-200 px-1 rounded">onChange</code>,{' '}
            <code className="bg-slate-200 px-1 rounded">onKeyDown</code>.
          </p>
          <p>
            <strong>Synthetic events.</strong> React wrap native events trong{' '}
            <code className="bg-slate-200 px-1 rounded">SyntheticEvent</code> —
            API tương tự nhưng được normalize across browsers. Access native
            event qua{' '}
            <code className="bg-slate-200 px-1 rounded">e.nativeEvent</code>.
          </p>
        </div>
      </div>
    </div>
  )
}

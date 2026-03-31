import { useState } from 'react'

const DEMO_CODE = `// React — JSX
const name = 'Nguyen Van A'
const [showDetails, setShowDetails] = useState(false)
const [skills] = useState(['Vue', 'TypeScript', 'CSS'])

// Conditional: dùng && hoặc ternary
{showDetails && <div>...</div>}

// List: dùng .map() + key
{skills.map(s => <li key={s}>{s}</li>)}

// Event: onClick handler
<button onClick={() => setShowDetails(!showDetails)}>
  {showDetails ? 'Ẩn' : 'Hiện'}
</button>`

export default function TemplateSyntax() {
  const name = 'Nguyen Van A'
  const [showDetails, setShowDetails] = useState(false)
  const [skills] = useState(['Vue', 'TypeScript', 'CSS'])
  const [showCode, setShowCode] = useState(false)

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">Template Syntax</h2>

        <div className="bg-white rounded p-3 border border-slate-100 mb-3">
          <p className="font-medium">{name}</p>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className={`mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm${showDetails ? ' font-bold' : ''}`}
          >
            {showDetails ? 'Ẩn chi tiết' : 'Hiện chi tiết'}
          </button>

          {showDetails && (
            <div className="mt-3 text-sm text-slate-600">
              <p>Email: nguyenvana@example.com</p>
              <p className="mt-1">Bio: Lập trình viên frontend yêu Vue.</p>
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-medium mb-1">Skills:</p>
          <ul className="list-disc list-inside text-sm text-slate-700">
            {skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Source code */}
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
            <strong>JSX = JavaScript + XML.</strong> React không dùng template
            riêng mà viết markup trực tiếp trong JavaScript. Conditional
            rendering dùng <code className="bg-slate-200 px-1 rounded">&&</code>{' '}
            hoặc ternary <code className="bg-slate-200 px-1 rounded">? :</code>,
            list rendering dùng{' '}
            <code className="bg-slate-200 px-1 rounded">.map()</code>.
          </p>
          <p>
            <strong>Không có directive.</strong> Vue có{' '}
            <code className="bg-slate-200 px-1 rounded">v-if</code>,{' '}
            <code className="bg-slate-200 px-1 rounded">v-for</code>,{' '}
            <code className="bg-slate-200 px-1 rounded">v-bind</code> — React
            thay tất cả bằng JavaScript expressions thuần. Linh hoạt hơn nhưng
            cú pháp khác HTML thuần:{' '}
            <code className="bg-slate-200 px-1 rounded">className</code> thay vì{' '}
            <code className="bg-slate-200 px-1 rounded">class</code>,{' '}
            <code className="bg-slate-200 px-1 rounded">htmlFor</code> thay vì{' '}
            <code className="bg-slate-200 px-1 rounded">for</code>.
          </p>
          <p>
            <strong>Event handling:</strong> React dùng camelCase (
            <code className="bg-slate-200 px-1 rounded">onClick</code>) thay vì
            Vue's <code className="bg-slate-200 px-1 rounded">@click</code>.
            Không có event modifiers (
            <code className="bg-slate-200 px-1 rounded">.prevent</code>,{' '}
            <code className="bg-slate-200 px-1 rounded">.stop</code>) — phải gọi{' '}
            <code className="bg-slate-200 px-1 rounded">
              e.preventDefault()
            </code>{' '}
            thủ công.
          </p>
        </div>
      </div>
    </div>
  )
}

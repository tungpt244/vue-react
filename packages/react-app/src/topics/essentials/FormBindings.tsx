import { useState } from 'react'

const DEMO_CODE = `// React — Controlled Components (Form Bindings)

// Text input
const [name, setName] = useState('')
<input
  value={name}
  onChange={e => setName(e.target.value)}
/>

// Select dropdown
const [framework, setFramework] = useState('react')
<select value={framework} onChange={e => setFramework(e.target.value)}>
  <option value="react">React</option>
  <option value="vue">Vue</option>
</select>

// Checkbox
const [agree, setAgree] = useState(false)
<input
  type="checkbox"
  checked={agree}
  onChange={e => setAgree(e.target.checked)}
/>

// Vue equivalent: v-model works on all of these automatically
// <input v-model="name" />
// <select v-model="framework"> ... </select>
// <input type="checkbox" v-model="agree" />`

export default function FormBindings() {
  const [name, setName] = useState('')
  const [framework, setFramework] = useState('react')
  const [agree, setAgree] = useState(false)
  const [showCode, setShowCode] = useState(false)

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">Form Bindings</h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">Text input</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên..."
              className="border border-slate-300 rounded px-2 py-1 text-sm w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">
              Select dropdown
            </label>
            <select
              value={framework}
              onChange={(e) => setFramework(e.target.value)}
              className="border border-slate-300 rounded px-2 py-1 text-sm w-full"
            >
              <option value="react">React</option>
              <option value="vue">Vue</option>
              <option value="svelte">Svelte</option>
              <option value="angular">Angular</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="rounded"
              />
              <span className="font-medium">Checkbox</span>
            </label>
          </div>

          <div className="bg-slate-50 rounded p-3 text-sm text-slate-600 space-y-1">
            <p className="text-xs text-slate-400 mb-2">Live preview:</p>
            <p>
              Tên: <strong>{name || '(chưa nhập)'}</strong>
            </p>
            <p>
              Framework: <strong>{framework}</strong>
            </p>
            <p>
              Đồng ý: <strong>{agree ? 'Có' : 'Chưa'}</strong>
            </p>
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
            <strong>v-model vs controlled component.</strong> Vue{' '}
            <code className="bg-slate-200 px-1 rounded">v-model</code> là
            two-way binding tự động — React yêu cầu explicit{' '}
            <code className="bg-slate-200 px-1 rounded">value</code> +{' '}
            <code className="bg-slate-200 px-1 rounded">onChange</code> cho mỗi
            input.
          </p>
          <p>
            <strong>Checkbox khác biệt.</strong> React dùng{' '}
            <code className="bg-slate-200 px-1 rounded">checked</code> +{' '}
            <code className="bg-slate-200 px-1 rounded">e.target.checked</code>{' '}
            (không phải <code className="bg-slate-200 px-1 rounded">value</code>
            ). Vue <code className="bg-slate-200 px-1 rounded">v-model</code> tự
            xử lý điều này.
          </p>
          <p>
            <strong>Select dropdown.</strong> React dùng{' '}
            <code className="bg-slate-200 px-1 rounded">value</code> trên thẻ{' '}
            <code className="bg-slate-200 px-1 rounded">&lt;select&gt;</code>{' '}
            (không phải{' '}
            <code className="bg-slate-200 px-1 rounded">selected</code> trên{' '}
            <code className="bg-slate-200 px-1 rounded">&lt;option&gt;</code>).
            Vue <code className="bg-slate-200 px-1 rounded">v-model</code> hoạt
            động giống nhau với select.
          </p>
        </div>
      </div>
    </div>
  )
}

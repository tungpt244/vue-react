import { useRef, useState } from 'react'

const DEMO_CODE = `// React — useRef để truy cập DOM element

// 1. Tạo ref
const inputRef = useRef<HTMLInputElement>(null)

// 2. Gắn vào element
<input ref={inputRef} />

// 3. Truy cập DOM — luôn check .current null
const focusInput = () => {
  inputRef.current?.focus()
}

// Khác với useState: useRef KHÔNG trigger re-render
// Dùng để: DOM access, timers, lưu giá trị "instance variable"

// Vue equivalent:
// <input ref="inputRef" />
// const inputRef = ref<HTMLInputElement>()
// inputRef.value?.focus()`

export default function TemplateRefs() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const [showCode, setShowCode] = useState(false)

  const handleFocus = () => {
    inputRef.current?.focus()
  }

  const handleSelect = () => {
    inputRef.current?.select()
  }

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">Template Refs</h2>

        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Programmatic DOM access</p>
          <div className="flex gap-2 mb-3">
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Input này được control bằng ref..."
              className="border border-slate-300 rounded px-2 py-1 text-sm flex-1"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleFocus}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              Focus
            </button>
            <button
              onClick={handleSelect}
              className="px-3 py-1 bg-slate-500 text-white rounded hover:bg-slate-600 text-sm"
            >
              Select All
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Trạng thái: {focused ? 'focused' : 'blurred'} — value: "{value}"
          </p>
        </div>

        <div className="bg-slate-50 rounded p-3 text-sm text-slate-500">
          <p>
            <code className="bg-slate-200 px-1 rounded">inputRef.current</code>{' '}
            chứa reference đến DOM element thực. Dùng để gọi{' '}
            <code className="bg-slate-200 px-1 rounded">.focus()</code>,{' '}
            <code className="bg-slate-200 px-1 rounded">.blur()</code>,{' '}
            <code className="bg-slate-200 px-1 rounded">.scrollIntoView()</code>
            , etc.
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
          <pre className="mt-2 bg-slate-900 text-slate-100 text-xs p-4 rounded overflow-x-auto">
            <code>{DEMO_CODE}</code>
          </pre>
        )}
      </div>

      <div className="p-4 bg-slate-50 rounded">
        <h3 className="text-sm font-semibold mb-2">So sánh</h3>
        <div className="text-sm text-slate-600 space-y-2">
          <p>
            <strong>Syntax khác nhau.</strong> Vue:{' '}
            <code className="bg-slate-200 px-1 rounded">
              {'ref="inputRef"'}
            </code>{' '}
            trong template +{' '}
            <code className="bg-slate-200 px-1 rounded">
              const inputRef = ref&lt;HTMLInputElement&gt;()
            </code>
            . React:{' '}
            <code className="bg-slate-200 px-1 rounded">
              ref={'{inputRef}'}
            </code>{' '}
            JSX prop +{' '}
            <code className="bg-slate-200 px-1 rounded">
              useRef&lt;HTMLInputElement&gt;(null)
            </code>
            .
          </p>
          <p>
            <strong>Vue refs là reactive, React refs không.</strong> Vue
            template ref là{' '}
            <code className="bg-slate-200 px-1 rounded">ref()</code> — changing{' '}
            <code className="bg-slate-200 px-1 rounded">.value</code> triggers
            update. React{' '}
            <code className="bg-slate-200 px-1 rounded">useRef</code> là mutable
            object — thay đổi{' '}
            <code className="bg-slate-200 px-1 rounded">.current</code> không
            trigger re-render.
          </p>
          <p>
            <strong>null check.</strong> React refs khởi tạo với{' '}
            <code className="bg-slate-200 px-1 rounded">null</code> — luôn cần
            check{' '}
            <code className="bg-slate-200 px-1 rounded">
              inputRef.current?.focus()
            </code>
            . Vue refs khởi tạo{' '}
            <code className="bg-slate-200 px-1 rounded">undefined</code> — tương
            tự cần optional chaining{' '}
            <code className="bg-slate-200 px-1 rounded">
              inputRef.value?.focus()
            </code>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

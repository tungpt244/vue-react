import { useState } from 'react'

const DEMO_CODE = `// React — controlled component (v-model equivalent)
function CustomInput({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  )
}

// Parent usage — "controlled":
const [text, setText] = useState('')
<CustomInput value={text} onChange={setText} />

// Vue equivalent with defineModel:
// const model = defineModel<string>()  // no import needed!
// <input v-model="model" />
// Parent: <CustomInput v-model="text" />`

function CustomInput({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-slate-300 rounded px-2 py-1 text-sm w-full"
      placeholder="Nhập text..."
    />
  )
}

export default function ComponentVModel() {
  const [text, setText] = useState('')
  const [showCode, setShowCode] = useState(false)

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">Component v-model</h2>

        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium mb-1">
              CustomInput (controlled component):
            </p>
            <CustomInput value={text} onChange={setText} />
          </div>

          <div className="p-3 bg-slate-50 rounded">
            <p className="text-sm text-slate-600">
              Parent state:{' '}
              <code className="bg-slate-200 px-1 rounded">
                &quot;{text || '(trống)'}&quot;
              </code>
            </p>
          </div>

          <p className="text-xs text-slate-500">
            Child nhận <code className="bg-slate-200 px-1 rounded">value</code>{' '}
            + gọi <code className="bg-slate-200 px-1 rounded">onChange</code> →
            Parent cập nhật state
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
            <strong>React: controlled component pattern.</strong> Phải truyền{' '}
            <code className="bg-slate-200 px-1 rounded">value</code> +{' '}
            <code className="bg-slate-200 px-1 rounded">onChange</code> — child
            không tự giữ state, parent kiểm soát hoàn toàn.
          </p>
          <p>
            <strong>Vue: defineModel() compiler macro.</strong> Tự động tạo
            two-way binding. Không cần import — compiler xử lý. Parent dùng{' '}
            <code className="bg-slate-200 px-1 rounded">v-model</code> là xong.
          </p>
          <p>
            <strong>Vue v-model là syntactic sugar</strong> cho{' '}
            <code className="bg-slate-200 px-1 rounded">:modelValue</code> +{' '}
            <code className="bg-slate-200 px-1 rounded">
              @update:modelValue
            </code>
            — về bản chất giống React nhưng gọn hơn nhiều.
          </p>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'

const DEMO_CODE = `// React — explicit ...rest spread for attribute forwarding
function MyButton({
  label,
  ...rest
}: { label: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...rest}>{label}</button>
}

// Parent passes extra attrs — all forwarded via ...rest:
<MyButton
  label="Click me"
  className="bg-blue-500 text-white px-4 py-2 rounded"
  onClick={() => alert('clicked!')}
  disabled={false}
/>

// Vue equivalent: auto-forwarded by default (inheritAttrs: true)
// Opt out: defineOptions({ inheritAttrs: false }) + useAttrs()`

function MyButton({
  label,
  ...rest
}: { label: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...rest}>{label}</button>
}

export default function FallthroughAttributes() {
  const [disabled, setDisabled] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">Fallthrough Attributes</h2>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium">
              <input
                type="checkbox"
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
                className="mr-2"
              />
              Disabled
            </label>
          </div>

          <MyButton
            label="MyButton (attrs forwarded via ...rest)"
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setClickCount((c) => c + 1)}
            disabled={disabled}
          />

          {clickCount > 0 && (
            <p className="text-sm text-slate-600">
              Clicked {clickCount} time(s)
            </p>
          )}

          <p className="text-xs text-slate-500">
            Parent truyền{' '}
            <code className="bg-slate-200 px-1 rounded">className</code>,{' '}
            <code className="bg-slate-200 px-1 rounded">onClick</code>,{' '}
            <code className="bg-slate-200 px-1 rounded">disabled</code> — tất cả
            forward qua{' '}
            <code className="bg-slate-200 px-1 rounded">...rest</code>
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
            <strong>React: luôn explicit.</strong> Phải destructure và spread{' '}
            <code className="bg-slate-200 px-1 rounded">...rest</code> thủ công.
            Không có magic tự động — rõ ràng nhưng verbose hơn.
          </p>
          <p>
            <strong>
              Vue: auto-forward theo mặc định (inheritAttrs: true).
            </strong>{' '}
            Attrs không được declare bằng{' '}
            <code className="bg-slate-200 px-1 rounded">defineProps</code> sẽ tự
            forward lên root element. Opt-out bằng{' '}
            <code className="bg-slate-200 px-1 rounded">
              defineOptions({'{ inheritAttrs: false }'})
            </code>
            .
          </p>
          <p>
            <strong>Vue useAttrs().</strong> Khi opt-out, dùng{' '}
            <code className="bg-slate-200 px-1 rounded">useAttrs()</code> để
            truy cập attrs và bind thủ công — giống{' '}
            <code className="bg-slate-200 px-1 rounded">...rest</code> của
            React.
          </p>
        </div>
      </div>
    </div>
  )
}

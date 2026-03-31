import { useState } from 'react'

const DEMO_CODE = `// React — Conditional Rendering

// 1. && operator
{show && <p>Nội dung này hiện khi show = true</p>}

// 2. Ternary
{show ? <p>Đang hiện</p> : <p>Đang ẩn</p>}

// 3. Early return (trong component)
function StatusBadge({ status }: { status: string }) {
  if (status === 'loading') return <p>Đang tải...</p>
  if (status === 'error') return <p>Có lỗi!</p>
  return <p>Thành công</p>
}

// v-show equivalent — dùng style
{show && <div style={{ display: show ? '' : 'none' }}>...</div>}`

type Status = 'loading' | 'error' | 'success'

export default function ConditionalRendering() {
  const [show, setShow] = useState(true)
  const [status, setStatus] = useState<Status>('success')
  const [showCode, setShowCode] = useState(false)

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">Conditional Rendering</h2>

        <div className="mb-4">
          <p className="text-sm font-medium mb-2">1. && operator</p>
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => setShow(!show)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              {show ? 'Ẩn' : 'Hiện'}
            </button>
            <span className="text-sm text-slate-500">
              show = {String(show)}
            </span>
          </div>
          {show && (
            <p className="text-sm text-green-700 bg-green-50 px-3 py-2 rounded">
              Nội dung này hiện khi show = true (dùng && operator)
            </p>
          )}
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium mb-2">2. Ternary</p>
          {show ? (
            <p className="text-sm text-blue-700 bg-blue-50 px-3 py-2 rounded">
              Trạng thái: <strong>Đang hiện</strong>
            </p>
          ) : (
            <p className="text-sm text-slate-500 bg-slate-100 px-3 py-2 rounded">
              Trạng thái: <strong>Đang ẩn</strong>
            </p>
          )}
        </div>

        <div>
          <p className="text-sm font-medium mb-2">
            3. Early return (status switcher)
          </p>
          <div className="flex gap-2 mb-2">
            {(['loading', 'error', 'success'] as Status[]).map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`px-3 py-1 rounded text-sm ${status === s ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="text-sm px-3 py-2 rounded bg-slate-50">
            {status === 'loading' && (
              <p className="text-yellow-700">Đang tải...</p>
            )}
            {status === 'error' && (
              <p className="text-red-700">Có lỗi xảy ra!</p>
            )}
            {status === 'success' && (
              <p className="text-green-700">Thành công!</p>
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
            <strong>Vue dùng directives, React dùng JS expressions.</strong> Vue
            có <code className="bg-slate-200 px-1 rounded">v-if</code>,{' '}
            <code className="bg-slate-200 px-1 rounded">v-else</code>,{' '}
            <code className="bg-slate-200 px-1 rounded">v-else-if</code> trong
            template. React dùng{' '}
            <code className="bg-slate-200 px-1 rounded">&&</code>, ternary, hoặc
            early return trực tiếp trong JSX.
          </p>
          <p>
            <strong>v-show vs style.</strong> Vue có{' '}
            <code className="bg-slate-200 px-1 rounded">v-show</code> giữ
            element trong DOM và toggle{' '}
            <code className="bg-slate-200 px-1 rounded">display: none</code>.
            React tương đương là{' '}
            <code className="bg-slate-200 px-1 rounded">
              {"style={{ display: show ? '' : 'none' }}"}
            </code>
            . Dùng <code className="bg-slate-200 px-1 rounded">&&</code> sẽ
            unmount hoàn toàn.
          </p>
          <p>
            <strong>Early return pattern.</strong> React cho phép return sớm
            trong function component — đây là pattern không có tương đương trực
            tiếp trong Vue template.
          </p>
        </div>
      </div>
    </div>
  )
}

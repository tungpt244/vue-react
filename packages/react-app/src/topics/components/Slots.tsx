import { useState } from 'react'

const DEMO_CODE = `// React — children + named props + render props

// Default slot → children prop
function Card({
  children,
  header,
  footer,
}: {
  children: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
}) {
  return (
    <div className="border rounded p-4">
      {header && <div className="border-b pb-2 mb-2">{header}</div>}
      <div>{children}</div>
      {footer && <div className="border-t pt-2 mt-2">{footer}</div>}
    </div>
  )
}

// Scoped slot → render prop
function DataList({ renderItem }: { renderItem: (item: string) => React.ReactNode }) {
  const items = ['Vue', 'React', 'Svelte']
  return <ul>{items.map(item => renderItem(item))}</ul>
}

// Usage:
<Card
  header={<h3>Title</h3>}
  footer={<small>Footer text</small>}
>
  <p>Main content goes here</p>
</Card>

<DataList renderItem={(item) => <li key={item}>{item}</li>} />`

function Card({
  children,
  header,
  footer,
}: {
  children: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
}) {
  return (
    <div className="border border-slate-200 rounded p-3 text-sm">
      {header && (
        <div className="border-b border-slate-200 pb-2 mb-2 font-semibold">
          {header}
        </div>
      )}
      <div>{children}</div>
      {footer && (
        <div className="border-t border-slate-200 pt-2 mt-2 text-slate-500 text-xs">
          {footer}
        </div>
      )}
    </div>
  )
}

function DataList({
  renderItem,
}: {
  renderItem: (item: string, index: number) => React.ReactNode
}) {
  const items = ['Vue 3', 'React 19', 'Svelte 5']
  return (
    <ul className="space-y-1">{items.map((item, i) => renderItem(item, i))}</ul>
  )
}

export default function Slots() {
  const [showCode, setShowCode] = useState(false)

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">Slots</h2>

        <div className="space-y-4">
          <div>
            <p className="text-xs text-slate-500 mb-2">
              Card với default slot (children) + named slots (header, footer):
            </p>
            <Card
              header={<span>Card Header</span>}
              footer={
                <span>Card Footer — created {new Date().getFullYear()}</span>
              }
            >
              <p className="text-slate-700">
                Đây là nội dung chính của card. Truyền qua{' '}
                <code className="bg-slate-200 px-1 rounded">children</code>{' '}
                prop.
              </p>
            </Card>
          </div>

          <div>
            <p className="text-xs text-slate-500 mb-2">
              DataList với render prop (scoped slot equivalent):
            </p>
            <DataList
              renderItem={(item, i) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm px-2 py-1 bg-slate-50 rounded"
                >
                  <span className="text-xs text-slate-400">{i + 1}.</span>
                  <strong>{item}</strong>
                </li>
              )}
            />
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
            <strong>React: children + named props + render props.</strong>{' '}
            Default slot →{' '}
            <code className="bg-slate-200 px-1 rounded">
              children: React.ReactNode
            </code>
            . Named slot → prop nhận ReactNode. Scoped slot → render prop
            (function trả về ReactNode).
          </p>
          <p>
            <strong>Vue: slot system.</strong>{' '}
            <code className="bg-slate-200 px-1 rounded">{'<slot />'}</code> cho
            default,{' '}
            <code className="bg-slate-200 px-1 rounded">
              {'<slot name="header" />'}
            </code>{' '}
            cho named, scoped slot truyền data ngược:{' '}
            <code className="bg-slate-200 px-1 rounded">
              {'<slot :item="item" />'}
            </code>
            .
          </p>
          <p>
            <strong>Cùng sức mạnh composition.</strong> Vue có syntax đặc biệt
            cho slots. React dùng props thông thường — đơn giản hơn về concept,
            nhưng scoped slot (render props) thì verbose hơn.
          </p>
        </div>
      </div>
    </div>
  )
}

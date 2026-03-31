import { useState } from 'react'

interface Props {
  name: string
  count: number
  variant?: 'primary' | 'secondary'
}

// Typed component demo
function TypedCard({ name, count, variant = 'primary' }: Props) {
  const colorClass =
    variant === 'primary'
      ? 'bg-indigo-50 border-indigo-200 text-indigo-800'
      : 'bg-slate-50 border-slate-200 text-slate-800'
  return (
    <div className={`p-3 border rounded text-sm ${colorClass}`}>
      <strong>{name}</strong>: {count}
    </div>
  )
}

const DEMO_CODE = `// React: TypeScript props via interface
interface Props {
  name: string
  count: number
  variant?: 'primary' | 'secondary'
}

// Direct typing on function params — no compiler macro needed
function TypedCard({ name, count, variant = 'primary' }: Props) {
  return (
    <div>
      <strong>{name}</strong>: {count}
    </div>
  )
}

// Event handler typing — callback props
interface CardWithActionsProps {
  name: string
  count: number
  onIncrement: (newValue: number) => void
  onReset: () => void
}

function CardWithActions({ name, count, onIncrement, onReset }: CardWithActionsProps) {
  return (
    <div>
      <p>{name}: {count}</p>
      <button onClick={() => onIncrement(count + 1)}>+</button>
      <button onClick={onReset}>Reset</button>
    </div>
  )
}

// Generic components
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map((item, i) => <li key={i}>{renderItem(item)}</li>)}</ul>
}`

export default function Typescript() {
  const [name, setName] = useState('React')
  const [count, setCount] = useState(3)
  const [showCode, setShowCode] = useState(false)

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">
          TypeScript — Props Interface
        </h2>

        <p className="text-sm text-slate-500 mb-3">
          Typed component demo — thay đổi props để xem type safety
        </p>

        <div className="flex gap-3 mb-4 flex-wrap">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-slate-500">name (string)</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-slate-300 rounded px-2 py-1 text-sm w-32"
              placeholder="Enter name"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-slate-500">count (number)</span>
            <input
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              type="number"
              className="border border-slate-300 rounded px-2 py-1 text-sm w-24"
            />
          </label>
        </div>

        <div className="mb-2 text-sm text-slate-500">
          Rendering:{' '}
          <code className="bg-slate-100 px-1 rounded">
            {`<TypedCard name="${name}" count={${count}} />`}
          </code>
        </div>

        <TypedCard name={name} count={count} />
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
            <strong>React</strong> type props trực tiếp trên function params:{' '}
            <code className="bg-slate-200 px-1 rounded">
              function MyComp(props: Props)
            </code>{' '}
            hoặc destructured{' '}
            <code className="bg-slate-200 px-1 rounded">
              {'({ name, count }: Props)'}
            </code>
            . Plain TypeScript interface — không cần compiler macro.
          </p>
          <p>
            <strong>Vue SFC</strong> dùng compiler macros{' '}
            <code className="bg-slate-200 px-1 rounded">
              defineProps&lt;T&gt;()
            </code>{' '}
            và{' '}
            <code className="bg-slate-200 px-1 rounded">
              defineEmits&lt;T&gt;()
            </code>{' '}
            — type inference trực tiếp trong{' '}
            <code className="bg-slate-200 px-1 rounded">
              {'<script setup>'}
            </code>
            , không cần runtime overhead.
          </p>
          <p>
            <strong>Events:</strong> React type callback props trực tiếp:{' '}
            <code className="bg-slate-200 px-1 rounded">
              onClick: (value: number) =&gt; void
            </code>
            . Vue dùng{' '}
            <code className="bg-slate-200 px-1 rounded">
              defineEmits&lt;T&gt;()
            </code>
            . React có thêm generic components{' '}
            <code className="bg-slate-200 px-1 rounded">
              {'function List<T>({ items }: Props<T>)'}
            </code>{' '}
            — Vue cần defineComponent wrapper cho generic.
          </p>
        </div>
      </div>
    </div>
  )
}

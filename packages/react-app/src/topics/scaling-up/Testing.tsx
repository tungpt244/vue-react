import { useState } from 'react'

const COMPONENT_CODE = `// Counter.tsx
interface Props {
  initialCount?: number
}

export function Counter({ initialCount = 0 }: Props) {
  const [count, setCount] = useState(initialCount)

  return (
    <div>
      <p data-testid="count">Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  )
}`

const DEMO_CODE = `// Counter.test.tsx — using @testing-library/react + vitest
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Counter } from './Counter'

describe('Counter', () => {
  it('renders initial count', () => {
    render(<Counter />)
    expect(screen.getByTestId('count')).toHaveTextContent('Count: 0')
  })

  it('increments on button click', () => {
    render(<Counter />)
    fireEvent.click(screen.getByRole('button', { name: 'Increment' }))
    expect(screen.getByTestId('count')).toHaveTextContent('Count: 1')
  })

  it('starts from initialCount prop', () => {
    render(<Counter initialCount={5} />)
    // RTL queries by role + accessible name (user-centric)
    expect(screen.getByText('Count: 5')).toBeInTheDocument()
  })
})`

export default function Testing() {
  const [showCode, setShowCode] = useState(false)
  const [testRunning, setTestRunning] = useState(false)
  const [testPassed, setTestPassed] = useState(false)

  function runTests() {
    setTestRunning(true)
    setTestPassed(false)
    setTimeout(() => {
      setTestRunning(false)
      setTestPassed(true)
    }, 800)
  }

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">
          Testing — React Testing Library
        </h2>

        <div className="mb-4">
          <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">
            Component
          </h4>
          <pre className="bg-slate-900 text-slate-100 text-xs p-3 rounded overflow-x-auto">
            <code>{COMPONENT_CODE}</code>
          </pre>
        </div>

        <div className="mb-4">
          <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">
            Test file
          </h4>
          <pre className="bg-slate-900 text-slate-100 text-xs p-3 rounded overflow-x-auto">
            <code>{DEMO_CODE}</code>
          </pre>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={runTests}
            disabled={testRunning}
            className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50"
          >
            {testRunning ? 'Running...' : '▶ Run Tests'}
          </button>
          {testPassed && (
            <span className="text-sm text-green-700 font-medium">
              ✓ 3 tests passed (simulated)
            </span>
          )}
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
            <strong>React Testing Library (RTL)</strong> dùng{' '}
            <code className="bg-slate-200 px-1 rounded">render()</code> +{' '}
            <code className="bg-slate-200 px-1 rounded">screen</code> queries.
            RTL&apos;s philosophy: test như user interact — query bằng{' '}
            <code className="bg-slate-200 px-1 rounded">getByRole()</code>,{' '}
            <code className="bg-slate-200 px-1 rounded">getByText()</code>,{' '}
            <code className="bg-slate-200 px-1 rounded">getByLabelText()</code>{' '}
            (accessibility-first).
          </p>
          <p>
            <strong>Vue Test Utils (VTU)</strong> dùng{' '}
            <code className="bg-slate-200 px-1 rounded">mount()</code> /{' '}
            <code className="bg-slate-200 px-1 rounded">shallowMount()</code>.
            Cho phép query theo CSS selector (
            <code className="bg-slate-200 px-1 rounded">
              .find(&apos;.class&apos;)
            </code>
            ) hoặc component name — linh hoạt hơn nhưng dễ test implementation
            details.
          </p>
          <p>
            <strong>Điểm giống nhau:</strong> Cả hai đều chạy trên Vitest. Cùng
            dùng <code className="bg-slate-200 px-1 rounded">vi.fn()</code> cho
            spies/mocks. RTL enforce user-centric testing pattern tốt hơn cho
            accessibility.
          </p>
        </div>
      </div>
    </div>
  )
}

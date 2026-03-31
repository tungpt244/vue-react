import { useState } from 'react'

const DEMO_CODE = `// React — typed props via function signature
interface GreetingProps {
  name: string
  age?: number  // optional with default
}

function Greeting({ name, age = 0 }: GreetingProps) {
  return (
    <p>Hello, {name}! Age: {age}</p>
  )
}

// Parent usage:
<Greeting name="Boss" age={25} />
<Greeting name="Guest" />  // age defaults to 0`

function Greeting({ name, age = 0 }: { name: string; age?: number }) {
  return (
    <div className="p-3 bg-white border border-slate-200 rounded">
      <p className="text-sm">
        Hello, <strong>{name}</strong>! Age: <strong>{age}</strong>
      </p>
    </div>
  )
}

export default function Props() {
  const [name, setName] = useState('Boss')
  const [age, setAge] = useState(25)
  const [showCode, setShowCode] = useState(false)

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">Props</h2>

        <div className="space-y-3 mb-4">
          <div>
            <label className="text-sm font-medium block mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-slate-300 rounded px-2 py-1 text-sm w-full"
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="border border-slate-300 rounded px-2 py-1 text-sm w-32"
            />
          </div>
        </div>

        <p className="text-xs text-slate-500 mb-2">
          Child component nhận props:
        </p>
        <Greeting name={name} age={age} />
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
            <strong>React type props trong function signature.</strong> Có thể
            dùng inline type hoặc interface riêng. Default value dùng JS default
            parameters:{' '}
            <code className="bg-slate-200 px-1 rounded">{'{ age = 0 }'}</code>.
          </p>
          <p>
            <strong>Vue dùng defineProps compiler macro.</strong>{' '}
            <code className="bg-slate-200 px-1 rounded">
              defineProps{'<{ name: string; age?: number }>'}()
            </code>{' '}
            — không cần import. Default value dùng{' '}
            <code className="bg-slate-200 px-1 rounded">withDefaults()</code>.
          </p>
          <p>
            <strong>Cả hai đều type-safe.</strong> React thông qua TypeScript
            function type, Vue thông qua generic type argument trong macro.
          </p>
        </div>
      </div>
    </div>
  )
}

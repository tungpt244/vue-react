import { createContext, useContext, useState } from 'react'

const DEMO_CODE = `// React — createContext + useContext (provide/inject equivalent)

// 1. Create context
const ThemeContext = createContext<'light' | 'dark'>('light')

// 2. Provider wraps tree
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  return (
    <ThemeContext.Provider value={theme}>
      <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
        Toggle
      </button>
      {children}
    </ThemeContext.Provider>
  )
}

// 3. Any nested component reads context (no prop drilling!)
function DeepChild() {
  const theme = useContext(ThemeContext)
  return <div>Theme: {theme}</div>
}

// Vue equivalent:
// provide('theme', themeRef)  // in parent
// const theme = inject('theme')  // in any nested child`

const ThemeContext = createContext<'light' | 'dark'>('light')

function DeepChild() {
  const theme = useContext(ThemeContext)
  return (
    <div
      className={`p-3 rounded text-sm ${
        theme === 'dark'
          ? 'bg-slate-800 text-white'
          : 'bg-white text-slate-800 border border-slate-200'
      }`}
    >
      DeepChild reads theme via useContext: <strong>{theme}</strong>
    </div>
  )
}

function MiddleLayer() {
  return (
    <div className="pl-4 border-l-2 border-slate-300">
      <p className="text-xs text-slate-400 mb-2">
        MiddleLayer (không có props)
      </p>
      <DeepChild />
    </div>
  )
}

export default function ProvideInject() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [showCode, setShowCode] = useState(false)

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">Provide / Inject</h2>

        <ThemeContext.Provider value={theme}>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Theme:</span>
              <button
                onClick={() =>
                  setTheme((t) => (t === 'light' ? 'dark' : 'light'))
                }
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              >
                Toggle ({theme})
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Context provider ở đây. DeepChild ở dưới đọc mà không cần truyền
              props qua MiddleLayer:
            </p>

            <MiddleLayer />
          </div>
        </ThemeContext.Provider>
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
            <strong>React: createContext + Provider + useContext.</strong> Cần 3
            bước. Context phải được typed khi tạo. Provider wrap component tree,
            bất kỳ consumer nào cũng dùng{' '}
            <code className="bg-slate-200 px-1 rounded">useContext()</code>.
          </p>
          <p>
            <strong>Vue: provide() + inject().</strong> Đơn giản hơn — chỉ cần{' '}
            <code className="bg-slate-200 px-1 rounded">
              provide('key', value)
            </code>{' '}
            ở parent và{' '}
            <code className="bg-slate-200 px-1 rounded">inject('key')</code> ở
            bất kỳ descendant. Không cần create/Provider wrapper.
          </p>
          <p>
            <strong>React type-safe hơn.</strong> Context được typed khi tạo.
            Vue inject trả về{' '}
            <code className="bg-slate-200 px-1 rounded">T | undefined</code> —
            cần type assertion hoặc default value để đảm bảo type safety.
          </p>
        </div>
      </div>
    </div>
  )
}

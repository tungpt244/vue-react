import { useState, createContext, useContext, ReactNode } from 'react'

const DEMO_CODE = `// React: Context/Provider pattern (equivalent to Vue plugins)
interface NotificationCtx {
  show: (msg: string) => void
}

const NotificationContext = createContext<NotificationCtx | null>(null)

// Provider — wrap app or subtree
function NotificationProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('')
  const show = (msg: string) => setMessage(msg)
  return (
    <NotificationContext.Provider value={{ show }}>
      {children}
      {message && <div className="toast">{message}</div>}
    </NotificationContext.Provider>
  )
}

// Consumer hook
function useNotification() {
  return useContext(NotificationContext)
}

// Usage anywhere in subtree
function ChildComponent() {
  const notif = useNotification()
  return <button onClick={() => notif?.show('Hello!')}>Notify</button>
}`

interface NotificationCtx {
  show: (msg: string) => void
}

const NotificationContext = createContext<NotificationCtx | null>(null)

function NotificationProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false)

  const show = (msg: string) => {
    setMessage(msg)
    setVisible(true)
    setTimeout(() => setVisible(false), 2000)
  }

  return (
    <NotificationContext.Provider value={{ show }}>
      {children}
      {visible && (
        <div className="mt-3 px-3 py-2 bg-green-100 border border-green-300 text-green-800 text-sm rounded">
          {message}
        </div>
      )}
    </NotificationContext.Provider>
  )
}

function useNotification() {
  return useContext(NotificationContext)
}

function ChildA() {
  const notif = useNotification()
  return (
    <button
      onClick={() => notif?.show('Hello from Child A!')}
      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
    >
      Notify from Child A
    </button>
  )
}

function ChildB() {
  const notif = useNotification()
  return (
    <button
      onClick={() => notif?.show('Hello from Child B!')}
      className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
    >
      Notify from Child B
    </button>
  )
}

export default function Plugins() {
  const [showCode, setShowCode] = useState(false)

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">
          Plugins → Context/Provider
        </h2>

        <NotificationProvider>
          <div className="space-y-3">
            <p className="text-sm text-slate-500">
              Both buttons share the notification channel via{' '}
              <code className="bg-slate-200 px-1 rounded">
                NotificationContext
              </code>
            </p>
            <div className="flex gap-2">
              <ChildA />
              <ChildB />
            </div>
          </div>
        </NotificationProvider>
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
            <strong>Vue plugins dùng app.use().</strong> Plugin có quyền truy
            cập app instance — có thể register global components, directives,
            provide values qua provide/inject, thêm global properties (
            <code className="bg-slate-200 px-1 rounded">
              app.config.globalProperties
            </code>
            ). Rất flexible.
          </p>
          <p>
            <strong>React không có plugin system.</strong> Equivalent gần nhất
            là Context/Provider — inject values vào subtree. Custom hooks chia
            sẻ logic. Higher-Order Components (HOC) wrap components. Không có
            "global registration" — mọi thứ phải import explicit.
          </p>
          <p>
            <strong>Vue plugins tiện hơn nhưng ít explicit hơn.</strong> React
            Context buộc bạn thấy rõ dependency tree (provider ở đâu, consumer ở
            đâu). Vue plugin có thể inject magic vào mọi component mà không cần
            khai báo.
          </p>
        </div>
      </div>
    </div>
  )
}

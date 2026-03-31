import { useState } from 'react'

const DEMO_CODE = `// React Router v7 setup
// Import from 'react-router' only (not react-router-dom — merged in v7)
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router'

// App.tsx
function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/about" element={<AboutView />} />
        <Route path="/users/:id" element={<UserView />} />
        {/* Nested routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="stats" element={<Stats />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

// In component:
function UserView() {
  const { id } = useParams()           // get :id param
  const navigate = useNavigate()       // programmatic navigation

  return (
    <div>
      <p>User ID: {id}</p>
      <button onClick={() => navigate('/about')}>Go to About</button>
    </div>
  )
}`

interface Route {
  path: string
  label: string
}

const routes: Route[] = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/users/42', label: 'User Profile' },
]

export default function Routing() {
  const [currentRoute, setCurrentRoute] = useState('/')
  const [showCode, setShowCode] = useState(false)

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">Routing — React Router</h2>

        <p className="text-sm text-slate-500 mb-3">
          Simulated router using{' '}
          <code className="bg-slate-200 px-1 rounded">useState</code> — actual
          React Router uses{' '}
          <code className="bg-slate-200 px-1 rounded">{'<BrowserRouter>'}</code>
        </p>

        <div className="flex gap-2 flex-wrap mb-4">
          {routes.map((route) => (
            <button
              key={route.path}
              onClick={() => setCurrentRoute(route.path)}
              className={`px-3 py-1 rounded text-sm ${
                currentRoute === route.path
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {route.label}
            </button>
          ))}
        </div>

        <div className="p-3 bg-blue-50 border border-blue-200 rounded text-sm">
          <span className="text-blue-700 font-medium">Current route:</span>
          <code className="ml-2 text-blue-800">{currentRoute}</code>
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
            <strong>React Router v7</strong> dùng JSX để declare routes:{' '}
            <code className="bg-slate-200 px-1 rounded">
              {'<Route path="..." element={...} />'}
            </code>
            . Hooks:{' '}
            <code className="bg-slate-200 px-1 rounded">useNavigate()</code>,{' '}
            <code className="bg-slate-200 px-1 rounded">useParams()</code>,{' '}
            <code className="bg-slate-200 px-1 rounded">useLocation()</code>.
          </p>
          <p>
            <strong>Vue Router</strong> dùng JS config array:{' '}
            <code className="bg-slate-200 px-1 rounded">
              {'routes: [{ path, component }]'}
            </code>
            . Setup qua{' '}
            <code className="bg-slate-200 px-1 rounded">createRouter()</code>{' '}
            rồi{' '}
            <code className="bg-slate-200 px-1 rounded">app.use(router)</code>.
            Template dùng{' '}
            <code className="bg-slate-200 px-1 rounded">{'<RouterLink>'}</code>{' '}
            và{' '}
            <code className="bg-slate-200 px-1 rounded">{'<RouterView>'}</code>.
          </p>
          <p>
            <strong>Điểm giống nhau:</strong> Cả hai đều hỗ trợ nested routes,
            dynamic params (
            <code className="bg-slate-200 px-1 rounded">:id</code>),
            programmatic navigation. Vue có navigation guards ở router-level
            config, React v7 có loaders/actions (data APIs).
          </p>
        </div>
      </div>
    </div>
  )
}

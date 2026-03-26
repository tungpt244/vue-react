import { Outlet, useParams } from 'react-router'

export function Layout() {
  const { category, topicId } = useParams()
  const routeDisplay = category && topicId ? `${category} / ${topicId}` : null

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-semibold text-white bg-cyan-400 rounded px-2 py-1">
          React 19
        </span>
        {routeDisplay && (
          <span className="text-sm text-slate-500">{routeDisplay}</span>
        )}
      </div>
      <Outlet />
      {!routeDisplay && (
        <div className="text-sm text-slate-400">
          React 19 -- Waiting for topic selection
        </div>
      )}
    </div>
  )
}

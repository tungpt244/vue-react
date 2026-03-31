import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { CheckCircle2, Circle } from 'lucide-react'
import {
  getAllCategories,
  getTopicsByCategory,
  CATEGORIES,
  ROUTE_CHANGE_EVENT,
  type RouteChangeDetail,
} from '@vibe/shared'

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [search, setSearch] = useState('')
  const [visited, setVisited] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('vibe-progress') ?? '[]')
    } catch {
      return []
    }
  })
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const segments = pathname.split('/').filter(Boolean)
  const activeCategory = segments[0] ?? ''
  const activeTopicId = segments[1] ?? ''

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--sidebar-width',
      collapsed ? '3rem' : '16rem',
    )
  }, [collapsed])

  const filteredCategories = getAllCategories()
    .map((cat) => ({
      cat,
      topics: getTopicsByCategory(cat).filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase()),
      ),
    }))
    .filter(({ topics }) => topics.length > 0)

  function handleClick(category: string, slug: string) {
    navigate(`/${category}/${slug}`)
    window.dispatchEvent(
      new CustomEvent<RouteChangeDetail>(ROUTE_CHANGE_EVENT, {
        detail: { category, topicId: slug },
      }),
    )
    if (!visited.includes(slug)) {
      const updated = [...visited, slug]
      setVisited(updated)
      try {
        localStorage.setItem('vibe-progress', JSON.stringify(updated))
      } catch {
        // localStorage unavailable — silent degradation
      }
    }
  }

  return (
    <div
      className="fixed left-0 top-0 h-screen bg-white border-r border-slate-200 overflow-y-auto z-50"
      style={{ width: collapsed ? '3rem' : '16rem' }}
    >
      <div className="flex items-center justify-end px-2 py-2 border-b border-slate-100">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-slate-100 text-slate-500 cursor-pointer"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? '\u25B6' : '\u2630'}
        </button>
      </div>

      {!collapsed && (
        <>
          <div className="px-3 pt-3 pb-1">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm topic..."
              className="w-full px-2 py-2 text-sm border border-slate-200 rounded bg-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <nav>
            {filteredCategories.map(({ cat, topics: filteredTopics }) => (
              <div key={cat}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 pt-4 pb-1">
                  {CATEGORIES[cat]}
                </h3>
                {filteredTopics.map((topic) => {
                  const isActive =
                    activeCategory === topic.category &&
                    activeTopicId === topic.slug
                  return (
                    <button
                      key={topic.id}
                      onClick={() => handleClick(topic.category, topic.slug)}
                      className={[
                        'w-full text-left px-3 py-2 text-sm cursor-pointer rounded mx-1 block',
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'hover:bg-slate-50 text-slate-700',
                      ].join(' ')}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="truncate">{topic.title}</span>
                        {visited.includes(topic.id) ? (
                          <CheckCircle2
                            size={14}
                            className="text-blue-500 shrink-0 ml-2"
                          />
                        ) : (
                          <Circle
                            size={14}
                            className="text-slate-300 shrink-0 ml-2"
                          />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            ))}
          </nav>

          {search && filteredCategories.length === 0 && (
            <p className="text-sm text-slate-400 px-3 py-2">
              Không tìm thấy topic nào.
            </p>
          )}
        </>
      )}
    </div>
  )
}

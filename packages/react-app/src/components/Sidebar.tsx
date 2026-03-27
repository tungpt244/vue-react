import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import {
  getAllCategories,
  getTopicsByCategory,
  CATEGORIES,
  ROUTE_CHANGE_EVENT,
  type RouteChangeDetail,
} from '@vibe/shared'

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
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

  function handleClick(category: string, slug: string) {
    navigate(`/${category}/${slug}`)
    window.dispatchEvent(
      new CustomEvent<RouteChangeDetail>(ROUTE_CHANGE_EVENT, {
        detail: { category, topicId: slug },
      }),
    )
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
        >
          {collapsed ? '\u25B6' : '\u2630'}
        </button>
      </div>

      {!collapsed && (
        <nav>
          {getAllCategories().map((cat) => (
            <div key={cat}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 pt-4 pb-1">
                {CATEGORIES[cat]}
              </h3>
              {getTopicsByCategory(cat).map((topic) => {
                const isActive =
                  activeCategory === topic.category &&
                  activeTopicId === topic.slug
                return (
                  <button
                    key={topic.id}
                    onClick={() => handleClick(topic.category, topic.slug)}
                    className={[
                      'w-full text-left px-3 py-1.5 text-sm cursor-pointer rounded mx-1 block',
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'hover:bg-slate-50 text-slate-700',
                    ].join(' ')}
                  >
                    {topic.title}
                  </button>
                )
              })}
            </div>
          ))}
        </nav>
      )}
    </div>
  )
}

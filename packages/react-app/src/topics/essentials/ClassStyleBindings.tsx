import { useState } from 'react'

const DEMO_CODE = `// React — className là string, style là object
// 1. Template literal cho dynamic classes
<div className={\`\${isActive ? 'bg-blue-100' : ''}\`}>

// 2. Ternary cho toggle
<div className={theme === 'dark' ? 'bg-black' : 'bg-white'}>

// 3. style object (camelCase!)
<p style={{ fontSize: '16px', color: '#333' }}>

// Không có :class object syntax — dùng clsx library:
import clsx from 'clsx'
<div className={clsx('base', { active: isActive })}>
// clsx giúp viết gọn hơn template literals`

export default function ClassStyleBindings() {
  const [isActive, setIsActive] = useState(true)
  const [isHighlighted, setIsHighlighted] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [textColor, setTextColor] = useState('#334155')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [showCode, setShowCode] = useState(false)

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Class & Style Bindings</h2>

      <div className="border border-slate-200 rounded-lg p-4 mb-4 space-y-5">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
            1. className với template literals
          </p>
          <div
            className={`p-3 rounded border border-slate-200 text-sm mb-2 transition-all ${isActive ? 'bg-blue-100 border-blue-500' : ''} ${isHighlighted ? 'ring-2 ring-yellow-400' : ''}`}
          >
            Box với dynamic classes
            <span className="text-xs ml-1 text-slate-500">
              (
              {[isActive ? 'active' : '', isHighlighted ? 'highlighted' : '']
                .filter(Boolean)
                .join(', ') || 'không có class'}
              )
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsActive((v) => !v)}
              className={`px-3 py-1 rounded hover:opacity-80 text-sm ${isActive ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-700'}`}
            >
              {isActive ? 'Active BẬT' : 'Active TẮT'}
            </button>
            <button
              onClick={() => setIsHighlighted((v) => !v)}
              className={`px-3 py-1 rounded hover:opacity-80 text-sm ${isHighlighted ? 'bg-yellow-400 text-white' : 'bg-slate-200 text-slate-700'}`}
            >
              {isHighlighted ? 'Highlight BẬT' : 'Highlight TẮT'}
            </button>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
            2. className với ternary
          </p>
          <div
            className={`${theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white text-slate-800'} p-3 rounded border text-sm mb-2 transition-all`}
          >
            Theme preview — đang dùng {theme}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setTheme('light')}
              className={`px-3 py-1 rounded hover:opacity-80 text-sm ${theme === 'light' ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-700'}`}
            >
              Light
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`px-3 py-1 rounded hover:opacity-80 text-sm ${theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-700'}`}
            >
              Dark
            </button>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
            3. style object (camelCase)
          </p>
          <p
            style={{ fontSize: `${fontSize}px`, color: textColor }}
            className="mb-3 font-medium"
          >
            Styled text preview
          </p>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm">
              <span className="text-slate-600 w-24">
                Font size: {fontSize}px
              </span>
              <input
                type="range"
                min={12}
                max={32}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-32"
              />
            </label>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-slate-600 w-24">Màu:</span>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-8 h-8 rounded cursor-pointer border border-slate-300"
              />
              <span className="text-xs text-slate-400 font-mono">
                {textColor}
              </span>
            </label>
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
            <strong>
              className luôn là string — không có object/array syntax.
            </strong>{' '}
            React dùng{' '}
            <code className="bg-slate-200 px-1 rounded">className</code> (không
            phải <code className="bg-slate-200 px-1 rounded">class</code>). Phải
            tự build string bằng template literals hoặc library như{' '}
            <code className="bg-slate-200 px-1 rounded">clsx</code>.
          </p>
          <p>
            <strong>style nhận object với camelCase.</strong>{' '}
            <code className="bg-slate-200 px-1 rounded">fontSize</code> thay vì{' '}
            <code className="bg-slate-200 px-1 rounded">font-size</code>. Không
            auto-prefix vendor prefixes — phải thêm thủ công (hoặc dùng
            CSS-in-JS library).
          </p>
          <p>
            <strong>Vue có :class object/array syntax built-in</strong> →
            compile away tại build time, không có runtime overhead. React
            template literals được evaluate runtime mỗi render.
          </p>
        </div>
      </div>
    </div>
  )
}

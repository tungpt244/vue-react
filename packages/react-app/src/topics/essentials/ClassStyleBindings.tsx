import { useState } from 'react'

export default function ClassStyleBindings() {
  const [isActive, setIsActive] = useState(true)
  const [isHighlighted, setIsHighlighted] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [textColor, setTextColor] = useState('#334155')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Class & Style Bindings</h2>

      <div className="border border-slate-200 rounded-lg p-4 mb-4 space-y-5">
        {/* Section 1: className with template literals */}
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">1. className with template literals</p>
          <div
            className={`p-3 rounded border border-slate-200 text-sm mb-2 transition-all ${isActive ? 'bg-blue-100 border-blue-500' : ''} ${isHighlighted ? 'ring-2 ring-yellow-400' : ''}`}
          >
            Box with dynamic classes
            <span className="text-xs ml-1 text-slate-500">
              ({[isActive ? 'active' : '', isHighlighted ? 'highlighted' : ''].filter(Boolean).join(', ') || 'no dynamic classes'})
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsActive(v => !v)}
              className={`px-3 py-1 rounded hover:opacity-80 text-sm ${isActive ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-700'}`}
            >
              {isActive ? 'Active ON' : 'Active OFF'}
            </button>
            <button
              onClick={() => setIsHighlighted(v => !v)}
              className={`px-3 py-1 rounded hover:opacity-80 text-sm ${isHighlighted ? 'bg-yellow-400 text-white' : 'bg-slate-200 text-slate-700'}`}
            >
              {isHighlighted ? 'Highlight ON' : 'Highlight OFF'}
            </button>
          </div>
        </div>

        {/* Section 2: className with ternary */}
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">2. className with ternary</p>
          <div
            className={`${theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white text-slate-800'} p-3 rounded border text-sm mb-2 transition-all`}
          >
            Theme preview — currently {theme}
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

        {/* Section 3: style object */}
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">3. style object (camelCase properties)</p>
          <p
            style={{ fontSize: `${fontSize}px`, color: textColor }}
            className="mb-3 font-medium"
          >
            Styled text preview
          </p>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm">
              <span className="text-slate-600 w-24">Font size: {fontSize}px</span>
              <input
                type="range"
                min={12}
                max={32}
                value={fontSize}
                onChange={e => setFontSize(Number(e.target.value))}
                className="w-32"
              />
            </label>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-slate-600 w-24">Color:</span>
              <input
                type="color"
                value={textColor}
                onChange={e => setTextColor(e.target.value)}
                className="w-8 h-8 rounded cursor-pointer border border-slate-300"
              />
              <span className="text-xs text-slate-400 font-mono">{textColor}</span>
            </label>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-6 p-4 bg-slate-50 rounded">
        <h3 className="text-sm font-semibold mb-2">Key Differences</h3>
        <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
          <li>React uses <code className="bg-white px-1 rounded text-xs">className</code> (not <code className="bg-white px-1 rounded text-xs">class</code>) — it's always a string, no built-in object/array syntax like Vue's <code className="bg-white px-1 rounded text-xs">:class</code>.</li>
          <li>For complex class logic, libraries like <code className="bg-white px-1 rounded text-xs">clsx</code> help avoid messy template literals.</li>
          <li><code className="bg-white px-1 rounded text-xs">style</code> takes a JS object with camelCase properties (<code className="bg-white px-1 rounded text-xs">fontSize</code> not <code className="bg-white px-1 rounded text-xs">font-size</code>).</li>
          <li>React doesn't auto-prefix CSS properties — you must handle vendor prefixes manually.</li>
          <li>Vue's <code className="bg-white px-1 rounded text-xs">:class</code> object/array syntax compiles away — no runtime overhead. React template literals are evaluated at runtime.</li>
        </ul>
      </div>
    </div>
  )
}

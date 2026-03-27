import { useState } from 'react'

export default function TemplateSyntax() {
  const name = 'Nguyen Van A'
  const [showDetails, setShowDetails] = useState(false)
  const [skills] = useState(['Vue', 'TypeScript', 'CSS'])

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">Template Syntax</h2>

        <div className="bg-white rounded p-3 border border-slate-100 mb-3">
          <p className="font-medium">{name}</p>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className={`mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm${showDetails ? ' font-bold' : ''}`}
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>

          {showDetails && (
            <div className="mt-3 text-sm text-slate-600">
              <p>Email: nguyenvana@example.com</p>
              <p className="mt-1">Bio: Lập trình viên frontend yêu Vue.</p>
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-medium mb-1">Skills:</p>
          <ul className="list-disc list-inside text-sm text-slate-700">
            {skills.map(s => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 p-4 bg-slate-50 rounded">
        <h3 className="text-sm font-semibold mb-2">Key Differences</h3>
        <p className="text-sm text-slate-600 mb-2">
          React dùng JSX (JavaScript XML) — conditional rendering dùng JS expressions (
          <code className="bg-slate-200 px-1 rounded">&&</code>, ternary), list rendering dùng{' '}
          <code className="bg-slate-200 px-1 rounded">.map()</code>. Không có directive đặc biệt —
          mọi thứ chỉ là JavaScript.
        </p>
        <p className="text-sm text-slate-600">
          JSX cho phép dùng toàn bộ sức mạnh của JavaScript ngay trong markup. Đổi lại, cú pháp
          khác biệt hơn HTML thuần — cần <code className="bg-slate-200 px-1 rounded">className</code>{' '}
          thay vì <code className="bg-slate-200 px-1 rounded">class</code>, v.v.
        </p>
      </div>
    </div>
  )
}

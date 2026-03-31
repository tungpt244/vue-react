import { useState } from 'react'
import { createPortal } from 'react-dom'

const DEMO_CODE = `import { createPortal } from 'react-dom'

function Modal({ onClose }: { onClose: () => void }) {
  // Renders at document.body, outside the component tree in DOM
  // But events still bubble through React's virtual tree
  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6">
        <h2>Modal Content</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  )
}

function App() {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </>
  )
}`

function Modal({ onClose }: { onClose: () => void }) {
  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999 }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 shadow-xl max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-2">Modal via createPortal</h2>
        <p className="text-sm text-slate-600 mb-4">
          This modal is rendered at{' '}
          <code className="bg-slate-200 px-1 rounded">document.body</code> —
          check the DOM tree. But click events still bubble through React's
          virtual tree.
        </p>
        <button
          onClick={onClose}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Close
        </button>
      </div>
    </div>,
    document.body,
  )
}

export default function Teleport() {
  const [showModal, setShowModal] = useState(false)
  const [showCode, setShowCode] = useState(false)

  return (
    <div>
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-3">Teleport → createPortal</h2>

        <p className="text-sm text-slate-500 mb-4">
          Open the modal and inspect the DOM — it renders directly under{' '}
          <code className="bg-slate-200 px-1 rounded">{'<body>'}</code>, not
          inside this component.
        </p>

        <button
          onClick={() => setShowModal(true)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Open Modal
        </button>

        {showModal && <Modal onClose={() => setShowModal(false)} />}
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
            <strong>Vue {'<Teleport to="body">'} = React createPortal.</strong>{' '}
            Cả hai render content tại một DOM node khác — thường là{' '}
            <code className="bg-slate-200 px-1 rounded">document.body</code> —
            nhưng giữ nguyên event bubbling trong component tree. Dùng cho
            modals, tooltips, dropdowns để tránh{' '}
            <code className="bg-slate-200 px-1 rounded">overflow: hidden</code>{' '}
            clip.
          </p>
          <p>
            <strong>Vue syntax declarative hơn.</strong>{' '}
            <code className="bg-slate-200 px-1 rounded">
              {'<Teleport to="#modals">'}
            </code>{' '}
            trong template — tương tự một HTML attribute. React dùng function
            call{' '}
            <code className="bg-slate-200 px-1 rounded">
              createPortal(children, container)
            </code>{' '}
            — phải import từ react-dom.
          </p>
          <p>
            <strong>Cả hai giữ React/Vue event bubbling.</strong> Click event
            trong modal vẫn bubble qua React virtual tree (không phải DOM tree)
            — cho phép parent component catch events dù modal render ở{' '}
            <code className="bg-slate-200 px-1 rounded">body</code>.
          </p>
        </div>
      </div>
    </div>
  )
}

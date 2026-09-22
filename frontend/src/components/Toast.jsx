import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from 'lucide-react'
import { useEffect } from 'react'

const ICONS = {
  success: <CheckCircle size={16} className="text-emerald-400 shrink-0" />,
  error:   <AlertCircle size={16} className="text-red-400 shrink-0" />,
  warning: <AlertTriangle size={16} className="text-yellow-400 shrink-0" />,
  info:    <Info size={16} className="text-blue-400 shrink-0" />,
}

const BORDER = {
  success: 'border-emerald-500/20',
  error:   'border-red-500/20',
  warning: 'border-yellow-500/20',
  info:    'border-blue-500/20',
}

function ToastItem({ toast, onRemove }) {
  useEffect(() => {
    const t = setTimeout(() => onRemove(toast.id), toast.duration || 4000)
    return () => clearTimeout(t)
  }, [toast.id, toast.duration, onRemove])

  return (
    <div
      className={`toast-enter flex items-start gap-3 px-4 py-3 rounded-xl glass border ${BORDER[toast.type] || BORDER.info} shadow-xl min-w-64 max-w-sm`}
    >
      {ICONS[toast.type] || ICONS.info}
      <p className="text-[#f1f5f9] text-sm flex-1 leading-snug">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="text-[#64748b] hover:text-[#f1f5f9] transition-colors shrink-0 mt-0.5"
      >
        <X size={14} />
      </button>
    </div>
  )
}

export default function ToastContainer({ toasts, onRemove }) {
  if (!toasts.length) return null
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onRemove={onRemove} />
      ))}
    </div>
  )
}

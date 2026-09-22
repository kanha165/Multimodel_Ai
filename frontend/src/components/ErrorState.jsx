import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 animate-fade-in">
      <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
        <AlertTriangle size={28} className="text-red-400" />
      </div>
      <div className="text-center space-y-1 max-w-sm">
        <p className="text-[#f1f5f9] font-medium">Something went wrong</p>
        <p className="text-[#94a3b8] text-sm">{message || 'An unexpected error occurred. Please try again.'}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1e1e2a] hover:bg-[#252535] border border-[#2a2a3a] hover:border-blue-500/40 text-[#f1f5f9] text-sm font-medium transition-all duration-200"
        >
          <RefreshCw size={15} />
          Retry
        </button>
      )}
    </div>
  )
}

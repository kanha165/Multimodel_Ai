import { Cpu } from 'lucide-react'

export function LoadingSkeleton({ lines = 4 }) {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 rounded-lg shimmer"
          style={{ width: `${85 - i * 10}%` }}
        />
      ))}
    </div>
  )
}

export default function LoadingState({ message = 'Analyzing image…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-16 animate-fade-in">
      {/* Spinning ring */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-[#2a2a3a]" />
        <div className="absolute inset-0 rounded-full border-2 border-t-blue-500 border-r-purple-500 border-b-transparent border-l-transparent animate-spin" />
        <div className="absolute inset-2 rounded-full bg-[#16161f] flex items-center justify-center">
          <Cpu size={18} className="text-blue-400" />
        </div>
      </div>

      <div className="text-center space-y-1">
        <p className="text-[#f1f5f9] font-medium">{message}</p>
        <p className="text-[#64748b] text-sm">This may take a few seconds</p>
      </div>

      {/* Progress bar */}
      <div className="w-48 h-1 bg-[#2a2a3a] rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shimmer" style={{ width: '60%' }} />
      </div>
    </div>
  )
}

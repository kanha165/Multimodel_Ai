export default function FeatureCard({ icon: Icon, label, description, color = 'blue', onClick, active }) {
  const COLOR = {
    blue:   { bg: 'bg-blue-500/10',   border: 'border-blue-500/20',   icon: 'text-blue-400',   ring: 'ring-blue-500/30' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: 'text-purple-400', ring: 'ring-purple-500/30' },
    emerald:{ bg: 'bg-emerald-500/10',border: 'border-emerald-500/20',icon: 'text-emerald-400',ring: 'ring-emerald-500/30' },
    orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/20', icon: 'text-orange-400', ring: 'ring-orange-500/30' },
    rose:   { bg: 'bg-rose-500/10',   border: 'border-rose-500/20',   icon: 'text-rose-400',   ring: 'ring-rose-500/30' },
    cyan:   { bg: 'bg-cyan-500/10',   border: 'border-cyan-500/20',   icon: 'text-cyan-400',   ring: 'ring-cyan-500/30' },
    violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/20', icon: 'text-violet-400', ring: 'ring-violet-500/30' },
    yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', icon: 'text-yellow-400', ring: 'ring-yellow-500/30' },
    indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', icon: 'text-indigo-400', ring: 'ring-indigo-500/30' },
  }

  const c = COLOR[color] || COLOR.blue

  return (
    <button
      onClick={onClick}
      className={`
        group w-full text-left p-4 rounded-2xl border transition-all duration-200
        glass hover:bg-[#1e1e2a]
        ${active
          ? `${c.border} ring-2 ${c.ring} bg-[#1a1a28]`
          : 'border-[#2a2a3a] hover:border-[#3a3a50]'
        }
      `}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2.5 rounded-xl border shrink-0 transition-colors ${c.bg} ${c.border} group-hover:scale-105 transition-transform`}>
          <Icon size={18} className={c.icon} />
        </div>
        <div className="min-w-0 flex-1">
          <p className={`font-semibold text-sm truncate transition-colors ${active ? c.icon : 'text-[#f1f5f9]'}`}>
            {label}
          </p>
          {description && (
            <p className="text-[#64748b] text-xs mt-0.5 leading-snug line-clamp-2">{description}</p>
          )}
        </div>
      </div>
    </button>
  )
}

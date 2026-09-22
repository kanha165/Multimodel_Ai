import {
  MessageSquare, Package, ScanText, Leaf, PawPrint,
  FileText, MapPin, Layers, ShoppingCart, Brain,
  ArrowRight, Sparkles, Cpu, Zap,
} from 'lucide-react'

const FEATURES = [
  { id: 'qa',       label: 'Ask Anything',       icon: MessageSquare, color: 'blue',   description: 'Ask any question about an image' },
  { id: 'product',  label: 'Identify Product',   icon: Package,       color: 'cyan',   description: 'Brand, category, features' },
  { id: 'ocr',      label: 'Extract Text',        icon: ScanText,      color: 'purple', description: 'OCR from any image or document' },
  { id: 'plant',    label: 'Identify Plant',      icon: Leaf,          color: 'emerald',description: 'Species, type, characteristics' },
  { id: 'animal',   label: 'Identify Animal',     icon: PawPrint,      color: 'orange', description: 'Animal, class, habitat' },
  { id: 'document', label: 'Summarize Document',  icon: FileText,      color: 'violet', description: 'AI summary + key points' },
  { id: 'landmark', label: 'Identify Landmark',   icon: MapPin,        color: 'rose',   description: 'Location, type, description' },
  { id: 'similar',  label: 'Find Similar',        icon: Layers,        color: 'indigo', description: 'Visually similar products' },
  { id: 'search',   label: 'Search Products',     icon: ShoppingCart,  color: 'yellow', description: 'Web agent product search' },
]

const STAT_COLORS = ['text-blue-400', 'text-purple-400', 'text-emerald-400']

const STATS = [
  { label: 'AI Models',  value: '4+',  icon: Brain },
  { label: 'Features',   value: '9',   icon: Sparkles },
  { label: 'Avg Speed',  value: '<3s', icon: Zap },
]

const COLOR_MAP = {
  blue:   { bg: 'bg-blue-500/10',   border: 'border-blue-500/20',   icon: 'text-blue-400'   },
  cyan:   { bg: 'bg-cyan-500/10',   border: 'border-cyan-500/20',   icon: 'text-cyan-400'   },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: 'text-purple-400' },
  emerald:{ bg: 'bg-emerald-500/10',border: 'border-emerald-500/20',icon: 'text-emerald-400'},
  orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/20', icon: 'text-orange-400' },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/20', icon: 'text-violet-400' },
  rose:   { bg: 'bg-rose-500/10',   border: 'border-rose-500/20',   icon: 'text-rose-400'   },
  indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', icon: 'text-indigo-400' },
  yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', icon: 'text-yellow-400' },
}

export default function Dashboard({ onNavigate }) {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden border border-[#2a2a3a] bg-[#111118]">
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(139,92,246,0.15) 0%, transparent 60%)' }}
        />
        <div className="relative px-8 py-10 sm:py-14">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <Cpu size={11} />
              Powered by GPT-4o · Gemini · Claude
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#f1f5f9] leading-tight mb-3">
            Multimodal AI<br />
            <span className="gradient-text">Vision Intelligence</span>
          </h1>
          <p className="text-[#94a3b8] text-base max-w-lg">
            Upload any image and let AI identify products, extract text, recognize plants, animals, landmarks, and more — all from a single platform.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-8">
            {STATS.map(({ label, value, icon: Icon }, i) => (
              <div key={label} className="flex items-center gap-2">
                <Icon size={16} className={STAT_COLORS[i]} />
                <span className={`font-bold text-lg ${STAT_COLORS[i]}`}>{value}</span>
                <span className="text-[#64748b] text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature grid */}
      <div>
        <p className="text-[#64748b] text-xs uppercase tracking-widest mb-4 font-semibold">Choose a Feature</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {FEATURES.map(({ id, label, icon: Icon, color, description }) => {
            const c = COLOR_MAP[color] || COLOR_MAP.blue
            return (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className="group glass rounded-2xl p-5 border border-[#2a2a3a] hover:border-[#3a3a50] hover:bg-[#1a1a26] transition-all duration-200 text-left"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2.5 rounded-xl border ${c.bg} ${c.border}`}>
                    <Icon size={20} className={c.icon} />
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-[#3b3b50] group-hover:text-[#64748b] group-hover:translate-x-0.5 transition-all mt-1"
                  />
                </div>
                <p className="text-[#f1f5f9] font-semibold text-sm">{label}</p>
                <p className="text-[#64748b] text-xs mt-1">{description}</p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

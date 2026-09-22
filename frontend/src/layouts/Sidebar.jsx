import {
  Brain,
  LayoutDashboard,
  MessageSquare,
  Package,
  ScanText,
  Leaf,
  PawPrint,
  FileText,
  MapPin,
  Layers,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Zap,
} from 'lucide-react'
import { useState } from 'react'

const NAV_ITEMS = [
  { id: 'dashboard',       label: 'Dashboard',        icon: LayoutDashboard },
  { id: 'qa',              label: 'Image Q&A',         icon: MessageSquare },
  { id: 'product',         label: 'Product',           icon: Package },
  { id: 'ocr',             label: 'OCR',               icon: ScanText },
  { id: 'plant',           label: 'Plant',             icon: Leaf },
  { id: 'animal',          label: 'Animal',            icon: PawPrint },
  { id: 'document',        label: 'Document',          icon: FileText },
  { id: 'landmark',        label: 'Landmark',          icon: MapPin },
  { id: 'similar',         label: 'Similar Products',  icon: Layers },
  { id: 'search',          label: 'Product Search',    icon: ShoppingCart },
]

export default function Sidebar({ activePage, onNavigate }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`
        relative flex flex-col h-screen bg-[#111118] border-r border-[#1e1e2e]
        transition-all duration-300 ease-in-out shrink-0
        ${collapsed ? 'w-16' : 'w-60'}
      `}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-[#1e1e2e] ${collapsed ? 'justify-center' : ''}`}>
        <div className="p-1.5 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shrink-0">
          <Brain size={18} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <span className="font-bold text-[#f1f5f9] tracking-tight">VisionAI</span>
            <p className="text-[10px] text-[#64748b] leading-tight">Multimodal Platform</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 px-2">
        {!collapsed && (
          <p className="text-[10px] text-[#3b3b50] uppercase tracking-widest px-2 py-2 font-semibold">
            Features
          </p>
        )}
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const active = activePage === id
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              title={collapsed ? label : undefined}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-150 group relative
                ${active
                  ? 'bg-blue-600/15 text-blue-400 border border-blue-500/20'
                  : 'text-[#64748b] hover:text-[#f1f5f9] hover:bg-[#1a1a26] border border-transparent'
                }
                ${collapsed ? 'justify-center' : ''}
              `}
            >
              <Icon
                size={17}
                className={`shrink-0 transition-colors ${active ? 'text-blue-400' : 'text-[#64748b] group-hover:text-[#94a3b8]'}`}
              />
              {!collapsed && <span className="truncate">{label}</span>}
              {active && !collapsed && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400" />
              )}
            </button>
          )
        })}
      </nav>

      {/* Status */}
      {!collapsed && (
        <div className="px-3 py-3 border-t border-[#1e1e2e]">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#16161f]">
            <Zap size={12} className="text-emerald-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] text-[#64748b]">Backend</p>
              <p className="text-xs text-emerald-400 font-medium truncate">Connected</p>
            </div>
          </div>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="absolute -right-3 top-20 z-10 w-6 h-6 rounded-full bg-[#1e1e2e] border border-[#2a2a3a] flex items-center justify-center text-[#64748b] hover:text-[#f1f5f9] hover:bg-[#252535] transition-all"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  )
}

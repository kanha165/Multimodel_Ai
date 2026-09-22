import { Package, Tag, Palette, Star, ChevronRight } from 'lucide-react'
import ConfidenceBadge from '../ConfidenceBadge'
import ProviderBadge from '../ProviderBadge'
import { ensureArray, safe } from '../../utils/helpers'

function InfoRow({ icon: Icon, label, value }) {
  if (!value || value === '—') return null
  return (
    <div className="flex items-start gap-3 py-3 border-b border-[#1e1e2e] last:border-0">
      <div className="p-1.5 rounded-lg bg-[#1e1e2a] shrink-0">
        <Icon size={14} className="text-blue-400" />
      </div>
      <div>
        <p className="text-[#64748b] text-xs uppercase tracking-wide">{label}</p>
        <p className="text-[#f1f5f9] text-sm font-medium mt-0.5">{value}</p>
      </div>
    </div>
  )
}

export default function ProductResult({ data }) {
  if (!data) return null

  const features = ensureArray(data.features || data.key_features)
  const provider = data.provider || data.model_provider

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-[#64748b] text-xs uppercase tracking-widest mb-1">Identified Product</p>
            <h2 className="text-xl font-bold text-[#f1f5f9]">{safe(data.product_name || data.name)}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <ConfidenceBadge value={data.confidence} />
            <ProviderBadge provider={provider} />
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="glass rounded-2xl px-5 divide-y divide-[#1e1e2e]">
        <InfoRow icon={Tag} label="Category" value={safe(data.category)} />
        <InfoRow icon={Package} label="Brand" value={safe(data.brand)} />
        <InfoRow icon={Palette} label="Color" value={safe(data.color)} />
        <InfoRow icon={Star} label="Type" value={safe(data.product_type || data.type)} />
      </div>

      {/* Features */}
      {features.length > 0 && (
        <div className="glass rounded-2xl p-5">
          <p className="text-[#64748b] text-xs uppercase tracking-widest mb-3">Key Features</p>
          <ul className="space-y-2">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#94a3b8]">
                <ChevronRight size={14} className="text-blue-400 mt-0.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Description */}
      {data.description && (
        <div className="glass rounded-2xl p-5">
          <p className="text-[#64748b] text-xs uppercase tracking-widest mb-2">Description</p>
          <p className="text-[#94a3b8] text-sm leading-relaxed">{data.description}</p>
        </div>
      )}
    </div>
  )
}

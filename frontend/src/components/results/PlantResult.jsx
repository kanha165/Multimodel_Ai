import { Leaf, FlaskConical, ChevronRight } from 'lucide-react'
import ConfidenceBadge from '../ConfidenceBadge'
import ProviderBadge from '../ProviderBadge'
import { ensureArray, safe } from '../../utils/helpers'

export default function PlantResult({ data }) {
  if (!data) return null

  const characteristics = ensureArray(data.characteristics || data.features)

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <Leaf size={22} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-[#64748b] text-xs uppercase tracking-widest mb-0.5">Plant Identification</p>
              <h2 className="text-xl font-bold text-[#f1f5f9]">{safe(data.common_name || data.name)}</h2>
              {(data.scientific_name) && (
                <p className="text-[#64748b] text-sm italic mt-0.5">{data.scientific_name}</p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <ConfidenceBadge value={data.confidence} />
            <ProviderBadge provider={data.provider} />
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="glass rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.plant_type && (
          <div>
            <p className="text-[#64748b] text-xs uppercase tracking-wide mb-1">Plant Type</p>
            <p className="text-[#f1f5f9] text-sm font-medium">{data.plant_type}</p>
          </div>
        )}
        {data.family && (
          <div>
            <p className="text-[#64748b] text-xs uppercase tracking-wide mb-1">Family</p>
            <p className="text-[#f1f5f9] text-sm font-medium">{data.family}</p>
          </div>
        )}
        {data.origin && (
          <div>
            <p className="text-[#64748b] text-xs uppercase tracking-wide mb-1">Origin</p>
            <p className="text-[#f1f5f9] text-sm font-medium">{data.origin}</p>
          </div>
        )}
        {data.habitat && (
          <div>
            <p className="text-[#64748b] text-xs uppercase tracking-wide mb-1">Habitat</p>
            <p className="text-[#f1f5f9] text-sm font-medium">{data.habitat}</p>
          </div>
        )}
      </div>

      {/* Characteristics */}
      {characteristics.length > 0 && (
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <FlaskConical size={14} className="text-emerald-400" />
            <p className="text-[#64748b] text-xs uppercase tracking-widest">Characteristics</p>
          </div>
          <ul className="space-y-2">
            {characteristics.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#94a3b8]">
                <ChevronRight size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                {c}
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

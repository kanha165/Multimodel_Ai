import { PawPrint, ChevronRight } from 'lucide-react'
import ConfidenceBadge from '../ConfidenceBadge'
import ProviderBadge from '../ProviderBadge'
import { ensureArray, safe } from '../../utils/helpers'

export default function AnimalResult({ data }) {
  if (!data) return null

  const characteristics = ensureArray(data.characteristics || data.features)

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20">
              <PawPrint size={22} className="text-orange-400" />
            </div>
            <div>
              <p className="text-[#64748b] text-xs uppercase tracking-widest mb-0.5">Animal Identification</p>
              <h2 className="text-xl font-bold text-[#f1f5f9]">{safe(data.animal_name || data.name)}</h2>
              {data.scientific_name && (
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

      {/* Details grid */}
      <div className="glass rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.category && (
          <div>
            <p className="text-[#64748b] text-xs uppercase tracking-wide mb-1">Category</p>
            <p className="text-[#f1f5f9] text-sm font-medium">{data.category}</p>
          </div>
        )}
        {data.class && (
          <div>
            <p className="text-[#64748b] text-xs uppercase tracking-wide mb-1">Class</p>
            <p className="text-[#f1f5f9] text-sm font-medium">{data.class}</p>
          </div>
        )}
        {data.habitat && (
          <div>
            <p className="text-[#64748b] text-xs uppercase tracking-wide mb-1">Habitat</p>
            <p className="text-[#f1f5f9] text-sm font-medium">{data.habitat}</p>
          </div>
        )}
        {data.diet && (
          <div>
            <p className="text-[#64748b] text-xs uppercase tracking-wide mb-1">Diet</p>
            <p className="text-[#f1f5f9] text-sm font-medium">{data.diet}</p>
          </div>
        )}
        {(data.conservation_status || data.status) && (
          <div>
            <p className="text-[#64748b] text-xs uppercase tracking-wide mb-1">Conservation Status</p>
            <p className="text-[#f1f5f9] text-sm font-medium">{data.conservation_status || data.status}</p>
          </div>
        )}
        {data.region && (
          <div>
            <p className="text-[#64748b] text-xs uppercase tracking-wide mb-1">Region</p>
            <p className="text-[#f1f5f9] text-sm font-medium">{data.region}</p>
          </div>
        )}
      </div>

      {/* Characteristics */}
      {characteristics.length > 0 && (
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <PawPrint size={14} className="text-orange-400" />
            <p className="text-[#64748b] text-xs uppercase tracking-widest">Characteristics</p>
          </div>
          <ul className="space-y-2">
            {characteristics.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#94a3b8]">
                <ChevronRight size={14} className="text-orange-400 mt-0.5 shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Description */}
      {data.description && (
        <div className="glass rounded-2xl p-5">
          <p className="text-[#64748b] text-xs uppercase tracking-widest mb-2">About</p>
          <p className="text-[#94a3b8] text-sm leading-relaxed">{data.description}</p>
        </div>
      )}
    </div>
  )
}

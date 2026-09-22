import { MapPin, Globe, Building2 } from 'lucide-react'
import ConfidenceBadge from '../ConfidenceBadge'
import ProviderBadge from '../ProviderBadge'
import { safe } from '../../utils/helpers'

export default function LandmarkResult({ data }) {
  if (!data) return null

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
              <MapPin size={22} className="text-rose-400" />
            </div>
            <div>
              <p className="text-[#64748b] text-xs uppercase tracking-widest mb-0.5">Landmark Identified</p>
              <h2 className="text-xl font-bold text-[#f1f5f9]">{safe(data.landmark_name || data.name)}</h2>
              {data.location && (
                <p className="text-[#64748b] text-sm mt-0.5 flex items-center gap-1">
                  <Globe size={12} />
                  {data.location}
                </p>
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
        {data.type && (
          <div>
            <p className="text-[#64748b] text-xs uppercase tracking-wide mb-1">Type</p>
            <p className="text-[#f1f5f9] text-sm font-medium flex items-center gap-1.5">
              <Building2 size={13} className="text-rose-400" />
              {data.type}
            </p>
          </div>
        )}
        {data.country && (
          <div>
            <p className="text-[#64748b] text-xs uppercase tracking-wide mb-1">Country</p>
            <p className="text-[#f1f5f9] text-sm font-medium">{data.country}</p>
          </div>
        )}
        {data.city && (
          <div>
            <p className="text-[#64748b] text-xs uppercase tracking-wide mb-1">City</p>
            <p className="text-[#f1f5f9] text-sm font-medium">{data.city}</p>
          </div>
        )}
        {data.year_built && (
          <div>
            <p className="text-[#64748b] text-xs uppercase tracking-wide mb-1">Year Built</p>
            <p className="text-[#f1f5f9] text-sm font-medium">{data.year_built}</p>
          </div>
        )}
        {data.architectural_style && (
          <div>
            <p className="text-[#64748b] text-xs uppercase tracking-wide mb-1">Architectural Style</p>
            <p className="text-[#f1f5f9] text-sm font-medium">{data.architectural_style}</p>
          </div>
        )}
        {data.significance && (
          <div>
            <p className="text-[#64748b] text-xs uppercase tracking-wide mb-1">Significance</p>
            <p className="text-[#f1f5f9] text-sm font-medium">{data.significance}</p>
          </div>
        )}
      </div>

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

import { FileText, ChevronRight, Lightbulb, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import ProviderBadge from '../ProviderBadge'
import { copyToClipboard, ensureArray } from '../../utils/helpers'

export default function DocumentResult({ data, onToast }) {
  const [copied, setCopied] = useState(false)

  const summary = data?.summary || data?.text || ''
  const mainPoints = ensureArray(data?.main_points || data?.key_points || data?.points)
  const important = ensureArray(data?.important_information || data?.highlights || data?.important)

  const handleCopy = async () => {
    const ok = await copyToClipboard(summary)
    if (ok) {
      setCopied(true)
      onToast?.({ type: 'success', message: 'Summary copied!' })
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20">
              <FileText size={22} className="text-violet-400" />
            </div>
            <div>
              <p className="text-[#64748b] text-xs uppercase tracking-widest">Document Summary</p>
              <p className="text-[#f1f5f9] font-semibold">AI-generated summary</p>
            </div>
          </div>
          <ProviderBadge provider={data?.provider} />
        </div>
      </div>

      {/* Summary */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[#64748b] text-xs uppercase tracking-widest">Summary</p>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e1e2a] hover:bg-[#252535] border border-[#2a2a3a] text-[#94a3b8] hover:text-[#f1f5f9] text-xs font-medium transition-all"
          >
            {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p className="text-[#e2e8f0] text-sm leading-relaxed">{summary || 'No summary available.'}</p>
      </div>

      {/* Main Points */}
      {mainPoints.length > 0 && (
        <div className="glass rounded-2xl p-5">
          <p className="text-[#64748b] text-xs uppercase tracking-widest mb-3">Main Points</p>
          <ul className="space-y-2.5">
            {mainPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#94a3b8]">
                <span className="text-blue-400 font-bold shrink-0 w-5">{i + 1}.</span>
                {typeof point === 'string' ? point : JSON.stringify(point)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Important Information */}
      {important.length > 0 && (
        <div className="glass rounded-2xl p-5 border border-yellow-500/10">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={14} className="text-yellow-400" />
            <p className="text-[#64748b] text-xs uppercase tracking-widest">Important Information</p>
          </div>
          <ul className="space-y-2">
            {important.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#94a3b8]">
                <ChevronRight size={14} className="text-yellow-400 mt-0.5 shrink-0" />
                {typeof item === 'string' ? item : JSON.stringify(item)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

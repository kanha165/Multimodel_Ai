import { FileText, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import ConfidenceBadge from '../ConfidenceBadge'
import ProviderBadge from '../ProviderBadge'
import { copyToClipboard } from '../../utils/helpers'

export default function OCRResult({ data, onToast }) {
  const [copied, setCopied] = useState(false)

  const text = data?.extracted_text || data?.text || ''
  const lines = data?.lines || []

  const handleCopy = async () => {
    const ok = await copyToClipboard(text)
    if (ok) {
      setCopied(true)
      onToast?.({ type: 'success', message: 'Text copied to clipboard!' })
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <FileText size={20} className="text-blue-400" />
            </div>
            <div>
              <p className="text-[#64748b] text-xs uppercase tracking-widest">Extracted Text</p>
              <p className="text-[#f1f5f9] font-semibold">
                {text.length} characters · {text.split('\n').filter(Boolean).length} lines
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <ConfidenceBadge value={data?.confidence} />
            <ProviderBadge provider={data?.provider} />
          </div>
        </div>
      </div>

      {/* Text block */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[#64748b] text-xs uppercase tracking-widest">Full Text</p>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e1e2a] hover:bg-[#252535] border border-[#2a2a3a] text-[#94a3b8] hover:text-[#f1f5f9] text-xs font-medium transition-all"
          >
            {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <pre className="whitespace-pre-wrap text-[#94a3b8] text-sm leading-relaxed font-mono bg-[#0f0f16] rounded-xl p-4 max-h-72 overflow-y-auto">
          {text || '(No text detected)'}
        </pre>
      </div>

      {/* Line breakdown */}
      {lines.length > 0 && (
        <div className="glass rounded-2xl p-5">
          <p className="text-[#64748b] text-xs uppercase tracking-widest mb-3">Line Breakdown</p>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {lines.map((line, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <span className="text-[#3b82f6] font-mono text-xs w-6 shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-[#94a3b8]">{typeof line === 'string' ? line : line.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

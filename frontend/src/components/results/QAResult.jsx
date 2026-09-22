import { MessageSquare, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import ProviderBadge from '../ProviderBadge'
import { copyToClipboard } from '../../utils/helpers'

export default function QAResult({ data, question, onToast }) {
  const [copied, setCopied] = useState(false)

  const answer = data?.answer || data?.response || data?.result || ''

  const handleCopy = async () => {
    const ok = await copyToClipboard(answer)
    if (ok) {
      setCopied(true)
      onToast?.({ type: 'success', message: 'Answer copied!' })
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Question */}
      {question && (
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare size={14} className="text-purple-400" />
            <p className="text-[#64748b] text-xs uppercase tracking-widest">Your Question</p>
          </div>
          <p className="text-[#f1f5f9] text-sm font-medium">{question}</p>
        </div>
      )}

      {/* Answer */}
      <div className="glass rounded-2xl p-5 border border-blue-500/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <p className="text-[#64748b] text-xs uppercase tracking-widest">AI Answer</p>
          </div>
          <div className="flex items-center gap-2">
            <ProviderBadge provider={data?.provider} />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e1e2a] hover:bg-[#252535] border border-[#2a2a3a] text-[#94a3b8] hover:text-[#f1f5f9] text-xs font-medium transition-all"
            >
              {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
        <p className="text-[#e2e8f0] leading-relaxed text-sm whitespace-pre-wrap">
          {answer || 'No answer returned.'}
        </p>
      </div>
    </div>
  )
}

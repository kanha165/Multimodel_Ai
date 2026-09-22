import { Zap } from 'lucide-react'

const PROVIDER_STYLES = {
  openai:    'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  gemini:    'text-blue-400    bg-blue-400/10    border-blue-400/20',
  google:    'text-blue-400    bg-blue-400/10    border-blue-400/20',
  claude:    'text-orange-400  bg-orange-400/10  border-orange-400/20',
  anthropic: 'text-orange-400  bg-orange-400/10  border-orange-400/20',
  azure:     'text-cyan-400    bg-cyan-400/10    border-cyan-400/20',
  default:   'text-purple-400  bg-purple-400/10  border-purple-400/20',
}

export default function ProviderBadge({ provider }) {
  if (!provider) return null
  const key = provider.toLowerCase()
  const style = PROVIDER_STYLES[key] || PROVIDER_STYLES.default
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${style}`}>
      <Zap size={11} />
      {provider}
    </span>
  )
}

import { TrendingUp } from 'lucide-react'
import { confidenceColor, formatConfidence } from '../utils/helpers'

export default function ConfidenceBadge({ value, label = 'Confidence', showIcon = true }) {
  if (value == null) return null

  const formatted = formatConfidence(value)
  const colorClass = confidenceColor(value)

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${colorClass}`}>
      {showIcon && <TrendingUp size={11} />}
      {label}: {formatted}
    </span>
  )
}

// ── Image validation ──────────────────────────────────────────────────────────

export const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
export const MAX_FILE_SIZE_MB = 10

export function validateImage(file) {
  if (!file) return 'No file selected.'
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return 'Only JPG, PNG, and WEBP images are supported.'
  }
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    return `Image must be smaller than ${MAX_FILE_SIZE_MB}MB.`
  }
  return null
}

export function createImagePreview(file) {
  return URL.createObjectURL(file)
}

export function revokeImagePreview(url) {
  if (url) URL.revokeObjectURL(url)
}

// ── Formatting ────────────────────────────────────────────────────────────────

export function formatConfidence(value) {
  if (value == null) return null
  const num = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(num)) return value
  // Already a percentage
  if (num > 1) return `${Math.round(num)}%`
  // Decimal fraction 0–1
  return `${Math.round(num * 100)}%`
}

export function confidenceLevel(value) {
  const num = typeof value === 'string' ? parseFloat(value) : value
  const pct = num > 1 ? num : num * 100
  if (pct >= 85) return 'high'
  if (pct >= 60) return 'medium'
  return 'low'
}

export function confidenceColor(value) {
  const level = confidenceLevel(value)
  return {
    high:   'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    medium: 'text-yellow-400  bg-yellow-400/10  border-yellow-400/20',
    low:    'text-red-400     bg-red-400/10     border-red-400/20',
  }[level]
}

// ── Clipboard ─────────────────────────────────────────────────────────────────

export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

// ── String helpers ────────────────────────────────────────────────────────────

export function capitalize(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function truncate(str, max = 120) {
  if (!str || str.length <= max) return str
  return str.slice(0, max) + '…'
}

// Safe getter — returns fallback if value is null/undefined/empty string
export function safe(value, fallback = '—') {
  if (value === null || value === undefined || value === '') return fallback
  return value
}

// ── Array helpers ─────────────────────────────────────────────────────────────

export function ensureArray(value) {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

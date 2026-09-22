import { useState, useCallback } from 'react'
import { revokeImagePreview } from '../utils/helpers'

/**
 * Manages image state + async API call lifecycle for any feature page.
 * apiFn: (imageFile, ...args) => Promise<{ data, error }>
 */
export default function useAnalysis(apiFn) {
  const [image, setImage]     = useState(null)   // File
  const [preview, setPreview] = useState(null)   // object URL
  const [result, setResult]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const handleImageSelect = useCallback((file, url) => {
    setImage(file)
    setPreview(url)
    setResult(null)
    setError(null)
  }, [])

  const handleClear = useCallback(() => {
    revokeImagePreview(preview)
    setImage(null)
    setPreview(null)
    setResult(null)
    setError(null)
  }, [preview])

  const analyze = useCallback(async (...args) => {
    if (!image) return
    setLoading(true)
    setError(null)
    setResult(null)
    const { data, error: err } = await apiFn(image, ...args)
    setLoading(false)
    if (err) { setError(err); return }
    setResult(data)
  }, [image, apiFn])

  const reset = useCallback(() => {
    handleClear()
  }, [handleClear])

  return {
    image,
    preview,
    result,
    loading,
    error,
    handleImageSelect,
    handleClear,
    analyze,
    reset,
  }
}

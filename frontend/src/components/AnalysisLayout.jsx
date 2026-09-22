import { RotateCcw, Sparkles } from 'lucide-react'
import ImageUploader from './ImageUploader'
import LoadingState from './LoadingState'
import ErrorState from './ErrorState'

/**
 * Shared two-column layout for every feature page.
 * Left: image upload + extra inputs + analyze button
 * Right: result or states
 */
export default function AnalysisLayout({
  // from useAnalysis
  image, preview, result, loading, error,
  handleImageSelect, handleClear, analyze, reset,
  // page-specific
  title,
  loadingMessage,
  children,      // extra input slots (e.g. question field)
  resultNode,    // the <XxxResult /> component
  onRetry,
}) {
  const canAnalyze = !!image && !loading

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full animate-fade-in">
      {/* ── Left panel ── */}
      <div className="w-full lg:w-96 xl:w-[420px] shrink-0 flex flex-col gap-4">
        <div className="glass rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-[#64748b] text-xs uppercase tracking-widest font-semibold">Image Input</p>
            {(image || result) && (
              <button
                onClick={reset}
                className="flex items-center gap-1.5 text-[#64748b] hover:text-[#f1f5f9] text-xs transition-colors"
              >
                <RotateCcw size={12} />
                Reset
              </button>
            )}
          </div>

          <ImageUploader
            onImageSelect={handleImageSelect}
            image={image}
            preview={preview}
            onClear={handleClear}
          />

          {/* Extra inputs (question, etc.) */}
          {children}

          <button
            disabled={!canAnalyze}
            onClick={analyze}
            className={`
              w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm
              transition-all duration-200
              ${canAnalyze
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30'
                : 'bg-[#1e1e2a] text-[#3b3b50] cursor-not-allowed border border-[#2a2a3a]'
              }
            `}
          >
            <Sparkles size={16} />
            {loading ? 'Analyzing…' : 'Analyze'}
          </button>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 min-w-0">
        {loading && (
          <div className="glass rounded-2xl p-6">
            <LoadingState message={loadingMessage} />
          </div>
        )}

        {!loading && error && (
          <div className="glass rounded-2xl p-6">
            <ErrorState message={error} onRetry={onRetry || analyze} />
          </div>
        )}

        {!loading && !error && result && (
          <div className="animate-fade-in">
            {resultNode}
          </div>
        )}

        {!loading && !error && !result && (
          <div className="glass rounded-2xl h-full min-h-64 flex flex-col items-center justify-center gap-3 text-center p-8">
            <div className="w-16 h-16 rounded-2xl bg-[#1e1e2a] border border-[#2a2a3a] flex items-center justify-center">
              <Sparkles size={24} className="text-[#3b3b50]" />
            </div>
            <p className="text-[#64748b] font-medium">No results yet</p>
            <p className="text-[#3b3b50] text-sm">Upload an image and click Analyze</p>
          </div>
        )}
      </div>
    </div>
  )
}

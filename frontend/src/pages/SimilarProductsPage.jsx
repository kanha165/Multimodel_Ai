import { Info } from 'lucide-react'
import AnalysisLayout from '../components/AnalysisLayout'
import SimilarProductsResult from '../components/results/SimilarProductsResult'
import useAnalysis from '../hooks/useAnalysis'
import { findSimilarProducts } from '../services/api'

export default function SimilarProductsPage({ toast }) {
  const analysis = useAnalysis(findSimilarProducts)

  return (
    <AnalysisLayout
      {...analysis}
      title="Visual Similarity Search"
      loadingMessage="Searching for similar products…"
      resultNode={<SimilarProductsResult data={analysis.result} />}
    >
      {/* Modular notice */}
      <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-blue-500/5 border border-blue-500/15 text-xs text-[#64748b]">
        <Info size={13} className="text-blue-400 mt-0.5 shrink-0" />
        <span>
          Similarity endpoints are modular and will be updated when the backend API is finalized.
        </span>
      </div>
    </AnalysisLayout>
  )
}

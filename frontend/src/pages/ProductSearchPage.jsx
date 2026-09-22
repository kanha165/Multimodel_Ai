import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import AnalysisLayout from '../components/AnalysisLayout'
import ProductSearchResult from '../components/results/ProductSearchResult'
import useAnalysis from '../hooks/useAnalysis'
import { searchProduct } from '../services/api'

export default function ProductSearchPage({ toast }) {
  const [question, setQuestion] = useState('Find this product online with price and where to buy')
  const analysis = useAnalysis(searchProduct)

  const handleAnalyze = () => {
    analysis.analyze(question || 'Find this product online')
  }

  return (
    <AnalysisLayout
      {...analysis}
      analyze={handleAnalyze}
      title="Product Web Search"
      loadingMessage="Searching web for product…"
      resultNode={<ProductSearchResult data={analysis.result} />}
    >
      <div className="space-y-1.5">
        <label className="text-[#64748b] text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5">
          <ShoppingCart size={11} />
          Search Intent
        </label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Find this product online with price and where to buy…"
          rows={2}
          className="w-full bg-[#0f0f16] border border-[#2a2a3a] focus:border-blue-500/50 rounded-xl px-4 py-3 text-[#f1f5f9] text-sm placeholder:text-[#3b3b50] outline-none resize-none transition-colors"
        />
      </div>
    </AnalysisLayout>
  )
}

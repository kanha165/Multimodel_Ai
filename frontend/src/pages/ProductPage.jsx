import AnalysisLayout from '../components/AnalysisLayout'
import ProductResult from '../components/results/ProductResult'
import useAnalysis from '../hooks/useAnalysis'
import { identifyProduct } from '../services/api'

export default function ProductPage({ toast }) {
  const analysis = useAnalysis(identifyProduct)

  return (
    <AnalysisLayout
      {...analysis}
      title="Product Identification"
      loadingMessage="Identifying product…"
      resultNode={<ProductResult data={analysis.result} />}
    />
  )
}

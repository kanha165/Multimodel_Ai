import AnalysisLayout from '../components/AnalysisLayout'
import PlantResult from '../components/results/PlantResult'
import useAnalysis from '../hooks/useAnalysis'
import { identifyPlant } from '../services/api'

export default function PlantPage({ toast }) {
  const analysis = useAnalysis(identifyPlant)

  return (
    <AnalysisLayout
      {...analysis}
      title="Plant Identification"
      loadingMessage="Identifying plant species…"
      resultNode={<PlantResult data={analysis.result} />}
    />
  )
}

import AnalysisLayout from '../components/AnalysisLayout'
import AnimalResult from '../components/results/AnimalResult'
import useAnalysis from '../hooks/useAnalysis'
import { identifyAnimal } from '../services/api'

export default function AnimalPage({ toast }) {
  const analysis = useAnalysis(identifyAnimal)

  return (
    <AnalysisLayout
      {...analysis}
      title="Animal Identification"
      loadingMessage="Identifying animal species…"
      resultNode={<AnimalResult data={analysis.result} />}
    />
  )
}

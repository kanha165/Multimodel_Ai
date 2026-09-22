import AnalysisLayout from '../components/AnalysisLayout'
import LandmarkResult from '../components/results/LandmarkResult'
import useAnalysis from '../hooks/useAnalysis'
import { identifyLandmark } from '../services/api'

export default function LandmarkPage({ toast }) {
  const analysis = useAnalysis(identifyLandmark)

  return (
    <AnalysisLayout
      {...analysis}
      title="Landmark Identification"
      loadingMessage="Identifying landmark…"
      resultNode={<LandmarkResult data={analysis.result} />}
    />
  )
}

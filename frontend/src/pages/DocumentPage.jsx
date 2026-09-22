import AnalysisLayout from '../components/AnalysisLayout'
import DocumentResult from '../components/results/DocumentResult'
import useAnalysis from '../hooks/useAnalysis'
import { summarizeDocument } from '../services/api'

export default function DocumentPage({ toast }) {
  const analysis = useAnalysis(summarizeDocument)

  return (
    <AnalysisLayout
      {...analysis}
      title="Document Summarization"
      loadingMessage="Summarizing document…"
      resultNode={
        <DocumentResult
          data={analysis.result}
          onToast={({ type, message }) => toast[type]?.(message)}
        />
      }
    />
  )
}

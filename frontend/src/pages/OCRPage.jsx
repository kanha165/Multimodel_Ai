import AnalysisLayout from '../components/AnalysisLayout'
import OCRResult from '../components/results/OCRResult'
import useAnalysis from '../hooks/useAnalysis'
import { extractOCR } from '../services/api'

export default function OCRPage({ toast }) {
  const analysis = useAnalysis(extractOCR)

  return (
    <AnalysisLayout
      {...analysis}
      title="OCR Text Extraction"
      loadingMessage="Extracting text from image…"
      resultNode={
        <OCRResult
          data={analysis.result}
          onToast={({ type, message }) => toast[type]?.(message)}
        />
      }
    />
  )
}

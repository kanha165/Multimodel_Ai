import { MessageSquare } from 'lucide-react'
import { useState } from 'react'
import AnalysisLayout from '../components/AnalysisLayout'
import QAResult from '../components/results/QAResult'
import useAnalysis from '../hooks/useAnalysis'
import { analyzeVision } from '../services/api'

export default function ImageQAPage({ toast }) {
  const [question, setQuestion] = useState('')
  const analysis = useAnalysis(analyzeVision)

  const handleAnalyze = () => {
    if (!question.trim()) {
      toast.warning('Please enter a question first.')
      return
    }
    analysis.analyze(question)
  }

  return (
    <AnalysisLayout
      {...analysis}
      analyze={handleAnalyze}
      title="Image Q&A"
      loadingMessage="Analyzing image and question…"
      resultNode={
        <QAResult
          data={analysis.result}
          question={question}
          onToast={({ type, message }) => toast[type]?.(message)}
        />
      }
    >
      {/* Question input */}
      <div className="space-y-1.5">
        <label className="text-[#64748b] text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5">
          <MessageSquare size={11} />
          Your Question
        </label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What is in this image? What color is the object? Describe the scene…"
          rows={3}
          className="w-full bg-[#0f0f16] border border-[#2a2a3a] focus:border-blue-500/50 rounded-xl px-4 py-3 text-[#f1f5f9] text-sm placeholder:text-[#3b3b50] outline-none resize-none transition-colors"
        />
      </div>
    </AnalysisLayout>
  )
}

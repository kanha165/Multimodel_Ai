import { Cpu, ExternalLink } from 'lucide-react'

const PAGE_META = {
  dashboard: { title: 'Dashboard',       sub: 'Select a feature and upload an image to get started' },
  qa:        { title: 'Image Q&A',        sub: 'Ask any question about an image' },
  product:   { title: 'Product ID',       sub: 'Identify products, brand, category and features' },
  ocr:       { title: 'OCR Extraction',   sub: 'Extract and digitize text from any image' },
  plant:     { title: 'Plant ID',         sub: 'Identify plants, species and characteristics' },
  animal:    { title: 'Animal ID',        sub: 'Identify animals, species and habitat' },
  document:  { title: 'Document Summary', sub: 'Summarize documents and extract key points' },
  landmark:  { title: 'Landmark ID',      sub: 'Identify famous landmarks and locations' },
  similar:   { title: 'Similar Products', sub: 'Find visually similar products' },
  search:    { title: 'Product Search',   sub: 'Search for products with AI-powered web agent' },
}

export default function Header({ activePage }) {
  const meta = PAGE_META[activePage] || PAGE_META.dashboard

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-[#1e1e2e] bg-[#0a0a0f]/80 backdrop-blur-sm shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 shrink-0">
          <Cpu size={16} className="text-blue-400" />
        </div>
        <div className="min-w-0">
          <h1 className="text-[#f1f5f9] font-semibold text-base leading-tight truncate">{meta.title}</h1>
          <p className="text-[#64748b] text-xs truncate">{meta.sub}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111118] border border-[#1e1e2e]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[#64748b] text-xs">
            {import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}
          </span>
        </div>
        <a
          href="http://127.0.0.1:8000/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111118] border border-[#1e1e2e] hover:border-blue-500/30 text-[#64748b] hover:text-[#f1f5f9] text-xs font-medium transition-all"
        >
          <ExternalLink size={12} />
          <span className="hidden sm:inline">API Docs</span>
        </a>
      </div>
    </header>
  )
}

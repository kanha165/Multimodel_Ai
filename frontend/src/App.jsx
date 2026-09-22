import { useState } from 'react'
import Header from './layouts/Header'
import Sidebar from './layouts/Sidebar'
import ToastContainer from './components/Toast'
import useToast from './hooks/useToast'

import Dashboard from './pages/Dashboard'
import ImageQAPage from './pages/ImageQAPage'
import ProductPage from './pages/ProductPage'
import OCRPage from './pages/OCRPage'
import PlantPage from './pages/PlantPage'
import AnimalPage from './pages/AnimalPage'
import DocumentPage from './pages/DocumentPage'
import LandmarkPage from './pages/LandmarkPage'
import ProductSearchPage from './pages/ProductSearchPage'
import SimilarProductsPage from './pages/SimilarProductsPage'

const PAGES = {
  dashboard: Dashboard,
  qa:        ImageQAPage,
  product:   ProductPage,
  ocr:       OCRPage,
  plant:     PlantPage,
  animal:    AnimalPage,
  document:  DocumentPage,
  landmark:  LandmarkPage,
  search:    ProductSearchPage,
  similar:   SimilarProductsPage,
}

export default function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const { toasts, removeToast, toast } = useToast()

  const PageComponent = PAGES[activePage] || Dashboard

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0f]">
      {/* Sidebar */}
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header activePage={activePage} />

        <main className="flex-1 overflow-y-auto p-6">
          {activePage === 'dashboard' ? (
            <PageComponent onNavigate={setActivePage} toast={toast} />
          ) : (
            <PageComponent toast={toast} />
          )}
        </main>
      </div>

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  )
}

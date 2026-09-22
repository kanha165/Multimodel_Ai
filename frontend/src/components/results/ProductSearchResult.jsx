import { ShoppingCart, ExternalLink, DollarSign, Globe, Package } from 'lucide-react'
import ProviderBadge from '../ProviderBadge'
import { ensureArray, safe } from '../../utils/helpers'

function ProductCard({ product, index }) {
  return (
    <div
      className="glass rounded-xl p-4 hover:border-blue-500/30 transition-all duration-200 animate-fade-in"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 shrink-0">
            <Package size={16} className="text-blue-400" />
          </div>
          <div className="min-w-0">
            <p className="text-[#f1f5f9] font-medium text-sm truncate">{safe(product.name || product.title || product.product_name)}</p>
            {product.website && (
              <p className="text-[#64748b] text-xs flex items-center gap-1 mt-0.5">
                <Globe size={10} />
                {product.website}
              </p>
            )}
          </div>
        </div>
        {product.price && (
          <span className="flex items-center gap-1 text-emerald-400 font-semibold text-sm shrink-0">
            <DollarSign size={13} />
            {product.price}
          </span>
        )}
      </div>

      {product.description && (
        <p className="text-[#64748b] text-xs mt-2 line-clamp-2">{product.description}</p>
      )}

      {(product.url || product.link) && (
        <a
          href={product.url || product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/20 text-blue-400 hover:text-blue-300 text-xs font-medium transition-all"
        >
          <ExternalLink size={11} />
          Open Product
        </a>
      )}
    </div>
  )
}

export default function ProductSearchResult({ data }) {
  if (!data) return null

  const products = ensureArray(data.products || data.results || data.items)
  const answer = data.answer || data.response

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <ShoppingCart size={22} className="text-blue-400" />
            </div>
            <div>
              <p className="text-[#64748b] text-xs uppercase tracking-widest mb-0.5">Product Search</p>
              {data.detected_product && (
                <h2 className="text-lg font-bold text-[#f1f5f9]">{data.detected_product}</h2>
              )}
              {data.search_intent && (
                <p className="text-[#64748b] text-xs mt-0.5">{data.search_intent}</p>
              )}
            </div>
          </div>
          <ProviderBadge provider={data.provider} />
        </div>
      </div>

      {/* AI Answer */}
      {answer && (
        <div className="glass rounded-2xl p-5 border border-blue-500/10">
          <p className="text-[#64748b] text-xs uppercase tracking-widest mb-2">AI Analysis</p>
          <p className="text-[#e2e8f0] text-sm leading-relaxed">{answer}</p>
        </div>
      )}

      {/* Product cards */}
      {products.length > 0 && (
        <div>
          <p className="text-[#64748b] text-xs uppercase tracking-widest mb-3 px-1">
            {products.length} Product{products.length !== 1 ? 's' : ''} Found
          </p>
          <div className="grid grid-cols-1 gap-3">
            {products.map((product, i) => (
              <ProductCard key={i} product={product} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

import { Search, ExternalLink, Tag, ImageIcon } from 'lucide-react'
import ProviderBadge from '../ProviderBadge'
import ConfidenceBadge from '../ConfidenceBadge'
import { ensureArray } from '../../utils/helpers'

function SimilarCard({ product, index }) {
  const score = product.similarity_score ?? product.score ?? product.similarity

  return (
    <div
      className="glass rounded-xl p-4 hover:border-purple-500/30 transition-all duration-200 animate-fade-in"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start gap-3">
        {/* Thumbnail */}
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-16 h-16 rounded-lg object-cover border border-[#2a2a3a] shrink-0"
          />
        ) : (
          <div className="w-16 h-16 rounded-lg bg-[#1e1e2a] border border-[#2a2a3a] flex items-center justify-center shrink-0">
            <ImageIcon size={20} className="text-[#64748b]" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <p className="text-[#f1f5f9] font-medium text-sm truncate">
            {product.name || product.product_name || product.title || 'Unknown Product'}
          </p>

          {product.category && (
            <p className="text-[#64748b] text-xs flex items-center gap-1 mt-0.5">
              <Tag size={10} />
              {product.category}
            </p>
          )}

          {product.price && (
            <p className="text-emerald-400 text-xs font-semibold mt-1">{product.price}</p>
          )}

          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {score != null && (
              <ConfidenceBadge value={score} label="Match" showIcon={false} />
            )}
            {(product.url || product.link) && (
              <a
                href={product.url || product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs hover:bg-purple-500/20 transition-colors"
              >
                <ExternalLink size={10} />
                View
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SimilarProductsResult({ data }) {
  if (!data) return null

  const products = ensureArray(data.similar_products || data.results || data.items || data.products)

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <Search size={22} className="text-purple-400" />
            </div>
            <div>
              <p className="text-[#64748b] text-xs uppercase tracking-widest mb-0.5">Visual Similarity</p>
              <p className="text-[#f1f5f9] font-semibold">
                {products.length} similar product{products.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>
          <ProviderBadge provider={data.provider} />
        </div>
      </div>

      {/* Query info */}
      {data.query_product && (
        <div className="glass rounded-2xl p-4 border border-purple-500/10">
          <p className="text-[#64748b] text-xs uppercase tracking-widest mb-1">Query Product</p>
          <p className="text-[#f1f5f9] text-sm font-medium">{data.query_product}</p>
        </div>
      )}

      {/* Product grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-3">
          {products.map((product, i) => (
            <SimilarCard key={i} product={product} index={i} />
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl p-10 text-center">
          <Search size={32} className="text-[#64748b] mx-auto mb-3" />
          <p className="text-[#94a3b8] text-sm">No similar products found.</p>
        </div>
      )}
    </div>
  )
}

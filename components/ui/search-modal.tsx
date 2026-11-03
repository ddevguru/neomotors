'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useStore } from '@/context/store-context'
import { PRODUCTS, COLLECTIONS, BRANDS } from '@/lib/data'

export function SearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useStore()
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return { products: [], collections: [], brands: [] }

    return {
      products: PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.collectionName.toLowerCase().includes(q) ||
          p.tag.toLowerCase().includes(q)
      ),
      collections: COLLECTIONS.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.marques.toLowerCase().includes(q) ||
          c.tag.toLowerCase().includes(q)
      ),
      brands: BRANDS.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.specialty.toLowerCase().includes(q) ||
          b.origin.toLowerCase().includes(q)
      ),
    }
  }, [query])

  const totalResults = results.products.length + results.collections.length + results.brands.length

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-[9995] flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-4 md:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl rounded-2xl bg-[#141013] border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.8)] overflow-hidden text-white"
          >
            {/* Input Header */}
            <div className="flex items-center gap-2.5 sm:gap-3 px-4 sm:px-6 py-3.5 sm:py-5 border-b border-white/10 bg-[#181316]">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff99ac] shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search models, marques (e.g. Porsche, GT-R, Mini GT)..."
                autoFocus
                className="flex-1 bg-transparent border-none outline-none text-sm sm:text-base text-white placeholder-white/40 font-sans"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-xs text-white/50 hover:text-white px-2 py-1 rounded bg-white/5"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors ml-2"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Area */}
            <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6">
              {!query ? (
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-3">
                    POPULAR SEARCHES
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {['Porsche 911 GT3 RS', 'Nissan Skyline GT-R', 'Eleanor Mustang', 'European Icons', 'MINI GT', 'Tarmac Works'].map(
                      (item) => (
                        <button
                          key={item}
                          onClick={() => setQuery(item)}
                          className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/80 hover:text-white transition-colors"
                        >
                          {item}
                        </button>
                      )
                    )}
                  </div>
                </div>
              ) : totalResults === 0 ? (
                <div className="text-center py-10 text-white/50">
                  <p className="text-sm">No specimens found matching &ldquo;{query}&rdquo;</p>
                  <p className="text-xs mt-1 text-white/30">Try searching for &quot;Porsche&quot;, &quot;GT-R&quot;, &quot;Muscle&quot; or browse the full catalog.</p>
                  <Link
                    href="/catalog"
                    onClick={() => setIsSearchOpen(false)}
                    className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#ff99ac] hover:underline"
                  >
                    Open Full Catalog <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Products */}
                  {results.products.length > 0 && (
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff99ac] block mb-3 font-bold">
                        SPECIMENS ({results.products.length})
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {results.products.map((product) => (
                          <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 transition-all group"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-14 h-14 rounded-lg object-cover bg-black/40 border border-white/10 flex-shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <span className="text-[9px] font-mono uppercase tracking-wider text-white/50 block">
                                {product.brand} • {product.scale}
                              </span>
                              <h4 className="text-xs font-bold text-white truncate group-hover:text-[#ff99ac] transition-colors">
                                {product.name}
                              </h4>
                              <span className="text-xs font-mono font-bold text-white/80 mt-0.5 block">
                                {product.priceFormatted}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Collections */}
                  {results.collections.length > 0 && (
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff99ac] block mb-3 font-bold">
                        COLLECTIONS ({results.collections.length})
                      </span>
                      <div className="space-y-2">
                        {results.collections.map((col) => (
                          <Link
                            key={col.id}
                            href={`/collections/${col.id}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 transition-all"
                          >
                            <div>
                              <span className="text-[9px] font-mono text-white/50 uppercase tracking-widest">
                                {col.tag}
                              </span>
                              <h4 className="text-sm font-bold text-white mt-0.5">{col.title}</h4>
                              <p className="text-xs text-white/50 truncate max-w-md">{col.marques}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-white/40 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Brands */}
                  {results.brands.length > 0 && (
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff99ac] block mb-3 font-bold">
                        MARQUES &amp; HOUSES ({results.brands.length})
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {results.brands.map((brand) => (
                          <Link
                            key={brand.slug}
                            href={`/catalog?brand=${encodeURIComponent(brand.name)}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white"
                          >
                            <span>{brand.name}</span>
                            <span className="text-[10px] font-mono text-white/50">({brand.origin})</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-white/10 bg-[#161214] flex items-center justify-between text-xs text-white/40">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#ff99ac]" /> 100% Authenticated Diecast Specimens
              </span>
              <span>Press ESC to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

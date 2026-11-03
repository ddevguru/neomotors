'use client'

import React, { useState, useMemo, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, Search, ArrowRight, Heart, ShoppingBag, Sparkles, Check, X, SlidersHorizontal } from 'lucide-react'
import { Navbar } from '@/components/ui/navbar'
import { CinematicFooter } from '@/components/ui/motion-footer'
import { PRODUCTS, COLLECTIONS, BRANDS, Product } from '@/lib/data'
import { useStore } from '@/context/store-context'

function CatalogContent() {
  const searchParams = useSearchParams()
  const initialBrand = searchParams.get('brand') || 'all'
  const initialCollection = searchParams.get('collection') || 'all'
  const initialFilter = searchParams.get('filter') || 'all'

  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand)
  const [selectedCollection, setSelectedCollection] = useState<string>(initialCollection)
  const [selectedSort, setSelectedSort] = useState<string>('featured')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false)
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false)

  const { addToCart, toggleWishlist, isWishlisted } = useStore()

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS]

    // Brand filter
    if (selectedBrand !== 'all') {
      result = result.filter((p) => p.brand.toLowerCase() === selectedBrand.toLowerCase())
    }

    // Collection filter
    if (selectedCollection !== 'all') {
      result = result.filter((p) => p.collectionId.toLowerCase() === selectedCollection.toLowerCase())
    }

    // Special tag/filter
    if (initialFilter === 'new') {
      result = result.filter((p) => p.tag === 'NEW ARRIVAL' || p.year >= 2022)
    }

    // Stock
    if (onlyInStock) {
      result = result.filter((p) => p.stockLeft > 0)
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tag.toLowerCase().includes(q)
      )
    }

    // Sorting
    if (selectedSort === 'price-low') {
      result.sort((a, b) => a.price - b.price)
    } else if (selectedSort === 'price-high') {
      result.sort((a, b) => b.price - a.price)
    } else if (selectedSort === 'year-new') {
      result.sort((a, b) => b.year - a.year)
    }

    return result
  }, [selectedBrand, selectedCollection, selectedSort, searchQuery, onlyInStock, initialFilter])

  const clearAllFilters = () => {
    setSelectedBrand('all')
    setSelectedCollection('all')
    setSearchQuery('')
    setOnlyInStock(false)
  }

  const activeFiltersCount =
    (selectedBrand !== 'all' ? 1 : 0) +
    (selectedCollection !== 'all' ? 1 : 0) +
    (searchQuery ? 1 : 0) +
    (onlyInStock ? 1 : 0)

  return (
    <div className="min-h-screen bg-[#0c090b] text-[#f5f2eb] font-sans selection:bg-[#ff99ac] selection:text-black">
      <Navbar />

      {/* Catalog Header */}
      <section className="relative pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 border-b border-white/10 overflow-hidden bg-gradient-to-b from-[#140f12] to-[#0c090b]">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1 rounded-full bg-white/5 border border-[#ff99ac]/30 mb-3 sm:mb-4 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#ff99ac]" />
              <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#ff99ac] font-bold uppercase">
                OFFICIAL SPECIMEN ARCHIVE • 1:64 SCALE
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold uppercase font-[family-name:var(--font-heading)] tracking-tight text-white">
              The Collector&apos;s <span className="text-[#ff99ac] italic lowercase font-[family-name:var(--font-accent)] font-normal">Catalog.</span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-white/60 mt-2 max-w-xl">
              Authentic diecast zinc alloy and resin specimens from licensed motorsport archives and iconic road car marques.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-white/50">
              ALLOCATED SPECIMENS: <strong className="text-white">{filteredProducts.length}</strong>
            </span>
          </div>
        </div>
      </section>

      {/* Main Catalog Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-12">
        {/* Controls Bar: Search, Quick Pills, Mobile Filter Trigger */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-6 sm:mb-8 pb-6 border-b border-white/10">
          {/* Search Input */}
          <div className="relative flex-1 max-w-full lg:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, marque, or chassis..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs text-white placeholder-white/40 outline-none focus:border-[#ff99ac]/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Collection Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none max-w-full">
            <button
              onClick={() => setSelectedCollection('all')}
              className={`px-3.5 sm:px-4 py-2 rounded-full font-mono text-[11px] sm:text-xs uppercase tracking-wider whitespace-nowrap transition-colors shrink-0 ${
                selectedCollection === 'all'
                  ? 'btn-primary-burgundy font-bold'
                  : 'btn-secondary-dark'
              }`}
            >
              All Themes
            </button>
            {COLLECTIONS.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCollection(c.id)}
                className={`px-3.5 sm:px-4 py-2 rounded-full font-mono text-[11px] sm:text-xs uppercase tracking-wider whitespace-nowrap transition-colors shrink-0 ${
                  selectedCollection === c.id
                    ? 'btn-primary-burgundy font-bold'
                    : 'btn-secondary-dark'
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>

          {/* Sorting & Filter Toggle */}
          <div className="flex items-center gap-2.5 justify-between lg:justify-end">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white outline-none cursor-pointer hover:bg-white/10 transition-colors"
            >
              <option value="featured" className="bg-[#141013] text-white">Sort: Featured</option>
              <option value="price-low" className="bg-[#141013] text-white">Price: Low to High</option>
              <option value="price-high" className="bg-[#141013] text-white">Price: High to Low</option>
              <option value="year-new" className="bg-[#141013] text-white">Year: Newest First</option>
            </select>

            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden px-3.5 sm:px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white flex items-center gap-1.5 sm:gap-2 shrink-0"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#ff99ac]" />
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </button>
          </div>
        </div>

        {/* Layout Grid: Sidebar Filters + Products */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Desktop Sidebar Filters */}
          <aside className={`lg:block ${showMobileFilters ? 'block mb-6' : 'hidden'} space-y-8`}>
            {/* Active Filters Clear */}
            {activeFiltersCount > 0 && (
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs">
                <span className="text-white/60 font-mono">
                  {activeFiltersCount} active filter{activeFiltersCount > 1 ? 's' : ''}
                </span>
                <button
                  onClick={clearAllFilters}
                  className="text-[#ff99ac] hover:underline font-bold"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Brands Filter */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#ff99ac] font-bold block">
                MARQUE / MAKER
              </span>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedBrand('all')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono text-left transition-colors ${
                    selectedBrand === 'all'
                      ? 'bg-white/10 text-white font-bold'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>All Marques</span>
                  <span>{PRODUCTS.length}</span>
                </button>
                {BRANDS.map((b) => {
                  const count = PRODUCTS.filter((p) => p.brand.toLowerCase() === b.name.toLowerCase()).length
                  const isSelected = selectedBrand.toLowerCase() === b.name.toLowerCase()

                  return (
                    <button
                      key={b.slug}
                      onClick={() => setSelectedBrand(isSelected ? 'all' : b.name)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono text-left transition-colors ${
                        isSelected
                          ? 'bg-[#8A1538]/40 border border-[#ff99ac]/30 text-white font-bold'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{b.name}</span>
                      <span className="text-white/40">({count})</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Quick Checkbox: In Stock */}
            <div className="pt-4 border-t border-white/10">
              <label className="flex items-center gap-3 cursor-pointer text-xs font-mono text-white/80 hover:text-white">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded bg-white/10 border-white/20 text-[#8A1538] focus:ring-0 w-4 h-4 cursor-pointer"
                />
                <span>Ready for Allocation (In Stock)</span>
              </label>
            </div>

            {/* Authenticity Guarantee Card */}
            <div className="p-4 rounded-xl bg-[#161214] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Sparkles className="w-3.5 h-3.5 text-[#ff99ac]" />
                <span>Neomotors Authenticity</span>
              </div>
              <p className="text-[11px] text-white/50 leading-relaxed">
                Every specimen includes a factory CAD verified certificate, authentic blister seal, and insured protective acrylic showcase.
              </p>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-white/10 space-y-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto text-white/40">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">No specimens match your filters</h3>
                <p className="text-xs text-white/50 max-w-sm mx-auto">
                  Try clearing some filter criteria or searching for another marquee like &ldquo;Porsche&rdquo;, &ldquo;GT-R&rdquo;, or &ldquo;Mini GT&rdquo;.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="btn-primary-burgundy px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg"
                >
                  <span>Clear All Filters</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const liked = isWishlisted(product.id)

                  return (
                    <div
                      key={product.id}
                      className="group rounded-2xl bg-[#141013] border border-white/10 hover:border-[#ff99ac]/40 transition-all overflow-hidden flex flex-col justify-between shadow-xl"
                    >
                      {/* Image Frame */}
                      <div className="relative aspect-[16/11] overflow-hidden bg-black/60">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-50" />

                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 border border-white/10 text-[9px] font-mono tracking-widest text-[#ff99ac] font-bold uppercase backdrop-blur-md">
                          {product.tag}
                        </span>

                        <button
                          onClick={() => toggleWishlist(product.id)}
                          aria-label="Wishlist toggle"
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 flex items-center justify-center text-white transition-all backdrop-blur-md"
                        >
                          <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-[#ff99ac] text-[#ff99ac]' : 'text-white'}`} />
                        </button>

                        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-white/60">
                          <span>{product.brand}</span>
                          <span>{product.scale}</span>
                        </div>
                      </div>

                      {/* Info & CTA */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block">
                            {product.collectionName}
                          </span>
                          <h3 className="text-sm font-bold text-white mt-0.5 group-hover:text-[#ff99ac] transition-colors leading-snug truncate">
                            <Link href={`/product/${product.slug}`}>
                              {product.name}
                            </Link>
                          </h3>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-base font-bold font-mono text-white">
                              {product.priceFormatted}
                            </span>
                            {product.originalPrice && (
                              <span className="text-xs font-mono text-white/40 line-through">
                                {product.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-2">
                          <button
                            onClick={() => addToCart(product, 1)}
                            className="btn-primary-burgundy flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                          >
                            <ShoppingBag className="w-3.5 h-3.5 text-[#ff99ac]" /> Allocate
                          </button>
                          <Link
                            href={`/product/${product.slug}`}
                            className="btn-secondary-dark py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center"
                            title="View Spec Sheet"
                          >
                            <ArrowRight className="w-3.5 h-3.5 text-[#ff99ac]" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <CinematicFooter />
    </div>
  )
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0c090b] text-white flex items-center justify-center font-mono">Loading Neomotors Archive...</div>}>
      <CatalogContent />
    </Suspense>
  )
}

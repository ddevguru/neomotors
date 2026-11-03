'use client'

import React, { use, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Sparkles,
  ChevronDown,
  RotateCcw,
  Check,
  Share2,
} from 'lucide-react'
import { Navbar } from '@/components/ui/navbar'
import { CinematicFooter } from '@/components/ui/motion-footer'
import { PRODUCTS, Product } from '@/lib/data'
import { useStore } from '@/context/store-context'

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const product = PRODUCTS.find((p) => p.slug === resolvedParams.slug)

  if (!product) {
    notFound()
  }

  const { addToCart, toggleWishlist, isWishlisted, showNotification } = useStore()
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [openAccordion, setOpenAccordion] = useState<string | null>('provenance')

  const liked = isWishlisted(product.id)
  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image]

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.collectionId === product.collectionId || p.brand === product.brand)
  ).slice(0, 3)

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      showNotification('Link copied to clipboard')
    }
  }

  return (
    <div className="min-h-screen bg-[#0c090b] text-[#f5f2eb] font-sans selection:bg-[#ff99ac] selection:text-black">
      <Navbar />

      {/* Breadcrumb Bar */}
      <div className="border-b border-white/10 bg-[#120e11]/80 backdrop-blur-md px-6 md:px-12 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-white/60">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/catalog" className="hover:text-white">Catalog</Link>
            <span>/</span>
            <Link href={`/collections/${product.collectionId}`} className="hover:text-white">
              {product.collectionName}
            </Link>
            <span>/</span>
            <span className="text-white font-bold truncate max-w-[200px]">{product.name}</span>
          </div>

          <button
            onClick={handleShare}
            className="hidden sm:flex items-center gap-1.5 text-white/60 hover:text-white transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" /> Share Specimen
          </button>
        </div>
      </div>

      {/* Main Product Stage */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Image Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Large Image Frame */}
            <div className="relative aspect-[16/11] rounded-3xl overflow-hidden bg-gradient-to-b from-[#181216] to-[#0e0a0d] border border-white/10 shadow-2xl">
              <motion.img
                key={activeImageIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                src={images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />

              {/* Tag Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-black/70 border border-white/20 text-[10px] font-mono tracking-widest text-[#ff99ac] font-bold uppercase backdrop-blur-md">
                  {product.tag}
                </span>
                <span className="px-3 py-1 rounded-full bg-black/70 border border-white/20 text-[10px] font-mono tracking-widest text-white/80 font-bold uppercase backdrop-blur-md">
                  {product.scale} DIECAST
                </span>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 flex items-center justify-center text-white transition-all backdrop-blur-md"
                aria-label="Wishlist toggle"
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-[#ff99ac] text-[#ff99ac]' : 'text-white'}`} />
              </button>

              {/* Bottom spec pill */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-2 rounded-xl bg-black/70 border border-white/10 backdrop-blur-md text-[11px] font-mono text-white/70">
                <span>SERIAL: {product.chassisNumber}</span>
                <span>LIMITED: {product.editionSize} UNITS</span>
              </div>
            </div>

            {/* Thumbnail Selectors */}
            {images.length > 1 && (
              <div className="flex items-center gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#ff99ac] scale-105 shadow-[0_0_15px_rgba(255,153,172,0.3)]'
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Specimen Details & Purchase Action (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#ff99ac] font-bold tracking-widest uppercase">
                <span>{product.brand}</span>
                <span>{product.collectionName}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold uppercase font-[family-name:var(--font-heading)] text-white tracking-tight mt-1 leading-tight">
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-3xl font-extrabold font-mono text-white">
                  {product.priceFormatted}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-mono text-white/40 line-through">
                    {product.originalPrice}
                  </span>
                )}
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#8A1538]/40 border border-[#ff99ac]/30 text-[#ff99ac]">
                  TAX INCLUDED
                </span>
              </div>

              {/* Stock Status Bar */}
              <div className="mt-4 p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-2 text-white/80">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Allocation Batch Active
                </span>
                <span className="text-[#ff99ac] font-bold">
                  {product.stockLeft} Specimens Remaining
                </span>
              </div>
            </div>

            <p className="text-sm text-white/70 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Quantity Selector & Add to Cart */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center justify-center border border-white/15 rounded-full bg-white/5 px-3 py-1.5 self-center sm:self-auto">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-mono font-bold text-sm text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stockLeft, q + 1))}
                    className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#8A1538] to-[#5C1422] text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(138,21,56,0.4)] text-center"
                >
                  <ShoppingBag className="w-4 h-4 text-[#ff99ac]" /> Allocate to Bag
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px] font-mono text-white/50 pt-2 text-center">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#ff99ac]" /> Express 48h Dispatch
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#ff99ac]" /> Authenticated Mint Blister
                </span>
              </div>
            </div>

            {/* Technical Specifications Sheet */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#ff99ac] font-bold block">
                ENGINEERING SPECIFICATIONS
              </span>
              <div className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden divide-y divide-white/5 text-xs font-mono">
                <div className="flex justify-between p-3">
                  <span className="text-white/50">ORIGIN</span>
                  <span className="text-white font-semibold">{product.specs.origin}</span>
                </div>
                <div className="flex justify-between p-3">
                  <span className="text-white/50">LACQUER</span>
                  <span className="text-white font-semibold text-right max-w-[220px]">{product.specs.lacquer}</span>
                </div>
                <div className="flex justify-between p-3">
                  <span className="text-white/50">CHASSIS</span>
                  <span className="text-white font-semibold text-right max-w-[220px]">{product.specs.chassis}</span>
                </div>
                <div className="flex justify-between p-3">
                  <span className="text-white/50">WHEELS & TIRES</span>
                  <span className="text-white font-semibold text-right max-w-[220px]">{product.specs.wheels}</span>
                </div>
                <div className="flex justify-between p-3">
                  <span className="text-white/50">CAMBER ANGLE</span>
                  <span className="text-white font-semibold">{product.specs.camber}</span>
                </div>
                <div className="flex justify-between p-3">
                  <span className="text-white/50">WEIGHT</span>
                  <span className="text-white font-semibold">{product.specs.weight}</span>
                </div>
              </div>
            </div>

            {/* Accordions */}
            <div className="pt-2 space-y-2 text-xs">
              {/* Provenance */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'provenance' ? null : 'provenance')}
                  className="w-full p-4 flex items-center justify-between text-left font-bold text-white uppercase font-mono tracking-wider"
                >
                  <span>Historical Provenance</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'provenance' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'provenance' && (
                  <div className="px-4 pb-4 text-white/70 leading-relaxed font-sans text-xs">
                    {product.story}
                  </div>
                )}
              </div>

              {/* Packaging & Showcase */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'packaging' ? null : 'packaging')}
                  className="w-full p-4 flex items-center justify-between text-left font-bold text-white uppercase font-mono tracking-wider"
                >
                  <span>Display Case &amp; Certificate</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'packaging' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'packaging' && (
                  <div className="px-4 pb-4 text-white/70 leading-relaxed font-sans text-xs">
                    {product.specs.packaging}. Includes a laser-engraved stainless steel identification plate and an authenticated factory certification card with individualized production serial numbering.
                  </div>
                )}
              </div>

              {/* Shipping */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
                  className="w-full p-4 flex items-center justify-between text-left font-bold text-white uppercase font-mono tracking-wider"
                >
                  <span>Insured Global Shipping</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'shipping' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'shipping' && (
                  <div className="px-4 pb-4 text-white/70 leading-relaxed font-sans text-xs">
                    Each model is double-boxed with impact-absorbing high-density polyethylene foam and dispatched via insured air priority express with continuous tracking.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Specimens */}
        {relatedProducts.length > 0 && (
          <section className="mt-24 pt-16 border-t border-white/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#ff99ac] font-bold block">
                  EXPLORE RELATED EDITIONS
                </span>
                <h3 className="text-2xl font-bold uppercase font-[family-name:var(--font-heading)] text-white">
                  Companion Specimens
                </h3>
              </div>
              <Link href="/catalog" className="text-xs font-mono text-[#ff99ac] hover:underline flex items-center gap-1">
                View Catalog <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/product/${rel.slug}`}
                  className="group rounded-2xl bg-[#141013] border border-white/10 hover:border-[#ff99ac]/40 p-4 flex flex-col justify-between transition-all"
                >
                  <div className="relative aspect-[16/11] rounded-xl overflow-hidden bg-black/60 mb-3">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-[9px] font-mono tracking-widest text-[#ff99ac] font-bold uppercase">
                      {rel.brand}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#ff99ac] transition-colors truncate">
                      {rel.name}
                    </h4>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                      <span className="text-sm font-mono font-bold text-white">
                        {rel.priceFormatted}
                      </span>
                      <span className="text-xs font-mono text-[#ff99ac] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        View Spec <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <CinematicFooter />
    </div>
  )
}

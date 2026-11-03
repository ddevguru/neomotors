'use client'

import React, { use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Sparkles, Shield, Heart, ShoppingBag } from 'lucide-react'
import { Navbar } from '@/components/ui/navbar'
import { CinematicFooter } from '@/components/ui/motion-footer'
import { COLLECTIONS, PRODUCTS } from '@/lib/data'
import { useStore } from '@/context/store-context'

export default function CollectionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const collection = COLLECTIONS.find((c) => c.id === resolvedParams.id)

  if (!collection) {
    notFound()
  }

  const { addToCart, toggleWishlist, isWishlisted } = useStore()
  const collectionProducts = PRODUCTS.filter((p) => p.collectionId === collection.id)

  return (
    <div className="min-h-screen bg-[#0c090b] text-[#f5f2eb] font-sans selection:bg-[#ff99ac] selection:text-black">
      <Navbar />

      {/* Breadcrumb Bar */}
      <div className="border-b border-white/10 bg-[#120e11]/80 backdrop-blur-md px-4 sm:px-6 md:px-12 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Collections
          </Link>
          <span className="text-[#ff99ac] uppercase font-bold tracking-wider text-[10px] sm:text-xs">
            {collection.tag} // {collection.number}
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative pt-10 sm:pt-12 pb-16 sm:pb-20 px-4 sm:px-6 md:px-12 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={collection.heroBanner || collection.image}
            alt={collection.title}
            className="w-full h-full object-cover filter brightness-[0.35]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c090b] via-[#0c090b]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1 rounded-full bg-black/60 border border-[#ff99ac]/30 backdrop-blur-md max-w-full">
              <Sparkles className="w-3.5 h-3.5 text-[#ff99ac] shrink-0" />
              <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#ff99ac] font-bold uppercase truncate">
                {collection.badge} • 100% AUTHENTICATED
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase font-[family-name:var(--font-heading)] tracking-tight text-white leading-tight">
              {collection.title}
            </h1>

            <p className="text-sm sm:text-base md:text-xl text-white/80 leading-relaxed font-light">
              {collection.lead}
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-4 pt-2 text-[11px] sm:text-xs font-mono text-white/60">
              <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                MARQUES // <strong className="text-white">{collection.marques}</strong>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                SPECIMENS // <strong className="text-white">{collection.specimenCount} MODELS</strong>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                SCALE // <strong className="text-white">1:64 MASTER SCALE</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collection Grid - Sleek Luxury Dark Mode */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8 pb-4 border-b border-white/10">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#ff99ac] block font-bold">
              VAULT INVENTORY
            </span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white font-[family-name:var(--font-heading)]">
              All {collection.title} Specimens
            </h2>
          </div>
          <span className="text-xs font-mono text-white/50">
            Showing {collectionProducts.length} authenticated editions
          </span>
        </div>

        {collectionProducts.length === 0 ? (
          <div className="text-center py-16 bg-white/[0.02] rounded-2xl border border-white/10">
            <p className="text-sm text-white/60 mb-4">No models currently allocated for this edition.</p>
            <Link href="/catalog" className="btn-primary-burgundy inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold">
              Browse Complete Catalog <ArrowRight className="w-3.5 h-3.5 text-[#ff99ac]" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {collectionProducts.map((car) => {
              const liked = isWishlisted(car.id)

              return (
                <div
                  key={car.id}
                  className="group rounded-2xl bg-[#141013] border border-white/10 hover:border-[#ff99ac]/50 transition-all overflow-hidden flex flex-col justify-between shadow-2xl"
                >
                  <div className="relative aspect-[16/11] overflow-hidden bg-black/60">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 border border-white/10 text-[9px] font-mono tracking-widest text-[#ff99ac] font-bold uppercase backdrop-blur-md">
                      {car.tag}
                    </span>

                    <button
                      onClick={() => toggleWishlist(car.id)}
                      aria-label="Wishlist toggle"
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 flex items-center justify-center text-white transition-all backdrop-blur-md"
                    >
                      <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-[#ff99ac] text-[#ff99ac]' : 'text-white'}`} />
                    </button>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/70">
                      <span>CHASSIS: {car.chassisNumber}</span>
                      <span>{car.scale}</span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff99ac] font-bold">
                        {car.brand}
                      </span>
                      <h3 className="text-base font-bold text-white mt-1 group-hover:text-[#ff99ac] transition-colors leading-snug">
                        <Link href={`/product/${car.slug}`}>
                          {car.name}
                        </Link>
                      </h3>
                      <p className="text-xs text-white/50 line-clamp-2 mt-2 leading-relaxed">
                        {car.description}
                      </p>
                    </div>

                    <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-white/40 block font-mono">ALLOCATION</span>
                        <span className="text-lg font-bold font-mono text-white">
                          {car.priceFormatted}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => addToCart(car, 1)}
                          className="btn-primary-burgundy px-3.5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5"
                          title="Quick Add to Bag"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-[#ff99ac]" /> Add
                        </button>
                        <Link
                          href={`/product/${car.slug}`}
                          className="btn-secondary-dark px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1"
                        >
                          View <ArrowRight className="w-3 h-3 text-[#ff99ac]" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      <CinematicFooter />
    </div>
  )
}

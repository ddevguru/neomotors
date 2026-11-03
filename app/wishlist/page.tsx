'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, ArrowRight, Trash2, ArrowLeft, Sparkles } from 'lucide-react'
import { Navbar } from '@/components/ui/navbar'
import { CinematicFooter } from '@/components/ui/motion-footer'
import { PRODUCTS } from '@/lib/data'
import { useStore } from '@/context/store-context'

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore()

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id))

  return (
    <div className="min-h-screen bg-[#0c090b] text-[#f5f2eb] font-sans selection:bg-[#ff99ac] selection:text-black">
      <Navbar />

      <div className="border-b border-white/10 bg-[#120e11]/80 backdrop-blur-md px-4 sm:px-6 md:px-12 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
          <Link href="/catalog" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Catalog
          </Link>
          <span className="text-[#ff99ac] uppercase font-bold tracking-wider text-[10px] sm:text-xs">
            SAVED ({wishlist.length})
          </span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-[#ff99ac]/30 mb-2">
              <Sparkles className="w-3 h-3 text-[#ff99ac]" />
              <span className="text-[10px] font-mono tracking-widest text-[#ff99ac] font-bold uppercase">
                SAVED ARCHIVE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold uppercase font-[family-name:var(--font-heading)] text-white">
              Your Collector Wishlist
            </h1>
          </div>
          <span className="text-xs font-mono text-white/50">
            {savedProducts.length} Saved Models
          </span>
        </div>

        {savedProducts.length === 0 ? (
          <div className="text-center py-16 sm:py-24 bg-white/[0.02] rounded-3xl border border-white/10 max-w-xl mx-auto space-y-5 px-4">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto text-white/30">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase font-[family-name:var(--font-heading)] text-white">
              No saved specimens yet
            </h2>
            <p className="text-xs sm:text-sm text-white/60 max-w-md mx-auto leading-relaxed">
              Click the heart icon on any diecast model in the catalog or collection views to save it here for later allocation.
            </p>
            <div className="pt-2">
              <Link
                href="/catalog"
                className="btn-primary-burgundy inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider shadow-xl"
              >
                <span>Browse Archive</span> <ArrowRight className="w-3.5 h-3.5 text-[#ff99ac]" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {savedProducts.map((car) => (
              <div
                key={car.id}
                className="group rounded-2xl bg-[#141013] border border-white/10 hover:border-[#ff99ac]/40 transition-all overflow-hidden flex flex-col justify-between shadow-xl"
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-black/60">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={() => toggleWishlist(car.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 hover:bg-black/90 text-red-400 hover:text-white flex items-center justify-center transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 text-[9px] font-mono tracking-widest text-[#ff99ac] font-bold uppercase border border-white/10">
                    {car.tag}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block">
                      {car.brand} • {car.scale}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1 group-hover:text-[#ff99ac] transition-colors truncate">
                      <Link href={`/product/${car.slug}`}>{car.name}</Link>
                    </h3>
                    <span className="text-lg font-bold font-mono text-white block mt-2">
                      {car.priceFormatted}
                    </span>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-2">
                    <button
                      onClick={() => addToCart(car, 1)}
                      className="flex-1 py-2.5 px-4 rounded-full bg-gradient-to-r from-[#8A1538] to-[#5C1422] text-white text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#ff99ac]" /> Move to Bag
                    </button>
                    <Link
                      href={`/product/${car.slug}`}
                      className="btn-secondary-dark py-2.5 px-5 rounded-full text-xs font-bold transition-all flex items-center justify-center"
                    >
                      <span>View Spec</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <CinematicFooter />
    </div>
  )
}

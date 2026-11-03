'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Compass, ShieldCheck } from 'lucide-react'
import { Navbar } from '@/components/ui/navbar'
import { CinematicFooter } from '@/components/ui/motion-footer'
import { HeroRevealSection } from '@/components/ui/hero-reveal-section'
import { BRANDS, PRODUCTS } from '@/lib/data'

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-[#0c090b] text-[#f5f2eb] font-sans selection:bg-[#ff99ac] selection:text-black">
      <Navbar />

      {/* Hero Banner */}
      <HeroRevealSection
        badge="THE MAKER'S CIRCLE • 9 OFFICIAL MARQUES"
        headingLine1="Only the"
        headingAccent="names"
        headingSuffix="that matter."
        description="Trusted makers. Exacting details. A considered edit of the legendary houses shaping miniature automotive culture at every scale — from hand-poured Japanese castings to precision European resin."
      >
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs font-mono text-white/60">
          <div><strong className="text-white">9</strong> ICONIC HOUSES</div>
          <div className="text-white/20">•</div>
          <div><strong className="text-white">1:64</strong> MASTER SCALE</div>
          <div className="text-white/20">•</div>
          <div><strong className="text-white">100%</strong> AUTHENTICATED</div>
        </div>
      </HeroRevealSection>

      {/* Brands Directory Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {BRANDS.map((brand, idx) => {
            const brandModels = PRODUCTS.filter(
              (p) => p.brand.toLowerCase() === brand.name.toLowerCase()
            )

            return (
              <motion.div
                key={brand.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.9, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group rounded-3xl bg-[#141013] border border-white/10 hover:border-[#ff99ac]/40 transition-all p-5 sm:p-6 md:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden"
              >
                {/* Ambient Top Glow */}
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#8A1538]/15 rounded-full blur-2xl group-hover:bg-[#ff99ac]/20 transition-all pointer-events-none" />

                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                      {brand.origin}
                    </span>
                    <span className="text-[10px] font-mono uppercase text-[#ff99ac] font-bold">
                      {brand.founded}
                    </span>
                  </div>

                  {/* Brand Name */}
                  <h3 className="text-2xl font-extrabold text-white uppercase font-[family-name:var(--font-heading)] mt-4 group-hover:text-[#ff99ac] transition-colors">
                    {brand.name}
                  </h3>
                  <span className="text-xs font-mono text-white/60 italic block mt-0.5">
                    &ldquo;{brand.tagline}&rdquo;
                  </span>

                  <p className="text-xs text-white/70 leading-relaxed mt-4">
                    {brand.longDesc}
                  </p>

                  <div className="mt-6 pt-4 border-t border-white/5 space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-white/60">
                      <span>SPECIALTY</span>
                      <span className="text-white font-semibold text-right max-w-[180px] truncate">{brand.specialty}</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>CATALOG ALLOCATION</span>
                      <span className="text-[#ff99ac] font-bold">{brand.modelsCount} Specimens</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    href={`/catalog?brand=${encodeURIComponent(brand.name)}`}
                    className="w-full py-3 rounded-xl bg-white/5 group-hover:bg-[#8A1538] border border-white/10 group-hover:border-[#ff99ac]/40 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                  >
                    Explore {brand.name} Models <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </main>

      <CinematicFooter />
    </div>
  )
}

'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Shield, Compass, ChevronRight } from 'lucide-react'
import { Navbar } from '@/components/ui/navbar'
import { CinematicFooter } from '@/components/ui/motion-footer'
import { HeroRevealSection } from '@/components/ui/hero-reveal-section'
import { COLLECTIONS, PRODUCTS } from '@/lib/data'

export default function CollectionsPage() {
  const [activeTab, setActiveTab] = useState<string>('all')

  const filteredCollections = activeTab === 'all'
    ? COLLECTIONS
    : COLLECTIONS.filter((c) => c.id === activeTab)

  return (
    <div className="min-h-screen bg-[#0c090b] text-[#f5f2eb] font-sans selection:bg-[#ff99ac] selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <HeroRevealSection
        badge="THE THREE PILLARS OF AUTOMOTIVE ART"
        headingLine1="Curated"
        headingAccent="editions."
        description="Explore our curated 1:64 automotive chapters. From precision European engineering to midnight Kanagawa touge folklore and raw Woodward Avenue big-block displacement."
      >
        {/* Quick Pillar Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${
              activeTab === 'all'
                ? 'btn-primary-burgundy font-bold'
                : 'btn-secondary-dark'
            }`}
          >
            All Editions (38)
          </button>
          {COLLECTIONS.map((col) => (
            <button
              key={col.id}
              onClick={() => setActiveTab(col.id)}
              className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === col.id
                  ? 'btn-primary-burgundy font-bold'
                  : 'btn-secondary-dark'
              }`}
            >
              <span className={activeTab === col.id ? 'opacity-75' : 'opacity-40'}>
                {col.number}
              </span>
              <span>{col.title}</span>
            </button>
          ))}
        </div>
      </HeroRevealSection>

      {/* Collections Detailed Cards - Sleek Luxury Dark Mode */}
      <section className="py-12 md:py-28 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto space-y-16 md:space-y-24">
        {filteredCollections.map((col, idx) => {
          const collectionCars = PRODUCTS.filter((p) => p.collectionId === col.id)

          return (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1.1, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#161114] to-[#0e0a0d] overflow-hidden shadow-2xl"
            >
              {/* Collection Banner Header */}
              <div className="relative min-h-[22rem] md:h-96 w-full overflow-hidden">
                <img
                  src={col.heroBanner || col.image}
                  alt={col.title}
                  className="w-full h-full object-cover object-center filter brightness-[0.7]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0a0d] via-[#0e0a0d]/50 to-transparent" />

                {/* Overlaid Badges */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-black/70 border border-white/20 text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-[#ff99ac] font-bold backdrop-blur-md">
                    {col.tag}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/70 border border-white/20 text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-white font-bold backdrop-blur-md">
                    {col.badge}
                  </span>
                </div>

                {/* Banner Titles & High-Contrast Button */}
                <div className="absolute bottom-6 left-4 right-4 sm:left-6 sm:right-6 md:left-10 md:right-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <span className="text-3xl sm:text-4xl md:text-5xl font-mono font-extrabold text-white/20 block">
                      {col.number}
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white uppercase font-[family-name:var(--font-heading)]">
                      {col.title}
                    </h2>
                    <p className="text-xs sm:text-sm font-mono text-[#ff99ac] mt-1 tracking-wider uppercase">
                      {col.marques}
                    </p>
                  </div>

                  <Link
                    href={`/collections/${col.id}`}
                    className="btn-primary-burgundy inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-bold text-xs uppercase tracking-wider self-stretch sm:self-start md:self-auto shadow-xl text-center"
                  >
                    <span>Explore {col.title} Archive</span>
                    <ArrowRight className="w-4 h-4 text-[#ff99ac]" />
                  </Link>
                </div>
              </div>

              {/* Description & Specimen Highlights */}
              <div className="p-5 sm:p-6 md:p-10 space-y-6 sm:space-y-8 bg-[#120e11]">
                <div className="max-w-3xl">
                  <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed font-normal">
                    {col.lead}
                  </p>
                </div>

                {/* Specimen Previews inside this collection */}
                {collectionCars.length > 0 && (
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 sm:mb-5 border-b border-white/10 pb-3">
                      <span className="text-xs font-mono uppercase tracking-widest text-white/50 font-bold">
                        FEATURED SPECIMENS IN THIS EDITION
                      </span>
                      <Link
                        href={`/catalog?collection=${col.id}`}
                        className="text-xs font-mono text-[#ff99ac] font-bold hover:underline flex items-center gap-1"
                      >
                        View All in Catalog <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {collectionCars.map((car) => (
                        <Link
                          key={car.id}
                          href={`/product/${car.slug}`}
                          className="group rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#ff99ac]/50 transition-all p-4 flex flex-col justify-between overflow-hidden shadow-lg"
                        >
                          <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black/40 mb-4">
                            <img
                              src={car.image}
                              alt={car.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/80 text-[9px] font-mono tracking-widest uppercase text-[#ff99ac] font-bold backdrop-blur-sm border border-white/10">
                              {car.tag}
                            </span>
                          </div>

                          <div>
                            <div className="flex items-center justify-between text-[11px] font-mono text-white/50 mb-1">
                              <span>{car.brand}</span>
                              <span>{car.scale}</span>
                            </div>
                            <h4 className="text-sm font-bold text-white group-hover:text-[#ff99ac] transition-colors truncate">
                              {car.name}
                            </h4>
                            <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/5">
                              <span className="text-base font-bold font-mono text-white">
                                {car.priceFormatted}
                              </span>
                              <span className="text-xs font-bold text-[#ff99ac] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                                Spec Sheet <ArrowRight className="w-3 h-3" />
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </section>

      {/* Bottom CTA to Catalog */}
      <section className="py-20 px-6 text-center border-t border-white/10 bg-[#080608]">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#ff99ac] font-bold">
            LOOKING FOR A SPECIFIC DIECAST SPECIMEN?
          </span>
          <h3 className="text-3xl md:text-4xl font-extrabold uppercase font-[family-name:var(--font-heading)] text-white">
            Access the complete catalog.
          </h3>
          <p className="text-sm text-white/60">
            Filter by manufacturer scale, casting metal, licensed house, and instant allocation status.
          </p>
          <div className="pt-2">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#8A1538] to-[#5C1422] text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-xl"
            >
              Browse Full Catalog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <CinematicFooter />
    </div>
  )
}

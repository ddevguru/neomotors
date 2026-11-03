'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, ShieldCheck, Layers, Award, Microscope } from 'lucide-react'
import { Navbar } from '@/components/ui/navbar'
import { CinematicFooter } from '@/components/ui/motion-footer'
import { HeroRevealSection } from '@/components/ui/hero-reveal-section'

export default function PhilosophyPage() {
  return (
    <div className="min-h-screen bg-[#0c090b] text-[#f5f2eb] font-sans selection:bg-[#ff99ac] selection:text-black">
      <Navbar />

      {/* Hero Header */}
      <HeroRevealSection
        badge="VOL. 01 // MANIFESTO & PROVENANCE"
        headingLine1="More than"
        headingAccent="miniatures."
        description="Every collectible in our vault tells a definitive automotive story. From Kanagawa midnight touge folklore to Maranello speed records — scaled down to 1:64 without losing an ounce of soul."
      />

      {/* The 3 Core Pillars */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-20 space-y-12 sm:space-y-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="p-6 md:p-8 rounded-3xl bg-[#141013] border border-white/10 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#5C1422]/50 text-[#ff99ac] flex items-center justify-center font-mono font-bold text-base border border-[#ff99ac]/30">
              01
            </div>
            <h3 className="text-xl font-bold uppercase text-white font-[family-name:var(--font-heading)]">
              Scale Fidelity
            </h3>
            <p className="text-xs text-white/70 leading-relaxed font-light">
              Exacting 1:64 proportions engineered directly from OEM factory CAD blueprints. Splitters, diffuser fins, brake calipers, and wheel camber measured to the hundredth of a millimeter.
            </p>
          </div>

          <div className="p-6 md:p-8 rounded-3xl bg-[#141013] border border-white/10 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#5C1422]/50 text-[#ff99ac] flex items-center justify-center font-mono font-bold text-base border border-[#ff99ac]/30">
              02
            </div>
            <h3 className="text-xl font-bold uppercase text-white font-[family-name:var(--font-heading)]">
              Automotive Lacquer
            </h3>
            <p className="text-xs text-white/70 leading-relaxed font-light">
              Multi-stage hand-polished paint finishes with authentic pad-printed race liveries and UV-resistant gloss clear coats, replicating genuine factory color codes.
            </p>
          </div>

          <div className="p-6 md:p-8 rounded-3xl bg-[#141013] border border-white/10 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#5C1422]/50 text-[#ff99ac] flex items-center justify-center font-mono font-bold text-base border border-[#ff99ac]/30">
              03
            </div>
            <h3 className="text-xl font-bold uppercase text-white font-[family-name:var(--font-heading)]">
              Archival Provenance
            </h3>
            <p className="text-xs text-white/70 leading-relaxed font-light">
              Serialized chassis numbered plates, tamper-evident blister packaging, and museum-grade optical acrylic display cases that protect against dust and sunlight.
            </p>
          </div>
        </div>

        {/* Detailed Section: The Craftsmanship Process */}
        <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.03] to-transparent p-6 sm:p-8 md:p-14 space-y-6 sm:space-y-8">
          <div className="max-w-2xl space-y-2 sm:space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#ff99ac] font-bold">
              PRECISION CASTING
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase font-[family-name:var(--font-heading)] text-white">
              The anatomy of a 1:64 masterwork.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-xs text-white/70 leading-relaxed">
            <p>
              Traditional diecast toys prioritize durability for child play. Neomotors collectibles prioritize aesthetic fidelity and historical authenticity. The diecast zinc alloy (Zamak) is cast under ultra-high pressure into precision steel dies, capturing microscopic hood vents, winglets, and door shutlines.
            </p>
            <p>
              Interior cockpits feature accurate steering wheels, roll cages, bucket seats, and dashboard gauges. The wheels utilize authentic forged rim patterns wrapped with genuine synthetic rubber treads featuring authentic tire logos.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/catalog"
              className="btn-primary-burgundy inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-xl text-center"
            >
              <span>Explore Authenticated Collection</span> <ArrowRight className="w-4 h-4 text-[#ff99ac]" />
            </Link>
            <Link
              href="/brands"
              className="btn-secondary-dark inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider"
            >
              <span>View Our 9 Marques</span> <ArrowRight className="w-4 h-4 text-[#ff99ac]" />
            </Link>
          </div>
        </section>
      </main>

      <CinematicFooter />
    </div>
  )
}

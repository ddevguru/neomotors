'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

interface HeroRevealSectionProps {
  badge: string
  badgeIcon?: React.ReactNode
  headingLine1: string
  headingAccent: string
  headingSuffix?: string
  description: string
  children?: React.ReactNode
  glowColor?: string
  className?: string
}

export function HeroRevealSection({
  badge,
  badgeIcon,
  headingLine1,
  headingAccent,
  headingSuffix,
  description,
  children,
  glowColor = '#8A1538',
  className = '',
}: HeroRevealSectionProps) {
  const line1Words = headingLine1.trim().split(/\s+/)
  const descWords = description.trim().split(/\s+/)

  return (
    <section
      className={`relative pt-12 pb-16 sm:pt-16 sm:pb-24 md:pt-24 md:pb-32 px-4 sm:px-6 md:px-12 overflow-hidden border-b border-white/10 ${className}`}
    >
      {/* Ambient radial glows */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[700px] h-[300px] md:h-[400px] rounded-full blur-[100px] md:blur-[140px] pointer-events-none opacity-25"
        style={{ backgroundColor: glowColor }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Animated Badge Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#ff99ac]/30 mb-4 sm:mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(255,153,172,0.12)] max-w-full"
        >
          {badgeIcon ?? <Sparkles className="w-3.5 h-3.5 text-[#ff99ac] shrink-0" />}
          <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#ff99ac] font-bold uppercase truncate">
            {badge}
          </span>
        </motion.div>

        {/* Revealed Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase font-[family-name:var(--font-heading)] leading-[1.08] mb-4 sm:mb-6 text-white select-none break-words max-w-full">
          {/* Line 1 - Words with Masked Reveal */}
          <span className="block overflow-hidden py-1">
            {line1Words.map((word, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden align-top mr-[0.22em] sm:mr-[0.25em] last:mr-0"
              >
                <motion.span
                  initial={{ y: '120%', opacity: 0, filter: 'blur(8px)' }}
                  animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.85,
                    delay: 0.08 + i * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>

          {/* Line 2 - Accent Word + Suffix with Masked Reveal */}
          <span className="block overflow-hidden py-1">
            <span className="inline-block overflow-hidden align-top">
              <motion.span
                initial={{ y: '120%', opacity: 0, filter: 'blur(8px)' }}
                animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.9,
                  delay: 0.22,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                <span className="text-[#ff99ac] italic font-[family-name:var(--font-accent)] lowercase font-normal">
                  {headingAccent}
                </span>
                {headingSuffix && (
                  <span className="normal-case font-extrabold font-[family-name:var(--font-heading)] text-white">
                    {' '}{headingSuffix}
                  </span>
                )}
              </motion.span>
            </span>
          </span>
        </h1>

        {/* Revealed Paragraph - Staggered Word by Word Reveal */}
        <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 px-2">
          {descWords.map((word, idx) => (
            <span
              key={idx}
              className="inline-block overflow-hidden align-top mr-[0.25em] sm:mr-[0.28em] last:mr-0 py-[1px]"
            >
              <motion.span
                initial={{ y: '105%', opacity: 0, filter: 'blur(5px)' }}
                animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.6,
                  delay: 0.32 + idx * 0.016,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </p>

        {/* Revealed Bottom Elements (Filter Buttons, Stats, Action Links) */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              duration: 0.8,
              delay: 0.32 + descWords.length * 0.016 + 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full flex justify-center px-1"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}


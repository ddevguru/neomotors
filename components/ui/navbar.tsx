'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Heart, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/context/store-context'

interface NavbarProps {
  isHero?: boolean
}

export function Navbar({ isHero = false }: NavbarProps) {
  const pathname = usePathname()
  const { cartCount, wishlist, setIsCartOpen, setIsSearchOpen } = useStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Vault', href: '/#vault' },
    { label: 'Collections', href: '/collections' },
    { label: 'Catalog', href: '/catalog' },
    { label: 'Brands', href: '/brands' },
    { label: 'Philosophy', href: '/philosophy' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    if (href.startsWith('/#')) return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <header
        className={`w-full z-50 transition-colors ${
          isHero && !mobileMenuOpen
            ? 'absolute top-0 left-0'
            : isHero && mobileMenuOpen
            ? 'absolute top-0 left-0 bg-[#0c090b]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl'
            : 'sticky top-0 bg-[#0c090b]/90 backdrop-blur-xl border-b border-white/10 shadow-lg'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-3 sm:px-6 md:px-10 h-16 sm:h-20 flex items-center justify-between gap-2">
          {/* Brand Logo - Guaranteed crisp white with neon accent */}
          <Link href="/" className="flex items-center tracking-tighter select-none shrink-0 text-white hover:opacity-90 transition-opacity">
            <span className="font-extrabold text-base sm:text-xl md:text-2xl text-white tracking-wider sm:tracking-widest font-[family-name:var(--font-heading)]">
              NEO<span className="text-[#ff99ac] px-0.5">/</span>MOTORS
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 font-mono text-xs uppercase tracking-[0.16em]">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative py-1 transition-colors ${
                    active ? 'text-[#ff99ac] font-bold' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#ff99ac] rounded-full"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Action Icons - Responsive and never pushed off mobile screen */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 shrink-0">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search archive"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all shrink-0"
            >
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              aria-label={`Wishlist (${wishlist.length} saved)`}
              className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all shrink-0"
            >
              <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${wishlist.length > 0 ? 'text-[#ff99ac] fill-[#ff99ac]' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#8A1538] text-[8px] sm:text-[9px] font-mono font-bold text-white flex items-center justify-center border border-[#161214]">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label={`Cart with ${cartCount} items`}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3.5 h-8 sm:h-10 rounded-full bg-[#8A1538]/30 hover:bg-[#8A1538]/50 border border-[#ff99ac]/40 text-white transition-all shadow-[0_4px_16px_rgba(138,21,56,0.25)] shrink-0"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ff99ac]" />
              <span className="font-mono text-[11px] sm:text-xs font-bold tracking-wider">
                {String(cartCount).padStart(2, '0')}
              </span>
            </button>

            {/* Mobile Menu Trigger - High contrast & always visible on mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-[#8A1538]/40 border border-[#ff99ac]/40 flex items-center justify-center text-white shrink-0 transition-all shadow-sm"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff99ac]" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu with Quick Actions */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:hidden bg-[#0c090b]/98 backdrop-blur-2xl border-b border-white/15 px-4 sm:px-6 py-5 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto shadow-2xl"
            >
              {/* Quick Action Pills inside Mobile Menu */}
              <div className="grid grid-cols-2 gap-2 pb-2 border-b border-white/10">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setIsSearchOpen(true)
                  }}
                  className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white/90 hover:bg-white/10 transition-colors"
                >
                  <Search className="w-3.5 h-3.5 text-[#ff99ac]" />
                  <span>Search</span>
                </button>
                <Link
                  href="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white/90 hover:bg-white/10 transition-colors"
                >
                  <Heart className={`w-3.5 h-3.5 ${wishlist.length > 0 ? 'text-[#ff99ac] fill-[#ff99ac]' : 'text-[#ff99ac]'}`} />
                  <span>Wishlist ({wishlist.length})</span>
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col space-y-1.5 font-mono text-xs uppercase tracking-widest">
                {navLinks.map((link) => {
                  const active = isActive(link.href)
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between py-3 px-4 rounded-xl transition-all ${
                        active
                          ? 'bg-[#8A1538]/30 text-[#ff99ac] font-bold border border-[#ff99ac]/40 shadow-sm'
                          : 'text-white/80 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="font-semibold text-sm tracking-wide">{link.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white/40" />
                    </Link>
                  )
                })}
              </div>

              {/* Mobile Quick Stats / Actions */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50 px-1">
                <span>AUTHENTICATED 1:64</span>
                <span className="text-[#ff99ac] font-bold">GLOBAL VAULT</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}

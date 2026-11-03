'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck } from 'lucide-react'
import Link from 'next/link'
import { useStore } from '@/context/store-context'

export function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartCount, cartTotal } = useStore()

  const freeShippingThreshold = 3000
  const progressPercent = Math.min(100, Math.round((cartTotal / freeShippingThreshold) * 100))
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal)

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[9990] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="relative z-10 flex flex-col w-full max-w-md h-full bg-[#120e11] text-[#f5f2eb] border-l border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)]"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#161214]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#5C1422]/50 flex items-center justify-center text-[#ff99ac]">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold tracking-tight text-white font-[family-name:var(--font-heading)]">
                    Collector Vault Bag
                  </h3>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/50">
                    {cartCount} {cartCount === 1 ? 'Specimen' : 'Specimens'} Allocated
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Free Insured Shipping Progress */}
            <div className="px-6 py-3.5 bg-[#1a1417] border-b border-white/5 text-xs">
              <div className="flex items-center justify-between mb-1.5 font-medium">
                <span className="flex items-center gap-1.5 text-white/80">
                  <Truck className="w-3.5 h-3.5 text-[#ff99ac]" />
                  {remainingForFreeShipping === 0 ? (
                    <strong className="text-[#ff99ac]">Free Insured Priority Dispatch unlocked!</strong>
                  ) : (
                    <>Add <strong className="text-white">₹{remainingForFreeShipping}</strong> for Free Priority Shipping</>
                  )}
                </span>
                <span className="font-mono text-[10px] text-white/50">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#8A1538] to-[#ff99ac] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-white/30">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">Your vault bag is empty</h4>
                  <p className="text-xs text-white/50 max-w-xs mb-6">
                    Explore our curated 1:64 diecast archive and allocate iconic models to your collection.
                  </p>
                  <Link
                    href="/catalog"
                    onClick={() => setIsCartOpen(false)}
                    className="btn-pill-white px-6 py-2.5 rounded-full font-bold text-xs tracking-wider uppercase inline-flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
                    style={{ backgroundColor: '#ffffff', color: '#000000' }}
                  >
                    <span className="font-bold tracking-wider" style={{ color: '#000000' }}>Browse Archive</span>
                    <ArrowRight className="w-3.5 h-3.5" style={{ color: '#000000' }} />
                  </Link>
                </div>
              ) : (
                cart.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex gap-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-black/40 flex-shrink-0 border border-white/10">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#ff99ac] font-bold">
                            {product.brand} • {product.scale}
                          </span>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="text-white/40 hover:text-red-400 transition-colors"
                            aria-label={`Remove ${product.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <h4 className="text-xs font-bold text-white truncate mt-0.5">
                          <Link
                            href={`/product/${product.slug}`}
                            onClick={() => setIsCartOpen(false)}
                            className="hover:underline"
                          >
                            {product.name}
                          </Link>
                        </h4>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                        {/* Qty Stepper */}
                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-md px-1.5 py-0.5">
                          <button
                            onClick={() => updateQuantity(product.id, -1)}
                            className="p-1 text-white/60 hover:text-white transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-bold text-white min-w-[16px] text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, 1)}
                            className="p-1 text-white/60 hover:text-white transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-sm font-bold text-white font-mono">
                          ₹{(product.price * quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Summary */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-[#161214] space-y-3">
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>Subtotal</span>
                  <span className="text-white font-mono font-bold text-sm">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-white/50">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#ff99ac]" />
                    Insured Authenticated Packaging
                  </span>
                  <span className="text-[#ff99ac]">Complimentary</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-sm font-bold text-white">
                  <span>Estimated Total</span>
                  <span className="text-base text-[#ff99ac] font-mono">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="pt-2 space-y-2">
                  <Link
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#8A1538] to-[#5C1422] text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-[0_10px_25px_rgba(138,21,56,0.35)]"
                  >
                    View Bag &amp; Checkout <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-2.5 text-center text-xs text-white/50 hover:text-white transition-colors"
                  >
                    Continue Browsing
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

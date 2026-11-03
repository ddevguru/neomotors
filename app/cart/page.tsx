'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Tag,
} from 'lucide-react'
import { Navbar } from '@/components/ui/navbar'
import { CinematicFooter } from '@/components/ui/motion-footer'
import { useStore } from '@/context/store-context'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount, showNotification } = useStore()

  const [promoCode, setPromoCode] = useState('')
  const [discountPercent, setDiscountPercent] = useState(0)
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('express')
  const [includeAcrylicBox, setIncludeAcrylicBox] = useState(true)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  // Checkout form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    payment: 'upi',
  })

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase()
    if (code === 'NEO10' || code === 'FIRST10' || code === 'PURIST') {
      setDiscountPercent(10)
      setAppliedPromo(code)
      showNotification(`Promo code ${code} applied: 10% off!`)
    } else {
      showNotification('Invalid allocation code. Try "NEO10"')
    }
  }

  const shippingCost = cartTotal > 3000 ? 0 : shippingMethod === 'express' ? 199 : 99
  const discountAmount = Math.round((cartTotal * discountPercent) / 100)
  const grandTotal = Math.max(0, cartTotal - discountAmount + shippingCost)

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.address) {
      showNotification('Please fill in required shipping fields')
      return
    }
    setOrderComplete(true)
    clearCart()
  }

  return (
    <div className="min-h-screen bg-[#0c090b] text-[#f5f2eb] font-sans selection:bg-[#ff99ac] selection:text-black">
      <Navbar />

      <div className="border-b border-white/10 bg-[#120e11]/80 backdrop-blur-md px-6 md:px-12 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
          <Link href="/catalog" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
          </Link>
          <span className="text-[#ff99ac] uppercase font-bold tracking-wider">
            COLLECTOR ALLOCATION CHECKOUT
          </span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 lg:py-16">
        {orderComplete ? (
          /* Order Success Confirmation */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto text-center py-16 px-8 rounded-3xl bg-[#141013] border border-white/10 shadow-2xl space-y-6"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs font-mono tracking-widest text-[#ff99ac] uppercase font-bold block">
              VAULT ALLOCATION CONFIRMED
            </span>

            <h1 className="text-3xl font-extrabold uppercase font-[family-name:var(--font-heading)] text-white">
              Your specimens are secured.
            </h1>

            <p className="text-sm text-white/70 leading-relaxed">
              Thank you, <strong className="text-white">{formData.name}</strong>. Your authenticated 1:64 diecast models have been reserved in the vault. Dispatch dispatch updates will be sent to <strong className="text-white">{formData.email}</strong>.
            </p>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono space-y-2 text-left">
              <div className="flex justify-between text-white/60">
                <span>ORDER SERIAL NUMBER</span>
                <span className="text-white font-bold">NM-2024-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>ESTIMATED DELIVERY</span>
                <span className="text-emerald-400 font-bold">2 - 3 Business Days</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>AUTHENTICITY STATUS</span>
                <span className="text-[#ff99ac] font-bold">Factory Sealed with Certificate</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/catalog"
                className="btn-primary-burgundy inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-xl"
              >
                <span>Return to Specimen Archive</span> <ArrowRight className="w-4 h-4 text-[#ff99ac]" />
              </Link>
            </div>
          </motion.div>
        ) : cart.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-24 bg-white/[0.02] rounded-3xl border border-white/10 max-w-2xl mx-auto space-y-6">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto text-white/40">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold uppercase font-[family-name:var(--font-heading)] text-white">
              Your vault bag is empty
            </h2>
            <p className="text-sm text-white/60 max-w-md mx-auto">
              No diecast specimens have been allocated yet. Explore our curated collections or filter by brand to secure your models.
            </p>
            <div className="pt-2">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#8A1538] to-[#5C1422] text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-xl"
              >
                Browse Catalog <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* Cart + Checkout Split View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Cart Items or Checkout Form (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h1 className="text-2xl md:text-3xl font-extrabold uppercase font-[family-name:var(--font-heading)] text-white">
                  {isCheckingOut ? 'Dispatch Information' : 'Allocated Specimens'} ({cartCount})
                </h1>
                {!isCheckingOut && (
                  <button
                    onClick={clearCart}
                    className="text-xs font-mono text-white/40 hover:text-red-400 transition-colors"
                  >
                    Clear Bag
                  </button>
                )}
              </div>

              {isCheckingOut ? (
                /* Checkout Form */
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-white/70 block mb-1.5 uppercase">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Arjun Mehta"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white outline-none focus:border-[#ff99ac]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-white/70 block mb-1.5 uppercase">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="collector@neomotors.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white outline-none focus:border-[#ff99ac]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-white/70 block mb-1.5 uppercase">
                        Phone (for courier updates) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white outline-none focus:border-[#ff99ac]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-white/70 block mb-1.5 uppercase">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        placeholder="e.g. 110001"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white outline-none focus:border-[#ff99ac]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-white/70 block mb-1.5 uppercase">
                      Delivery Address *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Suite / Apartment / Street Name"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white outline-none focus:border-[#ff99ac]"
                    />
                  </div>

                  {/* Payment Selection */}
                  <div className="pt-4">
                    <label className="text-xs font-mono text-white/70 block mb-2 uppercase">
                      Select Payment Method
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        { id: 'upi', label: 'UPI / QR' },
                        { id: 'card', label: 'Credit / Debit' },
                        { id: 'cod', label: 'Cash on Delivery' },
                      ].map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, payment: m.id })}
                          className={`p-3 rounded-xl border text-xs font-mono text-center transition-all ${
                            formData.payment === m.id
                              ? 'bg-[#8A1538]/40 border-[#ff99ac] text-white font-bold'
                              : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsCheckingOut(false)}
                      className="py-3 px-6 rounded-full bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition-colors text-center order-2 sm:order-1"
                    >
                      ← Back to Bag
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#8A1538] to-[#5C1422] text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-xl text-center order-1 sm:order-2"
                    >
                      Confirm Allocation &amp; Dispatch Order
                    </button>
                  </div>
                </form>
              ) : (
                /* Items List */
                <div className="space-y-4">
                  {cart.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-[#141013] border border-white/10 sm:items-center justify-between"
                    >
                      <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover bg-black/60 border border-white/10 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff99ac] font-bold">
                            {product.brand} • {product.scale}
                          </span>
                          <h3 className="text-sm font-bold text-white truncate mt-0.5">
                            <Link href={`/product/${product.slug}`} className="hover:underline">
                              {product.name}
                            </Link>
                          </h3>
                          <span className="text-xs font-mono text-white/50 block mt-0.5">
                            Serial: {product.chassisNumber}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5 w-full sm:w-auto">
                        {/* Qty Stepper */}
                        <div className="flex items-center border border-white/15 rounded-full bg-white/5 px-2 py-0.5">
                          <button
                            onClick={() => updateQuantity(product.id, -1)}
                            className="w-6 h-6 flex items-center justify-center text-white/60 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center font-mono font-bold text-xs text-white">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, 1)}
                            className="w-6 h-6 flex items-center justify-center text-white/60 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-sm sm:text-base font-bold font-mono text-white min-w-[70px] text-right">
                          ₹{(product.price * quantity).toLocaleString('en-IN')}
                        </span>

                        {/* Delete */}
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-white/40 hover:text-red-400 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Order Summary (5 cols) */}
            <div className="lg:col-span-5 rounded-3xl bg-[#141013] border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl">
              <h2 className="text-xl font-bold uppercase font-[family-name:var(--font-heading)] text-white pb-4 border-b border-white/10">
                Order Summary
              </h2>

              {/* Promo Code Input */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-white/70 block uppercase">
                  Collector Allocation Voucher
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Try code: NEO10"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white uppercase font-mono outline-none focus:border-[#ff99ac]"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Voucher {appliedPromo} applied (-10%)
                  </span>
                )}
              </div>

              {/* Breakdown */}
              <div className="space-y-3 pt-4 border-t border-white/10 text-xs font-mono">
                <div className="flex justify-between text-white/70">
                  <span>Specimen Subtotal</span>
                  <span className="text-white font-bold">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Collector Discount</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between text-white/70">
                  <span>Insured Express Shipping</span>
                  <span className={shippingCost === 0 ? 'text-[#ff99ac] font-bold' : 'text-white'}>
                    {shippingCost === 0 ? 'COMPLIMENTARY' : `₹${shippingCost}`}
                  </span>
                </div>

                <div className="flex justify-between text-white/70">
                  <span>Acrylic Display Box</span>
                  <span className="text-[#ff99ac]">INCLUDED</span>
                </div>

                <div className="flex justify-between text-white/70">
                  <span>Factory Certificate</span>
                  <span className="text-[#ff99ac]">SERIALIZED</span>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-baseline text-base font-bold text-white">
                  <span>Grand Total</span>
                  <span className="text-2xl text-[#ff99ac] font-mono">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {!isCheckingOut && (
                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#8A1538] to-[#5C1422] text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-xl"
                >
                  Proceed to Allocation Dispatch <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      <CinematicFooter />
    </div>
  )
}

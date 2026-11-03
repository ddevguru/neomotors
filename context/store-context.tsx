'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Product, PRODUCTS } from '@/lib/data'

export interface CartItem {
  product: Product
  quantity: number
}

interface StoreContextType {
  cart: CartItem[]
  cartCount: number
  cartTotal: number
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, delta: number) => void
  clearCart: () => void
  wishlist: string[]
  toggleWishlist: (productId: string) => void
  isWishlisted: (productId: string) => boolean
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  isSearchOpen: boolean
  setIsSearchOpen: (open: boolean) => void
  notification: string | null
  showNotification: (msg: string) => void
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('neomotors-cart-items')
      if (savedCart) {
        setCart(JSON.parse(savedCart))
      } else {
        // Initial sample item
        setCart([{ product: PRODUCTS[0], quantity: 1 }])
      }

      const savedWishlist = localStorage.getItem('neomotors-wishlist')
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist))
      }
    } catch {
      // Fallback
    }
  }, [])

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('neomotors-cart-items', JSON.stringify(cart))
      localStorage.setItem('neomotors-cart', String(cart.reduce((s, i) => s + i.quantity, 0)))
    } catch {
      // ignore
    }
  }, [cart])

  useEffect(() => {
    try {
      localStorage.setItem('neomotors-wishlist', JSON.stringify(wishlist))
    } catch {
      // ignore
    }
  }, [wishlist])

  const showNotification = (msg: string) => {
    setNotification(msg)
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr))
    }, 3200)
  }

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { product, quantity }]
    })
    showNotification(`Added ${product.name} to your vault bag`)
    setIsCartOpen(true)
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta
            return nextQty > 0 ? { ...item, quantity: nextQty } : null
          }
          return item
        })
        .filter(Boolean) as CartItem[]
    )
  }

  const clearCart = () => setCart([])

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId)
      const target = PRODUCTS.find((p) => p.id === productId)
      if (exists) {
        showNotification(`Removed from saved specimens`)
        return prev.filter((id) => id !== productId)
      } else {
        showNotification(`Added ${target ? target.name : 'specimen'} to wishlist`)
        return [...prev, productId]
      }
    })
  }

  const isWishlisted = (productId: string) => wishlist.includes(productId)

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0)

  return (
    <StoreContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        isWishlisted,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        notification,
        showNotification,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}

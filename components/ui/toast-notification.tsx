'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Sparkles } from 'lucide-react'
import { useStore } from '@/context/store-context'

export function ToastNotification() {
  const { notification } = useStore()

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-8 right-8 z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-full bg-[#161214]/95 text-white border border-[#ff99ac]/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        >
          <div className="w-6 h-6 rounded-full bg-[#5C1422]/60 flex items-center justify-center text-[#ff99ac]">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold tracking-wide font-sans">{notification}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

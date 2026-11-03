'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion'
import { gsap } from 'gsap'
import { ArrowDown, ArrowRight, Heart, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import ScrollMorphHero from '@/components/ui/scroll-morph-hero'
import { CinematicFooter } from '@/components/ui/motion-footer'
import { Navbar } from '@/components/ui/navbar'
import { useStore } from '@/context/store-context'
import { PRODUCTS, BRANDS } from '@/lib/data'

const products = [
  { name: 'Porsche 911 GT3 RS', brand: 'MINI GT', price: '₹1,899', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=85', tag: 'EDITORIAL PICK' },
  { name: 'Mercedes-Benz 300 SL', brand: 'TARMAC WORKS', price: '₹2,450', image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=85', tag: 'LIMITED EDITION' },
  { name: 'Lamborghini Countach', brand: 'BBURAGO', price: '₹1,299', image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=900&q=85', tag: 'NEW ARRIVAL' },
  { name: 'Nissan Skyline GT-R', brand: 'POP RACE', price: '₹2,150', image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=85', tag: 'COLLECTOR SERIES' },
]

const collections = [
  {
    number: '01',
    id: 'european-icons',
    tag: 'CONTINENTAL PRESTIGE',
    badge: '12 ARCHIVE MODELS',
    title: 'European Icons',
    marques: 'Porsche • Ferrari • BMW • Mercedes',
    copy: 'Stuttgart, Maranello & Sant’Agata Bolognese silhouette perfection.',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=85',
  },
  {
    number: '02',
    id: 'jdm-legends',
    tag: 'MIDNIGHT TOKYO',
    badge: '16 CULT EDITIONS',
    title: 'JDM Legends',
    marques: 'Skyline GT-R • RX-7 FD • Supra • NSX',
    copy: 'Precision rev-limit folklore and Kanagawa midnight touge mastery.',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=85',
  },
  {
    number: '03',
    id: 'detroit-muscle',
    tag: 'DETROIT STEEL',
    badge: '10 V8 LEGENDS',
    title: 'American Muscle',
    marques: 'Shelby GT500 • Corvette Stingray • Charger',
    copy: 'Raw big-block displacement, fastback muscle, and dragstrip provenance.',
    image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=85',
  },
]

const brands = ['HOT WHEELS', 'MATCHBOX', 'MAJORETTE', 'BBURAGO', 'TOMICA', 'MINI GT', 'TARMAC WORKS', 'POP RACE', 'KINSMART']

const brandTiles = [
  { name: 'HOT WHEELS', origin: 'USA • EST. 1968', desc: 'Redline & Premium Heritage' },
  { name: 'MINI GT', origin: 'HK • EST. 2017', desc: 'Exacting 1:64 Diecast Precision' },
  { name: 'TARMAC WORKS', origin: 'HK • EST. 2014', desc: 'Motorsport & FIA GT Icons' },
  { name: 'BBURAGO', origin: 'ITALY • EST. 1974', desc: 'Official Ferrari & Exotic Lineage' },
  { name: 'TOMICA', origin: 'JAPAN • EST. 1970', desc: 'Cult Japanese Castings' },
  { name: 'POP RACE', origin: 'HK • EST. 2019', desc: 'Stage Liveries & Custom Tuners' },
]

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={`reveal-block ${className}`}
      initial={{ opacity: 0, y: 34, clipPath: 'inset(0 0 100% 0)' }}
      whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function Page() {
  const { cartCount, addToCart, toggleWishlist, isWishlisted, showNotification } = useStore()
  const heroRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const introRef = useRef<HTMLElement>(null)
  const isIntroInView = useInView(introRef, { amount: 0.2, once: false })
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const { scrollYProgress: pageScrollProgress } = useScroll()
  const scrollIndicatorX = useSpring(pageScrollProgress, { stiffness: 140, damping: 28, restDelta: 0.001 })
  const watermarkY = useTransform(pageScrollProgress, [0, 1], ['0%', '35%'])

  useEffect(() => {
    const magnetic = gsap.utils.toArray<HTMLElement>('[data-magnetic]')
    magnetic.forEach((item) => {
      item.addEventListener('mouseenter', () => gsap.to(item, { y: -3, duration: 0.35, ease: 'power2.out' }))
      item.addEventListener('mouseleave', () => gsap.to(item, { y: 0, duration: 0.35, ease: 'power2.out' }))
    })

    // Instant zero-delay playback trigger
    const video = videoRef.current
    if (video) {
      video.defaultMuted = true
      video.muted = true
      const startPlayback = () => {
        video.play().catch(() => {})
      }
      if (video.readyState >= 2) {
        startPlayback()
      } else {
        video.addEventListener('loadeddata', startPlayback, { once: true })
        video.addEventListener('canplay', startPlayback, { once: true })
      }
    }
  }, [])

  return (
    <main className="site-shell">
      <motion.div className="page-scroll-bar" style={{ scaleX: scrollIndicatorX }} />
      <section ref={heroRef} className="hero">
        <motion.video
          ref={videoRef}
          style={{ y: heroY }}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          preload="auto"
          onLoadedData={(e) => {
            const v = e.currentTarget
            v.muted = true
            v.play().catch(() => {})
          }}
          onCanPlay={(e) => {
            const v = e.currentTarget
            v.muted = true
            v.play().catch(() => {})
          }}
          onEnded={(e) => {
            const v = e.currentTarget
            v.currentTime = 0
            v.play().catch(() => {})
          }}
          aria-label="Cinematic car video background"
        >
          <source src="/14451237_3840_2160_30fps.mp4" type="video/mp4" />
        </motion.video>
        <div className="hero-wash" />
        <Navbar isHero={true} />
        <div className="hero-content" id="top">
          <p className="eyebrow light">THE ART OF MINIATURE AUTOMOTIVE</p>
          <h1>Small scale.<br /><em>Timeless machines.</em></h1>
          <p className="hero-copy">Discover legendary automotive icons, premium diecast collectibles and miniature machines made for enthusiasts.</p>
          <div className="hero-ctas">
            <Link href="/collections" className="button button-light" data-magnetic>
              Explore collection <ArrowRight />
            </Link>
            <a href="#vault" className="text-link light" data-magnetic>
              Explore 3D Vault <ArrowDown />
            </a>
          </div>
        </div>
        <div className="hero-meta"><span>SCROLL TO EXPLORE</span><span>EST. 2024 / INDIA</span><span>01 — 05</span></div>
      </section>

      <section ref={introRef} className="intro-section section-pad" id="home-intro">
        <motion.div
          className="intro-watermark"
          aria-hidden="true"
          style={{ y: watermarkY }}
          animate={isIntroInView ? { opacity: 0.035, scale: 1 } : { opacity: 0, scale: 0.96 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          1:64
        </motion.div>

        <motion.div
          className="section-kicker"
          animate={isIntroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6 }}
        >
          <strong>01</strong>
          <span>THE COLLECTION</span>
          <span>CURATED FOR COLLECTORS.</span>
        </motion.div>

        <div className="intro-grid">
          <div className="intro-main">
            <motion.div
              className="intro-badge"
              animate={isIntroInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 12 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="badge-dot" />
              <span>DIECAST ARCHIVE • 1:64 SCALE</span>
            </motion.div>

            <motion.p
              className="eyebrow"
              animate={isIntroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              A SMALLER WAY TO SEE THE WORLD
            </motion.p>

            <motion.h2
              className="intro-heading"
              animate={isIntroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="bold-burgundy">OBJECTS OF DESIRE,</span>
              <br />
              <span className="italic-script"><em>in miniature.</em></span>
            </motion.h2>

            <motion.div
              className="intro-index"
              animate={isIntroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.6, delay: 0.32 }}
            >
              <strong>01</strong>
              <motion.i
                animate={isIntroInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.8, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: 'left' }}
              />
              <span>THE ARCHIVE BEGINS HERE</span>
            </motion.div>
          </div>

          <div className="intro-aside">
            <motion.div
              className="intro-aside-content"
              animate={isIntroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="intro-curator-tag">
                <span>CURATED SPECIMENS</span>
                <span className="curator-sep">/</span>
                <span>EDITION 2024</span>
              </div>
              <p>
                From the racetrack to your display shelf. NEOMOTORS brings together the most considered scale models from the world&apos;s most iconic marques.
              </p>
            </motion.div>

            <div className="intro-stats">
              <motion.div
                className="intro-stat-card"
                animate={isIntroInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
                transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <div className="stat-card-header">
                  <span className="stat-chip">SPEC</span>
                  <span className="stat-dot" />
                </div>
                <strong>1:64</strong>
                <span>THE CLASSIC SCALE</span>
              </motion.div>

              <motion.div
                className="intro-stat-card"
                animate={isIntroInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
                transition={{ duration: 0.6, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <div className="stat-card-header">
                  <span className="stat-chip">MAKER</span>
                  <span className="stat-dot" />
                </div>
                <strong>30+</strong>
                <span>ICONIC MARQUES</span>
              </motion.div>

              <motion.div
                className="intro-stat-card"
                animate={isIntroInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
                transition={{ duration: 0.6, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <div className="stat-card-header">
                  <span className="stat-chip">LEGACY</span>
                  <span className="stat-dot" />
                </div>
                <strong>∞</strong>
                <span>STORIES TO KEEP</span>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          className="intro-rule"
          animate={isIntroInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          style={{ transformOrigin: 'left' }}
        >
          <span>PRECISION / PROVENANCE / PASSION</span>
          <span>SCROLL TO DISCOVER ↓</span>
        </motion.div>
      </section>

      {/* 3D INTERACTIVE SPECIMEN VAULT */}
      <section className="vault-morph-section" id="vault">
        <div className="vault-kicker-bar">
          <div className="section-kicker" style={{ margin: '0 auto', maxWidth: '1360px', padding: '0 6vw' }}>
            <strong>02</strong>
            <span>3D SPECIMEN VAULT</span>
            <span>SCROLL TO MORPH • HOVER TO 3D FLIP</span>
          </div>
        </div>
        <ScrollMorphHero />
      </section>

      <section className="collection-section section-pad" id="collections">
        <motion.div
          className="section-kicker"
          initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <strong>03</strong>
          <span>CURATED EDITIONS</span>
          <span>THE THREE PILLARS OF AUTOMOTIVE ART</span>
        </motion.div>

        <div className="collection-header">
          <motion.div
            className="collection-editorial"
            initial={{ opacity: 0, y: 45, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="collection-badge">
              <span className="badge-dot" />
              <span>LIMITED RUN ARCHIVE • 38 SPECIMENS</span>
            </div>
            <p className="eyebrow">EXPLORE THE ARCHIVE</p>
            <h2 className="collection-title">
              The collector&apos;s <em>selection.</em>
            </h2>
            <p className="collection-deck">
              Three roads into the world of automotive art. Choose your era, your attitude, your next obsession — from precision European engineering to midnight tuner folklore and raw big-block muscle.
            </p>
          </motion.div>

          <motion.div
            className="collection-header-meta"
            initial={{ opacity: 0, y: 45, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="collection-meta-strip">
              <div className="meta-strip-item">
                <span className="meta-strip-label">SCALE</span>
                <strong>1:64 DIECAST & RESIN</strong>
              </div>
              <div className="meta-strip-divider" />
              <div className="meta-strip-item">
                <span className="meta-strip-label">EDITIONS</span>
                <strong>3 CULT THEMES</strong>
              </div>
              <div className="meta-strip-divider" />
              <div className="meta-strip-item">
                <span className="meta-strip-label">STATUS</span>
                <span className="meta-strip-badge">
                  <span className="spec-plate-live" /> VAULT OPEN
                </span>
              </div>
            </div>

            <div className="collection-pill-tabs">
              <Link href="/collections/european-icons" className="collection-pill-tab active">
                <span>01</span> European Icons <em>12</em>
              </Link>
              <Link href="/collections/jdm-legends" className="collection-pill-tab">
                <span>02</span> JDM Midnight <em>16</em>
              </Link>
              <Link href="/collections/detroit-muscle" className="collection-pill-tab">
                <span>03</span> Detroit Muscle <em>10</em>
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="collection-grid perspective-container">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.number}
              className={`collection-card card-${index + 1}`}
              initial={{ opacity: 0, y: 55, filter: 'blur(8px)', scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              whileHover={{
                y: -10,
                rotateX: 4,
                rotateY: index === 0 ? 3 : index === 1 ? -2 : 3,
                scale: 1.015,
              }}
              transition={{ duration: 1.35, delay: index * 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/collections/${collection.id}`} className="block w-full h-full text-inherit">
                <img src={collection.image} alt={collection.title} />
                <div className="card-overlay" />
                <div className="card-top-tags">
                  <span className="card-category-tag">{collection.tag}</span>
                  <span className="card-badge-pill">{collection.badge}</span>
                </div>
                <div className="card-content-wrap">
                  <div className="card-marques-chip">
                    <span>MARQUES //</span> {collection.marques}
                  </div>
                  <div className="collection-label">
                    <span className="collection-num">{collection.number}</span>
                    <div className="collection-info">
                      <h3>{collection.title}</h3>
                      <p>{collection.copy}</p>
                    </div>
                    <div className="collection-arrow-circle">
                      <ArrowRight />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="products-section section-pad" id="shop">
        <div className="section-kicker">
          <strong>04</strong>
          <span>SHOP THE EDIT</span>
          <span>THE FINEST IN SCALE.</span>
        </div>
        <div className="products-heading">
          <h2>Considered<br /><em>collectibles.</em></h2>
          <Link href="/catalog" className="text-link">View all models <ArrowRight /></Link>
        </div>
        <div className="product-grid perspective-container">
          {products.map((product, index) => {
            const productData = PRODUCTS[index] || PRODUCTS[0]
            const liked = isWishlisted(productData.id)

            return (
              <motion.article
                className="product-card"
                key={product.name}
                initial={{ opacity: 0, y: 45, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.15 }}
                whileHover={{
                  y: -8,
                  rotateX: 3,
                  rotateY: index % 2 === 0 ? 2 : -2,
                  scale: 1.015,
                }}
                transition={{ duration: 1.25, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="product-image">
                  <Link href={`/product/${productData.slug}`} className="block w-full h-full">
                    <img src={product.image} alt={product.name} />
                  </Link>
                  <span className="product-tag">{product.tag}</span>
                  <button
                    className={`like-button ${liked ? 'liked' : ''}`}
                    onClick={() => toggleWishlist(productData.id)}
                    aria-label="Add to wishlist"
                  >
                    <Heart className={liked ? 'fill-[#ff99ac] text-[#ff99ac]' : ''} />
                  </button>
                  <div className="quick-add">
                    <button onClick={() => addToCart(productData, 1)}>Add to collection <ArrowRight /></button>
                  </div>
                </div>
                <div className="product-info">
                  <div>
                    <p className="product-brand">{product.brand}</p>
                    <h3>
                      <Link href={`/product/${productData.slug}`} className="hover:text-[#ff99ac] transition-colors">
                        {product.name}
                      </Link>
                    </h3>
                  </div>
                  <strong>{product.price}</strong>
                </div>
              </motion.article>
            )
          })}
        </div>
      </section>

      <section className="brand-section" id="brands">
        <div className="brand-watermark" aria-hidden="true">MARQUES</div>

        <div className="brand-container">
          <motion.div
            className="section-kicker"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <strong>05</strong>
            <span>THE MAKER&apos;S CIRCLE</span>
            <span>CURATED GLOBAL DIECAST MARQUES</span>
          </motion.div>

          <div className="brand-grid">
            <motion.div
              className="brand-editorial"
              initial={{ opacity: 0, y: 35, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="brand-badge">
                <span>✦ OFFICIAL PARTNER VAULT • 9 MARQUES</span>
              </div>
              <p className="eyebrow">THE WORLD OF SCALE</p>
              <h2>Only the <em>names</em><br />that matter.</h2>
              <p className="brand-copy">
                Trusted makers. Exacting details. A considered edit of the legendary houses shaping miniature automotive culture at every scale — from hand-poured Japanese castings to precision European resin.
              </p>
              <div className="brand-stats-row">
                <div className="brand-stat-item">
                  <strong>9</strong>
                  <span>Iconic Houses</span>
                </div>
                <div className="brand-stat-item">
                  <strong>1:64</strong>
                  <span>Master Scale</span>
                </div>
                <div className="brand-stat-item">
                  <strong>100%</strong>
                  <span>Authenticated</span>
                </div>
              </div>
            </motion.div>

            <div className="brand-cards-grid">
              {brandTiles.map((brand, index) => (
                <motion.div
                  key={brand.name}
                  className="brand-tile cursor-pointer"
                  initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 1.15, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, rotateX: 3, rotateY: -2, scale: 1.025 }}
                >
                  <Link href={`/catalog?brand=${encodeURIComponent(brand.name)}`} className="block w-full h-full text-inherit">
                    <div className="brand-tile-header">
                      <span className="brand-tile-origin">{brand.origin}</span>
                      <span className="brand-tile-dot" />
                    </div>
                    <h3>{brand.name}</h3>
                    <p>{brand.desc}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="marquee">
          <div className="marquee-track">
            {[...brands, ...brands].map((brand, index) => (
              <span key={`${brand}-${index}`}>
                {brand}
                <i>✦</i>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="story-section section-pad" id="philosophy">
        <motion.div
          className="section-kicker story-kicker"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <strong>06</strong>
          <span>THE PHILOSOPHY</span>
          <span>THE ART OF SCALE & CRAFTSMANSHIP</span>
        </motion.div>

        <div className="story-container">
          <motion.div
            className="story-image-wrap"
            initial={{ opacity: 0, x: -50, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="story-image-frame">
              <img
                src="https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1600&q=85"
                alt="Classic sports car detail"
              />
              <div className="story-image-overlay" />

              <div className="story-badge-top">
                <span className="story-badge-tag">VOL. 01 // MANIFESTO</span>
                <span className="story-badge-issue">ISSUE 2024</span>
              </div>

              <div className="story-caption-card">
                <div className="caption-card-header">
                  <span className="caption-dot" />
                  <strong>1:64 ALLOY SPECIFICATION</strong>
                </div>
                <p>Authentic wheel camber, multi-layer lacquer, and scaled aerodynamics.</p>
              </div>

              <span className="image-caption">FORM / FUNCTION / FEELING</span>
            </div>
          </motion.div>

          <motion.div
            className="story-editorial"
            initial={{ opacity: 0, x: 50, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.25, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="story-badge">
              <span className="badge-dot" />
              <span>THE NEOMOTORS POINT OF VIEW</span>
            </div>

            <p className="eyebrow">A SMALLER WAY TO SEE THE WORLD</p>

            <h2 className="story-heading">
              More than<br />
              <em>miniatures.</em>
            </h2>

            <p className="story-lead">
              Every collectible in our vault tells a definitive automotive story. From Kanagawa midnight touge folklore to Maranello speed records — scaled down to 1:64 without losing an ounce of soul.
            </p>

            <div className="story-pillars">
              <div className="story-pillar-item">
                <div className="pillar-num">01</div>
                <div className="pillar-body">
                  <strong>Scale Fidelity</strong>
                  <p>Exacting 1:64 proportions engineered directly from OEM factory CAD blueprints.</p>
                </div>
              </div>

              <div className="story-pillar-item">
                <div className="pillar-num">02</div>
                <div className="pillar-body">
                  <strong>Automotive Lacquer</strong>
                  <p>Multi-stage hand-polished paint finishes with authentic pad-printed race liveries.</p>
                </div>
              </div>

              <div className="story-pillar-item">
                <div className="pillar-num">03</div>
                <div className="pillar-body">
                  <strong>Archival Provenance</strong>
                  <p>Serialized chassis numbered plates and museum-grade acrylic display cases.</p>
                </div>
              </div>
            </div>

            <div className="story-meta-pills">
              <span>✦ 38 SPECIMENS</span>
              <span>✦ 9 GLOBAL HOUSES</span>
              <span>✦ 100% AUTHENTICATED</span>
            </div>

            <div className="story-ctas">
              <Link href="/catalog" className="button button-dark" data-magnetic>
                Explore the collection <ArrowRight />
              </Link>
              <Link href="/brands" className="text-link" data-magnetic>
                View our marques <ArrowRight />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="cta-section" id="new arrivals">
        <div className="cta-ambient-glow" />
        <div className="cta-container">
          <motion.div
            className="cta-editorial"
            initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cta-badge">
              <span className="badge-dot" />
              <span>COLLECTOR ALLOCATION // SEASON 2024</span>
            </div>
            <p className="eyebrow light">THE NEXT CHAPTER</p>
            <h2 className="cta-heading">
              <span>YOUR NEXT ICONIC</span>
              <em>piece awaits.</em>
            </h2>
            <p className="cta-copy">
              Gain priority access to limited factory allocations, unreleased 1:64 pre-orders, and serialized collector editions before public drops.
            </p>

            <div className="cta-perks">
              <div className="cta-perk-item">
                <span className="perk-icon">✦</span>
                <span>48h Early Access to Limited Vault Drops</span>
              </div>
              <div className="cta-perk-item">
                <span className="perk-icon">✦</span>
                <span>Serialized Authenticated Vault Certificate</span>
              </div>
              <div className="cta-perk-item">
                <span className="perk-icon">✦</span>
                <span>Worldwide Insured Priority Dispatch</span>
              </div>
            </div>

            <div className="cta-actions">
              <Link href="/catalog?filter=new" className="button button-light" data-magnetic>
                Explore New Arrivals <ArrowRight />
              </Link>
              <Link href="/collections" className="cta-secondary-link" data-magnetic>
                View Curated Editions <ArrowRight />
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="cta-car-showcase"
            initial={{ opacity: 0, y: 40, scale: 0.96, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cta-car-card">
              <div className="cta-car-stage">
                <img
                  src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=85"
                  alt="Porsche 911 GT3 RS Clubsport Specimen"
                  className="cta-car-img"
                />
                <div className="cta-car-stage-overlay" />
                <div className="cta-car-stage-tags">
                  <span className="cta-car-tag">NEXT VAULT DROP</span>
                  <span className="cta-car-badge">1:64 DIECAST &amp; RESIN</span>
                </div>
              </div>

              <div className="cta-car-panel">
                <div className="car-panel-header">
                  <div className="car-panel-title-wrap">
                    <span className="car-panel-sub">ALLOCATION NO. NM-64 // #8892</span>
                    <strong className="car-panel-title">Porsche 911 GT3 RS • Clubsport</strong>
                  </div>
                  <span className="car-panel-live"><span className="spec-plate-live" /> ACTIVE</span>
                </div>

                <div className="car-input-group">
                  <input
                    type="email"
                    placeholder="Enter collector email for VIP pass..."
                    className="car-vip-input"
                    aria-label="Collector email for VIP access"
                  />
                  <button type="button" className="car-vip-btn" aria-label="Claim VIP pass">
                    Claim Pass <ArrowRight />
                  </button>
                </div>
                <span className="car-form-note">✦ Strictly limited to 500 numbered allocations per quarterly drop.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <CinematicFooter />
    </main>
  )
}

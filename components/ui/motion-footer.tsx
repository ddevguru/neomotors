"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp, ArrowRight, Sparkles, ShieldCheck, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES FOR NEOMOTORS
// -------------------------------------------------------------------------
const STYLES = `
.cinematic-footer-wrapper {
  font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif);
  -webkit-font-smoothing: antialiased;
  
  --pill-bg-1: rgba(255, 255, 255, 0.05);
  --pill-bg-2: rgba(255, 255, 255, 0.02);
  --pill-shadow: rgba(0, 0, 0, 0.6);
  --pill-highlight: rgba(255, 255, 255, 0.12);
  --pill-inset-shadow: rgba(0, 0, 0, 0.8);
  --pill-border: rgba(255, 255, 255, 0.12);
  
  --pill-bg-1-hover: rgba(92, 20, 34, 0.4);
  --pill-bg-2-hover: rgba(124, 26, 46, 0.2);
  --pill-border-hover: rgba(255, 153, 172, 0.45);
  --pill-shadow-hover: rgba(92, 20, 34, 0.4);
  --pill-highlight-hover: rgba(255, 153, 172, 0.3);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.85; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(255, 153, 172, 0.6)); }
  15%, 45% { transform: scale(1.22); filter: drop-shadow(0 0 12px rgba(255, 153, 172, 0.9)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 7s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 32s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2.2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Theme-adaptive Grid Background */
.footer-bg-grid {
  background-size: 56px 56px;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
}

/* Theme-adaptive Aurora Glow with Neomotors Burgundy */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(124, 26, 46, 0.35) 0%, 
    rgba(92, 20, 34, 0.2) 35%, 
    transparent 70%
  );
}

/* Glass Pill Theming */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 10px 30px -10px var(--pill-shadow), 
      inset 0 1px 1px var(--pill-highlight), 
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 20px 40px -10px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
  color: #ffffff;
}

/* Giant Background Text Masking */
.footer-giant-bg-text {
  font-family: var(--font-heading, 'Syne', sans-serif);
  font-size: 21vw;
  line-height: 0.8;
  font-weight: 900;
  letter-spacing: -0.06em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(92, 20, 34, 0.05) 50%, transparent 80%);
  -webkit-background-clip: text;
  background-clip: text;
}

/* Metallic Text Glow */
.footer-text-glow {
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.65) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 24px rgba(255, 153, 172, 0.25));
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

export const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.35,
            y: y * 0.35,
            rotationX: -y * 0.1,
            rotationY: x * 0.1,
            scale: 1.04,
            ease: "power2.out",
            duration: 0.35,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.1,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as any);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as any);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MAIN COMPONENT (CinematicFooter for NEOMOTORS)
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>1:64 Scale Perfection</span> <span className="text-[#ff99ac]">✦</span>
    <span>Museum Provenance</span> <span className="text-[#ff99ac]/60">✦</span>
    <span>Serialized Allocations</span> <span className="text-[#ff99ac]">✦</span>
    <span>Multi-Stage Lacquer</span> <span className="text-[#ff99ac]/60">✦</span>
    <span>9 Global Marques</span> <span className="text-[#ff99ac]">✦</span>
    <span>Insured Worldwide Dispatch</span> <span className="text-[#ff99ac]/60">✦</span>
  </div>
);

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Background Parallax
      gsap.fromTo(
        giantTextRef.current,
        { y: "12vh", scale: 0.85, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      // Staggered Content Reveal
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 50%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      {/* 
        The "Curtain Reveal" Wrapper:
        It sits in standard flow. Because it has clip-path, its contents
        are ONLY visible within its bounding box. 
      */}
      <div
        ref={wrapperRef}
        className="relative min-h-[90vh] md:h-screen w-full bg-[#080a0e]"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        {/* The actual footer stays fixed to the viewport underneath everything */}
        <footer className="fixed bottom-0 left-0 flex min-h-[90vh] md:h-screen w-full flex-col justify-between overflow-hidden bg-[#0a0709] text-white cinematic-footer-wrapper border-t border-white/10">
          
          {/* Ambient Light & Grid Background */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[85vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[90px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background text */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute -bottom-[4vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none text-[clamp(4rem,18vw,16rem)] opacity-20"
          >
            NEOMOTORS
          </div>

          {/* 1. Diagonal Sleek Marquee (Top of footer) */}
          <div className="absolute top-6 sm:top-10 md:top-14 left-0 w-full overflow-hidden border-y border-white/10 bg-[#0e0a0d]/80 backdrop-blur-md py-2.5 sm:py-3.5 z-10 -rotate-1 scale-105 shadow-2xl">
            <div className="flex w-max animate-footer-scroll-marquee text-[10px] sm:text-[11px] md:text-xs font-bold tracking-[0.25em] text-white/70 uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 2. Main Center Content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 sm:px-6 mt-20 sm:mt-16 w-full max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#ff99ac]/30 mb-3 sm:mb-4 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff99ac]" />
              <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-[#ff99ac] font-bold uppercase">
                THE ART OF MINIATURE AUTOMOTIVE
              </span>
            </div>

            <h2
              ref={headingRef}
              className="text-3xl sm:text-5xl md:text-7xl font-extrabold footer-text-glow tracking-tight uppercase font-[family-name:var(--font-heading)] mb-6 sm:mb-8 text-center leading-[1.05]"
            >
              Built for the <br />
              <span className="text-[#ff99ac] italic font-[family-name:var(--font-accent)] font-normal lowercase">obsessed.</span>
            </h2>

            {/* Interactive Magnetic Pills Layout */}
            <div ref={linksRef} className="flex flex-col items-center gap-3 sm:gap-4 md:gap-5 w-full">
              {/* Primary Collection CTAs */}
              <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3.5 w-full">
                <MagneticButton as="a" href="/catalog" className="footer-glass-pill px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full text-white font-bold text-xs sm:text-sm flex items-center gap-2 group">
                  <ShoppingBag className="w-4 h-4 text-[#ff99ac] group-hover:scale-110 transition-transform" />
                  Explore Collection
                  <ArrowRight className="w-3.5 h-3.5 text-[#ff99ac] group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
                
                <MagneticButton as="a" href="/#vault" className="footer-glass-pill px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full text-white font-bold text-xs sm:text-sm flex items-center gap-2 group">
                  <Sparkles className="w-4 h-4 text-[#ff99ac] group-hover:rotate-12 transition-transform" />
                  3D Specimen Vault
                  <ArrowRight className="w-3.5 h-3.5 text-[#ff99ac] group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
              </div>

              {/* Secondary Links */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 md:gap-4 w-full mt-1">
                <MagneticButton as="a" href="/brands" className="footer-glass-pill px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-white/75 font-medium text-[11px] sm:text-xs hover:text-white">
                  Global Marques
                </MagneticButton>
                <MagneticButton as="a" href="/collections" className="footer-glass-pill px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-white/75 font-medium text-[11px] sm:text-xs hover:text-white">
                  Curated Editions
                </MagneticButton>
                <MagneticButton as="a" href="/catalog?filter=new" className="footer-glass-pill px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-white/75 font-medium text-[11px] sm:text-xs hover:text-white">
                  VIP Allocations
                </MagneticButton>
                <MagneticButton as="a" href="/philosophy" className="footer-glass-pill px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-white/75 font-medium text-[11px] sm:text-xs hover:text-white">
                  Provenance &amp; Lacquer
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* 3. Bottom Bar / Credits */}
          <div className="relative z-20 w-full py-4 sm:py-5 md:pb-7 px-4 sm:px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 border-t border-white/10 bg-[#080608]/80 backdrop-blur-sm">
            {/* Copyright */}
            <div className="text-white/60 text-[9px] sm:text-[10px] md:text-xs font-mono tracking-widest uppercase order-2 md:order-1 text-center md:text-left">
              © 2024 NEOMOTORS. ALL RIGHTS RESERVED.
            </div>

            {/* "Crafted with Love" Badge */}
            <div className="footer-glass-pill px-4 sm:px-5 py-1.5 sm:py-2 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default border-white/10">
              <span className="text-white/60 text-[8.5px] sm:text-[9.5px] font-mono tracking-widest uppercase">CRAFTED FOR</span>
              <span className="animate-footer-heartbeat text-sm text-[#ff99ac]">✦</span>
              <span className="text-white font-bold text-[11px] sm:text-xs tracking-wider uppercase font-[family-name:var(--font-heading)]">DIECAST PURISTS</span>
            </div>

            {/* Back to top */}
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="w-10 h-10 rounded-full footer-glass-pill flex items-center justify-center text-white/70 hover:text-white group order-3"
            >
              <ArrowUp className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300" />
            </MagneticButton>
          </div>
        </footer>
      </div>
    </>
  );
}

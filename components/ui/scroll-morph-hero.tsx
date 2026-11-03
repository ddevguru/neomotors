"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useTransform, useSpring, useMotionValue, animate } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Disc3, Orbit, Sparkles } from "lucide-react";

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

export interface SpecimenCar {
  name: string;
  code: string;
  brand: string;
  image: string;
}

// 20 Curated Miniature Automotive Specimens with verified, fast-loading Unsplash photos
export const SPECIMEN_CAR_COLLECTION: SpecimenCar[] = [
  { name: "Porsche 911 GT3 RS", code: "NM-01", brand: "MINI GT", image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=600&q=80" },
  { name: "Mercedes 300 SL Gullwing", code: "NM-02", brand: "TARMAC WORKS", image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=600&q=80" },
  { name: "Lamborghini Countach LP500", code: "NM-03", brand: "BBURAGO", image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=600&q=80" },
  { name: "Nissan Skyline GT-R R34", code: "NM-04", brand: "POP RACE", image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80" },
  { name: "Shelby GT500 Fastback", code: "NM-05", brand: "HOT WHEELS", image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=600&q=80" },
  { name: "Lamborghini Huracán STO", code: "NM-06", brand: "TOMICA", image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=600&q=80" },
  { name: "BMW M4 Competition G82", code: "NM-07", brand: "MINI GT", image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80" },
  { name: "Mercedes-AMG GT Black Series", code: "NM-08", brand: "TARMAC WORKS", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80" },
  { name: "Audi R8 V10 Performance", code: "NM-09", brand: "POP RACE", image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80" },
  { name: "McLaren 720S Velocity", code: "NM-10", brand: "BBURAGO", image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=600&q=80" },
  { name: "Ferrari 488 Pista Rosso", code: "NM-11", brand: "BBURAGO", image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80" },
  { name: "Porsche Panamera Turbo S", code: "NM-12", brand: "MINI GT", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80" },
  { name: "Corvette C8 Stingray Z51", code: "NM-13", brand: "HOT WHEELS", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80" },
  { name: "BMW M2 CS Alpine White", code: "NM-14", brand: "TOMICA", image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80" },
  { name: "Audi RS6 Avant Quattro", code: "NM-15", brand: "POP RACE", image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80" },
  { name: "Alfa Romeo Giulia GTA", code: "NM-16", brand: "BBURAGO", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80" },
  { name: "Ford GT Heritage Gulf 1966", code: "NM-17", brand: "TARMAC WORKS", image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=600&q=80" },
  { name: "Bugatti Chiron Super Sport", code: "NM-18", brand: "MINI GT", image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80" },
  { name: "Aston Martin Vantage V8", code: "NM-19", brand: "HOT WHEELS", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=600&q=80" },
  { name: "Jaguar E-Type Roadster S1", code: "NM-20", brand: "MATCHBOX", image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=600&q=80" },
];

const TOTAL_IMAGES = SPECIMEN_CAR_COLLECTION.length;
// Expanded scroll range: 0 to 1000 = leisurely smooth morph; 1000 to 3600 = smooth card rotation
const MAX_SCROLL = 3600;
const MORPH_THRESHOLD = 1000;

const IMG_WIDTH = 68;
const IMG_HEIGHT = 94;

// Linear interpolation helper
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export default function ScrollMorphHero({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const centerTextInnerRef = useRef<HTMLDivElement>(null);
  const arcTextRef = useRef<HTMLDivElement>(null);

  const [activeCarIndex, setActiveCarIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"orbit" | "arc">("orbit");

  // Virtual scroll motion values (0 = Orbit Mode, MORPH_THRESHOLD..MAX_SCROLL = Arc Mode)
  const virtualScroll = useMotionValue(0);
  const scrollRef = useRef(0);

  // Smooth cinematic springs: calibrated for elegant pacing and zero lag
  const morphProgress = useTransform(virtualScroll, [0, MORPH_THRESHOLD], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 28, damping: 18, mass: 1 });

  const scrollRotate = useTransform(virtualScroll, [MORPH_THRESHOLD, MAX_SCROLL], [0, TOTAL_IMAGES - 1]);
  const smoothCenterIdx = useSpring(scrollRotate, { stiffness: 24, damping: 18, mass: 1 });

  // Mouse parallax motion value
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 25, damping: 20 });

  // Keep scrollRef updated
  useEffect(() => {
    const unsub = virtualScroll.on("change", (v) => {
      scrollRef.current = v;
      setViewMode(v < MORPH_THRESHOLD * 0.4 ? "orbit" : "arc");
    });
    return () => unsub();
  }, [virtualScroll]);

  // Cursor Enter Handler:
  // "idhar pr cursor aatte he ye orbit mai hona chaiye"
  // When cursor enters, gently glide back to orbit view (0) over a luxurious 1.1s
  const handleMouseEnter = useCallback(() => {
    if (scrollRef.current > 0) {
      animate(virtualScroll, 0, { duration: 1.1, ease: [0.22, 1, 0.36, 1] });
    }
  }, [virtualScroll]);

  // Wheel and Touch Scrolling Behaviour:
  // Gentle scroll multiplier so users have ample time to watch the cards float smoothly
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const current = scrollRef.current;
      const isDown = e.deltaY > 0;
      const isUp = e.deltaY < 0;

      // Allow natural page scroll if user scrolls up while already at top orbit
      if (isUp && current <= 0) return;
      // Allow natural page scroll if user scrolls down while already at end of arc
      if (isDown && current >= MAX_SCROLL) return;

      e.preventDefault();

      // Controlled sensitivity (0.65x multiplier) gives a calm, high-end museum experience
      const newScroll = Math.min(Math.max(current + e.deltaY * 0.65, 0), MAX_SCROLL);
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
    };

    // Touch support for mobile / tablets
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      touchStartY = touchY;

      const current = scrollRef.current;
      if (deltaY < 0 && current <= 0) return;
      if (deltaY > 0 && current >= MAX_SCROLL) return;

      e.preventDefault();
      const newScroll = Math.min(Math.max(current + deltaY * 0.85, 0), MAX_SCROLL);
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
    };

    // Mouse parallax
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const normX = (relativeX / rect.width) * 2 - 1;
      mouseX.set(normX * 22);
    };

    // Horizontal drag to browse cards in Arc mode
    let isDragging = false;
    let dragStartX = 0;
    let dragStartScroll = 0;

    const handlePointerDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement)?.closest("button")) return;
      isDragging = true;
      dragStartX = e.clientX;
      dragStartScroll = scrollRef.current;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStartX;
      const stepChange = (-deltaX / 70) * ((MAX_SCROLL - MORPH_THRESHOLD) / (TOTAL_IMAGES - 1));
      const target = Math.min(Math.max(dragStartScroll + stepChange, MORPH_THRESHOLD), MAX_SCROLL);
      scrollRef.current = target;
      virtualScroll.set(target);
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [virtualScroll, mouseX]);

  // High-performance GPU Render Loop
  // Updates morph, center index, and parallax without React state lag
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;

    const renderLoop = () => {
      const morph = smoothMorph.get(); // 0 = Orbit, 1 = Arc
      const centerIdx = smoothCenterIdx.get();
      const parallax = smoothMouseX.get();

      const width = container.offsetWidth || 1200;
      const height = container.offsetHeight || 720;
      const isMobile = width < 768;

      // Update active specimen index
      const activeIdx = Math.round(centerIdx) % TOTAL_IMAGES;
      const safeActiveIdx = (activeIdx + TOTAL_IMAGES) % TOTAL_IMAGES;
      setActiveCarIndex(safeActiveIdx);

      // Arc Header text fading (fades in when morph > 0.5)
      if (arcTextRef.current) {
        const arcOpacity = Math.max((morph - 0.45) * 1.9, 0);
        arcTextRef.current.style.opacity = `${arcOpacity}`;
        arcTextRef.current.style.transform = `translateY(${(1 - arcOpacity) * 14}px)`;
        arcTextRef.current.style.pointerEvents = arcOpacity > 0.5 ? "auto" : "none";
      }

      // Orbit Center text:
      // Smooth fade and scale, anchored at the true flex center of the stage
      if (centerTextInnerRef.current) {
        const orbitOpacity = Math.max(1 - morph * 2.0, 0);
        centerTextInnerRef.current.style.opacity = `${orbitOpacity}`;
        centerTextInnerRef.current.style.transform = `scale(${0.95 + orbitOpacity * 0.05})`;
        centerTextInnerRef.current.style.pointerEvents = orbitOpacity > 0.5 ? "auto" : "none";
      }

      // 1. Orbit Ring Radius:
      // Generous clearance (> 140px on all sides) around the center text
      const ringRadius = isMobile
        ? Math.min(Math.min(width, height) * 0.38, 205)
        : Math.min(Math.max(height * 0.43, 290), 315);

      // 2. Arc Crescent Parameters:
      const cardSpacing = isMobile ? 66 : 92;

      for (let i = 0; i < TOTAL_IMAGES; i++) {
        const el = cardElementsRef.current[i];
        if (!el) continue;

        // --- ORBIT CIRCLE POSITION ---
        // Cards start from top (-90 deg), evenly distributed around the ring
        // All cards are UPRIGHT! (gentle tangent tilt max 12 deg so cards are never upside down)
        const ringAngle = (i / TOTAL_IMAGES) * 2 * Math.PI - Math.PI / 2;
        const ringX = Math.cos(ringAngle) * ringRadius;
        const ringY = Math.sin(ringAngle) * ringRadius;
        const ringRot = Math.sin(ringAngle) * 12; // subtle tilt, always upright!
        const ringScale = isMobile ? 0.74 : 0.82;
        const ringOpacity = 1;

        // --- BOTTOM ARC POSITION ---
        // Crescent arc with cards upright
        let diff = (i - centerIdx) % TOTAL_IMAGES;
        if (diff > TOTAL_IMAGES / 2) diff -= TOTAL_IMAGES;
        if (diff < -TOTAL_IMAGES / 2) diff += TOTAL_IMAGES;

        const arcX = diff * cardSpacing + parallax;
        const normDiff = diff / 6.5;

        const arcY = (isMobile ? 18 : 28) + Math.min(normDiff * normDiff, 2.6) * 44;
        const arcRot = Math.min(Math.max(normDiff * 14, -28), 28); // gentle upright tilt
        const arcScale = Math.max((isMobile ? 1.15 : 1.34) - Math.abs(normDiff) * 0.17, 0.72);
        const arcOpacity = Math.max(1 - Math.abs(normDiff) * 0.22, 0);

        // --- MORPH INTERPOLATION ---
        const finalX = lerp(ringX, arcX, morph);
        const finalY = lerp(ringY, arcY, morph);
        const finalRot = lerp(ringRot, arcRot, morph);
        const finalScale = lerp(ringScale, arcScale, morph);
        const finalOpacity = lerp(ringOpacity, arcOpacity, morph);

        el.style.transform = `translate3d(${finalX}px, ${finalY}px, 0) rotate(${finalRot}deg) scale(${finalScale})`;
        el.style.opacity = `${finalOpacity}`;
        el.style.pointerEvents = finalOpacity > 0.2 ? "auto" : "none";
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, [smoothMorph, smoothCenterIdx, smoothMouseX]);

  // Mode Toggle Handler - Smooth, deliberate 1.25s animation
  const handleToggleMode = useCallback(() => {
    if (viewMode === "orbit") {
      animate(virtualScroll, MORPH_THRESHOLD + 200, { duration: 1.25, ease: [0.22, 1, 0.36, 1] });
    } else {
      animate(virtualScroll, 0, { duration: 1.25, ease: [0.22, 1, 0.36, 1] });
    }
  }, [viewMode, virtualScroll]);

  // Stepper handlers
  const handlePrevCar = useCallback(() => {
    const step = (MAX_SCROLL - MORPH_THRESHOLD) / (TOTAL_IMAGES - 1);
    const target = Math.max(scrollRef.current - step, MORPH_THRESHOLD);
    animate(virtualScroll, target, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });
  }, [virtualScroll]);

  const handleNextCar = useCallback(() => {
    const step = (MAX_SCROLL - MORPH_THRESHOLD) / (TOTAL_IMAGES - 1);
    const target = Math.min(Math.max(scrollRef.current, MORPH_THRESHOLD) + step, MAX_SCROLL);
    animate(virtualScroll, target, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });
  }, [virtualScroll]);

  const handleSelectCar = useCallback(
    (index: number) => {
      setActiveCarIndex(index);
      if (scrollRef.current > MORPH_THRESHOLD * 0.4) {
        const step = (MAX_SCROLL - MORPH_THRESHOLD) / (TOTAL_IMAGES - 1);
        const target = MORPH_THRESHOLD + index * step;
        animate(virtualScroll, target, { duration: 0.85, ease: [0.22, 1, 0.36, 1] });
      }
    },
    [virtualScroll]
  );

  const activeCar = SPECIMEN_CAR_COLLECTION[activeCarIndex] || SPECIMEN_CAR_COLLECTION[0];

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={cn(
        "relative w-full h-[680px] md:h-[720px] bg-gradient-to-b from-[#0e0c0b] via-[#14080e] to-[#0e0c0b] overflow-hidden select-none border-y border-white/10",
        className
      )}
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(124,26,46,0.24)_0%,transparent_65%)] pointer-events-none" />

      {/* 
        1. ARC MODE HEADER (Visible in Arc Mode at the Top)
      */}
      <div
        ref={arcTextRef}
        style={{ willChange: "transform, opacity", opacity: 0 }}
        className="absolute top-[5%] md:top-[7%] left-0 right-0 z-10 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#ff99ac]/30 mb-2 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff99ac] animate-pulse" />
          <span className="text-[8.5px] font-mono tracking-widest text-[#ff99ac] font-bold uppercase">
            20 SERIALIZED DIECAST SPECIMENS
          </span>
        </div>

        <h3 className="text-xl md:text-3xl font-extrabold uppercase tracking-tight text-white font-[family-name:var(--font-heading)] mb-1">
          Curated 1:64 Specimen Archive
        </h3>
        <p className="text-xs text-white/70 max-w-lg leading-relaxed">
          Drag or scroll cards to rotate the archive. Hover any card to inspect chassis details.
        </p>
      </div>

      {/* 
        2. TRUE FULL-STAGE CANVAS (inset-0)
        Both Center Text and Cards live in this exact same viewport-filling relative stage.
      */}
      <div className="absolute inset-0 [perspective:1200px] pointer-events-none">
        
        {/* 
          ORBIT CENTER TEXT - FULL INSET CONTAINER
          Using standard flexbox centering on an inset-0 container guarantees
          100% mathematical dead-center alignment on EVERY screen size!
        */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none select-none">
          <div
            ref={centerTextInnerRef}
            style={{
              willChange: "transform, opacity",
              transformOrigin: "center center",
            }}
            className="flex flex-col items-center justify-center text-center max-w-[280px] px-2"
          >
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-[#ff99ac]/30 mb-2 backdrop-blur-md shadow-sm">
              <Sparkles className="w-2.5 h-2.5 text-[#ff99ac]" />
              <span className="text-[7.5px] font-mono tracking-widest text-[#ff99ac] font-bold uppercase">
                ORBIT VAULT
              </span>
            </div>

            <h2 className="text-xs md:text-sm font-bold tracking-[0.22em] uppercase font-[family-name:var(--font-heading)] text-white/90">
              THE ART OF
            </h2>
            <h3 className="text-base md:text-lg font-black tracking-wider uppercase font-[family-name:var(--font-heading)] text-[#ff99ac] italic leading-tight my-0.5">
              MINIATURE
            </h3>
            <h3 className="text-base md:text-lg font-extrabold tracking-wider uppercase font-[family-name:var(--font-heading)] text-white leading-tight">
              AUTOMOTIVE
            </h3>

            <p className="mt-2 text-[7.5px] font-mono tracking-[0.18em] text-white/70">
              20 CELEBRATED CASTINGS
            </p>

            <div className="mt-2.5 inline-flex items-center gap-1.5 text-[7px] font-mono tracking-[0.14em] text-[#ff99ac]/90 uppercase bg-[#ff99ac]/10 px-2.5 py-0.5 rounded-full border border-[#ff99ac]/20 animate-pulse">
              <span>SCROLL TO EXPLORE</span>
              <span>↓</span>
            </div>
          </div>
        </div>

        {/* 20 INTERACTIVE DIECAST CAR SPECIMENS */}
        {SPECIMEN_CAR_COLLECTION.map((car, i) => (
          <div
            key={car.code}
            ref={(el) => {
              cardElementsRef.current[i] = el;
            }}
            onClick={() => handleSelectCar(i)}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: IMG_WIDTH,
              height: IMG_HEIGHT,
              marginLeft: -IMG_WIDTH / 2,
              marginTop: -IMG_HEIGHT / 2,
              transformStyle: "preserve-3d",
              WebkitTransformStyle: "preserve-3d",
              perspective: "1000px",
              willChange: "transform, opacity",
            }}
            className="pointer-events-auto cursor-pointer group select-none"
          >
            <div
              className="relative h-full w-full rounded-xl transition-transform duration-500 ease-out group-hover:[transform:rotateY(180deg)]"
              style={{
                transformStyle: "preserve-3d",
                WebkitTransformStyle: "preserve-3d",
              }}
            >
              {/* Front Face - Car Specimen (Always Right-Side Up) */}
              <div
                className={cn(
                  "absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-xl bg-[#12161f] border transition-colors duration-300",
                  activeCarIndex === i
                    ? "border-[#ff99ac] shadow-[0_0_18px_rgba(255,153,172,0.5)] ring-1 ring-[#ff99ac]"
                    : "border-white/20 hover:border-white/60"
                )}
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(0deg)",
                }}
              >
                <img
                  src={car.image}
                  alt={car.name}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25 group-hover:opacity-0 transition-opacity" />
                <div className="absolute bottom-1.5 left-1.5 right-1.5 flex justify-between items-center text-[7.5px] font-mono text-white/95">
                  <span className="font-bold text-[#ff99ac]">{car.code}</span>
                  <span className="opacity-75">1:64</span>
                </div>
              </div>

              {/* Back Face - 3D Collector Card Spec Sheet */}
              <div
                className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-2xl bg-[#1c0812] flex flex-col items-center justify-between p-2 border border-[#ff99ac]/60 text-center"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div className="w-full flex justify-between items-center text-[7px] font-mono text-[#ff99ac]">
                  <span>VAULT</span>
                  <span>#{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="my-auto">
                  <p className="text-[7px] font-bold text-[#ff99ac] uppercase tracking-wider mb-0.5">
                    {car.brand}
                  </p>
                  <p className="text-[9px] font-bold text-white leading-tight">
                    {car.name}
                  </p>
                </div>
                <div className="w-full pt-1 border-t border-white/10 text-[6px] font-mono text-white/80 uppercase tracking-widest">
                  AUTHENTIC DIECAST
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 
        3. BOTTOM VAULT CONTROLS BAR
      */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 pointer-events-auto gap-3">
        {/* Specimen Info Chip */}
        <div className="flex items-center gap-2.5 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
          <span className="text-[9px] font-mono font-bold text-[#ff99ac]">
            {activeCar.code}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span className="text-[10px] font-mono text-white/90">
            {activeCar.brand} • {activeCar.name}
          </span>
          <span className="text-[9px] font-mono text-white/50">
            ({activeCarIndex + 1}/{TOTAL_IMAGES})
          </span>
        </div>

        {/* Stepper & Mode Toggle */}
        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          <button
            onClick={handlePrevCar}
            aria-label="Previous Car"
            className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleToggleMode}
            className="px-2.5 py-0.5 rounded-full text-[9px] font-mono tracking-wider bg-white/10 hover:bg-white/20 text-[#ff99ac] border border-[#ff99ac]/30 transition-all flex items-center gap-1.5"
          >
            {viewMode === "orbit" ? (
              <>
                <Disc3 className="w-3 h-3" />
                <span>ARC VIEW</span>
              </>
            ) : (
              <>
                <Orbit className="w-3 h-3" />
                <span>ORBIT VIEW</span>
              </>
            )}
          </button>

          <button
            onClick={handleNextCar}
            aria-label="Next Car"
            className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}

// Re-export as IntroAnimation for compatibility with standard 21st.dev templates
export { ScrollMorphHero as IntroAnimation };

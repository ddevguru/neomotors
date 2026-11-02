"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

export interface SpecimenCar {
  name: string;
  code: string;
  brand: string;
  image: string;
}

interface FlipCardProps {
  specimen: SpecimenCar;
  index: number;
  total: number;
  phase: AnimationPhase;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

// --- FlipCard Component ---
const IMG_WIDTH = 64;
const IMG_HEIGHT = 90;

function FlipCard({
  specimen,
  index,
  total,
  phase,
  target,
}: FlipCardProps) {
  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 45,
        damping: 16,
      }}
      style={{
        position: "absolute",
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="cursor-pointer group select-none"
    >
      <motion.div
        className="relative h-full w-full rounded-xl"
        style={{ transformStyle: "preserve-3d" }}
        transition={{ duration: 0.55, type: "spring", stiffness: 240, damping: 20 }}
        whileHover={{ rotateY: 180, scale: 1.08 }}
      >
        {/* Front Face - Car Specimen */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-xl bg-[#12161f] border border-white/20"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={specimen.image}
            alt={specimen.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 group-hover:opacity-0 transition-opacity" />
          <div className="absolute bottom-1.5 left-1.5 right-1.5 flex justify-between items-center text-[7.5px] font-mono text-white/90">
            <span className="font-bold text-[#ff99ac]">{specimen.code}</span>
            <span className="opacity-70">1:64</span>
          </div>
        </div>

        {/* Back Face - 3D Collector Card Spec Sheet */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-2xl bg-[#1a080f] flex flex-col items-center justify-between p-2 border border-[#ff99ac]/40 text-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="w-full flex justify-between items-center text-[7px] font-mono text-[#ff99ac]">
            <span>VAULT</span>
            <span>#{String(index + 1).padStart(2, "0")}</span>
          </div>
          <div className="my-auto">
            <p className="text-[7.5px] font-bold text-[#ff99ac] uppercase tracking-wider mb-0.5">
              {specimen.brand}
            </p>
            <p className="text-[9px] font-semibold text-white leading-tight">
              {specimen.name}
            </p>
          </div>
          <div className="w-full pt-1 border-t border-white/10 text-[6.5px] font-mono text-white/60 uppercase tracking-widest">
            AUTHENTIC DIECAST
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// 20 Curated Miniature Automotive Specimens
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
  { name: "Porsche 718 Cayman GT4", code: "NM-14", brand: "TOMICA", image: "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=600&q=80" },
  { name: "Audi RS6 Avant Quattro", code: "NM-15", brand: "POP RACE", image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80" },
  { name: "Alfa Romeo Giulia GTA", code: "NM-16", brand: "BBURAGO", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80" },
  { name: "Ford GT Heritage Gulf 1966", code: "NM-17", brand: "TARMAC WORKS", image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=600&q=80" },
  { name: "Bugatti Chiron Super Sport", code: "NM-18", brand: "MINI GT", image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80" },
  { name: "Aston Martin Vantage V8", code: "NM-19", brand: "HOT WHEELS", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=600&q=80" },
  { name: "Jaguar E-Type Roadster Series 1", code: "NM-20", brand: "MATCHBOX", image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=600&q=80" },
];

const TOTAL_IMAGES = 20;
const MAX_SCROLL = 2400;

// Linear interpolation
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export default function ScrollMorphHero({ className }: { className?: string }) {
  const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Resize Observer
  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);

    setContainerSize({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });

    return () => observer.disconnect();
  }, []);

  // Virtual Scroll Logic with escape release to prevent trapping user
  const virtualScroll = useMotionValue(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const current = scrollRef.current;
      const goingDown = e.deltaY > 0;
      const goingUp = e.deltaY < 0;

      // Allow natural page scroll if reaching endpoints
      if ((goingDown && current >= MAX_SCROLL) || (goingUp && current <= 0)) {
        return;
      }

      e.preventDefault();
      const newScroll = Math.min(Math.max(current + e.deltaY, 0), MAX_SCROLL);
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      touchStartY = touchY;

      const current = scrollRef.current;
      if ((deltaY > 0 && current >= MAX_SCROLL) || (deltaY < 0 && current <= 0)) {
        return;
      }

      const newScroll = Math.min(Math.max(current + deltaY, 0), MAX_SCROLL);
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [virtualScroll]);

  // Morph Progress: 0 (Circle) -> 1 (Bottom Arc)
  const morphProgress = useTransform(virtualScroll, [0, 500], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 45, damping: 22 });

  // Scroll Rotation (Shuffling)
  const scrollRotate = useTransform(virtualScroll, [500, MAX_SCROLL], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 45, damping: 22 });

  // Mouse Parallax
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 35, damping: 22 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const normalizedX = (relativeX / rect.width) * 2 - 1;
      mouseX.set(normalizedX * 80);
    };
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  // Intro Sequence
  useEffect(() => {
    const timer1 = setTimeout(() => setIntroPhase("line"), 400);
    const timer2 = setTimeout(() => setIntroPhase("circle"), 2200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Random Scatter Positions
  const scatterPositions = useMemo(() => {
    return SPECIMEN_CAR_COLLECTION.map(() => ({
      x: (Math.random() - 0.5) * 1400,
      y: (Math.random() - 0.5) * 900,
      rotation: (Math.random() - 0.5) * 160,
      scale: 0.6,
      opacity: 0,
    }));
  }, []);

  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);

  useEffect(() => {
    const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
    const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
    const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
    return () => {
      unsubscribeMorph();
      unsubscribeRotate();
      unsubscribeParallax();
    };
  }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

  // Content Opacity
  const contentOpacity = useTransform(smoothMorph, [0.75, 1], [0, 1]);
  const contentY = useTransform(smoothMorph, [0.75, 1], [25, 0]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-[620px] md:h-[700px] overflow-hidden bg-gradient-to-b from-[#0e0c0b] via-[#150a10] to-[#0e0c0b] text-white border-y border-white/10 select-none",
        className
      )}
    >
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(92,20,34,0.3)_0%,transparent_65%)] pointer-events-none" />

      {/* Main 3D Stage */}
      <div className="relative flex h-full w-full flex-col items-center justify-center [perspective:1200px]">
        {/* Intro Text (Fades out during scroll) */}
        <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              introPhase === "circle" && morphValue < 0.5
                ? { opacity: 1 - morphValue * 2, scale: 1 }
                : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#ff99ac]/30 mb-4 backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff99ac] animate-pulse" />
            <span className="text-[9px] font-mono tracking-widest text-[#ff99ac] font-bold uppercase">
              INTERACTIVE 3D SPECIMEN VAULT
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={
              introPhase === "circle" && morphValue < 0.5
                ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(10px)" }
            }
            transition={{ duration: 0.9 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase font-[family-name:var(--font-heading)] max-w-2xl leading-tight"
          >
            The Art of Miniature Automotive
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={
              introPhase === "circle" && morphValue < 0.5
                ? { opacity: 0.65 - morphValue }
                : { opacity: 0 }
            }
            transition={{ duration: 0.9, delay: 0.15 }}
            className="mt-3 text-xs md:text-sm font-mono tracking-[0.25em] text-[#ff99ac]"
          >
            SCROLL TO EXPLORE & HOVER TO 3D FLIP CARDS
          </motion.p>
        </div>

        {/* Arc Active Content (Fades in when morphed) */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute top-[8%] md:top-[10%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#ff99ac]/30 mb-3 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff99ac]" />
            <span className="text-[9px] font-mono tracking-widest text-[#ff99ac] font-bold uppercase">
              20 SERIALIZED DIECAST SPECIMENS
            </span>
          </div>

          <h3 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-white font-[family-name:var(--font-heading)] mb-2">
            Curated 1:64 Specimen Archive
          </h3>
          <p className="text-xs md:text-sm text-white/70 max-w-xl leading-relaxed">
            Every diecast casting is authentic motorsport history. Scroll to rotate the arc, or hover any card to inspect chassis provenance.
          </p>
        </motion.div>

        {/* Interactive Cards Container */}
        <div className="relative flex items-center justify-center w-full h-full">
          {SPECIMEN_CAR_COLLECTION.slice(0, TOTAL_IMAGES).map((car, i) => {
            let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

            // 1. Intro Phases
            if (introPhase === "scatter") {
              target = scatterPositions[i];
            } else if (introPhase === "line") {
              const lineSpacing = 72;
              const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
              const lineX = i * lineSpacing - lineTotalWidth / 2;
              target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
            } else {
              // 2. Circle Phase & Morph
              const isMobile = containerSize.width < 768;
              const minDimension = Math.min(containerSize.width, containerSize.height);

              // Circle
              const circleRadius = Math.min(minDimension * 0.36, 340);
              const circleAngle = (i / TOTAL_IMAGES) * 360;
              const circleRad = (circleAngle * Math.PI) / 180;
              const circlePos = {
                x: Math.cos(circleRad) * circleRadius,
                y: Math.sin(circleRad) * circleRadius,
                rotation: circleAngle + 90,
              };

              // Rainbow Arc
              const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
              const arcRadius = baseRadius * (isMobile ? 1.35 : 1.05);
              const arcApexY = containerSize.height * (isMobile ? 0.38 : 0.26);
              const arcCenterY = arcApexY + arcRadius;

              const spreadAngle = isMobile ? 100 : 130;
              const startAngle = -90 - spreadAngle / 2;
              const step = spreadAngle / (TOTAL_IMAGES - 1);

              const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
              const maxRotation = spreadAngle * 0.85;
              const boundedRotation = -scrollProgress * maxRotation;

              const currentArcAngle = startAngle + i * step + boundedRotation;
              const arcRad = (currentArcAngle * Math.PI) / 180;

              const arcPos = {
                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                rotation: currentArcAngle + 90,
                scale: isMobile ? 1.35 : 1.7,
              };

              // Interpolate
              target = {
                x: lerp(circlePos.x, arcPos.x, morphValue),
                y: lerp(circlePos.y, arcPos.y, morphValue),
                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                scale: lerp(1, arcPos.scale, morphValue),
                opacity: 1,
              };
            }

            return (
              <FlipCard
                key={car.code}
                specimen={car}
                index={i}
                total={TOTAL_IMAGES}
                phase={introPhase}
                target={target}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

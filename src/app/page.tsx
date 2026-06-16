'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, ChevronRight, Activity, Zap, Flame, Award } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PRODUCT_FAMILIES } from '../data/content';

// Simple CountUp Component
function CountUp({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.abs(Math.floor(totalMiliseconds / end));
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}</span>;
}

export default function HomePage() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, 200]);

  const [showSecondImage, setShowSecondImage] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowSecondImage(prev => !prev);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Handle intersection triggers for the Teflon vs PVC section
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const handleScrollTrigger = () => {
      const el = document.getElementById('temp-comparison-section');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
      if (rect.top <= viewHeight * 0.75) {
        setInView(true);
      }
    };
    window.addEventListener('scroll', handleScrollTrigger);
    // Trigger once on mount
    handleScrollTrigger();
    return () => window.removeEventListener('scroll', handleScrollTrigger);
  }, []);

  return (
    <div className="relative overflow-hidden bg-paper w-full min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center pt-8 pb-16 md:py-24 border-b border-ink/10 bg-grid-dots">
        {/* Subtle coordinate markers (Blueprint style) */}
        <div className="absolute top-4 left-6 hidden md:block text-[9px] font-mono text-ink/30">
          COORD: [565.32 // ROHTAK.IN]
        </div>
        <div className="absolute top-4 right-6 hidden md:block text-[9px] font-mono text-ink/30">
          GRID: 24x24.DOTS // PAGE: INDEX.01
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 min-h-full py-6">
            <div className="space-y-4">
              {/* Monospace credibility strip */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 bg-ink text-paper text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-xs"
              >
                <span>JSS 51004</span>
                <span className="text-swan-red font-bold">·</span>
                <span>MIL-W-16878E</span>
                <span className="text-swan-red font-bold">·</span>
                <span>MoD Approved</span>
                <span className="text-swan-red font-bold">·</span>
                <span>Since 1991</span>
              </motion.div>

              <div className="space-y-2">
                <span className="block text-[10px] font-mono tracking-widest text-cobalt uppercase font-bold mt-2">
                  PTFE · FEP · SILICONE WIRE, CABLE & SLEEVING
                </span>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight uppercase"
                >
                  The Proven <br />
                  <span className="text-cobalt">Technology.</span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base md:text-lg text-ink/75 max-w-xl font-sans font-medium"
              >
                High-performance PTFE/Teflon, FEP, and Silicon wires, cables, and sleeves engineered for thermal operations between <span className="font-semibold text-ink">-65 °C and +260 °C</span>.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/products"
                className="bg-ink hover:bg-cobalt text-paper font-mono text-xs uppercase tracking-widest px-6 py-4 rounded-xs flex items-center justify-between gap-4 transition-all group cursor-pointer shadow-sm hover:shadow-md"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="/brand/jain-polymer-wire-sleeve-catalogue.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-ink/20 hover:border-ink bg-white/50 hover:bg-paper text-ink font-mono text-xs uppercase tracking-widest px-6 py-4 rounded-xs flex items-center justify-center transition-all cursor-pointer"
              >
                Capabilities Statement (PDF)
              </a>
            </motion.div>

            {/* Proof Row */}
            <div className="pt-6 border-t border-ink/10 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[9px] font-mono uppercase tracking-widest text-ink/40">
              <span className="font-bold text-ink/60">TRUSTED IN:</span>
              <span>AEROSPACE</span>
              <span className="text-swan-red/40">•</span>
              <span>DEFENCE</span>
              <span className="text-swan-red/40">•</span>
              <span>ATOMIC ENERGY</span>
              <span className="text-swan-red/40">•</span>
              <span>TELECOM</span>
            </div>
          </div>

          {/* Hero Right Media (with 3D Card Flip rotation and scan-line crop) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <motion.div
              style={{ y: yParallax }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full aspect-[4/5] sm:aspect-square md:aspect-[4/5] [perspective:1200px]"
            >
              <motion.div
                animate={{ rotateY: showSecondImage ? 180 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="relative w-full h-full [transform-style:preserve-3d] p-2 bg-white border border-ink/10 rounded-xs shadow-xl"
              >
                {/* Front Face: homepage_hero.webp */}
                <div 
                  className="absolute inset-2 [backface-visibility:hidden] overflow-hidden rounded-xs"
                  style={{ transform: "rotateY(0deg)" }}
                >
                  <div className="relative w-full h-full overflow-hidden scale-105 translate-y-1">
                    <Image
                      src="/brand/crops/homepage_hero.webp"
                      alt="Coloured PTFE wire coils + cut bundles"
                      fill
                      priority
                      className="object-cover object-center filter saturate-[0.85] contrast-[1.05]"
                      sizes="(max-w-7xl) 100vw, 400px"
                    />
                  </div>
                  {/* Blueprint coordinates watermark */}
                  <div className="absolute bottom-3 right-3 bg-ink/80 text-paper text-[8px] font-mono px-2 py-1 uppercase tracking-widest backdrop-blur-xs z-30">
                    FIG.01 // PTFE_WIRE_BUNDLES
                  </div>
                </div>

                {/* Back Face: hero_image2.webp */}
                <div 
                  className="absolute inset-2 [backface-visibility:hidden] overflow-hidden rounded-xs"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <div className="relative w-full h-full overflow-hidden scale-105 translate-y-1">
                    <Image
                      src="/brand/crops/hero_image2.webp"
                      alt="Premium multi-core and coaxial cables range"
                      fill
                      priority
                      className="object-cover object-center filter saturate-[0.85] contrast-[1.05]"
                      sizes="(max-w-7xl) 100vw, 400px"
                    />
                  </div>
                  {/* Blueprint coordinates watermark */}
                  <div className="absolute bottom-3 right-3 bg-ink/80 text-paper text-[8px] font-mono px-2 py-1 uppercase tracking-widest backdrop-blur-xs z-30 [transform:rotateY(180deg)]">
                    FIG.02 // CORE_CABLE_RANGE
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. CREDIBILITY / TRUST BAR */}
      <section className="bg-ink text-paper py-8 border-b border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center text-center">
            <div className="border-r border-white/10 last:border-0 pr-4">
              <span className="block text-[10px] font-mono tracking-widest text-white/40 uppercase mb-1">APPROVAL TYPE 01</span>
              <span className="block text-sm font-semibold uppercase tracking-wider text-white">MINISTRY OF DEFENCE</span>
              <span className="block text-[10px] font-mono text-white/50 mt-0.5">L.C.S.O CERTIFIED</span>
            </div>
            <div className="md:border-r border-white/10 pr-4">
              <span className="block text-[10px] font-mono tracking-widest text-white/40 uppercase mb-1">APPROVAL TYPE 02</span>
              <span className="block text-sm font-semibold uppercase tracking-wider text-white">C-DOT APPROVED</span>
              <span className="block text-[10px] font-mono text-white/50 mt-0.5">TELECOM STANDARDS</span>
            </div>
            <div className="border-r border-white/10 last:border-0 pr-4">
              <span className="block text-[10px] font-mono tracking-widest text-white/40 uppercase mb-1">JURISDICTION</span>
              <span className="block text-sm font-semibold uppercase tracking-wider text-white">JOINT SERVICES JSS</span>
              <span className="block text-[10px] font-mono text-white/50 mt-0.5">51004 / 54802 / 51100</span>
            </div>
            <div className="pr-4">
              <span className="block text-[10px] font-mono tracking-widest text-white/40 uppercase mb-1">SPECIFICATION</span>
              <span className="block text-sm font-semibold uppercase tracking-wider text-white">MIL-SPEC STANDARD</span>
              <span className="block text-[10px] font-mono text-white/50 mt-0.5">W-16878E / I-22129 / C-17</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT FAMILIES ASYMMETRIC GRID */}
      <section className="py-20 border-b border-ink/10 bg-paper">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-4 mb-16">
            <span className="text-[10px] font-mono tracking-widest text-cobalt uppercase font-bold bg-sky/35 px-2 py-1 rounded-xs inline-block">
              CATALOGUE ARCHITECTURE
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-ink uppercase tracking-tight">
              MATCHLESS RANGE. MARKED ADVANTAGE.
            </h2>
            <div className="h-[2px] w-12 bg-swan-red" />
          </div>

          {/* Asymmetric Grid Layout (using Tailwind grid col spans) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {PRODUCT_FAMILIES.map((family, index) => {
              // Alternate grid spans for asymmetric look
              const isLarge = index === 0 || index === 3 || index === 4;
              const gridClass = isLarge ? 'md:col-span-7' : 'md:col-span-5';
              const heightClass = 'h-[300px] md:h-[400px]';

              return (
                <Link
                  href={`/products/${family.id}`}
                  key={family.id}
                  className={`${gridClass} group relative flex flex-col justify-between border border-ink/10 hover:border-cobalt/40 bg-white rounded-xs overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 focus:outline-none`}
                >
                  {/* Technical annotation overlay */}
                  <div className="absolute top-3 left-4 z-20 text-[9px] font-mono text-white/60 bg-ink/40 px-2 py-0.5 uppercase tracking-widest">
                    {family.standardMil} // {family.standardJss}
                  </div>

                  {/* Image container */}
                  <div className={`relative w-full ${heightClass} bg-ink/5`}>
                    <Image
                      src={family.image}
                      alt={family.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 filter saturate-[0.8] contrast-[1.02] group-hover:saturate-[1]"
                      sizes="(max-w-7xl) 100vw, 600px"
                    />
                    {/* Shadow overlay gradient from bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent z-10 opacity-80" />
                  </div>

                  {/* Content details at bottom */}
                  <div className="absolute bottom-0 inset-x-0 p-6 z-20 text-paper space-y-2">
                    <h3 className="font-display font-black text-xl md:text-2xl uppercase tracking-wider text-white">
                      {family.name}
                    </h3>
                    <p className="text-xs text-white/70 max-w-sm line-clamp-2">
                      {family.shortDescription}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-swan-red pt-1 group-hover:text-white transition-colors uppercase tracking-widest">
                      <span>View Specifications</span>
                      <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. TEFLON VS PVC PERFORMANCE SECTION */}
      <section
        id="temp-comparison-section"
        className="py-24 border-b border-ink/10 bg-ink text-paper relative"
      >
        {/* Blueprint line divider accent */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-white/10" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left copy */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] font-mono tracking-widest text-swan-red uppercase font-bold bg-white/5 border border-white/10 px-2 py-1 rounded-xs inline-block">
              MATERIAL ANALYSIS // THERMAL ENVELOPE
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-white leading-tight">
              THE PERMANENT SOLUTION TO OVERLOAD
            </h2>
            <p className="text-sm text-white/70 leading-relaxed font-sans">
              Unlike conventional PVC insulated cables which soften at 70°C and ignite under electrical surge, our PTFE / Teflon wires offer an armored thermal barrier up to 260°C (300°C short duration). PTFE is chemically inert, non-toxic, immune to aging, and self-extinguishing.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4 text-center">
              <div className="bg-white/5 border border-white/10 p-4 rounded-xs">
                <span className="block text-3xl md:text-4xl font-display font-black text-swan-red">
                  {inView ? <CountUp value={260} /> : '0'}°C
                </span>
                <span className="block text-[9px] font-mono uppercase text-white/50 mt-1">PTFE RATED</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-xs">
                <span className="block text-3xl md:text-4xl font-display font-black text-white/60">
                  {inView ? <CountUp value={105} /> : '0'}°C
                </span>
                <span className="block text-[9px] font-mono uppercase text-white/50 mt-1">FRLS PVC</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-xs">
                <span className="block text-3xl md:text-4xl font-display font-black text-white/30">
                  {inView ? <CountUp value={70} /> : '0'}°C
                </span>
                <span className="block text-[9px] font-mono uppercase text-white/50 mt-1">STD PVC</span>
              </div>
            </div>
          </div>

          {/* Right graphics: Temperature scale bar */}
          <div className="lg:col-span-6 space-y-8">
            <h3 className="text-xs font-mono uppercase tracking-widest text-white/40">
              Comparative Thermal Bar (Scroll bound test)
            </h3>
            
            <div className="space-y-6">
              {/* PTFE Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span>PTFE (JAIN POLYMER)</span>
                  <span className="text-swan-red font-bold">260°C</span>
                </div>
                <div className="h-6 w-full bg-white/10 rounded-xs overflow-hidden p-0.5 border border-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: inView ? '100%' : 0 }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="h-full bg-swan-red rounded-xs"
                  />
                </div>
              </div>

              {/* FRLS PVC Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-white/60">
                  <span>FRLS PVC</span>
                  <span>105°C</span>
                </div>
                <div className="h-6 w-full bg-white/10 rounded-xs overflow-hidden p-0.5 border border-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: inView ? '40%' : 0 }}
                    transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
                    className="h-full bg-white/40 rounded-xs"
                  />
                </div>
              </div>

              {/* STD PVC Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-white/40">
                  <span>STANDARD PVC</span>
                  <span>70°C</span>
                </div>
                <div className="h-6 w-full bg-white/10 rounded-xs overflow-hidden p-0.5 border border-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: inView ? '26%' : 0 }}
                    transition={{ duration: 1.5, ease: 'easeOut', delay: 0.4 }}
                    className="h-full bg-white/10 rounded-xs"
                  />
                </div>
              </div>
            </div>
            
            {/* Warning footnote annotation */}
            <div className="text-[10px] font-mono text-white/40 border-t border-white/5 pt-4 flex items-start gap-2">
              <Flame className="w-3.5 h-3.5 text-swan-red shrink-0 mt-0.5" />
              <span>NOTE: OVERCURRENT HEATING TRIGGERS CATASTROPHE IN PVC; PTFE REMAINS IMMUNE.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INDUSTRIES / APPLICATIONS */}
      <section className="py-20 bg-paper border-b border-ink/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <div className="space-y-2 text-center">
            <span className="text-[10px] font-mono tracking-widest text-cobalt uppercase font-bold">
              DEPLOYMENT DOMAINS
            </span>
            <h2 className="font-display font-black text-2xl md:text-3xl text-ink uppercase">
              ENGINEERED FOR EXTREME APPLICATIONS
            </h2>
          </div>
        </div>

        {/* Scrolling list */}
        <div className="relative flex overflow-x-hidden border-y border-ink/10 py-6 bg-white/50">
          <div className="animate-marquee whitespace-nowrap flex gap-10 text-xs font-mono uppercase tracking-widest text-ink/60">
            <span>AEROSPACE & INSTRUMENTATION</span>
            <span className="text-swan-red">•</span>
            <span>ATOMIC ENERGY & REACTOR CONTROLS</span>
            <span className="text-swan-red">•</span>
            <span>SATELLITE GROUND NAVIGATION</span>
            <span className="text-swan-red">•</span>
            <span>RADAR & MICROWAVE TELEMETRY</span>
            <span className="text-swan-red">•</span>
            <span>MILITARY COMMUNICATIVE EXCHANGES</span>
            <span className="text-swan-red">•</span>
            <span>FURNACE & ROLLING MILL LEADS</span>
            <span className="text-swan-red">•</span>
            <span>AIRFIELD LIGHTING CIRCUITS</span>
            <span className="text-swan-red">•</span>
            <span>THERMOCOUPLE SENSOR CABLES</span>
            <span className="text-swan-red">•</span>
          </div>
          {/* Repeat for continuous marquee feel */}
          <div className="absolute top-6 animate-marquee2 whitespace-nowrap flex gap-10 text-xs font-mono uppercase tracking-widest text-ink/60 pl-[100%]">
            <span>AEROSPACE & INSTRUMENTATION</span>
            <span className="text-swan-red">•</span>
            <span>ATOMIC ENERGY & REACTOR CONTROLS</span>
            <span className="text-swan-red">•</span>
            <span>SATELLITE GROUND NAVIGATION</span>
            <span className="text-swan-red">•</span>
            <span>RADAR & MICROWAVE TELEMETRY</span>
            <span className="text-swan-red">•</span>
            <span>MILITARY COMMUNICATIVE EXCHANGES</span>
            <span className="text-swan-red">•</span>
            <span>FURNACE & ROLLING MILL LEADS</span>
            <span className="text-swan-red">•</span>
            <span>AIRFIELD LIGHTING CIRCUITS</span>
            <span className="text-swan-red">•</span>
            <span>THERMOCOUPLE SENSOR CABLES</span>
            <span className="text-swan-red">•</span>
          </div>
        </div>
      </section>

      {/* 6. CLOSING CTA BAND */}
      <section className="py-20 bg-cobalt text-paper text-center relative overflow-hidden">
        {/* Custom vector grids for blueprint feeling */}
        <div className="absolute inset-0 bg-grid-dots opacity-20 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 space-y-8 relative z-10">
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl uppercase leading-tight">
            NEED SPECIFIC CABLE PARAMETERS? <br />
            <span className="text-sky font-black">WE CUSTOM ENGINEER.</span>
          </h2>
          <p className="text-sm text-paper/80 max-w-xl mx-auto leading-relaxed">
            From specialized multicore braiding to precise bore diameters, our R&D team manufactures custom PTFE wires and cables to JSS/MIL specifications.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="bg-swan-red hover:bg-swan-red/90 text-white font-mono text-xs uppercase tracking-widest px-8 py-4 rounded-xs inline-flex items-center gap-3 transition-all group cursor-pointer shadow-md"
            >
              <span>Consult an R&D Specialist</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tailwind animation extensions injected as style block for compatibility */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 30s linear infinite;
          animation-delay: 15s;
        }
      `}</style>
    </div>
  );
}

'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import { useCanvasSequence } from '@/hooks/useCanvasSequence';
import Image from 'next/image';
import SectionTitle from './SectionTitle';
import RevealText from './RevealText';
import { useSmoothScroll } from './SmoothScrollProvider';
import DrivetrainHotspots from './DrivetrainHotspots';

export default function ExperientialScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lenis = useSmoothScroll();

  // Preload updated sequences: Sequence 1 (101 frames) & Sequence 2 (61 frames)
  const seq1 = useImagePreloader({
    path: '/sequence 1',
    frameCount: 101,
  });

  const seq2 = useImagePreloader({
    path: '/sequence 2',
    frameCount: 61,
  });

  // Combine preloaded image streams
  const allImages = React.useMemo(() => {
    if (seq1.loaded && seq2.loaded) {
      return [...seq1.images, ...seq2.images];
    }
    return [];
  }, [seq1.loaded, seq2.loaded, seq1.images, seq2.images]);

  const loaded = seq1.loaded && seq2.loaded;
  const progress = Math.floor((seq1.progress + seq2.progress) / 2);

  // Track scroll progress of the entire 750vh experience
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Render merged sequences dynamically to canvas
  useCanvasSequence(canvasRef, allImages, scrollYProgress, loaded);

  // Jesko Jets style scroll animations with flat start threshold for readability
  const leftHeadingOpacity = useTransform(scrollYProgress, [0, 0.04, 0.15], [1, 1, 0]);
  const leftHeadingX = useTransform(scrollYProgress, [0, 0.15], [0, -80]);

  const rightHeadingOpacity = useTransform(scrollYProgress, [0, 0.04, 0.15], [1, 1, 0]);
  const rightHeadingX = useTransform(scrollYProgress, [0, 0.15], [0, 80]);

  const bottomTextOpacity = useTransform(scrollYProgress, [0, 0.03, 0.12], [1, 1, 0]);
  const bottomTextY = useTransform(scrollYProgress, [0, 0.12], [0, 40]);

  const pillOpacity = useTransform(scrollYProgress, [0, 0.03, 0.12], [1, 1, 0]);
  const pillScale = useTransform(scrollYProgress, [0, 0.12], [1, 0.85]);

  const canvasScale = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.98, 0.96]);

  const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(targetId, {
        offset: 0,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const element = document.querySelector(targetId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <div id="hero" ref={containerRef} className="relative h-[750vh] bg-[#050505] z-10">

      {/* Experiential Loading Overlay */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }}
            className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center gap-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: [0.35, 1, 0.35], scale: 1 }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            >
              <Image
                src="/logo.webp"
                alt="SANY Logo"
                width={120}
                height={40}
                className="h-8 w-auto object-contain brightness-95"
                priority
              />
            </motion.div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[9px] font-mono tracking-[0.45em] text-zinc-600 uppercase">
                Initializing Experience
              </span>
              <span className="text-xs font-mono tracking-widest text-zinc-400 font-light">
                {progress}%
              </span>
            </div>
            <div className="w-32 h-[1px] bg-zinc-900 relative overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-zinc-400"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Canvas Viewport (Continuous background wrapper) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="sticky top-0 h-screen overflow-hidden w-full flex items-center justify-center">
          <motion.canvas
            ref={canvasRef}
            style={{ scale: canvasScale }}
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-auto contrast-[1.1] saturate-[1.1] brightness-[0.6]"
          />
        </div>
      </div>

      {/* Scrolling Content Overlay */}
      {loaded && (
        <div className="relative z-10 w-full">

          {/* SLIDE 1: Hero Block (Jesko Jets Style alignments) */}
          <div className="h-screen w-full relative overflow-hidden">

            {/* Mid-Left Heading */}
            <motion.div
              style={{ opacity: leftHeadingOpacity, x: leftHeadingX }}
              className="absolute left-6 md:left-20 top-[28%] md:top-[30%] select-none z-20 max-w-xl"
            >
              <h1 className="text-[7.5vw] md:text-[6.5vw] font-normal tracking-[-0.04em] leading-[0.85] text-white">
                We are <br />
                <span className="font-extralight text-zinc-300">progress</span>
              </h1>
            </motion.div>

            {/* Mid-Right Heading (Staggered layout) */}
            <motion.div
              style={{ opacity: rightHeadingOpacity, x: rightHeadingX }}
              className="absolute right-6 md:right-20 top-[48%] md:top-[46%] select-none z-20 max-w-xl text-right"
            >
              <h1 className="text-[7.5vw] md:text-[6.5vw] font-normal tracking-[-0.04em] leading-[0.85] text-white">
                We are <br />
                <span className="font-extralight text-zinc-300">innovation</span>
              </h1>
            </motion.div>

            {/* Bottom-Left Panel */}
            <motion.div
              style={{ opacity: bottomTextOpacity, y: bottomTextY }}
              className="absolute bottom-16 left-6 md:left-20 z-20 max-w-xs md:max-w-sm"
            >
              <h3 className="text-xs uppercase tracking-[0.25em] font-medium text-zinc-200">
                Your partner in heavy logistics
              </h3>
              <div className="w-12 h-[1px] bg-white/40 my-3" />
              <p className="text-[11px] text-zinc-300 font-light leading-relaxed tracking-wide">
                Sany India is a trusted heavy construction equipment company offering the widest range of construction machinery in India & South Asia.
              </p>
            </motion.div>

            {/* Bottom-Right Scroll Down Block */}
            <motion.div
              style={{ opacity: bottomTextOpacity, y: bottomTextY }}
              className="absolute bottom-16 right-6 md:right-20 z-20 text-right font-mono text-[9px] tracking-[0.25em] text-zinc-300 uppercase flex flex-col items-end gap-1.5"
            >
              <div className="w-20 h-[1px] bg-white/30 mb-1.5" />
              <div className="flex items-center gap-2">
                <span>Scroll down</span>
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-200 animate-pulse" />
              </div>
              <span className="text-zinc-400">to start the journey</span>
            </motion.div>

            {/* Bottom-Center Pill CTA Button */}
            <motion.div
              style={{ opacity: pillOpacity, scale: pillScale, x: '-50%' }}
              className="absolute bottom-12 left-1/2 z-30"
            >
              <button
                onClick={(e) => handleNavClick(e, '#about')}
                className="px-6 py-2.5 rounded-full bg-white text-black text-[9px] font-mono tracking-[0.2em] uppercase hover:bg-zinc-200 transition-colors duration-300 flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <span>explore solutions</span>
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-[-1px]">
                  <path d="M1 9L9 1M9 1H3M9 1V7" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </motion.div>

          </div>

          {/* Scroll spacer */}
          <div className="h-[100vh]" />

          {/* SLIDE 2: About Us (Overlaid on empty highway frames) */}
          <div id="about" className="min-h-screen py-24 px-6 md:px-12 flex flex-col justify-center relative">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none opacity-30 z-0" />

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative z-10">

              <div className="lg:col-span-3 flex flex-col justify-between">
                <SectionTitle number="01 / OVERVIEW" title="Our History" />
                <div className="hidden lg:block w-[1px] h-20 bg-gradient-to-b from-zinc-800 to-transparent mt-8" />
              </div>

              <div className="lg:col-span-9 flex flex-col gap-12 md:gap-20">
                <div className="flex flex-col gap-6">
                  <h2 className="text-4xl md:text-6xl font-light tracking-tight leading-[1.05] max-w-3xl text-white">
                    <RevealText text="OUR STORY —" className="block text-zinc-300 font-light" />
                    <RevealText text="INTEGRATED MACHINERY EXPERTS" className="block" delay={0.2} />
                  </h2>
                  <motion.p
                    variants={fadeInLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-10%' }}
                    className="text-sm md:text-base text-zinc-200 font-normal leading-relaxed max-w-2xl mt-4 tracking-wide shadow-black/20"
                  >
                    Sany India is a trusted heavy construction equipment company offering the widest range of construction machinery in India & South Asia. In 2012, Sany India invested more than INR 750 crores to develop infrastructure for R&D, Manufacturing, Quality Inspection, Testing, and Service at Pune.
                  </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 pt-12 border-t border-white/5">
                  <motion.div
                    variants={fadeInLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-10%' }}
                    className="flex flex-col gap-3"
                  >
                    <div className="flex items-center gap-3 text-[11px] font-mono tracking-[0.3em] text-zinc-400 font-medium uppercase">
                      <span>01.1</span>
                      <span>Strategic Objective</span>
                    </div>
                    <h4 className="text-lg font-normal tracking-[0.1em] text-white uppercase">Mission</h4>
                    <p className="text-sm md:text-base text-zinc-200 font-normal leading-relaxed tracking-wide mt-1">
                      Through this facility, the company operates in multiple business verticals viz: Earthmoving, Lifting, Foundation, Mining, Ports, Concrete, Roads and Renewable Energy solutions. <strong className="text-zinc-100 font-medium">"QUALITY CHANGES THE WORLD"</strong> ensures we maintain high standards of safety, quality, and extreme industrial output.
                    </p>
                  </motion.div>

                  <motion.div
                    variants={fadeInRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-10%' }}
                    className="flex flex-col gap-3"
                  >
                    <div className="flex items-center gap-3 text-[11px] font-mono tracking-[0.3em] text-zinc-400 font-medium uppercase">
                      <span>01.2</span>
                      <span>Equipment Verticals</span>
                    </div>
                    <h4 className="text-lg font-normal tracking-[0.1em] text-white uppercase">Company Values</h4>
                    <p className="text-sm md:text-base text-zinc-200 font-normal leading-relaxed tracking-wide mt-1">
                      Presently, Sany India offers products like excavators, truck-mounted cranes, all-terrain and rough terrain cranes, crawler cranes, transit mixers, batching plants, boom pumps, trailer pumps, piling rigs, motor graders, pavers, milling machines, compactors, reach stackers, rubber tyred gantry cranes, rail-mounted gantry cranes, mining equipment, and wind turbine generators.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll spacer */}
          <div className="h-[100vh]" />

          {/* SLIDE 3: Highway Drivetrain (Continuing to truck endpoint) */}
          <div id="highway" className="min-h-screen py-24 px-6 md:px-12 flex flex-col justify-center relative">

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative z-10">

              <div className="lg:col-span-3 flex flex-col justify-between">
                <SectionTitle number="02 / SOLUTION" title="EV Drivetrain" />
                <div className="hidden lg:block w-[1px] h-20 bg-gradient-to-b from-zinc-800 to-transparent mt-8" />
              </div>

              <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

                {/* Left Side: Copy and Title */}
                <div className="md:col-span-6 flex flex-col gap-6">
                  <h2 className="text-4xl md:text-6xl font-normal tracking-tight leading-[1.05] text-white uppercase">
                    ENGINEERED FOR <br />
                    <span className="font-light text-zinc-300">THE NEXT AGE</span>
                  </h2>
                  <motion.p
                    variants={fadeInRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-10%' }}
                    className="text-sm md:text-base text-zinc-200 font-normal leading-relaxed tracking-wide"
                  >
                    Precision machinery designed to move industries forward with unmatched durability and performance. Powered by high-efficiency electric motors, zero-emission drivetrains, and smart control units optimized for rugged logistics cycles.
                  </motion.p>

                  {/* Instructional Tip */}
                  <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mt-4">
                    Hover/Tap hotspots to inspect chassis tech
                  </span>
                </div>

                {/* Right Side: Interactive Drivetrain Chassis schematic */}
                <div className="md:col-span-6 flex justify-center relative w-full h-[400px]">
                  <DrivetrainHotspots />
                </div>

              </div>
            </div>
          </div>

          {/* End spacing to finish remaining truck endpoint frames */}
          <div className="h-[100vh]" />

        </div>
      )}
    </div>
  );
}

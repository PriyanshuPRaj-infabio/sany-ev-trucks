'use client';

import React from 'react';
import Image from 'next/image';
import MagneticButton from './MagneticButton';
import { motion } from 'framer-motion';

export default function FooterTruck() {
  return (
    <footer id="contact" className="relative h-screen bg-[#050505] flex flex-col justify-between overflow-hidden">

      {/* Background Video Frame */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
        >
          <source src="/sany-ev-truck.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Atmospheric Contrast Vignettes */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none z-10 radial-glow opacity-40" />

      {/* Spacer */}
      <div className="h-20 z-20 pointer-events-none" />

      {/* Central Interactive Content */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col items-center justify-center text-center z-20 relative gap-8 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-[9px] font-mono tracking-[0.45em] text-zinc-500 uppercase">
            SANY EV Initiative
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-tight text-white uppercase max-w-2xl">
            BUILDING THE FUTURE <br />
            <span className="font-extralight text-zinc-500">OF INDUSTRY</span>
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm font-light leading-relaxed max-w-sm tracking-wide mt-1">
            Explore SANY India's range of smart electric trucks and heavy machinery optimized for emission-free logistics.
          </p>
        </motion.div>

        {/* Call to Action Trigger */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <MagneticButton>
            Explore SANY Solutions
          </MagneticButton>
        </motion.div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="w-full z-20 bg-[#050505]/40 backdrop-blur-xs py-8 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo & Corporate Tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Image
              src="/logo.webp"
              alt="SANY Logo"
              width={75}
              height={24}
              className="h-4.5 w-auto object-contain brightness-90"
            />
            <span className="text-[9px] font-mono tracking-widest text-zinc-600">
              &copy; {new Date().getFullYear()} SANY India. All rights reserved.
            </span>
          </div>

          {/* Corporate Head Office Info */}
          <div className="flex flex-col items-center md:items-start gap-1 text-[9px] font-mono text-zinc-500 tracking-wider">
            <span>HQ: Pune, Maharashtra, India</span>
            <span>Tel: +91 (20) 67060000 | info@sany.in</span>
          </div>

          {/* Policy Links */}
          <div className="flex items-center gap-6 text-[9px] uppercase tracking-widest text-zinc-500">
            <a href="#about" className="hover:text-white transition-colors duration-300">Privacy</a>
            <a href="#about" className="hover:text-white transition-colors duration-300">Terms</a>
            <a href="#about" className="hover:text-white transition-colors duration-300">Legal</a>
          </div>
          {/* POWERED BY */}
          <div className="mt-5 flex justify-end">
            <div className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3 py-2 transition-all duration-300 hover:bg-white/10">

              <a
                href="https://fabulousmedia.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-90 hover:opacity-100 transition-opacity"
                aria-label="FabulousMedia"
              >
                <img
                  src="/fabulous-logo.png"
                  alt="FabulousMedia"
                  className="h-3 w-auto"
                />
              </a>

              <span className="h-3 w-px bg-white/30" />

              <a
                href="https://gocommercially.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-200 hover:opacity-200 transition-opacity"
                aria-label="GoCommercially"
              >
                <img
                  src="/gocommercially-logo.png"
                  alt="GoCommercially"
                  className="h-3 w-auto"
                />
              </a>

            </div>
          </div>

        </div>
      </div>

    </footer>
  );
}

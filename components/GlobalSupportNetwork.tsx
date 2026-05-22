'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import SectionTitle from './SectionTitle';

const networkStats = [
  { value: '1,700+', label: 'OVERSEAS SERVICE CENTERS' },
  { value: '7,000+', label: 'PROFESSIONAL STAFF' },
  { value: '150+', label: 'COUNTRIES & REGIONS' },
  { value: '24/7', label: 'SUPPORT COVERAGE' }
];

const highlights = [
  'Intelligent energy consumption optimization',
  'Remote vehicle health diagnostics & OTA',
  'Visualized global component supply chain',
  'Localized professional training programs'
];

export default function GlobalSupportNetwork() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10%' });

  // Map coordinates onto 800x600 viewBox
  const hotspots = [
    { name: 'North America', x: 160, y: 210 },
    { name: 'South America', x: 256, y: 408 },
    { name: 'Europe', x: 384, y: 168 },
    { name: 'Africa', x: 408, y: 330 },
    { name: 'Asia/India', x: 576, y: 252 },
    { name: 'Australia', x: 680, y: 432 }
  ];

  return (
    <section id="support-network" ref={containerRef} className="py-24 px-6 md:px-12 lg:px-16 bg-[#050505] relative z-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-16 lg:gap-24">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <SectionTitle number="06 / PRESENCE" title="Global Support" />
          <p className="text-zinc-400 text-sm md:text-base font-normal max-w-md tracking-wide leading-relaxed">
            A truly global infrastructure ensuring your fleet remains operational, no matter where the job takes you.
          </p>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* Left Column: Stats Grid & Bullet points */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-8 md:gap-12">
              {networkStats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-2"
                >
                  <span className="text-3xl md:text-4xl font-light text-white tracking-tight">{stat.value}</span>
                  <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">{stat.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Highlights Checklist */}
            <div className="flex flex-col gap-4 border-t border-white/5 pt-8">
              {highlights.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3"
                >
                  <svg className="w-4 h-4 text-[#e60000] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-sm text-zinc-300 font-light tracking-wide">{item}</span>
                </motion.div>
              ))}
            </div>

          </div>

          {/* Right Column: Industrial Map Image with SVG Hotspot Overlays */}
          <div className="lg:col-span-7 w-full flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full aspect-[4/3] max-w-xl bg-white/[0.01] border border-white/5 rounded-xl overflow-hidden backdrop-blur-sm p-4 flex items-center justify-center"
            >
              {/* Background Industrial Map Image */}
              <div className="absolute inset-0 w-full h-full p-6 select-none opacity-80 pointer-events-none">
                <Image
                  src="/world-map-industrial.png"
                  alt="Industrial World Map"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* SVG Overlay for Connections and Hotspots */}
              <svg className="absolute inset-0 w-full h-full z-10 pointer-events-auto" viewBox="0 0 800 600" fill="none">
                {/* Curved dashed connection lines */}
                <path d="M160 210 Q 272 189, 384 168" stroke="url(#red-map-gradient)" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-70" />
                <path d="M384 168 Q 480 210, 576 252" stroke="url(#red-map-gradient)" strokeWidth="1.5" className="opacity-70" />
                <path d="M384 168 Q 396 249, 408 330" stroke="url(#red-map-gradient)" strokeWidth="1" strokeDasharray="2 2" className="opacity-60" />
                <path d="M160 210 Q 284 320, 408 330" stroke="url(#red-map-gradient)" strokeWidth="1" className="opacity-50" />
                <path d="M576 252 Q 628 342, 680 432" stroke="url(#red-map-gradient)" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-70" />

                {/* Hotspot Nodes */}
                {hotspots.map((spot, idx) => (
                  <g key={idx} className="cursor-pointer group">
                    {/* Pulsating ring */}
                    <circle cx={spot.x} cy={spot.y} r="16" fill="#e60000" className="opacity-15 animate-ping" />
                    {/* Outer border */}
                    <circle cx={spot.x} cy={spot.y} r="6" fill="#e60000" className="transition-all duration-300 group-hover:scale-125" />
                    {/* Inner core */}
                    <circle cx={spot.x} cy={spot.y} r="2" fill="#fff" />
                  </g>
                ))}

                {/* Definitions */}
                <defs>
                  <linearGradient id="red-map-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e60000" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#e60000" stopOpacity="1" />
                    <stop offset="100%" stopColor="#800000" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Styled floating details box */}
              <div className="absolute bottom-6 left-6 p-4 bg-black/75 border border-[#e60000]/25 rounded-lg backdrop-blur-md flex flex-col gap-1 shadow-lg z-20">
                <span className="text-[9px] font-mono tracking-widest text-[#e60000] uppercase font-bold">Active Nodes</span>
                <span className="text-sm font-light text-white">Global Grid Connected</span>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}

'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionTitle from './SectionTitle';

export default function RigorousTesting() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10%' });

  const mainStats = [
    {
      value: '2M+ km',
      label: 'TOTAL TEST DISTANCE',
      icon: (
        <svg className="w-5 h-5 text-[#e60000]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )
    },
    {
      value: '150+',
      label: 'COMPONENT LEVEL TESTS',
      icon: (
        <svg className="w-5 h-5 text-[#e60000]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      )
    },
    {
      value: '700+',
      label: 'DAYS OF VERIFICATION',
      icon: (
        <svg className="w-5 h-5 text-[#e60000]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    }
  ];

  const cards = [
    {
      title: 'COLD WEATHER',
      value: '-35°C',
      desc: 'Verified battery stability and starting performance in sub-arctic conditions.',
      location: 'Location: Heihe, China',
      themeClass: 'text-sky-400',
      icon: (
        <svg className="w-6 h-6 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2v20M17 5L7 19M19 17L5 7" />
          <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.2" />
        </svg>
      )
    },
    {
      title: 'EXTREME HEAT',
      value: '45.6°C',
      desc: 'Thermal management system stress-tested in desert heat and direct sun exposure.',
      location: 'Location: Turpan, China',
      themeClass: 'text-orange-500',
      icon: (
        <svg className="w-6 h-6 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      )
    },
    {
      title: 'HIGH ALTITUDE',
      value: '5,500m',
      desc: 'Full power output and braking efficiency validated at over 5,000 meters above sea level.',
      location: 'Location: Himalayas',
      themeClass: 'text-[#e60000]',
      icon: (
        <svg className="w-6 h-6 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 20h18L12 4z" />
          <path d="M12 4l-4 8h8z" />
        </svg>
      )
    }
  ];

  const benchmarks = [
    { value: '480h', title: 'Salt Spray Corrosion', desc: 'Anti-corrosion testing for coastal and mining operations.' },
    { value: '10M Cycles', title: 'Biaxial Fatigue', desc: 'Leaf spring and chassis frame structural integrity.' },
    { value: '50,000 Ops', title: 'Hydraulic Durability', desc: 'Steering and suspension system cycle verification.' },
    { value: 'IP68+', title: 'Dust Sealing', desc: 'Protection against fine particulate ingress in mining.' }
  ];

  return (
    <section id="rigorous-testing" ref={containerRef} className="py-24 px-6 md:px-12 lg:px-16 bg-[#050505] relative z-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-16 lg:gap-24">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <SectionTitle number="04 / QUALITY" title="Rigorous Testing" />
          <p className="text-zinc-400 text-sm md:text-base font-normal max-w-md tracking-wide leading-relaxed">
            Engineered for reliability. Validated across 2 million kilometers of extreme real-world trials.
          </p>
        </div>

        {/* 2M+ km, 150+ components, 700+ Days stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {mainStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center p-8 bg-white/[0.02] border border-white/5 rounded-xl backdrop-blur-sm"
            >
              <div className="mb-4 p-3 bg-white/5 rounded-full">{stat.icon}</div>
              <span className="text-4xl md:text-5xl font-light text-white tracking-tight mb-2">{stat.value}</span>
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Cold, Heat, Altitude cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col bg-white/5 border border-white/10 rounded-xl p-8 hover:border-white/20 transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-1">{card.title}</h4>
                  <span className={`text-3xl font-light tracking-tight ${card.themeClass}`}>{card.value}</span>
                </div>
                <div className="p-2 bg-white/5 rounded-lg">{card.icon}</div>
              </div>
              <p className="text-sm text-zinc-300 font-light leading-relaxed mb-6 flex-grow">{card.desc}</p>
              <span className="text-[11px] font-mono tracking-wider text-[#e60000]">{card.location}</span>
            </motion.div>
          ))}
        </div>

        {/* Durability Benchmarks */}
        <div className="flex flex-col gap-10 pt-8 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-[3px] h-5 bg-[#e60000]" />
            <h3 className="text-lg font-light tracking-wider text-white uppercase">Durability Benchmarks</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benchmarks.map((benchmark, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-2"
              >
                <span className="text-2xl font-light text-[#e60000] tracking-tight">{benchmark.value}</span>
                <span className="text-sm font-normal text-white uppercase tracking-wide">{benchmark.title}</span>
                <p className="text-xs text-zinc-500 font-light leading-relaxed mt-1">{benchmark.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

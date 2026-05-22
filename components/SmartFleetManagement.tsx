'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionTitle from './SectionTitle';

const fleetFeatures = [
  {
    title: 'Vehicle Diagnostics',
    desc: 'Real-time health monitoring and predictive maintenance alerts.',
    icon: (
      <svg className="w-5 h-5 text-[#e60000]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    )
  },
  {
    title: 'Energy Monitoring',
    desc: 'Track battery status, consumption patterns, and charging efficiency.',
    icon: (
      <svg className="w-5 h-5 text-[#e60000]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
        <line x1="22" y1="11" x2="22" y2="13" />
      </svg>
    )
  },
  {
    title: 'Route Optimization',
    desc: 'AI-powered route planning to maximize range and efficiency.',
    icon: (
      <svg className="w-5 h-5 text-[#e60000]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    )
  },
  {
    title: 'Remote Fleet Management',
    desc: 'Manage your entire fleet from a single intelligent dashboard.',
    icon: (
      <svg className="w-5 h-5 text-[#e60000]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    )
  },
  {
    title: 'Intelligent Protection',
    desc: '7 HD cameras, millimeter-wave radar, and 360° monitoring with FCW, LDW, and BSD alerts.',
    icon: (
      <svg className="w-5 h-5 text-[#e60000]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
  }
];

const chartBars = [45, 60, 80, 55, 65, 75, 90, 85];

export default function SmartFleetManagement() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10%' });
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section id="fleet-management" ref={containerRef} className="py-24 px-6 md:px-12 lg:px-16 bg-[#050505] relative z-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-16 lg:gap-24">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <SectionTitle number="05 / INTELLIGENCE" title="Smart Fleet" />
          <p className="text-zinc-400 text-sm md:text-base font-normal max-w-md tracking-wide leading-relaxed">
            A comprehensive digital platform that puts you in control of every vehicle, every route, every watt.
          </p>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* Left Column: Interactive Feature List */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {fleetFeatures.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -25 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActiveFeature(idx)}
                className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer flex gap-4 items-start ${
                  activeFeature === idx
                    ? 'bg-white/5 border-white/20'
                    : 'bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/5'
                }`}
              >
                <div className={`p-2 rounded-lg transition-colors ${
                  activeFeature === idx ? 'bg-[#E60000]/10 text-[#E60000]' : 'bg-white/5 text-zinc-400'
                }`}>
                  {feat.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-base font-normal text-white uppercase tracking-wide">{feat.title}</h4>
                  <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Simulated Live Dashboard Widget */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-xl bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden backdrop-blur-md shadow-2xl p-6 md:p-8"
            >
              {/* Widget Header */}
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-[#e60000] rounded-full animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-300">Fleet Dashboard</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-zinc-700" />
                  <div className="w-2 h-2 rounded-full bg-zinc-700" />
                  <div className="w-2 h-2 rounded-full bg-zinc-700" />
                </div>
              </div>

              {/* Specs Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">Active Vehicles</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-light text-white">24</span>
                    <span className="text-xs text-[#e60000] font-mono">+3</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">Avg Efficiency</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-light text-white">94%</span>
                    <span className="text-xs text-[#e60000] font-mono">+2%</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">Total Distance</span>
                  <span className="text-2xl font-light text-white">12.4K <span className="text-xs font-light text-zinc-400">km</span></span>
                </div>
              </div>

              {/* Bar Chart Mock */}
              <div className="flex flex-col gap-2 mb-8">
                <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">Energy Consumption (kW)</span>
                <div className="h-32 flex items-end justify-between gap-1 pt-4 border-b border-white/5">
                  {chartBars.map((val, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ height: 0 }}
                      animate={isInView ? { height: `${val}%` } : {}}
                      transition={{ duration: 1, delay: idx * 0.05, ease: 'easeOut' }}
                      className="w-full bg-gradient-to-t from-[#e60000]/20 to-[#e60000] rounded-t-sm hover:opacity-80 transition-opacity"
                    />
                  ))}
                </div>
              </div>

              {/* Vehicle Status Entries */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center p-3 bg-white/5 border border-white/5 rounded-lg">
                  <span className="text-xs font-mono text-zinc-300">EV-001</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-wider text-[#e60000] font-mono bg-[#e60000]/10 px-2 py-0.5 rounded">Active</span>
                    <span className="text-xs text-white font-light">78%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 border border-white/5 rounded-lg">
                  <span className="text-xs font-mono text-zinc-300">EV-002</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-wider text-orange-400 font-mono bg-orange-400/10 px-2 py-0.5 rounded">Charging</span>
                    <span className="text-xs text-white font-light">45%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 border border-white/5 rounded-lg">
                  <span className="text-xs font-mono text-zinc-300">EV-003</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-wider text-[#e60000] font-mono bg-[#e60000]/10 px-2 py-0.5 rounded">Active</span>
                    <span className="text-xs text-white font-light">92%</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}

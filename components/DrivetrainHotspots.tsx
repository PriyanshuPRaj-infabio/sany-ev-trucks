'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Hotspot {
  id: number;
  x: number; // percentage
  y: number; // percentage
  title: string;
  desc: string;
  detail: string;
}

const hotspotsData: Hotspot[] = [
  {
    id: 1,
    x: 50,
    y: 18,
    title: 'Wired Shift Control System',
    desc: 'Transition from mechanical operation to electronic signals.',
    detail: 'Provides ultra-fast gear shift response, comfortable gear matching, and extremely low energy consumption.'
  },
  {
    id: 2,
    x: 35,
    y: 28,
    title: 'Wired Control Steering System',
    desc: 'Three-Mode Power-Assisted Steering.',
    detail: 'Low-speed smoothness for easy maneuvering, high-speed stability, and fine-tuned steering auto-centering.'
  },
  {
    id: 3,
    x: 50,
    y: 54,
    title: 'YUN DU Wired Control Chassis & Battery',
    desc: 'High-density 85kWh / 106kWh battery pack layout.',
    detail: 'Offers compact chassis arrangement, freeing up space and lowering center of gravity for maximum load safety.'
  },
  {
    id: 4,
    x: 50,
    y: 84,
    title: 'Wired Control Drive System',
    desc: 'Highly integrated transmission system.',
    detail: 'Rear-drive motor system that eliminates mechanical drive shafts, reduces weight, and optimizes vehicle power transmission.'
  }
];

export default function DrivetrainHotspots() {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  return (
    <div className="relative w-full h-full max-w-sm flex items-center justify-center bg-white/[0.01] border border-white/5 rounded-2xl p-4 backdrop-blur-sm overflow-hidden select-none">
      
      {/* Detailed Technical SVG Chassis schematic */}
      <svg className="w-full h-full text-zinc-700" viewBox="0 0 300 500" fill="none">
        
        {/* Outer Grid Lines */}
        <line x1="50" y1="0" x2="50" y2="500" stroke="#e60000" strokeWidth="0.5" className="opacity-10" />
        <line x1="250" y1="0" x2="250" y2="500" stroke="#e60000" strokeWidth="0.5" className="opacity-10" />
        <line x1="150" y1="0" x2="150" y2="500" stroke="#e60000" strokeWidth="0.5" className="opacity-10" />

        {/* --- TRUCK CABIN SILHOUETTE (Top Down) --- */}
        <path 
          d="M 85 140 L 85 60 A 30 30 0 0 1 115 30 L 185 30 A 30 30 0 0 1 215 60 L 215 140 Z" 
          stroke="#e60000" 
          strokeWidth="1.5" 
          fill="rgba(230, 0, 0, 0.03)"
          className="opacity-40"
        />
        {/* Windshield */}
        <path d="M 95 65 L 205 65 L 195 45 L 105 45 Z" fill="rgba(255, 255, 255, 0.05)" stroke="currentColor" strokeWidth="1" className="opacity-30" />
        {/* Mirrors */}
        <rect x="73" y="70" width="10" height="25" rx="2" fill="currentColor" className="opacity-40" />
        <rect x="217" y="70" width="10" height="25" rx="2" fill="currentColor" className="opacity-40" />

        {/* --- STEEL FRAME / CHASSIS RAILS --- */}
        {/* Left rail */}
        <rect x="98" y="30" width="8" height="440" rx="1" fill="#e60000" className="opacity-25" />
        {/* Right rail */}
        <rect x="194" y="30" width="8" height="440" rx="1" fill="#e60000" className="opacity-25" />
        
        {/* Crossmembers (chassis supports) */}
        <rect x="106" y="90" width="88" height="5" fill="currentColor" className="opacity-30" />
        <rect x="106" y="160" width="88" height="5" fill="currentColor" className="opacity-30" />
        <rect x="106" y="240" width="88" height="5" fill="currentColor" className="opacity-30" />
        <rect x="106" y="320" width="88" height="5" fill="currentColor" className="opacity-30" />
        <rect x="106" y="400" width="88" height="5" fill="currentColor" className="opacity-30" />

        {/* --- FRONT AXLE & STEERING SYSTEM --- */}
        {/* Axle bar */}
        <line x1="75" y1="110" x2="225" y2="110" stroke="currentColor" strokeWidth="4" className="opacity-40" />
        {/* Steering linkages */}
        <line x1="90" y1="118" x2="210" y2="118" stroke="#e60000" strokeWidth="1.5" className="opacity-30" />
        <circle cx="150" cy="118" r="4" fill="#e60000" className="opacity-50" />
        
        {/* Front Tires (Detailed with tread marks) */}
        <g className="opacity-50">
          {/* Left tire */}
          <rect x="58" y="85" width="22" height="50" rx="4" fill="#18181b" stroke="currentColor" strokeWidth="1" />
          <path d="M 58 95 L 80 95 M 58 105 L 80 105 M 58 115 L 80 115 M 58 125 L 80 125" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          {/* Right tire */}
          <rect x="220" y="85" width="22" height="50" rx="4" fill="#18181b" stroke="currentColor" strokeWidth="1" />
          <path d="M 220 95 L 242 95 M 220 105 L 242 105 M 220 115 L 242 115 M 220 125 L 242 125" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        </g>

        {/* --- BATTERY MODULES (Central Chassis) --- */}
        {/* Two large packs flanking the frame */}
        <g className="opacity-75">
          {/* Left Pack */}
          <rect x="110" y="180" width="36" height="150" rx="4" fill="url(#battery-red-glow)" stroke="#e60000" strokeWidth="1" />
          {/* Right Pack */}
          <rect x="154" y="180" width="36" height="150" rx="4" fill="url(#battery-red-glow)" stroke="#e60000" strokeWidth="1" />
          
          {/* Internal Battery cells/details */}
          <line x1="116" y1="195" x2="140" y2="195" stroke="#e60000" strokeWidth="1" className="opacity-40" />
          <line x1="116" y1="225" x2="140" y2="225" stroke="#e60000" strokeWidth="1" className="opacity-40" />
          <line x1="116" y1="255" x2="140" y2="255" stroke="#e60000" strokeWidth="1" className="opacity-40" />
          <line x1="116" y1="285" x2="140" y2="285" stroke="#e60000" strokeWidth="1" className="opacity-40" />
          <line x1="116" y1="315" x2="140" y2="315" stroke="#e60000" strokeWidth="1" className="opacity-40" />

          <line x1="160" y1="195" x2="184" y2="195" stroke="#e60000" strokeWidth="1" className="opacity-40" />
          <line x1="160" y1="225" x2="184" y2="225" stroke="#e60000" strokeWidth="1" className="opacity-40" />
          <line x1="160" y1="255" x2="184" y2="255" stroke="#e60000" strokeWidth="1" className="opacity-40" />
          <line x1="160" y1="285" x2="184" y2="285" stroke="#e60000" strokeWidth="1" className="opacity-40" />
          <line x1="160" y1="315" x2="184" y2="315" stroke="#e60000" strokeWidth="1" className="opacity-40" />
        </g>

        {/* --- HIGH-VOLTAGE WIRING (Visual Path) --- */}
        <path d="M 128 180 Q 128 140, 150 140" stroke="#e60000" strokeWidth="2.5" fill="none" className="opacity-70" />
        <path d="M 172 180 Q 172 140, 150 140" stroke="#e60000" strokeWidth="2.5" fill="none" className="opacity-70" />
        <path d="M 150 140 L 150 120" stroke="#e60000" strokeWidth="2.5" fill="none" className="opacity-70" />
        
        {/* Cables running to rear axle */}
        <path d="M 128 330 Q 128 385, 140 385" stroke="#e60000" strokeWidth="2.5" fill="none" className="opacity-70" />
        <path d="M 172 330 Q 172 385, 160 385" stroke="#e60000" strokeWidth="2.5" fill="none" className="opacity-70" />

        {/* --- INTEGRATED ELECTRIC DRIVE AXLE & REAR MOTOR --- */}
        {/* Rear Axle Bar */}
        <line x1="70" y1="415" x2="230" y2="415" stroke="currentColor" strokeWidth="5" className="opacity-50" />
        {/* Integrated Drive Motor block */}
        <rect x="132" y="395" width="36" height="40" rx="4" fill="url(#rear-motor-gradient)" stroke="#e60000" strokeWidth="1" />
        {/* Cooling ribs on motor */}
        <line x1="138" y1="405" x2="162" y2="405" stroke="currentColor" strokeWidth="1" className="opacity-40" />
        <line x1="138" y1="415" x2="162" y2="415" stroke="currentColor" strokeWidth="1" className="opacity-40" />
        <line x1="138" y1="425" x2="162" y2="425" stroke="currentColor" strokeWidth="1" className="opacity-40" />

        {/* Dual Rear Tires */}
        <g className="opacity-50">
          {/* Left tires */}
          <rect x="44" y="385" width="18" height="60" rx="4" fill="#18181b" stroke="currentColor" strokeWidth="1" />
          <rect x="64" y="385" width="18" height="60" rx="4" fill="#18181b" stroke="currentColor" strokeWidth="1" />
          {/* Right tires */}
          <rect x="218" y="385" width="18" height="60" rx="4" fill="#18181b" stroke="currentColor" strokeWidth="1" />
          <rect x="238" y="385" width="18" height="60" rx="4" fill="#18181b" stroke="currentColor" strokeWidth="1" />
        </g>

        {/* --- GRADIENT DEFINITIONS --- */}
        <defs>
          <linearGradient id="battery-red-glow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e60000" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#e60000" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#e60000" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="rear-motor-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e60000" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#800000" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>

      {/* Hotspots clickable overlays */}
      {hotspotsData.map((spot) => (
        <div
          key={spot.id}
          style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
          onMouseEnter={() => setActiveHotspot(spot.id)}
          onMouseLeave={() => setActiveHotspot(null)}
          onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
        >
          {/* Pulsating ring */}
          <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
            activeHotspot === spot.id 
              ? 'border-[#e60000] bg-[#e60000]/25 scale-110 shadow-[0_0_15px_rgba(230,0,0,0.6)]' 
              : 'border-[#e60000]/50 bg-[#e60000]/10 hover:border-[#e60000] hover:bg-[#e60000]/20'
          }`}>
            {/* Center dot */}
            <div className="w-2.5 h-2.5 rounded-full bg-[#e60000] shadow-[0_0_8px_rgba(230,0,0,0.8)]" />
          </div>
        </div>
      ))}

      {/* Hotspot Detailed Tooltip Popup */}
      <AnimatePresence>
        {activeHotspot !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-4 left-4 right-4 p-5 bg-black/90 border border-[#e60000]/20 rounded-xl backdrop-blur-md z-30 pointer-events-none shadow-2xl"
          >
            <span className="text-[9px] font-mono tracking-widest text-[#e60000] uppercase font-bold">
              Chassis Subsystem {activeHotspot}
            </span>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mt-1">
              {hotspotsData.find((h) => h.id === activeHotspot)?.title}
            </h4>
            <p className="text-xs text-zinc-300 font-light mt-1.5 leading-relaxed">
              {hotspotsData.find((h) => h.id === activeHotspot)?.desc}
            </p>
            <p className="text-[10px] text-zinc-500 font-light mt-2 leading-relaxed border-t border-white/5 pt-2">
              {hotspotsData.find((h) => h.id === activeHotspot)?.detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

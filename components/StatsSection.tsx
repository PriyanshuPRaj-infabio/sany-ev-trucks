'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionTitle from './SectionTitle';

export default function StatsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10%' });

  const stats = [
    {
      value: '750+ Crores',
      label: 'Crores Invested',
      desc: 'Infrastructure investment in Pune for R&D, Manufacturing, and testing.',
    },
    {
      value: '8+ Verticals',
      label: 'Verticals',
      desc: 'Sectors of operation including Mining, Port machinery, and Concrete Solutions.',
    },
    {
      value: 'Pan India',
      label: 'Network',
      desc: 'Full distribution, assembly, and service support across South Asia.',
    },
    {
      value: '98.6%',
      label: 'Fleet Uptime',
      desc: 'Engineered to ensure near-continuous operation in port and heavy transport setups.',
    },
    {
      value: '240 kW',
      label: 'Fast Charging',
      desc: 'High-power DC charging support to replenish battery in under 35 minutes.',
    },
    {
      value: '150,000+',
      label: 'Global EV Fleet',
      desc: 'Active commercial electric vehicles globally validating our drivetrain technology.',
    },
    {
      value: '-30% TCO',
      label: 'TCO Savings',
      desc: 'Substantial reduction in maintenance and fuel expenses compared to diesel equivalents.',
    },
    {
      value: 'Extreme',
      label: 'Engineering',
      desc: 'High-performance standards built for heavy-duty industrial outputs.',
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section id="stats" ref={containerRef} className="relative min-h-[70vh] bg-[#050505] py-24 md:py-36 px-6 md:px-12 flex flex-col justify-center border-t border-white/5">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/5">
          <SectionTitle number="03 / PERFORMANCE" title="Industrial Metrics" />
          <p className="text-zinc-500 text-xs md:text-sm font-light max-w-sm tracking-wide leading-relaxed">
            Measuring SANY India's manufacturing investment, operational capacity, and market footprint.
          </p>
        </div>

        {/* Stats Column Grid (8 items stacking to 2 rows of 4 items on lg displays) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 pt-6"
        >
          {stats.map((stat, idx) => (
            <motion.div key={idx} variants={itemVariants} className="flex flex-col gap-3 group">
              {/* Metric Number */}
              <div className="text-4xl md:text-5xl font-light tracking-tight text-white group-hover:text-zinc-300 transition-colors duration-300">
                {stat.value}
              </div>
              
              {/* Interactive Line Separator */}
              <div className="h-[1px] bg-zinc-800 w-12 group-hover:w-full transition-all duration-500 ease-out" />

              {/* Label details */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-300">
                  {stat.label}
                </span>
                <p className="text-xs text-zinc-500 font-light leading-relaxed tracking-wide mt-1">
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

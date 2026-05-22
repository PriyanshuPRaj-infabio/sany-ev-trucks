'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionTitle from './SectionTitle';

interface Review {
  id: number;
  company: string;
  location: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
}

const reviewsData: Review[] = [
  {
    id: 1,
    company: 'Aries Logistics',
    location: 'Germany',
    quote: "The YUN DU wired control chassis has completely changed our urban delivery cycles. We've logged over 150,000 km with zero drivetrain issues, and the regenerative braking has extended our brake pad life by 3x.",
    author: 'Markus Becker',
    role: 'Fleet Director',
    rating: 5
  },
  {
    id: 2,
    company: 'Metro Port Operators',
    location: 'India',
    quote: "With SANY's 106kWh battery configuration, our port transfer trucks comfortably run three consecutive shifts without requiring mid-shift charging. Zero downtime, zero local emissions.",
    author: 'Rohan Sen',
    role: 'Operations Lead',
    rating: 5
  },
  {
    id: 3,
    company: 'Apex Resources',
    location: 'Australia',
    quote: "Operating in 45°C mining dust was our main concern. SANY's IP68+ dust sealing and active battery cooling systems kept our fleet operating at peak efficiency under brutal Australian heat.",
    author: 'David Vance',
    role: 'Maintenance Director',
    rating: 5
  },
  {
    id: 4,
    company: 'Nordic Freight',
    location: 'Sweden',
    quote: "The sub-zero temperature claims are 100% accurate. Even at -30°C in Swedish winters, we see less than 8% battery range degradation. SANY's thermal management is unmatched.",
    author: 'Freja Lindstrom',
    role: 'Logistics Supervisor',
    rating: 5
  }
];

export default function SuccessStories() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hook Framer Motion scroll progress to the vertical scroll of containerRef
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Transform vertical scroll progress into horizontal card translation
  const x = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '-58%']);

  // Bind the progress bar width directly to scroll progress
  const progressBarWidth = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  return (
    <div ref={containerRef} className="relative h-[250vh] bg-[#050505] border-t border-white/5">
      
      {/* Sticky Screen-height Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden z-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto w-full flex flex-col gap-12">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
            <SectionTitle number="07 / TESTIMONIALS" title="Success Stories" />
            <p className="text-zinc-400 text-sm md:text-base font-normal max-w-md tracking-wide leading-relaxed">
              From urban freight hubs to remote mine sites, SANY EV trucks power global logistics with absolute reliability.
            </p>
          </div>

          {/* Horizontal reviews track animated by vertical scroll */}
          <div className="relative w-full overflow-visible py-4">
            <motion.div 
              style={{ x }} 
              className="flex gap-6 w-max pl-2"
            >
              {reviewsData.map((review) => (
                <div 
                  key={review.id}
                  className="flex-shrink-0 w-[300px] sm:w-[380px] md:w-[440px] bg-white/[0.01] border border-white/5 hover:border-[#e60000]/30 rounded-xl p-6 md:p-8 backdrop-blur-sm flex flex-col justify-between transition-all duration-500 group select-none"
                >
                  <div>
                    {/* Rating Stars (Sany Red) */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(review.rating)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-[#e60000] fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>

                    {/* Testimonial Quote */}
                    <p className="text-sm md:text-base text-zinc-200 font-light leading-relaxed tracking-wide mb-8 italic">
                      "{review.quote}"
                    </p>
                  </div>

                  {/* Author & Client Info */}
                  <div className="flex justify-between items-end border-t border-white/5 pt-6 mt-auto">
                    <div className="flex flex-col">
                      <span className="text-xs md:text-sm font-medium text-white uppercase tracking-wider">
                        {review.author}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-0.5">
                        {review.role}
                      </span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] font-mono text-[#e60000] uppercase tracking-widest font-semibold">
                        {review.company}
                      </span>
                      <span className="text-[9px] text-zinc-500 font-light uppercase tracking-widest mt-0.5">
                        {review.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Progress scroll indicator */}
          <div className="w-full flex items-center justify-between mt-4">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Scroll progress</span>
              <div className="w-40 md:w-64 h-[2px] bg-zinc-950 rounded-full overflow-hidden relative">
                <motion.div 
                  className="absolute top-0 bottom-0 left-0 bg-[#e60000]"
                  style={{ width: progressBarWidth }}
                />
              </div>
            </div>

            {/* Scroll Indicator helper text */}
            <span className="text-[9px] font-mono tracking-widest text-[#e60000] uppercase animate-pulse">
              Scroll down to slide
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({ children, className = '', onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);

  // Framer Motion values for tracking cursor offset
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring configuration for physical inertia (elastic snap-back)
  const springOptions = { stiffness: 150, damping: 15, mass: 0.6 };
  const smoothX = useSpring(x, springOptions);
  const smoothY = useSpring(y, springOptions);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    // Apply offset factor (allow pulling up to 40% of the distance)
    x.set(deltaX * 0.4);
    y.set(deltaY * 0.4);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        x: smoothX,
        y: smoothY,
      }}
      className={`relative px-8 py-4 bg-transparent border border-white/20 text-white text-xs uppercase tracking-[0.25em] font-light rounded-none overflow-hidden cursor-pointer transition-all duration-300 hover:border-white hover:text-black flex items-center justify-center ${className}`}
    >
      {/* Sliding background hover transition */}
      <span 
        className={`absolute inset-0 bg-white transition-transform duration-500 origin-bottom scale-y-0 -z-10 ${
          hovered ? 'scale-y-100' : ''
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)'
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

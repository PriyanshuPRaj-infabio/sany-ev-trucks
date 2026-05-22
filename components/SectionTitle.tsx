'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionTitleProps {
  number: string;
  title: string;
  className?: string;
}

export default function SectionTitle({ number, title, className = '' }: SectionTitleProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <div ref={ref} className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.35em] text-zinc-300 uppercase">
        <span>{number}</span>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: 30 } : { width: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="h-[1px] bg-white/20"
        />
      </div>
      <h3 className="text-xs uppercase tracking-[0.25em] font-medium text-zinc-200">
        {title}
      </h3>
    </div>
  );
}

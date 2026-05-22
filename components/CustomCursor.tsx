'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'view'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorSpringX = useSpring(cursorX, springConfig);
  const cursorSpringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device supports fine hover interactions (i.e. mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsMobile(!mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(!e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if target or parent is a link, button, accordion head, or has data-cursor
      const interactive = target.closest('a, button, [role="button"], [data-cursor]');
      
      if (interactive) {
        const cursorData = interactive.getAttribute('data-cursor');
        if (cursorData === 'view') {
          setCursorType('view');
        } else {
          setCursorType('hover');
        }

        // Magnetic effect logic
        if (interactive.getAttribute('data-cursor') === 'magnetic') {
          const rect = interactive.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          // Calculate distance to center
          const deltaX = e.clientX - centerX;
          const deltaY = e.clientY - centerY;
          
          // Pull the element slightly towards mouse (magnetic pull)
          (interactive as HTMLElement).style.transform = `translate3d(${deltaX * 0.25}px, ${deltaY * 0.25}px, 0)`;
          (interactive as HTMLElement).style.transition = 'none';
        }
      } else {
        setCursorType('default');
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], [data-cursor]');
      
      if (interactive && interactive.getAttribute('data-cursor') === 'magnetic') {
        // Reset element transform smoothly on leave
        (interactive as HTMLElement).style.transform = 'translate3d(0, 0, 0)';
        (interactive as HTMLElement).style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isMobile, isVisible, cursorX, cursorY]);

  if (isMobile || !isVisible) return null;

  const size = cursorType === 'hover' ? 50 : cursorType === 'view' ? 70 : 12;

  return (
    <motion.div
      style={{
        left: cursorSpringX,
        top: cursorSpringY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: size,
        height: size,
        backgroundColor: cursorType === 'view' ? 'rgba(230, 0, 0, 0.1)' : 'rgba(230, 0, 0, 0)',
        borderColor: cursorType === 'hover' ? 'rgba(230, 0, 0, 0.8)' : cursorType === 'view' ? 'rgba(230, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.4)',
        borderWidth: cursorType === 'view' ? 1.5 : 1,
      }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed pointer-events-none z-[9999] rounded-full border flex items-center justify-center mix-blend-difference"
    >
      {cursorType === 'view' && (
        <span className="text-[10px] font-mono tracking-widest text-[#e60000] font-bold uppercase select-none">
          View
        </span>
      )}
    </motion.div>
  );
}

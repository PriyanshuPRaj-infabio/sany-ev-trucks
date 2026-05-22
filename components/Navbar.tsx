'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useSmoothScroll } from './SmoothScrollProvider';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const lenis = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(targetId, {
        offset: 0,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const element = document.querySelector(targetId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'About', target: '#about' },
    { name: 'Solutions', target: '#highway' },
    { name: 'Stats', target: '#stats' },
    { name: 'Contact', target: '#contact' },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#050505]/85 backdrop-blur-md border-b border-white/5 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="w-full px-6 md:px-12 lg:px-16 flex items-center justify-between relative">
        
        {/* Left End: SANY Logo */}
        <div className="flex items-center">
          <a 
            href="#hero" 
            onClick={(e) => handleNavClick(e, '#hero')} 
            className="relative flex items-center cursor-pointer"
            data-cursor="magnetic"
          >
            <Image
              src="/logo.webp"
              alt="SANY Logo"
              width={75}
              height={22}
              className="h-5 w-auto object-contain brightness-95 hover:brightness-100 transition-all"
              priority
            />
          </a>
        </div>

        {/* Center: Navigation Options */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.target}
              onClick={(e) => handleNavClick(e, link.target)}
              className="text-[10px] uppercase tracking-[0.25em] font-medium text-zinc-300 hover:text-white transition-colors duration-300 relative py-1"
              data-cursor="magnetic"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right End: Contact Info */}
        <div className="flex items-center gap-4 md:gap-6 text-[10px] font-mono tracking-widest text-zinc-300">
          <a 
            href="tel:+912067060000" 
            className="hover:text-white transition-colors duration-300"
            data-cursor="magnetic"
          >
            +91 20 67060000
          </a>
          <span className="hidden sm:inline text-white/20">|</span>
          <a 
            href="mailto:info@sany.in" 
            className="hidden sm:inline hover:text-white transition-colors duration-300"
            data-cursor="magnetic"
          >
            info@sany.in
          </a>
        </div>

      </div>
    </motion.header>
  );
}

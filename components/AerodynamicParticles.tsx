'use client';

import React, { useEffect, useRef } from 'react';

interface StreamLine {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  thickness: number;
  targetY: number;
}

export default function AerodynamicParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track scroll velocity
    let lastScrollTop = 0;
    let scrollVelocity = 0;
    let targetSpeedMultiplier = 1;
    let currentSpeedMultiplier = 1;

    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      const diff = Math.abs(st - lastScrollTop);
      scrollVelocity = Math.min(diff * 0.4, 15); // cap speed boost
      lastScrollTop = st <= 0 ? 0 : st;
      targetSpeedMultiplier = 1 + scrollVelocity;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initialize wind streams
    const streams: StreamLine[] = [];
    const maxStreams = 45;

    const createStream = (initFarLeft = false): StreamLine => {
      const startY = Math.random() * height;
      return {
        x: initFarLeft ? Math.random() * width : -200 - Math.random() * 200,
        y: startY,
        length: 150 + Math.random() * 300,
        speed: 2 + Math.random() * 5,
        opacity: 0.05 + Math.random() * 0.12,
        thickness: 0.5 + Math.random() * 1.0,
        targetY: startY + (Math.random() * 40 - 20) // slight vertical drift
      };
    };

    // Pre-populate particles across the screen
    for (let i = 0; i < maxStreams; i++) {
      streams.push(createStream(true));
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smoothly interpolate speed multiplier based on scroll velocity
      currentSpeedMultiplier += (targetSpeedMultiplier - currentSpeedMultiplier) * 0.08;
      // Decay scroll velocity over time
      targetSpeedMultiplier += (1 - targetSpeedMultiplier) * 0.05;

      // Color gradients for the wind tunnel stream (subtle Sany Red/white)
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, 'rgba(230, 0, 0, 0.01)');
      gradient.addColorStop(0.5, 'rgba(230, 0, 0, 0.12)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.01)');

      streams.forEach((stream, idx) => {
        // Move streams horizontally
        stream.x += stream.speed * currentSpeedMultiplier;
        // Apply slight vertical drift (aerodynamic curve)
        stream.y += (stream.targetY - stream.y) * 0.02;

        // Draw stream line with fading tail
        ctx.beginPath();
        ctx.strokeStyle = `rgba(230, 0, 0, ${stream.opacity})`;
        ctx.lineWidth = stream.thickness;
        
        // Draw path with a slight wave/curve
        ctx.moveTo(stream.x, stream.y);
        ctx.bezierCurveTo(
          stream.x + stream.length * 0.33,
          stream.y - 5,
          stream.x + stream.length * 0.66,
          stream.y + 5,
          stream.x + stream.length,
          stream.y
        );
        ctx.stroke();

        // Recycle particles when they exit the right margin of the screen
        if (stream.x > width) {
          streams[idx] = createStream(false);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10 opacity-60"
    />
  );
}

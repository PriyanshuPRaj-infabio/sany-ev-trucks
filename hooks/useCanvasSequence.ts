'use client';

import { useEffect, useRef } from 'react';
import { MotionValue } from 'framer-motion';

export function useCanvasSequence(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  images: HTMLImageElement[],
  scrollProgress: MotionValue<number>,
  loaded: boolean
) {
  const lastFrameIndex = useRef<number>(-1);
  const rafIdRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !loaded || images.length === 0) return;

    // alpha:false avoids per-frame alpha compositing overhead
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Pre-cached layout — computed once per resize, not per frame
    let canvasWidth = 0;
    let canvasHeight = 0;
    let cachedOffsetX = 0;
    let cachedOffsetY = 0;
    let cachedDrawWidth = 0;
    let cachedDrawHeight = 0;

    const computeLayout = (imgWidth: number, imgHeight: number) => {
      const canvasRatio = canvasWidth / canvasHeight;
      const imageRatio = imgWidth / imgHeight;
      if (canvasRatio > imageRatio) {
        cachedDrawHeight = canvasWidth / imageRatio;
        cachedDrawWidth = canvasWidth;
        cachedOffsetX = 0;
        cachedOffsetY = (canvasHeight - cachedDrawHeight) / 2;
      } else {
        cachedDrawWidth = canvasHeight * imageRatio;
        cachedDrawHeight = canvasHeight;
        cachedOffsetX = (canvasWidth - cachedDrawWidth) / 2;
        cachedOffsetY = 0;
      }
    };

    const renderFrame = (progress: number) => {
      const totalFrames = images.length;
      const frameIndex = Math.min(
        totalFrames - 1,
        Math.max(0, Math.floor(progress * totalFrames))
      );

      if (frameIndex === lastFrameIndex.current) return;

      const img = images[frameIndex];
      if (!img || !img.complete) return;

      // Compute layout lazily on first draw after a resize
      if (lastFrameIndex.current === -1) {
        computeLayout(img.naturalWidth || img.width, img.naturalHeight || img.height);
      }

      ctx.drawImage(img, cachedOffsetX, cachedOffsetY, cachedDrawWidth, cachedDrawHeight);
      lastFrameIndex.current = frameIndex;
    };

    // Debounced resize — cap DPR at 2 to avoid 3× overdraw on retina displays
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;

        // Set smoothing settings once per resize, not every frame
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'medium';

        // Invalidate layout cache so it recomputes on next draw
        lastFrameIndex.current = -1;
        renderFrame(scrollProgress.get());
      }, 80);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // Cancel any pending RAF before scheduling a new one to prevent frame queuing
    const unsubscribe = scrollProgress.on('change', (latest) => {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => renderFrame(latest));
    });

    // Render initial frame immediately
    renderFrame(scrollProgress.get());

    return () => {
      clearTimeout(resizeTimer);
      cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener('resize', handleResize);
      unsubscribe();
    };
  }, [canvasRef, images, scrollProgress, loaded]);
}

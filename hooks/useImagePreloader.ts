'use client';

import { useState, useEffect } from 'react';

interface PreloaderOptions {
  path: string;       // e.g. '/sequence 1'
  prefix?: string;    // e.g. 'ezgif-frame-'
  frameCount: number; // total number of frames
  extension?: string; // e.g. '.jpg'
}

export function useImagePreloader({
  path,
  prefix = 'ezgif-frame-',
  frameCount,
  extension = '.jpg',
}: PreloaderOptions) {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];
    let isMounted = true;

    // Pad number to 3 digits (e.g., 1 -> "001")
    const padNumber = (num: number, length: number = 3) => {
      return String(num).padStart(length, '0');
    };

    // Preload each image frame
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const paddedIndex = padNumber(i);
      img.src = `${path}/${prefix}${paddedIndex}${extension}`;

      img.onload = () => {
        if (!isMounted) return;
        loadedCount++;
        setProgress(Math.floor((loadedCount / frameCount) * 100));
        if (loadedCount === frameCount) {
          setLoaded(true);
        }
      };

      img.onerror = () => {
        console.warn(`Failed to preload frame: ${img.src}`);
        if (!isMounted) return;
        loadedCount++;
        setProgress(Math.floor((loadedCount / frameCount) * 100));
        if (loadedCount === frameCount) {
          setLoaded(true);
        }
      };

      loadedImages.push(img);
    }

    setImages(loadedImages);

    return () => {
      isMounted = false;
    };
  }, [path, prefix, frameCount, extension]);

  return { images, loaded, progress };
}

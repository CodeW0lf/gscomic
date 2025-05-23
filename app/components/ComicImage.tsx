import React, { useState, useEffect } from 'react';
import { useComicNav } from '~/hooks/useComicNav';
import Spinner from './Spinner';
import { useSwipeDrag } from '~/hooks/useSwipeDrag';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { AnimatePresence, motion } from 'motion/react';
import type { ComicPath } from '~/types/comicTypes';

interface ComicImageProps {
  imgPath: string;
  comicPath: ComicPath;
  version?: 'a' | 'b';
}

export default function ComicImage({ imgPath, comicPath, version }: ComicImageProps) {
  const { getComicFileName, prevComic, nextComic } = useComicNav({ comicPath, version });
  const { dragX, onTouchStart, onTouchMove, onTouchEnd } = useSwipeDrag(
    (direction) => {
      if (direction === 'left') {
        nextComic();
      } else {
        prevComic();
      }
    },
    { threshold: 150 },
  );
  const src = imgPath + (getComicFileName() ?? '');
  const [loading, setLoading] = useState(true);

  // Handle image loading state
  useEffect(() => {
    setLoading(true);
    if (src.endsWith('/')) {
      return;
    }
    const img = new window.Image();
    img.onload = () => setLoading(false);
    img.src = src;
  }, [src]);

  // Calculate visual effects based on drag distance
  const dragPercentage = Math.min(Math.abs(dragX) / 150, 1);
  const translateX = dragX / 10; // Add subtle movement to the image when dragging
  const dragIndicatorOpacity = dragPercentage * 0.9; // Max opacity of 0.9 for the indicators

  return (
    <div className="relative mx-auto w-full pt-[136%] text-center">
      {loading ? (
        <div className="absolute inset-0 top-[40%] w-full">
          <Spinner />
        </div>
      ) : (
        <div
          className="absolute inset-0 w-full touch-manipulation overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.img
              src={src}
              key={src}
              alt="Comic Image"
              draggable={false}
              className="absolute inset-0 m-auto h-full w-full object-contain"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                x: translateX, // Apply subtle movement when dragging
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.2,
                x: { duration: 0, type: 'spring' }, // Make the drag movement feel responsive
              }}
            />
          </AnimatePresence>

          {/* Swipe Indicators */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4">
            {/* Left swipe overlay */}
            <div
              className="flex h-full w-1/3 items-center justify-start"
              style={{
                opacity: dragX > 0 ? dragIndicatorOpacity : 0,
                transition: 'opacity 0.15s ease-out',
              }}
            >
              <div className="bg-opacity-30 rounded-full bg-black p-3">
                <SlArrowLeft className="h-10 w-10 text-white" />
              </div>
            </div>

            {/* Right swipe overlay */}
            <div
              className="flex h-full w-1/3 items-center justify-end"
              style={{
                opacity: dragX < 0 ? dragIndicatorOpacity : 0,
                transition: 'opacity 0.15s ease-out',
              }}
            >
              <div className="bg-opacity-30 rounded-full bg-black p-3">
                <SlArrowRight className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useComicNav } from '~/hooks/useComicNav';
import Spinner from './Spinner';
import type { ComicPath } from '~/stores/comicUiStore';
import { useSwipeDrag } from '~/hooks/useSwipeDrag';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { AnimatePresence, motion } from 'motion/react';

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
    { threshold: 200 },
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

  return (
    <div className="relative mx-auto w-full pt-[136%] text-center">
      {loading ? (
        <div className="absolute inset-0 top-[40%] w-full">
          <Spinner />
        </div>
      ) : (
        <div
          className="absolute inset-0 w-full"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Left swipe indicator */}
          <SlArrowLeft
            className="absolute top-[40%] left-0 h-24 w-24 rotate-90 transform fill-current text-white transition duration-200"
            style={{
              opacity: dragX > 0 ? Math.min(dragX / 80, 1) : 0,
            }}
          />
          {/* Comic Image */}
          <AnimatePresence mode="wait">
            <motion.img
              src={src}
              key={src}
              alt="Comic Image"
              draggable={false}
              className="absolute inset-0 m-auto h-full w-full object-contain"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          </AnimatePresence>
          {/* Right swipe indicator */}
          <SlArrowRight
            className="absolute top-[40%] right-0 h-24 w-24 -rotate-90 transform fill-current text-white transition duration-200"
            style={{
              opacity: dragX < 0 ? Math.min(-dragX / 80, 1) : 0,
            }}
          />
        </div>
      )}
    </div>
  );
}

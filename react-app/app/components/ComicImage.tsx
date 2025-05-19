import React, { useState, useEffect } from 'react';
import { useComicNav } from '~/hooks/useComicNav';
import Spinner from './Spinner';
import type { ComicPath } from '~/stores/comicUiStore';
import { useSwipeDrag } from '~/hooks/useSwipeDrag';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

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
  const src = imgPath + (getComicFileName?.() ?? '');
  const [loading, setLoading] = useState(true);

  // Handle image loading state
  useEffect(() => {
    setLoading(true);
    const img = new window.Image();
    img.onload = () => setLoading(false);
    img.src = src;
  }, [src]);

  return (
    <div className="relative mx-auto w-full text-center" style={{ paddingTop: '136%' }}>
      {loading ? (
        <div className="absolute inset-0 w-full" style={{ top: '40%' }}>
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
            className="absolute h-24 w-24 rotate-90 transform fill-current text-white transition duration-200"
            style={{
              top: '40%',
              left: 0,
              opacity: dragX > 0 ? Math.min(dragX / 80, 1) : 0,
            }}
          />
          {/* Comic Image */}
          <img className="transition" src={src} alt="Comic Image" draggable={false} />
          {/* Right swipe indicator */}
          <SlArrowRight
            className="absolute right-0 h-24 w-24 -rotate-90 transform fill-current text-white transition duration-200"
            style={{
              top: '40%',
              right: 0,
              opacity: dragX < 0 ? Math.min(-dragX / 80, 1) : 0,
            }}
          />
        </div>
      )}
      <div className="rounded border bg-white p-8 font-bold text-blue-500 shadow-md">Hello</div>
    </div>
  );
}

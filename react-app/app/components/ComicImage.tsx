import { useState, useEffect, useRef, useCallback } from 'react';
import { useComicNav } from '~/hooks/useComicNav';
import Spinner from './Spinner';

const comicChangeDragDistPx = 200;

interface ComicImageProps {
  imgPath: string;
}

export default function ComicImage({ imgPath }: ComicImageProps) {
  const { getComicFileName, prevComic, nextComic } = useComicNav.useStore();
  const src = imgPath + (getComicFileName?.() ?? '');
  const [loading, setLoading] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [lastMoveDist, setLastMoveDist] = useState(0);

  // Handle image loading state
  useEffect(() => {
    setLoading(true);
    const img = new window.Image();
    img.onload = () => setLoading(false);
    img.src = src;
  }, [src]);

  // Drag/Touch events
  const startDrag = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (loading) return;
      const x = 'changedTouches' in e ? e.changedTouches[0].pageX : (e as React.MouseEvent).pageX;
      setDragging(true);
      setStartX(x);
    },
    [loading],
  );

  const dragComic = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (loading || !dragging) return;
      const x = 'changedTouches' in e ? e.changedTouches[0].pageX : (e as React.MouseEvent).pageX;
      const moveDist = x - startX;
      setLastMoveDist(moveDist);

      if (moveDist >= comicChangeDragDistPx) {
        prevComic?.();
        setDragging(false);
        setLastMoveDist(0);
      } else if (moveDist <= -comicChangeDragDistPx) {
        nextComic?.();
        setDragging(false);
        setLastMoveDist(0);
      }
    },
    [dragging, loading, startX, prevComic, nextComic],
  );

  const stopDrag = useCallback(() => {
    setDragging(false);
    setStartX(0);
    setLastMoveDist(0);
  }, []);

  return (
    <div className="text-center mx-auto relative w-full" style={{ paddingTop: '136%' }}>
      {loading ? (
        <div className="absolute inset-0 w-full" style={{ top: '40%' }}>
          <Spinner />
        </div>
      ) : (
        <div
          className="absolute inset-0 w-full"
          onTouchStart={startDrag}
          onTouchMove={dragComic}
          onTouchEnd={stopDrag}
          onMouseDown={startDrag}
          onMouseMove={dragComic}
          onMouseUp={stopDrag}
        >
          {/* Left swipe indicator */}
          <svg
            className="fill-current text-white absolute w-24 h-24 transform rotate-90 transition duration-200"
            style={{
              top: '40%',
              opacity: lastMoveDist > 0 ? `${lastMoveDist / 2}%` : 0,
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
          {/* Comic Image */}
          <img className="transition" src={src} alt="Comic Image" draggable={false} />
          {/* Right swipe indicator */}
          <svg
            className="fill-current text-white absolute w-24 h-24 transform -rotate-90 right-0 transition duration-200"
            style={{
              top: '40%',
              opacity: lastMoveDist < 0 ? `${-lastMoveDist / 2}%` : 0,
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      )}
    </div>
  );
}

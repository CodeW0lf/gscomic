import React, { useRef, useState, useCallback } from 'react';

type SwipeHandler = (direction: 'left' | 'right') => void;

export function useSwipeDrag(onSwipe: SwipeHandler, { threshold = 100 } = {}) {
  const [dragX, setDragX] = useState(0);
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const isTouching = useRef(false);

  // Touch start
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      startX.current = e.touches[0].clientX;
      startY.current = e.touches[0].clientY;
      isTouching.current = true;
      setDragX(0);
    }
  }, []);

  // Touch move (update drag distance for UI)
  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isTouching.current || startX.current === null || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - startX.current;
    setDragX(dx);
  }, []);

  // Touch end
  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!isTouching.current || startX.current === null || startY.current === null) return;
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const dx = endX - startX.current;
      const dy = endY - startY.current;
      // Only fire for horizontal, big enough swipes
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
        onSwipe(dx > 0 ? 'right' : 'left');
      }
      setDragX(0);
      isTouching.current = false;
      startX.current = null;
      startY.current = null;
    },
    [onSwipe, threshold],
  );

  return {
    dragX,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}

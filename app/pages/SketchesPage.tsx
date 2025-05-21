import { useCallback, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useQuery } from '@tanstack/react-query';
import { Sketch } from '~/components/Sketch';
import { getSketches } from '~/services/comicsService';
import type { Sketch as SketchItem } from '~/types/apiTypes';
import { motion, AnimatePresence } from 'motion/react';
import Spinner from '~/components/Spinner';

const SKETCHES_TO_ADD = 6;

export function SketchesPage() {
  const [sketchList, setSketchList] = useState<SketchItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Add sketches to the visible list
  const addSketches = useCallback((sketches: SketchItem[], startIndex: number) => {
    if (startIndex < sketches.length) {
      const newSketches = sketches.slice(startIndex, startIndex + SKETCHES_TO_ADD);
      setSketchList((prev) => [...prev, ...newSketches]);
      setHasMore(startIndex + SKETCHES_TO_ADD < sketches.length);
    } else {
      setHasMore(false);
    }
  }, []);

  // Fetch all sketches using React Query
  const { data: sketches, isLoading } = useQuery({
    queryKey: ['sketches'],
    queryFn: getSketches,
  });

  // Handle the successful fetch of sketches
  useEffect(() => {
    if (!sketches) return;

    // clear & re-seed
    setSketchList([]);
    setHasMore(true);
    addSketches(sketches, 0);
  }, [sketches, addSketches]);

  // Handle infinite loading
  const loadMoreSketches = useCallback(() => {
    if (!sketches || isLoadingMore || !hasMore) return;

    const nextIndex = sketchList.length;
    if (nextIndex >= sketches.length) {
      setHasMore(false);
      return;
    }

    setIsLoadingMore(true);

    // Preload the next batch of sketches
    for (let i = 0; i < Math.min(SKETCHES_TO_ADD, sketches.length - nextIndex); i++) {
      const nextSketch = sketches[nextIndex + i];
      if (nextSketch) {
        const img = new window.Image();
        img.src = `/img/sketch_files/${nextSketch.src}`;
      }
    }

    // Add more sketches after a small delay for a smoother UX
    const timer = setTimeout(() => {
      if (sketches) {
        addSketches(sketches, nextIndex);
      }
      setIsLoadingMore(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [sketchList, sketches, hasMore, isLoadingMore, addSketches]);

  // Trigger loading more when the loader comes into view
  useEffect(() => {
    if (inView && !isLoadingMore && hasMore) {
      loadMoreSketches();
    }
  }, [inView, isLoadingMore, hasMore, loadMoreSketches]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="mt-8 px-4">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
        <AnimatePresence>
          {sketchList.map((sketch) => (
            <motion.div
              key={sketch.src}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              layout
            >
              <Sketch sketch={sketch} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Loading indicator / infinite scroll trigger */}
      <div ref={loadMoreRef} className="flex justify-center py-8">
        {isLoadingMore && <Spinner />}
      </div>
    </section>
  );
}

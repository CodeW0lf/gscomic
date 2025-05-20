import { type ReactNode, useState, useCallback } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { PiPlayFill } from 'react-icons/pi';
import { Tooltip } from './Tooltip';

export type CarouselProps<T> = {
  items: T[];
  onIndexChange?: (newIdx: number) => void;
  renderItem: (item: T, idx: number) => ReactNode;
  wrap?: boolean; // if true, next after last → first
};

const variants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? -50 : 50,
    opacity: 0,
  }),
};

function Carousel<T>({ items, onIndexChange, renderItem, wrap = false }: CarouselProps<T>) {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const count = items.length;

  const paginate = useCallback(
    (dir: 1 | -1) => {
      let next = page + dir;
      if (wrap) {
        // modulo wrap: ensures 0 ≤ next < count
        next = ((next % count) + count) % count;
      } else {
        next = Math.max(0, Math.min(count - 1, next));
      }
      setPage([next, dir]);
      onIndexChange?.(next);
    },
    [page, count, wrap, onIndexChange],
  );

  return (
    <div className="relative h-full w-full">
      <AnimatePresence initial={false} mode="wait" custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="h-full w-full"
        >
          {renderItem(items[page], page)}
        </motion.div>
      </AnimatePresence>

      {/* navigation controls */}
      <div className="absolute inset-x-0 bottom-0 flex justify-between px-4">
        <button
          onClick={() => paginate(-1)}
          disabled={!wrap && page === 0}
          aria-label="Previous"
          className="text-primary hover:text-primary-lighter cursor-pointer disabled:text-gray-700"
        >
          <Tooltip text="Previous Character" top>
            <PiPlayFill className="h-8 w-8 rotate-180 sm:h-10 sm:w-10" />
          </Tooltip>
        </button>
        <button
          onClick={() => paginate(1)}
          disabled={!wrap && page === count - 1}
          aria-label="Next"
          className="text-primary hover:text-primary-lighter cursor-pointer disabled:text-gray-700"
        >
          <Tooltip text="Next Character" top>
            <PiPlayFill className="h-8 w-8 sm:h-10 sm:w-10" />
          </Tooltip>
        </button>
      </div>
    </div>
  );
}

export default Carousel;

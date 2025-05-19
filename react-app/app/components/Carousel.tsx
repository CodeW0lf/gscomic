import type { ReactNode } from 'react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PiPlayFill } from 'react-icons/pi';
import { Tooltip } from '~/components/Tooltip';

type CarouselProps = {
  items: string[];
  onIndexChange: (newIdx: number) => void;
  renderItem: (item: string, idx: number) => ReactNode;
};

function Carousel({ items, onIndexChange, renderItem }: CarouselProps) {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [dir, setDir] = useState<1 | -1>(1);

  const change = (dir: 1 | -1) => {
    setVisible(false);
    setTimeout(() => {
      const next = idx + dir;
      setIdx(next);
      setDir(dir);
      onIndexChange(next);
      setVisible(true);
    }, 300);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: dir === 1 ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir === 1 ? -50 : 50 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full overflow-hidden"
          >
            {renderItem(items[idx], idx)}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="z-10 mx-auto -mt-8 flex w-full justify-between sm:px-4">
        <Tooltip text="Previous Character" top>
          <button onClick={() => change(-1)} disabled={idx === 0} className="text-primary disabled:text-gray-700">
            <PiPlayFill className="h-8 w-8 rotate-180 sm:h-10 sm:w-10" />
          </button>
        </Tooltip>
        <Tooltip text="Next Character" top>
          <button
            onClick={() => change(+1)}
            disabled={idx === items.length - 1}
            className="text-primary disabled:text-gray-700"
          >
            <PiPlayFill className="h-8 w-8 sm:h-10 sm:w-10" />
          </button>
        </Tooltip>
      </div>
    </>
  );
}

export default Carousel;

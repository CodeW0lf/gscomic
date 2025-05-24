import deridealBanner from '../assets/banner-vote-derideal.png';
import { motion } from 'motion/react';

export function LinksPage() {
  return (
    <section className="h-full min-h-[24rem] text-white">
      <div className="mt-12 flex h-full flex-col items-center justify-center gap-8">
        <div className="prose">
          <h2 className="text-gray-400">Recommended Comics</h2>
        </div>
        <div className="m-4">
          <a href="https://derideal.com/" target="_blank" rel="noopener noreferrer">
            <motion.img
              src={deridealBanner}
              alt="Derideal Banner"
              className="h-auto max-w-full rounded"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </a>
        </div>
      </div>
    </section>
  );
}

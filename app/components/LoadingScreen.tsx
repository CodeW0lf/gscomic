import { motion } from 'motion/react';
import { ImSpinner9 } from 'react-icons/im';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black text-gray-400">
      <motion.div
        animate={{ scale: [0.9, 1.1, 0.9] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="mb-6 text-4xl font-bold"
      >
        God Slayers Comic
      </motion.div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="mb-4"
        role="status"
        aria-label="Loading"
      >
        <ImSpinner9 className="h-10 w-10 text-gray-400" />
      </motion.div>
    </div>
  );
}

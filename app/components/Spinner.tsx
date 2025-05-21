import React from 'react';
import { motion } from 'motion/react';
import { ImSpinner9 } from 'react-icons/im';

export default function Spinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
      className="inline-block"
      role="status"
      aria-label="Loading"
    >
      <ImSpinner9 className="h-8 w-8 text-gray-400" />
    </motion.div>
  );
}

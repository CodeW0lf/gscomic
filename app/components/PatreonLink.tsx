import React from 'react';
import { useAnalytics } from '~/hooks/useAnalytics';
import { FaPatreon } from 'react-icons/fa6';
import { HiArrowSmLeft } from 'react-icons/hi';
import { motion } from 'motion/react';

export function PatreonLink() {
  const track = useAnalytics();

  const patreonClick = () => {
    track('Patreon', { event_category: 'Social' });
  };

  return (
    <div className="mb-2 flex flex-col items-center justify-center text-nowrap sm:flex-row md:mb-0">
      <a
        href="https://www.patreon.com/elitetrick"
        onClick={patreonClick}
        target="_blank"
        rel="noreferrer"
        className="bg-patreon-lighter hover:ring-patreon inline-block rounded px-3 py-2 text-xs text-white hover:ring-2 hover:ring-offset-2 hover:ring-offset-black active:bg-gray-700 sm:text-sm"
      >
        <FaPatreon className="mr-1 inline-block h-4 w-4 align-middle" />
        Become a Patron
      </a>
      <motion.span
        className="mt-2 inline-block text-sm font-semibold text-gray-600 sm:mt-0 sm:ml-2 sm:text-base"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'spring',
          delay: 2,
          duration: 0.8,
          bounce: 0.5,
          stiffness: 120,
          damping: 9,
        }}
      >
        <HiArrowSmLeft className="mx-1 hidden h-5 w-5 align-text-top sm:inline-block" />
        Read the next 5 comics for only $1!
      </motion.span>
    </div>
  );
}

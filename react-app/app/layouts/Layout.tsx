import React from 'react';
import { Outlet } from 'react-router';
import { SiteNav } from '~/components/SiteNav';
import { SocialLinks } from '~/components/SocialLinks';
import { SiteFooter } from '~/components/SiteFooter';
import { SlArrowDown } from 'react-icons/sl';
import { motion } from 'motion/react';

export default function Layout() {
  return (
    <div className="h-full">
      <header className="relative mx-auto text-center">
        <img className="w-screen" src="/images/title_banner.png" alt="God Slayers Comic" />
        <motion.a
          href="#top"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 transform"
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'loop',
          }}
        >
          <SlArrowDown className="h-8 w-8 text-white"></SlArrowDown>
        </motion.a>
      </header>
      <div
        id="top"
        className="container mx-auto flex h-full w-full flex-col items-center justify-between"
        style={{ maxWidth: '900px' }}
      >
        <a href="https://www.fenrispublishing.com/product.php?id=995" target="_blank" rel="noreferrer" className="mb-4">
          <img src="/images/order_book.png" alt="Preorder the God Slayers physical book!" />
        </a>
        <SiteNav />
        <Outlet />
        <SocialLinks />
        <footer className="mt-16 py-2 text-center text-gray-400">
          <SiteFooter />
        </footer>
      </div>
    </div>
  );
}

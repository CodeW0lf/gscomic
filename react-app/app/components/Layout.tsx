import React from 'react';
import { Outlet } from 'react-router';
import { SiteNav } from './SiteNav';
import { SocialLinks } from './SocialLinks';
import { SiteFooter } from './SiteFooter';

export default function Layout() {
  return (
    <div className="h-full">
      <header className="relative text-center mx-auto">
        <img className="w-screen" src="/images/title_banner.png" alt="God Slayers Comic" />
        <a href="#top" className="scroll-to-top">
          <svg
            className="animated pulse infinite slower fill-current text-white opacity-40 inline-block relative w-12 h-12 -mt-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </a>
      </header>
      <div
        id="top"
        className="container mx-auto flex flex-col items-center justify-between w-full h-full"
        style={{ maxWidth: '900px' }}
      >
        <a href="https://www.fenrispublishing.com/product.php?id=995" target="_blank" rel="noreferrer" className="mb-4">
          <img src="/images/order_book.png" alt="Preorder the God Slayers physical book!" />
        </a>
        <SiteNav />
        <Outlet />
        <SocialLinks />
        <footer className="text-gray-400 mt-16 text-center py-2">
          <SiteFooter />
        </footer>
      </div>
    </div>
  );
}

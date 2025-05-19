import React from 'react';
import { Outlet } from 'react-router';
import { SiteNav } from '../components/SiteNav';
import { SocialLinks } from '../components/SocialLinks';
import { SiteFooter } from '../components/SiteFooter';

export default function Layout() {
  return (
    <div className="h-full">
      <header className="relative mx-auto text-center">
        <img className="w-screen" src="/images/title_banner.png" alt="God Slayers Comic" />
        <a href="#top" className="scroll-to-top">
          <svg
            className="animated pulse infinite slower relative -mt-8 inline-block h-12 w-12 fill-current text-white opacity-40"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </a>
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

import React from 'react';
import ComicImage from '~/components/ComicImage';
import ComicNav from '~/components/ComicNav';
import { useComicNavContext } from '~/contexts/ComicNavContext';

export interface ComicWrapperProps {
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export function ComicWrapper({ children, footer }: ComicWrapperProps) {
  const nav = useComicNavContext();
  return (
    <section className="relative w-full text-center">
      <ComicImage imgPath={nav.comicImgPath} comicPath={nav.comicPath} version={nav.version} />
      <ComicNav {...nav} />

      {children}

      <div className="my-4 font-semibold text-gray-400">
        {nav.comicId} / {nav.latestComicId}
      </div>

      {footer}
    </section>
  );
}

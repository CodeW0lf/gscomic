import React, { useState } from 'react';
import { useComicNav } from '~/hooks/useComicNav';
import ComicImage from '~/components/ComicImage';
import ComicNav from '~/components/ComicNav';
import grinImg from '~/assets/grin.png';
import { motion, AnimatePresence } from 'motion/react';

export function RileyComicPage() {
  const [version, setVersion] = useState<'a' | 'b'>('a');
  const [isSecondViewSelected, setSecondView] = useState(false);
  const nav = useComicNav({ comicPath: 'rileycomic', version });

  // Sync switch with version
  function switchValue(e: React.ChangeEvent<HTMLInputElement>) {
    setSecondView(e.target.checked);
    setVersion(e.target.checked ? 'b' : 'a');
  }

  return (
    <section className="relative w-full text-center">
      <ComicImage imgPath="/img/riley_comics/" comicPath={nav.comicPath} version={version} />
      <ComicNav {...nav} />
      <div className="flex flex-col items-center justify-center">
        <div className="switch-button">
          <input
            className="switch-button-checkbox"
            id="switch"
            type="checkbox"
            checked={isSecondViewSelected}
            onChange={switchValue}
          />
          <label className="switch-button-label" htmlFor="switch">
            <span className="switch-button-label-span">
              <AnimatePresence>
                {!isSecondViewSelected && (
                  <motion.img
                    key="grin"
                    src={grinImg}
                    alt="Riley Grin"
                    className="mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.3 } }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  />
                )}
              </AnimatePresence>
            </span>
          </label>
        </div>
        <div className="my-4 font-semibold text-gray-400">
          {nav.comicId} / {nav.latestComicId}
        </div>
      </div>
    </section>
  );
}

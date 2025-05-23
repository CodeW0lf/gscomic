import React, { useState } from 'react';
import { ComicWrapper } from '~/components/ComicWrapper';
import grinImg from '~/assets/grin.png';
import { AnimatePresence, motion } from 'motion/react';
import type { RileyComicVersion } from '~/types/comicTypes';
import { ComicNavProvider } from '~/contexts/ComicNavContext';

export function RileyComicPage() {
  const [version, setVersion] = useState<RileyComicVersion>('a');
  const [isSecondViewSelected, setSecondView] = useState(false);

  const switchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecondView(e.target.checked);
    setVersion(e.target.checked ? 'b' : 'a');
  };

  return (
    <ComicNavProvider comicPath="rileycomic" version={version}>
      <ComicWrapper>
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
        </div>
      </ComicWrapper>
    </ComicNavProvider>
  );
}

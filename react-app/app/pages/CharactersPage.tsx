import React, { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import Spinner from '~/components/Spinner';
import { getCharacters } from '~/services/comicsService';

const CharactersPage: React.FC = () => {
  const [selectedCharIdx, setSelectedCharIdx] = useState(0);
  const [selectedPortraitIdx, setSelectedPortraitIdx] = useState(0);
  const [portraitsVisible, setPortraitsVisible] = useState(true);
  const [animation, setAnimation] = useState({
    enter: 'slideInRight',
    exit: 'slideOutLeft',
  });

  const { data: characterData, isLoading } = useQuery({
    queryKey: ['characters'],
    queryFn: getCharacters,
  });

  const character = characterData?.characters[selectedCharIdx];
  const portrait = character?.talkingHeads[selectedPortraitIdx];

  const navigateCharacter = useCallback(
    (direction: 'next' | 'prev') => {
      setPortraitsVisible(false);
      setSelectedPortraitIdx(0);

      setAnimation({
        enter: direction === 'next' ? 'slideInRight' : 'slideInLeft',
        exit: direction === 'next' ? 'slideOutLeft' : 'slideOutRight',
      });

      const newIdx =
        direction === 'next'
          ? (selectedCharIdx + 1) % (characterData?.characters.length || 1)
          : (selectedCharIdx - 1 + (characterData?.characters.length || 1)) % (characterData?.characters.length || 1);

      setSelectedCharIdx(newIdx);
    },
    [selectedCharIdx, characterData?.characters.length],
  );

  const navigatePortrait = useCallback(
    (direction: 'next' | 'prev') => {
      if (!character) return;

      setAnimation({
        enter: direction === 'next' ? 'slideInRight' : 'slideInLeft',
        exit: direction === 'next' ? 'slideOutLeft' : 'slideOutRight',
      });

      const newIdx =
        direction === 'next'
          ? (selectedPortraitIdx + 1) % character.talkingHeads.length
          : (selectedPortraitIdx - 1 + character.talkingHeads.length) % character.talkingHeads.length;

      setSelectedPortraitIdx(newIdx);
    },
    [selectedPortraitIdx, character],
  );

  const getImageUrl = useCallback((imageName: string) => {
    return `/images/characters/${imageName}`;
  }, []);

  if (isLoading || !character) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-900">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="w-full pt-8 text-gray-400">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex w-full flex-col items-center justify-between px-4">
          <div>
            <h1 className="primary text-5xl font-bold">{character.name}</h1>
          </div>

          <div className="relative w-3/4 pt-[100%]">
            <div className="absolute inset-0 flex h-full w-full flex-col">
              <div className="flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`char-${selectedCharIdx}`}
                    initial={{
                      opacity: 0,
                      x: animation.enter === 'slideInRight' ? 50 : -50,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{
                      opacity: 0,
                      x: animation.exit === 'slideOutLeft' ? -50 : 50,
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-full w-full"
                    onAnimationComplete={() => setPortraitsVisible(true)}
                  >
                    <img
                      alt="Character Image"
                      src={getImageUrl(character.fullImg)}
                      className="h-full w-full object-contain"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="z-10 mx-auto -mt-8 flex w-full justify-between sm:px-4">
                <button
                  onClick={() => navigateCharacter('prev')}
                  disabled={selectedCharIdx === 0}
                  className="text-primary ring-primary focus:ring-opacity-50 rounded focus:ring-2 focus:outline-none disabled:text-gray-700"
                  aria-label="Previous character"
                >
                  <span className="sr-only">Previous character</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="h-8 w-8 rotate-180 transform sm:h-10 sm:w-10"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => navigateCharacter('next')}
                  disabled={selectedCharIdx === characterData?.characters.length - 1}
                  className="text-primary ring-primary focus:ring-opacity-50 rounded focus:ring-2 focus:outline-none disabled:text-gray-700"
                  aria-label="Next character"
                >
                  <span className="sr-only">Next character</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="h-8 w-8 sm:h-10 sm:w-10"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="flex w-full justify-center">
            <div className="w-1/3 self-end overflow-hidden">
              <AnimatePresence>
                {portraitsVisible && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex w-full flex-col"
                  >
                    <div>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={selectedPortraitIdx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                          className="h-full w-full"
                        >
                          <img
                            src={getImageUrl(character.talkingHeads[selectedPortraitIdx].portraitImg)}
                            alt={`${character.name} portrait`}
                            className="h-full w-full object-contain"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    <div className="z-10 mx-auto -mt-8 flex w-full justify-between sm:px-4">
                      <button
                        onClick={() => navigatePortrait('prev')}
                        disabled={selectedPortraitIdx === 0}
                        className="ring-primary focus:ring-opacity-50 rounded focus:ring-2 focus:outline-none"
                        aria-label="Previous portrait"
                      >
                        <span className="sr-only">Previous portrait</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          className="text-primary h-8 w-8 rotate-180 transform sm:h-10 sm:w-10"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => navigatePortrait('next')}
                        disabled={selectedPortraitIdx === character.talkingHeads.length - 1}
                        className="ring-primary focus:ring-opacity-50 rounded focus:ring-2 focus:outline-none"
                        aria-label="Next portrait"
                      >
                        <span className="sr-only">Next portrait</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          className="text-primary h-8 w-8 sm:h-10 sm:w-10"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
                          />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="triangle-border left mb-4 h-96 w-2/3 p-2 sm:mb-14">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${selectedPortraitIdx}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="prose h-full w-full overflow-y-auto p-4 text-center"
                  dangerouslySetInnerHTML={{ __html: portrait?.text || '' }}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CharactersPage;

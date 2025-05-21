import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'motion/react';
import Spinner from '~/components/Spinner';
import { getCharacters } from '~/services/comicsService';
import Carousel from '~/components/Carousel';
import SafeHtml from '~/components/SafeHtml';

const getImageUrl = (imageName: string) => {
  return `/images/characters/${imageName}` as const;
};

function CharactersPage() {
  const [selectedCharIdx, setSelectedCharIdx] = useState(0);
  const [selectedPortraitIdx, setSelectedPortraitIdx] = useState(0);

  const { data: characterData, isLoading } = useQuery({
    queryKey: ['characters'],
    queryFn: getCharacters,
  });

  const character = characterData?.characters[selectedCharIdx];
  const portrait = character?.talkingHeads[selectedPortraitIdx];

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
            <h1 className="text-5xl font-bold text-gray-400">{character.name}</h1>
          </div>

          <div className="relative w-3/4 pt-[100%]">
            <div className="absolute inset-0 flex h-full w-full flex-col">
              <div className="flex-1">
                <Carousel
                  items={characterData?.characters.map((char) => char.fullImg)}
                  onIndexChange={setSelectedCharIdx}
                  wrap={true}
                  renderItem={(src) => (
                    <img src={getImageUrl(src)} alt="Character" className="h-full w-full object-contain" />
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex w-full justify-center">
            <div className="w-1/3 self-end">
              <Carousel
                items={character.talkingHeads.map((portrait) => portrait.portraitImg)}
                onIndexChange={setSelectedPortraitIdx}
                wrap={true}
                renderItem={(src) => (
                  <img
                    src={getImageUrl(src)}
                    alt={`${character.name} portrait`}
                    className="h-full w-full object-contain"
                  />
                )}
              />
            </div>
            <div className="triangle-border left my-4 h-96 w-2/3 p-2 sm:my-14">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${selectedPortraitIdx}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-full w-full overflow-y-auto"
                >
                  <SafeHtml html={portrait?.text || ''} className="prose p-4 text-center text-gray-400" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CharactersPage;

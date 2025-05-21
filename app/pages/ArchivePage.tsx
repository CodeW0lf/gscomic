import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { SlArrowDown } from 'react-icons/sl';
import { Link } from 'react-router';
import Spinner from '~/components/Spinner';
import { getComics } from '~/services/comicsService';
import type { ComicsResponse } from '~/types/apiTypes';

type ChapterMap = Map<number, string[]>;

export function ArchivePage() {
  const [expandedChapters, setExpandedChapters] = useState<Set<number>>(new Set([1]));

  const {
    data: comics,
    isLoading,
    error,
  } = useQuery<ComicsResponse>({
    queryKey: ['comics'],
    queryFn: getComics,
  });

  // Create a map of chapter numbers to comic IDs
  const chapterMap = useMemo<ChapterMap>(() => {
    const map = new Map<number, string[]>();

    if (!comics) return map;

    let currentChapter = 1;
    let nextChapterEndId = comics.chapters[currentChapter];

    Object.entries(comics.comics).forEach(([comicId]) => {
      if (!map.has(currentChapter)) {
        map.set(currentChapter, []);
      }
      map.get(currentChapter)?.push(comicId);

      if (parseInt(comicId, 10) === nextChapterEndId) {
        currentChapter += 1;
        nextChapterEndId = comics.chapters[currentChapter] || Number.POSITIVE_INFINITY;
      }
    });

    return map;
  }, [comics]);

  // Toggle chapter expansion
  const toggleChapter = (chapter: number) => {
    setExpandedChapters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(chapter)) {
        newSet.delete(chapter);
      } else {
        newSet.add(chapter);
      }
      return newSet;
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error loading comics. Please try again later.</div>;
  }

  return (
    <section className="relative w-full p-4 text-white">
      <h1 className="mb-6 text-3xl font-bold">Comic Archive</h1>
      <div className="space-y-6">
        {Array.from(chapterMap.entries()).map(([chapter, comicIds]) => {
          const isExpanded = expandedChapters.has(chapter);
          return (
            <div key={chapter} className="overflow-hidden rounded-lg bg-gray-800">
              <button
                type="button"
                onClick={() => toggleChapter(chapter)}
                className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-700"
              >
                <h2 className="text-xl font-semibold">Chapter {chapter}</h2>
                <motion.span
                  className="inline-block h-5 w-5"
                  initial={{ rotate: isExpanded ? 0 : -90 }}
                  animate={{ rotate: isExpanded ? 0 : -90 }}
                  transition={{ duration: 0.3 }}
                >
                  <SlArrowDown />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    layout
                    transition={{ layout: { type: 'tween', ease: 'easeInOut', duration: 0.5 } }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                    style={{ willChange: 'height, opacity' }}
                  >
                    <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                      {comicIds.map((comicId) => (
                        <motion.div
                          key={comicId}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.5 }}
                          style={{ willChange: 'opacity, transform' }}
                        >
                          <Link to={`/comic/${comicId}#top`} className="block hover:opacity-70">
                            <img
                              src={`/img/comics/thumbnails/${comics!.comics[comicId]}`}
                              alt={`Comic ${comicId}`}
                              className="w-full rounded-md shadow-lg"
                              loading="lazy"
                            />
                            <div className="mt-2 text-center text-sm">#{comicId}</div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ArchivePage;

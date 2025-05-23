// In useComicNav.ts
import { useComicData } from './useComicData';
import { useComicNavigation } from './useComicNavigation';
import { useComicPathUtils } from './useComicPathUtils';
import type { ComicPath, RileyComicVersion } from '~/types/comicTypes';

export function useComicController({ comicPath, version }: { comicPath: ComicPath; version?: RileyComicVersion }) {
  // Fetch comic data
  const { data, comicList, chapters, latestComicId, isFetched } = useComicData(comicPath, version);

  // Handle URL/ID parsing and navigation
  const {
    comicId,
    goToComic,
    nextComic,
    prevComic,
    nextChapter,
    prevChapter,
    latestComic,
    firstComic,
    hasNextComic,
    hasPrevComic,
    hasNextChapter,
    hasPrevChapter,
    isLatestComic,
  } = useComicNavigation(comicPath, comicList, chapters, latestComicId, isFetched);

  // Get path-specific utilities
  const { comicImgPath, comicFileName } = useComicPathUtils(comicPath, comicList, comicId, latestComicId);

  return {
    comicId,
    latestComicId,
    comicPath,
    comicList,
    chapters,
    hasNextComic,
    hasPrevComic,
    hasNextChapter,
    hasPrevChapter,
    nextComic,
    prevComic,
    nextChapter,
    prevChapter,
    latestComic,
    isLatestComic,
    firstComic,
    goToComic,
    comicFileName,
    comicImgPath,
    version,
    data,
  };
}

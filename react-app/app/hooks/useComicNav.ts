import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getComics, getRileyComics } from '~/services/comicsService';
import { useAnalytics } from '~/hooks/useAnalytics';
import { useComicUiStore, type ComicPath } from '~/stores/comicUiStore';

export function useComicNav({ comicPath: initialComicPathFromProps, version }: { comicPath: ComicPath; version?: 'a' | 'b' }) {
  const navigate = useNavigate();
  const { id: idFromParams } = useParams<{ id?: string }>();
  const track = useAnalytics();

  // Step 2: Integrate useComicUiStore
  const storeComicId = useComicUiStore((state) => state.comicId);
  const storeComicPath = useComicUiStore((state) => state.comicPath);
  const setStoreComicId = useComicUiStore((state) => state.setComicId);
  const setStoreComicPath = useComicUiStore((state) => state.setComicPath);

  // Step 1 (Props) & Step 6 (Core State Usage for query): Use initialComicPathFromProps for queryKey.
  // The query will refetch if initialComicPathFromProps changes.
  const { data, isFetched, isLoading: queryIsLoading } = useQuery({
    queryKey: [initialComicPathFromProps, version],
    queryFn: () => {
      switch (initialComicPathFromProps) {
        case 'comic':
          return getComics();
        case 'rileycomic':
          return getRileyComics(version || 'a');
        default:
          // This case should ideally be prevented by TypeScript
          console.warn(`Unknown comicPath prop: ${initialComicPathFromProps} in useComicNav query`);
          return Promise.resolve(null); 
      }
    },
  });

  const comicList = data?.comics ?? {};
  const chapters = data?.chapters ?? [];
  const latestComicIdFromData = data?.latest ? Number(data.latest) : undefined;

  // Step 3: Initialization Effect
  useEffect(() => {
    // Part 1 of Step 1 (Props): Initialize storeComicPath from prop
    if (initialComicPathFromProps !== storeComicPath) {
      setStoreComicPath(initialComicPathFromProps);
    }
    
    const urlIdNum = idFromParams ? Number(idFromParams) : undefined;
    const isValidUrlId = urlIdNum !== undefined && !isNaN(urlIdNum) && urlIdNum > 0;

    if (isFetched && data) { // Ensure data is available to make decisions
      const currentComicList = data.comics ?? {}; 
      const currentLatestId = data.latest ? Number(data.latest) : 1; // Fallback to 1 as per original logic

      if (isValidUrlId && currentComicList[urlIdNum!]) {
        // Valid ID from URL and exists in the list
        if (urlIdNum !== storeComicId) {
          setStoreComicId(urlIdNum!);
        }
      } else { 
        // URL ID is invalid, missing, or not in list -> use latest
        if (currentLatestId !== storeComicId) {
          setStoreComicId(currentLatestId);
        }
      }
    } else if (isValidUrlId && !isFetched) { 
      // Data NOT fetched yet, but URL has a potentially valid ID.
      // Tentatively set it to prevent flicker if store default is different.
      if (urlIdNum !== storeComicId) {
        setStoreComicId(urlIdNum);
      }
    }
    // If no ID in URL and data not fetched, store uses its default. Once fetched, above logic applies.
  }, [
    idFromParams, 
    initialComicPathFromProps, 
    isFetched, 
    data, // Includes comicList and latestComicIdFromData
    storeComicId, 
    storeComicPath, 
    setStoreComicId, 
    setStoreComicPath
    // Note: comicList and latestComicIdFromData are implicitly covered by `data` for dependency purposes
  ]);

  // Step 4 & 6: URL Synchronization Effect (Store State -> URL)
  useEffect(() => {
    // Guard against running too early or with invalid state
    if (!isFetched || !storeComicId || !storeComicPath) { 
      return;
    }
    
    // Validate that the store ID is actually valid (present in comicList or is the latest ID)
    // This prevents navigation if the store ID is somehow invalid (e.g. during an effect race condition)
    const isValidStoreIdForNavigation = comicList[storeComicId] || (latestComicIdFromData !== undefined && storeComicId === latestComicIdFromData);
      
    if (isValidStoreIdForNavigation) {
      const targetPath = `/${storeComicPath}/${storeComicId}`;
      const currentUrlPath = window.location.pathname; // Read current browser path
      const currentUrlId = idFromParams ? Number(idFromParams) : undefined;

      // Navigate if the store state implies a different URL than what's currently shown
      // OR if the current URL's path context (initialComicPathFromProps) doesn't match the store's path context.
      if (currentUrlPath !== targetPath || currentUrlId !== storeComicId || initialComicPathFromProps !== storeComicPath) {
        navigate(targetPath, { replace: true, preventScrollReset: true });
      }
    }
  }, [
    storeComicId, 
    storeComicPath, 
    navigate, 
    isFetched, 
    comicList, // Needed for isValidStoreIdForNavigation
    latestComicIdFromData, // Needed for isValidStoreIdForNavigation
    idFromParams, // To compare current URL state
    initialComicPathFromProps // To compare current URL path context
  ]);

  // Step 7: Redundant redirection effects are removed. (Old effects that directly called navigate are gone)

  // Step 5: Navigation Functions update the store
  function nextComic() {
    if (storeComicId && comicList[storeComicId + 1]) {
      setStoreComicId(storeComicId + 1);
      track('NextComic', { event_category: 'Comic' });
    }
  }
  function prevComic() {
    if (storeComicId && comicList[storeComicId - 1]) {
      setStoreComicId(storeComicId - 1);
      track('PrevComic', { event_category: 'Comic' });
    }
  }
  function nextChapter() {
    if (!storeComicId || !chapters || chapters.length === 0) return;
    const next = chapters.find((val) => storeComicId < val);
    if (next) setStoreComicId(next);
  }
  function prevChapter() {
    if (!storeComicId || !chapters || chapters.length === 0) return;
    let currentChapterStart = chapters[0];
    for (let i = chapters.length - 1; i >= 0; i--) {
      if (storeComicId >= chapters[i]) {
        currentChapterStart = chapters[i];
        break;
      }
    }
    const currentChapterStartIndex = chapters.indexOf(currentChapterStart);
    if (currentChapterStartIndex > 0) {
      setStoreComicId(chapters[currentChapterStartIndex - 1]);
      track('PrevChapter', { event_category: 'Comic' });
    }
  }
  function latestComic() {
    if (latestComicIdFromData !== undefined) setStoreComicId(latestComicIdFromData);
  }
  function firstComic() {
    const firstIdInList = Object.keys(comicList).length > 0 
      ? Math.min(...Object.keys(comicList).map(Number).filter(n => !isNaN(n))) 
      : undefined;
    
    if (firstIdInList !== undefined) {
      setStoreComicId(firstIdInList);
    } else if (latestComicIdFromData !== undefined) { 
      setStoreComicId(latestComicIdFromData);
    } else {
      setStoreComicId(1); // Absolute fallback
    }
    track('FirstComic', { event_category: 'Comic' });
  }

  function getComicFileName() {
    // Primary source of truth for filename is the storeComicId if it's valid and present in the list
    if (storeComicId && comicList[storeComicId]) {
      return comicList[storeComicId];
    }
    // Fallback to latestComicIdFromData if storeComicId isn't (yet) valid or populated
    if (latestComicIdFromData && comicList[latestComicIdFromData]) {
      return comicList[latestComicIdFromData];
    }
    return '';
  }

  // Step 4 & 6: Core State Usage for derived properties
  const hasNextComic = !!(storeComicId && comicList[storeComicId + 1]);
  const hasPrevComic = !!(storeComicId && comicList[storeComicId - 1]);
  const hasNextChapter = !!(storeComicId && chapters.some((val) => storeComicId < val));

  let currentChapterStartIndexForLogic = -1;
  if (storeComicId && chapters && chapters.length > 0) {
    let currentChapterStart = chapters[0]; 
    for (let i = chapters.length - 1; i >= 0; i--) {
      if (storeComicId >= chapters[i]) {
        currentChapterStart = chapters[i];
        break;
      }
    }
    currentChapterStartIndexForLogic = chapters.indexOf(currentChapterStart);
  }
  const hasPrevChapter = currentChapterStartIndexForLogic > 0;
  const isLatestComic = storeComicId === latestComicIdFromData;

  // Step 8 & 6: Return values from store and unified isLoading
  return {
    comicId: storeComicId, 
    latestComicId: latestComicIdFromData ?? 1, 
    comicPath: storeComicPath, 
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
    getComicFileName,
    isLoading: queryIsLoading || !isFetched, 
  };
}

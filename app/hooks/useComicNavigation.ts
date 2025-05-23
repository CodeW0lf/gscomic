import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAnalytics } from '~/hooks/useAnalytics';
import type { ComicPath } from '~/types/comicTypes';

export function useComicNavigation(
  comicPath: ComicPath,
  comicList: Record<string, string | number>,
  chapters: number[],
  latestComicId: number,
  isFetched: boolean,
) {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const track = useAnalytics();

  // Parse comicId from the URL params
  let comicId: number | undefined = Number(id);
  if (isNaN(comicId) || comicId <= 0) comicId = undefined;

  // Handle redirects
  useEffect(() => {
    if (isFetched && !id && latestComicId) {
      navigate(`/${comicPath}/${latestComicId}`, { replace: true, preventScrollReset: true });
    }
  }, [isFetched, id, latestComicId, comicPath, navigate]);

  useEffect(() => {
    if (!isFetched || !id) return;
    const comicId = Number(id);

    if (isNaN(comicId) || !comicList[comicId]) {
      navigate(`/${comicPath}/${latestComicId}`, { replace: true });
    }
  }, [id, isFetched, comicList, latestComicId, comicPath, navigate]);

  // Navigation helpers
  function goToComic(newId: number) {
    navigate(`/${comicPath}/${newId}`, { preventScrollReset: true });
  }

  function nextComic() {
    if (comicId && comicList[comicId + 1]) goToComic(comicId + 1);
    track('NextComic', { event_category: 'Comic' });
  }

  function prevComic() {
    if (comicId && comicList[comicId - 1]) goToComic(comicId - 1);
    track('PrevComic', { event_category: 'Comic' });
  }

  function nextChapter() {
    if (!comicId) return;
    const next = chapters.find((val) => comicId < val);
    if (next) goToComic(next);
  }

  function prevChapter() {
    if (!comicId) return;
    let latest = 0;
    for (const val of chapters) {
      if (comicId - 1 > val) {
        latest = val;
      }
    }
    if (latest) goToComic(latest + 1);
  }

  function latestComic() {
    if (latestComicId) goToComic(latestComicId);
  }

  function firstComic() {
    goToComic(1);
    track('FirstComic', { event_category: 'Comic' });
  }

  // Derived state
  const hasNextComic = comicId && comicList[comicId + 1];
  const hasPrevComic = comicId && comicList[comicId - 1];
  const hasNextChapter = comicId && chapters.some((val) => comicId < val);
  const hasPrevChapter = comicId && chapters.some((val) => comicId > val + 1);
  const isLatestComic = comicId === latestComicId;

  return {
    comicId: comicId ?? latestComicId,
    goToComic,
    nextComic,
    prevComic,
    nextChapter,
    prevChapter,
    latestComic,
    firstComic,
    hasNextComic: !!hasNextComic,
    hasPrevComic: !!hasPrevComic,
    hasNextChapter: !!hasNextChapter,
    hasPrevChapter: !!hasPrevChapter,
    isLatestComic,
  };
}

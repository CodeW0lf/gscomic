import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getComics, getRileyComics } from '~/services/comicsService';
import { useAnalytics } from '~/hooks/useAnalytics';
import { type ComicPath } from '~/stores/comicUiStore';

export function useComicNav({ comicPath, version }: { comicPath: ComicPath; version?: 'a' | 'b' }) {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const track = useAnalytics();

  // Query for comics data
  const { data, isFetched } = useQuery({
    queryKey: [comicPath, version],
    queryFn: comicPath === 'comic' ? getComics : () => getRileyComics(version || 'a'),
  });
  const comicList = data?.comics ?? {};
  const chapters = data?.chapters ?? [];
  const latestComicId = Number(data?.latest) ?? 1;

  // Parse comicId from the URL params
  let comicId: number | undefined = Number(id);
  if (isNaN(comicId) || comicId <= 0) comicId = undefined;

  // On /comic or /rileycomic with no id, redirect to latest after data is loaded
  useEffect(() => {
    if (isFetched && !id && latestComicId) {
      navigate(`/${comicPath}/${latestComicId}`, { replace: true, preventScrollReset: true });
    }
  }, [isFetched, id, latestComicId, comicPath, navigate]);

  useEffect(() => {
    if (!data || !id) return;
    const comicId = Number(id);
    const comicList = data.comics ?? {};
    const latestComicId = Number(data.latest) ?? 1;

    if (isNaN(comicId) || !comicList[comicId]) {
      navigate(`/${comicPath}/${latestComicId}`, { replace: true });
    }
  }, [id, data, comicPath, navigate]);

  // Navigation functions: update URL only (don't update state)
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
  function getComicFileName() {
    return comicList[comicId ?? latestComicId] ?? '';
  }

  // Derived
  const hasNextComic = comicId && comicList[comicId + 1];
  const hasPrevComic = comicId && comicList[comicId - 1];
  const hasNextChapter = comicId && chapters.some((val) => comicId < val);
  const hasPrevChapter = comicId && chapters.some((val) => comicId > val + 1);
  const isLatestComic = comicId === latestComicId;

  return {
    comicId: comicId ?? latestComicId,
    latestComicId,
    comicPath,
    comicList,
    chapters,
    hasNextComic: !!hasNextComic,
    hasPrevComic: !!hasPrevComic,
    hasNextChapter: !!hasNextChapter,
    hasPrevChapter: !!hasPrevChapter,
    nextComic,
    prevComic,
    nextChapter,
    prevChapter,
    latestComic,
    isLatestComic,
    firstComic,
    getComicFileName,
    data,
  };
}

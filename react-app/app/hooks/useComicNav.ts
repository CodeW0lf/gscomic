import { useNavigate, useLocation, useParams } from 'react-router';
import { type ComicPath, useComicUiStore } from '~/stores/comicUiStore';
import { useQuery } from '@tanstack/react-query';
import { getComics, getRileyComics } from '~/services/comicsService';
import { useAnalytics } from '~/hooks/useAnalytics';

// Pass which loader to use, current version, etc.
export function useComicNav({ comicPath, version }: { comicPath: ComicPath; version?: 'a' | 'b' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const track = useAnalytics();
  const { id } = useParams<{ id: string }>();
  const comicId = useComicUiStore((s) => s.comicId);
  const setComicId = useComicUiStore((s) => s.setComicId);

  // Choose the right query for this comic series
  const { data } = useQuery({
    queryKey: [comicPath, version],
    queryFn: comicPath === 'comic' ? getComics : () => getRileyComics(version || 'a'),
  });
  const comicList = data?.comics ?? {};
  const chapters = data?.chapters ?? [];
  const latestComicId = data?.latest ?? 1;

  // Derived logic (getters)
  const hasNextComic = Number(comicId) + 1 in comicList;
  const hasPrevComic = Number(comicId) - 1 in comicList;
  const hasNextChapter = chapters.some((val) => comicId < val);
  const hasPrevChapter = chapters.some((val) => comicId > val + 1);

  // Navigation handlers
  function nextComic() {
    if (hasNextComic) {
      setComicId(comicId + 1);
      navigate(`/${comicPath}/${comicId + 1}`);
      track('NextComic', { event_category: 'Comic' });
    }
  }
  function prevComic() {
    if (hasPrevComic) {
      setComicId(comicId - 1);
      navigate(`/${comicPath}/${comicId - 1}`);
      track('PrevComic', { event_category: 'Comic' });
    }
  }
  function nextChapter() {
    if (!hasNextChapter) return;
    for (const val of chapters) {
      if (comicId < val) {
        setComicId(val);
        navigate(`/${comicPath}/${val}`);
        break;
      }
    }
  }
  function prevChapter() {
    if (!hasPrevChapter) return;
    let latest = 0;
    for (const val of chapters) {
      if (comicId - 1 > val) {
        latest = val;
      }
    }
    setComicId(latest + 1);
    navigate(`/${comicPath}/${latest + 1}`);
  }
  function latestComic() {
    if (hasNextComic) {
      setComicId(latestComicId);
      navigate(`/${comicPath}`);
    }
  }
  function firstComic() {
    if (hasPrevComic) {
      setComicId(1);
      navigate(`/${comicPath}/1`);
      window.gtag?.('event', 'FirstComic', { event_category: 'Comic' });
    }
  }

  function getComicFileName() {
    return comicList[comicId] ?? '';
  }

  // Expose data and methods for use in components
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
    firstComic,
    getComicFileName,
    setComicId,
    data,
  };
}

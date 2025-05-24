import { useQuery } from '@tanstack/react-query';
import { getComics, getRileyComics, getSolipsusComics } from '~/services/comicsService';
import { assertNever } from '~/utils/typeUtils';
import type { ComicPath, RileyComicVersion } from '~/types/comicTypes';

export function useComicData(comicPath: ComicPath, version?: RileyComicVersion) {
  const { data, isFetched } = useQuery({
    queryKey: [comicPath, version],
    queryFn: () => {
      switch (comicPath) {
        case 'comic':
          return getComics();
        case 'rileycomic':
          return getRileyComics(version || 'a');
        case 'solipsus':
          return getSolipsusComics();
        default:
          assertNever(comicPath);
      }
    },
  });

  const comicList = (data?.comics ?? []) as Record<string, string | number>;
  const chapters = data?.chapters ?? [];
  const latestComicId = data?.latest ? Number(data.latest) : 1;

  return { data, comicList, chapters, latestComicId, isFetched };
}

import { useMemo } from 'react';
import { assertNever } from '~/utils/typeUtils';
import type { ComicPath } from '~/types/comicTypes';

export function useComicPathUtils(
  comicPath: ComicPath,
  comicList: Record<string, string | number>,
  comicId: number | undefined,
  latestComicId: number,
) {
  // Generate the appropriate image path based on comic type
  const comicImgPath = useMemo(() => {
    switch (comicPath) {
      case 'comic':
        return '/img/comics/';
      case 'rileycomic':
        return '/img/riley_comics/';
      case 'solipsus':
        return '/img/solipsus/';
      default:
        assertNever(comicPath);
        return '';
    }
  }, [comicPath]);

  const comicFileName = comicList[comicId ?? latestComicId] ?? '';

  return {
    comicImgPath,
    comicFileName,
  };
}

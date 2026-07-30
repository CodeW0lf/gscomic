import { useMemo } from 'react';
import { mediaUrl } from '~/services/api';
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
        return mediaUrl('comics/');
      case 'rileycomic':
        return mediaUrl('riley_comics/');
      case 'solipsus':
        return mediaUrl('solipsus/');
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

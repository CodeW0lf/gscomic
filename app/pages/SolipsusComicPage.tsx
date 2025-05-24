import { ComicWrapper } from '~/components/ComicWrapper';
import { ComicControllerProvider } from '~/contexts/ComicControllerContext';

export function meta() {
  return {
    title: 'Solipsus',
  };
}

export function SolipsusComicPage() {
  return (
    <ComicControllerProvider comicPath="solipsus">
      <ComicWrapper />
    </ComicControllerProvider>
  );
}

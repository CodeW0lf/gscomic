import { useComicNav } from '~/hooks/useComicNav';
import ComicImage from '~/components/ComicImage';
import ComicNav from '~/components/ComicNav';
import type { ComicPath } from '~/stores/comicUiStore';

interface ComicPageProps {
  initialComicPathFromProps: ComicPath;
  imgPath: string;
}

export function ComicPage({ initialComicPathFromProps, imgPath }: ComicPageProps) {
  // Pass the initialComicPathFromProps to useComicNav.
  // The 'version' prop for useComicNav is handled internally by it or passed if needed,
  // for now, this page component only concerns itself with the path and image directory.
  const nav = useComicNav({ comicPath: initialComicPathFromProps });

  return (
    <section className="relative w-full text-center">
      {/* Use the imgPath prop for ComicImage and nav.comicPath for the store's current path */}
      <ComicImage imgPath={imgPath} comicPath={nav.comicPath} />
      <ComicNav {...nav} />
      <div className="my-4 font-semibold text-gray-400">
        {nav.comicId} / {nav.latestComicId}
      </div>
      <div>
        <a className="text-size-md text-primary font-bold hover:text-white" href="/archive">
          Archive
        </a>
      </div>
    </section>
  );
}

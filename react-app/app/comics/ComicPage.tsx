import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useComicNav } from '~/hooks/useComicNav';
import ComicImage from '~/components/ComicImage';
import ComicNav from '~/components/ComicNav';

export function ComicPage() {
  const { id } = useParams<{ id?: string }>();
  const nav = useComicNav({ mode: 'main' });

  // On mount/update: set comicId from URL param
  useEffect(() => {
    if (id) nav.setComicId(Number(id));
  }, [id]);

  // Could do scroll-to-top here if needed

  return (
    <section className="text-center w-full relative">
      <ComicImage imgPath="/img/comics/" />
      <ComicNav {...nav} />
      <div className="text-gray-400 font-semibold my-4">
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

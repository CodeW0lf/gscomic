import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useComicNav } from '~/hooks/useComicNav';
import ComicImage from '~/components/ComicImage';
import ComicNav from '~/components/ComicNav';
import grinImg from '~/assets/grin.png';

export function RileyComicPage() {
  const { id } = useParams<{ id?: string }>();
  const [version, setVersion] = useState<'a' | 'b'>('a');
  const [isSecondViewSelected, setSecondView] = useState(false);
  const nav = useComicNav({ mode: 'riley', version });

  useEffect(() => {
    if (id) nav.setComicId(Number(id));
  }, [id, nav.setComicId]);

  // Sync switch with version
  function switchValue(e: React.ChangeEvent<HTMLInputElement>) {
    setSecondView(e.target.checked);
    setVersion(e.target.checked ? 'b' : 'a');
  }

  return (
    <section className="text-center w-full relative">
      <ComicImage imgPath="/img/riley_comics/" />
      <ComicNav {...nav} />
      <div className="flex flex-col justify-center items-center">
        <div className="switch-button">
          <input
            className="switch-button-checkbox"
            id="switch"
            type="checkbox"
            checked={isSecondViewSelected}
            onChange={switchValue}
          />
          <label className="switch-button-label" htmlFor="switch">
            <span className="switch-button-label-span">
              {!isSecondViewSelected && <img src={grinImg} alt="Riley Grin" className="mx-auto" />}
            </span>
          </label>
        </div>
        <div className="text-gray-400 font-semibold my-4">
          {nav.comicId} / {nav.latestComicId}
        </div>
      </div>
    </section>
  );
}

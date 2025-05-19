import React from 'react';
import { PiFastForwardFill, PiPlayFill, PiRewindFill, PiSkipBackFill, PiSkipForwardFill } from 'react-icons/pi';
import { Tooltip } from '~/components/Tooltip';

interface ComicNavProps {
  hasPrevComic: boolean;
  hasPrevChapter: boolean;
  hasNextComic: boolean;
  hasNextChapter: boolean;
  firstComic: () => void;
  prevComic: () => void;
  prevChapter: () => void;
  nextComic: () => void;
  nextChapter: () => void;
  latestComic: () => void;
  isLatestComic: boolean;
}

const navButtonClass =
  'focus:ring-primary focus:ring-opacity-50 hover:text-primary-lighter cursor-pointer rounded focus:ring-2 focus:outline-none disabled:text-gray-700 disabled:cursor-default';

export default function ComicNav(props: ComicNavProps) {
  console.log(props);
  return (
    <section className="text-primary mx-4 flex items-center justify-between">
      <div>
        <Tooltip text="First Comic">
          <button
            className={navButtonClass}
            aria-label="First Comic"
            onClick={props.firstComic}
            disabled={!props.hasPrevComic}
          >
            <PiSkipBackFill className="mx-2 h-10 w-10" />
          </button>
        </Tooltip>
        <Tooltip text="Previous Chapter">
          <button
            className={navButtonClass}
            aria-label="Previous Chapter"
            onClick={props.prevChapter}
            disabled={!props.hasPrevChapter}
          >
            <PiRewindFill className="mx-2 h-10 w-10" />
          </button>
        </Tooltip>
        <Tooltip text="Previous Comic">
          <button
            className={navButtonClass}
            aria-label="Previous Comic"
            onClick={props.prevComic}
            disabled={!props.hasPrevComic}
          >
            <PiPlayFill className="mx-2 h-10 w-10 rotate-180" />
          </button>
        </Tooltip>
      </div>
      <div>
        {!props.isLatestComic && (
          <>
            <Tooltip text="Next Comic">
              <button
                className={navButtonClass}
                aria-label="Next Comic"
                onClick={props.nextComic}
                disabled={!props.hasNextComic}
              >
                <PiPlayFill className="mx-2 h-10 w-10" />
              </button>
            </Tooltip>
            <Tooltip text="Next Chapter">
              <button
                className={navButtonClass}
                aria-label="Next Chapter"
                onClick={props.nextChapter}
                disabled={!props.hasNextChapter}
              >
                <PiFastForwardFill className="mx-2 h-10 w-10" />
              </button>
            </Tooltip>
            <Tooltip text="Latest Comic">
              <button
                className={navButtonClass}
                aria-label="Latest Comic"
                onClick={props.latestComic}
                disabled={!props.hasNextComic}
              >
                <PiSkipForwardFill className="mx-2 h-10 w-10" />
              </button>
            </Tooltip>
          </>
        )}
      </div>
    </section>
  );
}

import React from 'react';

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
}

export default function ComicNav(props: ComicNavProps) {
  return (
    <section className="text-primary mx-4 flex items-center justify-between">
      <div>
        <button
          className="focus:ring-primary focus:ring-opacity-50 rounded focus:ring-2 focus:outline-none disabled:text-gray-700"
          aria-label="First Comic"
          onClick={props.firstComic}
          disabled={!props.hasPrevComic}
        >
          {/* SVG as in your Vue code */}
        </button>
        <button
          className="focus:ring-primary focus:ring-opacity-50 rounded focus:ring-2 focus:outline-none disabled:text-gray-700"
          aria-label="Previous Chapter"
          onClick={props.prevChapter}
          disabled={!props.hasPrevChapter}
        >
          {/* SVG */}
        </button>
        <button
          className="focus:ring-primary focus:ring-opacity-50 rounded focus:ring-2 focus:outline-none disabled:text-gray-700"
          aria-label="Previous Comic"
          onClick={props.prevComic}
          disabled={!props.hasPrevComic}
        >
          {/* SVG */}
        </button>
      </div>
      <div>
        <button
          className="focus:ring-primary focus:ring-opacity-50 rounded focus:ring-2 focus:outline-none disabled:text-gray-700"
          aria-label="Next Comic"
          onClick={props.nextComic}
          disabled={!props.hasNextComic}
        >
          {/* SVG */}
        </button>
        <button
          className="focus:ring-primary focus:ring-opacity-50 rounded focus:ring-2 focus:outline-none disabled:text-gray-700"
          aria-label="Next Chapter"
          onClick={props.nextChapter}
          disabled={!props.hasNextChapter}
        >
          {/* SVG */}
        </button>
        <button
          className="focus:ring-primary focus:ring-opacity-50 rounded focus:ring-2 focus:outline-none disabled:text-gray-700"
          aria-label="Latest Comic"
          onClick={props.latestComic}
          disabled={!props.hasNextComic}
        >
          {/* SVG */}
        </button>
      </div>
    </section>
  );
}

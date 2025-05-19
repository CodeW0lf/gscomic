import React from 'react';
import { useAnalytics } from '~/hooks/useAnalytics';

export function PatreonLink() {
  const track = useAnalytics();

  const patreonClick = () => {
    track('Patreon', { event_category: 'Social' });
  };

  return (
    <div className="flex flex-col justify-center items-center mb-2 text-nowrap sm:flex-row md:mb-0">
      <a
        href="https://www.patreon.com/elitetrick"
        onClick={patreonClick}
        target="_blank"
        rel="noreferrer"
        className="inline-block py-2 px-3 bg-patreon-lighter text-white rounded text-xs sm:text-sm hover:ring-2 hover:ring-patreon hover:ring-offset-2 hover:ring-offset-black active:bg-gray-700"
      >
        <svg
          className="fill-current inline-block w-4 h-4 align-middle mr-1"
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Patreon icon</title>
          <path d="M15.386.524c-4.764 0-8.64 3.876-8.64 8.64 0 4.75 3.876 8.613 8.64 8.613 4.75 0 8.614-3.864 8.614-8.613C24 4.4 20.136.524 15.386.524M.003 23.537h4.22V.524H.003" />
        </svg>
        Become a Patron
      </a>
      <span className="text-gray-600 font-semibold inline-block animated bounceIn delay-1s text-sm mt-2 sm:mt-0 sm:ml-2 sm:text-base">
        <svg
          className="fill-current w-5 h-5 mx-1 align-text-top hidden sm:inline-block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M3.828 9l6.071-6.071-1.414-1.414L0 10l.707.707 7.778 7.778 1.414-1.414L3.828 11H20V9H3.828z" />
        </svg>
        Read the next 5 comics for only $1!
      </span>
    </div>
  );
}

import React from 'react';
import { useAnalytics } from '~/hooks/useAnalytics';

export function PatreonLink() {
  const track = useAnalytics();

  const patreonClick = () => {
    track('Patreon', { event_category: 'Social' });
  };

  return (
    <div className="mb-2 flex flex-col items-center justify-center text-nowrap sm:flex-row md:mb-0">
      <a
        href="https://www.patreon.com/elitetrick"
        onClick={patreonClick}
        target="_blank"
        rel="noreferrer"
        className="bg-patreon-lighter hover:ring-patreon inline-block rounded px-3 py-2 text-xs text-white hover:ring-2 hover:ring-offset-2 hover:ring-offset-black active:bg-gray-700 sm:text-sm"
      >
        <svg
          className="mr-1 inline-block h-4 w-4 fill-current align-middle"
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Patreon icon</title>
          <path d="M15.386.524c-4.764 0-8.64 3.876-8.64 8.64 0 4.75 3.876 8.613 8.64 8.613 4.75 0 8.614-3.864 8.614-8.613C24 4.4 20.136.524 15.386.524M.003 23.537h4.22V.524H.003" />
        </svg>
        Become a Patron
      </a>
      <span className="animated bounceIn delay-1s mt-2 inline-block text-sm font-semibold text-gray-600 sm:mt-0 sm:ml-2 sm:text-base">
        <svg
          className="mx-1 hidden h-5 w-5 fill-current align-text-top sm:inline-block"
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

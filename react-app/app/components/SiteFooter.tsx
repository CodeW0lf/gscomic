import React from 'react';
import { FaPatreon } from 'react-icons/fa6';
import { SiKofi } from 'react-icons/si';

export function SiteFooter() {
  return (
    <div>
      <p className="font-semibold">Comic updates (almost) weekly, Currently posting on Fridays.</p>
      <p>
        Like the comic? Support me on
        <a
          href="https://www.patreon.com/elitetrick"
          target="_blank"
          rel="noreferrer"
          className="text-patreon hover:text-patreon-lighter mx-1"
        >
          <FaPatreon className="mr-1 inline-block h-4 w-4 align-text-top" />
          Patreon
        </a>
        or buy me a
        <a
          href="https://ko-fi.com/trickfoxx"
          target="_blank"
          rel="noreferrer"
          className="text-kofi hover:text-kofi-lighter mx-1"
        >
          <SiKofi className="mr-1 inline-block h-4 w-4 align-text-top" />
          Ko-fi
        </a>
      </p>
      <p className="mt-8 mb-4">Copyright &copy; {new Date().getFullYear()} Steven Lloyd. All rights reserved</p>
    </div>
  );
}

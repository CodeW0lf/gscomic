import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { PatreonLink } from './PatreonLink';
import { NewBadge } from './NewBadge';
import { useQuery } from '@tanstack/react-query';
import { getBadges } from '~/services/comicsService';

export function SiteNav() {
  const [isCharactersBadgeEnabled, setIsCharactersBadgeEnabled] = useState(false);

  const { data } = useQuery({
    queryKey: ['characters-badge'],
    queryFn: getBadges,
  });

  useEffect(() => {
    if (data?.newCharacters === true) {
      setIsCharactersBadgeEnabled(true);
    }
  }, [data]);

  return (
    <nav id="top" className="my-2 flex w-full flex-col items-center justify-between px-4 lg:flex-row">
      <PatreonLink />
      <div className="text-size-md text-primary mt-4 flex flex-wrap justify-center gap-2 font-bold lg:mt-0">
        <NavLink
          className={({ isActive }) => (isActive ? 'text-white' : 'hover:text-white')}
          to="/comic"
          viewTransition
        >
          Comic
        </NavLink>
        <span className="text-gray-600">|</span>
        <NavLink
          className={({ isActive }) => (isActive ? 'text-white' : 'hover:text-white')}
          to="/rileycomic"
          viewTransition
        >
          Riley Comic
        </NavLink>
        <span className="text-gray-600">|</span>
        <NavLink
          className={({ isActive }) => (isActive ? 'text-white' : 'hover:text-white')}
          to="/characters"
          viewTransition
        >
          Characters
          {isCharactersBadgeEnabled && <NewBadge />}
        </NavLink>
        <span className="text-gray-600">|</span>
        <NavLink
          className={({ isActive }) => (isActive ? 'text-white' : 'hover:text-white')}
          to="/sketches"
          viewTransition
        >
          Sketches
        </NavLink>
        <span className="text-gray-600">|</span>
        <NavLink
          className={({ isActive }) => (isActive ? 'text-white' : 'hover:text-white')}
          to="/links"
          viewTransition
        >
          Links
        </NavLink>
      </div>
    </nav>
  );
}

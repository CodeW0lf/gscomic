import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { PatreonLink } from './PatreonLink';
import { NewBadge } from './NewBadge';

export function SiteNav() {
  const [isCharactersBadgeEnabled, setIsCharactersBadgeEnabled] = useState(false);

  // Simulating the loadBadges action from Vuex
  useEffect(() => {
    // In a real app, this would fetch badge state from an API
    // For now, we'll just set it to true for demonstration
    setIsCharactersBadgeEnabled(true);
  }, []);

  return (
    <nav className="my-2 flex w-full flex-col items-center justify-between px-4 lg:flex-row">
      <PatreonLink />
      <div className="text-size-md text-primary mt-4 text-center font-bold lg:mt-0">
        <Link className="hover:text-white" to="/">
          Comic
        </Link>
        <span className="px-2 text-gray-600">|</span>
        <Link className="hover:text-white" to="/rileycomic">
          Riley Comic
        </Link>
        <span className="px-2 text-gray-600">|</span>
        <Link className="group relative hover:text-white" to="/characters">
          Characters
          {isCharactersBadgeEnabled && <NewBadge />}
        </Link>
        <span className="px-2 text-gray-600">|</span>
        <Link className="hover:text-white" to="/sketches">
          Sketches
        </Link>
        <span className="px-2 text-gray-600">|</span>
        <Link className="group relative hover:text-white" to="/links">
          Links
        </Link>
      </div>
    </nav>
  );
}

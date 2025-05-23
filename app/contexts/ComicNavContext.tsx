import React, { createContext, useContext } from 'react';
import type { ComicPath, RileyComicVersion } from '~/types/comicTypes';
import { useComicNav } from '~/hooks/useComicNav';

// Define the shape of the context value
type ComicNavContextType = ReturnType<typeof useComicNav>;

// Create the context with a default undefined value
const ComicNavContext = createContext<ComicNavContextType | undefined>(undefined);

// Provider component
export function ComicNavProvider({
  children,
  comicPath,
  version,
}: {
  children: React.ReactNode;
  comicPath: ComicPath;
  version?: RileyComicVersion;
}) {
  const nav = useComicNav({ comicPath, version });

  return <ComicNavContext.Provider value={nav}>{children}</ComicNavContext.Provider>;
}

export function useComicNavContext() {
  const context = useContext(ComicNavContext);

  if (context === undefined) {
    throw new Error('useComicNavContext must be used within a ComicNavProvider');
  }

  return context;
}

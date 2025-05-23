import React, { createContext, useContext } from 'react';
import type { ComicPath, RileyComicVersion } from '~/types/comicTypes';
import { useComicController } from '~/hooks/useComicController';

// Define the shape of the context value
type ComicControllerContextType = ReturnType<typeof useComicController>;

// Create the context with a default undefined value
const ComicControllerContext = createContext<ComicControllerContextType | undefined>(undefined);

// Provider component
export function ComicControllerProvider({
  children,
  comicPath,
  version,
}: {
  children: React.ReactNode;
  comicPath: ComicPath;
  version?: RileyComicVersion;
}) {
  const nav = useComicController({ comicPath, version });

  return <ComicControllerContext.Provider value={nav}>{children}</ComicControllerContext.Provider>;
}

export function useComicControllerContext() {
  const context = useContext(ComicControllerContext);

  if (context === undefined) {
    throw new Error('useComicNavContext must be used within a ComicNavProvider');
  }

  return context;
}

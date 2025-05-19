import { create } from 'zustand';

export type ComicPath = 'comic' | 'rileycomic';

interface ComicUiState {
  comicId: number;
  comicPath: ComicPath;

  setComicId: (id: number) => void;
  setComicPath: (path: ComicPath) => void;
}

export const useComicUiStore = create<ComicUiState>((set) => ({
  comicId: 1, // Default or last-viewed comic
  comicPath: 'comic', // Or 'rileycomic' etc.

  setComicId: (id) => set({ comicId: id }),
  setComicPath: (path) => set({ comicPath: path }),
}));

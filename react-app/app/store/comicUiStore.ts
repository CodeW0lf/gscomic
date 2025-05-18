import { create } from 'zustand';

interface ComicUiState {
  comicId: number;
  comicPath: 'comic' | 'rileycomic';

  setComicId: (id: number) => void;
  setComicPath: (path: string) => void;
}

export const useComicUiStore = create<ComicUiState>((set) => ({
  comicId: 1, // Default or last-viewed comic
  comicPath: 'comic', // Or 'rileycomic' etc.

  setComicId: (id) => set({ comicId: id }),
  setComicPath: (path) => set({ comicPath: path }),
}));

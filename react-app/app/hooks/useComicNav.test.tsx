import { act, renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { useComicNav } from '~/hooks/useComicNav';
import * as analyticsHook from '~/hooks/useAnalytics';
import * as comicsService from '~/services/comicsService';
import * as comicUiStore from '~/stores/comicUiStore'; // Import the actual module

// Mock react-router
const mockNavigate = vi.fn();
vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: vi.fn().mockReturnValue({ id: undefined }),
  };
});

// Mock services
vi.mock('~/services/comicsService', () => ({
  getComics: vi.fn(),
  getRileyComics: vi.fn(),
}));

// Mock useAnalytics
vi.mock('~/hooks/useAnalytics', () => ({
  useAnalytics: vi.fn().mockReturnValue(vi.fn()),
}));

// Refined Mock for Zustand store
// This will hold the state and allow us to spy on actions.
let mockStoreState: {
  comicId: number;
  comicPath: comicUiStore.ComicPath;
  setComicId: (id: number) => void;
  setComicPath: (path: comicUiStore.ComicPath) => void;
};

// Helper to initialize/reset the mock store for each test
const initializeMockStore = (initialState?: Partial<Omit<typeof mockStoreState, 'setComicId' | 'setComicPath'>>) => {
  const newSetComicId = vi.fn((id) => {
    act(() => { // Ensure state updates are wrapped in act
      mockStoreState.comicId = id;
    });
  });
  const newSetComicPath = vi.fn((path) => {
    act(() => { // Ensure state updates are wrapped in act
      mockStoreState.comicPath = path;
    });
  });

  mockStoreState = {
    comicId: initialState?.comicId ?? 1,
    comicPath: initialState?.comicPath ?? 'comic',
    setComicId: newSetComicId,
    setComicPath: newSetComicPath,
  };
};

vi.mock('~/stores/comicUiStore', () => ({
  // Actual exports of the store module are `useComicUiStore` and `ComicPath` type.
  // We only need to mock `useComicUiStore`.
  useComicUiStore: vi.fn((selector) => {
    // This ensures that the hook gets fresh state on each render if the selector implies it.
    // And that it gets the mock functions.
    return selector(mockStoreState);
  }),
}));


const mockComicData = {
  comics: { '1': 'comic1.jpg', '2': 'comic2.jpg', '3': 'comic3.jpg', '4': 'comic4.png', '5': 'comic5.webp' },
  chapters: [1, 3, 5],
  latest: '5',
};

const mockRileyComicData = {
  comics: { '1': 'riley1.jpg', '2': 'riley2.jpg', '3': 'riley3.jpg' },
  chapters: [1, 2],
  latest: '3',
};

describe('useComicNav', () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } }, // Prevent retries, keep data fresh
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    vi.clearAllMocks(); // Clears navigate, service calls, analytics
    queryClient.clear(); // Clears query cache

    // Initialize mock store to a default state for each test
    initializeMockStore({ comicId: 1, comicPath: 'comic' });

    vi.mocked(useParams).mockReturnValue({ id: undefined });
    vi.mocked(comicsService.getComics).mockResolvedValue(mockComicData);
    vi.mocked(comicsService.getRileyComics).mockResolvedValue(mockRileyComicData);
    
    // Mock window.location.pathname for URL Sync effect condition
    // Default to root, tests can override if specific path needed for a scenario
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/',
        configurable: true,
        writable: true,
      },
      configurable: true,
      writable: true,
    });
  });

  // Test Suite 1: Initialization and Store Updates from URL/Props
  describe('Initialization and Store Updates', () => {
    it('should initialize store comicPath from prop and comicId to latest when no ID in URL', async () => {
      initializeMockStore({ comicId: 100, comicPath: 'rileycomic' }); // Initial store state different from prop
      vi.mocked(useParams).mockReturnValue({ id: undefined });
      Object.defineProperty(window, 'location', {value: { pathname: '/rileycomic/100'}, configurable: true, writable: true });


      renderHook(() => useComicNav({ comicPath: 'comic' }), { wrapper });

      await waitFor(() => {
        expect(mockStoreState.setComicPath).toHaveBeenCalledWith('comic');
      });
      await waitFor(() => {
        expect(mockStoreState.setComicId).toHaveBeenCalledWith(5); // latest from mockComicData
      });
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenLastCalledWith('/comic/5', { replace: true, preventScrollReset: true });
      });
    });

    it('should initialize store with ID from URL if valid', async () => {
      vi.mocked(useParams).mockReturnValue({ id: '2' });
      initializeMockStore({ comicId: 1, comicPath: 'comic' });
      Object.defineProperty(window, 'location', {value: { pathname: '/comic/1'}, configurable: true, writable: true });


      renderHook(() => useComicNav({ comicPath: 'comic' }), { wrapper });

      await waitFor(() => {
        expect(mockStoreState.setComicId).toHaveBeenCalledWith(2);
      });
      await waitFor(() => {
         // Because store changed from 1 to 2, and URL was /comic/1 (via idFromParams=1 initially, then changed to 2)
        expect(mockNavigate).toHaveBeenLastCalledWith('/comic/2', { replace: true, preventScrollReset: true });
      });
    });

    it('should initialize store to latest ID if URL ID is invalid', async () => {
      vi.mocked(useParams).mockReturnValue({ id: 'invalid-id' });
      initializeMockStore({ comicId: 1, comicPath: 'comic' });
      Object.defineProperty(window, 'location', {value: { pathname: '/comic/1'}, configurable: true, writable: true });


      renderHook(() => useComicNav({ comicPath: 'comic' }), { wrapper });

      await waitFor(() => {
        expect(mockStoreState.setComicId).toHaveBeenCalledWith(5); // latest
      });
       await waitFor(() => {
        expect(mockNavigate).toHaveBeenLastCalledWith('/comic/5', { replace: true, preventScrollReset: true });
      });
    });

     it('should initialize store to latest ID if URL ID is not in comicList', async () => {
      vi.mocked(useParams).mockReturnValue({ id: '999' }); // Not in mockComicData
      initializeMockStore({ comicId: 1, comicPath: 'comic' });
      Object.defineProperty(window, 'location', {value: { pathname: '/comic/1'}, configurable: true, writable: true });

      renderHook(() => useComicNav({ comicPath: 'comic' }), { wrapper });

      await waitFor(() => {
        expect(mockStoreState.setComicId).toHaveBeenCalledWith(5); // latest
      });
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenLastCalledWith('/comic/5', { replace: true, preventScrollReset: true });
      });
    });

    it('should tentatively set store ID from URL if data not fetched, then correct if needed', async () => {
      vi.mocked(useParams).mockReturnValue({ id: '3' }); // Valid ID
      // Data will be fetched asynchronously by useQuery
      vi.mocked(comicsService.getComics).mockReturnValue(new Promise(resolve => setTimeout(() => resolve(mockComicData), 50)));
      initializeMockStore({ comicId: 1, comicPath: 'comic' });
      Object.defineProperty(window, 'location', {value: { pathname: '/comic/1'}, configurable: true, writable: true });


      renderHook(() => useComicNav({ comicPath: 'comic' }), { wrapper });

      // Tentative set (happens before data is fetched)
      await waitFor(() => expect(mockStoreState.setComicId).toHaveBeenCalledWith(3));
      
      // After data is fetched, it confirms 3 is valid, so no change from 3 to latest.
      // URL sync effect will navigate to /comic/3
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenLastCalledWith('/comic/3', { replace: true, preventScrollReset: true });
      }, {timeout: 200}); // Increased timeout for async data
    });
  });

  // Test Suite 2: Navigation Functions
  describe('Navigation Functions', () => {
    beforeEach(() => {
      // Setup for navigation: assume initial state is comic 2
      vi.mocked(useParams).mockReturnValue({ id: '2' });
      initializeMockStore({ comicId: 2, comicPath: 'comic' });
      Object.defineProperty(window, 'location', {value: { pathname: '/comic/2'}, configurable: true, writable: true });

    });

    it('nextComic(): should update store and trigger URL sync', async () => {
      const { result } = renderHook(() => useComicNav({ comicPath: 'comic' }), { wrapper });
      await waitFor(() => expect(result.current.comicId).toBe(2)); // Wait for hook to stabilize

      act(() => { result.current.nextComic(); });

      expect(mockStoreState.setComicId).toHaveBeenCalledWith(3);
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenLastCalledWith('/comic/3', { replace: true, preventScrollReset: true });
      });
    });

    it('prevComic(): should update store and trigger URL sync', async () => {
      const { result } = renderHook(() => useComicNav({ comicPath: 'comic' }), { wrapper });
      await waitFor(() => expect(result.current.comicId).toBe(2));

      act(() => { result.current.prevComic(); });
      
      expect(mockStoreState.setComicId).toHaveBeenCalledWith(1);
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenLastCalledWith('/comic/1', { replace: true, preventScrollReset: true });
      });
    });

    it('latestComic(): should update store to latest ID and trigger URL sync', async () => {
      const { result } = renderHook(() => useComicNav({ comicPath: 'comic' }), { wrapper });
      await waitFor(() => expect(result.current.comicId).toBe(2));

      act(() => { result.current.latestComic(); });

      expect(mockStoreState.setComicId).toHaveBeenCalledWith(5); // latest
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenLastCalledWith('/comic/5', { replace: true, preventScrollReset: true });
      });
    });

    it('firstComic(): should update store to first ID and trigger URL sync', async () => {
      const { result } = renderHook(() => useComicNav({ comicPath: 'comic' }), { wrapper });
      await waitFor(() => expect(result.current.comicId).toBe(2));
      
      act(() => { result.current.firstComic(); });
      
      expect(mockStoreState.setComicId).toHaveBeenCalledWith(1); // Assuming first comic is 1
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenLastCalledWith('/comic/1', { replace: true, preventScrollReset: true });
      });
    });

    it('prevChapter(): should update store to previous chapter start and trigger URL sync', async () => {
      initializeMockStore({ comicId: 5, comicPath: 'comic' }); // Start at comic 5 (chapter 3)
      vi.mocked(useParams).mockReturnValue({ id: '5' });
      Object.defineProperty(window, 'location', {value: { pathname: '/comic/5'}, configurable: true, writable: true });


      const { result } = renderHook(() => useComicNav({ comicPath: 'comic' }), { wrapper });
      await waitFor(() => expect(result.current.comicId).toBe(5));

      act(() => { result.current.prevChapter(); });
      
      expect(mockStoreState.setComicId).toHaveBeenCalledWith(3); // Start of chapter 2
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenLastCalledWith('/comic/3', { replace: true, preventScrollReset: true });
      });
    });
  });

  // Test Suite 3: getComicFileName
  describe('getComicFileName', () => {
    it('should return correct filename based on storeComicId', async () => {
      initializeMockStore({ comicId: 2, comicPath: 'comic' });
      vi.mocked(useParams).mockReturnValue({ id: '2' }); // Align URL for consistency
      Object.defineProperty(window, 'location', {value: { pathname: '/comic/2'}, configurable: true, writable: true });


      const { result } = renderHook(() => useComicNav({ comicPath: 'comic' }), { wrapper });
      
      await waitFor(() => expect(result.current.isLoading).toBe(false)); // Ensure data is loaded
      expect(result.current.getComicFileName()).toBe('comic2.jpg');
    });

    it('should return filename for latest comic if storeId is invalid but latest is known', async () => {
      initializeMockStore({ comicId: 999, comicPath: 'comic' }); // Invalid store ID initially
      vi.mocked(useParams).mockReturnValue({ id: '999' }); // URL reflects this invalid ID
      Object.defineProperty(window, 'location', {value: { pathname: '/comic/999'}, configurable: true, writable: true });


      const { result } = renderHook(() => useComicNav({ comicPath: 'comic' }), { wrapper });

      // Init effect should correct storeId to 5 (latest)
      await waitFor(() => expect(mockStoreState.setComicId).toHaveBeenCalledWith(5));
      // And URL sync should navigate
      await waitFor(() => expect(mockNavigate).toHaveBeenLastCalledWith('/comic/5', { replace: true, preventScrollReset: true }));
      
      // After correction and re-render, comicId in hook should be 5
      await waitFor(() => expect(result.current.comicId).toBe(5));
      expect(result.current.getComicFileName()).toBe('comic5.webp');
    });
  });

  // Test Suite 4: Derived Boolean Flags
  describe('Derived Boolean Flags', () => {
    it('should reflect correct states for hasNextComic, hasPrevComic, isLatestComic, hasPrevChapter', async () => {
      const { result, rerender } = renderHook(
        (props: { comicId: number, comicPath: comicUiStore.ComicPath }) => {
          // Directly set store state for each sub-test via the helper
          // then re-trigger params to simulate URL change for the hook to react
          act(() => {
            initializeMockStore({ comicId: props.comicId, comicPath: props.comicPath });
            vi.mocked(useParams).mockReturnValue({ id: String(props.comicId) });
            Object.defineProperty(window, 'location', {value: { pathname: `/${props.comicPath}/${props.comicId}`}, configurable: true, writable: true });
          });
          return useComicNav({ comicPath: props.comicPath });
        },
        { 
          initialProps: { comicId: 1, comicPath: 'comic' as comicUiStore.ComicPath },
          wrapper,
        }
      );

      // Case 1: First comic (ID 1)
      await waitFor(() => expect(result.current.comicId).toBe(1));
      expect(result.current.hasNextComic).toBe(true);
      expect(result.current.hasPrevComic).toBe(false);
      expect(result.current.isLatestComic).toBe(false);
      expect(result.current.hasPrevChapter).toBe(false);

      // Case 2: Latest comic (ID 5)
      act(() => rerender({ comicId: 5, comicPath: 'comic' }));
      await waitFor(() => expect(result.current.comicId).toBe(5));
      expect(result.current.hasNextComic).toBe(false);
      expect(result.current.hasPrevComic).toBe(true);
      expect(result.current.isLatestComic).toBe(true);
      expect(result.current.hasPrevChapter).toBe(true); // Chapter 3 ([1,3,5]), so has prev chapter 2 (starts at 3)

      // Case 3: Middle comic (ID 3, start of a chapter)
      act(() => rerender({ comicId: 3, comicPath: 'comic' }));
      await waitFor(() => expect(result.current.comicId).toBe(3));
      expect(result.current.hasNextComic).toBe(true);
      expect(result.current.hasPrevComic).toBe(true);
      expect(result.current.isLatestComic).toBe(false);
      expect(result.current.hasPrevChapter).toBe(true); // Chapter 2 ([1,3,5]), so has prev chapter 1 (starts at 1)

      // Case 4: Middle comic (ID 4, not start of a chapter)
      act(() => rerender({ comicId: 4, comicPath: 'comic' }));
      await waitFor(() => expect(result.current.comicId).toBe(4));
      expect(result.current.hasNextComic).toBe(true); // Next is 5
      expect(result.current.hasPrevComic).toBe(true); // Prev is 3
      expect(result.current.isLatestComic).toBe(false);
      expect(result.current.hasPrevChapter).toBe(true); // In chapter 2 ([1,3,5]), so has prev chapter 1
    });
  });
});

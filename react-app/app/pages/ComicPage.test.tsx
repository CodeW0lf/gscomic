import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ComicPage } from '~/pages/ComicPage';
import { useComicNav } from '~/hooks/useComicNav';
import type { UseComicNavReturn } from '~/hooks/useComicNav';
import type { ComicPath } from '~/stores/comicUiStore';

// Mock useComicNav
vi.mock('~/hooks/useComicNav');

// Mock child components to focus on ComicPage logic and props passing
vi.mock('~/components/ComicImage', () => ({
  // Ensure the mock component can accept and reflect the props we want to check
  ComicImage: (props: { imgPath: string; comicPath: ComicPath; comicFileName: string }) => (
    <div
      data-testid="comic-image"
      data-imgpath={props.imgPath}
      data-comicpath={props.comicPath} // Ensure this matches prop name in ComicImage
      data-comicfilename={props.comicFileName}
    >
      Mock ComicImage
    </div>
  ),
}));

vi.mock('~/components/ComicNav', () => ({
  // Ensure the mock component can accept and reflect the props we want to check
  ComicNav: (props: any) => <div data-testid="comic-nav" data-props={JSON.stringify(props)}>Mock ComicNav</div>,
}));

// Base mock data for useComicNav - omit comicPath as it will be set per test suite
// Updated to match the structure that was working in previous successful tests for useComicNav itself
// Making all fields required by UseComicNavReturn optional in base, to be overridden in setup
const baseMockUseComicNavData: Partial<UseComicNavReturn> = {
  nextComic: vi.fn(),
  prevComic: vi.fn(),
  nextChapter: vi.fn(),
  prevChapter: vi.fn(),
  latestComic: vi.fn(),
  firstComic: vi.fn(),
  goToComic: vi.fn(),
  hasNextComic: true,
  hasPrevComic: true,
  hasNextChapter: true,
  hasPrevChapter: true,
  isLatestComic: false,
  isLoading: false, 
};

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('ComicPage', () => {
  // Function to set up mocks for a specific comic context
  const setupMocksForComicPath = (comicPath: ComicPath, specificMockData: Partial<UseComicNavReturn>) => {
    // Ensure default values for all required fields in UseComicNavReturn are present
    const mockData: UseComicNavReturn = {
      comicId: 1, // Default, can be overridden
      latestComicId: 1, // Default, can be overridden
      comicList: { '1': 'default.jpg'}, // Default, can be overridden
      chapters: [1], // Default, can be overridden
      getComicFileName: vi.fn().mockReturnValue('default.jpg'), // Default, can be overridden
      isLoading: false, // Default
      ...baseMockUseComicNavData, // Spread base defaults for functions and booleans
      comicPath: comicPath,       // Set current comicPath
      ...specificMockData,       // Override with specific data for the test case
    };
    vi.mocked(useComicNav).mockReturnValue(mockData);
    return mockData; 
  };

  beforeEach(() => {
    vi.clearAllMocks(); 
  });

  // Test suite for "comic" (God Slayers)
  describe('when initialComicPathFromProps is "comic"', () => {
    const currentComicPath: ComicPath = 'comic';
    const currentImgPath = '/img/comics/';
    let currentMockNavData: UseComicNavReturn;

    beforeEach(() => {
      currentMockNavData = setupMocksForComicPath(currentComicPath, {
        comicId: 10, 
        latestComicId: 100,
        getComicFileName: vi.fn().mockReturnValue('godslayer_comic_10.jpg'),
        comicList: { '10': 'godslayer_comic_10.jpg', '100': 'latest.jpg' }, 
        chapters: [1,10,50,100],
      });
    });

    it('should render without crashing', () => {
      renderWithRouter(<ComicPage initialComicPathFromProps={currentComicPath} imgPath={currentImgPath} />);
      expect(screen.getByTestId('comic-image')).toBeInTheDocument();
      expect(screen.getByTestId('comic-nav')).toBeInTheDocument();
    });

    it('should call useComicNav with the correct comicPath prop', () => {
      renderWithRouter(<ComicPage initialComicPathFromProps={currentComicPath} imgPath={currentImgPath} />);
      expect(useComicNav).toHaveBeenCalledWith({ comicPath: currentComicPath });
    });

    it('should pass correct imgPath, comicPath, and comicFileName to ComicImage', () => {
      renderWithRouter(<ComicPage initialComicPathFromProps={currentComicPath} imgPath={currentImgPath} />);
      const comicImage = screen.getByTestId('comic-image');
      expect(comicImage).toHaveAttribute('data-imgpath', currentImgPath);
      expect(comicImage).toHaveAttribute('data-comicpath', currentMockNavData.comicPath); 
      expect(comicImage).toHaveAttribute('data-comicfilename', 'godslayer_comic_10.jpg');
      expect(currentMockNavData.getComicFileName).toHaveBeenCalled();
    });

    it('should pass all relevant props from useComicNav to ComicNav', () => {
      renderWithRouter(<ComicPage initialComicPathFromProps={currentComicPath} imgPath={currentImgPath} />);
      const comicNav = screen.getByTestId('comic-nav');
      const passedProps = JSON.parse(comicNav.getAttribute('data-props') || '{}');

      // Check a representative set of props
      expect(passedProps.comicId).toBe(currentMockNavData.comicId);
      expect(passedProps.latestComicId).toBe(currentMockNavData.latestComicId);
      expect(passedProps.comicPath).toBe(currentMockNavData.comicPath);
      expect(passedProps.hasNextComic).toBe(currentMockNavData.hasNextComic);
      expect(passedProps.hasPrevComic).toBe(currentMockNavData.hasPrevComic);
      expect(passedProps.chapters).toEqual(currentMockNavData.chapters);
      expect(passedProps.comicList).toEqual(currentMockNavData.comicList);
      expect(passedProps.isLoading).toBe(currentMockNavData.isLoading);
      expect(passedProps.isLatestComic).toBe(currentMockNavData.isLatestComic);
    });

    it('should display the comic ID and latest comic ID', () => {
      renderWithRouter(<ComicPage initialComicPathFromProps={currentComicPath} imgPath={currentImgPath} />);
      expect(screen.getByText(`${currentMockNavData.comicId} / ${currentMockNavData.latestComicId}`)).toBeInTheDocument();
    });

    it('should display the Archive link with correct href', () => {
      renderWithRouter(<ComicPage initialComicPathFromProps={currentComicPath} imgPath={currentImgPath} />);
      const archiveLink = screen.getByRole('link', { name: /archive/i });
      expect(archiveLink).toBeInTheDocument();
      expect(archiveLink).toHaveAttribute('href', '/archive');
    });
  });

  // Test suite for "rileycomic"
  describe('when initialComicPathFromProps is "rileycomic"', () => {
    const currentComicPath: ComicPath = 'rileycomic';
    const currentImgPath = '/img/rileycomic/';
    let currentMockNavData: UseComicNavReturn;

    beforeEach(() => {
      currentMockNavData = setupMocksForComicPath(currentComicPath, {
        comicId: 1, 
        latestComicId: 3, 
        getComicFileName: vi.fn().mockReturnValue('riley_comic_1.jpg'),
        comicList: { '1': 'riley_comic_1.jpg', '2': 'riley2.jpg', '3': 'riley3.jpg' }, 
        chapters: [1,2,3], 
      });
    });

    it('should render without crashing', () => {
      renderWithRouter(<ComicPage initialComicPathFromProps={currentComicPath} imgPath={currentImgPath} />);
      expect(screen.getByTestId('comic-image')).toBeInTheDocument();
      expect(screen.getByTestId('comic-nav')).toBeInTheDocument();
    });

    it('should call useComicNav with the correct comicPath prop', () => {
      renderWithRouter(<ComicPage initialComicPathFromProps={currentComicPath} imgPath={currentImgPath} />);
      expect(useComicNav).toHaveBeenCalledWith({ comicPath: currentComicPath });
    });

    it('should pass correct imgPath, comicPath, and comicFileName to ComicImage', () => {
      renderWithRouter(<ComicPage initialComicPathFromProps={currentComicPath} imgPath={currentImgPath} />);
      const comicImage = screen.getByTestId('comic-image');
      expect(comicImage).toHaveAttribute('data-imgpath', currentImgPath);
      expect(comicImage).toHaveAttribute('data-comicpath', currentMockNavData.comicPath);
      expect(comicImage).toHaveAttribute('data-comicfilename', 'riley_comic_1.jpg');
      expect(currentMockNavData.getComicFileName).toHaveBeenCalled();
    });

    it('should display the comic ID and latest comic ID for rileycomic', () => {
      renderWithRouter(<ComicPage initialComicPathFromProps={currentComicPath} imgPath={currentImgPath} />);
      expect(screen.getByText(`${currentMockNavData.comicId} / ${currentMockNavData.latestComicId}`)).toBeInTheDocument();
    });
  });
});

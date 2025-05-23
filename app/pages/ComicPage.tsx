import { ComicWrapper } from '~/components/ComicWrapper';
import { Link } from 'react-router';
import { ComicControllerProvider } from '~/contexts/ComicControllerContext';

export function ComicPage() {
  return (
    <ComicControllerProvider comicPath="comic">
      <ComicWrapper
        footer={
          <div>
            <Link className="text-size-md text-primary font-bold hover:text-white" to="/archive">
              Archive
            </Link>
          </div>
        }
      />
    </ComicControllerProvider>
  );
}

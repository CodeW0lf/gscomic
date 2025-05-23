import { ComicWrapper } from '~/components/ComicWrapper';
import { Link } from 'react-router';
import { ComicNavProvider } from '~/contexts/ComicNavContext';

export function SolipsusComicPage() {
  return (
    <ComicNavProvider comicPath="solipsus">
      <ComicWrapper
        footer={
          <div>
            <Link className="text-size-md text-primary font-bold hover:text-white" to="/third-archive">
              Archive
            </Link>
          </div>
        }
      />
    </ComicNavProvider>
  );
}

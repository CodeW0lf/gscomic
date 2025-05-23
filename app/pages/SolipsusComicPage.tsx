import { ComicWrapper } from '~/components/ComicWrapper';
import { Link } from 'react-router';
import { ComicControllerProvider } from '~/contexts/ComicControllerContext';

export function SolipsusComicPage() {
  return (
    <ComicControllerProvider comicPath="solipsus">
      <ComicWrapper
        footer={
          <div>
            <Link className="text-size-md text-primary font-bold hover:text-white" to="/third-archive">
              Archive
            </Link>
          </div>
        }
      />
    </ComicControllerProvider>
  );
}

import { ComicPage } from '~/pages/ComicPage'; // Changed to use the generic ComicPage

export function meta() {
  return [{ title: 'Riley Comic' }];
}

export default function RileyComicRoute() { // Renamed for clarity, similar to MainComicRoute
  return <ComicPage initialComicPathFromProps="rileycomic" imgPath="/img/rileycomic/" />;
}

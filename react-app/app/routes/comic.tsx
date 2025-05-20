import { ComicPage } from '~/pages/ComicPage';

export function meta() {
  return [{ title: 'God Slayers Comic' }];
}

export default function MainComicRoute() {
  return <ComicPage initialComicPathFromProps="comic" imgPath="/img/comics/" />;
}

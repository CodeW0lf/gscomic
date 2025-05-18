import { ComicPage } from '~/comics/ComicPage';

export function meta() {
  return [{ title: 'God Slayers Comic' }, { name: 'description', content: 'Welcome to React Router!' }];
}

export default function Home() {
  return <ComicPage />;
}

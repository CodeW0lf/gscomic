import { SolipsusComicPage } from '~/pages/SolipsusComicPage';

export function meta() {
  return [
    { title: 'Solipsus' },
    { property: 'og:title', content: 'Solipsus' },
    { property: 'og:description', content: 'God Slayers Comic - Solipsus' },
  ];
}

export default function SolipsusComicRoute() {
  return <SolipsusComicPage />;
}

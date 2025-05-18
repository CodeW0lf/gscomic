import { type RouteConfig, index } from '@react-router/dev/routes';

export function meta() {
  return [
    { name: 'description', content: 'God Slayers Web Comic' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: 'God Slayers Comic' },
    { property: 'og:description', content: 'God Slayers Web Comic' },
    { property: 'og:url', content: 'https://www.godslayerscomic.com' },
    { property: 'og:image', content: 'https://www.godslayerscomic.com/patreon/PromotionalKivaFace.png' },
  ];
}

export default [index('routes/home.tsx')] satisfies RouteConfig;

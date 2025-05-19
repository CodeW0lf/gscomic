import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  layout('layouts/Layout.tsx', [index('routes/home.tsx'), route('comic/:id', 'routes/comic.tsx')]),
] satisfies RouteConfig;

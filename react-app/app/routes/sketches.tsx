import { SketchesPage } from '~/pages/SketchesPage';

export function meta() {
  return [{ title: 'God Slayers Comic - Sketches' }];
}

// Export the component for the route
export default function SketchesRoute() {
  return <SketchesPage />;
}

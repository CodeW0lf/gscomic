import { Sketches } from '~/pages/Sketches';

export function meta() {
  return [{ title: 'Sketches' }];
}

// Export the component for the route
export default function SketchesRoute() {
  return <Sketches />;
}

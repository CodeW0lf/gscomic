import type { Sketch as SketchItem } from '~/types/apiTypes';

const dateOptions: Intl.DateTimeFormatOptions = {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
};

interface SketchProps {
  sketch: SketchItem;
}

export function Sketch({ sketch }: SketchProps) {
  const longDate = (timestamp: number): string => new Date(timestamp * 1000).toLocaleDateString('en-US', dateOptions);

  const imageUrl = `/img/sketch_files/${sketch.src}`;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-lg bg-gray-50 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800">
      <div className="relative overflow-hidden">
        <a href={imageUrl} target="_blank" rel="noopener noreferrer" className="block">
          <div className="aspect-square overflow-hidden">
            <img
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              src={imageUrl}
              alt="Sketch"
              loading="lazy"
            />
          </div>
        </a>
      </div>
      <div className="p-1 text-center">
        <span className="text-sm font-semibold text-gray-500">Posted on {longDate(sketch.date)}</span>
      </div>
    </div>
  );
}

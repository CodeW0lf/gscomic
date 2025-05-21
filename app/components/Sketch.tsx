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
    <div className="flex flex-col items-center justify-center">
      <p className="mb-2 self-start text-sm font-semibold text-gray-500">Posted on {longDate(sketch.date)}</p>
      <div className="mb-6 w-full">
        <a href={imageUrl} target="_blank" rel="noopener noreferrer">
          <img className="w-full" src={imageUrl} alt="Sketch" loading="lazy" />
        </a>
      </div>
    </div>
  );
}

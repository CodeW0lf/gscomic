import React from 'react';

export function Tooltip({ text, children, top }: { text: string; top?: boolean; children: React.ReactNode }) {
  return (
    <span className="group relative">
      {children}
      <span
        className={
          top
            ? 'pointer-events-none absolute bottom-full left-1/2 z-10 mt-2 -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100'
            : 'pointer-events-none absolute top-full left-1/2 z-10 mt-2 -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100'
        }
      >
        {text}
      </span>
    </span>
  );
}

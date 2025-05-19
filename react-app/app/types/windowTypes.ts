declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// This line is needed in .ts (not .d.ts) files to make it a module
export {};

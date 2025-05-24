/// <reference types="gtag.js" />

declare global {
  interface Window {
    gtag?: Gtag.Gtag;
  }
}

// This line is needed in .ts (not .d.ts) files to make it a module
export {};

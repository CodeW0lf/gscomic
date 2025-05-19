export type GtagEventParams = Record<string, unknown>;

export function trackGtagEvent(eventName: string, params?: GtagEventParams) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params ?? {});
  }
}

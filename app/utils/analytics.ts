export function trackGtagEvent(eventName: string, params?: Gtag.EventParams | Gtag.CustomParams | Gtag.ConfigParams) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params ?? {});
  }
}

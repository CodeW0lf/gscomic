import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { trackGtagEvent } from '~/utils/analytics';

export function RouteTracker() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    trackGtagEvent('page_view', {
      page_path: pathname + search,
    });
  }, [pathname, search]);

  return null;
}

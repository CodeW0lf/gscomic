import { useCallback } from 'react';
import { trackGtagEvent } from '~/utils/analytics';

export function useAnalytics() {
  return useCallback(trackGtagEvent, []);
}

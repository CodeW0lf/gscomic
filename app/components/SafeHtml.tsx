import { memo, useMemo } from 'react';
import createDOMPurify from 'dompurify';

export interface SafeHtmlProps {
  html: string;
  className?: string;
}

const DOMPurify = typeof window !== 'undefined' ? createDOMPurify(window) : createDOMPurify({} as never);

const SafeHtml = memo(({ html, className }: SafeHtmlProps) => {
  const sanitized = useMemo(() => DOMPurify.sanitize(html || ''), [html]);
  return <div className={className} dangerouslySetInnerHTML={{ __html: sanitized }} />;
});

SafeHtml.displayName = 'SafeHtml';
export default SafeHtml;

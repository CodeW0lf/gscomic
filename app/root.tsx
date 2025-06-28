import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import type { Route } from './+types/root';
import './app.css';
import { RouteTracker } from '~/components/RouteTracker';
import { LoadingScreen } from '~/components/LoadingScreen';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
  },
];

export function Layout({ children }: { children: ReactNode }) {
  const GA_ID = 'G-ZRYB0LC9SG';
  const disable = import.meta.env.DEV ?? (typeof window !== 'undefined' && window.location.hostname === 'localhost');

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="God Slayers Web Comic" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="God Slayers Comic" />
        <meta property="og:description" content="God Slayers Web Comic" />
        <meta property="og:url" content="https://www.godslayerscomic.com" />
        <meta property="og:image" content="https://www.godslayerscomic.com/patreon/PromotionalKivaFace.png" />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              ${disable ? `window['ga-disable-${GA_ID}'] = true;` : ``}
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {send_page_view: false});
            `,
          }}
        />
        <Meta />
        <Links />
      </head>
      <body className="font-body bg-black antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function HydrateFallback() {
  return <LoadingScreen />;
}

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouteTracker />
      <Outlet />
    </QueryClientProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

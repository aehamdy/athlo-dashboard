import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
// Self-hosted font — eliminates render-blocking Google Fonts request
import '@fontsource/red-hat-text/300.css';
import '@fontsource/red-hat-text/400.css';
import '@fontsource/red-hat-text/500.css';
import '@fontsource/red-hat-text/700.css';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Vite replaces import.meta.env.DEV with `false` at build time, so the
// lazy() import below is fully dead-code-eliminated from the prod bundle.
const DevTools = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/react-query-devtools').then((m) => ({
        default: m.ReactQueryDevtools,
      }))
    )
  : () => null;

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <Suspense fallback={null}>
        <DevTools />
      </Suspense>
    </QueryClientProvider>
  </StrictMode>,
);

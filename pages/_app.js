import '@/styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import MobileLayout from '@/components/layout/mobile-layout';

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster position="bottom-center" />

        <MobileLayout>
          <Component {...pageProps} />
        </MobileLayout>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

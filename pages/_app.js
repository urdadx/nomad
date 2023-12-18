import '@/styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import MobileLayout from '@/components/layout/mobile-layout';
import { StoreProvider } from '@/contexts/context';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster position="bottom-center" />
        <SessionProvider session={pageProps.session}>
          <StoreProvider>
            <MobileLayout>
              <Component {...pageProps} />
            </MobileLayout>
          </StoreProvider>
        </SessionProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

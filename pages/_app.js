import '@/styles/globals.css';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Toaster position="bottom-center" />
      <Component {...pageProps} />;
    </>
  );
}

import type { AppProps } from 'next/app';

import 'windi.css';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;

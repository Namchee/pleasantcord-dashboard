import { Provider } from 'next-auth/client';
import type { AppProps } from 'next/app';

import 'windi.css';
import '@/styles/globals.css';
import { DefaultLayout } from '@/layout';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider
      session={pageProps.session}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </Provider>
  );
}

export default App;

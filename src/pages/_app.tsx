import { Provider } from 'next-auth/client';
// import type { AppProps } from 'next/app';

import 'windi.css';
import '@/styles/globals.css';

function App({ Component, pageProps }: any) {
  return (
    <Provider
      session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;

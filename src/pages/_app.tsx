import { Provider } from 'next-auth/client';

import Router from 'next/router';

import NProgress from 'nprogress';

import 'windi.css';
import '@/styles/globals.css';

import { DefaultLayout } from '@/layout';

import type { AppProps } from 'next/app';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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

import { SessionProvider } from 'next-auth/react';

import Router from 'next/router';

import NProgress from 'nprogress';

import 'windi.css';
import '@/styles/globals.css';

import { DefaultLayout } from '@/layout';

import type { AppProps } from 'next/app';
import { FIVE_MINUTES } from '@/common/time';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider
      session={pageProps.session}
      refetchInterval={FIVE_MINUTES}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </SessionProvider>
  );
}

export default App;

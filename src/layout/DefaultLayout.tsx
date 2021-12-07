import * as React from 'react';

import Head from 'next/head';

function DefaultLayout({
  children,
}: React.PropsWithChildren<unknown>): JSX.Element {
  return (
    <>
      <Head>
        <title>Pleasantcord</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <meta name="theme-color" content="#34343A" />
        <meta property="og:locale" content="en_US" />
      </Head>

      <div className="min-h-screen
        flex flex-col
        text-content
        antialiased">
        {children}
      </div>
    </>
  );
}

export default DefaultLayout;

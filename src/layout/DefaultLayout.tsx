import * as React from 'react';

import Head from 'next/head';

function DefaultLayout({
  children,
}: React.PropsWithChildren<unknown>): JSX.Element {
  return (
    <>
      <Head>
        <title>Pleasantcord&apos;s Dashboard</title>
        <link rel="icon" href="favicon.svg" type="image/svg+xml" />
        <meta property="og:locale" content="en_US" />
      </Head>

      <div className="min-h-screen
        bg-background
        flex flex-col
        text-content">
        {children}
      </div>
    </>
  );
}

export default DefaultLayout;

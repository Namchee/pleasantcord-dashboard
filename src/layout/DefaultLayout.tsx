import * as React from 'react';

import Head from 'next/head';

function DefaultLayout({
  children,
}: React.PropsWithChildren<unknown>): JSX.Element {
  return (
    <>
      <Head>
        <title>Pleasantcord&apos;s Dashboard</title>
      </Head>

      <div className="min-h-screen
        bg-background">
        <main>
          {children}
        </main>
      </div>
    </>
  );
}

export default DefaultLayout;

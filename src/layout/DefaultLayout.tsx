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

      <div className="flex flex-col min-h-screen">
        <main>
          {children}
        </main>
      </div>
    </>
  );
}

export default DefaultLayout;

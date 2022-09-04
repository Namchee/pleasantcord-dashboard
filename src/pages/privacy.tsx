import * as React from 'react';

import Head from 'next/head';

// eslint-disable-next-line max-len
const metaDesc = 'Your Discord servers is never safe from harmful contents. Invite pleasantcord and free your servers from NSFW, effortlessly.';

function Privacy(): JSX.Element {
  return (
    <>
      <Head>
        <title>Privacy Policy — Pleasantcord</title>
        <meta name="description" content={metaDesc}></meta>
        <meta
          property="og:title"
          content="Hassle-Free NSFW Moderation — Pleasantcord"></meta>
        <meta property="og:url" content="https://pleasantcord.namchee.dev"></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:description" content={metaDesc}></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>

      <div>

      </div>
    </>
  );
}

export default Privacy;

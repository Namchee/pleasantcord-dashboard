import * as React from 'react';

import Head from 'next/head';

import { getSession } from 'next-auth/react';

import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';

import type { GetServerSidePropsContext } from 'next';

interface PrivacyProps {
  authenticated: boolean;
}

// eslint-disable-next-line max-len
const metaDesc =
  'Your Discord servers is never safe from harmful contents. Invite pleasantcord and free your servers from NSFW, effortlessly.';

function Privacy(props: React.PropsWithoutRef<PrivacyProps>): JSX.Element {
  return (
    <>
      <Head>
        <title>Privacy Policy — Pleasantcord</title>
        <meta name="description" content={metaDesc}></meta>
        <meta
          property="og:title"
          content="Hassle-Free NSFW Moderation — Pleasantcord"
        ></meta>
        <meta
          property="og:url"
          content="https://pleasantcord.namchee.dev"
        ></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:description" content={metaDesc}></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>

      <div
        className="flex-1
        flex flex-col
        bg-background-deep"
      >
        <Navbar authenticated={props.authenticated} />
        <main className="flex-1 my-12 max-w-2xl mx-auto">
          <article>
            <h1
              className="font-bold
              text-5xl
              tracking-tight
              mb-4"
            >
              Privacy Policy
            </h1>

            <p className="text-content-dark italic">
              Last updated: September 05, 2022
            </p>

            <section className="mt-8 text-lg leading-relaxed space-y-6">
              <p>
                This Privacy Policy describes Our policies and procedures on the
                collection, use and disclosure of Your information when You use
                the Service and tells You about Your privacy rights and how the
                law protects You.
              </p>

              <p>
                We use Your Personal data to provide and improve the Service. By
                using the Service, You agree to the collection and use of
                information in accordance with this Privacy Policy.
              </p>
            </section>

            <section className="mt-8 text-lg leading-relaxed">
              <h2
                className="font-bold
                text-3xl
                tracking-tight
                mb-6"
              >
                Interpretation and Definitions
              </h2>

              <div>
                <h3
                  className="font-bold
                    text-xl
                    tracking-tight
                    mb-4"
                >
                  Interpretation
                </h3>
                <p>
                  The words of which the initial letter is capitalized have
                  meanings defined under the following conditions. The following
                  definitions shall have the same meaning regardless of whether
                  they appear in singular or in plural.
                </p>
              </div>

              <div className="mt-6">
                <h3
                  className="font-bold
                    text-xl
                    tracking-tight
                    mb-4"
                >
                  Definitions
                </h3>
                <p>
                  For the purposes of this Privacy Policy:
                </p>
              </div>
            </section>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  return {
    props: {
      authenticated: session,
    },
  };
}

export default Privacy;
